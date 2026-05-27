---
title: Query Kafka topic data in Aiven for ClickHouse®
sidebar_label: Query Kafka topic data
---

import RelatedPages from "@site/src/components/RelatedPages";

Query Kafka topic data in Aiven for ClickHouse® by connecting an Aiven for Apache Kafka® topic.
Analyze live or historical event data with SQL without manually creating a Kafka engine
table, materialized view, or destination ClickHouse table.

To set up the integration in the Aiven Console, see
[Set up Kafka topic querying in Aiven for ClickHouse®](/docs/products/clickhouse/howto/query-kafka-topic-data).

## When to use it

Query Kafka topic data when you want to:

- Run SQL queries against live or historical event data from a Kafka topic.
- Build dashboards from Kafka topic data.
- Store event data in ClickHouse for analytics or reporting.
- Replace a manually configured Kafka-to-ClickHouse ingestion setup with a managed setup.

## How it works

When you connect Kafka topic data to ClickHouse, Aiven creates a managed integration
between the Kafka service and the ClickHouse service. The setup uses the selected Kafka
topic as the source and a destination MergeTree table in ClickHouse.

Automated schema mapping requires Avro messages and Aiven for Apache Kafka® Schema
Registry. Aiven reads the schema from Schema Registry using the topic name strategy and
maps the fields to ClickHouse column types.

During setup, you can review and edit the suggested schema and table configuration before
deployment. If Aiven cannot find a compatible schema, define the ClickHouse table columns
manually.

You can start the setup from the Aiven Console. The available entry points can vary
depending on your service configuration.

## Ingestion and the Kafka table engine

Kafka topic data ingestion uses the ClickHouse Kafka table engine, which is also used in
[manual Kafka integration](/docs/products/clickhouse/howto/integrate-kafka).

Aiven creates and manages the Kafka engine table, materialized view, and destination
MergeTree table. You query the MergeTree table in ClickHouse and do not need to create
the ingestion pipeline manually.

## Choose where ingestion starts

During setup, you can choose whether ingestion starts from new messages only or from an
earlier point in the topic, when available.

If you start from new messages only, Aiven ingests messages produced after you deploy the
setup.

If you start from an earlier point, Aiven includes existing topic data based on the
selected start point.

## Limitations

- The Kafka service and the ClickHouse service must be in the same cloud region.
- If data does not appear in the destination table after deployment, check the ClickHouse
  service logs for ingestion errors.
- Failed messages are not sent to a separate dead letter queue.
- You cannot change some table settings, such as the sorting key, after table creation.
- Automated schema mapping requires Avro messages and Aiven for Apache Kafka® Schema
  Registry using the topic name strategy. Without a compatible schema, define ClickHouse
  columns manually or use
  [manual Kafka integration](/docs/products/clickhouse/howto/integrate-kafka).
- Automatic schema evolution is not supported. If the Kafka topic schema changes, the
  ClickHouse resources might need to be updated manually or the integration might need to
  be recreated. New Avro fields are ignored unless matching columns are added to the
  ClickHouse table. Removed or incompatible fields can cause ingestion errors.
- High-throughput topics can generate additional network transfer costs if the Kafka and
  ClickHouse services run in different availability zones.

<RelatedPages/>

- [Set up Kafka topic querying in Aiven for ClickHouse®](/docs/products/clickhouse/howto/query-kafka-topic-data)
- [Connect Apache Kafka® to Aiven for ClickHouse®](/docs/products/clickhouse/howto/integrate-kafka)
