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
