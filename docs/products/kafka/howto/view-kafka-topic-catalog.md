---
title: Manage Apache Kafka topics with topic catalog
sidebar_label: Manage topic catalog
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

## Request a new topic

You can request the creation of a new topic from the Apache Kafka topic catalog page,
which goes through an approval process to ensure proper governance.

To request a new topic:

1. On the Apache Kafka topic catalog page, click **Request new topic**.
1. Select the project.
1. Select the Aiven for Apache Kafka service.
1. Select the group for topic ownership.
1. Enter a unique topic name.
1. Set the replication factor (maximum value: 3).
1. Set the number of partitions (maximum value: 8).
1. Provide a brief description of the topic.
1. If needed, enable advanced configuration and complete the additional fields.
1. Click **Submit**.

After submitting a new topic creation request, you can view and track its status on the
**Group requests** page in **Governance**. You will be notified when your request is
approved or declined.

## View and manage topic details

Use the topic details pane to view detailed information about a topic and
its advanced configurations.

### Topic details pane

1. Click the name of a topic to open the topic details pane.
1. In the topic details pane, users can:
   - View topic details.
   - View advanced configurations.
   - Claim the topic.
1. To perform advanced operations, click **Open topic page**.

For more detailed information and advanced operations available on the
topic overview page, see [Manage Apache Kafka topics in detail](/docs/products/kafka/howto/manage-topics-details).

:::note

- The **Claim topic** option is available only if governance is enabled for your organization.
- If you are not a member of the project associated with the topic, you receive a
  **Not a project member** error message when you attempt to access the topic page.
- If a group has claimed this topic, you can view the details on the **Approvals** page
  under **Governance**.

:::

## Related pages

- [Aiven for Apache Kafka® topic catalog overview](/docs/products/kafka/concepts/topic-catalog-overview)
- [Manage Apache Kafka topics in detail](/docs/products/kafka/howto/manage-topics-details).
