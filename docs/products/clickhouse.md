---
title: Aiven for ClickHouse®
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for ClickHouse® is a fully managed distributed columnar database service based on the open source ClickHouse engine.
It is designed for online analytical processing (OLAP), data warehousing, and real-time
analytics that require fast SQL queries on large datasets.

ClickHouse is optimized for analytical workloads. Unlike transactional (OLTP) databases
that prioritize frequent row-level updates, ClickHouse is built for complex read queries
and large-scale aggregations across millions or billions of rows.

ClickHouse uses a columnar storage model. Data is stored by column instead of by row,
so queries read only the columns required for a specific operation. This reduces disk
I/O, improves compression efficiency, and accelerates aggregation queries. For more on
how ClickHouse indexes and processes data, see [Indexing and data processing](/docs/products/clickhouse/concepts/indexing).

Aiven manages infrastructure, configuration, upgrades, and maintenance so you can focus
on working with your data.

## When to use Aiven for ClickHouse®

Aiven for ClickHouse is suitable for workloads such as:

- Event and log analytics
- Time-series data analysis
- Reporting and dashboards
- Large-scale aggregations
- Real-time analytics pipelines
- Data warehousing

These workloads typically involve fewer updates and more large read and aggregation
operations. Aiven for ClickHouse is not intended for high-frequency transactional
applications that require frequent row-level updates.

## Service management

Aiven provisions and manages your ClickHouse cluster, including:

- Service provisioning
- Cluster configuration
- Software updates
- Infrastructure maintenance

Each service runs as a distributed, fault-tolerant cluster. Configuration defaults are
applied based on the selected service plan.

## Scalability

You can scale your service as data volume and query requirements grow:

- Scale vertically by changing the service plan
- Scale horizontally using shards and distributed tables

Aiven supports rolling maintenance updates. You can configure maintenance windows to
control when updates occur.

For more information, see:

- [Scale services](/docs/platform/howto/scale-services)
- [Use shards with distributed tables](/docs/products/clickhouse/howto/use-shards-with-distributed-table)

## Backups and recovery

Aiven for ClickHouse includes automatic backups. Backup retention depends on the selected
service plan.

You can restore a service from a backup or fork a service to create a new independent
service from the latest backup. Forking is useful for testing upgrades, schema changes,
or performance validation.

For details, see [Service forking](/docs/platform/concepts/service-forking).

## Monitoring

Aiven provides service metrics and logs.

You can integrate with:

- Aiven for Grafana®
- Aiven for Metrics
- Aiven for OpenSearch®
- Prometheus
- AWS CloudWatch
- Google Cloud Logging

For details, see [Monitor Aiven for ClickHouse metrics](/docs/products/clickhouse/howto/monitor-performance).

## Security and network access

Each service runs on isolated infrastructure.

The Aiven platform supports:

- TLS-encrypted connections
- VPC peering
- PrivateLink connectivity

For configuration steps, see [Secure a managed ClickHouse® service](/docs/products/clickhouse/howto/secure-service).

## Automation

You can manage Aiven for ClickHouse using:

- [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
- [Aiven CLI](/docs/tools/cli)
- [Aiven API](/docs/tools/api)

Most operations available in the Aiven Console are also available through the CLI and API.

<!-- vale off -->
<RelatedPages/>
<!-- vale on -->

- [Aiven.io](https://aiven.io/clickhouse)
