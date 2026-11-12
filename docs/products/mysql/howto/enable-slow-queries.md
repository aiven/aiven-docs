---
title: Enable slow query logging for Aiven for MySQL®
sidebar_label: Slow query logging
---

import RelatedPages from "@site/src/components/RelatedPages";

You can identify inefficient or time-consuming queries by enabling [slow query log](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html) in your Aiven for MySQL® service.

:::warning
Since the output of the slow query log is written to the
`mysql.slow_log` table on a particular server (of the service or its
replica), the slow query logging is not supported on read-only replicas,
which don't allow any writes.
:::

## Prerequisites

You need an Aiven organization with an Aiven for MySQL service running.

## Configure slow queries in Aiven Console

Enable your slow queries in your Aiven for MySQL service via
[Aiven Console](https://console.aiven.io/):

1.  Log in to [Aiven Console](https://console.aiven.io/).
1.  In the **Services** page, select your Aiven for MySQL service.
1.  In the **Service settings** page of your service, scroll down to the
    **Advanced configuration** section and select **Configure**.
1.  In the **Advanced configuration** window
    1.  Select **Add configuration options**. From the unfolded list,
        choose `mysql.slow_query_log`. Enable `mysql.slow_query_log` by
        toggling it to `On`. By default, `mysql.slow_query_log` is
        disabled.
    1.  Select **Add configuration options**. From the unfolded list,
        choose `mysql.long_query_time`. Set `mysql.long_query_time`
        according to your specific need.
    1.  Select **Save configuration**.

Your Aiven for MySQL service can now log slow queries. To
simulate slow queries to check this feature, check the next section.

## Simulate slow queries

Connect to your Aiven for MySQL using your favorite tool. Make sure you
have `mysql.slow_query_log` enabled and set `mysql.long_query_time` to
`2` seconds. Now, you can run the following query to simulate a slow
query of 3 seconds.

```shell
select sleep(3);
```

You should see the following output:

```shell
+----------+
| sleep(3) |
+----------+
| 0        |
+----------+
1 row in set (3.03 sec)
```

Now, you can check the logs of your slow query:

```shell
select convert(sql_text using utf8) as slow_query, query_time from mysql.slow_log;
```

You can expect to receive an output similar to the following:

```shell
+-----------------+-----------------+
| slow_query      | query_time      |
+-----------------+-----------------+
| select sleep(3) | 00:00:03.000450 |
+-----------------+-----------------+
1 row in set, 1 warning (0.03 sec)
```

## Retention and cleanup

Slow query entries are stored in the `mysql.slow_log` table, which is part of your
service's own data. Entries stay in that table until they are removed, so you control how
much slow query history your service holds.

To clear the stored entries, set `mysql.slow_query_log` to `Off`, which truncates the
`mysql.slow_log` table.

:::warning
Truncating the table removes every stored slow query entry. Back up the data you still
need before you turn the setting off.
:::

### Slow query data and the AI database optimizer

The [AI database optimizer](/docs/products/mysql/howto/ai-insights) reads your slow query
log to produce optimization suggestions. It works from schema structure and database
statistics, without credentials or access to the data in your databases.

Data masking replaces sensitive parameters in your queries with question marks (`?`)
before the queries are analyzed. Data masking is enabled by default.

To stop collecting new slow query data for your service, set `mysql.slow_query_log` to
`Off`.

<RelatedPages/>

- [AI database optimizer for Aiven for MySQL®](/docs/products/mysql/howto/ai-insights)
- [SQL query optimizer for Aiven for MySQL®](/docs/products/mysql/howto/query-optimizer)
- [Identify and fix long-running queries](/docs/products/mysql/howto/mysql-long-running-queries)
- [Understand Aiven for MySQL® backups](/docs/products/mysql/concepts/mysql-backups)
