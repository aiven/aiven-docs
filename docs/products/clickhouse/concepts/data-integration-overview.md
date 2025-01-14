---
title: Aiven for ClickHouse® service integrations
sidebar_label: Integrations
keywords: [data service integration, data source integration, managed credentials integration, managed databases integration, named collections]
---

import {ConsoleIcon} from "@site/src/components/non-swizzled/ConsoleIcons";

Aiven for ClickHouse® supports different types of integration allowing you to efficiently connect with other services or data sources and access the data to be processed.

There are a few ways of classifying integration types supported in Aiven for ClickHouse:

- [By purpose](/docs/products/clickhouse/concepts/data-integration-overview#observability-integrations-vs-data-source-integrations):
  observability integration vs data source integration
- [By location](/docs/products/clickhouse/concepts/data-integration-overview#integrations-between-aiven-managed-services-vs-external-integrations):
  integration between Aiven-managed services vs external integration (between an
  Aiven-managed service and an external service)
- By scope: [managed databases integration](/docs/products/clickhouse/concepts/data-integration-overview#managed-databases-integration) and
  [managed credentials integration](/docs/products/clickhouse/concepts/data-integration-overview#managed-credentials-integration)

## Observability integrations vs data source integrations

Aiven for ClickHouse supports observability integrations and data source integrations,
which have different purposes:

- [Observability integration](/docs/products/clickhouse/howto/list-integrations) is
  connecting to other services (either Aiven-managed or external ones) to expose and
  process logs and metrics.
- Data service integration is connecting to other services (either Aiven-managed or external)
  to use them as data sources. In Aiven for ClickHouse, data service integration is
  possible with the following data source types:

  - Apache Kafka®
  - PostgreSQL®
  - MySQL®
  - ClickHouse®
  - Amazon S3®

## Integrations between Aiven-managed services vs external integrations

By enabling data service integrations, you create streaming data pipelines across
services. Depending on where the services are located, you can have either
integrations between Aiven-managed services or external integrations (between an Aiven service
and an external data source or application).

## Data source integrations

For integrating with external data sources, Aiven for ClickHouse provides two types of
data service integrations:

- [Managed databases](/docs/products/clickhouse/concepts/data-integration-overview#managed-databases-integration)
- [Managed credentials](/docs/products/clickhouse/concepts/data-integration-overview#managed-credentials-integration)

### Managed credentials integration

The managed credentials integration uses the
[ClickHouse named collections](https://clickhouse.com/docs/en/operations/named-collections)
logic. It allows storing key-value pairs that are to be used as credentials when
connecting to external data sources. To integrate data, you create tables using table
engines. With the managed credentials integration enabled,
querying the data is easier and quicker since you no longer need connections parameters in
each query. They are stored and available from credential storage in Aiven.

Managed credentials integration in Aiven for ClickHouse is supported with the following
data source types:

- PostgreSQL®
- MySQL®
- ClickHouse®
- Amazon S3®

:::important
The managed credentials integration works one-way: It allows to integrate with data source
and access your data from Aiven for ClickHouse, but it doesn’t allow to access Aiven for
ClickHouse data from the integrated data source.
:::

For information on how table engines work in Aiven for ClickHouse services, preview
[Engines: database and table](/docs/products/clickhouse/concepts/service-architecture#engines-database-and-table).
For the list of table engines available in Aiven for ClickHouse, check
[Supported table engines](/docs/products/clickhouse/reference/supported-table-engines).

### Managed databases integration

The managed databases integration allows using a database engine for handling your
external data. When enabled, this type of integration provides you with an automatically
created database, where the remote data is exposed.

Managed databases integration in Aiven for ClickHouse is supported with the following
data source types:

- PostgreSQL®
- Apache Kafka®

For information on how database engines work in Aiven for ClickHouse services, preview
[Engines: database and table](/docs/products/clickhouse/concepts/service-architecture#engines-database-and-table).
For more information on ClickHouse database engines, see
[Database engines](https://clickhouse.com/docs/en/engines/database-engines).

### Supported data source types

Depending on a data source type, Aiven for ClickHouse supports different integration modes.

| Data source type   | Data source integration<br/>(with Aiven service <br/>or external source)| Managed databases integration| Managed credentials integration |
|--------------------|----------------------------|------------------------------|---------------------------------|
| PostgreSQL         | <ConsoleIcon name="tick"/> | <ConsoleIcon name="tick"/>   | <ConsoleIcon name="tick"/>      |
| MySQL              | <ConsoleIcon name="tick"/> | <ConsoleIcon name="cross"/>  | <ConsoleIcon name="tick"/>      |
| Apache Kafka       | <ConsoleIcon name="tick"/> | <ConsoleIcon name="tick"/>   | <ConsoleIcon name="cross"/>     |
| ClickHouse         | <ConsoleIcon name="tick"/> | <ConsoleIcon name="cross"/>  | <ConsoleIcon name="tick"/>      |
| Amazon S3          | <ConsoleIcon name="tick"/> | <ConsoleIcon name="cross"/>  | <ConsoleIcon name="tick"/>      |
| Azure Blob Storage | <ConsoleIcon name="tick"/> | <ConsoleIcon name="cross"/>  | <ConsoleIcon name="tick"/>      |

## Data flow and residency in integrations

### How data is pulled in and distributed

If you integrate a multi-node Aiven for ClickHouse service with another Aiven-managed
service or an external endpoint, one of the Aiven for ClickHouse service nodes connects
to the other integrating entity. If the data that is read from this entity is persisted in
the Aiven for ClickHouse service, this data is replicated across all the nodes in the
cluster.

### Where data resides upon integration

When you integrate Aiven for ClickHouse with another Aiven-managed service or an external
endpoint, by default, data resides outside the Aiven for ClickHouse service in its original
source. Queries aggregate data across sources, and the integrated data is accessed as
needed in real-time or near-real-time.

## Related pages

- [Set up Aiven for ClickHouse® data service integration](/docs/products/clickhouse/howto/data-service-integration)
- [Manage Aiven for ClickHouse® integration databases](/docs/products/clickhouse/howto/integration-databases)
- [Integrate your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/list-integrations)
