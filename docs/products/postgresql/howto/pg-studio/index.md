---
title: PG Studio for Aiven for PostgreSQL®
sidebar_label: PG Studio
keywords: ["AI", "Artificial intelligence", "PostgreSQL AI editor", "SQL editor", "studio", "PostgreSQL studio"]
early: true
---

import ConsoleIcon from "@site/src/components/ConsoleIcons";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";
import DocCardList from '@theme/DocCardList';

Aiven PG Studio lets you write, understand, and run SQL queries in the Aiven Console using natural language. It combines an SQL editor with an AI assistant that uses your database schema to generate and explain queries.

Organization admins can control query execution and AI features separately.

:::important
PG Studio is an <EarlyBadge/> feature.
:::

## What PG Studio offers

PG Studio supports:

- Writing SQL in plain English or any other language
- Autocompleting SQL queries with the `Tab` key, based on PostgreSQL commands and your
  schema
- Visualizing your database structure with an interactive schema map
- Exploring tables in a **Tables** view with data preview
- Exploring schemas and table relationships
- Explaining queries and database objects
- Running queries with live results
- Executing write queries and data definition statements with built-in safety guardrails

## PG Studio components

- **Schema visualization:** View your database structure as an interactive diagram showing
  tables, columns, and relationships. Open it from **Open schema map** or request it from
  the **AI Assistant** panel. Click the copy icon next to a table name to copy it to the
  clipboard.
- **Tables view:** Browse tables in your selected schema and preview up to 100 rows.
  Open a table tab to start writing SQL.
- **SQL editor:** Write and edit SQL across multiple tabs, run queries to view results
  in the results panel, and execute write operations with built-in safety guardrails.
- **AI Assistant panel:** Describe what you need in natural language. The assistant
  generates SQL or explains queries, tables, and relationships using your database schema.

## Get started with PG Studio

<DocCardList />

## Related pages

- [AI Insights for Aiven for PostgreSQL](/docs/products/postgresql/howto/ai-insights)
