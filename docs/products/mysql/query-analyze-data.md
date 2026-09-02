---
title: Query and analyze data in Aiven for MySQL®
sidebar_label: Query and analyze data
---

import RelatedPages from "@site/src/components/RelatedPages";

Create databases and tables, tune queries, and use AI-powered tools to work with data in your Aiven for MySQL® service.

## How data management fits together

[Primary key requirements](/docs/products/mysql/howto/create-tables-without-primary-keys)
and [foreign key checks](/docs/products/mysql/howto/disable-foreign-key-checks) are both
schema-level defaults that you can turn off for a single session, rather than changing
the setting for the whole service. Slow query logging and the
[AI database optimizer](/docs/products/mysql/howto/ai-insights) also read from the same
underlying log destination setting, so turning one on doesn't require a separate,
unrelated step to turn on the other.

## Things to know

- **The requirement isn't retroactive**: `mysql.sql_require_primary_key` blocks you
  from creating a new table without a primary key, but tables that existed before you
  turned it on can still be missing one.
  [Add a primary key to a table that predates the
  requirement](/docs/products/mysql/howto/create-missing-primary-keys) rather than
  assuming the setting already covers it.
- **Choose where slow query data lands**: the `mysql.log_output` parameter decides the
  destination. Set it to `TABLE` for the `mysql.slow_log` table, `INSIGHTS` for the AI
  database optimizer, or `INSIGHTS,TABLE` to send data to both at once.
- **Cap execution time proactively**: instead of relying only on manually stopping a
  [long-running query](/docs/products/mysql/howto/mysql-long-running-queries), you can
  set `mysql.max_execution_time` in the
  [advanced parameters](/docs/products/mysql/reference/advanced-params) so read-only
  `SELECT` statements stop automatically once they run too long.

<RelatedPages/>

- [Create missing primary keys](/docs/products/mysql/howto/create-missing-primary-keys)
- [Enable slow query logging](/docs/products/mysql/howto/enable-slow-queries)
- [Detect and terminate long-running queries in Aiven for
  MySQL®](/docs/products/mysql/howto/mysql-long-running-queries)
- [Disable foreign key checks](/docs/products/mysql/howto/disable-foreign-key-checks)
