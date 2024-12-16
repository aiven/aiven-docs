---
title: Claim topic ownership
limited: true
---
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

To take ownership of a topic that your group does not currently own, you can submit a claim request. Once you send the request, the current owner can approve or decline it.

## Prerequisites

[Governance](/docs/products/kafka/howto/enable-governance) enabled for your organization.

## Claim a single topic

1. Access the [Aiven console](https://console.aiven.io/), and
   click **Tools** > **Apache Kafka topic catalog**.
1. Click the topic name to open the **Topic details** pane.
1. Click **Claim topic**.
1. In the **User group** field, select the group to assign as the owner.
1. (Optionally) Enter a message for the approver explaining why you are claiming ownership.
1. Click **Claim**.

Alternatively:

1. Click **Open topic page** in  the **Topic details** pane.
1. From the **Overview** tab, click **Claim topic**.
1. In the **User group** field, select the group to assign as the owner.
1. (Optionally) Enter a message for the approver explaining why you are claiming ownership.
1. Click **Claim**.

:::note

- If another group has already requested ownership of the topic, you
  cannot claim ownership.
- You receive notifications when your request is approved or declined.

:::

## Claim multiple topics

1. Select the checkbox next to the **Topic** heading to select all claimable topics,
   or individually select the checkboxes for the topics to claim.
1. Click **Claim ownership**.
1. In the **User group** field, select the group to be assigned as the owner.

   :::note
   Users can belong to multiple groups. Ensure you select the appropriate group.
   :::

1. (Optionally) Enter a message for the approver explaining why you are claiming ownership.
1. Click **Claim**.

## View and track topic claim requests

1. Click **Tools** > **Apache Kafka topic catalog**.
1. Click the topic.
1. In the **Topic details** pane, under the **Topic owner** section, click
   **Open Group requests**.

Alternatively:

1. Click **Tools** > **Governance** > **<ConsoleLabel name="Group requests"/>**.
1. Search for your topic to view its status.

## Delete a topic claim request

To delete your topic ownership claim request:

1. Click **Tools** > **Governance** > **<ConsoleLabel name="Group requests"/>**.
1. Search for and click the topic to delete the ownership claim request for.
1. In the **Topic details** pane, click **Delete**.

The review status updates to **Deleted** in the pane and on the **Group requests** page.

## Related pages

- [Governance in Aiven for Apache Kafka](/docs/products/kafka/concepts/governance-overview)
- [Apache Kafka topic catalog](/docs/products/kafka/concepts/topic-catalog-overview)
- [Approvals](/docs/products/kafka/howto/approvals)
- [Group requests](/docs/products/kafka/howto/group-requests)
