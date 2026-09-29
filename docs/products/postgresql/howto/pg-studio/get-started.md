---
title: Get started with PG Studio
sidebar_label: Get started
description: Open the SQL editor or Tables, run your first queries, and explore your tables and schema.
---

import ConsoleIcon from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Run your first queries in the <ConsoleIcon name="sql editor"/>, and explore your tables and schema in <ConsoleIcon name="pgtables"/>.

:::note
PG Studio and its AI features are on by default, so no setup is needed. To turn them off,
see [Manage PG Studio and AI features](/docs/products/postgresql/howto/pg-studio/security-connections#manage-pg-studio-and-ai-features).
:::

## Prerequisites

To use PG Studio, you need:

- **Aiven permissions:** The `service:data:write` and `service:secrets:read` permissions
  at the organization, unit, or project level. These permissions are included in the
  **Admin**, **Developer**, and **Operator** roles.
- **Network access:** Your IP address must be in the service's IP allowlist. PG Studio
  validates your browser's IP address, which must be allowed in the
  [service's IP filter configuration](/docs/platform/howto/restrict-access). If you get
  the `Access is not allowed from the IP address` error, add your IP address to the
  allowlist.

## Open a PG Studio feature

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for PostgreSQL
   service.
1. In the left-hand menu, click one of the following:
   - <ConsoleIcon name="sql editor"/>: Write and run SQL queries.
   - <ConsoleIcon name="pgtables"/>: Browse tables and open the schema map.
   - <ConsoleIcon name="pgextensions"/>: Enable, update, and disable extensions. See
     [Manage extensions in the Aiven Console](/docs/products/postgresql/howto/manage-extensions#manage-extensions-in-the-aiven-console).
1. Select the source database.

If AI features are off for your organization, the **AI Assistant** panel does not appear
in the <ConsoleIcon name="sql editor"/>.

## Run your first query

You can write SQL directly. If AI features are on, you can also use the
**AI Assistant** to generate queries:

### Write SQL manually

1. In the <ConsoleIcon name="sql editor"/>, enter your query, for example:

   ```sql
   SELECT * FROM users LIMIT 10;
   ```

1. Click **Run**.
1. View the results in the results panel.

### Generate SQL with AI

1. In the **AI Assistant** panel, describe what you need, for example:
   **Show all users who signed up in the last 7 days**.
1. Review the generated SQL in the <ConsoleIcon name="sql editor"/>.
1. Click **Run** to execute the query.

## Explore your tables

1. In the left-hand menu, click <ConsoleIcon name="pgtables"/>.
1. Select the source database. The table list shows the tables of that database, grouped
   by schema.
1. Click a table. The table opens in its own tab and shows up to 100 rows.

## Explore your schema

1. In the left-hand menu, click <ConsoleIcon name="pgtables"/>.
1. Click <ConsoleIcon name="open schema map"/>. The schema map opens in its own tab and
   shows your database structure as an interactive diagram.
1. Browse tables, columns, and relationships.

<RelatedPages/>

- [Use AI Assistant in PG Studio](/docs/products/postgresql/howto/pg-studio/use-ai-assistant)
- [Write and run queries in PG Studio](/docs/products/postgresql/howto/pg-studio/write-run-queries)
- [PG Studio overview](/docs/products/postgresql/howto/pg-studio/)
