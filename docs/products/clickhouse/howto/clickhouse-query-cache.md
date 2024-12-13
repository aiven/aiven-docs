---
title: Use query cache in Aiven for ClickHouse®
sidebar_label: Use query cache
---

Aiven for ClickHouse® provides a query cache mechanism that helps improve query performance
by caching query results.

## How it works

When the Aiven for
[ClickHouse query cache](https://clickhouse.com/docs/en/operations/query-cache) is enabled,
multiple identical `SELECT` queries running simultaneously are computed only once.
Subsequent executions of the same query are served directly from the cache.

:::important
By default, the Aiven for ClickHouse query cache is disabled for all `SELECT` queries.
:::

## Why use it

Using query cache in your Aiven for ClickHouse services can help reduce latency and
resource consumption.

Key use case for the Aiven for ClickHouse query cache are the following:

- Performance enhancement: Reducing latency and load for frequently executed queries
- Analytical workloads: Using complex repetitive queries that involve high data aggregation

## Enable query cache

To enable the query cache for a query, set the `use_query_cache` setting for the query to `1`.
You can achieve this by appending `SETTINGS use_query_cache = 1` to the end of your query
using an SQL client (for example, the
[ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli)):

```sql
SELECT 1
SETTINGS use_query_cache = 1;
```

## Configure query cache

To configure the query cache settings, use an SQL client (for example, the
[ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli)) and
append a defined setting to your query, for example:

```sql
SELECT 1
SETTINGS use_query_cache = 1, query_cache_min_query_runs = 5000;
```

You can configure the following query cache settings:

- `enable_writes_to_query_cache`
- `enable_reads_from_query_cache`
- `query_cache_max_entries`
- `query_cache_min_query_runs`
- `query_cache_min_query_duration`
- `query_cache_compress_entries`
- `query_cache_squash_partial_results`
- `query_cache_ttl`
- `query_cache_share_between_users`

## Limitation

- Cached results are not invalidated or discarded when the underlying data (the result
  of a `SELECT` query) changes, which might cause returning stale results.
- Maximum query cache size: 64 MiB for each GiB of RAM (for example, 256 MiB for a 4-GiB
  service or 1 GiB for a 16-GiB service)
- Maximum number of query cache entries: 64 entries for each GiB of RAM (for example,
  1024 entries for a 16-GiB service)

## Related pages

- [Querying external data in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/federated-queries)
- [Query Aiven for ClickHouse® databases](/docs/products/clickhouse/howto/query-databases)
- [Fetch query statistics for Aiven for ClickHouse®](/docs/products/clickhouse/howto/fetch-query-statistics)
- [Create dictionaries in Aiven for ClickHouse®](/docs/products/clickhouse/howto/create-dictionary)
