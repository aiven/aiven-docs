---
title: Replicate PostgreSQL® data to Aiven for ClickHouse® using CDC
limited: true
sidebar_label: Replicate from PostgreSQL (CDC)
---

import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use change data capture (CDC) to replicate data from Aiven for PostgreSQL® to Aiven for ClickHouse® for analytics without running your own replication pipeline.

The CDC integration copies the selected PostgreSQL tables to ClickHouse and continuously
replicates inserts, updates, and deletes. You can run analytical queries on replicated
data in ClickHouse instead of on the source PostgreSQL tables.

:::note
The CDC integration is in
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
Contact your Aiven account team or [Aiven sales](https://aiven.io/contact) to request
access.

:::

## Choose between CDC replication and the PostgreSQL integration

Aiven for ClickHouse offers two ways to work with PostgreSQL data: CDC replication and the
[PostgreSQL integration](/docs/products/clickhouse/howto/integrate-postgresql).

| Aspect | CDC replication | PostgreSQL integration |
| --- | --- | --- |
| Data location | Copies PostgreSQL data into ClickHouse tables. | Keeps data in PostgreSQL. |
| PostgreSQL load | Reads each table during the initial copy, then reads changes from the write-ahead log (WAL). | Reads data from PostgreSQL for each query. |
| Query execution | Runs queries on data stored in ClickHouse. | Fetches data from PostgreSQL when running queries. |
| Best for | Dashboards and analytics on large or frequently updated tables. | Occasional queries and joins involving smaller PostgreSQL tables. |

## Prerequisites

Before you set up replication, make sure you have:

- An Aiven project with CDC enabled. [Contact Aiven](https://aiven.io/contact) to
  request access. **TODO: Give the concrete way to request this
  limited availability feature, such as a support email, a Console path for a support
  ticket, or a form. Use the same method in the note at the top of this page.**
- An Aiven for PostgreSQL service with at least one table that has a primary key.
- An Aiven for ClickHouse service on a Startup plan or higher.
- Both services in the same Aiven project.
- Access to the [Aiven Console](https://console.aiven.io/).

## Limitations

CDC replication has the following limitations:

- **Supported services:** Replication works between Aiven for PostgreSQL and Aiven for
  ClickHouse services only. External PostgreSQL databases aren't supported.
- **Number of tables:** You can replicate 1 to 400 tables per integration. Each table must
  have a primary key.
- **Integration configuration:** Each integration has one replication pipeline between one
  PostgreSQL database and one ClickHouse database. A service pair can have only one CDC
  integration.
- **Database changes:** You can't change the source or destination database of an existing
  integration. To use a different database, delete the integration and create a new one.
  The new integration starts a new initial copy.
- **Table name conflicts:** Several PostgreSQL services can replicate into the same
  ClickHouse database. Aiven doesn't detect name conflicts across integrations, so make
  sure that generated ClickHouse table names don't overlap.
- **Resource usage:** The replication process shares CPU and memory with the Aiven for
  ClickHouse service. Consider this load when you choose a plan.
- **Table configuration:** You can't select individual columns or change the sorting key
  or partitioning of the replicated ClickHouse tables.
- **Schema changes:** Some PostgreSQL schema changes require you to resynchronize the
  affected tables.
- **Pausing replication:** You can't pause replication. It stops when you delete the
  integration or power off either service.
- **WAL retention:** While replication is stopped or delayed, PostgreSQL retains WAL data
  that replication hasn't confirmed. This can increase disk usage on your PostgreSQL
  service.

## Set up CDC replication

You can create a CDC integration from either your Aiven for PostgreSQL service or your
Aiven for ClickHouse service.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), open your project and select the
   Aiven for PostgreSQL service.
1. In the sidebar, click **Integrations**.
1. Select **Replicate to ClickHouse (CDC)**.
1. Select the destination Aiven for ClickHouse service.
1. Select the destination ClickHouse database and click **Next**.
1. Select the source PostgreSQL database.
1. Select the tables to replicate. Expand schemas or use the search to find tables.

   Tables without a primary key aren't eligible for replication. Add a primary key to the
   source table before selecting it.

1. Click **Start replication**.

Aiven creates the integration and starts copying the selected tables to ClickHouse. After
the initial copy, replication continuously applies changes from PostgreSQL.

The integration overview shows the replication progress.

:::tip
You can also start from your Aiven for ClickHouse service. Go to **Integrations**, select
**Replicate from PostgreSQL (CDC)**, and choose the source PostgreSQL service, database,
and tables.
:::

</TabItem>
<TabItem value="api" label="Aiven API">

Use the
[ServiceIntegrationCreate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationCreate)
endpoint with the `postgresql_clickhouse_cdc` integration type.

The following example replicates the `orders` and `customers` tables:

```bash
curl --request POST \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/integration" \
  --header "Authorization: Bearer API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "integration_type": "postgresql_clickhouse_cdc",
    "source_service": "PG_SERVICE_NAME",
    "dest_service": "CLICKHOUSE_SERVICE_NAME",
    "user_config": {
      "pipelines": [
        {
          "source_database": "PG_DATABASE",
          "destination_database": "CLICKHOUSE_DATABASE",
          "tables": [
            {"schema": "public", "table": "orders"},
            {"schema": "public", "table": "customers"}
          ]
        }
      ]
    }
  }'
```

Replace the following placeholders:

- `PROJECT_NAME`: Name of your Aiven project.
- `API_TOKEN`: Your [Aiven API token](/docs/platform/howto/create_authentication_token).
- `PG_SERVICE_NAME`: Name of the source Aiven for PostgreSQL service.
- `CLICKHOUSE_SERVICE_NAME`: Name of the destination Aiven for ClickHouse service.
- `PG_DATABASE`: Name of the source PostgreSQL database.
- `CLICKHOUSE_DATABASE`: Name of the destination ClickHouse database.

Include exactly one entry in the `pipelines` array.

The default PostgreSQL schema is `public`. Schema and table names can contain letters,
digits, underscores (`_`), and dollar signs (`$`), but can't begin or end with an
underscore.

</TabItem>
</Tabs>

## Query replicated data

For each PostgreSQL table, replication creates a table and a view in the destination
ClickHouse database.

| PostgreSQL table | ClickHouse table | ClickHouse view |
| --- | --- | --- |
| `public.orders` | `public_orders` | `public_orders__current` |
| `public.order_items` | `public_order__items` | `public_order__items__current` |

The ClickHouse table name combines the PostgreSQL schema and table names with an
underscore (`_`). Existing underscores are doubled to distinguish different source table
names.

### Query current data

Query the generated `__current` view to get the latest replicated state of a PostgreSQL
table. The view returns one row per primary key and excludes deleted rows.

For example, to count orders by status:

```sql
SELECT status, count()
FROM public_orders__current
GROUP BY status;
```

### Understand replicated tables

Replication stores data in tables that use the `ReplicatedReplacingMergeTree` engine,
sorted by the primary key.

When a row is updated or deleted in PostgreSQL, replication writes a new version of the
row to ClickHouse. Older versions can remain in the underlying table until ClickHouse
merges them in the background.

Each replicated table has two additional columns:

| Column | Description |
| --- | --- |
| `_etl_version` | Position of the change in the replication stream. |
| `_etl_deleted` | Indicates whether the row was deleted. A value of `1` represents a deleted row. |

The `__current` views use `FINAL` to return the current version of each row and exclude
deleted rows.

During the initial copy or resynchronization, Aiven creates temporary tables with the
`_tmpetl_` prefix. Don't query, modify, or delete these tables.

:::warning
Don't modify the replicated tables directly. A resynchronization replaces a table with a
newly created one, so rows you insert and changes made using `ALTER TABLE`, such as added
indexes or projections, are lost.

To add custom data or transformations, create separate tables or materialized views based
on the replicated tables.
:::

### Supported data types

Replication maps PostgreSQL data types to ClickHouse data types as follows:

| PostgreSQL | ClickHouse |
| --- | --- |
| `boolean` | `Boolean` |
| `smallint` | `Int16` |
| `integer` | `Int32` |
| `bigint` | `Int64` |
| `real` | `Float32` |
| `double precision` | `Float64` |
| `numeric`, `money` | `String` |
| `char`, `varchar`, `text`, `name` | `String` |
| `date` | `Date32` |
| `time` | `String` |
| `timestamp` | `DateTime64(6)` |
| `timestamptz` | `DateTime64(6, 'UTC')` |
| `uuid` | `UUID` |
| `json`, `jsonb` | `String` |
| `bytea` | `String` |
| Arrays of supported types | `Array` of the mapped type |
| Other types | `String` |

Replication stores PostgreSQL `numeric` values as `String` to preserve precision.

To use these values in calculations, cast them to a ClickHouse decimal type. For example:

```sql
SELECT toDecimal128(amount, 2)
FROM public_orders__current;
```

## Monitor replication

Use the Aiven Console to monitor replication status, progress, and performance.

1. Open your Aiven for PostgreSQL or Aiven for ClickHouse service.
1. Click **Integrations**.
1. Click the CDC integration.

The integration overview shows the overall replication status and the status of individual
tables.

### Replication status

The integration can report the following statuses:

| Status | Description |
| --- | --- |
| `healthy` | Replication is running and all tables are replicating ongoing changes. |
| `progressing` | Replication is starting, or at least one table is still being copied. |
| `degraded` | One or more tables have an error. Replication continues for the other tables. |
| `failed` | The replication process failed, or every table has an error. |
| `unknown` | The current replication status isn't available. |

Individual tables have their own replication statuses:

| Status | Description |
| --- | --- |
| `pending` | Replication hasn't started for the table. |
| `snapshotting` | The initial copy is in progress. |
| `streaming` | Replication is processing ongoing changes. |
| `resyncing` | Aiven is copying the table again. |
| `error` | Replication stopped for the table because of an error. |
| `unknown` | The current status isn't available. |

If a table encounters an error, the integration overview displays the error details.

### Replication metrics

On the **Metrics** tab, choose a time range of 1 hour, 1 day, 1 week, or 1 month to view
replication performance.

| Metric | Description |
| --- | --- |
| Replication lag | Indicates how far replication is behind PostgreSQL. |
| Events processed | Number of change events processed per second. |
| Data processed | Amount of data processed per second. |
| WAL retained | Amount of PostgreSQL WAL data retained for replication. |

Use these metrics to identify replication delays and monitor the amount of WAL retained by
PostgreSQL.

### Data freshness

Replication collects changes in batches and writes them to ClickHouse periodically.

Under normal load, changes typically appear in ClickHouse within approximately 10 seconds.
Actual delay depends on the workload and replication progress.

When the PostgreSQL source is idle, there might be no new changes to replicate. Consider
source activity together with replication lag and events processed when assessing data
freshness.

## Manage replicated tables

You can add or remove tables from an existing CDC integration without creating a new
integration.

### Add or remove tables

1. Open the CDC integration in the Aiven Console.
1. In the **Tables** section, click **Edit**.
1. Choose the tables to add or remove.
1. Click **Save**.
1. In the confirmation dialog, review the changes and confirm.

You can also change the selected tables using the
[ServiceIntegrationUpdate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationUpdate)
endpoint.

When you add a table, Aiven copies its existing data and replicates ongoing changes.

When you remove a table, replication stops for that table. Its ClickHouse table, view, and
existing data remain available, but the data stops updating.

If you no longer need the data, delete the ClickHouse table and view manually.

To replicate a renamed PostgreSQL table, update the integration's table selection.

### Handle schema changes

Replication applies some PostgreSQL schema changes automatically. Other changes stop
replication for the affected table until you resynchronize it.

| PostgreSQL change | Result in ClickHouse |
| --- | --- |
| Add a column | Aiven adds the column after the next row change in the source table. |
| Drop a column | **TODO: Confirm whether ClickHouse retains the column or removes it automatically.** |
| Rename a column | Replication stops for the affected table. Resynchronize it to apply the change. |
| Change a column type | Replication stops for the affected table. Resynchronize it to apply the change. |
| Other unsupported schema changes | Replication stops for the affected table. Resolve the issue and resynchronize it. |

An unsupported schema change affects only the corresponding table. Other tables continue
replicating.

### Resynchronize tables

Resynchronization copies a source PostgreSQL table again and replaces its replicated data
in ClickHouse.

You might need to resynchronize when:

- A schema change interrupts replication.
- A table encounters an error that requires a new initial copy.
- The PostgreSQL replication slot is lost.
- The replicated data needs a rebuild.

To resynchronize tables:

1. Open the CDC integration in the Aiven Console.
1. Click **Resynchronize**.
1. Choose the tables to resynchronize.
1. Confirm the resynchronization.

Aiven creates a new copy of the selected tables while the existing ClickHouse data remains
available for queries. When the copy finishes, Aiven replaces the existing replicated
data.

:::warning
The replacement isn't atomic. Queries running during the replacement can fail or return
incomplete data.

Plan resynchronization around applications and dashboards that depend on the affected
tables.
:::

## Troubleshoot replication

### Replication stops after a schema change

An unsupported schema change can stop replication for an affected table.

To recover:

1. Open the CDC integration in the Aiven Console.
1. Find the table with the `error` status.
1. Review the error message and resolve the underlying issue.
1. Resynchronize the affected table.

Other tables continue replicating.

### Replication stops after a service interruption

Aiven automatically retries temporary failures, such as connection interruptions and
service restarts.

Aiven stores replication progress in PostgreSQL so that replication can resume from the
last confirmed position after a restart.

If replication doesn't recover, review the integration status and error details in the
Aiven Console.

### Replication loses its WAL position

Replication uses a PostgreSQL replication slot to track changes.

If the slot is lost, for example after a failover that doesn't preserve it, replication
can't resume from its previous position. Aiven reports an error rather than skipping
changes.

Resynchronize all affected tables to restore replication.

### PostgreSQL disk usage increases

Replication reads changes from the PostgreSQL write-ahead log (WAL).

PostgreSQL retains WAL data until replication confirms that it has processed the changes.
WAL usage can increase when:

- The ClickHouse service is powered off.
- Replication can't write data to ClickHouse.
- Replication falls behind a high volume of PostgreSQL writes.

Monitor replication lag and the disk usage of your PostgreSQL service.

If you no longer need the integration, delete it to release the WAL retained for the
replication pipeline.

:::warning
Powering off the ClickHouse service stops replication but doesn't remove the PostgreSQL
replication slot. PostgreSQL can continue retaining WAL data until replication resumes or
you delete the integration.
:::

## Delete a CDC integration

Delete a CDC integration when you no longer need to replicate changes from PostgreSQL to
ClickHouse.

1. In the Aiven Console, open your Aiven for PostgreSQL or Aiven for ClickHouse service.
1. Click **Integrations**.
1. Find the CDC integration and delete it.

You can also delete an integration using the
[ServiceIntegrationDelete](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationDelete)
endpoint.

When you delete an integration:

- Replication stops.
- The existing ClickHouse tables, views, and data remain available but stop updating.
- Aiven starts removing the PostgreSQL objects associated with the integration.

Deletion is asynchronous. The request doesn't wait for all PostgreSQL cleanup operations
to finish.

If you no longer need the replicated data, delete the ClickHouse tables and views
manually.

### PostgreSQL objects created by replication

For each replication pipeline, Aiven creates and manages the following objects in the
source PostgreSQL database.

`PIPELINE_ID` is the numeric identifier of the replication pipeline.

| Object | Name | Purpose |
| --- | --- | --- |
| Publication | `aiven_cdc_PIPELINE_ID` | Lists the PostgreSQL tables selected for replication. |
| State schema | `aiven_cdc_PIPELINE_ID` | Stores replication progress. |
| Replication slot | `supabase_etl_apply_PIPELINE_ID` | Tracks ongoing changes from the PostgreSQL WAL. |
| Temporary replication slots | `supabase_etl_table_sync_PIPELINE_ID_*` | Used while copying source tables. |

Don't modify or delete these objects while the integration is active.

Aiven attempts to remove these objects when you delete the integration.

If automatic cleanup fails, for example because you deleted the ClickHouse service before
the integration, some objects might remain in PostgreSQL.

Contact [Aiven Support](https://aiven.io/support) for help removing leftover replication
objects.

<RelatedPages/>

- [Connect PostgreSQL® to Aiven for ClickHouse®](/docs/products/clickhouse/howto/integrate-postgresql)
- [Aiven for ClickHouse® service integrations](/docs/products/clickhouse/concepts/data-integration-overview)
- [Create data service integrations](/docs/platform/howto/create-service-integration)
- [Aiven for ClickHouse®](/docs/products/clickhouse)
