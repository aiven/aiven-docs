---
title: Group requests
limited: true
---

The group requests page allows you to view and track requests made by you and other members of your group for Aiven for Apache Kafka resources.
These requests can include claiming existing topics or creating new topics.

### Key elements

The group requests page displays the following key elements:

- **Topic**: Name of the topic
- **Type**: Indicates the type of request
- **Status**: Current status of the request
  - **Approved**: Request approved and processed
  - **Declined**: Request declined. The topic is now available for another group to claim
  - **Deleted**: Request has been deleted by the requester
  - **Failed**: Request could not complete the required action (for example, due to
    Apache Kafka cluster issues or connectivity problems)
  - **Pending**: Request awaiting approval or decline
  - **Provisioning**: Request in progress. Topic is being created on the Apache Kafka
    cluster
- **Requesting group**: Group that made the request
- **Requester**: User who submitted the request
- **Requested on**: Date and time the request was made
- **Filters**: Filter the list by type, status, requester, and group
- **Search function**: Search for specific topics by name

### Delete requests

You can only delete requests you have created. You can view requests from other group
members but cannot delete them.

1. Access the [Aiven console](https://console.aiven.io/), and click
   **Governance > Group requests**.
1. Click the topic name to delete.
1. In the **Review request** pane, click **Delete**.

## Related pages

- Governance in Aiven for Apache Kafka
- Apache Kafka topic catalog
- [Claim topic ownership](/docs/products/kafka/howto/claim-topic)
- [Approvals](/docs/products/kafka/howto/approvals)
