---
title: PG Studio for Aiven for PostgreSQL®
sidebar_label: PG Studio
keywords: ["AI", "Artificial intelligence", "PostgreSQL AI editor", "SQL editor", "studio", "PostgreSQL studio", "Tables", "schema map", "extensions manager"]
early: true
---

import ConsoleIcon from "@site/src/components/ConsoleIcons";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";
import DocCardList from '@theme/DocCardList';
import RelatedPages from "@site/src/components/RelatedPages";

PG Studio is a set of Aiven Console tools that let you work directly with the databases in your Aiven for PostgreSQL® service.

Each PG Studio tool is available in the left-hand menu of your service:

- <ConsoleIcon name="sql editor"/>: Write and run SQL queries, with help from the AI
  Assistant.
- <ConsoleIcon name="pgtables"/>: Browse tables, preview table data, and view the schema
  map.
- <ConsoleIcon name="pgextensions"/>: Enable, update, and disable PostgreSQL extensions.

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
- Browsing tables and previewing table data
- Exploring schemas and table relationships
- Explaining queries and database objects
- Running a single query or multiple selected queries at once, with live results in
  separate tabs
- Executing write queries and data definition statements directly against your database
- Managing PostgreSQL extensions without writing SQL

## PG Studio tools

### SQL editor

In the <ConsoleIcon name="sql editor"/>, you can use:

- **Query editor:** Write and edit SQL across multiple tabs. Run a single statement or
  select multiple statements to execute them all at once, with each result shown in its
  own tab. Execute write operations within query timeouts and rate limits.
- **Table list:** Browse the schemas and tables of the selected database while you write
  queries.
- **AI Assistant panel:** Describe what you need in natural language. The assistant
  generates SQL or explains queries, tables, and relationships using your database schema.

### Tables

In <ConsoleIcon name="pgtables"/>, you can use:

- **Table browser:** Browse the tables of the selected database, grouped by schema. Open a
  table in its own tab to preview up to 100 rows.
- **Schema map:** View your database structure as an interactive diagram showing tables,
  columns, and relationships. The schema map opens in its own tab. To copy a table name to
  the clipboard, click the copy icon next to the name.

The AI Assistant panel is available only in the <ConsoleIcon name="sql editor"/>.

### Extensions

In <ConsoleIcon name="pgextensions"/>, the extensions manager lists the PostgreSQL
extensions available in the selected database, with their versions and schemas. From the
list, you can:

- Enable an extension in a schema of your choice.
- Update an installed extension when a newer version is available.
- Disable an extension, optionally with the objects that depend on it.

To manage extensions with SQL commands instead, see
[Manage Aiven for PostgreSQL® extensions](/docs/products/postgresql/howto/manage-extensions).

## Get started with PG Studio

<DocCardList />

<RelatedPages/>

- [Get started with PG Studio](/docs/products/postgresql/howto/pg-studio/get-started)
- [Write and run queries in PG Studio](/docs/products/postgresql/howto/pg-studio/write-run-queries)
- [Manage Aiven for PostgreSQL® extensions](/docs/products/postgresql/howto/manage-extensions)
- [AI Insights for Aiven for PostgreSQL](/docs/products/postgresql/howto/ai-insights)
