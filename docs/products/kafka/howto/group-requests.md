---
title: Group requests
limited: true
---

The group requests page allows you to view and track ownership requests made by you and other members of your group for Aiven for Apache Kafka resources.
These requests can include claims for existing topics or requests to create new topics.

### Key elements

The group requests page displays the following key elements:

- **Topic**: Name of the topic
- **Type**: Indicates the type of request
- **Status**: Current status of the request
  - **Pending**: Awaiting approval or decline
  - **Approved**: Request approved and processed
  - **Declined**: Request declined, topic available for another group
  - **Deleted**: Request has been deleted
- **Requesting group**: Group that made the request
- **Requester**: User who submitted the request
- **Requested on**: Date and time the request was made
- **Filters**: Filter the list by type, status, requester, and group
- **Search function**: Search for specific topics by name

### Delete requests

You can only delete requests you have created. You can view requests from other group
members but cannot delete them.

1. Access the Aiven Console, and click **Governance > Group requests**.
1. Click the topic name to delete.
1. In the **Review request** pane, click **Delete**.

## Related pages

- Governance in Aiven for Apache Kafka
- Apache Kafka topic catalog
- [Claim topic ownership](/docs/products/kafka/howto/claim-topic)
- [Approvals](/docs/products/kafka/howto/approvals)
