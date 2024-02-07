---
title: Configure data retention thresholds in Aiven for ClickHouse®'s tiered storage
sidebar_label: Set up data retention
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Control how your data is distributed between storage devices in the tiered storage of an Aiven for ClickHouse service. Configure tables so that your data is automatically written either to SSD or object storage as needed.

If you have the tiered storage feature
[enabled](/docs/products/clickhouse/howto/enable-tiered-storage) on your Aiven for
ClickHouse service, your data is
distributed between two storage devices (tiers). The data is stored
either on SSD or in object storage, depending on whether and how you
configure this behavior. By default, data is moved from SSD to object
storage when SSD reaches 80% of its capacity (default size-based data
retention policy).

You may want to change this default data distribution behavior by
[configuring your table's schema by adding a TTL (time-to-live) clause](/docs/products/clickhouse/howto/configure-tiered-storage#time-based-retention-config).
Such a configuration allows ignoring the SSD-capacity
threshold and moving the data from SSD to object storage based on how
long the data is there on your SSD.

To enable this time-based data distribution mechanism, you can set up a
retention policy (threshold) on a table level by using the TTL clause.
For data retention control purposes, the TTL clause uses the following:

-   Data item of the `Date` or `DateTime` type as a reference point in
    time
-   INTERVAL clause as a time period to elapse between the reference
    point and the data transfer to object storage

## Prerequisites

-   Tiered storage [enabled](/docs/products/clickhouse/howto/enable-tiered-storage)
-   Command line tool installed
    ([ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli))

## Configure time-based data retention {#time-based-retention-config}

1.  [Connect to your Aiven for ClickHouse service](/docs/products/clickhouse/howto/list-connect-to-service) using, for example, the ClickHouse client.

1.  Select a database for operations you intend to perform.

    ```sql
    USE database-name
    ```

### Add TTL

<Tabs groupId="group1">
<TabItem value="1" label="Add TTL to a new table" default>
Create a table with the `storage_policy` setting set to `tiered` (to
[enable](/docs/products/clickhouse/howto/enable-tiered-storage) the feature) and TTL
(time-to-live) configured to add a
time-based data retention threshold on the table.

```sql
CREATE TABLE example_table (
    SearchDate Date,
    SearchID UInt64,
    SearchPhrase String
)
ENGINE = MergeTree
ORDER BY (SearchDate, SearchID)
PARTITION BY toYYYYMM(SearchDate)
TTL SearchDate + INTERVAL 1 WEEK TO VOLUME 'remote'
SETTINGS storage_policy = 'tiered';
```

</TabItem>
<TabItem value="2" label="Add TTL to an existing table">
Use the `MODIFY TTL` clause:

```sql
ALTER TABLE database_name.table_name MODIFY TTL ttl_expression;
```

</TabItem>
</Tabs>

### Update TTL

Change an already configured TTL in an existing table by using the `ALTER
TABLE MODIFY TTL` clause:

```sql
ALTER TABLE database_name.table_name MODIFY TTL ttl_expression;
```

You have your time-based data retention policy set up. From now on, when
data is on your SSD longer than a specified time period, it's moved to
object storage, regardless of how much of SSD capacity is still
available.

## What's next

-   [Check data volume distribution between different disks](/docs/products/clickhouse/howto/check-data-tiered-storage)

## Related pages

-   [About tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
-   [Enable tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/howto/enable-tiered-storage)
-   [Transfer data between SSD and object storage](/docs/products/clickhouse/howto/transfer-data-tiered-storage)
-   [Manage Data with TTL
    (Time-to-live)](https://clickhouse.com/docs/en/guides/developer/ttl)
-   [Create table statement, TTL
    documentation](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree#mergetree-table-ttl)
-   [MergeTree - column
    TTL](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree#mergetree-column-ttl)
