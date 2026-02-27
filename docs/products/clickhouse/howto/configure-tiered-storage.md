---
title: Configure data retention thresholds in Aiven for ClickHouse®'s tiered storage
sidebar_label: Set up data retention
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

Control how your data is distributed between storage devices in the tiered storage of an Aiven for ClickHouse service. Configure tables so that ClickHouse automatically writes your data to network-attached block storage or object storage as needed.

If you have [tiered storage enabled](/docs/products/clickhouse/howto/enable-tiered-storage)
on your Aiven for ClickHouse service, Aiven distributes your data between two storage
devices (tiers). Data is stored either on network-attached block storage or in object
storage, depending on whether and how you configure this behavior. By default, ClickHouse
moves data from network-attached block storage to object storage when it reaches 80% of
ts capacity (default size-based data retention policy).

To change this default data distribution behavior,
[configure your table's schema by adding a TTL (time-to-live) clause](/docs/products/clickhouse/howto/configure-tiered-storage#time-based-retention-config).
Such a configuration allows ignoring the capacity
threshold for network-attached block storage and moving the data from it to object
storage based on how long the data has been stored there.

To enable this time-based data distribution mechanism, you can set up a
retention policy (threshold) on a table level by using the TTL clause.
For data retention control purposes, the TTL clause uses the following:

- Data item of the `Date` or `DateTime` type as a reference point in
  time
- INTERVAL clause as a time period to elapse between the reference
  point and the data transfer to object storage

## Prerequisites

- [Tiered storage enabled](/docs/products/clickhouse/howto/enable-tiered-storage)
- Command line tool installed
  ([ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli))

## Configure time-based data retention {#time-based-retention-config}

1. [Connect to your Aiven for ClickHouse service](/docs/products/clickhouse/howto/list-connect-to-service) using, for example, the ClickHouse client.

1. Select a database for operations you intend to perform.

   ```sql
   USE database-name
   ```

### Add or modify TTL

<Tabs groupId="group1">
<TabItem value="1" label="Add TTL to a new table" default>
Create a table with the `storage_policy` setting set to `tiered` (to
[enable tiered storage](/docs/products/clickhouse/howto/enable-tiered-storage)) and TTL
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
<TabItem value="2" label="Modify TTL on an existing table">

Add or update a TTL definition with the `ALTER TABLE ... MODIFY TTL` statement:

```sql
ALTER TABLE database_name.table_name MODIFY TTL ttl_expression;
```

</TabItem>
</Tabs>

After TTL is configured, ClickHouse moves data older than the specified time period from
network-attached block storage to object storage, regardless of available capacity.

## Best practices for tiered storage TTL

Follow these recommendations to optimize performance and efficiency when using TTL with
tiered storage.

### Optimize part sizes for remote storage

Avoid creating many small parts on remote storage, as this can negatively impact performance.
When writing data that will be immediately moved to remote storage (such as during
backfilling of historical data):

- **Use large inserts**: Ensure your data inserts are large enough to create substantial
  parts on remote storage
- **Temporarily disable TTL moves**: Use the following commands to pause data movement
  while smaller parts merge together:

  ```sql
  -- Stop TTL-based data moves temporarily
  SYSTEM STOP MOVES;

  -- Perform your data operations (inserts, merges)
  -- ... your operations here ...

  -- Resume TTL-based data moves
  SYSTEM START MOVES;
  ```

  :::warning
  Remember to run `SYSTEM START MOVES` after your operations to resume normal TTL behavior.
  Leaving moves disabled will prevent automatic data tiering.
  :::

### Configure efficient data deletion

Use the `ttl_only_drop_parts` setting when using TTL for data **deletion**, not just for
moving between tiers:

```sql
CREATE TABLE example_table (
    SearchDate Date,
    SearchID UInt64,
    SearchPhrase String
)
ENGINE = MergeTree
ORDER BY (SearchDate, SearchID)
PARTITION BY toYYYYMM(SearchDate)
TTL SearchDate + INTERVAL 1 MONTH DELETE
SETTINGS storage_policy = 'tiered', ttl_only_drop_parts = 1;
```

#### How this helps

- **Prevents inefficient partial drops**: Instead of repeatedly rewriting parts as
  individual rows expire, ClickHouse drops entire parts at once
- **Requires matching partition strategy**: Use a `PARTITION BY` expression that aligns
  with your TTL period so all data in a partition expires simultaneously
- **Improves performance**: Eliminates the overhead of multiple partial rewrites

#### Example of aligned partitioning and TTL

```sql
CREATE TABLE example_with_deletion (
    SearchDate Date,
    SearchID UInt64,
    SearchPhrase String
)
ENGINE = MergeTree
ORDER BY (SearchDate, SearchID)
-- Partition by month, TTL deletes data older than 1 month
PARTITION BY toYYYYMM(SearchDate)
TTL SearchDate + INTERVAL 1 MONTH DELETE
SETTINGS storage_policy = 'tiered', ttl_only_drop_parts = 1;
```

This ensures that when data expires, ClickHouse drops entire monthly partitions rather than
removing individual rows from parts.

## What's next

- [Check data volume distribution between different disks](/docs/products/clickhouse/howto/check-data-tiered-storage)

<RelatedPages/>

- [About tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
- [Enable tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/howto/enable-tiered-storage)
- [Transfer data between network-attached block storage and object storage](/docs/products/clickhouse/howto/transfer-data-tiered-storage)
- [Manage Data with TTL (Time-to-live)](https://clickhouse.com/docs/en/guides/developer/ttl)
- [Create table statement, TTL documentation](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree#mergetree-table-ttl)
- [MergeTree - column TTL](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree#mergetree-column-ttl)
