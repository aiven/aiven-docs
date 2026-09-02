---
title: Integrations and extensions for Aiven for PostgreSQL®
sidebar_label: Integrations and extensions
---

import RelatedPages from "@site/src/components/RelatedPages";

Extend your Aiven for PostgreSQL® service with extensions, AI and vector search, logical
replication, and other data integrations.

## Choose an integration

- **Extensions**: Add SQL-level capabilities, such as geospatial types, cryptographic
  functions, or scheduled jobs, directly to your database.
- **AI and vector search**: Use `pgvector` to store embeddings and run similarity search
  alongside your relational data, without a separate vector database.
- **Logical replication**: Keep a self-managed PostgreSQL cluster, or an AWS Aurora, AWS
  RDS, or Google Cloud SQL instance, continuously synchronized with Aiven for PostgreSQL.
  This section covers the same PostgreSQL feature that powers continuous migration, set
  up for ongoing sync rather than a one-time cutover.
- **Datasource integration**: Connect two Aiven for PostgreSQL services so one can query
  the other, without maintaining a broad IP allow list on either side.
- **Google Looker Studio**: Build reports and visualizations from your PostgreSQL data
  alongside other data sources.

## Things to know

- Some extensions have dedicated, service-level configuration beyond running `CREATE
  EXTENSION`. For example, `pgaudit`, `timescaledb`, `pg_stat_monitor`, and
  `pg_stat_plans` each expose their own settings through the service's advanced
  configuration or the Aiven Terraform Provider, separate from the SQL statement that
  enables the extension.
- Aiven reviews extensions that require superuser access before making them available,
  and some extensions require a specific install order or resetting your client
  connection before they're fully available.

<RelatedPages/>

- [Extensions on Aiven for PostgreSQL®](/docs/products/postgresql/reference/list-of-extensions)
- [AI and vector search](/docs/products/postgresql/ai-vector-search)
- [Set up logical replication to Aiven for
  PostgreSQL®](/docs/products/postgresql/howto/setup-logical-replication)
- [Connect two PostgreSQL® services via datasource
  integration](/docs/products/postgresql/howto/datasource-integration)
- [Report and analyze with Google Looker
  Studio](/docs/products/postgresql/howto/analyze-with-google-data-studio)
