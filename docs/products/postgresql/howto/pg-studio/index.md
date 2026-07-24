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

:::note
PG Studio and its AI features are on by default. To
[turn off PG Studio or its AI features](/docs/products/postgresql/howto/pg-studio/security-connections#manage-pg-studio-and-ai-features),
contact the Aiven support team.
:::

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
- Running a single query or multiple selected queries at once, with live results in
  separate tabs
- Executing write queries and data definition statements with built-in safety guardrails

## PG Studio components

**SQL Editor:**

- **SQL editor:** Write and edit SQL across multiple tabs. Run a single statement or select
  multiple statements to execute them all at once, with each result shown in its own tab.
  Execute write operations with built-in safety guardrails.
- **AI Assistant panel:** Describe what you need in natural language. The assistant
  generates SQL or explains queries, tables, and relationships using your database schema.

**Tables:**

- **Tables view:** Browse tables in your selected schema and preview up to 100 rows.
  Open a table tab to start writing SQL.
- **Schema map:** View your database structure as an interactive diagram showing tables,
  columns, and relationships. Click the copy icon next to a table name to copy it to the
  clipboard.

## Get started with PG Studio

<DocCardList />

## Related pages

- [AI Insights for Aiven for PostgreSQL](/docs/products/postgresql/howto/ai-insights)
