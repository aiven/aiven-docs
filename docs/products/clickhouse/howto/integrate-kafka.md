---
title: Connect Apache Kafka® to Aiven for ClickHouse®
---

You can integrate Aiven for ClickHouse® with either Aiven for Apache Kafka® service located in the same project, or an external Apache Kafka endpoint.

:::tip
To deliver data from Apache Kafka® topics to a ClickHouse database for efficient querying
and analysis,
[create a ClickHouse sink connector](/docs/products/kafka/kafka-connect/howto/clickhouse-sink-connector).
:::

A single Aiven for ClickHouse instance can connect to
multiple Kafka clusters with different authentication mechanism and
credentials.

Behind the scenes the integration between Aiven for ClickHouse and
Apache Kafka services relies on [ClickHouse Kafka
Engine](https://clickhouse.com/docs/en/engines/table-engines/integrations/kafka/).

:::note
Aiven for ClickHouse service integrations are available for Startup
plans and higher.
:::

## Prerequisites

-   Services to integrate:
    -   Aiven for ClickHouse service
    -   Aiven for Apache Kafka service or a self-hosted Apache Kafka service

        :::tip
        If you use the self-hosted Apache Kafka service, an external Apache
        Kafka endpoint should be configured in **Integration endpoints**.
        :::

-   At least one topic in the Apache Kafka service
-   Tools
    -   [Aiven Console](https://console.aiven.io/)
    -   [Aiven CLI](/docs/tools/cli)
    -   SQL client

## Variables

The following variables will be used later in the code snippets:

| Variable                  | Description                                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `CLICKHOUSE_SERVICE_NAME` | Name of your Aiven for ClickHouse service.                                                                 |
| `KAFKA_SERVICE_NAME`      | Name of the Apache Kafka service you use for the integration.                                              |
| `PROJECT`                 | Name of Aiven project where your services are located.                                                     |
| `CONNECTOR_TABLE_NAME`    | Name of the Kafka engine virtual table that is used as a connector.                                        |
| `DATA_FORMAT`             | Input/output data format in which data is accepted into Aiven for ClickHouse. See [Reference](#reference). |
| `CONSUMER_GROUP_NAME`     | Name of the consumer group. Each message is delivered once per consumer group.                             |

## Create an integration

To connect Aiven for ClickHouse and Aiven for Apache Kafka by enabling a
data service integration, see
[Create data service integrations](/docs/products/clickhouse/howto/data-service-integration#create-apache-kafka-integrations).

When you create the integration, a database is automatically added in your Aiven for
ClickHouse. Its name is `service_KAFKA_SERVICE_NAME`, where `KAFKA_SERVICE_NAME` is the
name of your Apache Kafka service. In this database, you create virtual connector tables,
which is also a part of the
[integration creation in the Aiven Console](/docs/products/clickhouse/howto/data-service-integration#create-apache-kafka-integrations).
You can have up to 400 such tables for receiving and sending messages from multiple topics.

## Update integration settings

Upon creating the integration and configuring your tables, you can edit them at any time.

### Update mandatory settings

<details><summary>
See the mandatory settings
</summary>
-   `name` - name of the connector table
-   `columns` - array of columns, with names and types
-   `topics` - array of topics, where to bring the data from
-   `data_format` - your preferred format for data input, see
    [Formats for ClickHouse®-Kafka® data exchange](/docs/products/clickhouse/reference/supported-input-output-formats)
-   `group_name` - consumer group name, that will be created on your
    behalf
</details>

Choose the tool for editing mandatory settings:

- [Update in the Aiven Console](/docs/products/clickhouse/howto/integration-databases#update-table-details)
- [Update in the Aiven CLI](/docs/products/clickhouse/howto/integrate-kafka#update-optional-settings)
  (using the same steps as for optional settings)

### Update optional settings

<details><summary>
See the optional settings
</summary>
| Name                     | Description                                                                                              | Default    | Allowed values                                                  | Minimum | Maximum value   |
| ------------------------ | -------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------- | ------- | --------------- |
| `auto_offset_reset`      | Action to take when there is no initial offset in the offset store or the desired offset is out of range | `earliest` | `smallest`, `earliest`, `beginning`, `largest`, `latest`, `end` | \--     | \--             |
| `date_time_input_format` | Method to read `DateTime` from text input formats                                                        | `basic`    | `basic`, `best_effort`, `best_effort_us`                        | \--     | \--             |
| `handle_error_mode`      | Method to handle errors for the Kafka engine                                                             | `default`  | `default`, `stream`                                             | \--     | \--             |
| `max_block_size`         | Number of rows collected by a poll for flushing data from Kafka                                         | `0`        | `0` - `1_000_000_000`                                           | `0`     | `1_000_000_000` |
| `max_rows_per_message`   | Maximum number of rows produced in one Kafka message for row-based formats                               | `1`        | `1` - `1_000_000_000`                                           | `1`     | `1_000_000_000` |
| `num_consumers`          | Number of consumers per table per replica                                                                | `1`        | `1` - `10`                                                      | `1`     | `10`            |
| `poll_max_batch_size`    | Maximum amount of messages to be polled in a single Kafka poll                                           | `0`        | `0` - `1_000_000_000`                                           | `0`     | `1_000_000_000` |
| `skip_broken_messages`   | Minimum number of broken messages from Kafka topic per block to be skipped                               | `0`        | `0` - `1_000_000_000`                                           | `0`     | `1_000_000_000` |
</details>

Use the [Aiven CLI](/docs/tools/cli):

1.  Get your service integration ID by requesting the full list of integrations. Replace
    `PROJECT`, `CLICKHOUSE_SERVICE_NAME` and `KAFKA_SERVICE_NAME` with the names of your
    services:

     ```bash
     avn service integration-list                      \
     --project PROJECT_NAME                            \
     CLICKHOUSE_SERVICE_NAME | grep KAFKA_SERVICE_NAME
     ```

1.  Run
    [avn service integration-update](/docs/tools/cli/service/integration#avn%20service%20integration-update)
    with the service integration id and your integration settings. Replace
    `SERVICE_INTEGRATION_ID`, `CONNECTOR_TABLE_NAME`, `DATA_FORMAT` and `CONSUMER_NAME`
    with your values:

    ```bash {14}
    avn service integration-update SERVICE_INTEGRATION_ID \
    --project PROJECT_NAME                                \
    --user-config-json '{
        "tables": [
            {
                "name": "CONNECTOR_TABLE_NAME",
                "columns": [
                    {"name": "id", "type": "UInt64"},
                    {"name": "name", "type": "String"}
                ],
                "topics": [{"name": "topic1"}, {"name": "topic2"}],
                "data_format": "DATA_FORMAT",
                "group_name": "CONSUMER_NAME",
                "auto_offset_reset": "earliest"
            }
        ]
    }'
    ```

## Read and store data

In Aiven for ClickHouse you can consume messages by running SELECT
command. Replace `KAFKA_SERVICE_NAME` and `CONNECTOR_TABLE_NAME` with
your values and run:

```sql
SELECT * FROM service_KAFKA_SERVICE_NAME.CONNECTOR_TABLE_NAME
```

However, the messages are only read once (per consumer group). If you
want to store the messages for later, you can send them into a separate
ClickHouse table with the help of a materialized view.

For example, run to creating a destination table:

```sql
CREATE TABLE destination (id UInt64, name String)
ENGINE = ReplicatedMergeTree()
ORDER BY id;
```

Add a materialised view to bring the data from the connector:

```sql
CREATE MATERIALIZED VIEW materialised_view TO destination AS
SELECT *
FROM service_KAFKA_SERVICE_NAME.CONNECTOR_TABLE_NAME;
```

Now the messages consumed from the Apache Kafka topic will be read
automatically and sent into the destination table directly.

For more information on materialized views, see
[Create materialized views in ClickHouse®](/docs/products/clickhouse/howto/materialized-views).

:::note
ClickHouse is strict about allowed symbols in database and table names.
You can use backticks around the names when running ClickHouse requests,
particularly in the cases when the name contains dashes.
:::

## Write data back to the topic

You can also bring the entries from ClickHouse table into the Apache
Kafka topic. Replace `KAFKA_SERVICE_NAME` and `CONNECTOR_TABLE_NAME`
with your values:

```sql
INSERT INTO service_KAFKA_SERVICE_NAME.CONNECTOR_TABLE_NAME(id, name)
VALUES (1, 'Michelangelo')
```

:::warning
Writing to more than one topic is not supported.
:::

## Reference

When connecting ClickHouse® to Kafka® using Aiven integrations, data
exchange requires using specific formats. Check the supported formats
for input and output data in
[Formats for ClickHouse®-Kafka® data exchange](/docs/products/clickhouse/reference/supported-input-output-formats).
