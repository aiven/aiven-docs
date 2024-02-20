---
title: Get started with Aiven for PostgreSQL®
sidebar_label: Get started
---

Start using Aiven for PostgreSQL® by creating a service, connecting to it, and loading sample data.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- [psql](https://www.postgresql.org/download/) command line tool installed on your
  computer

## Create a service

[Create an Aiven for PostgreSQL® service](/docs/platform/howto/create_new_service)  in the
[Aiven Console](https://console.aiven.io).

## Connect to the new service

:::tip
Check different tools you can use to connect to Aiven for PostgreSQL in
[Connect to Aiven for PostgreSQL](/docs/products/postgresql/howto/list-code-samples).
:::

[Connect to your new service](/docs/products/postgresql/howto/connect-psql) with, for
example, [psql](https://www.postgresql.org/download/) CLI tool.

## Load a test dataset

If you're checking out PostgreSQL, loading a test dataset will give you
something to look at. This example uses `dellstore2`, a standard store
dataset with products, orders, inventory and customer information.

1.  Download the `dellstore2-normal-1.0.tar.gz` file from the
    [PostgreSQL
    website](https://www.postgresql.org/ftp/projects/pgFoundry/dbsamples/dellstore2/dellstore2-normal-1.0/)
    and unzip it.

1.  Navigate to the `dellstore2-normal-1.0` folder on your terminal.

1.  Connect to your PostgreSQL instance with `psql` as shown above.

1.  Create a `dellstore` database and connect to it with the following
    command from `psql`:

    ```sql
    CREATE DATABASE dellstore;
    \c dellstore
    ```

    :::tip
    Your `psql` terminal prefix will change to `dellstore==>` when you
    are connected to the correct database.
    :::

1.  Populate the database by executing the following command from
    `psql`:

    ```sql
    \i dellstore2-normal-1.0.sql
    ```

1.  Verify which objects have been created from `psql`:

    ```sql
    \d
    ```

The output should look like this:

```sql
List of relations
Schema |           Name           |   Type   |  Owner
--------+--------------------------+----------+----------
public | categories               | table    | avnadmin
public | categories_category_seq  | sequence | avnadmin
public | cust_hist                | table    | avnadmin
public | customers                | table    | avnadmin
public | customers_customerid_seq | sequence | avnadmin
public | inventory                | table    | avnadmin
public | orderlines               | table    | avnadmin
public | orders                   | table    | avnadmin
public | orders_orderid_seq       | sequence | avnadmin
public | products                 | table    | avnadmin
public | products_prod_id_seq     | sequence | avnadmin
public | reorder                  | table    | avnadmin
(12 rows)
```

## Related pages

- [Code examples for connecting to PostgreSQL from your application](/docs/products/postgresql/howto/list-code-samples)
- How to [use PgAdmin](howto/connect-pgadmin) with Aiven for PostgreSQL
- How to [migrate your PostgreSQL to Aiven](concepts/aiven-db-migrate)
- Learn PostgreSQL with [PostgreSQL Exercises](https://pgexercises.com/)
- [awesome-postgres ecosystem](https://github.com/dhamaniasad/awesome-postgres) of tools
  and solutions
