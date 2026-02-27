---
title: Manage cards
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"

You can add credit cards as a payment method to your organization and use them across different [billing groups](/docs/platform/howto/use-billing-groups) to pay for your Aiven services.

## Add a credit card

You can add a card to your organization and use it as the payment method for
your billing groups. You must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to access this feature.

1. Click **Billing**.
1. Click <ConsoleLabel name="paymentmethods"/>.
1. On the **Cards** click **Add card**.
1. Enter the card details and click **Add card**.
1. Optional: Select billing groups to assign the card to and click **Assign card**.
   The card won't be charged for monthly payments if you don't add it to a billing group.

## Delete a credit card

To delete a card,
[remove it from all billing groups](/docs/platform/howto/use-billing-groups) first.

1. Click **Billing**.
1. Click <ConsoleLabel name="paymentmethods"/>.
1. On the **Cards** tab, find the card and click <ConsoleIcon name="delete"/>.
