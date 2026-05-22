---
title: Databases, tables, and views in Aiven for ClickHouse®
sidebar_label: Databases, tables, and views
---

import RelatedPages from "@site/src/components/RelatedPages";

Databases, tables, and views organize data in Aiven for ClickHouse®. A database
groups related tables and other database objects. Tables store data using table
engines that define how data is stored, replicated, and queried. Views and
materialized views help query, transform, or precompute data.

You can create and manage databases and tables in the
[Aiven Console](https://console.aiven.io/) or with SQL. In addition to regular
databases, you can create
[integration databases](/docs/products/clickhouse/howto/integration-databases#create-integration-databases)
to connect with other Aiven services.

## Databases

A database groups related tables, views, and other objects. Aiven for ClickHouse
supports multiple database engines depending on the service configuration and use
case.

## Tables

A table stores data in rows and columns. Each table uses a table engine that
controls storage behavior, indexing, replication, and data lifecycle features.

## Views and materialized views

Views and materialized views help query or transform data. A materialized view
stores query results and can improve performance for repeated queries or
pre-aggregated data.

## Engines

How data is stored and queried depends on the engines you choose:

- [Table engines](/docs/products/clickhouse/reference/supported-table-engines)
  define how data is stored on disk or read from external sources.
- [Database engines](/docs/products/clickhouse/reference/supported-database-engines)
  control how a database manages its tables and metadata.

Engine availability can vary by Aiven for ClickHouse service version.

<RelatedPages/>

- [Manage databases and tables](/docs/products/clickhouse/howto/manage-databases-tables)
- [Supported table engines](/docs/products/clickhouse/reference/supported-table-engines)
- [Supported database engines](/docs/products/clickhouse/reference/supported-database-engines)
- [Materialized views](/docs/products/clickhouse/howto/materialized-views)
