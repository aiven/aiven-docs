---
title: Observability and monitoring for Aiven for PostgreSQL®
sidebar_label: Observability and monitoring
---

import RelatedPages from "@site/src/components/RelatedPages";

Monitor your Aiven for PostgreSQL® service with Grafana®, Datadog, pgwatch2, and audit
logging.

## Choose a monitoring integration

- **[Grafana®](/docs/products/postgresql/howto/report-metrics-grafana)**: Comes with a
  dashboard Aiven builds and maintains for you, so it's the option with the least setup.
  Use the [reference page](/docs/products/postgresql/reference/pg-metrics) to see
  whether it already shows the metric you need before reaching for another integration.
- **[Datadog](/docs/products/postgresql/howto/monitor-database-with-datadog)**: The right
  choice when your team already works in Datadog for other services and wants PostgreSQL
  metrics correlated with them in the same place, rather than in a separate dashboard.
- **[pgwatch2](/docs/products/postgresql/howto/monitor-with-pgwatch2)**: An open source
  option you run yourself, outside the Aiven ecosystem, for teams that don't want a
  dependency on Aiven's own dashboards or Datadog.
- **[pgaudit logging](/docs/products/postgresql/howto/list-pgaudit)**: Unlike the other
  three, this isn't a metrics dashboard. It and [log
  formats](/docs/products/postgresql/reference/log-formats-supported) cover textual,
  audit-oriented records for compliance and external log tools instead.

## Things to know

- Datadog treats PostgreSQL monitoring as separate, independently enabled pieces rather
  than one setting: Database Monitoring itself, [relation and function
  metrics](/docs/products/postgresql/howto/monitor-relation-function-metrics-datadog),
  and [PgBouncer connection pool
  metrics](/docs/products/postgresql/howto/monitor-pgbouncer-with-datadog) each need
  their own configuration step on top of the base Datadog Metrics integration.
- Beyond `pg_stat_statements`, Aiven for PostgreSQL also offers the `pg_stat_monitor` and
  `pg_stat_plans` extensions for query and execution-plan monitoring. Enabling either
  causes a service restart, and enabling `pg_stat_monitor` makes `pg_stat_statements`
  results for utility commands unreliable while it's active.
- Some `log_line_prefix` formats include a transaction ID and query ID (`txid`, `qid`),
  which you can use to correlate log entries with rows in `pg_stat_statements` for the
  same query.

<RelatedPages/>

- [Monitor PostgreSQL® metrics with
  Grafana®](/docs/products/postgresql/howto/report-metrics-grafana)
- [Monitor a database with
  Datadog](/docs/products/postgresql/howto/monitor-database-with-datadog)
- [Monitor PostgreSQL® metrics with
  pgwatch2](/docs/products/postgresql/howto/monitor-with-pgwatch2)
- [pgaudit logging](/docs/products/postgresql/howto/list-pgaudit)
