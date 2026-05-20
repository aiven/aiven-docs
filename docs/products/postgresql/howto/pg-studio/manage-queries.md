---
title: Manage queries in PG Studio
sidebar_label: Manage queries
description: Save and organize your queries for reuse.
---

PG Studio lets you save useful SQL and revisit recently executed statements, so you can continue analysis without rewriting queries.

## Save queries

Save a query so you can open and run it again later. Saved queries are user-specific. Other
users in the same Aiven for PostgreSQL service can't see your saved queries.

To save a query:

1. In the SQL editor, write or generate your query.
1. Run the query and verify the result.
1. Click **Save**.

PG Studio saves the query using the current tab name. The query appears in **Saved queries**.

## Access saved queries and query history

**Saved queries** shows both your explicitly saved queries and your recent query history,
so you can return to any previous work.

For write query history and fork-based rollback, see
[View and revert write query history](/docs/products/postgresql/howto/pg-studio/write-run-queries#view-and-revert-write-query-history).

To open a saved query or a recent query:

1. In the SQL editor, click **Saved queries**.
1. Select a query from the list to load it into the editor.
1. Click **Run** to execute the query.

## Rename saved queries

To rename a saved query:

1. Click **Saved queries**.
1. Select a query from the list.
1. Double-click the query tab name, enter a new name, and press `Enter`.

## Delete saved queries

To delete a saved query:

1. Click **Saved queries**.
1. Select a query from the list.
1. Click **Delete** to remove the query from your saved list.

:::note
Deleting a query removes it only from your saved queries list in the editor. It does not
delete any database objects created earlier by running SQL in your database.
:::

## Related pages

- [Write and run queries](/docs/products/postgresql/howto/pg-studio/write-run-queries)
- [Get started with PG Studio](/docs/products/postgresql/howto/pg-studio/get-started)
- [PG Studio overview](/docs/products/postgresql/howto/pg-studio/)
