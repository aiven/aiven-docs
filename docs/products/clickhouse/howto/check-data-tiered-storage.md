---
title: Check data distribution between storage devices in Aiven for ClickHouse®'s tiered storage
sidebar_label: Check data distribution
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Monitor how your data is distributed between the two layers of your tiered storage: Network-attached block storage and object storage.

If you have the tiered storage feature
[enabled](/docs/products/clickhouse/howto/enable-tiered-storage), your
data in Aiven for ClickHouse is
distributed between two storage devices (tiers). You can check on what
storage devices your databases and tables are stored. You can also
preview their total sizes as well as part counts, minimum part sizes,
median part sizes, and maximum part sizes.

## Prerequisites

-   Tiered storage
    [enabled](/docs/products/clickhouse/howto/enable-tiered-storage)
-   Access to the [Aiven Console](https://console.aiven.io/)
-   Command line tool
    ([ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli))
    installed

## Check data distribution in Aiven Console

You can use the [Aiven Console](https://console.aiven.io/) to check if
tiered storage is enabled on a table and, if it is, how much
storage is used on each tier (network-attached block storage and object storage)
for this particular table.

To access tiered storage status information:

1. Log in to the [Aiven Console](https://console.aiven.io/) and choose your Aiven for
   ClickHouse service.
1. In the service sidebar, click <ConsoleLabel name="data"/> > **Databases and tables**.
1. Open the database and table that you want to check.
1. Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="viewdetails"/> >
   **Tiered storage**.

## Run a data distribution check with the ClickHouse client

1.  [Connect to your Aiven for ClickHouse service](/docs/products/clickhouse/howto/list-connect-to-service)
    using, for example, the ClickHouse client.

1.  Run the following query:

    ```sql
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
    ```

    You can expect to receive the following output:

    ```text
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

-   [Transfer data between network-attached block storage and object storage](/docs/products/clickhouse/howto/transfer-data-tiered-storage)
-   [Configure data retention thresholds for tiered storage](/docs/products/clickhouse/howto/configure-tiered-storage)

<RelatedPages/>

-   [About tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
-   [Enable tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/howto/enable-tiered-storage)
