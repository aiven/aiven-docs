---
title: Local on-disk cache for remote files in Aiven for ClickHouse®'s tiered storage
sidebar_label: Local on-disk cache for remote files
---

Aiven for ClickHouse®'s tiered storage features local on-disk cache for remote files for improved query performance and reduced latency.

To manage data, Aiven for ClickHouse's tiered storage uses local storage and remote storage.
When remote storage is used, Aiven for ClickHouse leverages a local on-disk cache to avoid
repeated remote fetches.

## How it works

When a query requires parts of a table stored in the remote tier, Aiven for ClickHouse
fetches the required parts from the remote storage. The fetched parts are automatically
stored in a local cache directory on the disk to avoid repeated downloads for subsequent
queries. For future queries, Aiven for ClickHouse checks the local cache first:

- If the data is found in the cache, it is read directly from the local disk.
- If the data is not found in the cache, it is fetched from the remote storage and stored
  in the local cache.

Local on-disk cache for remote files is enabled by default for Aiven for ClickHouse's
tiered storage. You can
[disable the cache](/docs/products/clickhouse/howto/local-cache-tiered-storage#disable-the-cache)
or
[drop it](/docs/products/clickhouse/howto/local-cache-tiered-storage#free-up-space) to
free up the space it occupies.

## Prerequisites

-   At least one Aiven for ClickHouse service using tiered storage
-   Command line tool
    ([ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli))
    installed

## Disable the cache

To disable the local cache for a query, set the `enable_filesystem_cache` setting for the
query to `false`.
You can achieve this by appending `SETTINGS enable_filesystem_cache = false` to the end of
your query using an SQL client (for example, the
[ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli)):

```sql
SELECT 1
SETTINGS enable_filesystem_cache = false;
```

## Free up space

To drop the local cache and free up the used space, use the following cache command:

```bash
SYSTEM DROP FILESYSTEM CACHE 'remote_cache'
```

## Related pages

-   [About tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
-   [Check data distribution between SSD and object storage](/docs/products/clickhouse/howto/check-data-tiered-storage)
-   [Configure data retention thresholds for tiered storage](/docs/products/clickhouse/howto/configure-tiered-storage)
