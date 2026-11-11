---
title: PostgreSQL for Analytics on Aiven for PostgreSQL®
sidebar_label: PostgreSQL for Analytics
---

import RelatedPages from "@site/src/components/RelatedPages";

<!-- markdownlint-disable-next-line MD013 -->
Run analytical SQL queries directly against an Aiven for PostgreSQL® service by adding Iceberg tables backed by object storage you own, without copying your data out to a separate warehouse.

:::note
PostgreSQL for Analytics is in
[limited availability (LA)](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
[Request access](https://aiven.io/contact) to use it.
:::

## About PostgreSQL for Analytics

PostgreSQL for Analytics adds columnar, Apache Iceberg table storage to an Aiven for
PostgreSQL service through the `pg_lake` extension. Iceberg tables store their data as
Parquet files in a storage bucket that you provide, while the catalog that tracks
those tables lives in your PostgreSQL database. You query the Iceberg tables with
standard SQL from the same connection you already use for your operational database.

## Benefits

- **No separate warehouse**: Query Iceberg tables from the same PostgreSQL connection
  you use for your operational workload.
- **No separate pipeline to run**: Move data into Iceberg tables with SQL inside
  PostgreSQL, with no connectors, streaming tools, or external scheduler to maintain.
- **Open storage format**: Data is stored as standard Apache Iceberg tables in a bucket
  you own, not in a proprietary format inside the database.
- **Faster analytical queries**: Queries against Iceberg tables run through a
  columnar, vectorized engine instead of PostgreSQL's row-based executor, which
  speeds up queries that scan or aggregate large datasets.

## When to use PostgreSQL for Analytics

Iceberg tables suit data you append and analyze: events, logs, time-series data,
and the reports that strain your operational database today. Keep your application on
regular PostgreSQL tables and use Iceberg tables for history.

They're a poor fit for rows that change constantly, for work that needs indexes or
upserts, and for results that must be accurate to the second. Data reaches Iceberg
tables in batches, so it's only as current as your last load.

## How PostgreSQL for Analytics works

PostgreSQL for Analytics runs a separate analytical query engine alongside PostgreSQL
in your service. When you run a query against an Iceberg table, PostgreSQL forwards the
analytical parts of that query to this engine, which reads and writes the underlying
Parquet files in your bucket.

Aiven divides the service's resources between PostgreSQL and the analytical query
engine. The analytical engine runs under a hard memory limit of 45% of the service's
memory and can never exceed it, while PostgreSQL is configured with the memory settings
of a half-size plan. CPU isn't reserved: when the service is busy, the two engines get
an even share, and when one is idle the other can use the spare capacity.

## Limitations

### Service and plan

- PostgreSQL for Analytics is set when the service is created. You can't add it to an
  existing Aiven for PostgreSQL service.
- You can
  [create a PostgreSQL for Analytics service](/docs/products/postgresql/howto/enable-pg-analytics#create-your-service)
  using the Aiven API, the Aiven CLI, or Terraform, not in the Aiven Console.
- PostgreSQL shares the service with the analytical query engine, so it's configured as
  if it had half your plan, including a lower connection limit. The smallest plans don't
  leave either engine enough memory to work with.
- The analytical query engine caches Iceberg data on the service's disk, so analytical
  workloads need disk space on top of your PostgreSQL data.
- PostgreSQL 17 is the only supported version, and you can't run a major version upgrade.
- You can't fork the service or create a read replica of it. You can still power it off.
- The service can't use
  [backup to another region](/docs/products/postgresql/howto/backup-to-another-region).

### Storage

- Amazon S3 and Google Cloud Storage are the supported storage.
- You connect your own bucket; Aiven doesn't provide one. Keep it in the same region as
  your service.
- Each service needs its own bucket. See
  [Connect your storage bucket](/docs/products/postgresql/howto/enable-pg-analytics#connect-your-storage-bucket).
- Every Iceberg table needs an explicit `location` inside the bucket and path you
  connected. See [Create an Iceberg table](/docs/products/postgresql/howto/enable-pg-analytics#create-an-iceberg-table).
- Aiven backups cover your PostgreSQL data but not the contents of your bucket. Back up
  and retain that data with your cloud provider's tools.
- The Aiven Operator for Kubernetes can't create the integration that connects your
  bucket. Use the Aiven Console, the Aiven API, the Aiven CLI, or Terraform instead. See
  [Connect your storage bucket](/docs/products/postgresql/howto/enable-pg-analytics#connect-your-storage-bucket).

### SQL and data types

- Iceberg tables don't support `MERGE`, `INSERT ... ON CONFLICT`,
  `SELECT ... FOR UPDATE`, `SELECT ... FOR SHARE`, or queries that use system columns
  such as `ctid`. For upsert behavior, stage your changes in a regular PostgreSQL table
  and apply them as a `DELETE` followed by an `INSERT` in one transaction.
- Numeric columns without a declared precision and scale are stored as
  `double precision`, which loses exact decimal semantics. See
  [Create an Iceberg table](/docs/products/postgresql/howto/enable-pg-analytics#create-an-iceberg-table).

### Loading and maintenance

- There's no built-in scheduling or change data capture for loading data into Iceberg
  tables. See [Load data into Iceberg tables](/docs/products/postgresql/howto/enable-pg-analytics#load-data-into-iceberg-tables).
- Iceberg tables accumulate data files and metadata and need regular maintenance,
  especially if you write to them in small batches. See
  [Maintain Iceberg tables](/docs/products/postgresql/howto/enable-pg-analytics#maintain-iceberg-tables).

### Performance

- PostgreSQL for Analytics runs on a single node. Query performance scales with the size
  of that node, not by adding more nodes.
- Iceberg table data is read from and written to object storage, so analytical queries
  have higher latency than queries against local PostgreSQL tables.

### Extensions and external engines

- The `pg_lake_spatial` extension isn't available.
- After Aiven upgrades the `pg_lake` extension, you might need to update dependent
  extensions manually.
- PostgreSQL for Analytics owns the Iceberg tables it creates. Reading or writing them
  from outside your PostgreSQL service, for example from Trino or Apache Spark™, isn't
  supported.

<RelatedPages/>

- [Enable PostgreSQL for Analytics](/docs/products/postgresql/howto/enable-pg-analytics)
- [Manage Aiven for PostgreSQL® extensions](/docs/products/postgresql/howto/manage-extensions)
- [Database management in Aiven for PostgreSQL®](/docs/products/postgresql/database-management)
- [Limited availability and early access features](/docs/platform/concepts/service-and-feature-releases)
