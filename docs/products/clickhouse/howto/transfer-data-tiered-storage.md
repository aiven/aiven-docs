---
title: Transfer data between storage devices in Aiven for ClickHouse®'s tiered storage
---

After [enabling](/docs/products/clickhouse/howto/enable-tiered-storage) the tiered storage feature, you can move your data from SSD to object storage.

Next, you may want to size down your SSD by selecting
a service plan with less SSD capacity. Later, you can move your data
from object storage back to your SSD if needed. Both operations can be
performed using SQL statements against your tables directly.

:::important
Aiven for ClickHouse® tiered storage is a
[limited availability feature](/docs/platform/concepts/beta_services). If you're interested in trying out this feature, contact
the sales team at [sales@aiven.io](mailto:sales@aiven.io).
:::


## Prerequisites

-   Aiven organization
-   Tiered storage feature
    [enabled](/docs/products/clickhouse/howto/enable-tiered-storage) at project level
-   Command line tool
    ([ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli))

## Transfer data from SSD to object storage

If you
[enable](/docs/products/clickhouse/howto/enable-tiered-storage) the tiered storage feature on your table, by default your
data is moved from SSD to object storage as soon as the SSD reaches 80%
of its capacity. You can also
[configure your tiered storage](/docs/products/clickhouse/howto/configure-tiered-storage) so that data is moved to object storage at a specific time.

1.  [Connect to your Aiven for ClickHouse service](/docs/products/clickhouse/howto/list-connect-to-service) using, for example, the ClickHouse client (CLI).

2.  Run the following query:

    ``` bash
    ALTER TABLE database-name.tablename MODIFY SETTING storage_policy = 'tiered'
    ```

Now, with the tiered storage feature
[enabled](/docs/products/clickhouse/howto/enable-tiered-storage), your data is moved from SSD to object storage when the SSD
reaches 80% of its capacity.

## Transfer data from object storage to SSD

Use the MOVE statement [MOVE
PARTITION\|PART](https://clickhouse.com/docs/en/sql-reference/statements/alter/partition#move-partitionpart)
to transfer data to your SSD.

1.  [Connect to your Aiven for ClickHouse service](/docs/products/clickhouse/howto/list-connect-to-service) using, for example, the ClickHouse client (CLI).

2.  Select a database for operations you intend to perform.

    ``` bash
    USE database-name
    ```

3.  Run the following query:

    ``` bash
    ALTER TABLE table_name MOVE PARTITION partition_expr TO VOLUME 'default'
    ```

Your data has been moved to the SSD.

## What's next

-   [Check data distribution between SSD and object storage](/docs/products/clickhouse/howto/check-data-tiered-storage)
-   [Configure data retention thresholds for tiered storage](/docs/products/clickhouse/howto/configure-tiered-storage)

## Related pages

-   [About tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
-   [Enable tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/howto/enable-tiered-storage)
