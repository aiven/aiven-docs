---
title: Query Kafka topic data in Aiven for ClickHouse®
sidebar_label: Query Kafka topic data
---

Query Kafka topic data in Aiven for ClickHouse® by connecting a topic from Aiven for Apache Kafka®.
Analyze live or historical event data with SQL without managing Kafka-to-ClickHouse ingestion
yourself.

This feature provides a managed setup for querying topic data in ClickHouse. For manual Kafka
engine integration, see
[Connect Apache Kafka® to Aiven for ClickHouse®](/docs/products/clickhouse/howto/integrate-kafka).

## When to use it

Use this feature to:

- Run SQL queries against live or historical event data from a Kafka topic.
- Build dashboards from Kafka topic data.
- Store event data in ClickHouse for analytics or reporting.
- Replace a manually configured Kafka-to-ClickHouse ingestion setup with a managed setup.
- Offload analytical workloads from a transactional database to ClickHouse.

## How it works

When you connect Kafka topic data to ClickHouse, Aiven creates an ingestion setup
between the Kafka service and the ClickHouse service. The setup uses the selected Kafka
topic as the source and a ClickHouse table as the destination.

Aiven suggests a ClickHouse table schema based on the Kafka topic data. It uses
Aiven for Apache Kafka® Schema Registry when available, or samples topic messages if no
schema is available.

During setup, you can review the suggested schema and table configuration before
deployment. You do not need to define each column and data type manually in ClickHouse.

After you confirm the setup, Aiven creates the required ClickHouse resources for
ingestion, such as a Kafka engine table, materialized view, and destination MergeTree table.

You can start the setup from the Aiven Console. The available entry points can vary
depending on your service configuration.

## Data ingestion start point

During setup, you can choose whether ingestion starts from new messages only or from an
earlier point in the topic, when available.

If you start from new messages only, Aiven ingests messages produced after you deploy the
setup.

If you start from an earlier point, Aiven includes existing topic data based on the
selected start point.

## Limitations

- The Kafka service and the ClickHouse service must be in the same cloud region.
- You cannot change some table settings, such as the sorting key, after table creation.
- Automatic schema evolution is not supported. If the Kafka topic schema changes, update
  the ClickHouse table manually to keep it compatible, and verify that ingestion
  continues.
- High-throughput topics can generate additional network transfer costs if the Kafka and
  ClickHouse services run in different availability zones.
