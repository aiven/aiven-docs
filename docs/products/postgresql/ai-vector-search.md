---
title: AI and vector search in Aiven for PostgreSQL®
sidebar_label: AI and vector search
---

import RelatedPages from "@site/src/components/RelatedPages";

Use the [pgvector](/docs/products/postgresql/concepts/pgvector) extension to power AI-based vector search in your Aiven for PostgreSQL® service.

## Why use pgvector instead of a separate vector database

Because `pgvector` runs inside PostgreSQL rather than as a standalone system, your
embeddings share the same transactions, backups, and access controls as the rest of
your data. Querying relational data and vector similarity together also means you skip
building and operating a pipeline to keep a separate vector database in sync with your
source of truth.

## Things to know

- `pgvector` is available as an extension on every PostgreSQL major version Aiven
  supports, so you can adopt it without planning a version upgrade first.
- For larger vector workloads, the `pgvectorscale` extension complements `pgvector` with
  additional indexing. See [Extensions on Aiven for
  PostgreSQL®](/docs/products/postgresql/reference/list-of-extensions) for supported
  versions.

<RelatedPages/>

- [pgvector for AI-powered search in Aiven for
  PostgreSQL®](/docs/products/postgresql/concepts/pgvector)
- [Enable and use pgvector on Aiven for
  PostgreSQL®](/docs/products/postgresql/howto/use-pgvector)
