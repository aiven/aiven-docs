---
title: AI and vector search in Aiven for PostgreSQL®
sidebar_label: AI and vector search
---

import RelatedPages from "@site/src/components/RelatedPages";

Use the pgvector extension to power AI-based vector search in your Aiven for
PostgreSQL® service.

## Why use pgvector instead of a separate vector database

`pgvector` adds a vector data type and distance operators directly to PostgreSQL, so
embeddings live in the same database and transactions as the rest of your data. For
use cases such as retrieval-augmented generation (RAG) or product recommendations, this
means you query relational data and vector similarity together, without building a
sync pipeline to keep a separate vector database up to date.

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
