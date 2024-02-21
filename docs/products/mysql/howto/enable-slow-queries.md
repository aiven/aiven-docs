---
title: Enable slow query logging
---

You can identify inefficient or time-consuming queries by enabling [slow
query log](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html)
in your Aiven for MySQL® service. In this article, you'll find out how
to enable slow queries in your Aiven for MySQL service.

:::warning
Since the output of the slow query log is written to the
`mysql.slow_log` table on a particular server (of the service or its
replica), the slow query logging is not supported on read-only replicas,
which don't allow any writes.
:::

## Prerequisites

You need an Aiven organization with an Aiven for MySQL service running.

## Configure slow queries in Aiven Console

Follow these steps to enable your slow queries in your Aiven for MySQL
service via [Aiven Console](https://console.aiven.io/):

1.  Log in to [Aiven Console](https://console.aiven.io/).
2.  In the **Services** page, select your Aiven for MySQL service.
3.  In the **Service settings** page of your service, scroll down to the
    **Advanced configuration** section and select **Configure**.
4.  In the **Advanced configuration** window
    1.  Select **Add configuration options**. From the unfolded list,
        choose `mysql.slow_query_log`. Enable `mysql.slow_query_log` by
        toggling it to `On`. By default, `mysql.slow_query_log` is
        disabled.
    2.  Select **Add configuration options**. From the unfolded list,
        choose `mysql.long_query_time`. Set `mysql.long_query_time`
        according to your specific need.
    3.  Select **Save configuration**.

Your Aiven for MySQL service can now log slow queries. If you want to
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

:::warning
Disabling the `mysql.slow_query_log` setting truncates the
`mysql.slow_query_log` table. Make sure to back up the data from the
`mysql.slow_query_log` table in case you need it for further analysis.
:::
