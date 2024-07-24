---
title: Manage Apache Kafka topics with topic catalog
limited: true
---

The Aiven for Apache Kafka® topic catalog offers a user-friendly interface to manage your Apache Kafka topics within your Aiven for Apache Kafka services.

## Access topic catalog

1. Log in to the [Aiven console](https://console.aiven.io/).
1. Click **Tools**.
1. Select **Apache Kafka topic catalog**.

## Browse the topic catalog

On the Apache Kafka topic catalog page, you can:

- **View topics in a table**: This default view lists all topics in a table format, showing columns
  for the topic name, service, project, and owner.
- **Switch to card view**: Click **Tiles** to switch to the card view and browse topics displayed
  as cards.
- **Search for topics**: Enter the topic name in the search bar at the top
  to find specific topics.

## View and manage topic details

Access detailed information and perform advanced operations through the topic details
pane and topic overview page.

### Topic details pane

1. Click the name of a topic to open the topic details pane.
1. Review the general information and advanced configurations.
1. Click **Open topic page** for more details and actions.

:::note

- The **Claim topic** option is available only if governance is enabled for your organization.
- If you are not a member of the project associated with the topic, you receive a
  **Not a project member** error message when you attempt to access the topic page.
- If a group has claimed this topic, you can view the details on the **Approvals** page
  under **Governance**.

:::

### Topic overview page

On the topic overview page, you can:

#### Overview tab

View a summary of the key details of your Apache Kafka topic:

- **Topic size**: Total size of the topic data.
- **Partitions**: Number of partitions the topic is divided into.
- **Replication factor**: Replication factor set for the topic.
- **Topic tags**: Tags associated with the topic.
- **Topic owner**: Current owner of the topic.

#### Configuration tab

Review and compare the configuration settings of your Apache Kafka topics:

- **Configuration details**: Shows all the configuration parameters set for the topic.
- **Compare configurations**: Compare the configuration of the current topic with
  another topic by selecting a topic to compare.

#### Users tab

Manage and view user permissions for the topic:

- **Search for users**: Find users by username.
- **Filter by permission**: Filter users by permissions.
- **Compare user permissions**: Compare the permissions of users across different topics.

#### Messages tab

Fetch and view messages:

- Use filters like partition, offset, timeout, max bytes, and format.
- Click **Fetch messages**.

#### Schemas tab

Enable and manage schemas for the topic:

- **Subject naming strategy**: Choose a naming strategy for subjects.
- **Search schemas**: Find schemas by name.
- **Set compatibility level**: Configure the compatibility level for your schemas.
- **Delete subjects**: Remove schemas that are no longer needed.

:::note
Enable the [schema registry authorization](/docs/products/kafka/concepts/schema-registry-authorization)
for your Aiven for Apache Kafka service to use the schemas tab.
:::

## Related pages

- [Aiven for Apache Kafka® topic catalog overview](/docs/products/kafka/concepts/topic-catalog-overview)
