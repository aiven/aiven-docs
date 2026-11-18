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

## Choose where slow queries are logged

When `mysql.slow_query_log` is on, `mysql.log_output` sets where slow query entries go:

| `mysql.log_output` | Destination                                                     |
| ------------------ | --------------------------------------------------------------- |
| `INSIGHTS`         | The AI database optimizer                                       |
| `TABLE`            | The `mysql.slow_log` table on your service                      |
| `INSIGHTS,TABLE`   | Both the AI database optimizer and the `mysql.slow_log` table   |
| `NONE`             | No destination: slow queries are not logged                     |

New services are created with `mysql.slow_query_log` on and `mysql.log_output` set to
`INSIGHTS`. Services that have no `mysql.log_output` value use `TABLE`.

## Configure slow queries in Aiven Console

Enable your slow queries in your Aiven for MySQL service via
[Aiven Console](https://console.aiven.io/):

1.  Log in to [Aiven Console](https://console.aiven.io/).
1.  In the **Services** page, select your Aiven for MySQL service.
1.  In the **Service settings** page of your service, scroll down to the
    **Advanced configuration** section and select **Configure**.
1.  In the **Advanced configuration** window
    1.  Select **Add configuration options**. From the unfolded list,
        choose `mysql.slow_query_log`, and set it to `On` if it isn't already.
    1.  Select **Add configuration options**. From the unfolded list,
        choose `mysql.log_output`, and set the destination you want. To query slow
        queries in the `mysql.slow_log` table, choose `TABLE` or `INSIGHTS,TABLE`.
    1.  Select **Add configuration options**. From the unfolded list,
        choose `mysql.long_query_time`. Set `mysql.long_query_time`
        according to your specific need.
    1.  Select **Save configuration**.

Your Aiven for MySQL service can now log slow queries. To
simulate slow queries to check this feature, check the next section.

## Simulate slow queries

Connect to your Aiven for MySQL using your favorite tool. Make sure you
have `mysql.slow_query_log` enabled, `mysql.log_output` includes `TABLE`, and
`mysql.long_query_time` is set to `2` seconds. Now, you can run the following query to
simulate a slow query of 3 seconds.

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

### The mysql.slow_log table

When `mysql.log_output` includes `TABLE`, slow query entries are stored in the
`mysql.slow_log` table, on your service's disk. Aiven doesn't clean the table
automatically, so entries stay until they are removed. A low `mysql.long_query_time`
logs more statements and uses more disk space. See
[Prevent a full disk](/docs/products/mysql/howto/prevent-disk-full).

The table is emptied when you:

- Set `mysql.slow_query_log` to `Off`.
- Change `mysql.log_output` to a value without `TABLE`, for example from
  `INSIGHTS,TABLE` to `INSIGHTS`.

:::warning
Emptying the table removes every stored slow query entry. Back up the data you still
need before you change either setting.
:::

### The AI database optimizer

When `mysql.log_output` includes `INSIGHTS`, slow queries are sent to the
[AI database optimizer](/docs/products/mysql/howto/ai-insights), separately from the
`mysql.slow_log` table. The optimizer works from schema structure and database
statistics, without credentials or access to the data in your databases.

For each slow query, Aiven stores a normalized query fingerprint, the query duration, and
the database name. Fingerprints contain no literal values, which Aiven replaces with
question marks (`?`). Aiven doesn't store the raw query text.

No fixed retention period is currently applied to this data. It is kept from when
collection starts for your service.

To stop sending slow queries to the optimizer and keep logging to the table, set
`mysql.log_output` to `TABLE`. To stop slow query logging entirely, set
`mysql.slow_query_log` to `Off`, which also empties the `mysql.slow_log` table. Either
way, slow query data that the optimizer already collected is not deleted.

To delete the slow query data that the optimizer collected for your service,
[open a support ticket](/docs/platform/howto/support#create-a-support-ticket). Deleting
the service doesn't delete this data.

<RelatedPages/>

- [AI database optimizer for Aiven for MySQL®](/docs/products/mysql/howto/ai-insights)
- [SQL query optimizer for Aiven for MySQL®](/docs/products/mysql/howto/query-optimizer)
- [Identify and fix long-running queries](/docs/products/mysql/howto/mysql-long-running-queries)
- [Understand Aiven for MySQL® backups](/docs/products/mysql/concepts/mysql-backups)
