---
title: Migrate external Redis®* databases to Aiven for Dragonfly®
---
import DragonflyLimitations from '@site/static/includes/dragonfly-limitations.md';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Migrate your external Redis® databases to Aiven for Dragonfly® using the Aiven Console's intuitive wizard for a smooth transition, enhancing your data storage and management capabilities.

:::important
The migration of databases from Google Cloud Memorystore for Redis is
not supported at this time.
:::

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
    [Dragonfly API compatibility documentation](https://www.dragonflydb.io/docs/command-reference/compatibility).

## Prerequisites

Before starting the migration process, ensure you have the following:

- A target Aiven for Dragonfly service set up and ready. For setup
  instructions, see to
  [Get started with Aiven for Dragonfly®](/docs/products/dragonfly/get-started).
- Source database information:
  - **Hostname or connection string:** The public hostname,
    connection string, or IP address used to connect to the
    database, [accessible from the public Internet](/docs/platform/howto/public-access-in-vpc).
  - **Port:** The port number used for connecting to the database.
  - **Username:** The username with appropriate permissions for
    accessing the database data you intend to migrate.
  - **Password:** The password associated with the username.
- Ensure firewall rules allow traffic between databases or turn them off
  temporarily.
- Using an SSL-secured connection for data transfer is highly
  recommended during the source Redis database migration.
- If the source Redis service is not publicly accessible, establish a
  VPC peering connection between the private networks. You need
  the VPC ID and cloud name for the migration.

:::note
Instances such as AWS ElastiCache for Redis that do not have public IP
addresses will require a VPC and peering connection to establish a
migration.
:::

<DragonflyLimitations />


## Database migration steps

To migrate a Redis database to Aiven for Dragonfly:

1. Log in to the [Aiven Console](https://console.aiven.io/) and select
   the Aiven for Dragonfly service for your Redis database migration.

1. Go to **Service settings** from the sidebar.
1. Scroll to the **Service management** section, and
   click <ConsoleLabel name="actions"/> > **Import database**.
   to initiate the import process.
1. Follow the wizard to guide you through the database migration process.

### Step 1: Configure

Start by reviewing the database migration configuration guidelines.
Confirm compatibility with Dragonfly and follow these steps:

-   Select **Import an external Redis database**.
-   Click **Get started** to begin the migration.

### Step 2: Validation

Enter the required details to establish a connection with your source
Redis database:

- **Hostname:** The public hostname, connection string, or IP address
  for the database connection.
- **Port:** The port number used for connections.
- **Username:** The username required to access your database.
- **Password:** The password for database access.
- Select the SSL encryption option for a secure migration and click
  **Run check** to verify the connection.

:::important
Address issues to ensure a smooth migration. The migration does not include all
components of your Redis setup, such as user accounts, ACLs, specific settings,
and ongoing commands or scripts. However, it does transfer all your database data and its contents.
:::

### Step 3: Migration

Once all the necessary checks have been completed successfully, you can
proceed with the migration process.

- Click **Start migration** to initiate the data migration process to
  Aiven for Dragonfly.

#### Migration in progress

During the migration, you can:

- Close the migration wizard by clicking **Close window** and later
  return to monitor the migration status from the service overview
  page.
- The duration of the migration depends on the size of your database.
  During migration, the target database are in a read-only state.
  Writing to the database is only possible once the migration is
  stopped.
- Certain managed database features are disabled while the
  migration is in progress.
- If needed, halt the migration by selecting **Stop migration**.
  Data already transferred to Aiven for Dragonfly is preserved.

:::warning

- Stopping this migration immediately halts the ongoing
  replication process, preserving the data already transferred to
  Aiven. You can initiate a new database migration at any time in the future.
  This migration overwrites the entire database and its contents on Aiven
  with the latest data from the source.
- Avoid actions that can disrupt the replication process, such as
  changing replication configurations or firewall settings.

:::

### Step 4 - Close and post-migration steps

Once the migration is complete:

- Click **Close connection** to end replication.
- Click **Keep replicating** to maintain ongoing data synchronization.

:::warning
System updates or any configuration changes during replication can
restart nodes and trigger a new database migration. Before making any
modifications, confirm that replication is either complete or stopped.
:::

:::note
When replication mode is active, Aiven for Dragonfly ensures your data remains in sync,
with continuous synchronization of new writes from the source database.
:::

## Related pages

- [Aiven for Dragonfly overview](/docs/products/dragonfly/concepts/overview)
