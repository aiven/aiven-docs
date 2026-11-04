---
title: Replicate PostgreSQL® tables to Aiven for ClickHouse® using CDC
limited: true
sidebar_label: Replicate from PostgreSQL (CDC)
---

import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use change data capture (CDC) to replicate data from Aiven for PostgreSQL® to Aiven for ClickHouse® for analytics without managing your own replication tool.

The CDC integration copies selected PostgreSQL tables to ClickHouse and keeps them up to
date by replicating inserts, updates, and deletes. You can run analytical queries on the
replicated data in ClickHouse without querying the source PostgreSQL tables.

:::note[Note]
The CDC integration is in
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
:::

## Choose between CDC replication and the PostgreSQL integration

Aiven for ClickHouse offers two ways to work with PostgreSQL data: CDC replication and the
[PostgreSQL integration](/docs/products/clickhouse/howto/integrate-postgresql).

| Aspect | CDC replication | PostgreSQL integration |
| --- | --- | --- |
| Data location | Copies PostgreSQL data into ClickHouse tables. Queries run on the copied data. | Keeps data in PostgreSQL. Queries fetch data from PostgreSQL. |
| PostgreSQL load | Reads each table during the initial copy, then reads changes from the write-ahead log (WAL). | Reads data from PostgreSQL for each query. |
| Data freshness | Changes appear in ClickHouse after a short delay. See [Data freshness](#data-freshness). | Queries retrieve data directly from PostgreSQL. |
| Best for | Dashboards and analytics on large or frequently updated tables. | Occasional queries and joins involving smaller PostgreSQL tables. |

## Prerequisites

Before you set up replication, you need:

- An Aiven project with CDC access. To request access, contact your Aiven account team
  or [Aiven sales](https://aiven.io/contact).
- An Aiven for PostgreSQL service with a primary key defined on each table you want to
  replicate.
- A running Aiven for ClickHouse service on a Startup plan or higher, in the same project
  as the PostgreSQL service.
- Access to the [Aiven Console](https://console.aiven.io/), or to the
  [Aiven API](/docs/tools/api) with an
  [authentication token](/docs/platform/howto/create_authentication_token).

## Limitations

CDC replication has the following limitations:

- **Supported services:** Replication works between Aiven for PostgreSQL and Aiven for
  ClickHouse services only. External PostgreSQL databases aren't supported.
- **Number of tables:** You can replicate 1 to 400 tables per integration. Each table must
  have a primary key.
- **Integration configuration:** Each integration has one replication pipeline between one
  PostgreSQL database and one ClickHouse database. You can create only one CDC
  integration between the same PostgreSQL and ClickHouse services.
- **Database names:** The destination ClickHouse database name can have up to 40
  characters.
- **Database changes:** You can't change the source or destination database of an existing
  integration. To use a different database, delete the integration and create a new one.
  The new integration starts a new initial copy.
- **Table name conflicts:** Several PostgreSQL services can replicate into the same
  ClickHouse database. Aiven doesn't detect name conflicts across integrations, so make
  sure that generated ClickHouse table names don't overlap. For example, two integrations
  that replicate `public.orders` into the same database write to the same `public_orders`
  table.
- **Resource usage:** The replication process shares CPU and memory with the Aiven for
  ClickHouse service. Choose a plan with enough CPU and memory for both workloads.
- **Table configuration:** You can't select individual columns or change the sorting key
  or partitioning of the replicated ClickHouse tables.
- **Pausing replication:** You can't pause replication. It stops when you delete the
  integration or power off either service.
- **WAL retention:** Stopped or delayed replication increases disk usage on your
  PostgreSQL service. For more information, see
  [PostgreSQL disk usage increases](#postgresql-disk-usage-increases).

## Set up CDC replication

You can set up CDC replication from either your Aiven for PostgreSQL service or your
Aiven for ClickHouse service.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

<Tabs groupId="cdc-entry-point">
<TabItem value="postgresql" label="From PostgreSQL" default>

1. In the [Aiven Console](https://console.aiven.io/), open your project and select the
   Aiven for PostgreSQL service.
1. In the sidebar, click **Integrations**.
1. Click **Replicate to ClickHouse (CDC)**.
1. Select the destination ClickHouse service.
1. Select the destination ClickHouse database.
1. Click **Next**.
1. Select the source PostgreSQL database.
1. Select the tables to replicate. Expand a schema to view its tables.
1. Click **Start replication**.

</TabItem>
<TabItem value="clickhouse" label="From ClickHouse">

1. In the [Aiven Console](https://console.aiven.io/), open your project and select the
   Aiven for ClickHouse service.
1. In the sidebar, click **Integrations**.
1. Click **Replicate from PostgreSQL (CDC)**.
1. Select the destination ClickHouse database.
1. Click **Next**.
1. Select the source PostgreSQL service.
1. Select the source PostgreSQL database.
1. Select the tables to replicate. Expand a schema to view its tables.
1. Click **Start replication**.

</TabItem>
</Tabs>

After you click **Start replication**, the Aiven Console opens the replication page and
Aiven starts copying the selected tables to ClickHouse. As each table finishes copying,
Aiven applies ongoing changes to it.

You can query a table once it shows **Streaming** on the **Tables** tab. For more
information about tracking progress, see [Monitor replication](#monitor-replication).

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

Replace the following:

- `PROJECT_NAME`: Name of your Aiven project.
- `API_TOKEN`: Your [Aiven API token](/docs/platform/howto/create_authentication_token).
- `PG_SERVICE_NAME`: Name of the source Aiven for PostgreSQL service.
- `CLICKHOUSE_SERVICE_NAME`: Name of the destination Aiven for ClickHouse service.
- `PG_DATABASE`: Name of the source PostgreSQL database.
- `CLICKHOUSE_DATABASE`: Name of the destination ClickHouse database.

Include exactly one entry in the `pipelines` array.

The default PostgreSQL schema is `public`. Schema and table names must meet the
following rules:

- Contain letters, digits, underscores, and dollar signs.
- Start with a letter or digit.
- Don't end with an underscore.
- Have up to 63 characters.

After you create the integration, [open the replication page](#monitor-replication) in
the Aiven Console to monitor the initial copy and replication status.

</TabItem>
</Tabs>

## Query replicated data

For each PostgreSQL table, replication creates a table and a view in the destination
ClickHouse database.

The ClickHouse table name combines the PostgreSQL schema and table names with an
underscore (`_`). Aiven doubles any underscores inside the schema and table names, so
different source tables never map to the same ClickHouse name. The view name adds the
`__current` suffix to the table name.

For example:

| PostgreSQL table | ClickHouse table | ClickHouse view |
| --- | --- | --- |
| `public.orders` | `public_orders` | `public_orders__current` |
| `public.order_items` | `public_order__items` | `public_order__items__current` |

### Query current data

Query the generated `__current` view to get the latest replicated state of a PostgreSQL
table. The view returns one row per primary key and excludes deleted rows.

Querying the underlying table can return older versions of updated or deleted rows.

For example, to count orders by status, run the following query in the
[query editor](/docs/products/clickhouse/howto/query-databases#use-query-editor) or with a
ClickHouse client:

```sql
SELECT status, count()
FROM public_orders__current
GROUP BY status;
```

### Understand replicated tables

Replication stores data in tables that use the
[`ReplicatedReplacingMergeTree`](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replacingmergetree)
engine, sorted by the primary key.

When a row is updated or deleted in PostgreSQL, Aiven writes a new version of the row to
ClickHouse. Older versions can remain in the underlying table until ClickHouse merges
them in the background.

Aiven stores replication progress in PostgreSQL so that replication resumes from the last
confirmed position after a restart. After a restart, Aiven can write some changes to
ClickHouse again. The `__current` view still returns one row per primary key.

Each replicated table has two additional columns:

| Column | Description |
| --- | --- |
| `_etl_version` | Position of the change in the replication stream. |
| `_etl_deleted` | Indicates whether the row was deleted. A value of `1` represents a deleted row. |

During the initial copy or resynchronization, Aiven creates temporary tables with the
`_tmpetl_` prefix. Don't query, modify, or delete these tables.

:::warning[Warning]
Don't modify the replicated tables directly. A resynchronization replaces a table with a
newly created one. It removes any rows you insert and any changes you make using
`ALTER TABLE`, such as added indexes or projections.

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
| `oid` | `UInt32` |
| Arrays | `Array(Nullable(T))`, where `T` is the mapped element type |
| Other types | `String` |

If a PostgreSQL column allows `NULL`, the ClickHouse column uses the `Nullable` type so
it can also store `NULL`. For example, a nullable `integer` column becomes
`Nullable(Int32)`.

Columns that you add to a source table after replication starts are always `Nullable`,
even if they're `NOT NULL` in PostgreSQL.

Replication stores PostgreSQL `numeric` values as `String` to preserve precision. To use
`numeric` or `money` values in calculations, cast them to a ClickHouse decimal type.

The following query casts the `amount` column to a decimal with two digits after the
decimal point:

```sql
SELECT toDecimal128(amount, 2)
FROM public_orders__current;
```

## Monitor replication

Use the Aiven Console to monitor replication status, progress, and performance.

1. Open your Aiven for PostgreSQL or Aiven for ClickHouse service.
1. Click **Integrations**.
1. In the **Replications** section, find the CDC integration and click
   <ConsoleLabel name="actions"/> > **View**.

The **Replications** section shows the number of replicated tables and whether the
integration is connected. It doesn't show replication progress.

The replication page shows progress and has the following tabs:

- **Metrics**: Replication performance charts.
- **Tables**: Replication status for each database and each replicated table. From this
  tab you can also add or remove tables and resynchronize them.

### Replication status

The **Tables** tab shows a status for the database and for each replicated table.

The database status can be:

| Status | Description |
| --- | --- |
| **Healthy** | Replication is running and every table is streaming. |
| **In progress** | Replication is starting, or at least one table isn't streaming, for example while Aiven copies or resynchronizes it. |
| **Degraded** | At least one table has an error. Replication continues for the other tables. |
| **Failed** | The replication process failed, or every table has an error. |
| **Unknown** | Aiven can't determine the replication status. |

Each table status can be:

| Status | Description |
| --- | --- |
| **Pending** | Aiven hasn't started copying the table. |
| **Initial copy** | Aiven is copying the table. |
| **Streaming** | Aiven is applying ongoing changes to the table. |
| **Resyncing** | Aiven is copying the table again during a resynchronization. |
| **Error** | Replication stopped for the table because of an error. See [A table shows an error](#a-table-shows-an-error). |
| **Unknown** | Aiven can't determine the table status. |

### Replication metrics

On the **Metrics** tab, choose a time range of 1 hour, 1 day, 1 week, or 1 month to view
replication performance.

| Metric | Description |
| --- | --- |
| **Replication lag** | How far replication is behind PostgreSQL, in seconds. |
| **Events processed** | Number of change events processed per second. |
| **Data processed** | Amount of data processed per second, in bytes. |
| **Write-ahead log held for the pipeline** | Amount of PostgreSQL WAL data retained for replication, in bytes. |

### Data freshness

Replication collects changes in batches. It writes a batch to ClickHouse when the batch is
full or every 10 seconds, whichever comes first.

Under normal load, changes appear in ClickHouse within about 10 seconds. The actual delay
depends on the workload and replication progress.

When the PostgreSQL source is idle, there are no changes to replicate. Check source
activity together with replication lag and events processed when assessing data freshness.

## Manage replicated tables

You can add or remove tables from an existing CDC integration without creating a new
integration.

### Add or remove tables

1. Open your Aiven for PostgreSQL or Aiven for ClickHouse service.
1. Click **Integrations**.
1. In the **Replications** section, find the CDC integration and click
   <ConsoleLabel name="actions"/> > **View**.
1. Click the **Tables** tab.
1. Click **Edit**.
1. On the **Edit replication tables** page, select the tables to add and clear the tables
   to remove.
1. Click **Save**.
1. In the confirmation dialog, review the changes and confirm.

You can also change the selected tables using the
[ServiceIntegrationUpdate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationUpdate)
endpoint.

When you add a table, Aiven copies its existing data and replicates ongoing changes.

When you remove a table, replication stops for that table. Its ClickHouse table, view, and
existing data remain available, but the data stops updating.

If you no longer need the data, delete the ClickHouse table and view manually.

### Handle schema changes

Replication applies some PostgreSQL schema changes automatically. Other changes stop
replication for the affected table until you resynchronize it.

| PostgreSQL change | Result or required action |
| --- | --- |
| Add a column | Aiven adds the column after the next row change in the source table. |
| Drop a column | Aiven removes the column after the next row change in the source table. |
| Rename a table | Update the integration's table selection to replicate the renamed table. |
| Rename a column, change a column type, or make any other schema change | Replication stops for the affected table until you resynchronize it. |

### Resynchronize tables

Resynchronization copies a source PostgreSQL table again and replaces its replicated data
in ClickHouse.

Resynchronize a table when a schema change or an error stops replication for it, or to
rebuild the replicated data. For more information, see
[Handle schema changes](#handle-schema-changes) and
[Troubleshoot replication](#troubleshoot-replication).

To resynchronize tables:

1. Open your Aiven for PostgreSQL or Aiven for ClickHouse service.
1. Click **Integrations**.
1. In the **Replications** section, find the CDC integration and click
   <ConsoleLabel name="actions"/> > **View**.
1. Click the **Tables** tab.
1. Do one of the following:
   - Click **Resync** in the row of the table to resynchronize.
   - Click **Resync all tables** to resynchronize every replicated table in the database.
1. In the confirmation dialog, click **Resync**.

Aiven copies the selected tables again while the existing ClickHouse data remains
available for queries. The database status is **In progress** during the
resynchronization. When the copy finishes, Aiven replaces the existing replicated data.

:::warning[Warning]
Aiven replaces the table in more than one step. Queries running during the replacement
can fail or return incomplete data.

Plan resynchronization around applications and dashboards that depend on the affected
tables.
:::

## Troubleshoot replication

### A table shows an error

Aiven automatically retries temporary failures, such as connection interruptions and
service restarts. You don't need to take any action. For more information about what
happens after a restart, see
[Understand replicated tables](#understand-replicated-tables).

An unsupported schema change or another error stops replication only for the affected
table. Other tables continue replicating.

To recover:

1. Open your Aiven for PostgreSQL or Aiven for ClickHouse service.
1. Click **Integrations**.
1. In the **Replications** section, find the CDC integration and click <ConsoleLabel name="actions"/> > **View**.
1. Click the **Tables** tab.
1. Find the table that shows the **Error** status.
1. Resolve the cause of the error if you know it. For schema changes, see
   [Handle schema changes](#handle-schema-changes).
1. Click **Resync** in the row of the affected table.
   For more information, see [Resynchronize tables](#resynchronize-tables).

If the error remains after the resynchronization, contact
[Aiven Support](https://aiven.io/support).

### Replication can't resume from its previous position

Replication uses a PostgreSQL replication slot to track changes.

If the slot no longer exists, for example after a failover that doesn't preserve it,
replication can't resume from its previous position. Aiven reports an error rather than
skipping changes.

Resynchronize all tables in the integration to restore replication.

### PostgreSQL disk usage increases

Replication reads changes from the PostgreSQL WAL. PostgreSQL retains WAL data until
replication confirms that it has processed the changes.

WAL usage can increase in the following cases:

- Replication can't write data to ClickHouse.
- Replication falls behind a high volume of PostgreSQL writes.

Monitor the **Write-ahead log held for the pipeline** metric and the disk usage of your
PostgreSQL service. Use the **Replication lag** metric to find delays. For more
information, see [Replication metrics](#replication-metrics).

If you no longer need the integration, delete it to release the WAL retained for the
replication pipeline.

:::warning[Warning]
Powering off the ClickHouse service stops replication but doesn't remove the PostgreSQL
replication slot. PostgreSQL can continue retaining WAL data until replication resumes or
you delete the integration.
:::

## Delete a CDC integration

Delete a CDC integration when you no longer need to replicate changes from PostgreSQL to
ClickHouse.

When you delete an integration:

- Replication stops.
- The existing ClickHouse tables, views, and data remain available but stop updating.
- Aiven starts removing the
  [PostgreSQL objects created by replication](#postgresql-objects-created-by-replication)
  in the background. The delete request doesn't wait for the cleanup to finish.

:::note[Note]
If you also plan to delete the Aiven for ClickHouse service, delete the integration first.
:::

1. Open your Aiven for PostgreSQL or Aiven for ClickHouse service.
1. Click **Integrations**.
1. In the **Replications** section, find the CDC integration and click
   <ConsoleLabel name="actions"/> > **Disconnect**.

You can also delete an integration using the
[ServiceIntegrationDelete](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationDelete)
endpoint.

If you no longer need the replicated data, delete the ClickHouse tables and views
manually.

## PostgreSQL objects created by replication

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

After you delete the integration, Aiven tries to remove these objects. Automatic cleanup
fails in the following cases:

- You delete the Aiven for ClickHouse service before the integration.
- The PostgreSQL service is unreachable for more than 5 minutes after you delete
  the integration.

Leftover replication slots can make PostgreSQL retain WAL data and increase disk usage.
To remove leftover objects,
[remove the PostgreSQL objects manually](#remove-the-postgresql-objects-manually) or
contact [Aiven Support](https://aiven.io/support).

### Remove the PostgreSQL objects manually

:::warning[Warning]
These commands permanently remove replication slots, a publication, and a schema. Run
them only for a pipeline whose integration no longer exists.
:::

1. [Connect to the PostgreSQL database](/docs/products/postgresql/howto/connect-psql) as
   the `avnadmin` user.
1. Find the leftover replication pipelines:

   ```sql
   SELECT pubname FROM pg_publication WHERE pubname LIKE 'aiven\_cdc\_%';
   ```

1. For each pipeline that no longer has an integration, drop its replication slots,
   publication, and schema:

   ```sql
   SELECT pg_drop_replication_slot(slot_name)
   FROM pg_replication_slots
   WHERE NOT active
     AND (slot_name = 'supabase_etl_apply_PIPELINE_ID'
       OR slot_name LIKE 'supabase\_etl\_table\_sync\_PIPELINE_ID\_%');
   DROP PUBLICATION IF EXISTS aiven_cdc_PIPELINE_ID;
   DROP SCHEMA IF EXISTS aiven_cdc_PIPELINE_ID CASCADE;
   ```

   Replace `PIPELINE_ID` with the number from the publication name.

<RelatedPages/>

- [Connect PostgreSQL® to Aiven for ClickHouse®](/docs/products/clickhouse/howto/integrate-postgresql)
- [Aiven for ClickHouse® service integrations](/docs/products/clickhouse/concepts/data-integration-overview)
- [Create data service integrations](/docs/platform/howto/create-service-integration)
- [Aiven for ClickHouse®](/docs/products/clickhouse)
