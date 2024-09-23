---
title: Optimize Aiven for PostgreSQL® slow queries
sidebar_label: Optimize queries
keywords: ["AI", "Artificial intelligence", "Aiven AI Database Optimizer"]
---

import EarlyBadge from "@site/src/components/Badges/EarlyBadge";
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Optimize slow queries to ensure maximum service performance. Use Aiven's AI capabilities or  `pg_stat_statements` to identify optimization opportunities.

:::note
For one-time query optimizations when you do not run an Aiven for PostgreSQL® service,
use the [standalone SQL query optimizer][optimizer].
:::

## Artificial intelligence recommendations

Use **Aiven AI Database Optimizer** to suggest optimizations to your databases and queries.

Aiven considers various aspects to suggest optimization, for example query
structure, table size, existing indexes and their cardinality, column types and
sizes, the connections between the tables and columns in the query.

To optimize a query automatically:

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for
   PostgreSQL service.
1. Click <ConsoleLabel name="AI insights"/>.
1. For the query of your choice, click **Optimize**.
1. In the **Query optimization report** window, see the optimization suggestion and apply
   the suggestion by running the provided SQL queries.

   - To display potential alternative optimization recommendations, click **Advanced options**.
   - To display the diff view, click **Query diff**.
   - To display explanations about the optimization, click **Optimization details**.

:::note
The quality of the optimization suggestions is proportional to the amount of
data collected about the performance of your database.
:::

## Manual optimization

Aiven for PostgreSQL allows you to
[identify slow queries](/docs/products/postgresql/howto/identify-pg-slow-queries)
using the `pg_stat_statements` view.

### Limit the number of indexes

Having many database indexes on a table can reduce write performance
due to the overhead of maintaining them.

### Handle an increase in database connections

When your application code scales horizontally to accommodate high
loads, you might find that you inadvertently reach the
[connection limits](/docs/products/postgresql/reference/pg-connection-limits) for your
plan. Each connection in PostgreSQL runs in a
separate process, and this makes them more expensive (compared to
threads, for example) in terms of inter-process communication and memory
usage, since each connection consumes a certain amount of RAM.

In such cases, you can use the
[connection pooling](/docs/products/postgresql/concepts/pg-connection-pooling),
based on [PgBouncer](https://www.pgbouncer.org), to handle
an increase in database connections. You can add and configure the
connection pooling for your service in the <ConsoleLabel name="pools"/> view in [Aiven
Console](https://console.aiven.io/).

### Move read-only queries to standby nodes

If your Aiven for PostgreSQL® service is running a Business or
Premium plan, you have one or more standby nodes available in a high
availability setup in the same cloud region.

To reduce the effect of slow queries on the primary node, you can
redirect read-only queries to the additional
[read-only](/docs/products/postgresql/howto/create-read-replica) nodes by
directly connecting via the **read-only replica URL**.

### Move read-only queries to a remote read-only replica

You can also create a
[remote read-only replica](/docs/products/postgresql/howto/create-read-replica) service in the same or a different
cloud or region that you can use to reduce the query load on the primary service
for read-only queries.

## Related pages

- [Identify slow queries](/docs/products/postgresql/howto/identify-pg-slow-queries)
- [Standalone query optimizer][optimizer]

[optimizer]: /docs/tools/query-optimizer
