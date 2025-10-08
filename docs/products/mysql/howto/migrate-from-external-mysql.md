---
title: Migrate to Aiven for MySQL® via CLI
sidebar_label: Migrate to Aiven via CLI
---

import RelatedPages from "@site/src/components/RelatedPages";
import MysqlMigrationFreeze from "@site/static/includes/mysql-migration-freeze.md";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";

Migrate your external MySQL database to an Aiven-hosted one using either a one-time dump-and-restore or continuous data synchronization through MySQL's built-in replication.

:::note
To migrate your database using the Aiven Console, see
[Migrate MySQL® databases to Aiven via console](/docs/products/mysql/howto/migrate-db-to-aiven-via-console).
:::

## How it works

The Aiven for MySQL migration process begins with an **initial data transfer** and can be
followed by **continuous data synchronization** if your setup supports it.

### Initial data transfer

A bulk copy of your data is first created. This is done using one of the following tools:

- `mysqldump` for small and medium-sized databases
- `mydumper/myloader` <EarlyBadge/> for large databases

:::important[mydumper/myloader requirements]

- `mydumper/myloader` is an
  [early availability feature](/docs/platform/concepts/service-and-feature-releases) that
  provides faster migration and reduced downtime for large databases, preventing
  performance bottlenecks that `mysqldump` can cause on large datasets.
- To avoid the resource exhaustion while migrating large database with `mydumper/myloader`,
  use a service configuration with significant computational power (multiple vCPUs) and
  high memory capacity.

:::

### Continuous data synchronization

After the initial data copy, the Aiven for MySQL service can be configured as a replica of
your external database, enabling ongoing data synchronization through MySQL's built-in
replication feature.

## Prerequisites

- The source server is publicly available or accessible via a virtual private cloud (VPC)
  peering connection between the private networks, and firewalls are open to allow traffic
  between the source and target servers.
- You have a user account on the source server with sufficient privileges to create a user
  for the replication process.
- [GTID](https://dev.mysql.com/doc/refman/8.0/en/replication-gtids.html) is enabled on the
  source database. Review the current GTID setting by running the following command on the
  source cluster:

  ```bash
  show global variables like 'gtid_mode';
  ```

- You have a running Aiven for MySQL service with a destination database. If missing,
  create it in the [Aiven Console](/docs/products/mysql/get-started) or the
  [Aiven CLI](/docs/tools/cli/service-cli#avn-cli-service-create).

:::note
If you are migrating from MySQL in Google Cloud, enable backups with
[PITR](https://cloud.google.com/sql/docs/mysql/backup-recovery/pitr) for
GTID to be set to `on`.
:::

## Collect source and destination details

|     Variable     |                                              Description                                               |
|------------------|--------------------------------------------------------------------------------------------------------|
| `SRC_HOSTNAME`   | Hostname for source MySQL connection                                                                   |
| `SRC_PORT`       | Port for source MySQL connection                                                                       |
| `SRC_USERNAME`   | Username for source MySQL connection                                                                   |
| `SRC_PASSWORD`   | Password for source MySQL connection                                                                   |
| `SRC_IGNORE_DBS` | Comma-separated list of databases to ignore in migration                                               |
| `SRC_SSL`        | SSL setting for source MySQL connection                                                                |
| `DEST_NAME`      | Name of the destination Aiven for MySQL service                                                        |
| `DEST_PLAN`      | Aiven plan for the destination Aiven for MySQL service  (for example, `startup-4` or `business-32`)    |

## Migrate your database

<MysqlMigrationFreeze/>

1. Create a user in the source database with sufficient privileges for the pre-flight
   checks, the bulk copy (using `mysqldump` or `mydumper` in <EarlyBadge/>), and the ongoing
   replication. Replace `%` with the IP address of the Aiven for MySQL database, if already
   existing.

    ```sql
    create user 'SRC_USERNAME'@'%' identified by 'SRC_PASSWORD';
    grant replication slave on *.* TO 'SRC_USERNAME'@'%';
    grant select, process, event on *.* to 'SRC_USERNAME'@'%'
    ```

1.  Set the migration details using the `avn service update`
    [Aiven CLI command](/docs/tools/cli/service-cli#avn-cli-service-update). Replace the
    [placeholders](/docs/products/mysql/howto/migrate-from-external-mysql#collect-source-and-destination-details)
    with meaningful values.

    ```bash
    avn service update --project PROJECT_NAME \
        -c migration.host=SRC_HOSTNAME \
        -c migration.port=SRC_PORT \
        -c migration.username=SRC_USERNAME \
        -c migration.password=SRC_PASSWORD \
        -c migration.ignore_dbs=SRC_IGNORE_DBS \
        -c migration.ssl=SRC_SSL \
        DEST_NAME
    ```

1.  Check the migration status using the `avn service migration-status`
    [Aiven CLI command](/docs/tools/cli/service-cli#avn-cli-service-migration-status):

    ```bash
    avn service migration-status --project PROJECT_NAME DEST_SERVICE_NAME
    ```

    When the migration process is ongoing, `migration_detail.status` is `syncing`:

    ```json
    {
    "migration": {
        "error": null,
        "method": "replication",
        "seconds_behind_master": 0,
        "source_active": true,
        "status": "done"
    },
    "migration_detail": [
        {
            "dbname": "migration",
            "error": null,
            "method": "replication",
            "status": "syncing"
        }
      ]
    }
    ```

Ongoing replication starts a few minutes after the initial data copy.

:::tip
Monitor the ongoing replication status by running `show replica status` on the destination
database.
:::

## Stop the replication

After confirming that the migration is complete, stop the ongoing replication by removing
the configuration from the destination service via the `avn service update`
[Aiven CLI command](/docs/tools/cli/service-cli#avn-cli-service-update):

```bash
avn service update --project PROJECT_NAME --remove-option migration DEST_NAME
```

:::warning
If you don't stop the ongoing replication, you might lose data. For example, if you remove
the data on the migration source when the replication is active, the data is also removed
on the migration target.
:::
