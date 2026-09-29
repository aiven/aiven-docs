---
title: PG Studio for Aiven for PostgreSQL®
sidebar_label: PG Studio
keywords: ["AI", "Artificial intelligence", "PostgreSQL AI editor", "SQL editor", "studio", "PostgreSQL studio", "Tables", "schema map"]
early: true
---

import ConsoleIcon from "@site/src/components/ConsoleIcons";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";
import DocCardList from '@theme/DocCardList';
import RelatedPages from "@site/src/components/RelatedPages";

Aiven PG Studio is the name for the SQL and table tools built into the Aiven Console for Aiven for PostgreSQL®.
PG Studio isn't a single item you open in the console. It's made up of two separate
entities in the left-hand menu: <ConsoleIcon name="sql editor"/> and
<ConsoleIcon name="pgtables"/>.

:::note
PG Studio and its AI features are on by default. To
[turn off PG Studio or its AI features](/docs/products/postgresql/howto/pg-studio/security-connections#manage-pg-studio-and-ai-features),
contact the Aiven support team.
:::

:::important
PG Studio release stage: <EarlyBadge/>
:::

## What PG Studio offers

PG Studio supports:

- Writing SQL in plain English or any other language
- Autocompleting SQL queries with the `Tab` key, based on PostgreSQL commands and your
  schema
- Visualizing your database structure with an interactive schema map
- Browsing tables and previewing table data in <ConsoleIcon name="pgtables"/>
- Exploring schemas and table relationships
- Explaining queries and database objects
- Running a single query or multiple selected queries at once, with live results in
  separate tabs
- Executing write queries and data definition statements with built-in safety guardrails

## PG Studio components

PG Studio consists of two components, each available as a separate entity in the
left-hand menu of the Aiven Console.

<ConsoleIcon name="sql editor"/>:

- **Query editor:** Write and edit SQL across multiple tabs. Run a single statement or
  select multiple statements to execute them all at once, with each result shown in its
  own tab. Execute write operations with built-in safety guardrails.
- **Table list:** Browse the schemas and tables of the selected database while you write
  queries.
- **AI Assistant panel:** Describe what you need in natural language. The assistant
  generates SQL or explains queries, tables, and relationships using your database schema.

<ConsoleIcon name="pgtables"/>:

- **Table browser:** Browse the tables of the selected database, grouped by schema. Open a
  table in its own tab to preview up to 100 rows.
- **Schema map:** View your database structure as an interactive diagram showing tables,
  columns, and relationships. The schema map opens in its own tab. To copy a table name to
  the clipboard, click the copy icon next to the name.
- **No AI Assistant:** <ConsoleIcon name="pgtables"/> doesn't include the AI Assistant
  panel available in the <ConsoleIcon name="sql editor"/>.

## Get started with PG Studio

<DocCardList />

<RelatedPages/>

- [Get started with PG Studio](/docs/products/postgresql/howto/pg-studio/get-started)
- [Write and run queries in PG Studio](/docs/products/postgresql/howto/pg-studio/write-run-queries)
- [AI Insights for Aiven for PostgreSQL](/docs/products/postgresql/howto/ai-insights)
