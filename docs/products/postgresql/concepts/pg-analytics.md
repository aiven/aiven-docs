---
title: PostgreSQL for Analytics on Aiven for PostgreSQL®
sidebar_label: PostgreSQL for Analytics
---

import RelatedPages from "@site/src/components/RelatedPages";

<!-- markdownlint-disable-next-line MD013 -->
Run analytical SQL queries directly against an Aiven for PostgreSQL® service by adding Iceberg tables backed by your own Amazon S3 bucket, without copying your data out to a separate warehouse.

:::note
PostgreSQL for Analytics is in
[limited availability (LA)](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
There's no self-service way to turn it on. [Request access](https://aiven.io/contact),
and Aiven sets it up with you during a short onboarding call. Only a subset of
functionality is available at this stage, and behavior can change before general
availability.
:::

## About PostgreSQL for Analytics

PostgreSQL for Analytics adds columnar, Apache Iceberg table storage to an Aiven for
PostgreSQL service through the `pg_lake` extension. Iceberg tables store their data as
Parquet files in an Amazon S3 bucket that you provide, while the catalog that tracks
those tables lives in your PostgreSQL database. You query the Iceberg tables with
standard SQL from the same connection you already use for your operational database.

This lets you run analytical (OLAP) queries on data that originates in your
transactional (OLTP) tables, without exporting it to a separate warehouse or
maintaining a pipeline to keep the two in sync.

## Benefits

- **No separate warehouse**: Query Iceberg tables from the same PostgreSQL connection
  you use for your operational workload.
- **No separate pipeline to run**: Move data into Iceberg tables with SQL inside
  PostgreSQL, with no connectors, streaming tools, or external scheduler to maintain.
- **Open storage format**: Data is stored as standard Apache Iceberg tables in an S3
  bucket you own, not in a proprietary format inside the database.
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
Parquet files in your S3 bucket.

Aiven divides the service's resources between PostgreSQL and the analytical query
engine. The analytical engine runs under a hard memory limit of 45% of the service's
memory and can never exceed it, while PostgreSQL is configured with the memory settings
of a half-size plan. CPU isn't reserved: when the service is busy, the two engines get
an even share, and when one is idle the other can use the spare capacity.

## Requirements

- A PostgreSQL 17 service with PostgreSQL for Analytics enabled. Aiven creates this
  service for you during onboarding.
- An Amazon S3 bucket that you own and manage, used to store Iceberg table data. The
  bucket must be in the same region as your service.

## Limitations

- Creating a PostgreSQL for Analytics service requires a project-level permission that
  only Aiven grants, so there's no self-service path to turning the feature on in any
  Aiven tool.
- PostgreSQL for Analytics is set when the service is created. You can't add it to an
  existing Aiven for PostgreSQL service.
- Iceberg tables don't support `MERGE`, `INSERT ... ON CONFLICT`,
  `SELECT ... FOR UPDATE`, `SELECT ... FOR SHARE`, or queries that use system columns
  such as `ctid`. For upsert behavior, stage your changes in a regular PostgreSQL table
  and apply them as a `DELETE` followed by an `INSERT` in one transaction.
- Because the service's resources are shared with the analytical query engine,
  PostgreSQL is configured as if it had half your plan, including a lower connection
  limit. Aiven doesn't enforce a minimum plan size, but the smallest plans don't leave
  either engine enough memory to work with.
- Only Amazon S3 buckets are supported as storage. Aiven doesn't provide a managed S3
  bucket for this feature.
- Use a bucket dedicated to a single PostgreSQL for Analytics service. Sharing one
  bucket between services, or using a bucket that already holds other data, isn't
  supported, and Aiven doesn't currently prevent either.
- You can't fork a PostgreSQL for Analytics service or create a read replica of one.
  Aiven rejects both, because the new service would share the original service's S3
  storage. You can still power off the service.
- You can't perform a major version upgrade on a PostgreSQL for Analytics service.
  PostgreSQL for Analytics currently supports PostgreSQL 17 only.
- The `pg_lake_spatial` extension isn't available during LA.
- Numeric columns without a declared precision and scale are stored as
  `double precision` in Iceberg tables, which loses exact decimal semantics. Declare
  `numeric(P,S)` on the columns you migrate, or turn off the automatic conversion. See
  [Create an Iceberg table](/docs/products/postgresql/howto/enable-pg-analytics#create-an-iceberg-table).
- The Amazon S3 endpoint you connect PostgreSQL for Analytics to is a project-level
  object, shared with other integrations such as Aiven for ClickHouse® and Vector.
  It remains visible elsewhere in your project. Only creating a PostgreSQL for
  Analytics integration from it is restricted to enabled services.
- PostgreSQL for Analytics runs on a single node. There's no distributed mode, so
  query performance scales with the size of that node, not by adding more nodes.
- PostgreSQL for Analytics owns the Iceberg tables it creates. Writing to the same
  Iceberg table from outside your PostgreSQL service, for example directly from
  another engine, isn't supported.
- The analytical query engine runs as a single process shared by all analytical
  queries on the service. If it fails, currently running analytical queries fail
  along with it, and Aiven restarts it automatically. Your PostgreSQL workload
  isn't affected.
- Because Iceberg table data is read from and written to S3, analytical queries
  have higher latency than queries against local PostgreSQL tables, and are
  subject to your cloud provider's network throughput and request limits.
- Iceberg tables accumulate data files and metadata over time and require regular
  maintenance, especially if you write to them frequently in small batches. Running
  this maintenance triggers `pg_lake` cleanup work through the analytical query
  engine, and its interaction with PostgreSQL's autovacuum isn't fully
  characterized yet. If you run frequent Iceberg table maintenance, monitor
  autovacuum activity on your service. See
  [Maintain Iceberg tables](/docs/products/postgresql/howto/enable-pg-analytics#maintain-iceberg-tables).
- Aiven manages the version of the `pg_lake` extension and applies upgrades on your
  behalf. Because dependency updates between extensions aren't applied automatically,
  you might need to manually update other extensions after an upgrade.
- Aiven backups cover your PostgreSQL data but not the contents of your S3 bucket. Back
  up and retain your S3 data using your own cloud provider's tools, and plan your
  recovery process to account for both PostgreSQL and S3 data.

<RelatedPages/>

- [Enable PostgreSQL for Analytics](/docs/products/postgresql/howto/enable-pg-analytics)
- [Manage Aiven for PostgreSQL® extensions](/docs/products/postgresql/howto/manage-extensions)
- [Database management in Aiven for PostgreSQL®](/docs/products/postgresql/database-management)
- [Limited availability and early access features](/docs/platform/concepts/service-and-feature-releases)
