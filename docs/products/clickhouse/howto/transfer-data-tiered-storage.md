---
title: Transfer data between storage devices in Aiven for ClickHouse®'s tiered storage
sidebar_label: Move data between storage devices
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

Moving data from network-attached block storage to object storage allows you to size down your block storage by selecting a service plan with less capacity. You can move the data back to network-attached block storage anytime.

You can transfer data between storage devices in Aiven for ClickHouse® using SQL statements
against your tables directly.

## Prerequisites

-   At least one Aiven for ClickHouse service
-   Command line tool
    ([ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli))
    installed

## Transfer data from network-attached block storage to object storage

<Tabs groupId="group1">
<TabItem value="1" label="Automatic data transfer" default>
If you
[enable](/docs/products/clickhouse/howto/enable-tiered-storage) the tiered storage feature
on your table, by default your data is moved from network-attached block storage to object
storage as soon as it reaches 80% of its capacity.

1.  [Connect to your Aiven for ClickHouse service](/docs/products/clickhouse/howto/list-connect-to-service)
    using, for example, the ClickHouse client.

1.  Run the following query:

    ```sql
    ALTER TABLE database-name.tablename MODIFY SETTING storage_policy = 'tiered'
    ```

Now, with the tiered storage feature
[enabled](/docs/products/clickhouse/howto/enable-tiered-storage), your data is moved from
network-attached block storage to object storage when it reaches 80% of its capacity.

:::note
You can also
[configure your tiered storage](/docs/products/clickhouse/howto/configure-tiered-storage)
so that data is moved to object storage at a specific time.
:::
</TabItem>
<TabItem value="2" label="Manual data transfer">
To move data manually from network-attached block storage to object storage, run

```sql
ALTER TABLE table_name MOVE PARTITION partition_expr TO VOLUME 'remote'
```

To configure data retention thresholds to automatically move data from network-attached block
storage to object storage, see
[Configure data retention thresholds in Aiven for ClickHouse®'s tiered storage](/docs/products/clickhouse/howto/configure-tiered-storage).
</TabItem>
</Tabs>

## Transfer data from object storage to network-attached block storage

Use the
[MOVE PARTITION\|PART](https://clickhouse.com/docs/en/sql-reference/statements/alter/partition#move-partitionpart)
statement to transfer data to network-attached block storage.

1.  [Connect to your Aiven for ClickHouse service](/docs/products/clickhouse/howto/list-connect-to-service)
    using, for example, the ClickHouse client.

1.  Select a database for operations you intend to perform.

    ```sql
    USE database-name
    ```

1.  Run the following query:

    ```sql
    ALTER TABLE table_name MOVE PARTITION partition_expr TO VOLUME 'default'
    ```

Your data has been moved to network-attached block storage.

## What's next

-   [Check data distribution between network-attached block storage and object storage](/docs/products/clickhouse/howto/check-data-tiered-storage)
-   [Configure data retention thresholds for tiered storage](/docs/products/clickhouse/howto/configure-tiered-storage)

<RelatedPages/>

-   [About tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
-   [Enable tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/howto/enable-tiered-storage)
