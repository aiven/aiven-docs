---
title: Query and analyze data in Aiven for PostgreSQL®
sidebar_label: Query and analyze data
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Write and run queries, and identify and optimize slow queries in your Aiven for PostgreSQL® service.

## Tools for finding and fixing slow queries

- **Aiven AI Database Optimizer**, in the <ConsoleLabel name="observe"/> section as
  **AI insights**, analyzes query structure, table size, indexes, and column types to
  suggest optimizations automatically.
- **`pg_stat_statements`** gives you the underlying query statistics, so you can write
  your own analysis queries instead of relying on automated suggestions.
- **PG Studio**'s AI assistant is a separate feature for writing and explaining SQL
  from natural language. It doesn't analyze historical query performance.

## Historical analysis compared to live queries

Identifying and optimizing slow queries relies on statistics from completed
executions, captured in `pg_stat_statements`. Detecting and terminating long-running
queries works on queries that are running right now, using `pg_stat_activity` or the
**Current queries** page in the console. Use the historical tools to prevent slow
queries, and the live tools to react to one that's already blocking other work.

<RelatedPages/>

- [PG Studio for Aiven for PostgreSQL®](/docs/products/postgresql/howto/pg-studio)
- [AI database optimizer for Aiven for
  PostgreSQL®](/docs/products/postgresql/howto/ai-insights)
- [Identify PostgreSQL® slow queries with
  pg_stat_statements](/docs/products/postgresql/howto/identify-pg-slow-queries)
- [Detect and terminate long-running queries in Aiven for
  PostgreSQL®](/docs/products/postgresql/howto/pg-long-running-queries)
