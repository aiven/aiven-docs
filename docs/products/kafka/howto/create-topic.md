---
title: Create an Apache Kafka® topic
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<<<<<<< HEAD
When working with Apache Kafka®, while it is possible to configure it to [automatically create topics when a message is produced to a non-existent topic](/docs/products/kafka/howto/create-topics-automatically), it is generally recommended to create topics beforehand, especially in production environments.

This approach offers several advantages:
=======
When working with Apache Kafka®, while it is possible to configure it to [automatically create topics when a message is produced to a non-existent topic](create-topics-automatically), it is generally recommended to create topics beforehand,
especially in production environments.
>>>>>>> 80470d1 (fix: editorial and styles)

This approach offers several advantages:

- You can define specific topic settings, such as the number of partitions,
  replication factor, retention period, and more.
- It helps prevent the creation of incorrect topics due to typos or
    other mistakes.

:::note
When tiered storage is activated for your Aiven for Apache Kafka service, all new topics
will have tiered storage enabled by default.
[Learn more about tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage).
:::

<<<<<<< HEAD
To create a topic using the [Aiven
Console](https://console.aiven.io/):

1.  Log in to [Aiven Console](https://console.aiven.io/) and select the
    Aiven for Apache Kafka® service where to create the topic.
1.  From the left sidebar, select **Topics**.
1.  Select **Create topic** to create a topic and enter a name for
    the topic.
1.  If required, set the advanced configuration option to **Yes**.
1.  In the **Topic advanced configuration** section, you can set
    properties such as the replication factor, number of partitions, and
    other settings. These settings can be modified later if needed.
1.  Select **Create topic**. The new topic will be visible immediately,
    but may take a few minutes before you can update its settings.
=======
## Steps to create an Apache Kafka® topic

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>
>>>>>>> 80470d1 (fix: editorial and styles)

1. Log in to the [Aiven Console](https://console.aiven.io/) and select the Aiven for
   Apache Kafka® service to create the topic.
1. Click **Topics** in the sidebar.
1. Click **Create topic** and enter a name for the topic.
1. If required, set the advanced configuration option to **Yes**.
1. In the **Topic advanced configuration** section, set properties such as the
   replication factor, number of partitions, and other settings. These settings can be
   modified later if needed.
1. Click **Create topic**. The new topic will be visible immediately, but it may take a
   few minutes before you can update its settings.

</TabItem>
<TabItem value="CLI" label="CLI">

1. Determine the topic specifications, including the number of partitions,
   replication factor, and other settings.

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

   - `avn service topic-create`: Command to create a topic.
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
