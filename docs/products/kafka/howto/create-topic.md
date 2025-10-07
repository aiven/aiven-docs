---
title: Create Apache Kafka® topics
sidebar_label: Create topics
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Create topics in your Aiven for Apache Kafka® service to organize message streams between producers and consumers.

## Understand Kafka topics

A topic in Aiven for Apache Kafka® is a named stream of messages.
Producers send data to topics, and consumers read from them.

Aiven for Apache Kafka® supports two topic types:

- **Classic topics:** Store data on local disks and optionally offload older data to
  object storage through [tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage).
- **Diskless topics:** Store data directly in object storage, such as AWS S3 or Google Cloud Storage.

Both topic types can coexist in the same service. The topic type cannot be changed after
creation.

## Topic types and when to use them

Choose the topic type that best fits your workload.

Use **classic topics** for:

- Low-latency workloads
- Workloads that use transactions
- Topics that require log compaction
- Workloads that use Kafka Streams

Classic topics store data on local disks and replicate for durability.

Use **diskless topics** for:

- Cost-optimized workloads
- High-throughput scenarios
- Latency-tolerant applications

Diskless topics are available only for Bring Your Own Cloud (BYOC) services on AWS and
Google Cloud, and use object storage with a PostgreSQL-based batch coordinator for
message ordering and metadata consistency. This architecture provides scalability and
durability but has limitations. For details, see
[Batch coordinator and metadata](/docs/products/kafka/diskless/concepts/architecture#batch-coordinator-and-metadata).

## Limitations of diskless topics

Diskless topics currently have the following limitations:

- Transactions are not supported.
- Compacted topics are not supported.
- Kafka Streams state stores are not supported.
- Share groups and queue-type topics are not supported.
- Auto-creation of topics is not supported.
- Retention policies based on bytes or time are limited compared to classic topics.

Use **classic topics** for workloads that depend on these features.

## Before you begin

Before creating topics in your Aiven for Apache Kafka® service, review the following.

- **Manual topic creation** applies only to classic topics. It gives you control over
  partitions, replication, and retention, and helps prevent accidental topic creation.
  It is preferred in production.

- **Automatic topic creation** applies only to classic topics. You can enable it to
  create topics automatically when a message is produced to a non-existent topic. See
  [Automatically create topics](create-topics-automatically).

- **Tiered storage** applies only to classic topics. When enabled, all new topics use
  tiered storage by default. See
  [Tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage).

## Steps to create an Apache Kafka® topic

<Tabs groupId="setup">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), select your Aiven for Apache
   Kafka service.
1. In the sidebar, click <ConsoleLabel name="topics" />.
1. Click **Create topic**.
1. In **Topic type**, select one of the following:

   - **Classic topic:** Data is stored on local disks and can optionally use tiered storage.
   - **Diskless topic:** Data is stored in object storage.
1. Enter a name in the **Topic** field.
1. Optional: Under **Edit advanced configuration**, turn on the toggle to enable
   **Custom settings** and adjust topic parameters such as partitions, replication
   factor, and retention.

   :::note
   Compaction is unavailable for diskless topics.
   :::

1. Optional: Click **Add configuration** to define additional Kafka parameters if needed.
1. **Classic topics only:**  Under **Tiered storage**, you can enable or disable the
   feature.
   - Tiered storage cannot be disabled once enabled.
   - Configure local retention options if needed.
1. Click **Create topic**.

After creation, the topic appears on the Topics page.
The Topic type column indicates whether the topic is **Classic**, **Tiered**, or
**Diskless**.

</TabItem>

<TabItem value="cli" label="CLI">

You can create topics using the Aiven CLI.

<Tabs groupId="cli-topic-type">
<TabItem value="classic" label="Classic topic">

To create a classic topic using the Aiven CLI:

```bash
avn service topic-create \
  --project <PROJECT_NAME> \
  --service-name <SERVICE_NAME> \
  --topic <TOPIC_NAME> \
  --partitions <PARTITION_COUNT> \
  --replication <REPLICATION_FACTOR>
````

</TabItem>

<TabItem value="diskless" label="Diskless topic">

To create a diskless topic using the Aiven CLI:

```bash
avn service topic-create \
  --project <PROJECT_NAME> \
  --service-name <SERVICE_NAME> \
  --topic <TOPIC_NAME> \
  --partitions <PARTITION_COUNT> \
  --replication <REPLICATION_FACTOR> \
  --diskless-enable
```

</TabItem>
</Tabs>

Parameters:

- `<PROJECT_NAME>`: Aiven project that contains the Kafka service.
- `<SERVICE_NAME>`: Aiven for Apache Kafka® service name.
- `<TOPIC_NAME>`: Name of the topic.
- `<PARTITION_COUNT>`: Number of partitions to distribute messages.
- `--replication <REPLICATION_FACTOR>`: Number of replicas for each partition.
- `--diskless-enable`: Creates a diskless topic by storing data in object storage.

</TabItem>
<TabItem value="terraform" label="Terraform">
<Tabs groupId="tf-topic-type">

  <TabItem value="classic" label="Classic topic">

Manage topics using the
[`aiven_kafka_topic`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_topic)
resource.

  </TabItem>

  <TabItem value="diskless" label="Diskless topic">

To use diskless topics, enable them in the Kafka service through
the [`aiven_kafka`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka)
resource before defining topics
with [`aiven_kafka_topic`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_topic).

  </TabItem>

</Tabs>
</TabItem>
</Tabs>
