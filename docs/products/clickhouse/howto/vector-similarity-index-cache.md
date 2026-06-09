---
title: Tune the vector similarity index cache in Aiven for ClickHouse®
sidebar_label: Vector similarity index cache
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Tune the vector similarity index cache in Aiven for ClickHouse® to improve vector search performance for Hierarchical Navigable Small World (HNSW) indexes.

HNSW is a graph-based index that speeds up approximate nearest neighbor search on vector
columns.

Aiven for ClickHouse uses a segmented least recently used (SLRU) cache to keep HNSW index
data in memory during vector search queries.

If the cache evicts index data too often, ClickHouse reloads it from disk during queries,
which can significantly increase query latency.

## How the cache works

The vector similarity index cache uses two advanced configuration settings:

- `server_settings.vector_similarity_index_cache_size` sets the total cache size as a
  fraction of server memory.
- `server_settings.vector_similarity_index_cache_size_ratio` controls the fraction of that
  cache allocated to the protected segment of the SLRU cache.

The SLRU cache has two segments:

- **Protected segment**: Stores frequently used index entries.
- **Probationary segment**: Stores newly loaded or less frequently used index entries.

ClickHouse calculates the protected segment size by multiplying the cache ratio by the
total cache size.

ClickHouse stores HNSW indexes per table part, a chunk of table data on disk. To avoid
repeated evictions, the protected segment must be large enough to hold the largest
per-part HNSW index used by your queries.

:::note
Table part structure affects cache behavior. A table with many smaller parts might cache
more efficiently than one with a single large merged part because each smaller per-part
HNSW index is more likely to fit within the protected segment.

Monitor part structure if you continue to see evictions after increasing the ratio.
:::

## Recommended cache ratio

The Aiven default for `server_settings.vector_similarity_index_cache_size_ratio` is
`0.1`. For vector search workloads, start with a value of at least `0.4`.

:::caution
Vector search performance does not degrade gradually when the ratio is too low. If the
protected segment cannot hold the largest per-part HNSW index, ClickHouse evicts and
reloads index entries repeatedly, causing a sharp increase in query latency.
:::

In Aiven benchmarks, values below `0.4` caused evictions and significantly higher query
latency. Increase the value if you still see vector similarity index cache evictions
during steady-state queries.

The best value depends on:

- The size of the HNSW indexes.
- The number and size of table parts.
- The total vector similarity index cache size.
- Query concurrency and access patterns.
- Table merges that create larger parts over time.

As a rule of thumb, set the ratio so the protected SLRU segment can hold the largest
per-part HNSW index without eviction.

## Prerequisites

- An Aiven for ClickHouse service running ClickHouse 25.8 or later.
- A table with an HNSW vector similarity index and an active vector search workload.
- Access to the [Aiven Console](https://console.aiven.io/) to update advanced
  configuration.
- A SQL client, such as the
  [ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli), to run
  the monitoring queries.

## Configure the cache ratio

You can update `server_settings.vector_similarity_index_cache_size_ratio` without
restarting the service.

1. In the [Aiven Console](https://console.aiven.io/), open your Aiven for ClickHouse
   service.
1. Click <ConsoleLabel name="Service settings"/>.
1. In <ConsoleLabel name="Advanced configuration"/>, click
   <ConsoleLabel name="Add config options"/>.
1. Find `server_settings.vector_similarity_index_cache_size_ratio`.
1. Set the value to `0.4` or higher.
1. Click **Save configuration**.

Aiven applies the setting without a service restart.

The total cache size usually stays at its default. Adjust
`server_settings.vector_similarity_index_cache_size` only if evictions continue after
raising the ratio.

## Monitor cache health

Use `system.events` to monitor vector similarity index cache activity:

```sql id="check-vector-cache-events"
SELECT
    event,
    value
FROM system.events
WHERE event LIKE '%VectorSimilarity%'
ORDER BY event;
```

Monitor `VectorSimilarityIndexCacheWeightLost`. If this value is greater than `0` during
steady-state vector search queries, ClickHouse evicts vector index data. Increase
`server_settings.vector_similarity_index_cache_size_ratio` and run the workload again.

:::note
Do not rely on hit rate alone to assess cache health. A high hit rate can coexist with
evictions if ClickHouse reloads and reinserts indexes repeatedly. For stable vector
search performance, keep `VectorSimilarityIndexCacheWeightLost` at `0` during
steady-state queries.
:::

## Troubleshoot slow vector search queries

If vector search queries are slower than expected:

1. Verify that the query uses the HNSW vector similarity index.
1. Run the `system.events` query to monitor vector similarity index cache activity.
1. Confirm whether `VectorSimilarityIndexCacheWeightLost` increases during steady-state
   queries.
1. If evictions occur, increase
   `server_settings.vector_similarity_index_cache_size_ratio` to at least `0.4`.
1. Monitor query latency and cache events again.

If evictions continue after increasing the ratio, the protected segment might still be
too small for the largest per-part HNSW index. Review the total vector similarity index
cache size and the table part structure.

<RelatedPages />

- [Indexing and data processing in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/indexing)
- [Advanced parameters for Aiven for ClickHouse®](/docs/products/clickhouse/reference/advanced-params)
- [Use query cache in Aiven for ClickHouse®](/docs/products/clickhouse/howto/clickhouse-query-cache)
- [Fetch query statistics for Aiven for ClickHouse®](/docs/products/clickhouse/howto/fetch-query-statistics)
