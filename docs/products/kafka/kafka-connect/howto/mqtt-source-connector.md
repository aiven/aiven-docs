---
title: Create a source connector from MQTT to Apache Kafka®
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Note from "@site/static/includes/streamreactor-compatibility-note.md"

The [Stream Reactor MQTT source connector](https://docs.lenses.io/5.0/integrations/connectors/stream-reactor/sources/mqttsourceconnector/) transfers messages from an MQTT topic to an Aiven for Apache Kafka® topic, where they can be processed and consumed by multiple applications.
It creates a queue and binds it to the `amq.topic` exchange specified in the KCQL
statement, then forwards the messages to Kafka.

:::tip
You can use this connector to source messages from RabbitMQ® if the
[RabbitMQ MQTT plugin](https://www.rabbitmq.com/mqtt.html) is enabled.
:::

<Note/>

## Prerequisites {#connect_mqtt_rbmq_source_prereq}

- An Aiven for Apache Kafka service
  [with Apache Kafka Connect enabled](enable-connect) or a
  [dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

- Collect the following details for your MQTT source:

  - `HOST`: The MQTT hostname.
  - `PORT`: The MQTT port (usually `1883`).
  - `USERNAME`: The MQTT username.
  - `PASSWORD`: The MQTT password.
  - `KCQL_STATEMENT`: A KCQL mapping from MQTT to Kafka in the format:
    `INSERT INTO <your-kafka-topic> SELECT * FROM <your-mqtt-topic>`

  - `APACHE_KAFKA_HOST`: The Kafka host (required only when using Avro).
  - `SCHEMA_REGISTRY_PORT`: The schema registry port (required only when using Avro).
  - `SCHEMA_REGISTRY_USER`: The schema registry username (required only when using Avro).
  - `SCHEMA_REGISTRY_PASSWORD`: The schema registry password (required only when using Avro).

:::tip
The connector writes to a Kafka topic defined in the `connect.mqtt.kcql` parameter.
Make sure the topic exists, or enable [automatic topic creation](/docs/products/kafka/howto/create-topics-automatically).
:::

## Create a connector configuration file

Create a file named `mqtt_source.json` and add the following configuration:

```json
{
  "name": "CONNECTOR_NAME",
  "connector.class": "com.datamountaineer.streamreactor.connect.mqtt.source.MqttSourceConnector",
  "connect.mqtt.hosts": "tcp://HOST:PORT",
  "connect.mqtt.kcql": "KCQL_STATEMENT",
  "connect.mqtt.username": "USERNAME",
  "connect.mqtt.password": "PASSWORD",
  "connect.mqtt.service.quality": "1",
  "key.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter"
}
```

Parameters:

- `name`: The connector name. Replace `CONNECTOR_NAME` with your desired name.
- `connect.mqtt.*`: MQTT connection details collected in the
  [prerequisite step](#connect_mqtt_rbmq_source_prereq).
- `connect.mqtt.kcql`: A KCQL statement that maps MQTT topics to Kafka topics.
- `connect.mqtt.service.quality`: Sets the MQTT Quality of Service (QoS). Common
  values are `0`, `1`, or `2`.
- `key.converter` and `value.converter`: Set the message format. This example uses raw
  JSON.



## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector**.
   If Kafka Connect is not yet enabled, click **Enable connector on this service**.

   Alternatively:

   - Go to <ConsoleLabel name="Service settings"/>.
   - In the **Service management** section, click <ConsoleLabel name="Actions"/> > **Enable Kafka connect**.

1. From the source connectors list, select **Stream Reactor MQTT Source**,
   then click **Get started**.
1. On the **Common** tab, locate the **Connector configuration** text box and
   click <ConsoleLabel name="edit"/>.
1. Paste the contents of your `mqtt_source.json` file.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.

</TabItem>
<TabItem value="cli" label="CLI">

To create the connector using the
[Aiven CLI](/docs/tools/cli/service/connector#avn_service_connector_create), run:

```bash
avn service connector create SERVICE_NAME @mqtt_source.json
```

Replace:

- `SERVICE_NAME`: Your Kafka or Kafka Connect service name.
- `@mqtt_source.json`: Path to your configuration file.

</TabItem>
</Tabs>

## Source MQTT data to a Kafka topic

The following example shows how to forward messages from an MQTT topic to a Kafka topic.

Suppose your MQTT broker publishes JSON messages to a topic named `devices/status` like this:

```json
{"device": "alpha", "status": "online"}
{"device": "beta", "status": "offline"}
```

To send this data to a Kafka topic named `device_status`, use the following connector
configuration:

```json
{
  "name": "mqtt-source-example",
  "connector.class": "com.datamountaineer.streamreactor.connect.mqtt.source.MqttSourceConnector",
  "connect.mqtt.hosts": "tcp://mqtt-broker.example.com:1883",
  "connect.mqtt.kcql": "INSERT INTO device_status SELECT * FROM devices/status",
  "connect.mqtt.username": "mqtt_user",
  "connect.mqtt.password": "mqtt_password",
  "connect.mqtt.service.quality": "1",
  "key.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter"
}
```

Replace all placeholder values (such as `mqtt-broker.example.com`, `mqtt_user`,
and `mqtt_password`) with your actual connection details.

This configuration does the following:

- `connect.mqtt.kcql`: Routes messages from the MQTT topic `devices/status` to the
  Kafka topic `device_status`.
- `connect.mqtt.service.quality`: Uses QoS level `1` for at-least-once delivery.
- `key.converter` and `value.converter`**: Set the message format to JSON.
- `connect.mqtt.*`: Supplies the MQTT connection details.

After the connector is running, check the `device_status` Kafka topic to confirm that
messages are being delivered.
