---
title: Connection limits per plan for Aiven for PostgreSQL®
sidebar_label: Connection limits per plan
---

import RelatedPages from "@site/src/components/RelatedPages";

Find the default `max_connections` value for each Aiven for PostgreSQL® plan, and learn
how to change it for your service.

By default, Aiven for PostgreSQL® instances limit the number of allowed connections to
make sure that the database is able to serve them all.

## `max_connections` defaults

Default values of the `max_connections` setting vary according to the service plan:

|                 Plan                  | Max connections |
| ------------------------------------- | --------------- |
| Developer                             | 15              |
| Free                                  | 20              |
| Hobbyist                              | 25              |
| Startup/Business/Premium-4            | 100             |
| Startup/Business/Premium-8            | 200             |
| Startup/Business/Premium-16           | 400             |
| Startup/Business/Premium-32           | 800             |
| Startup/Business/Premium-64 and above | 1000            |

:::note
Aiven can utilize any number of the connections for managing the service.
:::

Aiven for PostgreSQL doesn't apply a fixed per-GiB connection formula (for example, 100
connections per GiB of RAM). The plan-based defaults in the preceding table are the only
default values, and there's no separate `max_connection_limit` setting.
`max_connections` is the only parameter that controls the total number of connections
for your service.

:::tip
During a connection-exhaustion incident, use an AI assistant connected to
[Aiven MCP](/docs/tools/mcp-server) to check current connection usage against
the configured limit. For example:

> Show the current connection count on `my-pg-service`, grouped by role and
> state, and compare the total with `max_connections`.
:::

## Increase or decrease `max_connections`

To increase or decrease the number of allowed connections for your service, set the
[`max_connections`](/docs/products/postgresql/reference/advanced-params#pg_max_connections)
parameter, which accepts a value from 25 to 60000.

:::note
Changing `max_connections` causes a service restart. If your service has a read
replica, increase the replica's value first. After that change is applied, increase the
primary service's value.
:::

## Use connection pooling

When several clients or client threads are connecting to the database,
Aiven recommends using
[connection pooling](/docs/products/postgresql/concepts/pg-connection-pooling) to limit
the number of actual backend connections.
Connection pooling is available in all Aiven for PostgreSQL Startup,
Business, and Premium plans, and can be
[configured in the console](/docs/products/postgresql/howto/manage-pool).

<RelatedPages />

- [Advanced parameters for Aiven for PostgreSQL](/docs/products/postgresql/reference/advanced-params)
- [Aiven for PostgreSQL connection pooling](/docs/products/postgresql/concepts/pg-connection-pooling)
- [Manage a connection pool](/docs/products/postgresql/howto/manage-pool)
- [Change the service plan](/docs/products/postgresql/howto/change-service-plan)
