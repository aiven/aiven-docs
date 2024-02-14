---
title: Free plans
---

The free plan is available for Aiven for PostgreSQL®, Aiven for MySQL,
and Aiven for Redis®\* services. You don\'t need a credit card to sign
up and you can create one free service for each type. This means you can
create one free PostgreSQL, one free MySQL, and one free Redis service.

To try a different service, you may want to consider a
30-day
[free trial](/docs/platform/concepts/free-trial), which gives you $300 USD of free credits.

You can run free plan services alongside a free 30-day trial without
affecting your trial credits. Free plan services also continue running
after the trial has expired.

## Free plan features and limitations

Free plans have some limitations, but they can be run indefinitely free
of charge. If you need more memory or access to features in the full
platform, the free trial may be a better option.

Free plans include:

-   A single node
-   1 CPU per virtual machine
-   1 GB RAM
-   For PostgreSQL and MySQL: 5 GB disk storage
-   For Redis: `maxmemory` set to 50%
-   Management via our web console, CLI, API, Terraform provider, or
    Kubernetes® operator
-   Monitoring for metrics and logs
-   Backups
-   Integrations between different Aiven services including free, paid,
    and trial services
-   DigitalOcean hosting in a limited number of regions:
    -   EMEA: do-ams (Amsterdam), do-ldn (London), do-fra (Frankfurt)
    -   Americas: do-nyc (New York), do-sfo (San Francisco), do-tor
        (Toronto)
    -   APAC: do-blr (Bangalore)

There are some limitations of the free plan services:

-   No VPC peering
-   No external service integrations
-   No forking
-   For PostgreSQL: no connection pooling
-   Support only through the [Aiven Community
    Forum](https://aiven.io/community/forum/)
-   Only a limited number of DigitalOcean regions, no other cloud
    providers
-   Only one service per service type per user and
    [organization](/docs/platform/concepts/projects_accounts_access)
-   Not covered under Aiven's 99.99% SLA

Free plans do not have any time limitations. However, Aiven reserves the
right to shut down services if we believe they violate the [acceptable
use policy](https://aiven.io/terms) or are unused for some time.

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
