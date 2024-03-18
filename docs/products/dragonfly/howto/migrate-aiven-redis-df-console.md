---
title: Migrate Aiven for Redis®* to Aiven for Dragonfly®
---

Migrate your Aiven for Redis®* databases to Aiven for Dragonfly using the Aiven Console migration tool. Learn about compatibility and prerequisites, and follow the streamlined migration process for a smooth upgrade to the managed Aiven for Dragonfly service.


import Note from "@site/static/includes/dragonflysla-note.md"

<Note/>

## Compatibility overview

Before migrating an external Redis database to Aiven for Dragonfly,
carefully review your current Redis setup.

-   **Review database setup:** Examine your Redis database's data
    structures, storage patterns, and configurations. Identify any unique
    features, custom settings, and specific configurations.
-   **API compatibility:** While Dragonfly closely mirrors Redis API
    commands, there may be variations, especially with newer versions of
    Redis. For detailed insights on command compatibility, refer to the
    [Dragonfly API compatibility
    documentation](https://www.dragonflydb.io/docs/command-reference/compatibility).


## Prerequisites

Before starting the migration from an Aiven for Redis service:

-   Confirm the Aiven for Redis service is accessible over the Internet.
    For more information, see
    [Public internet access](/docs/platform/howto/public-access-in-vpc).
-   Make a note of the Aiven project and Aiven for Redis service names
    for migration in the Aiven Console.

The Aiven Console migration tool automatically uses connection details
like the hostname, port, and credentials linked to the selected Aiven
for Redis service.

## Migration limitations at General Availability (GA)

As Aiven for Dragonfly moves to General Availability (GA), the focus is on delivering
the most valuable features to you, guided by your feedback. During the initial phase of
GA, automatic migration of Users, Access Control Lists (ACLs), and service configurations
from Redis to Dragonfly will not be included.

What this means:

- **Users and ACLs:** Custom user settings and access controls must be manually
configured in Dragonfly.
- **Service configurations:** If you’ve customized your Redis service with
specific settings, you must manually apply these settings to Dragonfly. Automatic
transfer of these custom configurations is not available during the initial phase of GA.

## Database migration steps

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select

    the Aiven for Dragonfly service for your Redis database migration.
2.  Go to **Service settings** from the sidebar.
3.  Scroll to the **Service management** section and use the ellipsis to
    view additional menu options.
4.  Select **Import database** to initiate the import process.

### Step 1: Configure

Begin the migration process by selecting **Import an Aiven for Redis
service**:

1.  From the drop-down menu, select your project name.
2.  From the subsequent drop-down, select the Aiven for Redis database
    you intend to migrate.
3.  Click **Get started** to proceed with the migration.

### Step 2: Validation

The [Aiven Console](https://console.aiven.io/) will automatically
attempt to validate the database configurations for the selected Aiven
for Redis service. Click **Run validation** to validate the connection.

:::warning
If a validation error occurs during migration, follow the on-screen
instructions to fix it. Rerun validation to ensure the database meets
migration criteria. Note that the migration doesn't include service
user accounts and commands in progress.
:::

### Step 3: Migration

Once all the necessary checks have been completed successfully, you can
proceed with the migration process.

-   Click **Start migration** to initiate the data migration process to
    Aiven for Dragonfly.

### Step 4: Replication

While the migration is in progress:

-   You can close the migration wizard by clicking **Close window** and
    return later to monitor the progress. Check the service's **Overview** page to track the
    migration progress.

-   To stop the migration, clicking **Stop migration**. This action will
    preserve the data already migrated to Aiven.

    :::important
    To prevent conflicts during replication:

    -   The target database will be in a read-only state during
        migration. Writing to the database is only possible once the
        migration is stopped.
    -   Do not manually change the replication settings of the source
        database.
    -   Avoid making network or configuration changes that can disrupt
        the ongoing connection between the source and target databases,
        such as modifying firewall rules or altering trusted sources.
    :::

    :::note
    If the migration fails, investigate, resolve, and restart the
    migration using **Start over**.
    :::

### Step 5: Close and post-migration steps

Upon successful migration:

-   **Stop replication**: If no further synchronization is required and
    you are ready to switch to Aiven for Dragonfly after thoroughly
    testing the service.
-   **Keep replicating**: If ongoing data synchronization is necessary
    to maintain active synchronization.

:::warning
Avoid system updates or configuration changes during active replication
to prevent unintentional migrations.
:::

:::note[Replication mode active?]
Your data is now synchronized to Aiven for Dragonfly, with new writes to
the source database being continuously synced.
:::

## Related pages

-   [Aiven for Redis®* documentation](/docs/products/redis/get-started)
-   [Aiven for Dragonfly documentation](/docs/products/dragonfly/get-started)
