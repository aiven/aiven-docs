---
title: Manage group requests
limited: true
---
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

The **Group requests** page allows you to view and track requests you and other members of your group made for Aiven for Apache Kafka® resources.
These requests can include claims for existing topics or requests to create new topics.

## Key elements

The **group requests** page displays the following key elements:

- **Topic**: Name of the topic
- **Type**: Type of request
- **Status**: Current status of the request
  - **Approved**: Request approved and processed
  - **Declined**: Request declined. The topic is now available for another group to claim
  - **Deleted**: Request deleted by the requester
  - **Failed**: Request cannot complete the required action (for example, due to
    Apache Kafka cluster issues or connectivity problems)
  - **Pending**: Request awaiting approval or decline
  - **Provisioning**: Request in progress. The topic is being created on the Apache Kafka
    cluster
- **Requesting group**: Group that made the request
- **Requester**: User who submitted the request
- **Requested on**: Date and time the request was made
- **Filters**: Filter the list by type, status, requester, and group
- **Search function**: Search for specific topics by name

## View and track requests

To view and track requests made by you and other members of your group:

- Access the [Aiven console](https://console.aiven.io/) and click
   **Tools** > **Governance** > **<ConsoleLabel name="Group requests"/>**.
- Use the search bar to find specific requests by topic name.
- Filter requests by type, status, requester, and group.
- Click the topic name to view detailed information about the request.

## Delete requests

You can only delete requests you have created. You can view requests from other group
members but cannot delete them.

1. Access the [Aiven console](https://console.aiven.io/) and click
   **Tool** > **Governance** > **<ConsoleLabel name="Group requests"/>**.
1. Click the topic name to delete.
1. In the **Review request** pane, click **Delete**.

## Related pages

- [Governance in Aiven for Apache Kafka](/docs/products/kafka/concepts/governance-overview)
- [Aiven for Apache Kafka® topic catalog](/docs/products/kafka/concepts/topic-catalog-overview)
- [Claim topic ownership](/docs/products/kafka/howto/claim-topic)
- [Approvals](/docs/products/kafka/howto/approvals)
