---
title: Aiven for ClickHouse® data service integration
sidebar_label: Data integration
---

Aiven for ClickHouse® supports different types of integration allowing you to efficiently
connect with other services or data sources and access the data to be processed.

There are a few ways of classifying integration types supported in Aiven for ClickHouse:
[by purpose](/docs/products/clickhouse/concepts/data-integration-overview#observability-integrations-vs-data-source-integrations),
[by scope](/docs/products/clickhouse/concepts/data-integration-overview#managed-credentials-integration),
or
[by location](/docs/products/clickhouse/concepts/data-integration-overview#in-aiven-integrations-vs-external-integrations).

## Observability integrations vs data source integrations

Aiven for ClickHouse supports observability integrations and data source integrations,
which have different purposes:

- [Observability integrations](/docs/products/clickhouse/howto/list-integrations):
  connecting to other services (either in-Aiven or external) to expose and process logs
  and metrics
- Data service integrations: connecting to other services (either in-Aiven or external) to
use them as data sources

## In-Aiven integrations vs external integrations

By enabling data service integrations, you create streaming data pipelines across
services. Depending on where the services are located, you can have either in-Aiven
integrations (between Aiven services) or external integrations (between an Aiven service
and an external data source or application).

For integrating with external data sources, Aiven for ClickHouse provides two types of
data service integrations:

- Managed databases
- Managed credentials

## Managed credentials integration {#managed-credentials-integration}

The managed credentials integration uses the
[ClickHouse named collections](https://clickhouse.com/docs/en/operations/named-collections)
logic. It allows storing key-value pairs that are to be used as credentials when
connecting to external data sources. With the managed credentials integration enabled,
querying data is easier, quicker, since you no longer need connections parameters in each
query. They are stored and available from in-Aiven credential storage.

On top of integrating credentials, the managed credentials integration allows integrating
data from external sources. For that purpose, you create tables using table engines.

:::note[See also]
For information on how table engines work in Aiven for ClickHouse services, preview
[Engines: database and table](/docs/products/clickhouse/concepts/service-architecture#engines-database-and-table).
For the list of table engines available in Aiven for ClickHouse, check
[Supported table engines](/docs/products/clickhouse/reference/supported-table-engines).
:::

## Managed databases integration {#managed-databases-integration}

The managed databases integration allows using a database engine for handling your
external data. When enabled, this type of integration provides you with an automatically
created database, where you can have your data ingested.

:::note
External PostgreSQL® data sources (endpoints) support both the managed credentials and the
managed databases.
:::

:::note[See also]
For information on how database engines work in Aiven for ClickHouse services, preview
[Engines: database and table](/docs/products/clickhouse/concepts/service-architecture#engines-database-and-table).
For more information on ClickHouse database engines, see
[Database engines](https://clickhouse.com/docs/en/engines/database-engines).
:::

## Limitations

- Aiven for ClickHouse supports data service integrations with Apache Kafka® and
PostgreSQL®, both in-Aiven and external.
- You can set up the managed credentials integration with external PostgreSQL and MySQL
data stores only.
- External PostgreSQL data sources (endpoints) support both the managed credentials and
the managed databases.
- External MySQL data sources (endpoints) support the managed credentials integration
only.

## Related pages

- [Set up Aiven for ClickHouse® data service integration](/docs/products/clickhouse/howto/data-service-integration)
- [Manage Aiven for ClickHouse® integration databases](/docs/products/clickhouse/howto/integration-databases)
- [Integrate your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/list-integrations)
