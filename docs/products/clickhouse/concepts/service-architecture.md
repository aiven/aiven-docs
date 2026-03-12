---
title: Aiven for ClickHouse® service architecture
sidebar_label: Service architecture
---

Aiven for ClickHouse® runs as a multi-master cluster. ClickHouse manages
data replication, ZooKeeper manages replication of schema and users, and
Astacus manages backup and restore.

## Deployment modes

Aiven for ClickHouse can be deployed either as a single node, a single
shard of three nodes, or multiple shards of three nodes each.

-   With a single shard, all data is present in all servers and all
    servers can be used for reads and writes (no main server, leader, or
    replica).
-   With multiple shards, the data is split between all shards and the
    data of each shard is present in all nodes of the shard.

Aiven exposes each Aiven for ClickHouse service as a single server URL. Connections
go to any of the servers in the cluster. ClickHouse replicates writes
between servers. For synchronizing schema and similar metadata between
servers, Aiven for ClickHouse uses [ZooKeeper](#zookeeper), which runs on
each ClickHouse server.

## Coordinating services

Each Aiven for ClickHouse node runs ClickHouse, ZooKeeper, and Astacus.

### ZooKeeper

ZooKeeper coordinates and synchronizes the following across nodes:

-   **Database schema**: CREATE, UPDATE, or ALTER TABLE via ClickHouse's `Replicated`
    [database engine](/docs/products/clickhouse/concepts/service-architecture#replicated-database-engine).

-   **Table data**: Via ClickHouse's `ReplicatedMergeTree`
    [table engine](/docs/products/clickhouse/concepts/service-architecture#replicated-table-engine).
    Data is transferred directly between ClickHouse servers, not through
    ZooKeeper.

-   **Users, roles, quotas, and row policies**: Stored and replicated
    across the cluster by ClickHouse.

    :::note
    Storing users, roles, quotas, and row policies in ZooKeeper ensures
    that role-based access control (RBAC) is applied consistently across
    the cluster. This approach was developed at Aiven and is now part of
    upstream ClickHouse.
    :::

ZooKeeper runs one process per node and is only accessible from within the cluster.

### Astacus {#astacus-os}

[Astacus](https://github.com/aiven/astacus) is an open-source project from
Aiven that coordinates backups of cluster databases, including ClickHouse.

## Data architecture

Aiven for ClickHouse enforces:

-   **Full schema replication**: All databases, tables, users, and
    grants are the same on all nodes.
-   **Full data replication**: Table rows are the same on all nodes
    within a shard.

[Astacus](/docs/products/clickhouse/concepts/service-architecture#astacus-os)
performs most backup and restore operations.

## Engines: database and table

ClickHouse uses two kinds of engines: database engines and table engines.

-   **Database engine**: Controls how tables are listed, created, and
    deleted. It can restrict which table engines a database allows and
    can manage replication.
-   **Table engine**: Controls how data is stored on disk or read from
    external sources (exposed as a virtual table).

### `Replicated` database engine

The default ClickHouse database engine is Atomic. It creates table
metadata on disk and configures which table engines each database
allows.

Aiven for ClickHouse uses the `Replicated` database engine, a variant of
Atomic. This engine replicates CREATE, UPDATE, and ALTER TABLE operations
to all servers via [ZooKeeper](#zookeeper). All servers share the same
table schema, so they act as one cluster rather than separate servers.

### `Replicated` table engine

The table engine handles INSERT and SELECT. The most common engines in
Aiven for ClickHouse are in the `MergeTree` family.

For a list of all the table engines that you can use in Aiven for
ClickHouse, see
[Supported table engines in Aiven for ClickHouse](/docs/products/clickhouse/reference/supported-table-engines).

#### `MergeTree` engine

With the `MergeTree` engine, each INSERT creates at least one new file.
Each file is written once and never modified. In the background, these
files (called _parts_) are merged and rewritten into a compact form. This
write pattern drives ClickHouse performance.

-   **INSERT**: Batch inserts to avoid creating many small parts.
-   **UPDATE and DELETE**: Batch these operations. Updating or removing a
    single row requires rewriting the whole part that contains it (all
    other rows in that part are kept).
-   **SELECT**: Runs quickly because data in a part is immutable and
    files can be cached.

#### `ReplicatedMergeTree` engine

Each `MergeTree` engine has a matching `ReplicatedMergeTree` engine that
replicates writes using [ZooKeeper](#zookeeper). Data is copied directly
between ClickHouse servers; ZooKeeper only keeps a shared log of update
operations. Nodes add entries to the log and watch for changes to apply.

When you create a table with a `MergeTree` engine, Aiven for ClickHouse
rewrites the query to use `ReplicatedMergeTree`. All tables are replicated
so every server has the same data, forming a high-availability cluster.
