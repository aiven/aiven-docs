---
title: Migrate Aiven for Redis®* to Aiven for Dragonfly®
---
import DragonflyLimitations from '@site/static/includes/dragonfly-limitations.md';

Migrate your Aiven for Redis®* databases to Aiven for Dragonfly using the Aiven Console migration tool.

import Note from "@site/static/includes/dragonflysla-note.md"

<Note/>

## Compatibility overview

Before migrating an external Redis database to Aiven for Dragonfly,
carefully review your current Redis setup.

- **Review database setup:** Examine your Redis database's data
  structures, storage patterns, and configurations. Identify any unique
  features, custom settings, and specific configurations.
- **API compatibility:** While Dragonfly is designed to mirror Redis API commands
  closely, variations exist, particularly with the newer versions of Redis.
  For detailed insights on command compatibility, refer to the
  [Dragonfly API compatibility documentation](https://www.dragonflydb.io/docs/command-reference/compatibility).

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

<DragonflyLimitations />

## Database migration steps

1. Log in to the [Aiven Console](https://console.aiven.io/) and select
   the Aiven for Dragonfly service for your Redis database migration.
1. Go to **Service settings** from the sidebar.
1. Scroll to the **Service management** section and use the ellipsis to
   view additional menu options.
1. Select **Import database** to initiate the import process.

### Step 1: Configure

Begin the migration process by selecting **Import an Aiven for Redis
service**:

1. From the drop-down menu, select your project name.
1. From the subsequent drop-down, select the Aiven for Redis database
   you intend to migrate.
1. Click **Get started** to proceed with the migration.

### Step 2: Validation

The [Aiven Console](https://console.aiven.io/) automatically
attempts to validate the database configurations for the selected Aiven
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

- Click **Start migration** to initiate the data migration process to
  Aiven for Dragonfly.

### Step 4: Replication

While the migration is in progress:

- You can close the migration wizard by clicking **Close window** and
  return later to monitor the progress. Check the service's **Overview** page to track
  the migration progress.

- To stop the migration, click **Stop migration**. The data already transferred
  to Aiven for Dragonfly is preserved.

  :::important
  To prevent conflicts during replication:

  - The target database is in a read-only state during
    migration. Writing to the database is only possible once the
    migration is stopped.
  - Do not manually change the replication settings of the source
    database.
  - Avoid making network or configuration changes that can disrupt
    the ongoing connection between the source and target databases,
    such as modifying firewall rules or altering trusted sources.
  :::

    :::note
    If the migration fails, investigate, resolve, and restart the
    migration using **Start over**.
    :::

### Step 5: Close and post-migration steps

Upon successful migration:

- **Stop replication**: If no further synchronization is required and
  you are ready to switch to Aiven for Dragonfly after thoroughly
  testing the service.
- **Keep replicating**: If ongoing data synchronization is necessary
  to maintain active synchronization.

:::warning
Avoid system updates or configuration changes during active replication
to prevent unintentional migrations.
:::

:::note
When replication mode is active, Aiven for Dragonfly ensures your data remains in sync,
with continuous synchronization of new writes from the source database.
:::

## Related pages

- [Aiven for Redis®* documentation](/docs/products/redis/get-started)
- [Aiven for Dragonfly overview](/docs/products/dragonfly/concepts/overview)
