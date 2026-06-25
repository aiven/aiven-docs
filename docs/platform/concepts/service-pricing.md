---
title: Service pricing
---

import RelatedPages from "@site/src/components/RelatedPages";
import FreeTierDisclaimer from "@site/static/includes/free-tier-disclaimer.md";

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

- Virtual machine costs
- Network costs
- Backup costs
- Setup and maintenance costs
- Migration between clouds or plans
- Migration to another region
- [Credit card and processing fees payable by Aiven](#credit-card-fees)

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

The Free tier is available for the following service types:

- [Aiven for Apache Kafka®](/docs/products/kafka/free-tier/kafka-free-tier)
- [Aiven for MySQL®](/docs/products/mysql/concepts/mysql-free-tier)
- [Aiven for OpenSearch®](/docs/products/opensearch/concepts/opensearch-free-tier)
- [Aiven for PostgreSQL®](/docs/products/postgresql/concepts/pg-free-tier)
- [Aiven for Valkey™](/docs/products/valkey/concepts/valkey-free-tier)

You don't need a credit card to create a free service
and you can use them indefinitely free of charge.

<FreeTierDisclaimer/>

You can run free services alongside a free trial
without affecting your trial credits. Free services also continue running after
your trial has expired. You can upgrade your free service to a paid plan at any time
by adding a payment method to the project's billing group.

### Developer tier

Developer tier plans, pricing, and limits vary by product. Developer tier services are
not automatically powered off when inactive.

#### Aiven for Apache Kafka®

Aiven for Apache Kafka® has a separate [Developer tier](/docs/products/kafka/dev-tier/kafka-dev-tier)
paid plan for development and testing, with its own throughput, storage, retention, and
pricing.

#### Aiven for OpenSearch

The Aiven for OpenSearch Developer tier provides you with always-on OpenSearch for
prototypes and personal projects.

The Aiven for OpenSearch Developer tier includes:

-   Single node
-   1 CPU per virtual machine
-   4 GB RAM
-   30 GB storage
-   2 shards, maximum 20 shards per node
-   Up to 50 concurrent connections
-   Daily backups
-   Aiven and third-party service integrations
-   [Basic tier support](/docs/platform/howto/support)

Limitations of the Aiven for OpenSearch Developer tier are:

-   No choice of cloud provider or specific cloud region
-   Cannot create the service in a VPC
-   No static IPs
-   No dynamic disk scaling
-   No forking

Aiven reserves the right to change the cloud provider, region, or configuration
of these Developer tier services at any point in time.

#### Aiven for PostgreSQL and Aiven for MySQL

The Developer tier is available for Aiven for PostgreSQL® and Aiven for MySQL® services,
letting you scale up your service in a cost-effective way.

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
of these Developer tier services at any point in time.

#### Aiven for Valkey™

The Aiven for Valkey Developer tier includes:

-   Single node
-   2 CPUs per VM
-   4 GB RAM per VM
-   Monitoring for metrics and logs
-   Backups
-   [Basic tier support](/docs/platform/howto/support)

Limitations of the Aiven for Valkey Developer tier are:

-   No choice of cloud provider or specific cloud region
-   Cannot create services in VPCs
-   No static IPs
-   No integrations
-   No forking

Aiven reserves the right to change the cloud provider, region, or configuration
of Aiven for Valkey Developer tier services at any point in time.

### Custom plans

If the service plans don't fit your use cases, you can request a custom plan.
Custom plans are most useful for special cases,
like a very high throughput cluster.

Custom plans are available for all Aiven service types. The starting price
is $5,000 USD per month. You can adjust the following in custom plans:

- Storage capacity
- Backup frequency
- Number of nodes
- CPU/RAM configuration per node

There can be limitations depending on the cloud provider, region,
available instance types, and service type.

#### Request a custom plan

To get a quote for a custom plan:

Contact the [sales team](https://aiven.io/contact) with
the following information:

- **Cloud**: The cloud provider and region, for example: Google Cloud `us-east1`.
- **Service type**: For example: Aiven for PostgreSQL®.
- **Aiven project**: The name of the project to add the custom plan to.
- **Configuration**: The storage, backup frequency, or other variables to
  change from the default plan.

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
starts when you create your Aiven user account.

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
