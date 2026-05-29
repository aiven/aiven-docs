---
title: Query Kafka topic data in Aiven for ClickHouse®
sidebar_label: Query Kafka topic data
---

import RelatedPages from "@site/src/components/RelatedPages";

Query Kafka topic data in Aiven for ClickHouse® by connecting an Aiven for Apache Kafka® topic to a ClickHouse table.
Use this managed setup to store Kafka topic data in ClickHouse and analyze live or
historical event data with SQL, without manually creating a Kafka engine table,
materialized view, or destination ClickHouse table.

To set up the integration in the Aiven Console, see
[Set up Kafka topic querying in Aiven for ClickHouse®](/docs/products/clickhouse/howto/set-up-kafka-topic-querying).

## When to use it

Query Kafka topic data when you want to:

- Analyze live or historical Kafka topic data using SQL.
- Build dashboards or reports from Kafka topic data stored in ClickHouse.
- Reduce the manual setup required to ingest Kafka data into ClickHouse.

## How it works

When you connect a Kafka topic to ClickHouse, Aiven creates a managed integration
between the two services. The setup uses the selected Kafka topic as the source and
writes the data to a destination ClickHouse table that uses the MergeTree engine.

You can start the setup from a Kafka topic in the Aiven Console. During setup, select an
existing ClickHouse service or create one, then review and edit the schema and table
configuration before deployment.

### Schema mapping

Automated schema mapping is available for Avro messages with Aiven for Apache Kafka®
Schema Registry. The schema must be registered using the topic name strategy, such as
`<topic-name>-value`.

When a compatible Avro schema is available, Aiven maps the Avro fields to ClickHouse
column types and shows them in the schema preview.

Before deployment, you can review the mapped columns. If Aiven cannot find a compatible
Avro schema, you can define the ClickHouse table columns during setup.

### Ingestion start point

During setup, choose whether ingestion starts from new messages only or from an earlier
point in the topic, when available.

If you start from new messages only, Aiven ingests messages produced after you deploy the
setup. If you start from an earlier point, Aiven includes existing topic data based on the
start point you select.

### Managed ClickHouse resources

Kafka topic data ingestion uses the ClickHouse Kafka table engine.

Aiven creates and manages the Kafka engine table, materialized view, and destination
ClickHouse table. This reduces the manual setup required to store Kafka topic data in
ClickHouse. You query the destination table in ClickHouse and do not need to create the
ingestion pipeline manually.

## Query data in ClickHouse

After the setup is deployed and data starts flowing, query the destination table using
ClickHouse SQL. You can use the table for real-time analytics, operational dashboards,
event analysis, historical reporting, and high-volume log or metrics analysis.

## Limitations

- The Kafka service and the ClickHouse service must be in the same cloud region to
  reduce network latency and data transfer costs.
- If data does not appear in the destination table after deployment, check the ClickHouse
  service logs for ingestion errors.
- Failed messages are not sent to a dead letter queue by default. To change this, set
  `handle_error_mode` to `dead_letter_queue` in the Kafka engine advanced configuration. In
  the Aiven Console, this setting is available under **Databases and tables**.
- You cannot change some table settings, such as the sorting key, after table creation.
- Automated schema mapping is available only for Avro messages with Aiven for Apache
  Kafka® Schema Registry when the schema is registered using the topic name strategy,
  such as `<topic-name>-value`. Without a compatible Avro schema, define ClickHouse
  columns during setup.
- Automatic schema evolution is not supported. If the Kafka topic schema changes, the
  ClickHouse resources might need to be updated manually or the integration might need to
  be recreated. New Avro fields are ignored unless matching columns are added to the
  ClickHouse table. Removed or incompatible fields can cause ingestion errors.
- The integration is not available for free and developer tier Aiven for Apache Kafka®
  services.

<RelatedPages/>

- [Set up Kafka topic querying in Aiven for ClickHouse®](/docs/products/clickhouse/howto/set-up-kafka-topic-querying)
- [Connect Apache Kafka® to Aiven for ClickHouse®](/docs/products/clickhouse/howto/integrate-kafka)
