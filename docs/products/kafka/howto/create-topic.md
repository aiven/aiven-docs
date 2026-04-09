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

Available topic types depend on the Kafka service type.

### Topic types

- **Classic topics**
  - They are available in **Classic Kafka** and **Inkless Kafka** services.
  - Storage behavior varies by service type:
    - In **Classic Kafka** services, data is stored on local broker disks unless tiered
      storage is enabled.
    - In **Inkless Kafka** services, classic topics use remote storage by default. You
      cannot change the storage mode or local retention settings.
  - Support log compaction.

- **Diskless topics**
  - Available only in **Inkless Kafka** services.
  - Store topic data directly in cloud object storage.
  - Require a service plan that supports diskless. On Aiven Cloud, enable diskless
    topics during service creation or later in
    <ConsoleLabel name="service settings" /> > **Advanced configuration**.
  - Select the topic type when creating the topic.
  - You cannot change the topic type after creation.

In Inkless Kafka services, classic and diskless topics can coexist.
To choose between them, see
[Compare diskless and classic topics](/docs/products/kafka/diskless/concepts/topics-vs-classic#compare-classic-and-diskless-topics).

For diskless topic limitations, see
[Limitations of diskless topics](/docs/products/kafka/diskless/concepts/limitations).

## Before you begin

Before you create topics in your Aiven for Apache Kafka service, review the following:

- **Tiered storage** is available in **Classic Kafka** services, where you can enable and
  configure it per topic. See [Tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage).
- **Manual topic creation** gives you control over partitions, replication, and
  retention. This approach is preferred in production to prevent accidental topic creation.
- **Automatic topic creation** is disabled by default. Enable it only when needed
  (for example, for development clusters). In production, leave it disabled to
  govern topic creation and avoid accidental topics. On Inkless Kafka,
  auto-created topics are classic topics. Create diskless topics manually. For
  more information, see [Create topics automatically](/docs/products/kafka/howto/create-topics-automatically).

## Create an Apache Kafka topic

The topic creation options shown in the Aiven Console depend on the Kafka service type.
In Classic Kafka services, you create classic topics. Inkless Kafka services let you choose
between classic and diskless topics.

:::tip Kafka CLI and client APIs on Inkless Kafka

- When you create a topic with the Kafka CLI (`kafka-topics.sh`), the Kafka Admin API, or
  other Kafka clients without specifying a topic type, the topic is created as a classic
  topic with remote storage by default.
- To create a diskless topic, use the Aiven Console or Aiven CLI and explicitly select
  the diskless topic type. If you use `kafka-topics.sh` for diskless topics, use the
  script from the [Inkless repository](https://github.com/aiven/inkless).

:::

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
   You cannot disable tiered storage after you enable it.
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
   Create a **classic topic** if your workload requires compaction.
   :::

1. Click **Create topic**.

</TabItem>
</Tabs>

After creation, the topic appears on the <ConsoleLabel name="topics" /> page.
The **Topic type** column shows **Classic** or **Diskless**.

</TabItem>

<TabItem value="cli" label="CLI">

When creating topics using the CLI, the required options depend on the topic type.

<Tabs groupId="cli-topic-type">
<TabItem value="classic" label="Classic topic">

To create a classic topic:

```bash
avn service topic-create \
  SERVICE_NAME \
  TOPIC_NAME \
  --project PROJECT_NAME \
  --partitions PARTITION_COUNT \
  --replication REPLICATION_FACTOR
```

</TabItem>

<TabItem value="diskless" label="Diskless topic">

To create a diskless topic (Inkless services only):

```bash
avn service topic-create \
  SERVICE_NAME \
  TOPIC_NAME \
  --project PROJECT_NAME \
  --partitions PARTITION_COUNT \
  --replication 1 \
  --diskless-enable
```

For diskless topics, set `--replication 1`.

Use the `--diskless-enable` flag to create a diskless topic. Enable diskless topics on
the service before creating them. On Inkless services, omitting the flag creates a
classic topic with remote storage.

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
