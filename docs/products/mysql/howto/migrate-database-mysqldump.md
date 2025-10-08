---
title: Backup and restore Aiven for MySQL® with mysqldump or mydumper
sidebar_label: Backup and restore
---

import MysqlMigrationFreeze from "@site/static/includes/mysql-migration-freeze.md";
import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Copy your Aiven for MySQL® data to a file, back it up to another Aiven for MySQL database, and restore it using [`mysqldump/restore`](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) or [`mydumper/myloader`](https://github.com/mydumper/mydumper).

:::note[mydumper/myloader]
`mydumper/myloader` is an
[early availability feature](/docs/platform/concepts/service-and-feature-releases) that
provides faster migration and reduced downtime for large databases, preventing
performance bottlenecks that `mysqldump` can cause on the same.
:::

## Prerequisites

<Tabs groupId="group1">
<TabItem value="1" label="mysqldump/restore" default>

- [`mysqldump` tool](https://dev.mysql.com/doc/refman/8.4/en/mysqldump.html):
  [install](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install.html) if
  missing
- Source database to copy your data from: `source-db`
- Target database to dump your `source-db` data to: `target-db`

</TabItem>
<TabItem value="2" label="mydumper/myloader">

<EarlyBadge/>

<br />
<br />

- Service configuration with significant computational power (multiple vCPUs) and
  high memory capacity to avoid the resource exhaustion during migration
- [`mydumper` tool](https://github.com/mydumper/mydumper):
  [install](https://mydumper.github.io/mydumper/docs/html/installing.html) if missing
- Source database to copy your data from: `source-db`
- Target database to dump your `source-db` data to: `target-db`

</TabItem>
</Tabs>

:::tip
For the restore or load process, pick a plan size that is large
enough to store your data, so you can limit the downtime if you're
performing a migration.
:::

You can use Aiven for MySQL databases both as `source-db` and as `target-db`.
[Create additional Aiven for MySQL® databases](/docs/products/mysql/howto/create-database)
as needed.

<MysqlMigrationFreeze/>

## Back up the data

<Tabs groupId="group1">
<TabItem value="1" label="mysqldump" default>

### Collect connection details

To backup the `source-db` data to the `mydb_backup.sql` file, collect
connection details on your Aiven for MySQL `source-db` service:

1. Log in to the [Aiven Console](https://console.aiven.io/) and go to your `source-db`
   service page.
1. On the <ConsoleLabel name="overview"/> page, find **Connection information** and note
   the following:

    | Variable             | Description                                 |
    | -------------------- | ------------------------------------------- |
    | `SOURCE_DB_HOST`     | **Host** name for the connection            |
    | `SOURCE_DB_USER`     | **User** name for the connection            |
    | `SOURCE_DB_PORT`     | Connection **Port** number                  |
    | `SOURCE_DB_PASSWORD` | Connection **Password**                     |
    | `DEFAULTDB`          | Database that contains the `source-db` data |

### Back up to a file

Use the following command to back up your Aiven for MySQL data to the `mydb_backup.sql`
file:

```bash
mysqldump \
-p DEFAULTDB -P SOURCE_DB_PORT \
-h SOURCE_DB_HOST --single-transaction \
-u SOURCE_DB_USER --set-gtid-purged=OFF \
--password > mydb_backup.sql
```

With this command, the password will be requested at the prompt; paste
`SOURCE_DB_PASSWORD` to the terminal, then a file named
`mydb_backup.sql` will be created with your backup data. Note that
having the prompt request for the password is more secure than including
the password straight away in the command.

The `--single-transaction`
[flag](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html#option_mysqldump_single-transaction)
starts a transaction in isolation mode `REPEATABLE READ` before running.
This allows `mysqldump` to read the database in its current state at the
time of the transaction, ensuring consistency of the data.

:::warning
If you are using [Global Transaction
Identifiers](https://dev.mysql.com/doc/refman/5.7/en/replication-gtids-concepts.html)
(GTIDs) with InnoDB use the `--set-gtid-purged=OFF`
[option](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html#option_mysqldump_set-gtid-purged).
The reason is that GTID's are not available with MyISAM.
:::

</TabItem>
<TabItem value="2" label="mydumper">

<EarlyBadge/>

<br />
<br />

### Collect connection details

To backup the `source-db` data to the `mydb_backup_dir` directory, collect
connection details on your Aiven for MySQL `source-db` service:

1. Log in to the [Aiven Console](https://console.aiven.io/) and go to your `source-db`
   service page.
1. On the <ConsoleLabel name="overview"/> page, find **Connection information** and note
   the following:

    | Variable             | Description                                 |
    | -------------------- | ------------------------------------------- |
    | `SOURCE_DB_HOST`     | **Host** name for the connection            |
    | `SOURCE_DB_USER`     | **User** name for the connection            |
    | `SOURCE_DB_PORT`     | Connection **Port** number                  |
    | `SOURCE_DB_PASSWORD` | Connection **Password**                     |
    | `DEFAULTDB`          | Database that contains the `source-db` data |

### Back up to a directory

To back up your data with `mydumper`, run:

```bash
mydumper \
--host SOURCE_DB_HOST \
--user SOURCE_DB_USER \
--password SOURCE_DB_PASSWORD \
--port SOURCE_DB_PORT \
--database DEFAULTDB \
--outputdir ./mydb_backup_dir
```

This creates the `mydb_backup_dir` directory containing the backup files.

</TabItem>
</Tabs>

## Restore the data

<Tabs groupId="group1">
<TabItem value="1" label="mysqldump/restore" default>

### Collect connection details

To restore the saved data from the file to your `target-db`, collect
connection details on your Aiven for MySQL `target-db` service:

1. Log in to the [Aiven Console](https://console.aiven.io/) and go to your `target-db`
   service page.
1. On the <ConsoleLabel name="overview"/> page, find **Connection information** and note
   the following:

  | Variable             | Description                                 |
  | -------------------- | ------------------------------------------- |
  | `TARGET_DB_HOST`     | **Host** name for the connection            |
  | `TARGET_DB_USER`     | **User** name for the connection            |
  | `TARGET_DB_PORT`     | Connection **Port** number                  |
  | `TARGET_DB_PASSWORD` | Connection **Password**                     |
  | `DEFAULTDB`          | Database that contains the `target-db` data |

### Restore from the file

Run the following command to load the saved data into your `target-db` service:

```bash
mysql \
-p DEFAULTDB -P TARGET_DB_PORT \
-h TARGET_DB_HOST \
-u TARGET_DB_USER \
--password < mydb_backup.sql
```

</TabItem>
<TabItem value="2" label="myloader">

<EarlyBadge/>

<br />
<br />

### Collect connection details

To restore the saved data from the directory to your `target-db`, collect
connection details on your Aiven for MySQL `target-db` service:

1. Log in to the [Aiven Console](https://console.aiven.io/) and go to your `target-db`
   service page.
1. On the <ConsoleLabel name="overview"/> page, find **Connection information** and note
   the following:

  | Variable             | Description                                 |
  | -------------------- | ------------------------------------------- |
  | `TARGET_DB_HOST`     | **Host** name for the connection            |
  | `TARGET_DB_USER`     | **User** name for the connection            |
  | `TARGET_DB_PORT`     | Connection **Port** number                  |
  | `TARGET_DB_PASSWORD` | Connection **Password**                     |
  | `DEFAULTDB`          | Database that contains the `target-db` data |

### Restore from the directory

Use `myloader` to restore the data from the `mydumper` backup:

```bash
myloader \
--host TARGET_DB_HOST \
--user TARGET_DB_USER \
--password TARGET_DB_PASSWORD \
--port TARGET_DB_PORT \
--database DEFAULTDB \
--directory ./mydb_backup_dir
```

</TabItem>
</Tabs>

When the password is requested at the prompt, paste `TARGET_DB_PASSWORD` into the terminal.
When the restore or load process is complete and the data is stored in your `target-db`,
you can use the
[`mysqlcheck` command](https://dev.mysql.com/doc/refman/8.0/en/mysqlcheck.html) to
perform data analysis.

<RelatedPages/>

- [Service backups](/docs/platform/concepts/service_backups#aiven-for-mysql)
- [Migrate to Aiven via CLI](/docs/products/mysql/howto/migrate-from-external-mysql)
- [Migrate to Aiven via console](/docs/products/mysql/howto/migrate-db-to-aiven-via-console)
- [Perform pre-migration checks on your Aiven for MySQL® database](/docs/products/mysql/howto/do-check-service-migration)
