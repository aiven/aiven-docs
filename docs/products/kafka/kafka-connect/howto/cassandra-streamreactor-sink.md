---
title: Create a Stream Reactor sink connector from Apache Kafka® to Apache Cassandra®
displayed_sidebar: serviceSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Note from "@site/static/includes/streamreactor-compatibility-note.md"

The Apache Cassandra® Stream Reactor sink connector enables you to move data from an Aiven for Apache Kafka® cluster to a Apache Cassandra® database.
It uses [KCQL transformations](https://docs.lenses.io/5.0/integrations/connectors/stream-reactor/sinks/cassandrasinkconnector/) to filter and map topic data before sending it to Cassandra.

:::note
See the full set of available parameters and configuration
options in the [connector's
documentation](https://docs.lenses.io/connectors/sink/cassandra).
:::

<Note/>

## Prerequisites {#connect_cassandra_lenses_sink_prereq}

- An Aiven for Apache Kafka service
  [with Apache Kafka Connect enabled](enable-connect) or a
  [dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

- Gather the following information for the target Cassandra database:

  - `CASSANDRA_HOSTNAME`: The Cassandra hostname.
  - `CASSANDRA_PORT`: The Cassandra port.
  - `CASSANDRA_USERNAME`: The Cassandra username.
  - `CASSANDRA_PASSWORD`: The Cassandra password.
  - `CASSANDRA_SSL`: Set to `true`, `false`, or `default`, depending on your SSL setup.
  - `CASSANDRA_KEYSTORE`: The path to the keystore containing the CA certificate,
    used for SSL connections.
  - `CASSANDRA_KEYSTORE_PASSWORD`: The password for the keystore.

    :::note

    If you are using Aiven for Apache Cassandra, use the following values:
    - `CASSANDRA_TRUSTSTORE`: `/run/aiven/keys/public.truststore.jks`
    - `CASSANDRA_TRUSTSTORE_PASSWORD`: `password`
    :::
  - `CASSANDRA_KEYSPACE`: The Cassandra keyspace to use to sink the data

    :::warning
    The Cassandra keyspace and destination table need to be created before
    starting the connector, otherwise the connector task will fail.
    :::
  - `TOPIC_LIST`: A comma-separated list of Kafka topics to sink.

  - `KCQL_TRANSFORMATION`: A KCQL statement to map topic fields to table columns.
    Use the following format:

    ```sql
    INSERT INTO CASSANDRA_TABLE
    SELECT LIST_OF_FIELDS
    FROM APACHE_KAFKA_TOPIC
    ```

    :::warning
    Create the Cassandra keyspace and destination table (`CASSANDRA_TABLE`) before
    starting the connector. The connector fails to start if they do not exist.
    :::

  - `APACHE_KAFKA_HOST`: The Apache Kafka host. Required only when using Avro as the
    data format.
  - `SCHEMA_REGISTRY_PORT`: The schema registry port. Required only when using Avro.
  - `SCHEMA_REGISTRY_USER`: The schema registry username. Required only when using Avro.
  - `SCHEMA_REGISTRY_PASSWORD`: The schema registry password. Required only when using
    Avro.

    :::note
    If you are using Aiven for Cassandra and Aiven for Apache Kafka, get all required
    connection details, including schema registry information, from the
    **Connection information** section on the <ConsoleLabel name="overview"/> page.

    As of version 3.0, Aiven for Apache Kafka uses Karapace as the schema registry and
    no longer supports the Confluent Schema Registry.
    :::

   For a complete list of supported parameters and configuration options, see the
   [connector's documentation](https://docs.lenses.io/connectors/sink/cassandra).

## Create a connector configuration file

Create a file named `cassandra_sink.json` and add the following configuration:

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "com.datamountaineer.streamreactor.connect.cassandra.sink.CassandraSinkConnector",
    "topics": "TOPIC_LIST",
    "connect.cassandra.host": "CASSANDRA_HOSTNAME",
    "connect.cassandra.port": "CASSANDRA_PORT",
    "connect.cassandra.username": "CASSANDRA_USERNAME",
    "connect.cassandra.password": "CASSANDRA_PASSWORD",
    "connect.cassandra.ssl.enabled": "CASSANDRA_SSL",
    "connect.cassandra.trust.store.path": "CASSANDRA_TRUSTSTORE",
    "connect.cassandra.trust.store.password": "CASSANDRA_TRUSTSTORE_PASSWORD",
    "connect.cassandra.key.space": "CASSANDRA_KEYSPACE",
    "connect.cassandra.kcql": "KCQL_TRANSFORMATION",
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
- `connect.cassandra.*`: Cassandra connection parameters collected in the
  [prerequisite step](/docs/products/kafka/kafka-connect/howto/cassandra-streamreactor-sink#connect_cassandra_lenses_sink_prereq).
- `key.converter` and `value.converter`: d Define the message data format in the
  Kafka topic. This example uses `io.confluent.connect.avro.AvroConverter` to translate
  messages in Avro format. The schema is retrieved from Aiven's
  [Karapace schema registry](https://github.com/aiven/karapace) using the
  `schema.registry.url` and related credentials.

:::note
The `key.converter` and `value.converter` fields define how Kafka messages
are parsed and must be included in the configuration.

When using Avro as the source format, set the following:

- `value.converter.schema.registry.url`: Use the Aiven for Apache Kafka schema
  registry URL in the format `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT`.
- `value.converter.basic.auth.credentials.source`: Set to `USER_INFO`, which means
  authentication is done using a username and password.
- `value.converter.schema.registry.basic.auth.user.info`: Provide the schema registry
  credentials in the format `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD`.

You can retrieve these values from the
[prerequisite step](/docs/products/kafka/kafka-connect/howto/cassandra-streamreactor-sink#connect_cassandra_lenses_sink_prereq).
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

1. In the sink connectors list, select **Amazon S3 source connector**, and click
   **Get started**.
1. On the **Stream Reactor Cassandra Sink** page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `cassandra_sink.json` file into the text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.
1. Confirm that data appears in the Cassandra target table.

</TabItem>
<TabItem value="cli" label="CLI">

To create the connector using the
[Aiven CLI](/docs/tools/cli/service/connector#avn_service_connector_create), run:

```bash
avn service connector create SERVICE_NAME @cassandra_sink.json
```

Replace:

- `SERVICE_NAME`: Your Kafka or Kafka Connect service name.
- `@cassandra_sink.json`: Path to your configuration file.

</TabItem>
</Tabs>

## Sink topic data to Cassandra

The following example shows how to sink data from a Kafka topic to a Cassandra table. If
your Kafka topic `students` contains the following data:

```json
{"id":1, "name":"carlo", "age": 77}
{"id":2, "name":"lucy", "age": 55}
{"id":3, "name":"carlo", "age": 33}
{"id":2, "name":"lucy", "age": 21}
```

To write this data to the `students_tbl` table in the `students_keyspace` keyspace,
use the following connector configuration:

```json
{
  "name": "my-cassandra-sink",
  "connector.class": "com.datamountaineer.streamreactor.connect.cassandra.sink.CassandraSinkConnector",
  "topics": "students",
  "connect.cassandra.host": "CASSANDRA_HOSTNAME",
  "connect.cassandra.port": "CASSANDRA_PORT",
  "connect.cassandra.username": "CASSANDRA_USERNAME",
  "connect.cassandra.password": "CASSANDRA_PASSWORD",
  "connect.cassandra.ssl.enabled": "CASSANDRA_SSL",
  "connect.cassandra.trust.store.path": "CASSANDRA_TRUSTSTORE",
  "connect.cassandra.trust.store.password": "CASSANDRA_TRUSTSTORE_PASSWORD",
  "connect.cassandra.key.space": "students_keyspace",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter.schemas.enable": "false",
  "connect.cassandra.kcql": "INSERT INTO students_tbl SELECT id, name, age FROM students"
}

```

Replace all placeholder values (such as `CASSANDRA_HOSTNAME`, `CASSANDRA_PORT`,
and `CASSANDRA_USERNAME`) with your actual Cassandra connection details.

This configuration does the following:

- `"topics": "students"`: Specifies the Kafka topic to sink.
- Connection settings (`connect.cassandra.*`)**: Provide the Cassandra host, port,
  credentials, SSL settings, and truststore paths.
- `"value.converter"` and `"value.converter.schemas.enable"`: Set the message format.
  The topic uses raw JSON without a schema.
- `"connect.cassandra.kcql"`: Defines the insert logic. Each Kafka message is written
  as a new row in the `students_tbl` Cassandra table.

After creating the connector, check the Cassandra database to verify that the data has
been written.
