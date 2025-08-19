---
title: Connect Apache Kafka® to Aiven for ClickHouse®
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Integrate Aiven for ClickHouse® with either Aiven for Apache Kafka® service located in the same project, or an external Apache Kafka endpoint.

:::tip[For a different use case]
Need to deliver data from Apache Kafka® topics to a ClickHouse database for efficient querying
and analysis?
[Use a ClickHouse sink connector](/docs/products/kafka/kafka-connect/howto/clickhouse-sink-connector).
:::

A single Aiven for ClickHouse instance can connect to multiple Kafka clusters with
different authentication mechanism and credentials. Behind the scenes, the integration
between Aiven for ClickHouse and Apache Kafka services relies on
[ClickHouse Kafka Engine](https://clickhouse.com/docs/en/engines/table-engines/integrations/kafka/).

:::note
Aiven for ClickHouse service integrations are available for
[Startup plans and higher](https://aiven.io/pricing?product=clickhouse).
:::

## Prerequisites

-   Services to integrate using Startup plans and higher:
    -   Aiven for ClickHouse service
    -   Aiven for Apache Kafka service or a self-hosted Apache Kafka service

        :::tip
        If you use the self-hosted Apache Kafka service,
        [configure an external Apache Kafka endpoint](/docs/products/kafka/kafka-mirrormaker/howto/integrate-external-kafka-cluster#define-an-external-apache-kafka-service-integration-endpoint-via-aiven-console).
        :::

-   At least one topic in the Apache Kafka service

### Tools

-   [Aiven Console](https://console.aiven.io/)
-   [Aiven CLI](/docs/tools/cli)
-   SQL client

### Variables

Variables used to set up and configure the integration:

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

Upon creating the integration and configuring your tables, you can edit both
[mandatory integration settings](/docs/products/clickhouse/howto/integrate-kafka#mandatory-integration-settings)
and
[optional integration settings](/docs/products/clickhouse/howto/integrate-kafka#optional-integration-settings)
on a table level either in the [Aiven Console](https://console.aiven.io/) or the
[Aiven CLI](/docs/tools/cli).

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service
    that includes a table to be edited.
1.  On your service's page, click <ConsoleLabel name="databasesandtables"/> in the
    sidebar.
1.  Find a database including the table to be edited, and expand the database using
    <ConsoleLabel name="downarrow"/> to display tables inside it.
1.  Find the table and click:

    - For
      [mandatory settings](/docs/products/clickhouse/howto/integrate-kafka#mandatory-integration-settings):
      <ConsoleLabel name="actions"/> >
      <ConsoleLabel name="edittable"/>.

    - For
      [optional settings](/docs/products/clickhouse/howto/integrate-kafka#optional-integration-settings):
      <ConsoleLabel name="actions"/> >
      <ConsoleLabel name="advancedconfiguration"/>.

1.  In the displayed window, update existing settings and / or add new ones. Save your
    changes.

</TabItem>
<TabItem value="cli" label="CLI">

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

    ```bash {6-14}
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

</TabItem>
</Tabs>

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

### Mandatory integration settings

<details><summary>
Click to see the list
</summary>
-   `name` - name of the connector table
-   `columns` - array of columns with names and types
-   `topics` - array of topics to pull data from
-   `data_format` - format for input data
    ([see supported formats](/docs/products/clickhouse/reference/supported-input-output-formats))
-   `group_name` - consumer group name to be created on your behalf
</details>

### Optional integration settings

<details><summary>
Click to see the list
</summary>
| Name                                    | Type      | Description                                                                                                                     | Default    | Example      | Allowed values / Range                                          |
|---------------------------------------- |-----------|---------------------------------------------------------------------------------------------------------------------------------|------------|--------------|-----------------------------------------------------------------|
| `auto_offset_reset`                     | string    | Action to take when there is no initial offset in offset store or the desired offset is out of range                            | `earliest` | `latest`     | `smallest`, `earliest`, `beginning`, `largest`, `latest`, `end` |
| `date_time_input_format`                | string    | Method to read `DateTime` from text input formats                                                                               | `basic`    | `best_effort`| `basic`, `best_effort`, `best_effort_us`                        |
| `handle_error_mode`                     | string    | How to handle errors for Kafka engine                                                                                           | `default`  | `stream`     | `default`, `stream`                                             |
| `max_block_size`                        | integer   | Number of rows collected by polls for flushing data from Kafka                                                                  | `0`        | `100000`     | `0` - `1_000_000_000`                                           |
| `max_rows_per_message`                  | integer   | Maximum number of rows produced in one Kafka message for row-based formats                                                      | `1`        | `100000`     | `1` - `1_000_000_000`                                           |
| `num_consumers`                         | integer   | Number of consumers per table per replica                                                                                       | `1`        | `4`          | `1` - `10`                                                      |
| `poll_max_batch_size`                   | integer   | Maximum amount of messages to be polled in a single Kafka poll                                                                  | `0`        | `10000`      | `0` - `1_000_000_000`                                           |
| `poll_max_timeout_ms`                   | integer   | Timeout in milliseconds for a single poll from Kafka. Defaults to `stream_flush_interval_ms` (500 ms).                          | `0`        | `1000`       | `0` - `30_000`                                                  |
| `skip_broken_messages`                  | integer   | Skip at least this number of broken messages from Kafka topic per block                                                         | `0`        | `10000`      | `0` - `1_000_000_000`                                           |
| `thread_per_consumer`                   | boolean   | Provide an independent thread for each consumer. All consumers run in the same thread by default.                               | `false`    | `true`       | `true`, `false`                                                 |
| `producer_batch_size`                   | integer   | Max size in bytes of a batch of messages sent to Kafka. If exceeded, the batch is sent.                                         | `1000000`  | `1000000`    | `0` - `2_147_483_647`                                           |
| `producer_batch_num_messages`           | integer   | Max number of messages in a batch sent to Kafka. If exceeded, the batch is sent.                                                | `10000`    | `10000`      | `1` - `1_000_000`                                               |
| `producer_compression_codec`            | string    | Compression codec to use for Kafka producer                                                                                     | `none`     | `zstd`       | `none`, `gzip`, `lz4`, `snappy`, `zstd`                         |
| `producer_compression_level`            | integer   | Compression level for Kafka producer. Range depends on algorithm: [0-9] for `gzip`, [0-12] for `lz4`, only 0 for `snappy`, -1=default | `-1`       | `5`          | `-1` - `12`                                                     |
| `producer_linger_ms`                    | integer   | Time in ms to wait for additional messages before sending a batch. If exceeded, the batch is sent.                              | `5`        | `5`          | `0` - `900_000`                                                 |
| `producer_queue_buffering_max_messages` | integer   | Max number of messages to buffer before sending. Max messages in producer queue.                                                | `100000`   | `100000`     | `0` - `2_147_483_647`                                           |
| `producer_queue_buffering_max_kbytes`   | integer   | Max size of buffer in kilobytes before sending. Max size of producer queue in kB.                                               | `1048576`  | `1048576`    | `0` - `2_147_483_647`                                           |
| `producer_request_required_acks`        | integer   | Number of acknowledgments required from Kafka brokers for a message to be considered successful                                 | `-1`       | `1`          | `-1` - `1000`                                                   |
</details>

### Formats supporting the integration

When connecting ClickHouse® to Kafka® using Aiven integrations, data
exchange requires using specific formats. Check the supported formats
for input and output data in
[Formats for ClickHouse®-Kafka® data exchange](/docs/products/clickhouse/reference/supported-input-output-formats).
