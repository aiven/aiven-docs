---
title: PostgreSQL for Analytics on Aiven for PostgreSQL®
sidebar_label: PostgreSQL for Analytics
---

import RelatedPages from "@site/src/components/RelatedPages";

<!-- markdownlint-disable-next-line MD013 -->
Run analytical SQL queries directly against an Aiven for PostgreSQL® service by adding Iceberg tables backed by your own Amazon S3 bucket, without a separate data warehouse or an ETL pipeline.

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
- **No ETL pipeline**: Load data into Iceberg tables from your existing PostgreSQL
  tables directly.
- **Open storage format**: Data is stored as standard Apache Iceberg tables in an S3
  bucket you own, not in a proprietary format inside the database.
- **Faster analytical queries**: Queries against Iceberg tables run through a
  columnar, vectorized engine instead of PostgreSQL's row-based executor, which
  speeds up queries that scan or aggregate large datasets.

## How PostgreSQL for Analytics works

PostgreSQL for Analytics runs a separate analytical query engine alongside PostgreSQL
in your service. When you run a query against an Iceberg table, PostgreSQL forwards the
analytical parts of that query to this engine, which reads and writes the underlying
Parquet files in your S3 bucket.

Aiven splits the service's memory evenly between PostgreSQL and the analytical query
engine, so each gets half of the memory in your plan. Analytical queries work within
their own half, so they don't consume the memory your transactional workload depends
on.

## Requirements

- A PostgreSQL 17 service with PostgreSQL for Analytics enabled. Aiven creates this
  service for you during onboarding.
- An Amazon S3 bucket that you own and manage, used to store Iceberg table data. The
  bucket must be in the same region as your service.

## Limitations

- PostgreSQL for Analytics is enabled by Aiven on a per-service basis after a request.
  There's no self-service toggle in the [Aiven Console](https://console.aiven.io/), the
  Aiven CLI, the [Aiven Provider for Terraform](/docs/tools/terraform), or the Aiven
  Operator for Kubernetes to turn it on yourself.
- PostgreSQL for Analytics is set when the service is created. You can't add it to an
  existing Aiven for PostgreSQL service.
- Because memory is split evenly between the two engines, only half your plan's memory
  is available to PostgreSQL. Aiven doesn't enforce a minimum plan size, but the
  smallest plans don't leave either engine enough memory to work with.
- Only Amazon S3 buckets are supported as storage. Aiven doesn't provide a managed S3
  bucket for this feature.
- Use a bucket dedicated to a single PostgreSQL for Analytics service. Sharing one
  bucket between services, or using a bucket that already holds other data, isn't
  supported, and Aiven doesn't currently prevent either.
- Only the owner of a database can create or drop the `pg_lake` extension in it.
- Forks and read replicas aren't supported for a PostgreSQL for Analytics service.
  You can still power off the service.
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
