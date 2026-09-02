---
title: Query and analyze data in Aiven for MySQL®
sidebar_label: Query and analyze data
---

import RelatedPages from "@site/src/components/RelatedPages";

Create databases and tables, tune queries, and use AI-powered tools to work with data in your Aiven for MySQL® service.

## How data management fits together

Schema design, query performance, and data integrity settings interact with each other in
Aiven for MySQL. New tables need a primary key by default, because MySQL replication
depends on primary keys to apply row level changes efficiently. Query performance tools,
such as slow query logging and the AI database optimizer, read from the same underlying
log output setting, so you can turn on one, the other, or both at the same time.

## Things to know

- **Primary keys**: services created after 2020-06-03 require a primary key on new
  tables by default, controlled by the `mysql.sql_require_primary_key` parameter. Add a
  primary key even if you turn off the requirement temporarily, since large tables
  without one can break replication and other capabilities.
- **Slow query logging and the AI database optimizer share a setting**: the
  `mysql.log_output` parameter controls where slow query data goes. Set it to `TABLE` to
  log to the `mysql.slow_log` table, `INSIGHTS` to send data to the AI database
  optimizer, or `INSIGHTS,TABLE` to use both at the same time.
- **Long-running queries**: Aiven never terminates a query automatically, even if it
  runs indefinitely. Terminate one manually from the console or with `KILL QUERY`, or set
  `mysql.max_execution_time` to cap how many milliseconds a read-only `SELECT` statement
  can run before it's stopped.
- **Foreign key checks**: enabled by default on every service to keep referential
  integrity across tables. Disable them for a single session, for example during a data
  migration, then re-enable them once you're done.

<RelatedPages/>

- [Create Aiven for MySQL® databases](/docs/products/mysql/howto/create-database)
- [Create new tables without primary
  keys](/docs/products/mysql/howto/create-tables-without-primary-keys)
- [Create missing primary keys](/docs/products/mysql/howto/create-missing-primary-keys)
- [Detect and terminate long-running queries in Aiven for
  MySQL®](/docs/products/mysql/howto/mysql-long-running-queries)
- [Enable slow query logging](/docs/products/mysql/howto/enable-slow-queries)
- [AI database optimizer for Aiven for MySQL®](/docs/products/mysql/howto/ai-insights)
- [Disable foreign key checks](/docs/products/mysql/howto/disable-foreign-key-checks)
