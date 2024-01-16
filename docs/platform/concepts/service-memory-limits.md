---
title: Service memory limits
---

The practical memory limit will always be less than the service physical
memory limit.

**All services are subject to operating overhead:**

-   A small amount of memory is required by the operating system kernel
    to manage system resources, including networking functions and disk
    cache.
-   Aiven's cloud data platform requires memory to monitor
    availability, provide metrics, logging and manage backups.

A server (or node) **usable memory** can be calculated as:

:::important
`overhead` is calculated as: .
:::

Services may utilize optional components, service integrations,
connection pooling, or plug-ins, which are not included in overhead
calculations.

If a service is overcommitted, the operating system, management layer,
backups or availability monitoring, may fail status checks or operations
due to resource contention. In severe instances, the node may fail
completely with an
[Out Of Memory](out-of-memory-conditions)
condition.

import Cap from '@site/static/includes/services-memory-capped.md'

<Cap/>
