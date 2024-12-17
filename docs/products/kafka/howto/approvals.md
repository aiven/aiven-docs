---
title: Manage approvals
limited: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

The **Approvals** page allows you to manage requests for Aiven for Apache Kafka® resources owned by your group.
These requests can include claims for existing topics or requests to create new topics.

## Requests flow

Managing requests involves several key steps:

- **Request initiation**: Users submit a request from the Apache Kafka topic catalog to
  claim ownership of an existing topic or create a topic.
- **Request visibility**: All members of the topic's owning group can see the request on
  the **Approvals** page.
- **Review and approval**: A group member reviews the request and either approves or
  declines it.
- **Completion**: If approved, the requested change of topic ownership or topic creation
  is completed. If declined, the request is not implemented.

## Key elements

The approvals page displays the following key elements:

- **Topic**: Name of the topic
- **Type**: Type of request
- **Status**: Current status of the request
  - **Approved**: Request approved and processed
  - **Declined**: Request declined. The topic is now available for another group to claim
  - **Deleted**: Request deleted by the requester
  - **Failed**: Request cannot complete the required action  (for example, due to
    Apache Kafka cluster issues or connectivity problems)
  - **Pending**: Request awaiting approval or decline
  - **Provisioning**: Request in progress. The topic is being created on the Apache Kafka
    cluster
- **Requesting group**: Group that made the request
- **Requester**: User who submitted the request
- **Requested on**: Date and time the request was made
- **Filters**: Filter the list by type, status, requester, and group
- **Search**: Search for specific topics by name

## Approve or decline requests

1. Access the [Aiven console](https://console.aiven.io/), and click
   **Tools** > **Governance** > **<ConsoleLabel name="Approvals"/>**.
1. Click a topic to open the **Review request** pane.
1. Review the request details.
1. Do one of the following:
   - To **approve** a request:
     1. Click **Approve**.
     1. Optional: Enter a message for the requester in the **Approve create request**
        pop-up window.
     1. Click **Approve** to confirm.
   - To **decline** a request:
     1. Click **Decline**.
     1. Enter a reason for declining the request in the **Decline create request**
        pop-up window.
     1. Click **Decline** to confirm.

## Related pages

- [Aiven for Apache Kafka® topic catalog](/docs/products/kafka/concepts/topic-catalog-overview)
- [Claim topic ownership](/docs/products/kafka/howto/claim-topic)
- [Group requests](/docs/products/kafka/howto/group-requests)
