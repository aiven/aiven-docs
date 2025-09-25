---
title: Billing and payment
---

import RelatedPages from "@site/src/components/RelatedPages";

You can make payments by credit card, bank transfer, or using your AWS, Google Cloud, or Azure [marketplace subscriptions](/docs/platform/howto/list-marketplace-payments).

To pay for services, you have to assign every project with services to a
[billing group](#billing-groups).
The [costs for all services](/docs/platform/concepts/billing-and-payment#service-charges)
in a project are charged to the [payment method](/docs/platform/howto/manage-payment-card)
of the billing group assigned to that project.

Billing information, invoices, and a breakdown of charges by category, and billing groups
are available in the **Billing** section of the Aiven Console. To access this section, you must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions).
Other users have read-only access to some billing information like billing group details
and invoices using the API.

## Billing groups

[Billing groups](/docs/platform/howto/use-billing-groups)
store payment details in one place,
including a payment method,
[billing and shipping addresses](/docs/platform/howto/manage-billing-addresses),
and billing contacts. This lets you use the same payment details across
different projects within your organization, including those in other organizational units.

You can use billing groups to combine costs based on categories like your organization's
departments or IT environments. You receive a
[consolidated invoice](/docs/platform/concepts/billing-and-payment) for all projects
assigned to a billing group. Aiven [credits](/docs/platform/howto/trial-credits)
are also assigned to a billing group and are automatically used to cover charges
of any project assigned to that billing group.

Billing groups are created and managed at the organization level.
You [assign billing groups to projects](/docs/platform/howto/use-billing-groups)
in the project settings.

You can only use a billing group for payments in one organization. You
cannot use a billing group for projects that are in other organizations.

<RelatedPages/>

- Create [billing groups](/docs/platform/howto/use-billing-groups)
  for your organization.
- Use the [invoice API](https://api.aiven.io/doc/#tag/BillingGroup) to export
  cost information to business intelligence tools.
