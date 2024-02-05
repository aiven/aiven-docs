---
title: Enable tiered storage in Aiven for ClickHouse®
limited: true
---

Find out how to enable the tiered storage feature on your project and activate it for specific tables. To learn what tiered storage is, how it works, and why use it, see [Tiered storage in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/clickhouse-tiered-storage).

## About enabling tiered storage

To use the tiered storage feature, you need to enable it at project
level by contacting the sales team at [sales@aiven.io](mailto:sales@aiven.io) and set it up at
table level using SQL (via CLI, for example).

### Limitations

-   When
    [enabled](/docs/products/clickhouse/howto/enable-tiered-storage), the tiered storage feature cannot be deactivated.

    :::tip
    As a workaround, you can create a new table (without enabling tiered
    storage on it) and copy the data from the original table (with the
    tiered storage
    [enabled](/docs/products/clickhouse/howto/enable-tiered-storage)) to the new table. As soon as the data is copied to the
    new table, you can remove the original table.
    :::

-   With the tiered storage feature
    [enabled](/docs/products/clickhouse/howto/enable-tiered-storage), it's not possible to connect to an external existing
    object storage or cloud storage bucket.

### Tools

To enable tiered storage, use SQL and an SQL client (for example, the
ClickHouse CLI client).

## Prerequisites

-   This feature is in [limited availability](/docs/platform/concepts/beta_services).
    [Contact the sales team](mailto:sales@aiven.io) to enable it for your project.
-   You have an Aiven organization and at least one project.
-   You have a command line tool
    ([ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli)) installed.
-   All maintenance updates are applied on your service (check in Aiven
    Console: your service's page \> **Service settings** \> **Service
    management** \> **Maintenance updates**).

## Enable tiered storage on a project

To enable tiered storage on your project, request it from the sales team
at [sales@aiven.io](mailto:sales@aiven.io).

:::note[Result]
Your project now supports tiered storage, and you can enable it for each
table of your Aiven for ClickHouse services.
:::

## Enable tiered storage on a table

When you have tiered storage enabled on your project, you can move on to
enabling it on your tables, both new and existing ones.

1.  [Connect to your Aiven for ClickHouse service](/docs/products/clickhouse/howto/list-connect-to-service) using, for example, the ClickHouse client (CLI).

2.  To activate the tiered storage feature on a specific table, set
    `storage_policy` to `tiered` on this table by executing the
    following SQL statement:

    ``` bash
    ALTER TABLE database-name.table-name MODIFY SETTING storage_policy = 'tiered'
    ```

Tiered storage is enabled on your table and data in this table is now
distributed between two tiers: SSD and object storage.

You can check if tiered storage is now supported (**Active** /
**Inactive**) on your table in [Aiven
Console](https://console.aiven.io/) \> **Databases & Tables** \>
**Databases lists** \> Your database \> Your table \> the **Tiered
storage** column.

## What's next

-   [Configure data retention thresholds for tiered storage](/docs/products/clickhouse/howto/configure-tiered-storage)
-   [Check data volume distribution between different disks](/docs/products/clickhouse/howto/check-data-tiered-storage)

## Related pages

-   [About tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
-   [Transfer data between SSD and object storage](/docs/products/clickhouse/howto/transfer-data-tiered-storage)
