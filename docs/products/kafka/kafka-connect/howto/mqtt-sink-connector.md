---
title: Create an MQTT sink connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Note from "@site/static/includes/streamreactor-compatibility-note.md"

The [MQTT sink connector](https://docs.lenses.io/connectors/kafka-connectors/sources/mqtt) copies messages from an Apache Kafka® topic to an MQTT queue.

:::tip
You can use this connector to send messages to RabbitMQ® when the
[RabbitMQ MQTT plugin](https://www.rabbitmq.com/mqtt.html) is enabled.
:::

<Note/>

## Prerequisites {#connect_mqtt_rbmq_sink_prereq}

- An Aiven for Apache Kafka service
  [with Kafka Connect enabled](enable-connect) or a
  [dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

- Gather the following information for the target MQTT server:

  - `USERNAME`: The MQTT username.
  - `PASSWORD`: The MQTT password.
  - `HOST`: The MQTT hostname.
  - `PORT`: The MQTT port (typically `1883`).
  - `KCQL_STATEMENT`: A KCQL statement that maps topic data to the MQTT topic. Use the
    following format:

    ```sql
    INSERT INTO MQTT_TOPIC
    SELECT LIST_OF_FIELDS
    FROM APACHE_KAFKA_TOPIC
    ```

  - `APACHE_KAFKA_HOST`: The Apache Kafka host. Required only when using Avro.
  - `SCHEMA_REGISTRY_PORT`: The schema registry port. Required only when using Avro.
  - `SCHEMA_REGISTRY_USER`: The schema registry username. Required only when using Avro.
  - `SCHEMA_REGISTRY_PASSWORD`: The schema registry password. Required only when using
    Avro.

:::note
The connector writes to the Kafka topic defined in the `connect.mqtt.kcql` parameter.
Either create the topic manually or enable the `auto_create_topic` parameter to allow
automatic topic creation.
:::

For a complete list of parameters and configuration options, see
the [connector documentation](https://docs.lenses.io/connectors/kafka-connectors/sources/mqtt).

## Create the connector configuration file

Create a file named `mqtt_sink.json` and add the following configuration:

```json
{
  "name": "CONNECTOR_NAME",
  "connector.class": "com.datamountaineer.streamreactor.connect.mqtt.sink.MqttSinkConnector",
  "connect.mqtt.hosts": "tcp://HOST:PORT",
  "connect.mqtt.kcql": "KCQL_STATEMENT",
  "connect.mqtt.username": "USERNAME",
  "connect.mqtt.password": "PASSWORD",
  "key.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter"
}
```

Parameters:

- `name`: The connector name. Replace `CONNECTOR_NAME` with your desired name.
- `connect.mqtt.*`: MQTT server connection parameters collected in the
  [prerequisite step](/docs/products/kafka/kafka-connect/howto/mqtt-sink-connector#connect_mqtt_rbmq_sink_prereq).
- `key.converter` and `value.converter`: Define the message data format in the Kafka
  topic. This example uses `JsonConverter` for both key and value.

For a full list of supported parameters, see the
[Stream Reactor MQTT sink documentation](https://docs.lenses.io/connectors/kafka-connectors/sources/mqtt#storage-to-output-matrix).

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Apache Kafka Connect is enabled on the service.
   If not, click **Enable connector on this service**.

   Alternatively, to enable connectors:

   1. Click <ConsoleLabel name="Service settings"/> in the sidebar.
   1. In the **Service management** section, click
      <ConsoleLabel name="Actions"/> > **Enable Kafka connect**.

1. In the sink connectors list, select **Stream Reactor MQTT Sink Connector**, and click **Get started**.
1. On the **Stream Reactor MQTT Sink** page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `mqtt_sink.json` file into the text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.
1. Confirm that data is delivered to the MQTT topic defined in the `KCQL_STATEMENT`.

</TabItem>
<TabItem value="cli" label="CLI">

To create the connector using the
[Aiven CLI](/docs/tools/cli/service/connector#avn_service_connector_create), run:

```bash
avn service connector create SERVICE_NAME @mqtt_sink.json
```

Replace:

- `SERVICE_NAME`: Your Kafka or Kafka Connect service name.
- `@mqtt_sink.json`: Path to your connector configuration file.

</TabItem>
</Tabs>

## Sink topic data to an MQTT topic

The following example shows how to sink data from a Kafka topic to an MQTT topic. If your Kafka topic `sensor_data` contains the following messages:

```json
{"device":"sensor-1", "temperature": 22.5}
{"device":"sensor-2", "temperature": 19.0}
{"device":"sensor-1", "temperature": 23.1}
```

To write this data to an MQTT topic named `iot/devices/temperature`, use the following
connector configuration:

```json
{
  "name": "my-mqtt-sink",
  "connector.class": "com.datamountaineer.streamreactor.connect.mqtt.sink.MqttSinkConnector",
  "topics": "sensor_data",
  "connect.mqtt.hosts": "tcp://MQTT_HOST:MQTT_PORT",
  "connect.mqtt.username": "MQTT_USERNAME",
  "connect.mqtt.password": "MQTT_PASSWORD",
  "connect.mqtt.kcql": "INSERT INTO iot/devices/temperature SELECT * FROM sensor_data",
  "key.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter.schemas.enable": "false"
}
```

Replace all placeholder values (such as `MQTT_HOST`, `MQTT_PORT`, and `MQTT_USERNAME`)
with your actual MQTT broker connection details.

This configuration does the following:

- `"topics": "sensor_data"`: Specifies the Kafka topic to sink.
- `connect.mqtt.*`: Sets the MQTT broker hostname, port, credentials, and KCQL rules.
- `"value.converter"` and `"value.converter.schemas.enable"`: Set the message format.
  This example uses raw JSON without a schema.
- `"connect.mqtt.kcql"`: Defines the KCQL transformation. Each Kafka message is
  published to the MQTT topic `iot/devices/temperature`.

After creating the connector, check your MQTT broker to verify that messages are
published to the `iot/devices/temperature` topic.
