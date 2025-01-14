---
title: Standalone SQL query optimizer
early: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import FAQ from "@site/static/includes/faq-ai.md"

Use Aiven's AI-powered **SQL query optimizer** for PostgreSQL® and MySQL® to get query optimization recomendations for an ad-hoc query.

:::important
If you are running a PostgreSQL or MySQL service, Aiven automatically suggests optimizations for
slow queries from the <ConsoleLabel name="aiinsights"/> menu entry.

Also see [AI Database Optimizer for PG][optimizePG] and [AI Database Optimizer for MySQL][optimizeMySQL].
:::

To optimize a query:

1. Click **Tools** > **SQL query optimizer**.
1. Click **Optimize a query**.
1. Select your database type and version.
1. Paste your query and click **Next**.
1. Optional:
   1. Provide your table structure and statistics by running the query provided in
      the UI.
   1. Paste it in the **Query output** field.
1. Click **Optimize**.

The optimization report shows the optimized query and potential optimal indexes.
To learn more about the recommendations, click **Optimization details**.

<details>
  <summary>Frequently asked questions</summary>
  <FAQ/>
</details>

## Related pages

- [Optimizing queries in Aiven for PostgreSQL®][optimizePG]
- [Optimizing queries in Aiven for MySQL®][optimizeMySQL]

[optimizePG]: /docs/products/postgresql/howto/ai-insights
[optimizeMySQL]: /docs/products/mysql/howto/ai-insights
