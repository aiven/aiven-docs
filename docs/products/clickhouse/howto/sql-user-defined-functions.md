---
title: Use SQL user defined functions in Aiven for ClickHouse®
sidebar_label: SQL UDFs
---

Use SQL user defined functions (UDFs) in Aiven for ClickHouse® to speed up your quwries
and optimize your appilication performance.

## About SQL UDFs

## Why use SQL UDFs

SQL UDFs allows you to:

- Improve application performance by optimization on the database level.
- Speed up your SQL queries, make them simpler, shorter, and more efficinet.
- Reduce maintenance work on your SQL queries (when you update an SQL UDF, your changes
  are propagated to all SQL queries using this UDF).

## How to use SQL UDFs

To use an SQL UDF in Aiven for ClickHouse, run the `CREATE FUNCTION` expression consisting
of function parameters, constants, operators, or other function calls.

```sql
CREATE FUNCTION name AS (parameter0, ...) -> expression
```

## Limitations

- Name of your UDF needs to be unique among other functions.
- Recursive functions are not supported.
- All variables used by your UDF needs to be defined in its parameter list.

## SQL UDF examples
