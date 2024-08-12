---
title: Migrate to Aiven for MySQL from an external MySQL
---

Aiven for MySQL offers a managed process for migrating from an external MySQL into the Aiven-hosted database. It supports both a one-off dump-and-restore process and using the ongoing replication functionality built-in to MySQL.

:::note
To use the Aiven Console to migrate your database, see
[Migrate MySQL® databases to Aiven using the Console
](/docs/products/mysql/howto/migrate-db-to-aiven-via-console).
:::

The process will first do a `mysqldump` to seed the schema and bulk-copy the
data, if the preconditions are met for ongoing replication then it will
configure MySQL as a replica of the external database.

## Requirements

To perform a migration from an external MySQL to Aiven for MySQL the
following requirements need to be satisfied:

-   The source server needs to be publicly available or accessible via a
    virtual private cloud (VPC) peering connection between the private
    networks, and any firewalls need to be open to allow traffic between
    the source and target servers.
-   You have a user account on the source server with sufficient
    privileges to create a user for the replication process.
-   [GTID](https://dev.mysql.com/doc/refman/8.0/en/replication-gtids.html)
    is enabled on the source database. To review the current GTID
    setting, run the following command hon the source cluster:

    ```bash
    show global variables like 'gtid_mode';
    ```

:::note
If you are migrating from MySQL in GCP, enable backups with
[PITR](https://cloud.google.com/sql/docs/mysql/backup-recovery/pitr) for
GTID to be set to `on`
:::

### Variables

You can use the following variables in the code samples provided:

 |     Variable     |                                              Description                                               |
 |------------------|--------------------------------------------------------------------------------------------------------|
 | `SRC_HOSTNAME`   | Hostname for source MySQL connection                                                                   |
 | `SRC_PORT`       | Port for source MySQL connection                                                                       |
 | `SRC_USERNAME`   | Username for source MySQL connection                                                                   |
 | `SRC_PASSWORD`   | Password for source MySQL connection                                                                   |
 | `SRC_IGNORE_DBS` | Comma-separated list of databases to ignore in migration                                               |
 | `SRC_SSL`        | SSL setting for source MySQL connection                                                                |
 | `DEST_NAME`      | Name of the destination Aiven for MySQL service                                                        |
 | `DEST_PLAN`      | Aiven plan for the destination Aiven for MySQL service  (for example, `startup-4`, `business-32`, etc) |

## Perform the migration

1.  Create a user in the source database with sufficient privileges for
    the pre-flight checks, the `mysqldump`, and the ongoing replication
    (you can substitute `%` in the below command with the IP address of
    the Aiven for MySQL database, if already existing):

    ```
    create user 'SRC_USERNAME'@'%' identified by 'SRC_PASSWORD';
    grant replication slave on *.* TO 'SRC_USERNAME'@'%';
    grant select, process, event on *.* to 'SRC_USERNAME'@'%'
    ```

2.  If you don't have an Aiven for MySQL database yet, create it via
    [Aiven Console](/docs/products/mysql/get-started) or the dedicated
    [Aiven CLI command](/docs/tools/cli/service-cli#avn-cli-service-create)

3.  Set the migration details via the `avn service update`
    [Aiven CLI command](/docs/tools/cli/service-cli#avn-cli-service-update) substituting the parameters accordingly:

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

4.  Check the migration status via the dedicated
    `avn service migration-status`
    [Aiven CLI command](/docs/tools/cli/service-cli#avn-cli-service-migration-status):

    ```
    avn --show-http service migration-status --project PROJECT_NAME DEST_NAME
    ```

While the migration process is ongoing, the `migration_detail.status`
will be `syncing`:

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

:::note
The migration will initially do a bulk-copy of your data, and
several minutes after that has finished it will use the built-in
replication feature of MySQL to commence ongoing data copying. You can
see MySQL's internal status by running `show replica status` on the
destination database.
:::

## Stop the replication

If you reach a point where you no longer need the ongoing replication to
happen, you can remove the configuration from the destination service
via the `avn service update`
[Aiven CLI command](/docs/tools/cli/service-cli#avn-cli-service-update):

```shell
avn service update --project PROJECT_NAME --remove-option migration DEST_NAME
```

## Related pages

- [Migrate MySQL® databases to Aiven using the Console](/docs/products/mysql/howto/migrate-db-to-aiven-via-console)
