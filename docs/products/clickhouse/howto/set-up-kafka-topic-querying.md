---
title: Set up Kafka topic querying in Aiven for ClickHouse®
sidebar_label: Set up Kafka topic querying
description: Send data from an Aiven for Apache Kafka® topic to Aiven for ClickHouse® and query it with SQL.
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Send data from an Aiven for Apache Kafka® topic to Aiven for ClickHouse® and query it with SQL.

Aiven creates a Kafka-to-ClickHouse integration for the selected topic and opens the
ClickHouse query editor with a generated query.

For more information about how the integration works, supported schemas, ingestion
start points, schema changes, and limitations, see
[Query Kafka topic data in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/query-kafka-topic-data).

## Prerequisites

Before you begin, make sure you have:

- An Aiven for Apache Kafka® service with at least one topic.
- An Aiven for ClickHouse® service on the same cloud provider as the Kafka service, or
  permission to create one during setup.
- Optional: [Karapace Schema Registry](/docs/products/kafka/karapace/howto/enable-karapace)
  enabled with Avro, if you want ClickHouse columns to be auto-detected from the topic
  schema.

:::note
Query Kafka topic data is not available for every cloud provider.
:::

## Send topic data to ClickHouse

### Step 1: Start from a Kafka topic

1. In the [Aiven Console](https://console.aiven.io), select your Aiven for Apache Kafka®
   service.
1. Click <ConsoleLabel name="topics" />.
1. Click the topic name to open the topic info panel.
1. Start the setup in one of the following ways:

   - If the topic has no active ClickHouse table integration, in
     **Analyze your data in minutes**, click **Query in ClickHouse**.
   - To add another ClickHouse table integration, in **ClickHouse tables**, click
     **Add table**.

### Step 2: Choose a ClickHouse service

Choose the Aiven for ClickHouse® service to receive the topic data.

To use an existing service:

1. Choose an Aiven for ClickHouse® service with the **Running** status.
1. Click **Continue**.

To create a service during setup:

1. Click **Create ClickHouse service**.
1. Enter a service name.
1. Choose a service plan.
1. Click **Create**.

If you need more configuration options, click **Go to the full service creation**.

### Step 3: Configure the ClickHouse table

1. Choose where ingestion starts in the Kafka topic.

   You can send all messages from the first offset, only new messages, or messages from
   a recent time range. The available options depend on your topic and service
   configuration.

1. Configure the table schema:

   - **If the Console detects a schema:** Review the schema preview. The Console maps the
     schema fields to suggested ClickHouse column names and data types.

   - **If the Console does not detect a schema:** Add the ClickHouse columns manually.
     Enter each column name, choose the ClickHouse data type, and set **Nullable** as
     needed.

1. Optional: If Aiven suggested a schema, enable **Override column definitions** and
   update the columns.

1. In **Order by**, choose the column used to sort the ClickHouse table.

   :::important
   You cannot change the **Order by** column after the table is created.
   :::

1. Optional: Expand **Advanced configuration** and review the generated settings.

   You can review or update settings such as the table name, consumer group name, view
   name, TTL, TTL column, and local disk TTL.

1. Click **Deploy**.

### Step 4: Query the ClickHouse table

1. Wait until deployment completes.

   Aiven creates the Kafka-to-ClickHouse integration and the required ClickHouse
   resources. The setup page may show a preview of ingested rows when data starts
   flowing.

1. Click **Query**.

   The ClickHouse <ConsoleLabel name="queryeditor" /> opens with a generated `SELECT`
   query for the table created during setup.

1. Review the generated SQL query.
1. Click **Execute**.
1. View the integration on the <ConsoleLabel name="integrations" /> page of either the
   Kafka service or the ClickHouse service.

## Troubleshoot

### Query in ClickHouse option not visible

If **Query in ClickHouse** does not appear in **Analyze your data in minutes**, the topic
already has an active ClickHouse table integration. To add another, click **Add table**
in **ClickHouse tables**.

If **Add table** is also not visible, your Kafka service may be on a cloud provider where
this feature is not yet available. Use a Kafka service on a supported cloud provider.

### ClickHouse service not visible

If you do not see the ClickHouse service you expect, ensure:

- The ClickHouse service has the **Running** status.
- The ClickHouse service is on the same cloud provider as the Kafka service.
- You have access to the ClickHouse service.
- ClickHouse is available for the Kafka service cloud provider.

If ClickHouse is not available for the Kafka service cloud provider, migrate the Kafka
service to a supported cloud provider.

### Data not appearing after deployment

If data does not appear in the ClickHouse table after deployment, review the logs for
the Aiven for ClickHouse® service. Ingestion errors are reported on the ClickHouse side.

Also ensure the selected ingestion start point includes messages from the topic. For
example, if you selected **New messages only**, only messages produced after the
integration was created are sent to ClickHouse.

For more information about ingestion behavior and limitations, see
[Limitations](/docs/products/clickhouse/concepts/query-kafka-topic-data#limitations).

<RelatedPages/>

- [Query Kafka topic data in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/query-kafka-topic-data)
- [Connect Apache Kafka® to Aiven for ClickHouse®](/docs/products/clickhouse/howto/integrate-kafka)
- [Set up Aiven for ClickHouse® data service integrations](/docs/products/clickhouse/howto/data-service-integration)
