---
title: Billing and payment
---

import RelatedPages from "@site/src/components/RelatedPages";

Billing on the Aiven Platform is managed through billing groups.
To pay for services, you assign every project to a [billing group](#billing-groups).
The [costs for all services](/docs/platform/concepts/service-pricing)
in a project are charged to the [payment method](#payment-methods)
of the billing group assigned to that project.

To view or manage billing information, you must be an
organization admin or have one of the billing
[permissions](/docs/platform/concepts/permissions).

## Billing groups

[Billing groups](/docs/platform/howto/use-billing-groups)
store payment details in one place such as:
- payment method
- [billing and shipping addresses](/docs/platform/howto/manage-billing-addresses)
- billing contact emails

This lets you use the same payment information across different projects
within your organization, including those in other organizational units.

You receive a consolidated invoice for all projects
assigned to a billing group. Use billing groups to combine costs
based on categories like an organization's departments or IT environments.

You create and manage billing groups at the organization level, and
you [assign billing groups to projects](/docs/platform/howto/use-billing-groups#assign-a-billing-group-to-a-project)
in the project settings.

You cannot use a billing group for projects that are in other organizations.

## Payment methods

The default payment method for new customers is [credit card](/docs/platform/howto/manage-payment-card).
All costs accrued over a calendar month are charged to the billing group's card
on the first day of the following month.

You can also make payments using your AWS, Google Cloud,
or Azure [marketplace subscriptions](/docs/platform/howto/list-marketplace-payments).
Alternatively, you can
[request to pay by bank transfer](/docs/platform/howto/manage-bank-transfers).

When you redeem Aiven [credits](/docs/platform/howto/credits),
they're assigned to a billing group as a payment method.
Credits are automatically used to cover charges of any project assigned to that billing group.

<RelatedPages/>

- Create [billing groups](/docs/platform/howto/use-billing-groups)
  for your organization.
- Use the [invoice API](https://api.aiven.io/doc/#tag/BillingGroup) to export
  cost information to business intelligence tools.
