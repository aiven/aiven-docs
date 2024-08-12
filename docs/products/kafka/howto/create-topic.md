---
title: Create an Apache Kafka® topic
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can configure Aiven for Apache Kafka® to [automatically create topics when a message is produced to a non-existent topic](create-topics-automatically), but it is recommended to create topics beforehand, especially in production environments.

This approach offers several advantages:

- You can define specific topic settings, such as the number of partitions,
  replication factor, retention period, and more.
- It helps prevent the creation of incorrect topics due to typos or
    other mistakes.

:::note
When tiered storage is activated for your Aiven for Apache Kafka service, all
new topics will have tiered storage enabled by default.
[Learn more about tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage).
:::

## Steps to create an Apache Kafka® topic

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/) and select the Aiven for
   Apache Kafka® service to create the topic.
1. Click **Topics** in the sidebar.
1. Click **Create topic** and enter a name for the topic.
1. If required, set the advanced configuration option to **Yes**.
1. In the **Topic advanced configuration** section, set properties such as the
   replication factor, number of partitions, and other settings. These settings can be
   modified later.
1. Click **Create topic**.

The new topic is visible immediately, but it may take a few minutes before you can
update its settings.

</TabItem>
<TabItem value="CLI" label="CLI">

1. Determine the topic specifications, including the number of partitions,
   replication factor, and other settings.

1. Run the following command to create the `exampleTopic` topic:

   ```bash
   avn service topic-create             \
       --project demo-kafka-project    \
       --service-name demo-kafka-service \
       --topic exampleTopic            \
       --partitions 2                  \
       --replication 2
   ```

   Parameters:

   - `avn service topic-create`: Creates a topic.
   - `--project demo-kafka-project`: Specifies the project name.
   - `--service-name demo-kafka-service`: Specifies the Aiven for Apache Kafka® service name.
   - `--topic exampleTopic`: Specifies the name of the topic to create.
   - `--partitions 2`: Specifies the number of partitions for the topic.
   - `--replication 2`: Specifies the replication factor for the topic.

</TabItem>
</Tabs>

## Related pages

- [Manage Aiven for Apache Kafka® topics via CLI](/docs/tools/cli/service/topic#avn_cli_service_topic_create)
- [Create Apache Kafka® topics automatically](/docs/products/kafka/howto/create-topics-automatically)
