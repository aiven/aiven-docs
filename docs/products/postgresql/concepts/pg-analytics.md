---
title: PostgreSQL for Analytics on Aiven for PostgreSQL®
sidebar_label: PostgreSQL for Analytics
---

import RelatedPages from "@site/src/components/RelatedPages";

Run analytical SQL queries directly against an Aiven for PostgreSQL® service by adding
Iceberg tables backed by your own Amazon S3 bucket, without a separate data warehouse or
an ETL pipeline.

:::note
PostgreSQL for Analytics is in
[limited availability (LA)](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
and requires [access from Aiven](https://aiven.io/contact). Only a subset of
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
- **Open storage format**: Data is stored as standard Iceberg tables in your own S3
  bucket, so other tools that support Iceberg can read the same files. External
  query engines, such as Trino, can connect to your PostgreSQL service as an Iceberg
  catalog and query the data in S3 directly, without going through PostgreSQL.
- **Faster analytical queries**: Queries against Iceberg tables run through a
  columnar, vectorized engine instead of PostgreSQL's row-based executor, which
  speeds up queries that scan or aggregate large datasets.

## How PostgreSQL for Analytics works

PostgreSQL for Analytics runs a separate analytical query engine alongside PostgreSQL
in your service. When you run a query against an Iceberg table, PostgreSQL forwards the
analytical parts of that query to this engine, which reads and writes the underlying
Parquet files in your S3 bucket. Aiven allocates dedicated CPU and memory to this
engine so that analytical queries don't compete with your PostgreSQL workload for
resources.

## Requirements

- A PostgreSQL 17 service with access to PostgreSQL for Analytics granted by Aiven.
- An Amazon S3 bucket that you own and manage, used to store Iceberg table data.
- During LA, you can enable PostgreSQL for Analytics only when you create a service.
  You can't enable it on an existing service.

## Limitations

- During LA, you manage PostgreSQL for Analytics using the
  [Aiven Console](https://console.aiven.io/) only. The Aiven CLI, the
  [Aiven Provider for Terraform](/docs/tools/terraform), and the Aiven Operator for
  Kubernetes don't yet support this feature.
- Only Amazon S3 buckets are supported as storage. Aiven doesn't provide a managed S3
  bucket for this feature.
- You can't fork a PostgreSQL for Analytics service, and read replicas aren't
  supported.
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
  maintenance, especially if you write to them frequently in small batches. See
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
