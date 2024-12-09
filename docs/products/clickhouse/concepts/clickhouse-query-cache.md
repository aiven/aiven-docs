---
title: Aiven for ClickHouse® query cache
sidebar_label: Query cache
---

If multiple identical queries are run simultaneously, Aiven for ClickHouse® query
cache allows to process only one instance of the query and returns the result to all
clients.

## How it works

Aiven for ClickHouse provides a query cache mechanism that helps improve query performance
by caching intermediate or final query results.

With the Aiven for ClickHouse query cache enabled, SELECT queries are computed only once,
and further executions of the same query are served directly from the cache. If the result
of a SELECT query changes, the database invalidates and discards cached query results.
Operations that change the data are `INSERT`, `UPDATE`, or `DELETE`.

:::important
By default, the Aiven for ClickHouse query cache is enabled on all queries and set to the
maximum size of 1 GiB.
:::

## Why use it

Using query cache in your Aiven for ClickHouse services can help reduce latency and
resource consumption.

Key use case for the Aiven for ClickHouse query cache are the following:

- Performance enhancement: Reducing latency and load for frequently executed queries
- Analytical workloads: Using complex repetitive queries that involve high data aggregation
- Data pipelines: [Using materialized views](/docs/products/clickhouse/concepts/federated-queries)
  to optimize recurring data transformation and aggregation

## Limitation

- Maximum query cache size: 64 MiB for each GiB of RAM (for example, 256 MiB for a 4-GiB
  instance or 1 GiB for a 16-GiB instance)
- Maximum number of query cache entries: 64 entries for each GiB of RAM (for example,
  1024 entries for a 16-GiB instance)
- For security reasons, you cannot disable or reconfigure query cache for your Aiven for
  ClickHouse services. This is to avoid any risks related to vulnerabilities and exposures.
- Cached results are invalidated when the underlying data changes, which means the cache is
  not long-lived.

## Related pages

- [Querying external data in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/federated-queries)
- [Query Aiven for ClickHouse® databases](/docs/products/clickhouse/howto/query-databases)
- [Fetch query statistics for Aiven for ClickHouse®](/docs/products/clickhouse/howto/fetch-query-statistics)
- [Create dictionaries in Aiven for ClickHouse®](/docs/products/clickhouse/howto/create-dictionary)
