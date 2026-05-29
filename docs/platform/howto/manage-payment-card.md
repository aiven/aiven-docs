---
title: Manage credit cards
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"

Add credit cards to your organization and use them across different [billing groups](/docs/platform/howto/use-billing-groups) to pay for your Aiven services.

## Add a card

You can add a credit card as a payment method in your organization and
assign it to different billing groups. You must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to access this feature.

1. Click **Billing**.
1. Click <ConsoleLabel name="paymentmethods"/>.
1. Click **Add card**.
1. Enter the credit card details and click **Add card**.
1. Optional: Select billing groups to assign the card to and click **Assign payment card**.
   The card won't be charged for monthly payments if you don't assign it to a billing group.

## Delete a card

To delete a credit card,
[remove it from all billing groups](/docs/platform/howto/use-billing-groups) first.

1. Click **Billing**.
1. Click <ConsoleLabel name="paymentmethods"/>.
1. On the **Cards** tab, find the card to delete.
1. Click <ConsoleLabel name="delete"/>.
