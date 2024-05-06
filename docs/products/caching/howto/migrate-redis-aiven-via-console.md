---
title: Migrate from Redis®* to Aiven for Caching using Aiven Console
---

Redis®* is an open-source, in-memory data structure store used as a
database, cache, message broker, and streaming engine.

Migrating your Redis®* databases, whether on-premise or cloud-hosted,
to Aiven for Redis®* managed service is straightforward. The Aiven
console provides a guided wizard to assist you with the migration
process.

:::important
Migrating from Google Cloud Memorystore for Redis is not currently
supported.

The version of the source Redis service cannot be higher than the version
of the target Aiven for Caching service.
:::

## Prerequisites

Before starting the migration process, ensure you have the following:

-   A target Aiven for Caching service. To create one, see
    [Get started with Aiven for Caching](/docs/products/redis/get-started).
-   Source database information:
    -   **Hostname or connection string:** This is the public hostname,
        connection string, or IP address used to connect to the
        database. Refer to
        [accessible from the public Internet](/docs/platform/howto/public-access-in-vpc).
    -   **Port:** The port used to connect to the database.
    -   **Username:** The username used to connect to the database.
        Ensure this user has sufficient permissions to access the data to migrate.
    -   **Password:** The password used to connect to the database.
-   To enable traffic and connection between the source and target
    databases, ensure that you update or disable the firewalls that
    protect them. If necessary, you can temporarily disable the
    firewalls.
-   A source Redis®* service that is secured with SSL is a default
    migration requirement.
-   A publicly accessible source Redis®* service or a service with a
    VPC peering connection between private networks. The VPC ID and
    cloud name are required for the migration process.

:::note
AWS ElastiCache for Redis®* instances cannot have public IP addresses
and require project VPC and peering connection.
:::

## Migrate a Redis database

Follow these steps to migrate a Redis database to Aiven for Caching service:

1.  Log in to the [Aiven Console](https://console.aiven.io/), and select the target
    Aiven for Caching service for migrating the Redis® database.
1.  Click **Service settings** on the sidebar.
1.  Scroll to the **Service management** section, and
    click <ActionsIcon className="icon"/> **Actions** > **Import database**
    to initiate the import process.
1.  You will see a wizard that guides you through the database migration
    process.

### Step 1: Configure

Read through the guidelines on the Redis migration wizard and click
**Get started** to proceed with the database migration.

![Screenshot of the database migration wizard](/images/content/products/redis/redis-db-migration-get-started.png)

### Step 2: Validation

1.  On the **Database connection and validation** screen, enter the
    following information to establish a connection to your source
    database:

    -   **Hostname:** This is the public hostname, connection string, or
        IP address used to connect to the database.
    -   **Port:** The port used to connect to the database.
    -   **Username:** The username used to connect to the database.
    -   **Password:** The password used to connect to the database.

1.  Select the **SSL encryption recommended** checkbox.

1.  Click the **Run check** to validate the connection. If the check
    returns any warning, resolve the issues before proceeding with the
    migration process.

    ![Connect to database](/images/content/products/redis/redis-migration-validation.png)

### Step 3: Migration

On the **Database migration** screen, click **Start Migration** to
begin the migration.

![Start database migration](/images/content/products/redis/redis-start-migration.png)

While the migration is in progress, you can

-   Close the wizard by selecting **Close window** and check the
    migration status anytime by returning to the wizard from the
    service's overview page.
-   Continue to write to the target database.
-   Stop the migration by selecting **Stop migration**. The migrated
    data will be retained, and you can start a new migration.

:::note
If you choose to stop the migration, this action immediately halts
the replication of your data. However, any data that has already been
migrated to Aiven is retained. You can initiate a new migration
later, and this process overwrites any previously migrated
databases.
:::

:::note[Migration attempt failed?]
If you receive such a notification, it is important to investigate the
possible causes of the failure and address the issues. Once you have
resolved the underlying problems, you can initiate the migration by
choosing **Start over**.
:::

### Step 4: Close

When the wizard informs you about the completion of the migration, you
can choose one of the following options:

-   Click **Close connection** to disconnect the databases and stop the
    replication process if it is still active.

-   Click **Keep replicating** if the replication is ongoing and you
    wish to maintain the connection open for continuous data
    synchronization.

    ![Close database connection](/images/content/products/redis/redis-migration-complete.png)

:::note[Replication mode active?]
Your data has been successfully migrated to the designated Aiven for
Caching database, and any subsequent additions to the connected databases
are being continuously synchronized.
:::

## Related pages

-   [Get started with Aiven for Caching](/docs/products/redis/get-started)
