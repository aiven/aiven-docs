---
title: Check the size of a database, a table or an index
---

PostgreSQL® offers different commands and functions to get disk space usage for a database, a table, or an index.

## Get the size of a database

Retrieve the database size using either:

- The `\l+ [ pattern ]` command
- The the `pg_database_size` function.

```bash title="Using the \l+ [ pattern ] command"
testdb2=> \l+
                                                                 List of databases   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   |   Size    | Tablespace |            Description
-----------+----------+----------+-------------+-------------+-----------------------+-----------+------------+------------------------------------
 _aiven    | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =T/postgres          +| No Access | pg_default |
...
 testdb2   | avnadmin | UTF8     | en_US.UTF-8 | en_US.UTF-8 |                       | 66 MB     | pg_default |
(6 rows)

testdb2=> \l+ testdb2
                                                List of databases
  Name   |  Owner   | Encoding |   Collate   |    Ctype    | Access privileges | Size  | Tablespace | Description
---------+----------+----------+-------------+-------------+-------------------+-------+------------+-------------
 testdb2 | avnadmin | UTF8     | en_US.UTF-8 | en_US.UTF-8 |                   | 66 MB | pg_default |
(1 row)h
```

```bash title="Using the pg_database_size function"
testdb2=> select pg_database_size('testdb2');

 pg_database_size
------------------
         68895523
(1 row)

testdb2=> select pg_size_pretty(pg_database_size('testdb2'));

 pg_size_pretty
----------------
 66 MB
(1 row)
```

:::tip[Compare the outputs of the \l+ DB_NAME command and the `pg_database_size` function]
The outputs for the testdb2 database size are the same for both methods. Since
the `pg_database_size` function returns the database size in bytes, we use the
`pg_size_pretty` function to retrieve an easy-to-read output.
:::

## Get the size of a table

To get the table size, you can use either the `\dt+ [ pattern ]` command or the `pg_table_size` function.

```bash title="Using the \dt+ [ pattern ] command"
testdb2=> \dt+ mytable1
                                       List of relations
   Schema    |   Name   | Type  |  Owner   | Persistence | Access method | Size  | Description
-------------+----------+-------+----------+-------------+---------------+-------+-------------
 test_schema | mytable1 | table | myowner  | permanent   | heap          | 14 MB |
(1 row)
```

```bash title="Use the pg_table_size function"
testdb2=> select pg_size_pretty(pg_table_size('mytable1'));
 pg_size_pretty
----------------
 14 MB
(1 row)
```

## Get the size of a table and its indices

To get disk space usage for a table and its indexes, you can use the
`pg_total_relation_size` function, which computes the total disk space used by the
table, all its indices, and TOAST data:

```bash
testdb2=> select pg_size_pretty(pg_total_relation_size('mytable1'));
 pg_size_pretty
----------------
 15 MB
(1 row)
```

:::warning
It is not recommended to use the `pg_relation_size` function as it computes the disk
space used by only one fork of the relation.

To get the total size of all the relation's forks, use higher-level
functions like `pg_total_relation_size` or `pg_table_size`.
:::

:::tip
WAL files also contribute to the service disk usage. For more
information, see
[About PostgreSQL® disk usage](/docs/products/postgresql/concepts/pg-disk-usage)
:::

## Related pages

- [PostgreSQL interactive terminal](https://www.postgresql.org/docs/15/app-psql.html)
- [Database Object Management Functions](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADMIN-DBOBJECT)
