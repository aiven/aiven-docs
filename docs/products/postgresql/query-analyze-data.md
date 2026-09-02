---
title: Query and analyze data in Aiven for PostgreSQL®
sidebar_label: Query and analyze data
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Write and run queries, and identify and optimize slow queries in your Aiven for PostgreSQL® service.

## Tools for finding and fixing slow queries

- **[Aiven AI Database Optimizer](/docs/products/postgresql/howto/ai-insights)**, in
  the <ConsoleLabel name="observe"/> section as **AI insights**, suggests
  optimizations automatically, without you writing any analysis queries yourself.
- **[`pg_stat_statements`](/docs/products/postgresql/howto/identify-pg-slow-queries)**
  gives you the underlying query statistics instead, so you can write your own
  analysis queries rather than relying on automated suggestions.
- **[PG Studio](/docs/products/postgresql/howto/pg-studio)**'s AI assistant is a
  separate feature. It doesn't analyze historical query performance the way AI
  insights or `pg_stat_statements` do.

## Historical analysis compared to live queries

Identifying slow queries and [optimizing
them](/docs/products/postgresql/howto/optimize-pg-slow-queries) both work from
statistics on completed executions. [Detecting and terminating long-running
queries](/docs/products/postgresql/howto/pg-long-running-queries), in contrast,
targets queries that are running right now. Use the historical tools to prevent slow
queries, and the live tools to react to one that's already blocking other work.

<RelatedPages/>

- [PG Studio for Aiven for PostgreSQL®](/docs/products/postgresql/howto/pg-studio)
- [AI database optimizer for Aiven for
  PostgreSQL®](/docs/products/postgresql/howto/ai-insights)
- [Identify PostgreSQL® slow queries with
  pg_stat_statements](/docs/products/postgresql/howto/identify-pg-slow-queries)
- [Detect and terminate long-running queries in Aiven for
  PostgreSQL®](/docs/products/postgresql/howto/pg-long-running-queries)
