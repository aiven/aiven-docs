---
title: Set up an Apache Kafka® MirrorMaker 2 replication flow
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Apache Kafka® MirrorMaker 2 replication flows sync topics from a source
Apache Kafka® cluster to a target Apache Kafka® cluster.
You can define replication flows for Aiven for Apache Kafka services or
external [Apache Kafka clusters](/docs/products/kafka/howto/integrate-external-kafka-cluster).

To define a replication flow between a source Apache Kafka cluster and a target
cluster:

1. Log in to the [Aiven Console](https://console.aiven.io/) and click the
   **Aiven for Apache Kafka MirrorMaker 2** service to define the replication
   flow.

   :::note
   If needed, [create an Aiven for Apache Kafka MirrorMaker 2 service](../get-started).
   :::

1. Click <ConsoleLabel name="integrations" />.
1. Add the source Apache Kafka cluster:
   - On the **Integrations** page, click **Cluster for replication**.
   - Click **Existing service** or **New service**.
   - Click the Apache Kafka service to use as the source cluster.
   - Click **Continue**.
   - Add or confirm the cluster alias.
1. Repeat the integration steps for the target Apache Kafka cluster.

   The cluster alias identifies the Kafka integration in MirrorMaker 2. Use the
   same aliases when you click **Source Cluster** and **Target Cluster** in the
   replication flow. If you do not set an alias, Aiven generates one from the
   project and service name.
1. Click <ConsoleLabel name="replicationflow" />.
1. Click **Create replication flow**.
1. On the **Create new replication flow** screen, configure the flow:
   - In **Source Cluster**, click the source Kafka integration alias.
   - In **Target Cluster**, click the target Kafka integration alias.
   - In **Topics**, enter the
     [topics to replicate](../concepts/replication-flow-topics-regex). To
     replicate all topics, click **All topics**.
   - In **Topic blacklist**, enter the topics to exclude. To exclude internal
     topics, click **Internal topics**.
   - Configure offset sync, delivery, and replication policy options as needed.
     For new replications, enable message delivery exactly once if it is
     available for your setup.
   - Use **Enable** to create the flow as active or inactive.
1. Click **Create**.
1. In the target Apache Kafka cluster, verify the replicated topics.

   With the default replication policy, replicated topic names use the
   `source-cluster-alias.source-topic-name` format. If you use the identity
   replication policy, topic names stay unchanged.

For more information about how MirrorMaker 2 sets topic configurations and the
replication factor on target topics, see
[Topic configurations on the target cluster](/docs/products/kafka/kafka-mirrormaker/concepts/configuration-layers#topic-configurations-on-the-target-cluster).

## Route diskless topic traffic within an availability zone

If you replicate diskless topics, you can reduce cross-AZ traffic by setting
`diskless_az_enabled` to `true` on the replication flow. MirrorMaker 2 then sets the
flow's producer and consumer client IDs to `diskless_az=AZ`, where `AZ` is the
availability zone (AZ) of the node, for example `diskless_az=use1-az1`. This replaces the
default client IDs and can affect quotas, metrics, and logs that depend on them. The
default is `false`.

All MirrorMaker 2 customers can use this option. If the API returns an error when you set
it, contact [Aiven support](/docs/platform/howto/support#create-a-support-ticket).

If AZ-aware listeners are enabled for your project, you don't need this option. For more
information, see
[Configure AZ-aware listeners](/docs/products/kafka/howto/configure-az-aware-listeners).

Update the replication flow with the Aiven API. The request changes only the fields you
send:

```bash
curl --request PUT \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/MIRRORMAKER_SERVICE_NAME/mirrormaker/replication-flows/SOURCE_CLUSTER/TARGET_CLUSTER" \
  --header "Authorization: Bearer API_TOKEN" \
  --header "content-type: application/json" \
  --data '{"diskless_az_enabled": true}'
```

Replace the following:

- `PROJECT_NAME`: Name of your Aiven project.
- `MIRRORMAKER_SERVICE_NAME`: Name of your Aiven for Apache Kafka MirrorMaker 2 service.
- `SOURCE_CLUSTER`: Alias of the source cluster in the replication flow.
- `TARGET_CLUSTER`: Alias of the target cluster in the replication flow.
- `API_TOKEN`: Your Aiven API token.
