---
title: Use SQL user defined functions in Aiven for ClickHouse®
sidebar_label: SQL UDFs
---

Use SQL user defined functions (UDFs) in Aiven for ClickHouse® to speed up your queries
and optimize your appilication performance.

You can define your own SQL UDFs, which are automatically replicated to all nodes in
the cluster and contained in backups.

:::note
Aiven for ClickHouse supports SQL UDFs only. UDF types other than SQL UDFs, such as
[executable UDFs](https://clickhouse.com/docs/en/sql-reference/functions/udf#executable-user-defined-functions),
are not supported in Aiven for ClickHouse.
:::

## Create a UDF in SQL

To create an SQL UDF in Aiven for ClickHouse, run the `CREATE FUNCTION` expression
including function parameters, constants, operators, or other function calls.

```sql
CREATE FUNCTION name AS (parameter0, ...) -> expression
```

## Limitations

- The name of your UDF needs to be unique among other functions.
- Recursive functions are not supported.
- All variables used by your UDF need to be defined in its parameter list.

## Example of using SQL UDFs

1. Create an SQL UDF.

    ```sql
    CREATE FUNCTION is_weekend AS (date) -> toDayOfWeek(date) IN (6, 7);
    ```

1. Use your `is_weekend` SQL UDF in a `SELECT` query.

    ```sql
    SELECT AVG(profit)
    FROM sales
    WHERE is_weekend(date)
    ```
