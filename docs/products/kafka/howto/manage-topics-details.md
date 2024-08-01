---
title: Manage Apache Kafka® topics in detail
sidebar_label: Detailed topic management
early: true
---

Explore advanced topic management features in the Apache Kafka topic catalog. Navigate through various options and configurations for your Apache Kafka topics.

## Access topic overview page

1. In the Apache Kafka topic catalog, click the name of a topic to open the topic details
   pane.
1. Click **Open topic page** to open the topic overview page.

:::note
If you are not a member of the project associated with the topic, the
**Open topic page** option is disabled.
:::


On the topic overview page, you can:

### Overview tab

View a summary of the key details of your Apache Kafka topic:

- **Topic size**: Total size of the topic data
- **Partitions**: Number of partitions the topic is divided into
- **Replication factor**: Replication factor set for the topic
- **Topic tags**: Tags associated with the topic
- **Topic owner**: Current owner of the topic

### Configuration tab

Review and compare the configuration settings of your Apache Kafka topics:

- **Configuration details**: Shows all the configuration parameters set for the topic.
- **Compare configurations**: Compare the configuration of the current topic with
  another topic by selecting a topic to compare.

### Users tab

Manage and view user permissions for the topic:

- **Search for users**: Find users by username.
- **Filter by permission**: Filter users by permissions.
- **Compare user permissions**: Compare the permissions of users across different topics.

### Messages tab

Fetch and view messages:

- Use filters like partition, offset, timeout, max bytes, and format.
- Click **Fetch messages**.

### Schemas tab

Enable and manage schemas for the topic:

- **Subject naming strategy**: Choose a naming strategy for subjects.
- **Search schemas**: Find schemas by name.
- **Set compatibility level**: Configure the compatibility level for your schemas.
- **Delete subjects**: Remove schemas that are no longer needed.

:::note
Enable the [schema registry authorization](/docs/products/kafka/concepts/schema-registry-authorization)
for your Aiven for Apache Kafka service to use the **Schemas** tab.
:::

## Edit topic information

1. Click **Edit topic** to access the topic info screen within the
   respective Aiven for Apache Kafka service.
1. On the topic info screen, click **Modify** to edit the topic configurations.
1. Update the desired configurations and click **Update** to save the changes.
1. To return to the topic overview page in the Apache Kafka topic catalog,
   click **Open topic catalog**.

## Related pages

- [Aiven for Apache Kafka® topic catalog overview](/docs/products/kafka/concepts/topic-catalog-overview)
- [View and manage Apache Kafka topic catalog](/docs/products/kafka/howto/view-kafka-topic-catalog)
