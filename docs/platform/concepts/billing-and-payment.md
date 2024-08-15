---
title: Billing and payment
---

In the **Billing** section of the [Aiven Console](https://console.aiven.io), you can manage your [billing groups](/docs/platform/concepts/billing-groups), [payment methods](/docs/platform/howto/manage-payment-card), and view and download your invoices.

To access this in the console, you have to be a
[super admin](/docs/platform/howto/make-super-admin). Other users have read-only access
to some billing information like billing group details and invoices using the API.

## Service charges

Services are billed by the hour. The minimum hourly charge unit is one hour.
For example, if you create an Aiven service and power it off after 40 minutes,
you are charged for one hour of usage. After 40.5 hours, you are charged
for 41 hours. [Powering off a service](/docs/platform/concepts/service-power-cycle)
stops the accumulation of new charges immediately. However, the minimum
hourly charge unit still applies before terminating or pausing a service.

Costs are calculated for the powered-on services in each project. Projects
are charged separately, but the charges for multiple projects can be
consolidated by assigning them to a
[billing group](/docs/platform/concepts/billing-groups).

The prices shown in the Aiven Console are inclusive of:

-   Virtual machine costs
-   Network costs
-   Backup costs
-   Setup costs

There are additional costs for PrivateLink and additional storage. Network traffic
is not charged separately, but your application cloud service provider may
charge you for the network traffic going to or from their services.

Migrating a service to another cloud provider or region does not incur any
additional costs.

## Credit card fees

The prices listed of our website and in your invoices are inclusive of
all credit card and processing fees related to the charges that are
visible to us and payable by us. This includes transaction fees with our
credit card processor (Stripe) and the fees various card issuers charge
from merchants.

Some credit card issuers may unfortunately add extra charges on top of
the fees charged by us from your cards. The most common such fee is an
international transaction fee charged by some issuers for all transactions
where the native countries of the merchant, processor, bank and card are
different. Aiven's native country is Finland and the processor is based in the US.
The fee may be applied even if the card was charged in the card's default currency.

Such fees are not added by Aiven and are not visible to us or our credit
card processor, so we're unable to include them in our prices or
waive the fees.

## Payment types

You can make payments by credit card or get invoices emailed to your billing contacts.

### Credit card payments

The default payment method for new customers is credit card. All costs accrued
over a calendar month are charged on the first day of the following month.

### Invoice payments

We offer invoice billing for customers who have at least 1,000 USD in
monthly recurring revenue (MRR). Monthly invoices are generated at the
end of the month based on actual usage and a PDF is emailed to the
billing contact email addresses configured in the Aiven Console.

Prices for Aiven services are always defined in US dollars, but invoices
can also be sent in other currencies. Invoices in different currencies
are created based on the exchange rates on the date of the invoice:

-   Australian dollars
-   Canadian dollars
-   Swiss francs
-   Danish kroner
-   Euros
-   Pounds sterling
-   Japanese yen
-   Norwegian kroner
-   New Zealand dollars
-   Swedish kronor
-   US dollars

To switch from credit card charges to bank transfers,
contact [sales@aiven.io](mailto:sales@aiven.io) to request invoice billing.

## Related pages

- [Billing groups](/docs/platform/concepts/billing-groups)
- [Payment methods](/docs/platform/howto/payment-methods.md)
- Use the [invoice API](https://api.aiven.io/doc/#tag/BillingGroup) to export
  cost information to business intelligence tools
