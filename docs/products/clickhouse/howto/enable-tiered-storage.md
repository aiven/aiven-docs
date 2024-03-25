---
title: Enable tiered storage in Aiven for ClickHouse®
limited: true
sidebar_label: Enable tiered storage
---

Find out how to enable the [Aiven for ClickHouse® tiered storage feature](/docs/products/clickhouse/concepts/clickhouse-tiered-storage) on your project and activate it for specific tables.

## About enabling tiered storage

To use the tiered storage feature, activate it at project
level by [contacting the sales team](mailto:sales@aiven.io) and set
it up at table level using SQL (via CLI, for example).

### Limitations

-   When
    [enabled](/docs/products/clickhouse/howto/enable-tiered-storage), the tiered
    storage feature cannot be deactivated.

    :::tip
    As a workaround, you can create a new table (without enabling tiered
    storage on it) and copy the data from the original table (with the
    tiered storage
    [enabled](/docs/products/clickhouse/howto/enable-tiered-storage)) to the new table.
    As soon as the data is copied to the
    new table, you can remove the original table.
    :::

-   With the tiered storage feature
    [activated](/docs/products/clickhouse/howto/enable-tiered-storage), it's
    not possible to connect to an external existing
    object storage or cloud storage bucket.

### Tools

To activate tiered storage, use SQL and an SQL client (for example, the
ClickHouse CLI client).

## Prerequisites

-   This feature is in [limited availability](/docs/platform/concepts/beta_services).
    [Contact the sales team](mailto:sales@aiven.io) to enable it for your project.
-   You have an Aiven organization and at least one project.
-   You have a command line tool
    ([ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli)) installed.
-   All maintenance updates are applied on your service (check in Aiven
    Console: your service's page > **Service settings** > **Service
    management** > **Maintenance updates**).

## Activate tiered storage on a project

To activate tiered storage on your project:

1. Send a request to [the sales team](mailto:sales@aiven.io).
1. Once your project supports tiered storage, activate it for each
   table of your Aiven for ClickHouse services.

## Activate tiered storage on a table

When you have tiered storage activated on your project, you can
enable it on your tables, both new and existing ones. You can
use either SQL or [Aiven Console](https://console.aiven.io).

### Activate in Aiven Console

1. Log in to [Aiven Console](https://console.aiven.io), and go to your organization,
   in **Project** > **Service**.
1. On the **Overview** page of your service, select **Databases and tables** from the sidebar.
1. In the **Databases and tables** view, find a table on which to activate tiered
   storage, and select **Activate tiered storage** from the **Actions** menu (**...**).
1. In the **Activate tiered storage** window, confirm you want to activate
   tiered storage on the table and understand the impact by selecting **Activate**.

### Activate with SQL

1. [Connect to your Aiven for ClickHouse service](/docs/products/clickhouse/howto/list-connect-to-service)
   using, for example, the ClickHouse client (CLI).
1. To activate the tiered storage feature on a specific table,
   set `storage_policy` to `tiered` on this table by executing the following SQL statement:

   ```bash
   ALTER TABLE database-name.table-name MODIFY SETTING storage_policy = 'tiered'
   ```

Tiered storage is activated on your table and data in this table is now
distributed between two tiers: SSD and object storage.

You can check if tiered storage is now supported (**Active** / **Inactive**) on
your table in [Aiven Console](https://console.aiven.io) > **Databases & Tables** >
**Databases lists** > Your database > Your table > **Tiered storage** column.

## What's next

- [Configure data retention thresholds for tiered storage](/docs/products/clickhouse/howto/configure-tiered-storage)
- [Check data volume distribution between different disks](/docs/products/clickhouse/howto/check-data-tiered-storage)

## Related pages

- [About tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
- [Transfer data between SSD and object storage](/docs/products/clickhouse/howto/transfer-data-tiered-storage)
