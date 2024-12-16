---
title: Migrate Aiven for Caching or Aiven for Valkey™ to Aiven for Dragonfly
sidebar_label: Migrate Caching or Valkey to Dragonfly
---
import DragonflyLimitations from '@site/static/includes/dragonfly-limitations.md';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Migrate your Aiven for Caching or Aiven for Valkey databases to Aiven for Dragonfly using the Aiven Console migration tool.

import Note from "@site/static/includes/dragonflysla-note.md"

<Note/>

## Compatibility check

Before migrating an Aiven for Caching or Aiven for Valkey database to Aiven for
Dragonfly, review your current database setup.

- **Review database setup:** Examine the data structures, storage patterns, and
  configurations in your Aiven for Caching or Aiven for Valkey database. Identify any
  unique features, custom settings, and specific configurations.
- **API compatibility:** While Dragonfly closely mirrors Redis API commands, some
  differences exist, especially with newer versions of Redis and Valkey.
  For information on command compatibility, refer to the
  [Dragonfly API compatibility documentation](https://www.dragonflydb.io/docs/command-reference/compatibility).

## Prerequisites

Before starting the migration:

- Confirm a target Aiven for Dragonfly service set up and ready. For more information,
  see [Get started with Aiven for Dragonfly®](/docs/products/dragonfly/get-started).
- Confirm that your Aiven for Caching or Aiven for Valkey service is accessible over
  the Internet. For more information, see
  [Public internet access](/docs/platform/howto/public-access-in-vpc).
- Note the project and service names for migration in the Aiven Console.

The Aiven Console migration tool automatically uses connection details
like the hostname, port, and credentials associated with the selected service.

<DragonflyLimitations />

## Database migration steps

1. Log in to the [Aiven Console](https://console.aiven.io/) and select
   the Aiven for Dragonfly service for your database migration.
1. On the <ConsoleLabel name="overview"/> page, click
   <ConsoleLabel name="service settings"/> in the sidebar.
1. In the **Service management** section, click
   <ConsoleLabel name="actions"/> > **Migrate database**.
1. Follow the wizard to guide you through the database migration process.

### Step 1: Configure

To begin the migration, select **Migrate existing Aiven for Caching/Valkey database**:

1. In the **Project name** drop-down, select the project with the service to migrate.
1. In the **Service name** drop-down, choose the Aiven for Caching or Aiven for Valkey
   service.
1. Click **Get started** to proceed with the migration.

### Step 2: Validate

The [Aiven Console](https://console.aiven.io/) automatically validates the database
configuration for the selected service.

Click **Run validation** to check the connection.

:::note

- If a validation error occurs during migration, follow the on-screen
  instructions to fix it. Rerun validation to ensure the database meets
migration criteria.
- The migration doesn't include service
  user accounts and commands that are in progress.
:::

### Step 3: Migrate

After completing validation, click **Start migration** to begin migrating data to
Aiven for Dragonfly.

While the migration is in progress:

- Click **Close window** to close the migration wizard, and return later to monitor the
  migration status from the service <ConsoleLabel name="overview"/> page.
- The migration duration depends on the size of your database. During migration, the
  target database is read-only, and writing to the database is only possible after
  stopping the migration.
- Certain managed database features are disabled during migration.
- To stop the migration, click **Stop migration**. Any data already transferred to
  Aiven for Dragonfly is preserved.

:::note
To avoid conflicts during migration:

- Avoid actions that may disrupt replication, such as changing replication settings,
  modifying firewall rules, or altering trusted sources.
- Stopping migration halts replication immediately, but any transferred data is
  preserved. Starting a new migration overwrites the entire database with the latest
  data from the source.

:::

:::tip
If the migration fails, investigate, and resolve the issue. Click **Start over** in
the Data migration window to restart the migration.
:::

### Step 5: Close the connection and next steps

Once migration completes:

- Click **Stop replication** if no further synchronization is required and
  you are ready to switch to Aiven for Dragonfly after thoroughly testing the service.
- Click **Keep replicating** to maintain ongoing data synchronization if further
  testing or syncing with the source database is needed.


:::warning
Avoid system updates or configuration changes during active replication, as these can
restart nodes and trigger a new database migration. Ensure replication is complete or
stopped before making any modifications.
:::

:::note
When replication mode is active, Aiven for Dragonfly continuously synchronizes new
writes from the source database, ensuring your data remains up to date.
:::

## Related pages

- [Aiven for Caching* documentation](/docs/products/caching/get-started)
- [Aiven for Dragonfly overview](/docs/products/dragonfly)
- [Aiven for Valkey overview](/docs/products/valkey)
