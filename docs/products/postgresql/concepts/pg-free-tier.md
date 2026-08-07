---
title: Aiven for PostgreSQL® free tier
sidebar_label: Free tier
---

import FreeTierDisclaimer from "@site/static/includes/free-tier-disclaimer.md";
import FreeTierUpgrade from "@site/static/includes/free-tier-upgrade-downgrade.md";
import RelatedPages from "@site/src/components/RelatedPages";

Use Aiven for PostgreSQL® for free. You don't need a credit card to sign up
and you can use it indefinitely free of charge.

## Features and limitations

Free PostgreSQL services include:

-   A single node
-   1 CPU per virtual machine
-   1 GB RAM
-   1 GB disk storage
-   Monitoring for metrics and logs
-   Backups
-   Support for PostgreSQL extensions

There are some limitations of the free tier:

-   Cannot create a service in a VPC
-   Cannot fork a service to a free plan
-   No static IPs
-   No integrations
-   No connection pooling
-   `max_connections` limit set to `20`
-   No support services
-   Only one service of each service type in your
    [organization](/docs/platform/concepts/orgs-units-projects)
-   Not covered under Aiven's 99.99% SLA

<FreeTierDisclaimer/>

## Upgrade or downgrade a free service

<FreeTierUpgrade/>

<RelatedPages/>

- [Get started with Aiven for PostgreSQL®](/docs/products/postgresql/get-started)
- [Supported extensions](/docs/products/postgresql/reference/list-of-extensions)
- [Change a service plan](/docs/platform/howto/scale-services)
- [Service pricing](/docs/platform/concepts/service-pricing)
