---
title: Create Apache Kafka® topics
sidebar_label: Create Kafka topics
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Create topics in your Aiven for Apache Kafka® service to organize message streams between producers and consumers.

## Understand Kafka topics

A topic in Aiven for Apache Kafka® is a named stream of messages.
Producers write data to topics, and consumers read from them.

Available topic types vary by Kafka service type.

### Topic types

- **Classic topics**
  - Available in **Classic Kafka** and **Inkless Kafka** clusters.
  - Store data using Kafka broker storage and tiered storage, depending on the service
    configuration.
  - Storage behavior varies by cluster type:
    - In Classic Kafka clusters, tiered storage is optional and configured per topic.
    - In Inkless Kafka clusters, storage behavior is managed by the service.

- **Diskless topics**
  - Available only in **Inkless Kafka** clusters.
  - Store topic data directly in cloud object storage.
  - Must be enabled for the service before creation.
  - The topic type cannot be changed after creation.

In Inkless Kafka services, classic and diskless topics can coexist.
To choose between them, see
[Compare diskless and classic topics](/docs/products/kafka/diskless/concepts/topics-vs-classic).

For limitations and restrictions of diskless topics, see
[Limitations of diskless topics](/docs/products/kafka/diskless/concepts/limitations).

## Before you begin

Before creating topics in your Aiven for Apache Kafka® service, review the following:

- **Tiered storage** applies only to classic topics. In Classic Kafka clusters, tiered
  storage is optional and configured per topic. See
  [Tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage).
- **Manual topic creation** gives you control over partitions, replication, and
  retention, helping prevent accidental topic creation. It’s preferred in production.
- **Automatic topic creation** applies only to classic topics and is supported in
  Classic Kafka clusters. See
  [Automatically create topics](create-topics-automatically).

## Create an Apache Kafka topic

The topic creation options shown in the Aiven Console depend on the Kafka cluster type.
Classic Kafka services create classic topics only. Inkless Kafka services let you choose
between classic and diskless topics.

<Tabs groupId="setup">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), select the Aiven for Apache
   Kafka service.
1. In the sidebar, click <ConsoleLabel name="topics" />.
1. Click **Create topic**.
1. If available, in **Topic type**, select one of the following:

   - **Classic topic:** Data is stored on local disks and can optionally use tiered storage.
   - **Diskless topic:** Data is stored in object storage. Available only in Inkless
     Kafka services.

1. Enter a name in the **Topic** field.
1. Optional: Under **Enabled advanced configuration**, turn on advanced settings to
   adjust topic parameters such as retention, cleanup policy, and message size limits.

   :::note
   Compaction is not available for diskless topics.
   :::

1. Optional: Click **Add configuration** to define additional Kafka parameters if needed.
1. **Classic Kafka only:** Tiered storage is enabled by default for classic topics.
   You can review the tiered storage settings and configure local retention options if
   needed.

   :::note
   Tiered storage cannot be disabled after it is enabled.
   :::

1. Click **Create topic**.

After creation, the topic appears on the <ConsoleLabel name="topics" /> page.
The **Topic type** column indicates whether the topic is **Classic** or **Diskless**.

</TabItem>

<TabItem value="cli" label="CLI">

When creating topics using the CLI, the required options depend on the Kafka cluster type.

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
```

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



<RelatedPages/>

- [Compare diskless and classic topics](/docs/products/kafka/diskless/concepts/topics-vs-classic)
- [Automatically create topics](/docs/products/kafka/howto/create-topics-automatically)
- [Tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage)
