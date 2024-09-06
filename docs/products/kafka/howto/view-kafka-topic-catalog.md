---
title: Manage Apache Kafka® topics with topic catalog
sidebar_label: Manage topic catalog
early: true
---

The [Aiven for Apache Kafka® topic catalog](/docs/products/kafka/concepts/topic-catalog-overview) offers a user-friendly interface to manage your Apache Kafka topics within your Aiven for Apache Kafka services.

## Access the topic catalog

1. Log in to the [Aiven console](https://console.aiven.io/).
1. Click **Tools**.
1. Select **Apache Kafka topic catalog**.

## Browse the topic catalog

On the Apache Kafka topic catalog page, you can:

- **View topics in a table**: This default view lists all topics in a table format,
  showing columns for the topic name, service, project, and owner.
- **Switch to card view**: Click **Tiles** to switch to the card view and browse topics
  displayed as cards.
- **Search for topics**: Enter the topic name in the search bar at the top
  to find specific topics.

## Request a new topic

You can request the creation of a new topic from the Apache Kafka topic catalog page,
which goes through an approval process to ensure proper [governance](/docs/products/kafka/concepts/governance-overview).

To request a new topic:

1. On the Apache Kafka topic catalog page, click **Request new topic**.
1. On the Request topic form:
   - Select the project.
   - Select the Aiven for Apache Kafka service.
   - Select the group for topic ownership.
   - Enter a unique topic name.
   - Set the replication factor.
   - Set the number of partitions.
   - Provide a brief description of the topic.
   - If needed, enable advanced configuration and complete the additional fields.
1. Click **Submit**.

After submitting a new topic creation request, you can view and track its status on the
**Group requests** page in **Governance**. You receive a notification when your request
is approved or declined.

## View and manage topic details

Use the topic details pane to view detailed information about a topic and
its advanced configurations.

1. Click the name of a topic to open the topic details pane.
1. In the topic details pane, you can:
   - View topic details.
   - View advanced configurations.
   - Claim the topic.
1. To perform advanced operations, click **Open topic page**.

   :::note
   Only users who are added to the project associated with the topic will see
   the **Open topic page** link.
   :::


For more detailed information and advanced operations available on the
topic overview page, see [Manage Apache Kafka topics in detail](/docs/products/kafka/howto/manage-topics-details).

:::note

- The **Claim topic** option is available only if [governance is enabled](/docs/products/kafka/howto/enable-governance) for your
  organization.
- If a group has claimed this topic, you can view the details on the **Approvals** page
  under **Governance**.

:::

## Related pages

- [Aiven for Apache Kafka® topic catalog](/docs/products/kafka/concepts/topic-catalog-overview)
- [Manage Apache Kafka topics in detail](/docs/products/kafka/howto/manage-topics-details).
- [Aiven for Apache Kafka® governance](/docs/products/kafka/concepts/governance-overview)
