---
title: Table engines and replication in Aiven for ClickHouse®
sidebar_label: Table engines and replication
---

ClickHouse uses database engines and table engines to control how schema and data are managed. These engines determine how tables behave during writes, replication, and queries.

## Database engines and table engines

ClickHouse defines:

- **Database engines**, which manage table metadata and schema behavior
- **Table engines**, which define how data is stored, replicated, and queried

Database engines control how tables are created and synchronized.
Table engines control how data is written and read.

## Replicated database engine

Aiven for ClickHouse uses the `Replicated` database engine in multi-node deployments.

With this engine:

- Schema changes (`CREATE`, `ALTER`, `DROP`) are synchronized across nodes
- All nodes maintain the same database structure

This ensures consistent schema within a shard.

## MergeTree table engines

Most analytical workloads use the `MergeTree` family of engines.

With `MergeTree`:

- Each `INSERT` creates immutable data files called *parts*
- Existing data is not modified in place
- Parts are merged in the background

This storage model determines how writes and updates behave.

## Insert behavior

Each `INSERT` creates new parts on disk.

Frequent small inserts create many small parts, which reduces efficiency.
Batch inserts whenever possible.

## Update and delete behavior

ClickHouse does not update rows in place.

`UPDATE` and `DELETE` operations rewrite entire parts that contain affected rows.
Frequent row-level updates are inefficient compared to append-heavy workloads.

## ReplicatedMergeTree

In multi-node deployments, replicated versions of `MergeTree` engines are used.

With replicated table engines:

- Data is copied across nodes within a shard
- Each node maintains the same table data
- Any node can serve read and write queries

Replication is handled automatically within the cluster.

For a list of supported engines, see [Supported table engines in Aiven for ClickHouse](/docs/products/clickhouse/reference/supported-table-engines).
