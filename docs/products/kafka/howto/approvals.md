---
title: Approvals
limited: true
---

The approvals page allows you to manage ownership requests for Aiven for Apache Kafka resources owned by your group.

These requests can include claims for existing topics or requests to create new topics.
You can review and process these requests to either approve or decline them.


## Requests flow

Managing requests involves several key steps:

- **Request initiation**: Users submit a request from the Apache Kafka topic catalog to
  claim ownership of an existing topic or create a topic.
- **Request visibility**: All members of the topic's owning group can see the request on
  the approvals page.
- **Review and approval**: A group member reviews the request, and either approves or
  declines it.
- **Completion**: If approved, the requested topic ownership change or topic creation
  is completed. If declined, the request is not implemented.

## Key elements

The approvals page displays the following key elements:

- **Topic**: Name of the topic
- **Type**: Claim or create request
- **Status**: Pending, approved, or declined
  - **Pending**: Awaiting approval or decline
  - **Approved**: Request approved and processed
  - **Declined**: Request declined, topic available for another group
- **Requesting group**: Group that made the request
- **Requester**: User who submitted the request
- **Requested on**: Date and time the request was made
- **Filters**: Filter the list by type, status, requester, and group
- **Search**: Search for specific topics by name

## Approve or decline requests

1. Access the Aiven Console and click **Governance > Approvals**.
1. Click a topic to open the **Review request** pane.
1. Verify the project name, service name, request type, owner group, requesting group,
   requester, request date, and message.
1. Do one of the following:
   - To **approve** a request:
     1. Click **Approve**.
     1. (Optional) Enter a message for the requester in the **Approve create request**
        pop-up window.
     1. Click **Approve** again to confirm your decision.
   - To **decline** a request:
     1. Click **Decline**.
     1. Enter a reason for declining the request in the **Decline create request**
        pop-up window.
     1. Click **Decline** again to confirm your decision.

## Related pages

- Apache Kafka topic catalog
- [Claim topic ownership](/docs/products/kafka/howto/claim-topic)
- [Group requests](/docs/products/kafka/howto/group-requests)
