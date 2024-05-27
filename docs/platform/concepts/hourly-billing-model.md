---
title: Billing
---

In the **Billing** section of the [Aiven Console](https://console.aiven.io), you can manage your [billing groups](/docs/platform/concepts/billing-groups), [payment cards](/docs/platform/howto/manage-payment-card), and view and download your invoices.

To access the **Billing** section of the Aiven Console for an organization,
you have to be a [super admin](/docs/platform/howto/make-super-admin).
Other users have read-only access to some billing information like billing group
details and invoices using the API.

## Service charges

The prices shown in the Aiven console are all-inclusive. The following costs are
included in the hourly service price:

-   Virtual machine costs
-   Network costs
-   Backup costs
-   Setup costs

:::note
While network traffic is not charged separately, your application cloud
service provider may charge you for the network traffic going to or from
their services.

Use of PrivateLink and additional storage incurs additional costs on
top of the hourly service usage rate.
:::

The minimum hourly charge unit is one hour. For example, when you launch
an Aiven service and terminate it after 40 minutes, you are charged
for one full hour. Likewise, if you terminate a service after 40.5
hours, you are charged for 41 hours.

[Terminating or pausing a service](/docs/platform/concepts/service-power-cycle) stops
the accumulation of new charges immediately.
However, the minimum hourly charge unit still applies before terminating or pausing
a service.

Migrating a service to another cloud region or to a different cloud provider does not
incur any additional costs.

## Related pages

- [Billing groups](/docs/platform/concepts/billing-groups)
- [Payment methods](/docs/platform/howto/list-billing)
