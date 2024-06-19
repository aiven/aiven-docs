---
title: Migrate from Valkey to Aiven for Valkey
sidebar_label: Migration from Valkey
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Migrate your Valkey databases to Aiven for Valkey using the Aiven Console's guided wizard.

## Prerequisites

Before starting the migration process, ensure you have the following:

- A target Aiven for Valkey service. To create one, see
  [Get started with Aiven for Valkey](/docs/products/caching/get-started).
- Source database details:
  -   **Hostname or connection string:** The public hostname, connection string,
      or IP address used to connect to the database. See
      [accessible from the public Internet](/docs/platform/howto/public-access-in-vpc).
  -   **Port:** The port used to connect to the database.
  -   **Username:** The username for the database connection. Ensure this user h
      as the necessary permissions to access the data for migration.
  -   **Password:** The password for the database connection.
- Ensure traffic and connection between the source and target databases by
  updating or disabling the firewalls that protect them. If necessary,
  you can temporarily disable the firewalls.
- A source Valkey service that is secured with SSL.
- A publicly accessible source Valkey service or a service with a VPC peering connection
  between private networks. The VPC ID and cloud name are required for the
  migration process.

## Migrate a Valkey database

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. Select the target Aiven for Valkey service for migrating the Valkey database.
1. Click **Service settings** on the sidebar.
1. Scroll to the **Service management** section, and
   click <ConsoleLabel name="actions"/> > **Import database** to
   initiate the import process.
1. Follow the wizard to guide you through the database migration process.

### Step 1: Configure

Read through the guidelines on the Valkey migration wizard and
click **Get started** to proceed with the database migration.

### Step 2: Validation

1. On the **Database connection and validation** screen, enter the following
   information to establish a connection to your source database:
    - **Hostname:** The public hostname, connection string, or IP address used to
      connect to the database.
    - **Port:** The port used to connect to the database.
    - **Username:** The username used to connect to the database.
    - **Password:** The password used to connect to the database.
1. Select the **SSL encryption recommended** checkbox.
1. Click **Run check** to validate the connection. If the check returns any
   warnings, resolve the issues before proceeding with the migration process.

### Step 3: Migration

On the **Database migration** screen, click **Start Migration** to
begin the migration.

While the migration is in progress, you can

-   Close the wizard by clicking **Close window**. To view the
    migration status anytime,return to the wizard from the
    service's **Overview** page.
-   Continue writing to the target database.
-   Stop the migration by clicking **Stop migration**. Data that has already been
    migrated is retained, and you can initiate a new migration at any time

:::note
If you choose to stop the migration, this action immediately halts
the replication of your data. However, any data that has already been
migrated to Aiven is retained. You can initiate a new migration
later, and this process overwrites any previously migrated
databases.
:::

:::note
If you receive a **Migration attempt failed?** notification, investigate the possible
causes of the failure and address the issues. Once resolved, you can restart the
migration by choosing **Start over**.
:::

### Step 4: Close

When the wizard informs you about the completion of the migration,
you can choose one of the following options:

- Click **Close connection** to disconnect the databases and stop the replication
  process if it is still active.
- Click **Keep replicating** if the replication is ongoing and you wish to maintain the
  connection open for continuous data synchronization.

#### Replication mode active

Your data has been successfully migrated to the designated Aiven for Valkey database,
and any subsequent additions to the connected databases are being continuously synchronized.

## Related pages

- [Get started with Aiven for Valkey](/docs/products/valkey/get-started)
