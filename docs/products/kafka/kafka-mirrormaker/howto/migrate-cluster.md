---
title: Migrate an Apache Kafka® cluster to Aiven with MirrorMaker 2
sidebar_label: Migrate a Kafka cluster
description: Migrate an existing Apache Kafka cluster to Aiven for Apache Kafka using MirrorMaker 2, including topic replication, consumer offsets, schemas, and client cutover.
keywords: [Apache Kafka, migration, MirrorMaker 2, replication, consumer offsets, cutover]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Migrate an existing Apache Kafka® cluster to Aiven for Apache Kafka using MirrorMaker 2. The source can be a self-hosted, on-premises, or third-party managed cluster.

MirrorMaker 2 replicates topic data while producers and consumers keep using the source
cluster.
After replication catches up, migrate the schemas, ACLs, and connectors that you
need, then switch your applications to the target Aiven service.

The procedures use the Aiven Console.
You can also manage replication flows using the
[Aiven CLI](/docs/tools/cli/mirrormaker), the Aiven API, or Terraform.

:::important[Important]
MirrorMaker 2 replicates data asynchronously.
Plan a cutover period in which you stop writes to the source cluster, synchronize
consumer group offsets, and verify the migration before you decommission the source
cluster.
:::

## Prerequisites

Before you migrate, ensure you have the following:

- An Aiven project with permission to create services and integration endpoints
- Connection details for the source cluster: bootstrap servers, security protocol, and
  credentials or SSL certificates
- A user for MirrorMaker 2 with the following permissions:
  - Source cluster: `READ` access to the topics to replicate
  - Target cluster: `WRITE` access to the replicated topics
  - Both clusters: `READ`, `WRITE`, `CREATE`, and `DESCRIBE` access to the MirrorMaker 2
    internal topics

  For more information, see
  [Permissions and internal topics](/docs/products/kafka/kafka-mirrormaker/concepts/permissions-internal-topics).
- Network access from MirrorMaker 2 to the source cluster and from your applications to
  the target service, including required firewall rules or private connectivity, with
  enough bandwidth to sync your data
- Kafka clients that are compatible with the Apache Kafka version of the target service
- A list of the topics, consumer groups, schemas, ACLs, and Kafka Connect connectors to
  migrate
- A cutover plan that covers which producers, consumers, and connectors to switch, and how
  to roll back if needed

## Define the source cluster endpoint

Create an external Apache Kafka integration endpoint so that MirrorMaker 2 can connect to
the source cluster.
Follow
[Integrate an external Apache Kafka® cluster](/docs/products/kafka/howto/integrate-external-kafka-cluster)
and use a descriptive name, such as `source-cluster`.

:::important[Important]
Aiven does not test connectivity when you create an external Apache Kafka endpoint.
Ensure the firewall of the source cluster allows traffic from MirrorMaker 2.

To allow only specific addresses, set up
[static IP addresses](/docs/platform/concepts/static-ips) for the MirrorMaker 2 service
and allow them on the source cluster firewall.
Static IP addresses incur an additional charge.
:::

:::note[Note]
If you run MirrorMaker 2 standalone, define the source cluster in the `mm2.properties`
file instead.
:::

## Create the target services

Create an Aiven for Apache Kafka service as the target cluster and a MirrorMaker 2
service to replicate the data.

1. [Create an Aiven for
   Apache Kafka service](/docs/products/kafka/get-started/create-kafka-service) as the
   target cluster, for example `target-kafka`.
1. Apply the custom broker parameters that your applications depend on, such as message
   size limits or retention defaults.
   Aiven manages some broker parameters, so first review the available
   [advanced parameters](/docs/products/kafka/reference/advanced-params-index).
   To apply a parameter:

   1. In the target service, click <ConsoleLabel name="service settings"/>.
   1. In **Advanced configuration**, click **Configure**.
   1. Click <ConsoleLabel name="addconfigoptions"/>.
   1. Search for the parameter.
      For example, search for `kafka.message_max_bytes` to set the maximum message size.
   1. Set the value and click **Save configuration**.

   :::important[Important]
   You cannot reset advanced parameters to their defaults or remove them after you add
   them.
   Most changes restart the service nodes one at a time, so apply them before you create
   the replication flow.
   :::

   For more information, see
   [Manage Apache Kafka parameters](/docs/products/kafka/howto/set-kafka-parameters).
1. Optional: Enable the Apache Kafka REST API to browse topic data in the Aiven Console.
   If your applications use a schema registry, enable it as well.
   For more information, see
   [Enable schema registry and REST proxy](/docs/products/kafka/karapace/howto/enable-karapace).
1. Optional: If your clients use SASL, enable
   [SASL authentication](/docs/products/kafka/howto/kafka-sasl-auth).
1. Optional: Enable
   [automatic topic creation](/docs/products/kafka/howto/create-topics-automatically) if
   your applications rely on it.
1. [Create a MirrorMaker 2 service](/docs/products/kafka/kafka-mirrormaker/get-started)
   and integrate it with the target Aiven for Apache Kafka service.
   Enter a cluster alias that identifies the target cluster, such as `kafka-target`.
   You cannot change the alias after you create the integration.

