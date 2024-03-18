---
title: Optimize Aiven for PostgreSQL® slow queries
keywords: ["AI", "Artificial intelligence"]
---

import Insights from "@site/static/images/icons/performance.svg";
import ActionsIcon from "@site/static/images/icons/more.svg";

Optimize slow queries to ensure maximum service performance. Use Aiven's AI capabilities or  `pg_stat_statements` to identify optimization opportunities.

## Artificial intelligence recommendations

Use Aiven's artificial intelligence (<abbr>AI</abbr>) capabilities to suggest optimizations to
your databases and queries.

Aiven considers various aspects to suggest optimization, for example query
structure, table size, existing indexes and their cardinality, column types and
sizes, the connections between the tables and columns in the query.

### Display optimization recommendations

To optimize a query:

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for
   PostgreSQL service.
1. Click <Insights className="icon"/> **AI insights**.
1. For the query of your choice, click **Optimize**.
1. In the **Query optimization report** window, see the optimization suggestion and apply
   the suggestion by running the provided SQL queries.

   <!-- :::note
   - To display alternative optimization recommendations, click **Advanced options**.
   - To display the diff view, click **Query diff**.
   - To display explanations about the optimization, click **optimization details**.
   ::: -->

## Manual optimization

Aiven for PostgreSQL allows you to [identify slow queries](/docs/products/postgresql/howto/identify-pg-slow-queries) using the `pg_stat_statements` view. To improve slow running
queries, use one of the manual optimization techniques.

It is worth knowing that many database indexes on a table can also cause
problems for write performance due to the overhead of maintaining them.

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
connection pooling for your service in the **Pools** view in [Aiven
Console](https://console.aiven.io/).

### Move read-only queries to standby nodes

If your Aiven for PostgreSQL® service is running a *Business* or
*Premium* plan, you have one or more standby nodes available in a high
availability setup in the same cloud region.

To reduce the effect of slow queries on the primary node, you can
redirect read-only queries to the additional
[read-only](create-read-replica) nodes by
directly connecting via the **read-only replica URL**.

### Move read-only queries to a remote read-only replica

You can also create a
[remote read-only replica](create-read-replica) services in the same or different cloud/region providing a
dedicated read-only service that you can use to reduce the query load on
the primary service for read-only queries.

## Related pages

- [Identify slow queries](/docs/products/postgresql/howto/identify-pg-slow-queries)
