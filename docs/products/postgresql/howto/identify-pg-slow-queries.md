---
title: Identify PostgreSQL® slow queries with pg_stat_statements
sidebar_label: Identify slow queries
---

Use the PostgreSQL® `pg_stat_statements` [extension](https://www.postgresql.org/docs/current/pgstatstatements.html) to find slow queries.

## Identify slow queries in the Console

Use **Aiven AI Database Optimizer** to list and optimize slow queries.
[Learn more](/docs/products/postgresql/howto/optimize-pg-slow-queries).

## Use `pg_stat_statements`

Query statistics deduced via the `pg_stat_statements` are the following:

| Column Type   | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| `Query`       | Text of a representative statement                                  |
| `Rows`        | Total number of rows retrieved or affected by the statement         |
| `Calls`       | Number of times the statement was executed                          |
| `Min (ms)`    | Minimum time spent executing the statement                          |
| `Max (ms)`    | Maximum time spent executing the statement                          |
| `Mean (ms)`   | Mean time spent executing the statement                             |
| `Stddev (ms)` | Population standard deviation of time spent executing the statement |
| `Total (ms)`  | Total time spent executing the statement                            |

You can also create custom queries using the `pg_stat_statements` view
and use
all the [available columns](https://www.postgresql.org/docs/current/pgstatstatements.html)
to investigate your use case.

## Prerequisites

To query the `pg_stat_statements` view, create the `pg_stat_statements` extension
(included in the
[list of available extensions](/docs/products/postgresql/reference/list-of-extensions)):

```bash
CREATE EXTENSION pg_stat_statements;
```

## Discover slow queries

Display the `pg_stat_statements` view and all the columns contained:

```shell
\d pg_stat_statements;
```

For PostgreSQL 13, expect to recevice the following output:

```text
View "public.pg_stat_statements"
Column              |       Type       | Collation | Nullable | Default
--------------------+------------------+-----------+----------+---------
userid              | oid              |           |          |
dbid                | oid              |           |          |
toplevel            | boolean          |           |          |
queryid             | bigint           |           |          |
query               | text             |           |          |
plans               | bigint           |           |          |
total_plan_time     | double precision |           |          |
min_plan_time       | double precision |           |          |
max_plan_time       | double precision |           |          |
mean_plan_time      | double precision |           |          |
stddev_plan_time    | double precision |           |          |
calls               | bigint           |           |          |
total_exec_time     | double precision |           |          |
min_exec_time       | double precision |           |          |
max_exec_time       | double precision |           |          |
mean_exec_time      | double precision |           |          |
stddev_exec_time    | double precision |           |          |
rows                | bigint           |           |          |
shared_blks_hit     | bigint           |           |          |
shared_blks_read    | bigint           |           |          |
shared_blks_dirtied | bigint           |           |          |
shared_blks_written | bigint           |           |          |
local_blks_hit      | bigint           |           |          |
local_blks_read     | bigint           |           |          |
local_blks_dirtied  | bigint           |           |          |
local_blks_written  | bigint           |           |          |
temp_blks_read      | bigint           |           |          |
temp_blks_written   | bigint           |           |          |
blk_read_time       | double precision |           |          |
blk_write_time      | double precision |           |          |
wal_records         | bigint           |           |          |
wal_fpi             | bigint           |           |          |
wal_bytes           | numeric          |           |          |
```

On older PostgreSQL versions, you might find different column names (for example,
the column previously named `max_time` is now `max_exec_time`). Always
refer to the [PostgreSQL® official
documentation](https://www.postgresql.org/docs/current/pgstatstatements.html)
with the version you are using for accurate column matching.

:::tip
You can write custom queries to `pg_stat_statements` to help you analyze
recently run queries in your database.
:::

## Sort database queries based on `total_exec_time`

The following query, inspired by a
[GitHub repository](https://github.com/heroku/heroku-pg-extras/blob/ece431777dd34ff6c2a8dfb790b24db99f114165/commands/outliers.js),
uses the `pg_stat_statements` view, shows the running queries sorted descending by
`total_exec_time`, re-formats the `calls` column, and deduces the `prop_exec_time` and
`sync_io_time`:

```sql
SELECT interval '1 millisecond' * total_exec_time AS total_exec_time,
    to_char((total_exec_time/sum(total_exec_time) OVER()) * 100, 'FM90D0') || '%'  AS prop_exec_time,
    to_char(calls, 'FM999G999G999G990') AS calls,
    interval '1 millisecond' * (blk_read_time + blk_write_time) AS sync_io_time,
    query AS query
FROM pg_stat_statements
WHERE userid =
    (
        SELECT usesysid
        FROM pg_user
        WHERE usename = current_user
        LIMIT 1
    )
ORDER BY total_exec_time DESC
LIMIT 10;
```

Run the above commands on your own PostgreSQL® to gather more information about how the
recent queries are performing.

:::tip
To discard the `pg_stat_statements` previously gathered statistics, run

```sql
SELECT pg_stat_statements_reset()
```

:::

## Find top queries with high I/O activity

The following SQL shows queries with their `id` and mean time in
seconds. The result set is ordered based on the sum of `blk_read_time`
and `blk_write_time` so that queries with the highest read/write
are shown at the top.

```sql
SELECT userid::regrole,
    dbid,
    query,
    queryid,
    mean_time/1000 as mean_time_seconds
FROM pg_stat_statements
ORDER by (blk_read_time+blk_write_time) DESC
LIMIT 10;
```

## See top time-consuming queries

Aside from relevant information about the database, the following SQL
retrieves

- Number of calls
- Consumption time as `total_time_seconds` (in milliseconds)
- Minimum time (in milliseconds)
- Maximum time (in milliseconds)
- Mean times (in milliseconds)
The result set is ordered in descending order by `mean_time`, showing the queries with
the longest consumption time first.

```sql
SELECT userid::regrole,
    dbid,
    query,
    calls,
    total_time/1000 as total_time_seconds,
    min_time/1000 as min_time_seconds,
    max_time/1000 as max_time_seconds,
    mean_time/1000 as mean_time_seconds
FROM pg_stat_statements
ORDER by mean_time desc
LIMIT 10;
```

## Check queries with high memory usage

The following SQL retrieves the query, its `id`, and relevant
information about the database. The result set is ordered
by showing the queries with the highest memory usage at the top, summing
the number of shared memory blocks returned from the cache
(`shared_blks_hit`) and the number of shared memory blocks marked as
\"dirty\" during a request needed to be written to the disk (`shared_blks_dirtied`).

```sql
SELECT userid::regrole,
    dbid,
    queryid,
    query
FROM pg_stat_statements
ORDER by (shared_blks_hit+shared_blks_dirtied) DESC limit 10;
```

## Next steps

Once you have identified slow queries:

- Inspect the query plan and execution using
  [EXPLAIN ANALYZE](https://www.postgresql.org/docs/current/using-explain.html) to
  understand how to optimise your design to improve the performance.
- [Optimize slow PostgreSQL® queries](/docs/products/postgresql/howto/optimize-pg-slow-queries).