## Create a replication flow

Add the source cluster to MirrorMaker 2 and create a replication flow to the target
cluster.

1. In the MirrorMaker 2 service, click <ConsoleLabel name="integrations"/>.
1. Under **External integrations**, click **Cluster for replication**.
1. Click the source endpoint, such as `source-cluster`, and click **Continue**.
1. Enter a cluster alias, such as `kafka-source`, and click **Enable**.
1. Click **Replication flows** > **Create replication flow**.
1. Configure the replication flow:

   - **Source cluster**: The source cluster alias, such as `kafka-source`.
   - **Target cluster**: The target cluster alias, such as `kafka-target`.
   - **Topics**: Click **All topics**, or enter Java regular expressions for the topics
     to replicate.
     For example, `customer\..*` matches topics that start with `customer.`.
     For more patterns, see
     [Include or exclude topics in a replication flow](/docs/products/kafka/kafka-mirrormaker/concepts/replication-flow-topics-regex).
   - **Topic blacklist**: The topics to exclude.
     To exclude internal topics, click **Internal topics**.
   - **Replication policy class**: The naming of replicated topics:
     - `org.apache.kafka.connect.mirror.DefaultReplicationPolicy` prefixes replicated
       topics with the source cluster alias.
       For example, `orders` becomes `kafka-source.orders`.
     - `org.apache.kafka.connect.mirror.IdentityReplicationPolicy` keeps the original
       topic names.
   - **Sync group offsets**: Turn on to synchronize consumer group offsets.
     Required to resume consumers from their replicated positions.
   - **Sync interval in seconds**: How often MirrorMaker 2 synchronizes offsets.
   - **Offset syncs topic location**: The source or target cluster, depending on your
     [permissions and configuration](/docs/products/kafka/kafka-mirrormaker/concepts/permissions-internal-topics#offset-sync-topic-location).
   - **Exactly-once message delivery enabled**: Turn on to use
     [exactly-once delivery](/docs/products/kafka/kafka-mirrormaker/howto/exactly-once-delivery).
     Recommended for new replications.
   - **Emit heartbeats enabled**: Turn on to emit heartbeats to the target cluster.
   - **Enable**: Starts the replication when you create the flow.

1. Click **Create**.
1. In the target service, click <ConsoleLabel name="managestream"/> >
   <ConsoleLabel name="topics"/> and confirm that the topics appear with the expected
   names.

After you enable the flow, MirrorMaker 2 periodically checks the source cluster for new
topics that match your patterns and replicates them.
For more options, see
[Set up an Apache Kafka® MirrorMaker 2 replication flow](/docs/products/kafka/kafka-mirrormaker/howto/setup-replication-flow).

:::note[Note]
MirrorMaker 2 periodically copies topic configurations from the source topics to the
target topics, with some exceptions.
By default, it does not copy `min.insync.replicas`, and it never copies
`unclean.leader.election.enable`.
It sets the replication factor of a target topic only when it creates the topic.
To preserve target-specific settings, see
[Topic configurations on the target cluster](/docs/products/kafka/kafka-mirrormaker/concepts/configuration-layers#topic-configurations-on-the-target-cluster).
:::

### Test with a sample topic

Before you migrate production topics, test the setup with a sample topic.
Create a topic on the source cluster, such as `pizza-orders`, and stream data to it with
the
[Aiven fake data producer](https://github.com/Aiven-Labs/python-fake-data-producer-for-apache-kafka).
Include the topic in the replication flow and confirm that the data arrives on the
target cluster.
Stop the producer when you finish testing.

## Monitor replication

Replication lag is the delay between the source and target clusters.
Monitor it to find out when the target has caught up with the source.

1. [Create a service integration](/docs/platform/howto/create-service-integration) that
   sends the MirrorMaker 2 metrics to a monitoring system.
   For more information, see
   [Monitor replication execution](/docs/products/kafka/kafka-mirrormaker/howto/monitor-replication-execution).
1. Track the following metrics:

   - `kafka_mirrormaker_summary.replication_lag`: The lag for each replication flow,
     tagged with `replication-flow`.
     For Datadog, see
     [Configure Apache Kafka® MirrorMaker 2 metrics sent to Datadog](/docs/products/kafka/kafka-mirrormaker/howto/datadog-customised-metrics).
   - `jmx.kafka.connect.mirror.record_count`: The number of replicated records.
     A flat line means that no new records arrive.
     It does not show that the lag is `0`.

A replication lag of `0` shows that replication has caught up.
It does not confirm that schemas, ACLs, connectors, or consumer group offsets are in
place.

:::note[Note]
MirrorMaker 2 does not offer synchronous replication.
Consumers need to process out-of-order records and tolerate duplicate records.
:::

## Migrate schemas

If your applications use a schema registry, migrate the schemas to the target service
before you switch clients.
To preserve schema IDs and versions, see
[Migrate schemas to Karapace](/docs/products/kafka/karapace/howto/migrate-schemas-with-import-mode).
Confirm that the schema subjects, IDs, and versions are available on the target service.

## Migrate ACLs

MirrorMaker 2 does not replicate Apache Kafka ACLs.
Extract the ACL definitions from the source cluster and recreate them on the target
service, together with the application credentials.
Confirm that each application has the permissions it needs for its topics.
For more information, see
[Manage access control lists](/docs/products/kafka/howto/manage-acls).

## Migrate Kafka Connect connectors

MirrorMaker 2 replicates topic data but does not migrate Apache Kafka Connect connector
configurations or runtime state.
If your source environment uses Kafka Connect:

1. Identify the source and sink connectors to migrate.
1. Check whether the target supports their plugins.
   For more information, see
   [Available Apache Kafka® Connect connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins).
1. Create the connectors on the target with compatible plugins, configurations,
   credentials, and connections to external systems.
1. Plan when to stop the source connectors and start the target connectors, based on
   their offset and restart behavior, to avoid processing records twice.

## Switch applications to Aiven

Switch your producers and consumers during a planned cutover period.

To let consumer groups resume from their replicated positions, turn on
**Sync group offsets** in the replication flow before the cutover.
MirrorMaker 2 periodically translates committed source offsets and writes them to the
target while the consumer groups have no active consumers on the target.

Offset synchronization depends on the following:

- **Sync interval**: The default `kafka_mirrormaker.sync_group_offsets_interval_seconds`
  is `60` seconds.
- **Checkpoints**: MirrorMaker 2 emits offset checkpoints by default.
  If you turned them off with `kafka_mirrormaker.emit_checkpoints_enabled`, turn them
  back on.
- **Offset syncs topic location**: For more information, see
  [Offset sync topic location](/docs/products/kafka/kafka-mirrormaker/concepts/permissions-internal-topics#offset-sync-topic-location).

To switch the applications:

1. Confirm that the topics, schemas, ACLs, and application credentials are available on
   the target service.
1. Stop the producers and source connectors that write to the source cluster.
1. Let the source consumers process the remaining records and commit their offsets, then
   stop them.
1. Confirm that the replication lag is `0` and the replication flow has no errors.
1. Keep MirrorMaker 2 running and wait for at least one sync interval.
1. Confirm that the migrated consumer groups have committed offsets on the target before
   you start the target consumers:

   ```bash
   kafka-consumer-groups.sh \
     --bootstrap-server TARGET_BOOTSTRAP_SERVERS \
     --command-config CLIENT_PROPERTIES_FILE \
     --describe \
     --group CONSUMER_GROUP
   ```

   Replace the following:

   - `TARGET_BOOTSTRAP_SERVERS`: The bootstrap servers of the target service.
   - `CLIENT_PROPERTIES_FILE`: The path to a client properties file with the connection
     settings of the target service.
   - `CONSUMER_GROUP`: The consumer group to inspect.

   Compare the topics, partitions, and committed offsets with the expected positions.
   Offsets on the target can differ from the source because MirrorMaker 2 translates
   them between clusters.
   If a group has no committed offsets on the target, do not start it there.
   First review its offset synchronization status, as described in
   [Offset sync status analysis](/docs/products/kafka/kafka-mirrormaker/howto/log-analysis-offset-sync-tool).

1. Update your producers and consumers to use the target service, including the
   following:

   - Bootstrap servers and authentication details
   - Topic names, if the replication policy adds a prefix.
     To keep the original names, see
     [Remove the topic prefix](/docs/products/kafka/kafka-mirrormaker/howto/remove-mirrormaker-prefix).
   - Schema registry endpoints, if applicable

   For connection details and examples, see
   [Connect to Aiven for Apache Kafka](/docs/products/kafka/howto/list-code-samples).
1. Start the producers, consumers, and migrated connectors on the target service.
1. Produce and consume test records to confirm that the applications work and the
   consumers resume at the intended positions.

:::tip[Tip]
Test the offset behavior with a non-production consumer group before the cutover.
:::

## Verify and complete the migration

After you switch the applications, confirm the following:

- Producers and consumers write and read records on the target cluster.
- Consumer groups resume at the expected positions.
- Migrated connectors and other integrations work as expected.
- Applications no longer depend on the source cluster.

Keep the source cluster available until you finish verification and no longer need it
for rollback.
Then turn off the replication flow and decommission the source cluster.

<RelatedPages/>

- [Disaster recovery and migration](/docs/products/kafka/kafka-mirrormaker/concepts/disaster-recovery-migration)
- [Set up an Apache Kafka® MirrorMaker 2 replication flow](/docs/products/kafka/kafka-mirrormaker/howto/setup-replication-flow)
- [Configuration and tuning for MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker/concepts/configuration-layers)
- [Monitor replication execution](/docs/products/kafka/kafka-mirrormaker/howto/monitor-replication-execution)
- [Offset sync status analysis](/docs/products/kafka/kafka-mirrormaker/howto/log-analysis-offset-sync-tool)
