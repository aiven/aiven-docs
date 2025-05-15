---
title: Free plans
---

The free plan is available for Aiven for PostgreSQL®, Aiven for MySQL, and Aiven for Valkey™ services. You don't need a credit card to sign up and you can create one free service for each type. This means you can create one free PostgreSQL, one free MySQL, and one free Valkey service.

To try a different service, you may want to consider a
30-day [free trial](/docs/platform/concepts/free-trial),
which gives you $300 USD of free credits.

You can run free plan services alongside a free 30-day trial without
affecting your trial credits. Free plan services also continue running
after the trial has expired.

## Free plan features and limitations

Free plans have some limitations, but you can use them indefinitely free
of charge. If you need more memory or access to features in the full
platform, try a [free trial](/docs/platform/concepts/free-trial).

Free plans include:

-   A single node
-   1 CPU per virtual machine
-   1 GB RAM
-   For PostgreSQL and MySQL: 5 GB disk storage
-   For Valkey: `maxmemory` set to 50%
-   Management through the Aiven Console, CLI, API, Terraform Provider, or
    Kubernetes Operator
-   Monitoring for metrics and logs
-   Backups
-   Integrations between different Aiven services including free, paid,
    and trial services

There are some limitations of the free plan services:

-   No VPC peering
-   No external service integrations
-   No forking
-   For PostgreSQL: no connection pooling
-   Support only through the [Aiven Community
    Forum](https://aiven.io/community/forum/)
-   Only one service per service type per user and
    [organization](/docs/platform/concepts/orgs-units-projects)
-   Not covered under Aiven's 99.99% SLA

Free plans do not have any time limitations. However, Aiven reserves the right:

- To shut down services if Aiven believes they violate the [acceptable use policy](https://aiven.io/terms) or are unused for some time.
- To change the cloud provider at any point in time.

## Upgrading and downgrading

You can upgrade your free plan to a paid plan at any time.

To upgrade:

1. Add a payment method or start a full platform trial.
1. Click upgrade and  choose a new plan size, cloud, and region.

:::important
If you upgrade your free plan service to a paid plan using a free trial,
your service will be terminated if you run out of trial credits and have
not entered a payment method.
:::

You can also downgrade a trial or paid plan to the free plan as long as
the data you have in that trial or paid service fits into the smaller
instance size.
