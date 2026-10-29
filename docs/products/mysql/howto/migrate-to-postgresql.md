---
title: Migrate from Aiven for MySQL® to Aiven for PostgreSQL®
sidebar_label: Migrate to PostgreSQL
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Migrate the schema and data of an Aiven for MySQL® service to an Aiven for PostgreSQL® service using pgloader.

:::note
pgloader is an open source tool that is not maintained or supported by Aiven. Aiven
support cannot troubleshoot pgloader itself. Test the migration on a copy of your data
before you migrate a production database.
:::

MySQL and PostgreSQL differ in data types, identifier handling, and SQL syntax. A
migration converts your schema as well as your data, so plan time to test your
application against PostgreSQL.

## Differences to plan for

pgloader applies a default set of casting rules that cover most MySQL types. Review the
following differences, which often need attention:

- **Automatic primary keys**: MySQL `AUTO_INCREMENT` columns become PostgreSQL
  `serial` or `bigserial` columns backed by sequences.
- **Unsigned integers**: PostgreSQL has no unsigned integer types. pgloader widens
  unsigned columns to a larger signed type.
- **Boolean columns**: MySQL stores booleans as `tinyint(1)`. Convert them with a cast
  rule if your application expects a PostgreSQL `boolean`.
- **Zero dates**: MySQL accepts `0000-00-00`, which PostgreSQL rejects. Convert these
  values to `NULL` with a cast rule.
- **Identifier case**: MySQL identifiers are often mixed case, while PostgreSQL folds
  unquoted identifiers to lowercase. Check queries that quote identifiers.
- **Storage**: table sizes differ between the two engines. Confirm your PostgreSQL plan
  has enough disk storage for the migrated data.

## Prerequisites

- An Aiven for MySQL service with the data to migrate
- An [Aiven for PostgreSQL service](/docs/products/postgresql/get-started) to migrate to
- [pgloader installed](https://pgloader.readthedocs.io/en/latest/install.html)

## Collect connection details

Collect the connection details for both services:

1. In the [Aiven Console](https://console.aiven.io/), go to your Aiven for MySQL service
   page.
1. On the <ConsoleLabel name="overview"/> page, find **Connection information** and note
   the **Host**, **Port**, **User**, **Password**, and **Database** values.
1. Go to your Aiven for PostgreSQL service page and note the same values from its
   **Connection information**.

Both services require a TLS connection, so each connection string includes
`sslmode=require`.

## Migrate the schema and data

Aiven for PostgreSQL creates the `defaultdb` database with the `avnadmin` service user.
The following examples migrate into `defaultdb`.

<Tabs groupId="group1">
<TabItem value="command" label="Single command" default>

To migrate a database with the default casting rules, run:

```bash
pgloader \
  mysql://MYSQL_USER:MYSQL_PASSWORD@MYSQL_HOST:MYSQL_PORT/MYSQL_DATABASE?sslmode=require \
  postgresql://PG_USER:PG_PASSWORD@PG_HOST:PG_PORT/PG_DATABASE?sslmode=require
```

Replace the placeholders with the connection details you collected.

</TabItem>
<TabItem value="file" label="Command file">

To control the conversion, put the migration in a command file. Create a file named
`mysql-to-pg.load` and add the following:

```sql
LOAD DATABASE
     FROM mysql://MYSQL_USER:MYSQL_PASSWORD@MYSQL_HOST:MYSQL_PORT/MYSQL_DATABASE?sslmode=require
     INTO postgresql://PG_USER:PG_PASSWORD@PG_HOST:PG_PORT/PG_DATABASE?sslmode=require

  WITH create tables, create indexes, reset sequences

  CAST type date drop not null drop default using zero-dates-to-null,
       type tinyint to boolean using tinyint-to-boolean;
```

Replace the placeholders with the connection details you collected, then run:

```bash
pgloader mysql-to-pg.load
```

Remove the `tinyint to boolean` cast if your application reads those columns as
integers.

</TabItem>
</Tabs>

pgloader prints a summary of the tables it migrated, the rows it loaded, and any errors
it found.

## Verify the migration

Compare the two databases before you switch your application over:

1. Check the pgloader summary for failed rows or skipped tables.
1. Compare row counts for each table in the source and target databases.
1. Run your application's main queries against PostgreSQL and fix any syntax that
   depends on MySQL behavior.

After you confirm the data and your application work against PostgreSQL, update your
application's connection details to the Aiven for PostgreSQL service.

<RelatedPages/>

- [Aiven for MySQL® free tier: migration options](/docs/products/mysql/howto/mysql-free-tier-migration-options)
- [Get started with Aiven for PostgreSQL®](/docs/products/postgresql/get-started)
- [Aiven for PostgreSQL® free tier](/docs/products/postgresql/concepts/pg-free-tier)
- [Backup and restore Aiven for MySQL® with mysqldump or mydumper](/docs/products/mysql/howto/migrate-database-mysqldump)
