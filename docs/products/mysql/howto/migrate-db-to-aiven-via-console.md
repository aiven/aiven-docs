---
title: Migrate MySQL® databases to Aiven using the console
---

You can migrate MySQL® databases to Aiven using the [Aiven Console](https://console.aiven.io/).

You can also use the CLI to migrate your database, see
[Migrate to Aiven for MySQL from an external MySQL](/docs/products/mysql/howto/migrate-from-external-mysql).

## About migrating via console

The console migration tool enables you to migrate MySQL databases to
managed MySQL clusters in your Aiven organization. You can migrate the
following:

-   Existing on-premise MySQL databases
-   Cloud-hosted MySQL databases
-   Managed MySQL database clusters on Aiven.

The console migration tool provides 2 migration methods:

-   **(Recommended) Continuous migration:** Used by default in the tool
    and taken as the reference method. This method uses
    logical replication so that data transfer is possible not only for
    existing data in the source database when triggering the migration
    but also for any data written to the source database during the
    migration.

-   **mysqldump**: Exports the current contents of the source database
    into a text file and imports it to the target database. Any changes
    written to the source database during the migration are **not
    transferred**.

    When you trigger the migration setup in the console and initial
    checks detect that your source database does not support the logical
    replication, you are notified about it via the migration wizard. To
    continue with the migration, you can select the alternative
    `mysqldump` migration method in the wizard.

## Prerequisites

-   To use the default continuous migration method in the console tool,
    you have the logical replication enabled on your source database.
-   Source database's hostname or IP address are
    [accessible from the public Internet](/docs/platform/howto/public-access-in-vpc).
-   You have the source database's credentials and reference data
    -   Public hostname or connection string, or IP address used to
        connect to the database
    -   Port used to connect to the database
    -   Username (for a user with superuser permissions)
    -   Password
-   Firewalls protecting the source database and the target databases
    are open to allow the traffic and connection between the databases
    (update or disable the firewalls temporarily if needed).

## Pre-configure the source

-   Allow remote connections on the source database.

    Log in to the server hosting your database and the MySQL
    installation. Next, open the network configuration of MySQL with the
    following command:

    ```bash
    sudo code /etc/mysql/mysql.conf.d/mysqld.cnf
    ```

    ```bash title="Expected output"
    . . .
    lc-messages-dir = /usr/share/mysql
    skip-external-locking
    #
    # Instead of skip-networking the default is now to listen only on
    # localhost which is more compatible and is not less secure.
    bind-address            = 127.0.0.1
    . . .
    ```

    Change the value of `bind-address` to a wildcard IP address,`*` or
    `0.0.0.0`.

    ```bash title="Expected output"
    . . .
    lc-messages-dir = /usr/share/mysql
    skip-external-locking
    #
    # Instead of skip-networking the default is now to listen only on
    # localhost which is more compatible and is not less secure.
    bind-address            = *
    . . .
    ```

    Save the changes and exit the file. Restart MySQL to apply the
    changes.

    ```bash
    sudo systemctl restart mysql
    ```

    :::note
    After completing the migration, make sure you revert those changes
    so that the MySQL database no longer accept remote connections.
    :::

-   Enable GTID.

    Set up GTID on your database so that it can create a unique
    identifier for each transaction on the source database. See
    [Enabling GTID Transactions
    Online](https://dev.mysql.com/doc/refman/5.7/en/replication-mode-change-online-enable-gtids.html)
    for the guidelines.

    To make sure you have GTID enabled, open your `my.cnf` file in
    `/etc/my.cnf` or `/etc/mysql/my.cnf` (if no luck finding the file,
    see [more potential locations in the table corresponding to
    your OS in the MySQL
    documentation](https://dev.mysql.com/doc/refman/8.0/en/option-files.html)).

    Check that the `my.cnf` file has the `[mysqld]` header.

    ```bash
    [mysqld]
    gtid_mode=ON
    enforce_gtid_consistency=ON
    ```

    After enabling GTID, restart MySQL.

    ```bash
    sudo systemctl restart mysql
    ```

-   Enable logical replication.

    Grant logical replication privileges to the user that you intend to
    connect to the source database with during the migration.

    Log in to the database as an administrator and grant the following
    permission to the user:

    ```bash
    GRANT ALL ON DATABASE_NAME.* TO USERNAME_CONNECTING_TO_SOURCE_DB;
    ```

    Reload the grant tables to apply the changes to the permissions.

    ```bash
    FLUSH PRIVILEGES;
    ```

    :::note
    After completing the migration, make sure you revert those changes
    so that the user no longer has logical replication privileges.
    :::

## Migrate a database

1.  Log in to the [Aiven Console](https://console.aiven.io/).
1.  On the **Services** page, select the service where your target
    database is located.
1.  From the sidebar on your service's page, select **Service
    settings**.
1.  On the **Service settings** page, go to the **Service
    management** section, and select **Import database**.
1.  Guided by the migration wizard, go through all the migration steps.

### Step 1 - configure

Get familiar **Guidelines for successful database migration** provided
in the **MySQL migration configuration guide** window, make sure your
configuration is in line with them, and select **Get started**.

### Step 2 - validation

1.  To establish a connection to your source database, enter required
    source database details into the wizard:
    -   Hostname
    -   Port
    -   Username
    -   Password
1.  Select the **SSL encryption recommended** checkbox.
1.  In the **Exclude databases** field, enter names of databases that
    you don't want to migrate (if any).
1.  Select **Run checks** to have the connection validated.

:::note[Unable to use logical replication?]
If your connection check returns the **Unable to use logical
replication** warning, either resolve the issues or give up using the
logical replication and opt for the dump method by selecting **Start the
migration using a one-time snapshot (dump method)** > **Run check** >
**Start migration**.
:::

### Step 3 - migration

If all the checks pass with no error messages, you can trigger the
migration by selecting **Start migration**.

### Step 4 - replicating {#stop-migration-mysql}

While the migration is in progress, you can:

-   Let it proceed until completed by selecting **Close window**, which
    closes the wizard. You come back to check the status at any time.
-   Discontinue the migration by selecting **Stop migration**, which
    retains the data already migrated. For information on how to follow
    up on a stopped migration process, see
    [Start over](/docs/products/mysql/howto/migrate-db-to-aiven-via-console#start-over-mysql).

:::warning
To avoid conflicts and replication issues while the migration is ongoing

-   Do not write to any tables in the target database that are being
    processed by the migration tool.
-   Do not change the replication configuration of the source database
    manually. Don't modify `binlog_format` or reduce
    `max_connections`.
-   Do not make database changes that can disrupt or prevent the
    connection between the source database and the target database. Do
    not change the source database's listen address and do not modify
    or enable firewalls on the databases.
:::

:::note[Migration attempt failed?]
If you happen to get such a notification, investigate potential causes
of the failure and try to fix the issues. When you're ready, trigger
the migration again by selecting **Start over**.
:::

When the wizard communicates the completion of the migration, select one
of the following:

-   **Close connection** to disconnect the databases and stop the
    replication process if still active.
-   **Keep replicating** if the replication is still ongoing and you
    want to keep the connection open for data synchronization.

:::note[Replication mode active?]
Your data has been transferred to Aiven but new data is still
continuously being synced between the connected databases.
:::

### Step 5 - close

When the wizard communicates the completion of the migration without
indicating an active replication process, select **Close connection**.

All the data in your database has been transferred to Aiven.

## Start over {#start-over-mysql}

If you
[stop a migration process](/docs/products/mysql/howto/migrate-db-to-aiven-via-console#stop-migration-mysql), you cannot restart the same process. Still, the data
already migrated is retained in the target database.

:::warning
If you start a new migration using the same connection details when your
*target* database is not empty, the migration tool truncates your
*target* database and an existing data set gets overwritten with the new
data set.
:::

## Related pages

-   [Migrate to Aiven for MySQL from an external MySQL](/docs/products/mysql/howto/migrate-from-external-mysql)
-   [About aiven-db-migrate](/docs/products/postgresql/concepts/aiven-db-migrate)
