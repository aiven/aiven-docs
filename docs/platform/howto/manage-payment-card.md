---
title: Manage payment cards
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

The default payment method for new customers is credit card. All costs accrued over a calendar month are charged on the first day of the following month.

You can add credit cards as a payment method to your organization and use
them across different [billing groups](/docs/platform/howto/use-billing-groups)
to pay for your Aiven services.

## Add a payment card

You can add a payment card to your organization and use it as the payment method for
your billing groups. You must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to access this feature.

1. Click **Billing**.
1. Click <ConsoleLabel name="paymentmethods"/>.
1. On the **Payment cards** tab in the **Add payment card** section,
   enter the credit card details.
1. Click **Add card**.
1. Optional: Select billing groups to assign the card to and click **Assign payment card**.
   The card won't be charged for monthly payments if you don't add it to a billing group.

## Delete a payment card

To delete a payment card,
[remove it from all billing groups](/docs/platform/howto/use-billing-groups) first.

1. Click **Billing**.
1. Click <ConsoleLabel name="paymentmethods"/>.
1. On the **Payment cards** tab, find the card to delete.
1. Click **Delete** and confirm.
