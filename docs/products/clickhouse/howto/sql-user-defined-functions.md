---
title: Use SQL user defined functions in Aiven for ClickHouse®
sidebar_label: SQL UDFs
---

Use SQL user defined functions (UDFs) in Aiven for ClickHouse® to speed up your queries
and optimize your appilication performance.

## About SQL UDFs

An SQL UDF is a function that your write to achieve your specific goals. It is executed by
the database software in the database. An SQL UDF accepts input, performs actions on the
input, and returns results of the actions as output. An SQL UDF can be reused across
multiple queries.

:::note
[Executable user defined functions](https://clickhouse.com/docs/en/sql-reference/functions/udf#executable-user-defined-functions)
are not supported in Aiven for ClickHouse.
:::

## Why use SQL UDFs

SQL UDFs allows you to:

- Improve application performance by optimization on the database level.
- Speed up your SQL queries, make them simpler, shorter, and more efficient.
- Reduce maintenance work on your SQL queries: When you update an SQL UDF, your changes
  are propagated to all SQL queries using this UDF.

## Create UDF in SQL

To create an SQL UDF in Aiven for ClickHouse, run the `CREATE FUNCTION` expression
including function parameters, constants, operators, or other function calls.

```sql
CREATE FUNCTION name AS (parameter0, ...) -> expression
```

## Limitations

- Name of your UDF needs to be unique among other functions.
- Recursive functions are not supported.
- All variables used by your UDF need to be defined in its parameter list.

## Examples of using SQL UDFs
