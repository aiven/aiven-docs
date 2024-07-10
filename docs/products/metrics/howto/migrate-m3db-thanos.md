---
title: Migrate Aiven for M3DB to Aiven for Metrics
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Migrate your Aiven for M3DB databases to Aiven for Thanos Metrics using the Aiven Console migration tool.

## Compatibility considerations

Review your current M3DB setup before migrating to Aiven for Metrics.

- **Review database setup:** Examine your M3DB database's data structures, storage
  patterns, and configurations. Identify any unique features, custom settings, and
  specific configurations.
- **API and query language compatibility:** Thanos Metrics uses PromQL, which is
  different from M3DB's native query language. Update your queries to be
  compatible with PromQL. For assistance, you can use tools such as the
  [M3 to PromQL converter](https://github.com/logzio/influxql-to-promql-converter) or
  Aiven's own [dashboard converter](https://github.com/Aiven-Open/influxql-to-m3-dashboard-converter).
- **Version compatibility:** Ensure your M3DB version supports migration to
  Thanos Metrics. You might need to upgrade your M3DB to a compatible version.

## Prerequisites

Before starting the migration from an Aiven for M3DB service:

- Make a note of the Aiven project and Aiven for M3DB service name for migration in the
  [Aiven Console](https://console.aiven.io/).

The [Aiven Console](https://console.aiven.io/) migration tool automatically uses
connection details like the hostname, port, and credentials linked to the selected
Aiven for M3DB service.

## Database migration steps

1. Log in to the [Aiven Console](https://console.aiven.io/) and select the
   Aiven for Metrics service for your M3DB database migration.
1. Go to **Service settings** from the sidebar.
1. Scroll to the **Service management** section, and click
   <ConsoleLabel name="actions"/> > **Import database** to initiate the import process.
1. Follow the wizard to guide you through the database migration process.

### Step 1: Configure

1. From the drop-down menu, select your project name.
2. From the subsequent drop-down, select the Aiven for M3DB database you intend to migrate.
3. Click **Get started** to proceed with the migration.

### Step 2: Validation

The [Aiven Console](https://console.aiven.io/) automatically attempts to validate
the database configurations for the selected Aiven for M3DB service.
Click **Run validation** to validate the connection.

:::warning
If a validation error occurs during migration, follow the on-screen instructions to f
ix it. Rerun validation to ensure the database meets migration criteria. Note that the
migration doesn't include service user accounts and commands in progress.
:::

### Step 3: Migration

Once all the necessary checks have been completed successfully, you can proceed with
the migration process.

- Click **Start migration** to initiate the data migration process to Aiven for Metrics.

### Step 4: Replication

While the migration is in progress:

- You can close the migration wizard by clicking **Close window** and return later
  to monitor the progress. Check the service's **Overview** page to track the
  migration progress.
- To stop the migration, click **Stop migration**. The data already transferred to
  Aiven for Metrics is preserved.

:::important
To prevent conflicts during replication:

- The target database is in a read-only state during migration. Writing to the database
  is only possible once the migration is stopped.
- Do not manually change the replication settings of the source database.
- Avoid making network or configuration changes that can disrupt the ongoing
  connection between the source and target databases, such as modifying firewall
  rules or altering trusted sources.
:::

:::note
If the migration fails, investigate, resolve, and restart the migration
using **Start over**.
:::

### Step 5: Close and post-migration

Upon successful migration:

- **Stop replication:** If no further synchronization is required and you are ready
  to switch to Aiven for Thanos Metrics after thoroughly testing the service.
- **Keep replicating:** If ongoing data synchronization is necessary to maintain
  active synchronization.

:::warning
Avoid system updates or configuration changes during active replication to prevent
unintentional migrations.
:::

:::note
When replication mode is active, Aiven for Metrics ensures your data remains in sync,
with continuous synchronization of new writes from the source database.
:::

## Related Pages

- [Aiven for Thanos Metrics Overview](/docs/products/metrics/concepts/metrics-overview)
