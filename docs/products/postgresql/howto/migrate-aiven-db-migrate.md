---
title: Migrate to Aiven for PostgreSQL® with aiven-db-migrate
---

The `aiven-db-migrate` tool is an open source project available on [GitHub](https://github.com/aiven/aiven-db-migrate), and it is the preferred way to perform PostgreSQL® database migration.

`aiven-db-migrate` performs a schema dump and migration first to ensure
schema compatibility.

It supports both logical replication, and using a dump and restore
process. Logical replication is the default method which keeps the two
databases synchronized until the replication is interrupted.

:::note[Restrictions on logical replication]
Before you use the logical replication method, make sure you know and
understand all the
[restrictions](https://www.postgresql.org/docs/current/logical-replication-restrictions.html).
:::

If the preconditions for logical replication are not met for a database,
the migration falls back to using `pg_dump`.

:::note
You can use logical replication when migrating from AWS RDS PostgreSQL®
10+ and [Google CloudSQL
PostgreSQL](https://cloud.google.com/sql/docs/release-notes#August_30_2021).
:::

## Requirements

To perform a migration with `aiven-db-migrate`:

-   The source server needs to be publicly available or accessible via a
    virtual private cloud (VPC) peering connection between the private
    networks.
-   You have a user account with access to the destination cluster from
    an external IP, as configured in `pg_hba.conf` on the source
    cluster.

To use the **logical replication** method, you'll need the
following:

-   PostgreSQL® version is 10 or higher.
-   Sufficient access to the source cluster (either the `replication`
    permission or the `aiven-extras` extension installed). The extension
    allows you to perform publish/subscribe-style logical replication
    without a superuser account, and it is preinstalled on Aiven for
    PostgreSQL servers. See [Aiven Extras on
    GitHub](https://github.com/aiven/aiven-extras).
-   An available replication slot on the destination cluster for each
    database migrated from the source cluster.

1.  If you don't have an Aiven for PostgreSQL database yet, run the
    following command to create a couple of PostgreSQL services via
    [Aiven CLI](/docs/tools/cli) substituting the
    parameters accordingly:

    ```
    avn service create --project PROJECT_NAME -t pg -p DEST_PG_PLAN DEST_PG_NAME
    ```

1.  Enable the `aiven_extras` extension in the Aiven for PostgreSQL®
    target database as written in the
    [dedicated document](/docs/products/postgresql/concepts/dba-tasks-pg#aiven_extras_extension).

1.  Set the `wal_level` to `logical` on source database. Check the
    following examples for the main managed databases:

    -   [Amazon Aurora](/docs/products/postgresql/howto/logical-replication-aws-aurora)
    -   [Amazon RDS](/docs/products/postgresql/howto/logical-replication-aws-rds)
    -   [Google Cloud SQL](/docs/products/postgresql/howto/logical-replication-gcp-cloudsql)

    :::note
    Aiven for PostgreSQL has `wal_level` set to `logical` by default
    :::

    To review the current `wal_level`, run the following command on the
    source cluster via `psql`

    ```sql
    show wal_level;
    ```

## Variables {#pg_migrate_wal}

The following variables need to be substituted in the `aiven-db-migrate`
calls

 | Variable       | Description                                                             |
 | -------------- | ----------------------------------------------------------------------- |
 | `SRC_USERNAME` | Username for source PostgreSQL connection                               |
 | `SRC_PASSWORD` | Password for source PostgreSQL connection                               |
 | `SRC_HOSTNAME` | Hostname for source PostgreSQL connection                               |
 | `SRC_PORT`     | Port for source PostgreSQL connection                                   |
 | `DEST_PG_NAME` | Destination Aiven for PostgreSQL service name                           |
 | `DST_DBNAME`   | Bootstrap database name for destination PostgreSQL connection           |
 | `DB_TO_SKIP`   | Comma separated list of database names for which to skip the migrations |

## Perform the migration with `aiven-db-migrate`

:::warning
Running a logical replication migration twice on the same cluster creates
duplicate data. Logical replication also has
[limitations](https://www.postgresql.org/docs/current/logical-replication-restrictions.html)
on what it can copy.
:::

### Run `aiven-db-migrate` using the Aiven CLI

You can initiate a migration to an Aiven for PostgreSQL® service with
the [Aiven CLI](/docs/tools/cli) and the following
command, substituting the placeholders accordingly:

```bash
avn service update --project PROJECT_NAME -c migration.host=SRC_HOSTNAME   \
    -c migration.port=SRC_PORT                                             \
    -c migration.ssl=true                                                  \
    -c migration.username=SRC_USERNAME                                     \
    -c migration.password=SRC_PASSWORD                                     \
    -c migration.dbname=DST_DBNAME                                         \
    -c migration.ignore_dbs=DB_TO_SKIP                                     \
    DEST_PG_NAME
```

:::note
Using avn CLI shows limited status output, to troubleshoot failures
run `aiven-db-migrate`
[directly from Python](run-aiven-db-migrate-python).
:::

### Display the migration status using the Aiven CLI

You can see the migration status using the
[Aiven CLI](/docs/tools/cli) and the
following call:

```bash
avn --project PROJECT_NAME --show-http service migration-status \
    DEST_PG_NAME
```

:::note
There may be delay for migration status to update the current progress,
keep running this command to see the most up-to-date status.
:::

The output is be similar to the following, which mentions that the
`pg_dump` migration of the `defaultdb` database is `done` and the
logical `replication` of the `has_aiven_extras` database is syncing:

```text
-----Response Begin-----
{
    "migration": {
        "error": null,
        "method": "",
        "status": "done"
    },
    "migration_detail": [
        {
        "dbname": "has_aiven_extras",
        "error": null,
        "method": "replication",
        "status": "syncing"
        },
        {
        "dbname": "defaultdb",
        "error": null,
        "method": "pg_dump",
        "status": "done"
        }
    ]
}
-----Response End-----
STATUS  METHOD  ERROR
======  ======  =====
done            null
```

:::note
The overall `method` field is left empty due to the mixed methods used
to migrate each database.
:::

### Stop the migration process using the Aiven CLI

Once the migration is finished, you can stop the related process using
the [Aiven CLI](/docs/tools/cli).

:::warning
Make sure your migration process is in one of the following state when
triggering the removal:

-   `done` if using `pg_dump`
-   `syncing` if using logical replication

Otherwise, removing a migration configuration can leave the destination
cluster in an inconsistent state.
:::

The migration process can be stopped with:

```bash
avn service update --project PROJECT_NAME --remove-option migration DEST_PG_NAME
```

This command removes all logical replication-related objects from
both source and destination cluster. If using logical replication, the
process stops it. It has no effect for the `pg_dump` method as it is a
one-time operation.

:::warning
Don't stop the migration process while it is `running` state since both
the logical replication and `pg-dump`/`pg-restore` methods are copying
data from the source to the destination cluster.

Once migration is completed successfully, unused replication slots
should be removed.
:::

The migration using `aiven-db-migrate` can also be
[performed in Python](run-aiven-db-migrate-python) without requiring the Aiven CLI.
