---
title: Migrate Aiven for M3DB to Aiven for Metrics
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Migrate your Aiven for M3DB databases to Aiven for Thanos Metrics using the Aiven Console migration tool.

## Prerequisites

Review your current M3DB setup before migrating to Aiven for Metrics, and ensure it
meets the following prerequisites:

- **Review database setup:** Examine your M3DB database's data structures, storage
  patterns, and configurations. Identify any unique features, custom settings, and
  specific configurations.

  :::note
  The migration doesn't include service user accounts and commands in progress.
  :::

- **API and query language compatibility:** Both Thanos Metrics and M3DB use PromQL, so
  most existing queries will work as is. However, be aware that the same metric might
  have a slightly different name when written directly to Thanos compared to its name
  in M3DB. For example, `prometheus_<metric-name>` in M3DB might be
  called `<metric-name>` in Thanos. Consequently, after migration, you may encounter
  two names for the same metric:
    - `prometheus_<metric-name>{_source=m3db, labels...}` (for time series migrated from M3DB)
    - `<metric-name>{labels...}` (for time series written to Thanos directly)

  Adjust your queries accordingly. The built-in dashboards provided by Aiven services
  through integrations do not require any manual changes.
- **Version compatibility:** Ensure your M3DB version supports migration to Thanos
  Metrics. You might need to upgrade your M3DB to a compatible version.

## Database migration steps

1. Log in to the [Aiven Console](https://console.aiven.io/) and select the
   Aiven for Metrics service for your M3DB database migration.
1. Go to <ConsoleLabel name="service settings"/> from the sidebar.
1. Scroll to the **Service management** section, and click
   <ConsoleLabel name="actions"/> > **Import database** to initiate the import process.
1. Follow the wizard to guide you through the database migration process.

### Step 1: Configure

1. Select your project name.
1. Select the Aiven for M3DB database you intend to migrate.
1. Click **Get started** to proceed with the migration.

### Step 2: Validate

The [Aiven Console](https://console.aiven.io/) automatically attempts to validate
the database configurations for the selected Aiven for M3DB service.

- Click **Run validation** to validate the connection.

:::warning
If a validation error occurs during migration, follow the on-screen instructions to
fix it. Rerun validation to ensure the database meets migration criteria.
:::

### Step 3: Migrate

Once all the necessary checks have been completed, you can proceed with
the migration process.

- Click **Start migration** to initiate the data migration
process to Aiven for Metrics.

### Step 4: Replicate

While the migration is in progress:

- You can close the migration wizard by clicking **Close window** and return later
  to monitor the progress. Check the service's **Overview** page to track the
  migration progress.
- To stop the migration, click **Stop migration**. The data already transferred to
  Aiven for Metrics is preserved.

To prevent conflicts during replication:

- Avoid creating, deleting, or modifying namespaces on the source service
  during migration.
- Avoid making network or configuration changes that can disrupt the ongoing
  connection between the source and target databases, such as modifying firewall
  rules or altering trusted sources.

If the migration fails, investigate, resolve, and restart the migration
using **Start over**.

### Step 5: Close the connection and next steps

Upon successful migration:

- **Stop replication:** If no further synchronization is required and you are ready
  to switch to Aiven for Thanos Metrics after thoroughly testing the service.
- **Keep replicating:** If ongoing data synchronization. Avoid system updates or
  configuration changes during active replication to prevent unintentional migrations.

:::note
When replication mode is active, Aiven for Metrics ensures your data remains in sync,
with continuous synchronization of new writes from the source database.
:::

## Related Pages

- [Aiven for Thanos Metrics Overview](/docs/products/metrics)
