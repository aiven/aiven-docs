---
title: Claim topic ownership
limited: true
---

To take ownership of a topic that your group does not currently own, you can submit a claim request. Once the request is sent, the current owner can either approve or decline it.

## Prerequisites

[Governance](/docs/products/kafka/howto/enable-governance) enabled for your organization.

## Claim single topic

1. In the Aiven Console, click **Tools** > **Apache Kafka topic catalog**.
1. Click the topic name to open the **Topic details** pane.
1. Click **Claim topic**.
1. In the **User group** field, select the group to assign as the owner.
1. Optionally, enter a message for the approver explaining why you are claiming ownership.
1. Click **Claim**.

Alternatively:

1. Click **Open topic page** in  the **Topic details** pane.
1. From the **Overview** tab, click **Claim topic**.
1. In the **User group** field, select the group to assign as the owner.
1. Optionally, enter a message for the approver explaining why you are claiming ownership.
1. Click **Claim**.

:::note

- If another group has already requested ownership of the topic, you
  cannot claim ownership.
- You receive notifications when your request is approved or declined.

:::

## Claim multiple topics

1. Click the checkbox next to the **Topic** heading to select all topics you can claim.
1. Click **Claim ownership**.
1. In the **User group** field, select the group to be assigned as the owner.
1. Optionally, enter a message for the approver explaining why you are claiming ownership.
1. Click **Claim**.

## View and track claim requests

1. Click the topic in the topic catalog.
1. In the **Topic details** pane, under the **Topic owner** section, click **Open Group requests**.

Alternatively:

1. Click **Tools** > **Governance** > **Group requests**.
1. Search for your topic to view its status.

## Delete a claim request

To withdraw your ownership claim request, follow these steps:

1. Click **Tools** > **Governance** > **Group requests**.
1. Search for and click the topic to delete the ownership claim request for.
1. In the topic details pane, click **Delete**.
1. The review status updates to **Deleted** in the pane and on the Group requests page.

## Related pages

- Governance in Aiven for Apache Kafka
- Apache Kafka topic catalog
- [Approvals](/docs/products/kafka/howto/approvals)
- [Group requests](/docs/products/kafka/howto/group-requests)
