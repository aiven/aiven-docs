---
title: Check data distribution between storage devices in Aiven for ClickHouse®'s tiered storage
limited: true
sidebar_label: Check data distribution
---

Monitor how your data is distributed between the two layers of your tiered storage: SSD and object storage.

## About checking data distribution

If you have the tiered storage feature
[enabled](/docs/products/clickhouse/howto/enable-tiered-storage) on your project, your data in Aiven for ClickHouse is
distributed between two storage devices (tiers). You can check on what
storage devices your databases and tables are stored. You can also
preview their total sizes as well as part counts, minimum part sizes,
median part sizes, and maximum part sizes.

## Prerequisites

-   Tiered storage feature
    [enabled](/docs/products/clickhouse/howto/enable-tiered-storage) in a project,
    database, or table

    :::note
    This feature is in [limited availability](/docs/platform/concepts/beta_services).
    [Contact the sales team](mailto:sales@aiven.io) to enable it for your project.
    :::

-   Access to [Aiven Console](https://console.aiven.io/)
-   Command line tool
    ([ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli))

## Check data distribution in Aiven Console

You can use [Aiven Console](https://console.aiven.io/) to check if
tiered storage is enabled on your service and, if it is, how much
storage is used on each tier (local SSD and remote object storage) for
particular tables.

To access tiered storage's status information, go to [Aiven
Console](https://console.aiven.io/) > your Aiven for ClickHouse service > the
**Databases and tables** page > your database > your table >
**View details** > **Storage details**.

## Run a data distribution check with the ClickHouse client (CLI)

1.  [Connect to your Aiven for ClickHouse service](/docs/products/clickhouse/howto/list-connect-to-service) using, for example, the ClickHouse client (CLI).

2.  Run the following query:

    ```bash
    SELECT
        database,
        table,
        disk_name,
        formatReadableSize(sum(data_compressed_bytes)) AS total_size,
        count(*) AS parts_count,
        formatReadableSize(min(data_compressed_bytes)) AS min_part_size,
        formatReadableSize(median(data_compressed_bytes)) AS median_part_size,
        formatReadableSize(max(data_compressed_bytes)) AS max_part_size
    FROM system.parts
    GROUP BY
        database,
        table,
        disk_name
    ORDER BY
        database ASC,
        table ASC,
        disk_name ASC

    You can expect to receive the following output:
    ```

    ```bash
    ┌─database─┬─table─────┬─disk_name─┬─total_size─┬─parts_count─┬─min_part_size─┬─median_part_size─┬─max_part_size─┐
    │ datasets │ hits_v1   │ default   │ 1.20 GiB   │           6 │ 33.65 MiB     │ 238.69 MiB       │ 253.18 MiB    │
    │ datasets │ visits_v1 │ S3        │ 536.69 MiB │           5 │ 44.61 MiB     │ 57.90 MiB        │ 317.19 MiB    │
    │ system   │ query_log │ default   │ 75.85 MiB  │         102 │ 7.51 KiB      │ 12.36 KiB        │ 1.55 MiB      │
    └──────────┴───────────┴───────────┴────────────┴─────────────┴───────────────┴──────────────────┴───────────────┘
    ```

The query returns a table with data distribution details for all
databases and tables that belong to your service: the storage device
they use, their total sizes as well as parts counts and sizing.

## What's next

-   [Transfer data between SSD and object storage](/docs/products/clickhouse/howto/transfer-data-tiered-storage)
-   [Configure data retention thresholds for tiered storage](/docs/products/clickhouse/howto/configure-tiered-storage)

## Related pages

-   [About tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
-   [Enable tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/howto/enable-tiered-storage)
