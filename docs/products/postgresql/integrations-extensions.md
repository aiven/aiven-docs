---
title: Integrations and extensions for Aiven for PostgreSQL®
sidebar_label: Integrations and extensions
---

import RelatedPages from "@site/src/components/RelatedPages";

Extend your Aiven for PostgreSQL® service with extensions, AI and vector search, logical
replication, and other data integrations.

## Choose an integration

- **[Extensions](/docs/products/postgresql/reference/list-of-extensions)**: Add
  SQL-level capabilities directly to your database with a `CREATE EXTENSION` statement.
- **[AI and vector search](/docs/products/postgresql/ai-vector-search)**: Use `pgvector`
  for embeddings and similarity search on the same service as your relational data.
- **[Logical replication](/docs/products/postgresql/howto/setup-logical-replication)**:
  Keep a self-managed PostgreSQL cluster, or an AWS Aurora, AWS RDS, or Google Cloud SQL
  instance, continuously synchronized with Aiven for PostgreSQL. This is the same
  PostgreSQL feature that powers [continuous
  migration](/docs/products/postgresql/migrate), set up for ongoing sync rather than a
  one-time cutover.
- **[Datasource integration](/docs/products/postgresql/howto/datasource-integration)**:
  Query one Aiven for PostgreSQL service from another.
- **[Google Looker
  Studio](/docs/products/postgresql/howto/analyze-with-google-data-studio)**: Report on
  your PostgreSQL data using a third-party business intelligence tool.

## Things to know

Some extensions have dedicated, service-level configuration beyond running `CREATE
EXTENSION`. For example, [`pgaudit`](/docs/products/postgresql/howto/list-pgaudit),
`timescaledb`, `pg_stat_monitor`, and `pg_stat_plans` each expose their own settings
through the service's advanced configuration or the Aiven Terraform Provider, separate
from the SQL statement that enables the extension.

<RelatedPages/>

- [Extensions on Aiven for PostgreSQL®](/docs/products/postgresql/reference/list-of-extensions)
- [AI and vector search](/docs/products/postgresql/ai-vector-search)
- [Set up logical replication to Aiven for
  PostgreSQL®](/docs/products/postgresql/howto/setup-logical-replication)
- [Connect two PostgreSQL® services via datasource
  integration](/docs/products/postgresql/howto/datasource-integration)
