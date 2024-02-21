---
title: Enable reading and writing data across shards in Aiven for ClickHouse®
---

If your Aiven for ClickHouse® service uses multiple shards, the data is replicated only between nodes of the same shard.

When you read from one node, you see the data from the shard of this node.
Creating a [distributed table](https://clickhouse.com/docs/en/engines/table-engines/special/distributed/)
on top of your replicated table, while the distributed table itself doesn't
store data allows you to see data from all the shards but also help spread the
data evenly across all the cluster nodes.

## Set up a sharded service with a database

1.  [Create an Aiven for ClickHouse® service](/docs/platform/howto/create_new_service)
    with multiple shards.

    :::note
    Shards are created automatically when you create an Aiven for ClickHouse
    services. The number of shards that your service gets depends on the
    plan you select for your service. You can calculate the shards number as
    follows: *number of shards = number of nodes / 3*.
    :::

1.  [Create database](/docs/products/clickhouse/howto/manage-databases-tables#create-a-clickhouse-database) `test_db` in your new service.

## Create a distributed table

1.  [Connect to your database](/docs/products/clickhouse/howto/connect-with-clickhouse-cli).
1.  Create a table with the [MergeTree
    engine](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree/)
    as shown for the `cash_flows` table in the following example:

    ```sql
    CREATE TABLE test_db.cash_flows
    (
        EventDate DateTime,
        SourceAccount UInt64,
        TargetAccount UInt64,
        Amount Float64
    )
    ENGINE = MergeTree()
    PARTITION BY toYYYYMM(EventDate)
    ORDER BY (EventDate, SourceAccount)
    ```

    :::note
    With Aiven for ClickHouse, you can specify `ENGINE` either as
    `MergeTree` or as `ReplicationMergeTree`. Both of them create a
    `ReplicationMergeTree` table.
    :::

1.  Create distributed table `cash_flows_distributed` with the
    distributed engine:

    ```sql
    CREATE TABLE test_db.cash_flows_distributed AS test_db.cash_flows
    ENGINE = Distributed(test_db, test_db, cash_flows, SourceAccount)
    ```

## Verify your distributed table

Check if the distributed table you created is available and if you can
use it to access your data from all the shards.

1.  Run a read query for the number of table rows:

    ```sql
    SELECT count() FROM test_db.cash_flows_distributed
    ```

    As a response to this query, you can expect to receive a number of rows
    from all the shards. This is because when you connect on one node and
    read from the distributed table, ClickHouse® aggregates the data from
    all the shards and returns all of it.

1.  Run a write query to insert new data into the distributed table:

    ```sql
    INSERT INTO test_db.cash_flows_distributed (
      EventDate, SourceAccount, TargetAccount, Amount
    )
    VALUES (
      '2022-01-02 03:04:05', 123, 456, 100.0
    )
    ```

When you insert data into the distributed table, ClickHouse® decides on
which node the data should be stored and write it to the correct node
making sure that a similar volume of data is written on all the nodes.
