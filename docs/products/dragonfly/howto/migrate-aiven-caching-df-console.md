---
title: Migrate Aiven for Caching or Aiven for Valkey™ to Aiven for Dragonfly®
sidebar_label: Migrate Caching or Valkey to Aiven for Dragonfly®
---
import DragonflyLimitations from '@site/static/includes/dragonfly-limitations.md';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Migrate your Aiven for Caching or Aiven for Valkey databases to Aiven for Dragonfly using the Aiven Console migration tool.

import Note from "@site/static/includes/dragonflysla-note.md"

<Note/>

## Compatibility overview

Before migrating an external Redis database or an Aiven for Valkey database to
Aiven for Dragonfly, review your current database setup.

- **Review database setup:**  Examine your Redis database's data structures, storage
  patterns, and configurations within Aiven for Caching or Aiven for Valkey. Identify any
  unique features, custom settings, and specific configurations.
- **API compatibility:** While Dragonfly is designed to closely mirror Redis API commands,
  there are some differences, particularly with the newer versions of Redis and Valkey.
  For detailed insights on command compatibility, refer to the
  [Dragonfly API compatibility documentation](https://www.dragonflydb.io/docs/command-reference/compatibility).

## Prerequisites

Before starting the migration:

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
1. Click **Service settings** from the sidebar.
1. Go to the **Service management** section, and
   click <ConsoleLabel name="actions"/> > **Import database**.
   to initiate the import process.
1. Follow the wizard to guide you through the database migration process.

### Step 1: Configure

To begin the migration, select **Migrate existing Aiven for Caching/Valkey database**:

1. In the **Project name** drop-down, select the project with the service to migrate.
1. In the **Service name** drop-down, choose the Aiven for Caching or Aiven for Valkey
   service.
1. Click **Get started** to proceed with the migration.

### Step 2: Validate

The [Aiven Console](https://console.aiven.io/) automatically validates the database
configuration for the selected service. Click **Run validation** to check the connection.

:::warning
If a validation error occurs during migration, follow the on-screen
instructions to fix it. Rerun validation to ensure the database meets
migration criteria. The migration doesn't include service
user accounts and commands that are in progress.
:::

### Step 3: Migrate

Once all necessary checks are successfully completed, proceed by
clicking **Start migration** to begin the data migration process to Aiven for Dragonfly.

### Step 4: Replicate

During migration:

- You can close the migration wizard by clicking **Close window** and
  return later to monitor the progress. Check the service's **Overview** page to track
  the migration status.

- To stop the migration, click **Stop migration**. The data already transferred
  to Aiven for Dragonfly is preserved.

  :::important
  To prevent conflicts during replication:

  - The target database is in a read-only state during
    migration. Writing to the database is only possible once the
    migration is stopped.
  - Avoid manually changing the replication settings of the source database.
  - Avoid making network or configuration changes that can disrupt
    the connection between the source and target databases,
    such as modifying firewall rules or altering trusted sources.
  :::

    :::note
    If the migration fails, investigate, resolve the issue, and restart the
    migration using **Start over**.
    :::

### Step 5: Close the connection and next steps

Upon successful migration:

- **Stop replication**: If no further synchronization is required, and
  you are ready to switch to Aiven for Dragonfly after thoroughly
  testing the service.
- **Keep replicating**: If ongoing data synchronization is necessary
  to maintain active synchronization.

:::warning
Avoid system updates or configuration changes during active replication
to prevent unintentional migrations.
:::

:::note
When replication mode is active, Aiven for Dragonfly continuously synchronizes new
writes from the source database, ensuring your data remains up to date.
:::

## Related pages

- [Aiven for Caching* documentation](/docs/products/caching/get-started)
- [Aiven for Dragonfly overview](/docs/products/dragonfly)
- [Aiven for Valkey overview](/docs/products/valkey)
