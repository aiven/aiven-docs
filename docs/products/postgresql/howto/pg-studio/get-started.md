---
title: Get started with PG Studio
sidebar_label: Get started
description: Open PG Studio and run your first queries.
---

import ConsoleIcon from "@site/src/components/ConsoleIcons";

Open PG Studio and run your first queries.

## Prerequisites

To use PG Studio, you need:

- **Aiven permissions:** The `service:data:write` permission at the organization, unit, or
  project level. This permission is included in the **Admin**, **Developer**, and
  **Operator** roles.
- **Organization setting:**
  [Enable query editors for your organization](/docs/products/postgresql/howto/pg-studio/get-started#turn-pg-studio-on-or-off-for-an-organization).
  This enables PG Studio by default.
- **Network access:** Your IP address must be in the service's IP allowlist. PG Studio
  validates your browser's IP address, which must be allowed in the
  [service's IP filter configuration](/docs/platform/howto/restrict-access). If you get
  the `Access is not allowed from the IP address` error, add your IP address to the
  allowlist.

## Turn PG Studio on or off for an organization

Organization admins can control query editor access and turn on PG Studio for their
organizations. These settings apply to all projects in those organizations.

1. Change query editor access to later enable PG Studio:

   1. In the [Aiven Console](https://console.aiven.io/login), open the organization.
   1. Go to the organization query editor access setting.
   1. Turn query editors on or off.

1. Enable PG Studio for your organization:

   1. In the [Aiven Console](https://console.aiven.io/login), open the organization.
   1. Go to **Admin** > **Platform management** > **Feature management**.
   1. In the **PostgreSQL** section, find **PG Studio** and use the toggle to enable it.

## Open PG Studio

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for PostgreSQL
   service.
1. Click <ConsoleIcon name="aieditor" />.
1. Select the source database and schema.

PG Studio opens a split view that shows the SQL editor and the **AI Assistant** panel. Use
the editor selectors to change the database source and schema.

## Run your first query

You can write SQL directly or use the AI Assistant to generate queries:

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
