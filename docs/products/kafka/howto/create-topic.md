---
title: Create a classic Apache Kafka® topic
sidebar_label: Create a classic Kafka topic
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

A topic in Aiven for Apache Kafka® is a named stream of messages used by producers to send data and by consumers to read it.

You can configure Aiven for Apache Kafka to
[automatically create topics](create-topics-automatically) when a message is
produced to a non-existent topic, but it is recommended to create topics beforehand,
especially in production environments.

Manual creation lets you:

- Configure the number of partitions, replication factor, and retention period.
- Avoid accidental topic creation caused by typos or incorrectly configured clients.

:::note
If tiered storage is enabled for your Aiven for Apache Kafka® service, all new topics
have tiered storage enabled by default.
[Learn more about tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage).
:::

## Steps to create an Apache Kafka® topic

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/) and select the Aiven for
   Apache Kafka® service to create the topic.
1. Click <ConsoleLabel name="topics" />.
1. Click **Create topic**.
1. Enter a name for the topic.
1. To configure additional settings, turn on **Enable advanced configuration**.
1. In the **Topic advanced configuration** section, configure properties such as the
   replication factor, number of partitions, and retention settings. You can change
   these later if needed.

   :::note
   The `message.format.version` configuration is deprecated in Kafka 3.x and removed
   in Kafka 4.0. Remove this configuration from your topics before upgrading to Kafka 4.0.
   :::


1. Click **Create topic**.

You can see the new topic immediately. It may take a few minutes before you can update
its settings.

</TabItem>
<TabItem value="CLI" label="CLI">

1. Decide on the topic settings, such as the number of partitions, replication factor,
   and retention period.

1. Run the following command to create a topic named `exampleTopic`:

   ```bash
   avn service topic-create             \
       --project demo-kafka-project    \
       --service-name demo-kafka-service \
       --topic exampleTopic            \
       --partitions 2                  \
       --replication 2
   ```

   Parameters:

   - `avn service topic-create`: Creates a topic
   - `--project demo-kafka-project`: Aiven project name
   - `--service-name demo-kafka-service`: Aiven for Apache Kafka® service name
   - `--topic exampleTopic`: Name of the topic
   - `--partitions 2`: Number of partitions
   - `--replication 2`: Replication factor

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `aiven_kafka_topic` resource to define a topic in your Aiven for Apache Kafka
service.

<TerraformSample filename='resources/aiven_kafka_topic/resource.tf' />

For more details, see the [Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_topic).

</TabItem>
</Tabs>

<RelatedPages/>

- [Manage Aiven for Apache Kafka® topics via CLI](/docs/tools/cli/service/topic#avn_cli_service_topic_create)
- [Create Apache Kafka® topics automatically](/docs/products/kafka/howto/create-topics-automatically)
- [Create a Diskless topic](/docs/products/kafka/diskless/howto/create-diskless-topic)
