---
title: Collect relation and function metrics with Datadog for Aiven for PostgreSQL®
sidebar_label: Relation and function metrics in Datadog
---

import RelatedPages from "@site/src/components/RelatedPages";

Configure the Datadog Metrics integration to collect per-table and per-index statistics, and per-function call statistics for PL/pgSQL functions, for your Aiven for PostgreSQL® service.

Both options are off by default. Datadog bills relation and function metrics as custom
metrics, and a single integration can produce many of them, so you opt in and choose the
scope yourself.

## Prerequisites

- Apply any outstanding maintenance updates mentioning the Datadog integration.
- The [Datadog Metrics integration](/docs/integrations/datadog/datadog-metrics) is enabled
  for the service.
- For function metrics only: the `track_functions` parameter is set to `pl` or `all` in
  your service's advanced configuration. Without it, PostgreSQL collects no function
  statistics, and `datadog_function_metrics_enabled` has no effect.

## Find the integration ID

Both settings apply to a specific Datadog Metrics integration. Find its ID by running the
[avn service integration-list](/docs/tools/cli/service/integration#avn_service_integration_list)
command:

```bash
avn service integration-list --project PROJECT_NAME SERVICE_NAME
```

Use the `service_integration_id` value from the output as `INTEGRATION_ID` in the
following commands.

## Collect relation metrics

Set `datadog_pg_relations` to the relations you want metrics for. Each entry selects
relations either by exact name or by regular expression:

```bash
avn service integration-update --project PROJECT_NAME \
   --user-config-json '{
      "datadog_pg_relations": [
         {"relation_name": "orders", "schemas": ["public"]},
         {"relation_regex": "^events_.*", "schemas": ["public", "analytics"]}
      ]
   }' \
   INTEGRATION_ID
```

Each entry accepts the following fields.

| Field | Description |
| --- | --- |
| `relation_name` | Name of a single relation, up to 63 characters. |
| `relation_regex` | Regular expression matching relation names, up to 128 characters. |
| `schemas` | Restricts the entry to these schemas, up to 8. Applies to all schemas when unset. |
| `relkind` | Relation kinds that **lock** metrics cover. Applies to ordinary tables when unset. |

Set exactly one of `relation_name` or `relation_regex` on each entry. Setting both,
setting neither, or using a regular expression that doesn't compile fails validation when
you save the configuration. `relation_name` and each entry in `schemas` must start with a
letter, a digit, or an underscore, and can otherwise contain only letters, digits,
underscores, and dollar signs.

`relkind` takes PostgreSQL `pg_class` relation kinds and affects lock metrics only. Other
relation metrics follow the name or regular expression match regardless of `relkind`.

| Value | Relation kind |
| --- | --- |
| `r` | Ordinary table |
| `i` | Index |
| `S` | Sequence |
| `t` | TOAST table |
| `m` | Materialized view |
| `c` | Composite type |
| `f` | Foreign table |
| `p` | Partitioned table |

You can configure up to 32 entries in `datadog_pg_relations`, each restricted to at most
8 schemas.

## Collect function metrics

Requires `track_functions` set to `pl` or `all` on the service, as described in
[Prerequisites](#prerequisites).

```bash
avn service integration-update --project PROJECT_NAME \
   --user-config-json '{"datadog_function_metrics_enabled": true}' \
   INTEGRATION_ID
```

To confirm PostgreSQL is tracking functions before checking Datadog, connect to your
database and run the following query:

```sql
SELECT funcname, calls FROM pg_stat_user_functions;
```

An empty result means `track_functions` is off, or the functions aren't written in
PL/pgSQL. With `track_functions` set to `pl`, only PL/pgSQL functions are counted. Set it
to `all` to also count SQL and C functions, at a higher overhead.

## Verify the configuration

```bash
avn service integration-list SERVICE_NAME \
   --project PROJECT_NAME \
   --json | jq '.[] | select(.integration_type=="datadog").user_config'
```

Updates merge into the existing configuration, so settings you don't mention are
preserved. `datadog_pg_relations` is replaced as a whole and not appended to, so send the
complete list every time you change it.

## Metrics collected

With relations configured, Datadog reports per-relation metrics including table size,
index scans, index rows read and fetched, index blocks hit and read, live and dead row
counts, time since the last autovacuum and autoanalyze operations, and lock counts. Each
metric is tagged with the relation name.

With function metrics enabled, Datadog reports call counts, and total and self execution
time, for each PL/pgSQL function, tagged with the function name.

Find these metrics in Datadog's Metrics Explorer under the `postgresql.` prefix.

<RelatedPages/>

- [Database monitoring with Datadog](/docs/products/postgresql/howto/monitor-database-with-datadog)
- [Monitor PgBouncer with Datadog](/docs/products/postgresql/howto/monitor-pgbouncer-with-datadog)
- [Datadog and Aiven](/docs/integrations/datadog)
- [PostgreSQL® metrics exposed in Grafana®](/docs/products/postgresql/reference/pg-metrics)
