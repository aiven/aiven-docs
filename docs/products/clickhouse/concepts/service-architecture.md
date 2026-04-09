---
title: Aiven for ClickHouse® service architecture
sidebar_label: Service architecture
---

Aiven for ClickHouse® is implemented as a multi-master cluster where data replication is
managed by ClickHouse, schema and user replication is managed by ZooKeeper, and backup and
restore are managed by Aiven.

Understand the technical design of Aiven for ClickHouse.

## Deployment modes

Aiven for ClickHouse can be deployed either as a single node, a single
shard of three nodes, or multiple shards of three nodes each.

- With a single shard, all data is available on all nodes and all
  servers can be used for reads and writes (no main server, leader, or
  replica).
- With multiple shards, the data is split between all shards and the
  data of each shard is present in all nodes of the shard.

Each Aiven for ClickHouse service is exposed as a single server URL
pointing to all servers with connections going randomly to any of the
servers. ClickHouse is responsible for replicating the writes between
the servers. For synchronizing critical low-volume information between
servers, Aiven for ClickHouse relies on
[ZooKeeper](#zookeeper), which runs on
each ClickHouse server.

## Coordinating services

Each Aiven for ClickHouse node runs ClickHouse and ZooKeeper.

### ZooKeeper

ZooKeeper handles cross-node coordination and synchronization for these
replication processes:

- Replication of database changes across the cluster: CREATE, UPDATE,
  or ALTER TABLE (by ClickHouse's `Replicated`
  [database engine](/docs/products/clickhouse/concepts/service-architecture#replicated-database-engine))

- Replication of table data across the cluster (by ClickHouse's
  `ReplicatedMergeTree`
  [table engine](/docs/products/clickhouse/concepts/service-architecture#replicated-table-engine)).
  Data itself is not written to ZooKeeper but
  transferred directly between ClickHouse servers.

- Replication of the storage of Users, Roles, Quotas, Row Policies for
  the whole cluster (by ClickHouse).

  :::note
  Storing entities such as Users, Roles, Quotas, and Row Policies in
  ZooKeeper ensures that Role Based Access Control (RBAC) is applied
  consistently over the entire cluster. This type of entity storage
  was developed at Aiven and is now part of the upstream ClickHouse.
  :::

ZooKeeper handles one process per node and is accessible only from
within the cluster.

### Backup and restore

[Backup and restore](/docs/products/clickhouse/concepts/disaster-recovery#service-backup)
for the service is implemented and operated by Aiven. Backups are coordinated across the
cluster so that restores are applied safely and consistently.

## Data architecture

Aiven for ClickHouse enforces

- Full schema replication: all databases, tables, users, and grants
  are the same on all nodes.
- Full data replication: table rows are the same on all nodes within a
  shard.

For more information about backups and disaster recovery, see
[Service backup](/docs/products/clickhouse/concepts/disaster-recovery#service-backup).

## Engines: database and table

ClickHouse has engines in two flavors: Table engines and database
engines.

- The database engine manipulates tables and decides what happens when
  you list, create, or delete a table. It can also restrict a database
  to specific table engines or manage replication.
- The table engine decides how data is stored on disk or how data is
  read from outside the disk and exposed as a virtual table.

### `Replicated` database engine

The default ClickHouse database engine is the Atomic engine, responsible
for creating table metadata on the disk and configuring which table
engines are allowed in each database.

Aiven for ClickHouse uses the `Replicated` database engine, which is a
variant of Atomic. With this engine variant, queries for creating,
updating, or altering tables are replicated to all other servers using
[ZooKeeper](#zookeeper). As a result, all
servers can have the same table schema, which makes them an actual data
cluster and not multiple independent servers that can talk to each
other.

### `Replicated` table engine

The table engine handles `INSERT` and `SELECT` queries. From
a wide variety of available table engines, the most common ones belong
to the `MergeTree` engine family, which Aiven for ClickHouse
supports.

For a list of all the table engines that you can use in Aiven for
ClickHouse, see
[Supported table engines in Aiven for ClickHouse](/docs/products/clickhouse/reference/supported-table-engines).

#### `MergeTree` engine

With the `MergeTree` engine, at least one new file is created for each
INSERT query and each new file is written once and never modified. In
the background, new files (called _parts_) are re-read, merged, and
rewritten into compact form. Writing data in parts determines the
performance profile of ClickHouse.

- Batch INSERT queries to avoid creating many small parts.
- Batch UPDATE and DELETE queries. Removing or updating a single row
  requires rewriting an entire part with all rows except the one being
  removed or updated.
- SELECT queries are executed rapidly because all the data found in a
  part is valid and all files can be cached since they never change.

#### `ReplicatedMergeTree` engine

Each engine of the `MergeTree` family has a matching
`ReplicatedMergeTree` engine, which additionally enables the replication
of all writes using [ZooKeeper](#zookeeper). The data itself doesn't travel through
ZooKeeper and is actually fetched from one ClickHouse server to another. A shared log of
update queries is maintained with ZooKeeper. All nodes add entries to
the queue and watch for changes to execute the queries.

When a query to create a table using the `MergeTree` engine arrives,
Aiven for ClickHouse automatically rewrites the query to use the
`ReplicatedMergeTree` engine so that all tables are replicated and all
servers have the same table data, which makes the deployment a
high-availability cluster.
