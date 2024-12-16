---
title: Enable tiered storage in Aiven for ClickHouse®
sidebar_label: Enable tiered storage
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Enable the [tiered storage feature](/docs/products/clickhouse/concepts/clickhouse-tiered-storage) on a table in your Aiven for ClickHouse® service.

### Limitations

-   You can enable tiered storage on the Aiven tenant
    (in non-[BYOC](/docs/platform/concepts/byoc) environments) if your Aiven for
    ClickHouse service is hosted on Azure, AWS, or GCP.
-   When
    [enabled](/docs/products/clickhouse/howto/enable-tiered-storage), the tiered
    storage feature cannot be deactivated.

    :::tip
    As a workaround, you can create a table (without enabling tiered
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

## Prerequisites

-   You have at least one Aiven for ClickHouse service.
-   Depending on how to activate tiered storage, you need:
    - [Aiven Console](https://console.aiven.io) or
    - SQL and an SQL client (for example, the [ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli)).
-   All maintenance updates are applied on your service (check in the
    [Aiven Console](https://console.aiven.io): your service's <ConsoleLabel name="overview"/> >
    <ConsoleLabel name="service settings"/> > **Service management** > **Maintenance updates**).

## Activate tiered storage on a table

You can enable tiered storage both on new tables and on existing ones. For that purpose,
you can use either CLI or the [Aiven Console](https://console.aiven.io).

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io), and go to your organization,
   project, and service.
1. On the <ConsoleLabel name="overview"/> of your service, select
   <ConsoleLabel name="databasesandtables"/> from the sidebar.
1. In the <ConsoleLabel name="databasesandtables"/> view, find a table on which to activate tiered
   storage, and click <ConsoleLabel name="actions"/> > <ConsoleLabel name="activatetieredstorage"/>
   \> **Activate**.
</TabItem>
<TabItem value="2" label="CLI">
1. [Connect to your Aiven for ClickHouse service](/docs/products/clickhouse/howto/list-connect-to-service)
   using, for example, the ClickHouse client.
1. To activate the tiered storage feature on a specific table,
   set `storage_policy` to `tiered` on this table by executing the following SQL statement:

   ```sql
   ALTER TABLE database-name.table-name MODIFY SETTING storage_policy = 'tiered'
   ```

</TabItem>
</Tabs>

Tiered storage is activated on your table and data in this table is now
distributed between two tiers: SSD and object storage.

You can check if tiered storage is now supported (**Active**/**Not active**) on
your table in the [Aiven Console](https://console.aiven.io) > your service's page >
<ConsoleLabel name="databasesandtables"/> > Your database > Your table
\> **Tiered storage** column.

## What's next

- [Configure data retention thresholds for tiered storage](/docs/products/clickhouse/howto/configure-tiered-storage)
- [Check data volume distribution between different disks](/docs/products/clickhouse/howto/check-data-tiered-storage)

## Related pages

- [About tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
- [Transfer data between SSD and object storage](/docs/products/clickhouse/howto/transfer-data-tiered-storage)
