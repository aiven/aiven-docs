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

A topic in Aiven for Apache Kafka is a named stream of messages.
Producers write data to topics, and consumers read from them.

Available topic types vary by Kafka service type.

### Topic types

- **Classic topics**
  - Available in **Classic Kafka** and **Inkless Kafka** services.
  - Storage behavior varies by service type:
    - In **Classic Kafka** services, data is stored on local broker disks unless tiered
      storage is enabled.
    - In **Inkless Kafka** services, classic topics use managed remote storage by default.
      You cannot change the storage mode or local retention settings.

- **Diskless topics**
  - Available only in **Inkless Kafka** services.
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

- **Tiered storage** is available in **Classic Kafka** services, where you can enable and
  configure it per topic. See [Tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage).
- **Manual topic creation** gives you control over partitions, replication, and
  retention. This approach is preferred in production to prevent accidental topic creation.
- **Automatic topic creation** is supported only for classic topics in Classic Kafka
  services. See [Automatically create topics](create-topics-automatically).

## Create an Apache Kafka topic

The topic creation options shown in the Aiven Console depend on the Kafka service type.
Classic Kafka services create classic topics only. Inkless Kafka services let you choose
between classic and diskless topics.

<Tabs groupId="setup">
<TabItem value="console" label="Console" default>

<Tabs groupId="console-topic-flow">
<TabItem value="classic-service" label="Classic Kafka service" default>

1. In the [Aiven Console](https://console.aiven.io/), select the Aiven for Apache Kafka service.
1. In the sidebar, click <ConsoleLabel name="topics" />.
1. Click **Create topic**.
1. Enter a name in the **Topic** field.
1. Optional: Turn on **Enable advanced configurations** to set values such as
   replication, partitions, retention, and cleanup policy.
1. Optional: Click **Add configuration** to add other Kafka topic parameters.
1. Optional: Under **Tiered storage**, enable tiered storage for the topic.

   :::note
   Tiered storage cannot be disabled after it is enabled.
   :::

1. Click **Create topic**.

</TabItem>
<TabItem value="inkless-service" label="Inkless Kafka service">

1. In the [Aiven Console](https://console.aiven.io/), select the Aiven for Apache Kafka service.
1. In the sidebar, click <ConsoleLabel name="topics" />.
1. Click **Create topic**.
1. Enter a name in the **Topic** field.
1. In **Topic type**, select one of the following:
   - **Classic topic**
   - **Diskless topic**

   :::note
   In **Inkless Kafka** services, classic topics use managed remote storage by default.
   You cannot change storage mode or local retention settings.
   :::

1. Optional: Turn on **Keep default settings** to configure advanced topic settings such
   as retention, cleanup policy, and message size limits.

   :::note
   Diskless topics do not support compaction.
   :::

1. Click **Create topic**.

</TabItem>
</Tabs>

After creation, the topic appears on the <ConsoleLabel name="topics" /> page.
The **Topic type** column indicates whether the topic is **Classic** or **Diskless**.

</TabItem>

<TabItem value="cli" label="CLI">

When creating topics using the CLI, the required options depend on the topic type.

<Tabs groupId="cli-topic-type">
<TabItem value="classic" label="Classic topic">

To create a classic topic:

```bash
avn service topic-create \
  --project PROJECT_NAME \
  --service-name SERVICE_NAME \
  --topic TOPIC_NAME \
  --partitions PARTITION_COUNT \
  --replication REPLICATION_FACTOR
```

</TabItem>

<TabItem value="diskless" label="Diskless topic">

To create a diskless topic (Inkless services only):

```bash
avn service topic-create \
  --project PROJECT_NAME \
  --service-name SERVICE_NAME \
  --topic TOPIC_NAME \
  --partitions PARTITION_COUNT \
  --replication REPLICATION_FACTOR \
  --diskless-enable
```

Use the `--diskless-enable` flag to create a diskless topic. Enable diskless topics on
the service before creating them.

</TabItem>
</Tabs>

Common parameters:

- `PROJECT_NAME`: Aiven project that contains the Kafka service.
- `SERVICE_NAME`: Aiven for Apache Kafka service name.
- `TOPIC_NAME`: Name of the topic.
- `PARTITION_COUNT`: Number of partitions to distribute messages.
- `--replication REPLICATION_FACTOR`: Number of replicas for each partition.

</TabItem>
<TabItem value="terraform" label="Terraform">
<Tabs groupId="tf-topic-type">

<TabItem value="classic" label="Classic topic">

Define topics using the
[`aiven_kafka_topic`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_topic)
resource.

</TabItem>
<TabItem value="diskless" label="Diskless topic">

Diskless topics are supported only in Inkless services.

Enable diskless in the [`aiven_kafka`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka)
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
