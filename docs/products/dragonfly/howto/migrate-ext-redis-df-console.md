---
title: Migrate external Redis®* or Valkey databases to Aiven for Dragonfly®
sidebar_label: Migrate external Redis®* or Valkey to Dragonfly
---

import DragonflyLimitations from '@site/static/includes/dragonfly-limitations.md';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Migrate external Redis® or Valkey databases to Aiven for Dragonfly® using the Aiven Console migration tool.

:::important
The migration of databases from Google Cloud Memorystore for Redis is
not supported at this time.
:::

import Note from "@site/static/includes/dragonflysla-note.md"

<Note/>

## Compatibility check

Before migrating an external Redis or Valkey database to Aiven for Dragonfly,
review your current database setup.

- **Review database setup:** Examine the data structures, storage patterns, and
  configurations in your Redis or Valkey database. Identify any unique features,
  custom settings, or specific configurations.
- **API compatibility:** While Dragonfly closely mirrors Redis API commands, some
  differences exist, especially with newer versions of Redis and Valkey.
  For information on command compatibility, refer to the
  [Dragonfly API compatibility documentation](https://www.dragonflydb.io/docs/command-reference/compatibility).

## Prerequisites

Before starting the migration process, ensure the following:

- Confirm a target Aiven for Dragonfly service set up and ready. For more information, see
  [Get started with Aiven for Dragonfly®](/docs/products/dragonfly/get-started).
- Source database information:
  - **Hostname or connection string:** The public hostname,
    connection string, or IP address used to connect to the
    database, [accessible from the public Internet](/docs/platform/howto/public-access-in-vpc).
  - **Port:** The port number used for connecting to the database.
  - **Username:** The username with appropriate permissions to access the data for
    migration.
  - **Password:** The password associated with the username.
- Firewall rules allow traffic between databases or temporarily disabled firewalls.
- An SSL-secured connection is recommended for data transfer during the source
  Redis database migration.
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

To migrate a Redis or Valkey database to Aiven for Dragonfly:

1. Log in to the [Aiven Console](https://console.aiven.io/) and select
   the Aiven for Dragonfly service for your database migration.
1. On the <ConsoleLabel name="overview"/> page, click
   <ConsoleLabel name="service settings"/> in the sidebar.
1. In the **Service management** section, click
   <ConsoleLabel name="actions"/> > **Migrate database**.
1. Follow the wizard to guide you through the database migration process.

### Step 1: Configure

To begin the migration:

1. Select **Migrate an external Redis or Valkey database**.
1. Click **Get started** to begin.

### Step 2: Validation

Enter the required connection details for your source Redis or Valkey database:

- **Hostname:** The public hostname, connection string, or IP address
  for the database connection.
- **Port:** The port number used for connections.
- **Username:** The username required to access your database.
- **Password:** The password for database access.
- Select the SSL encryption option for a secure migration and click
  **Run check** to verify the connection.

:::note
Resolve any issues to ensure a smooth migration. Migration does not include all
components of your Redis setup, such as user accounts, ACLs, specific settings, and
ongoing commands or scripts. It does transfer all database data and contents.
:::

### Step 3: Migration

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

### Step 4: Close the connection and next steps

Once migration completes:

- Click **Stop replication** if no further synchronization is required and
  you are ready to switch to Aiven for Dragonfly after thoroughly testing the service.
- Click **Keep replicating** to maintain ongoing data synchronization if further
  testing or syncing with the source database is needed.

:::warning
Avoid system updates or configuration changes during active replication, as these
can restart nodes and trigger a new database migration. Ensure replication is complete
or stopped before making any modifications.
:::

:::note
When replication mode is active, Aiven for Dragonfly continuously synchronizes new
writes from the source database, ensuring your data remains up to date.
:::

## Related pages

- [Aiven for Dragonfly overview](/docs/products/dragonfly)
