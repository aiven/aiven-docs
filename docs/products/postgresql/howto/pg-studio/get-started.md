---
title: Get started with PG Studio
sidebar_label: Get started
description: Open PG Studio and run your first queries.
---

import ConsoleIcon from "@site/src/components/ConsoleIcons";

Open PG Studio and run your first queries.

:::note
PG Studio and its AI features are on by default, so no setup is needed. To turn them off,
see [Manage PG Studio and AI features](/docs/products/postgresql/howto/pg-studio/security-connections#manage-pg-studio-and-ai-features).
:::

## Prerequisites

To use PG Studio, you need:

- **Aiven permissions:** The `service:data:write` permission at the organization, unit, or
  project level. This permission is included in the **Admin**, **Developer**, and
  **Operator** roles.
- **Network access:** Your IP address must be in the service's IP allowlist. PG Studio
  validates your browser's IP address, which must be allowed in the
  [service's IP filter configuration](/docs/platform/howto/restrict-access). If you get
  the `Access is not allowed from the IP address` error, add your IP address to the
  allowlist.

## Open PG Studio

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for PostgreSQL
   service.
1. Click <ConsoleIcon name="aieditor" />.
1. Click the source database and schema selectors.

PG Studio opens a split view that shows the SQL editor and the **AI Assistant** panel. Use
the editor selectors to change the database source and schema.

If AI features are off for your organization, the **AI Assistant** panel does not appear.

## Run your first query

You can write SQL directly. If AI features are on, you can also use the
**AI Assistant** to generate queries:

### Write SQL manually

1. In the SQL editor, enter your query, for example:

   ```sql
   SELECT * FROM users LIMIT 10;
   ```

1. Click **Run**.
1. View the results in the results panel.

### Generate SQL with AI

1. In the **AI Assistant** panel, describe what you need, for example:
   **Show all users who signed up in the last 7 days**.
1. Review the generated SQL in the SQL editor.
1. Click **Run** to execute the query.

## Explore your schema

1. Click **Open schema map** to view your database structure as an interactive diagram.
1. Browse tables, columns, and relationships.
1. Ask schema questions in the **AI Assistant** panel, such as
   **How are the orders and customers tables related?**.

## Related pages

- [Use AI Assistant](/docs/products/postgresql/howto/pg-studio/use-ai-assistant)
- [Write and run queries](/docs/products/postgresql/howto/pg-studio/write-run-queries)
- [PG Studio overview](/docs/products/postgresql/howto/pg-studio/)
