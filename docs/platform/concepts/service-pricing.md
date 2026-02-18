---
title: Service pricing
---

import RelatedPages from "@site/src/components/RelatedPages";

All Aiven services are billed based on actual usage so you only pay for the resources you use.

Services are charged by the hour while they are powered on. The minimum hourly charge
unit is one hour. For example, if you create an Aiven service and power it off after
40 minutes, you are charged for one hour of usage. After 20.5 hours, you are charged
for 21 hours. [Powering off a service](/docs/platform/concepts/service-power-cycle)
stops the accumulation of new charges immediately.

Costs for all services in a project are charged separately, but you can consolidate
the charges for multiple projects by assigning them to a
[billing group](/docs/platform/howto/use-billing-groups).

## Service plans

The cost of an Aiven service plan is all-inclusive and covers:

-   Virtual machine costs
-   Network costs
-   Backup costs
-   Setup and maintenance costs
-   Migration between clouds or plans
-   Migration to another region
-   [Credit card and processing fees payable by Aiven](#credit-card-fees)

There are additional costs for some features such as PrivateLink and
additional storage. Network traffic is not charged separately, but your
application cloud service provider might charge you for the network
traffic going to or from their services.

Learn more about and compare the different plans on the
[plans and pricing page](https://aiven.io/pricing?product=opensearch&tab=plan-pricing).

To ensure consistent performance and allow for seamless migration, all Aiven service plans
have standardized resources regardless of the underlying cloud provider.

:::note
Since available virtual machine (VM) sizes differ between clouds, services can be
provisioned on a VM with more resources (CPU, RAM, or disk storage) than advertised.
These additional resources are not guaranteed. Aiven reserves the right to switch
to a more appropriately sized VM if one becomes available from the cloud provider.
:::

### Free tier

The Free tier is available for Aiven for PostgreSQL®, Aiven for MySQL,
and Aiven for Valkey™ services. You don't need a credit card to sign up
and you can use them indefinitely free of charge.

:::note
For details about the specific limits and features of the Aiven for Apache Kafka® free tier,
see the [Kafka free tier overview](/docs/products/kafka/free-tier/kafka-free-tier).
:::

Free services include:

-   A single node
-   1 CPU per virtual machine
-   1 GB RAM
-   For PostgreSQL and MySQL: 1 GB disk storage
-   For Valkey: `maxmemory` set to 50%
-   Monitoring for metrics and logs
-   Backups

There are some limitations of the free services:

-   Cannot create the service in a VPC
-   No static IPs
-   No integrations
-   No forking
-   For PostgreSQL:
    -   No connection pooling
    -   `max_connections` limit set to `20`
-   No support services
-   Only one service of each service type in your
    [organization](/docs/platform/concepts/orgs-units-projects)
-   Not covered under Aiven's 99.99% SLA

Free services do not have any time limitations. However, Aiven reserves the right to:

- Shut down services if Aiven believes they violate the
  [acceptable use policy](https://aiven.io/terms) or are unused for some time.
  A notification is sent before services are powered off. You can
  [power them back on](/docs/platform/concepts/service-power-cycle) at any time.
- Change the cloud provider, region, or configuration at any point in time.

To try a different service or use advanced features, start a free 30-day trial.
You can run free services alongside a [free 30-day trial](#free-trials)
without affecting your trial credits. Free services also continue running after
your trial has expired.

You can upgrade your free service to a paid plan at any time by adding
a payment method to the project's billing group or by starting a free trial.
To upgrade a free service:

1. Go to the service **Overview** page.
1. In the **Service plan usage** section, click **Upgrade plan**.

The upgrade happens immediately; however, it can take up to 3 hours for
Basic tier support to be available.

You can also downgrade a paid plan to the free tier as long as:

- The data you have in that trial or paid service fits into the smaller
instance size.
- The free tier is available in the same cloud as the paid plan.

### Developer tier

The Developer tier is available for Aiven for PostgreSQL® and Aiven for MySQL services,
letting you scale up your service in a cost-effective way. Services on the Developer tier
are not automatically powered off if they're inactive.

The Developer tier includes:

-   A single node
-   1 CPU per virtual machine
-   1 GB RAM
-   up to 8 GB disk storage
-   Monitoring for metrics and logs
-   Backups
-   [Basic tier support](/docs/platform/howto/support)

Limitations of the Developer tier are:

-   No choice of cloud provider or specific cloud region
-   Cannot create the service in a VPC
-   No static IPs
-   No integrations
-   No forking
-   For PostgreSQL: No connection pooling
-   For PostgreSQL: `max_connections` limit set to `20`

Aiven reserves the right to change the cloud provider, region, or configuration
of Developer tier services at any point in time.

### Custom plans

Aiven service plans are optimized for the different clouds and to facilitate migration
between them. If the available plans aren't a good fit for your workload,
you can [request a custom plan](/docs/platform/howto/custom-plans)
to suit your specific needs.

### Credit card fees

The prices listed on the website and in your invoices are inclusive of
all credit card and processing fees that are payable by Aiven.

Some credit card issuers add extra charges on top of the fees Aiven charges
you. The most common fee is an international transaction fee.
Some issuers charge this fee for transactions where the native country
of the merchant, processor, bank, and card are different. Aiven is based
in Finland and the processor is based in the United States. Such fees are not added by
or visible to Aiven, so they cannot be included in the prices or waived.

## Free trials

Aiven offers a free trial for 30 days with $300 USD of credits to explore
the Aiven Platform. You don't need a credit card to sign up. You can use trial credits
for any paid services and paid features like virtual private cloud peering. The trial
starts when you create a service on any paid tier.

Trials include:

-   Up to 10 VMs
-   1 [Virtual Private Cloud (VPC)](/docs/platform/howto/manage-project-vpc)
-   Up to 10 VPC peering connections

<!-- vale off -->
There are some limitations:

-   You can only have one trial.
-   Trial credits are added to a single
    [billing group](/docs/platform/howto/use-billing-groups). You cannot transfer them to
    another billing group.
-   You cannot create new services if your remaining credits would be spent too quickly.
-   You cannot end a free trial yourself before the end of the trial period.
<!-- vale on -->

If you didn't add a payment card to the billing group for your project, services
in that project are automatically powered off when the trial ends or your credits run out.
To keep your services running
[add a payment card](/docs/platform/howto/manage-payment-card)
and assign it to the billing group for the project with your services.

<RelatedPages/>

- [Tax information for Aiven services](/docs/platform/concepts/tax-information)
