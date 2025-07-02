---
title: Create a sink connector from Apache Kafka® to InfluxDB®
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Note from "@site/static/includes/streamreactor-compatibility-note.md"

The InfluxDB® Stream Reactor sink connector enables you to move data from an Aiven for Apache Kafka® cluster to an InfluxDB® instance.
It uses [KCQL transformations](https://docs.lenses.io/connectors/sink/influx) to
filter and map topic data before writing it to InfluxDB.

<Note/>

## Prerequisites {#connect_influx_lenses_sink_prereq}

- An Aiven for Apache Kafka service
[with Apache Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

- Gather the following information for the target InfluxDB database:

- `INFLUXDB_HOST`: The InfluxDB hostname.
- `INFLUXDB_PORT`: The InfluxDB port.
- `INFLUXDB_DATABASE_NAME`: The InfluxDB database name.
- `INFLUXDB_USERNAME`: The InfluxDB username.
- `INFLUXDB_PASSWORD`: The InfluxDB password.
- `TOPIC_LIST`: A comma-separated list of Kafka topics to sink.
- `KCQL_TRANSFORMATION`: A KCQL statement to map topic fields to InfluxDB measurements.
  Use the following format:

  ```sql
  INSERT INTO MEASUREMENT_NAME
  SELECT LIST_OF_FIELDS
  FROM APACHE_KAFKA_TOPIC
  ```

- `APACHE_KAFKA_HOST`: The Apache Kafka host. Required only when using Avro as the
  data format.
- `SCHEMA_REGISTRY_PORT`: The schema registry port. Required only when using Avro.
- `SCHEMA_REGISTRY_USER`: The schema registry username. Required only when using Avro.
- `SCHEMA_REGISTRY_PASSWORD`: The schema registry password. Required only when using Avro.

  :::note
  If you are using Aiven for InfluxDB and Aiven for Apache Kafka, get all required
  connection details, including schema registry information, from the
  **Connection information** section on the <ConsoleLabel name="overview"/> page.

  As of version 3.0, Aiven for Apache Kafka uses Karapace as the schema registry and
  no longer supports the Confluent Schema Registry.
  :::

For a complete list of supported parameters and configuration options, see the
[connector's documentation](https://docs.lenses.io/latest/connectors/kafka-connectors/sinks/influxdb).

## Create a connector configuration file

Create a file named `influxdb_sink.json` and add the following configuration:

```json
{
  "name": "CONNECTOR_NAME",
  "connector.class": "com.datamountaineer.streamreactor.connect.influx.InfluxSinkConnector",
  "topics": "TOPIC_LIST",
  "connect.influx.url": "https://INFLUXDB_HOST:INFLUXDB_PORT",
  "connect.influx.db": "INFLUXDB_DATABASE_NAME",
  "connect.influx.username": "INFLUXDB_USERNAME",
  "connect.influx.password": "INFLUXDB_PASSWORD",
  "connect.influx.kcql": "KCQL_TRANSFORMATION",
  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "key.converter.basic.auth.credentials.source": "USER_INFO",
  "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "value.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "value.converter.basic.auth.credentials.source": "USER_INFO",
  "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD"
}
```

Parameters:

- `name`: The connector name. Replace `CONNECTOR_NAME` with your desired name.
- `connect.influx.*`: InfluxDB connection parameters collected in the
  [prerequisite step](/docs/products/kafka/kafka-connect/howto/influx-sink#connect_influx_lenses_sink_prereq).
- `topics`: A comma-separated list of Kafka topics to sink.
- `key.converter` and `value.converter`: Define the message data format in the
  Kafka topic. This example uses `io.confluent.connect.avro.AvroConverter` to translate
  messages in Avro format. The schema is retrieved from Aiven's
  [Karapace schema registry](https://github.com/aiven/karapace) using the
  `schema.registry.url` and related credentials.

:::note
The `key.converter` and `value.converter` fields define how Kafka messages are parsed.
Include these fields in the connector configuration.

If you use Avro as the message format, set the following parameters:

- `value.converter.schema.registry.url`: The Aiven for Apache Kafka schema registry
  URL, in the format `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT`. Get these values from the
  [prerequisite step](/docs/products/kafka/kafka-connect/howto/influx-sink#connect_influx_lenses_sink_prereq).
- `value.converter.basic.auth.credentials.source`: Set to `USER_INFO` to enable
  authentication with a username and password.
- `value.converter.schema.registry.basic.auth.user.info`: The schema registry
  credentials, in the format `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD`.
  Get these values from the
  [prerequisite step](/docs/products/kafka/kafka-connect/howto/influx-sink#connect_influx_lenses_sink_prereq).
:::

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

1. In the sink connectors list, select **Stream Reactor InfluxDB Sink**, and
   click **Get started**.
1. On the **Stream Reactor InfluxDB Sink** page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `influxdb_sink.json` file into the text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.
1. Confirm that data is written to the InfluxDB target database.

</TabItem>
<TabItem value="cli" label="CLI">

To create the connector using the
[Aiven CLI](/docs/tools/cli/service/connector#avn_service_connector_create), run:

```bash
avn service connector create SERVICE_NAME @influxdb_sink.json
```

Replace:

- `SERVICE_NAME`: Your Kafka or Kafka Connect service name.
- `@influxdb_sink.json`: Path to your configuration file.

</TabItem>
</Tabs>

## Sink topic data to InfluxDB

The following example shows how to sink data from a Kafka topic to an InfluxDB measurement.
If your Kafka topic `measurements` contains the following data:

```json
{
"ts": "2022-10-24T13:09:43.406000Z",
"device_name": "mydevice1",
"measurement": 17
}
```

To write this data to InfluxDB, use the following connector configuration:

```json
{
"name": "my-influxdb-sink",
"connector.class": "com.datamountaineer.streamreactor.connect.influx.InfluxSinkConnector",
"topics": "measurements",
"connect.influx.url": "https://INFLUXDB_HOST:INFLUXDB_PORT",
"connect.influx.db": "INFLUXDB_DATABASE_NAME",
"connect.influx.username": "INFLUXDB_USERNAME",
"connect.influx.password": "INFLUXDB_PASSWORD",
"connect.influx.kcql": "INSERT INTO measurements SELECT ts, device_name, measurement FROM measurements",
"value.converter": "org.apache.kafka.connect.json.JsonConverter",
"value.converter.schemas.enable": "false"
}
```

Replace all placeholder values (such as `INFLUXDB_HOST`, `INFLUXDB_PORT`,
and `INFLUXDB_PASSWORD`) with your actual InfluxDB connection details.

This configuration does the following:

- `"topics": "measurements"`: Specifies the Kafka topic to sink.
- Connection settings (`connect.influx.*`): Provide the InfluxDB connection details.
- `"value.converter"` and `"value.converter.schemas.enable"`: Set the message format.
  The topic uses raw JSON without a schema.
- `"connect.influx.kcql"`: Defines the insert logic. Each Kafka message is written as a
  row in the `measurements` table.

After creating the connector, verify the presence of the data in the target InfluxDB database.
The measurement name matches the Kafka topic (`measurements`).
