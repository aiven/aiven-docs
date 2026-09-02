---
title: Observability and monitoring for Aiven for PostgreSQL®
sidebar_label: Observability and monitoring
---

import RelatedPages from "@site/src/components/RelatedPages";

Monitor your Aiven for PostgreSQL® service with Grafana®, Datadog, pgwatch2, and audit
logging.

## Choose a monitoring integration

- **Grafana®**: Aiven provisions a prebuilt dashboard covering generic node metrics and
  PostgreSQL-specific metrics such as connections, cache hit rates, and vacuum activity.
  It's included with the Aiven for Metrics or Aiven for PostgreSQL integration, so it's a
  good default for most services.
- **Datadog**: Adds query-level visibility, including explain plans and query and host
  metrics correlation, through Database Monitoring. Choose this when your team already
  works in Datadog or needs to correlate PostgreSQL metrics with other services you
  monitor there.
- **pgwatch2**: An open source, self-hosted option when you want dashboards outside the
  Aiven ecosystem or need metrics from extensions that the built-in Grafana dashboard
  doesn't cover.
- **pgaudit and log formats**: Cover session and object-level audit logging and log
  formatting for external log analysis tools such as `pgbadger` or `pganalyze`, rather
  than metrics dashboards.

## Things to know

- The built-in Grafana dashboards separate **Generic** metrics, such as CPU, memory, and
  disk, from **PostgreSQL** metrics specific to the database. Don't prefix
  custom dashboard names with `Aiven`, and don't edit the default dashboard directly.
  Aiven manages dashboards with that prefix and can overwrite your changes. Copy the
  default dashboard first to customize it.
- PgBouncer metrics in Datadog require a Startup plan or higher.
- Datadog's relation and function metrics are off by default. Enabling them can produce a
  large number of Datadog custom metrics, so you choose the scope yourself instead of
  Aiven collecting everything automatically.
- Beyond `pg_stat_statements`, Aiven for PostgreSQL also offers the `pg_stat_monitor` and
  `pg_stat_plans` extensions for query and execution-plan monitoring. Enabling either
  causes a service restart, and enabling `pg_stat_monitor` makes `pg_stat_statements`
  results for utility commands unreliable while it's active.
- Some `log_line_prefix` formats include a transaction ID and query ID (`txid`, `qid`),
  which you can use to correlate log entries with rows in `pg_stat_statements` for the
  same query.

<RelatedPages/>

- [PostgreSQL® metrics exposed in Grafana®](/docs/products/postgresql/reference/pg-metrics)
- [Monitor PostgreSQL® metrics with
  Grafana®](/docs/products/postgresql/howto/report-metrics-grafana)
- [Visualize PostgreSQL® data with
  Grafana®](/docs/products/postgresql/howto/visualize-grafana)
- [Monitor a database with
  Datadog](/docs/products/postgresql/howto/monitor-database-with-datadog)
- [Collect relation and function metrics with Datadog for Aiven for
  PostgreSQL®](/docs/products/postgresql/howto/monitor-relation-function-metrics-datadog)
- [Monitor PgBouncer with Datadog for Aiven for
  PostgreSQL®](/docs/products/postgresql/howto/monitor-pgbouncer-with-datadog)
- [Monitor PostgreSQL® metrics with
  pgwatch2](/docs/products/postgresql/howto/monitor-with-pgwatch2)
- [Supported log formats](/docs/products/postgresql/reference/log-formats-supported)
- [pgaudit logging](/docs/products/postgresql/howto/list-pgaudit)
