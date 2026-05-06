---
title: Create an AMQP source connector for Aiven for Apache Kafka®
early: true
sidebar_label: AMQP source connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

The AMQP source connector retrieves messages from an AMQP-compatible queue and writes them to Apache Kafka® topics.

For architecture, JSON field reference, and the full list of configuration properties,
see the open-source
[AMQP Source Connector Architecture Notes](https://aiven-open.github.io/amqp-connector-for-apache-kafka/source/architecture.html)
and
[Source Connector Configuration](https://aiven-open.github.io/amqp-connector-for-apache-kafka/source/configuration.html).

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Aiven for Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- Access to an AMQP-compatible broker, such as RabbitMQ.
- A configured AMQP queue with available messages.
- The following AMQP connection details:
  - `amqp.host`: Hostname or IP address of the AMQP broker.
  - `amqp.port`: Port for the AMQP broker. Use the port your broker documents for
    AMQP connections.
  - `amqp.address`: Queue address to consume from. For many brokers, including
    RabbitMQ, this value is the queue name.
  - `amqp.user`: Username for authentication.
  - `amqp.password`: Password for authentication.

Use the hostname, port, and credentials from your AMQP broker documentation.
If the connection fails, confirm that the port matches your broker's AMQP endpoint.

## Connector behavior

The connector connects to the configured AMQP queue and reads queued messages.

For each message:

- One Apache Kafka record is created.
- The Kafka record key is a ULID (Universally Unique Lexicographically Sortable
  Identifier). AMQP messages are not guaranteed to expose a unique identifier, so the
  connector generates one for each record.
- The AMQP message body and supported metadata are serialized as JSON.
- The record is written to the configured Apache Kafka topic.

:::caution
The connector does not guarantee that every message on the AMQP queue is written to
Apache Kafka. Messages available while the connector is not running can be missed.
:::

If a source message includes a stable `messageId`, use that field for downstream
deduplication.

## Serialized record fields

The connector serializes each AMQP message into a JSON record. Properties that are not
set on the source AMQP message are omitted from the JSON.

For each JSON field and serialization details, see **Data Mapping** and
**Data Serialization** in the
[AMQP Source Connector Architecture Notes](https://aiven-open.github.io/amqp-connector-for-apache-kafka/source/architecture.html).

## Limitations

- Delivery is not guaranteed. Messages available while the connector is not
  running can be missed.
- Queues only. The connector reads AMQP queues, not streams.
- AMQP broker connection settings are limited to `amqp.host`, `amqp.port`,
  `amqp.user`, and `amqp.password`.
- For a single queue, keep `tasks.max` at `1`. Additional tasks create separate
  consumers. Depending on the broker, this can cause competing consumers,
  duplicate or reordered processing, or no added throughput. Increase `tasks.max`
  only when you understand how your broker handles multiple receivers.
- `key.converter` must use
  `org.apache.kafka.connect.storage.StringConverter`.
- `value.converter` must use one of the following:
  - `org.apache.kafka.connect.storage.StringConverter`
  - `org.apache.kafka.connect.json.JsonConverter`
- Performance depends on queue throughput and Kafka Connect task configuration.

## Output record format

Each AMQP message becomes one record in the target Apache Kafka topic.

The connector builds JSON from each AMQP message using Jackson and connector logic
that maps AMQP-specific data to ordinary JSON values. Set `key.converter` and
`value.converter` to the classes listed in [Limitations](#limitations).

For more detail on serialization, see **Data Serialization** in the
[AMQP Source Connector Architecture Notes](https://aiven-open.github.io/amqp-connector-for-apache-kafka/source/architecture.html).

- **Key**: ULID string.
- **Value**: JSON representation of the AMQP payload. What consumers read depends on
  `value.converter`.

With `StringConverter`, the record value is **plain UTF-8 text**, a single string that
contains the JSON. Consumers parse that string as JSON.

`JsonConverter` serializes the connector output as JSON without generating a schema
for the AMQP message structure.

Example value payload inside the JSON string when using `StringConverter`:

```json
{
  "messageId": "12345",
  "contentType": "application/json",
  "body": {
    "orderId": 1001,
    "status": "created"
  }
}
```

If the AMQP body contains binary data, the connector encodes it using Base64.

## Create an AMQP source connector configuration file

Create a file named `amqp_source_connector.json` and add the following configuration:

```json
{
  "name": "amqp-source",
  "connector.class": "io.aiven.kafka.connect.amqp.source.AmqpSourceConnector",
  "tasks.max": 1,
  "key.converter": "org.apache.kafka.connect.storage.StringConverter",
  "value.converter": "org.apache.kafka.connect.storage.StringConverter",
  "topic": "amqp.messages",
  "amqp.host": "AMQP_HOST",
  "amqp.port": AMQP_PORT,
  "amqp.address": "QUEUE_NAME",
  "amqp.user": "AMQP_USERNAME",
  "amqp.password": "AMQP_PASSWORD"
}
```

Parameters:

- `name`: Unique name for the connector.
- `connector.class`: Connector class:
  `io.aiven.kafka.connect.amqp.source.AmqpSourceConnector`.
- `tasks.max`: Maximum number of Kafka Connect tasks. Use `1` when consuming from
  a single queue unless you intentionally run multiple competing consumers. See
  [Limitations](#limitations) for guidance on multiple tasks per queue.
- `key.converter`: Must use
  `org.apache.kafka.connect.storage.StringConverter`.
- `value.converter`: Must use one of the following:
  - `org.apache.kafka.connect.storage.StringConverter`
  - `org.apache.kafka.connect.json.JsonConverter`
- `topic`: Apache Kafka topic that receives AMQP messages.
- `amqp.host`: Hostname or IP address of the AMQP broker.
- `amqp.port`: AMQP broker port. Set this as a JSON number that matches your broker
  configuration.
- `amqp.address`: AMQP queue address to consume from—for RabbitMQ, usually the queue
  name or receiver address for that queue.
- `amqp.user`: Username for authentication.
- `amqp.password`: Password for authentication.

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Apache Kafka Connect is enabled on the service.
   If not, click **Enable connector on this service**.

   Alternatively:

   1. Click <ConsoleLabel name="Service settings"/> in the sidebar.
   1. In the **Service management** section, click
      <ConsoleLabel name="Actions"/> > **Enable Kafka connect**.

1. In the source connectors list, select **AMQP Source Connector**.
1. Click **Get started**.
1. On the **AMQP Source Connector** page, click the **Common** tab.
1. In the **Connector configuration** text box, click <ConsoleLabel name="edit"/>.
1. Paste the contents of your `amqp_source_connector.json` file.
1. Click **Create connector**.
1. Confirm the connector status on the <ConsoleLabel name="Connectors"/> page.

</TabItem>

<TabItem value="cli" label="Aiven CLI">

To create the AMQP source connector, run:

```bash
avn service connector create SERVICE_NAME @amqp_source_connector.json
```

To check the connector status, run:

```bash
avn service connector status SERVICE_NAME CONNECTOR_NAME
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `@amqp_source_connector.json`: Path to your connector configuration file.
- `CONNECTOR_NAME`: Value of the `name` field in the JSON file.

</TabItem>
</Tabs>

## Verify the connector

After you create the connector:

1. Confirm that the connector status is `RUNNING`.
1. Verify that messages are written to the configured Apache Kafka topic.
1. Consume from that Apache Kafka topic. Confirm that keys and values match
   [Output record format](#output-record-format). If not, compare your `key.converter`
   and `value.converter` settings with [Limitations](#limitations).

<RelatedPages/>

- [Source Connector Configuration](https://aiven-open.github.io/amqp-connector-for-apache-kafka/source/configuration.html)
- [AMQP Source Connector Architecture Notes](https://aiven-open.github.io/amqp-connector-for-apache-kafka/source/architecture.html)
- [AMQP connector for Apache Kafka on GitHub](https://github.com/Aiven-Open/amqp-connector-for-apache-kafka)
- [AMQP connector project documentation](https://aiven-open.github.io/amqp-connector-for-apache-kafka)
- [Apache Qpid ProtonJ2 documentation](https://qpid.apache.org/proton/)
