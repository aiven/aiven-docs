---
title: Use AI Assistant in PG Studio
sidebar_label: Use AI Assistant
description: Generate and explain SQL queries with natural language.
---

The AI Assistant in PG Studio helps you generate SQL queries and understand your database using natural language.

:::note
AI features are on by default. If they are off for your organization, the **AI Assistant**
panel and the **Ask AI** action do not appear. Aiven manages this control. To change it,
contact the Aiven support team. See
[Manage PG Studio and AI features](/docs/products/postgresql/howto/pg-studio/security-connections#manage-pg-studio-and-ai-features).
:::

## How AI assistance works

The AI Assistant lets you get help with SQL queries and database questions in natural language. You can:

- **Generate queries:** Describe what data you need, and the assistant creates the SQL query for you.
- **Get explanations:** Ask about SQL syntax, query structure, or how specific database features work.
- **Understand your schema:** Request information about table structures, relationships, and data organization.
- **Troubleshoot queries:** Get help debugging errors, breaking down complex queries, or improving query performance.

The AI Assistant uses your database schema as context for all responses, providing accurate and relevant suggestions specific to your data structure.
It can suggest `SELECT`, data modification, and data definition statements when they match your request.
For blocked request types, see [Security safeguards](/docs/products/postgresql/howto/pg-studio/security-connections#security-safeguards).

## Generate SQL with natural language

1. In the **AI Assistant** panel, describe the query or result you need.
1. Review the generated SQL in the SQL editor.
1. Click **Run** to execute the query.

Example queries to try:

- Show monthly active users for the last 6 months
- Find all orders with a total amount greater than 1000 dollars that are still pending
- List customers who placed orders in the last 30 days
- Find duplicate email addresses in the users table
- List failed payment transactions from the last week with customer details

## Ask AI about your query

Use **Ask AI** in the SQL editor to explain queries or create a modified version of your SQL. The AI response and any updated SQL appear in the **AI Assistant** panel.

1. Paste a query into the SQL editor.
1. Optional: Highlight the part of the query to focus on.
1. Click **Ask AI** in the SQL editor.
1. In the **AI Assistant** panel, enter your request.
1. Review the explanation or updated SQL in the **AI Assistant** panel.
1. Optional: Click **Run query** in the **AI Assistant** panel to move the updated SQL to the editor and execute it.

When you highlight a snippet, the AI uses it as a focused context. You can ask for an explanation of that part or request changes to it, such as rewriting a filter or optimizing a subquery.

### What you can ask AI

- Explain what a specific SQL query does in plain language
- Break down complex queries into simpler steps
- Describe how `JOIN` operations combine data from multiple tables
- Clarify the purpose of `WHERE` clauses and filters
- Explain aggregate functions and `GROUP BY` operations
- Rewrite or modify a highlighted part of a query
- Optimize a selected subquery or filter condition

## How AI context works

When you work in the SQL editor, click **Ask AI** for the current statement. PG Studio opens the **AI Assistant** panel, attaches SQL context, and focuses the input. PG Studio sends SQL context in two parts:

- The full active SQL statement for context, including aliases, common table expressions (CTEs), and joins.
- Any highlighted SQL snippet as a separate focus area.

## Explore your schema with AI

1. Ask a schema question in the **AI Assistant** panel, such as how tables relate or what a column stores.
1. Review the response or generated SQL.
1. Click **Open schema map** to browse tables and relationships visually.

## Related pages

- [Write and run queries](/docs/products/postgresql/howto/pg-studio/write-run-queries)
- [Get started with PG Studio](/docs/products/postgresql/howto/pg-studio/get-started)
- [PG Studio overview](/docs/products/postgresql/howto/pg-studio/)
