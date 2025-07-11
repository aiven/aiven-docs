---
title: Create a sink connector by Lenses.io from Apache Kafka® to MongoDB
displayed_sidebar: serviceSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Note from "@site/static/includes/streamreactor-compatibility-note.md"

The MongoDB Stream Reactor sink connector enables you to move data from an Aiven for Apache Kafka cluster to a MongoDB database.
It uses [KCQL transformations](https://docs.lenses.io/5.0/integrations/connectors/stream-reactor/sinks/mongosinkconnector/)
to filter and map topic data before sending it to MongoDB.

:::note
Aiven supports two different MongoDB sink connectors. Each has a separate
implementation and configuration options:

- [MongoDB sink connector by MongoDB](https://docs.mongodb.com/kafka-connector/current/)
- [MongoDB sink connector by Lenses.io](https://docs.lenses.io/connectors/sink/mongo)

This document covers the connector by Lenses.io. For the MongoDB connector by
MongoDB, see the [related document](mongodb-sink-mongo).
:::

<Note/>

## Prerequisites {#connect_mongodb_lenses_sink_prereq}

- An Aiven for Apache Kafka service
  [with Apache Kafka Connect enabled](enable-connect) or a
  [dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

- Gather the following information for the target MongoDB database:

  - `MONGODB_USERNAME`: The MongoDB username.
  - `MONGODB_PASSWORD`: The MongoDB password.
  - `MONGODB_HOST`: The MongoDB hostname.
  - `MONGODB_PORT`: The MongoDB port.
  - `MONGODB_DATABASE_NAME`: The target MongoDB database name.
  - `TOPIC_LIST`: A comma-separated list of Kafka topics to sink.
  - `KCQL_TRANSFORMATION`: A KCQL statement to map topic data to MongoDB collections.
    Use the following format:

    ```sql
    INSERT | UPSERT INTO MONGODB_COLLECTION
    SELECT LIST_OF_FIELDS
    FROM APACHE_KAFKA_TOPIC
    ```

  - `APACHE_KAFKA_HOST`: The Apache Kafka host. Required only when using Avro.
  - `SCHEMA_REGISTRY_PORT`: The schema registry port. Required only when using Avro.
  - `SCHEMA_REGISTRY_USER`: The schema registry username. Required only when using Avro.
  - `SCHEMA_REGISTRY_PASSWORD`: The schema registry password. Required only when using
    Avro.

    :::note
    If you are using Aiven for MongoDB and Aiven for Apache Kafka, get all required
    connection details, including schema registry information, from the
    **Connection information** section on the <ConsoleLabel name="overview"/> page.

    As of version 3.0, Aiven for Apache Kafka uses Karapace as the schema registry and
    no longer supports the Confluent Schema Registry.
    :::

For a complete list of supported parameters and configuration options, see the
[connector's documentation](https://docs.lenses.io/connectors/sink/mongo).

## Create a connector configuration file

Create a file named `mongodb_sink.json` and add the following configuration:

```json
{
  "name": "CONNECTOR_NAME",
  "connector.class": "com.datamountaineer.streamreactor.connect.mongodb.sink.MongoSinkConnector",
  "topics": "TOPIC_LIST",
  "connect.mongo.connection": "mongodb://MONGODB_USERNAME:MONGODB_PASSWORD@MONGODB_HOST:MONGODB_PORT",
  "connect.mongo.db": "MONGODB_DATABASE_NAME",
  "connect.mongo.kcql": "KCQL_TRANSFORMATION",
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
- `connect.mongo.*`: MongoDB connection parameters collected in the
   [prerequisite step](/docs/products/kafka/kafka-connect/howto/mongodb-sink-lenses#connect_mongodb_lenses_sink_prereq).
- `key.converter` and `value.converter`: Define the message data format in the Kafka topic.
  This example uses `io.confluent.connect.avro.AvroConverter` to translate messages
  in Avro format.
  The schema is retrieved from Aiven's [Karapace schema registry](https://github.com/aiven/karapace)
  using the `schema.registry.url` and related credentials.

:::note
The `key.converter` and `value.converter` fields define how Kafka messages are parsed
and must be included in the configuration.

When using Avro as the source format, set the following:

- `value.converter.schema.registry.url`: Use the Aiven for Apache Kafka schema registry
  URL in the format `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT`.
  Retrieve these values from the
  [prerequisite step](/docs/products/kafka/kafka-connect/howto/mongodb-sink-lenses#connect_mongodb_lenses_sink_prereq).
- `value.converter.basic.auth.credentials.source`: Set to `USER_INFO`, which means
  authentication is done using a username and password.
- `value.converter.schema.registry.basic.auth.user.info`: Provide the schema registry
  credentials in the format `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD`.
  These values should also be retrieved from the
  [prerequisite step](/docs/products/kafka/kafka-connect/howto/mongodb-sink-lenses#connect_mongodb_lenses_sink_prereq).

:::

## Setup a MongoDB sink connector with Aiven Console

The following example demonstrates how to setup a MongoDB sink connector
for Apache Kafka using the [Aiven Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Define the connector configurations in a file (we'll refer to it with
the name `mongodb_sink.json`) with the following content, creating a
file is not strictly necessary but allows to have all the information in
one place before copy/pasting them in the [Aiven
Console](https://console.aiven.io/):

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "com.datamountaineer.streamreactor.connect.mongodb.sink.MongoSinkConnector",
    "topics": "TOPIC_LIST",
    "connect.mongo.connection": "mongodb://MONGODB_USERNAME:MONGODB_PASSWORD@MONGODB_HOST:MONGODB_PORT",
    "connect.mongo.db": "MONGODB_DATABASE_NAME",
    "connect.mongo.kcql": "KCQL_TRANSFORMATION",
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

The configuration file contains the following entries:

-   `name`: the connector name, replace `CONNECTOR_NAME` with the name
    to give To the connector.
-   `connect.mongo.connection`: sink parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/mongodb-sink-lenses#connect_mongodb_lenses_sink_prereq) phase.
-   `key.converter` and `value.converter`: defines the messages data
    format in the Apache Kafka topic. The
    `io.confluent.connect.avro.AvroConverter` converter translates
    messages from the Avro format. To retrieve the messages schema we
    use Aiven's [Karapace schema
    registry](https://github.com/aiven/karapace) as specified by the
    `schema.registry.url` parameter and related credentials.

:::note
The `key.converter` and `value.converter` sections define how the topic
messages will be parsed and needs to be included in the connector
configuration.

When using Avro as source data format, set following
parameters:

-   `value.converter.schema.registry.url`: pointing to the Aiven for
    Apache Kafka schema registry URL in the form of
    `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT` with the
    `APACHE_KAFKA_HOST` and `SCHEMA_REGISTRY_PORT` parameters
    [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/mongodb-sink-lenses#connect_mongodb_lenses_sink_prereq).
-   `value.converter.basic.auth.credentials.source`: to the value
    `USER_INFO`, since you're going to login to the schema registry
    using username and password.
-   `value.converter.schema.registry.basic.auth.user.info`: passing the
    required schema registry credentials in the form of
    `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD` with the
    `SCHEMA_REGISTRY_USER` and `SCHEMA_REGISTRY_PASSWORD` parameters
    [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/mongodb-sink-lenses#connect_mongodb_lenses_sink_prereq).
:::

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Console" default>

1. Go to the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Kafka Connect is enabled on the service.
   If not, click **Enable connector on this service**.

   To enable connectors:

   1. Click <ConsoleLabel name="Service settings"/> in the sidebar.
   1. In the **Service management** section, click
      <ConsoleLabel name="Actions"/> > **Enable Kafka Connect**.

1. From the list of sink connectors, select **Stream Reactor MongoDB Sink** and click **Get started**.
1. On the **Common** tab, go to the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the contents of your `mongodb_sink.json` configuration file into the text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.
1. Confirm that data appears in the target MongoDB collection.
   The collection name corresponds to the Kafka topic name defined in the KCQL statement.

</TabItem>
<TabItem value="cli" label="CLI">

To create the connector using the
[Aiven CLI](/docs/tools/cli/service/connector#avn_service_connector_create), run:

```bash
avn service connector create SERVICE_NAME @mongodb_sink.json
```

Replace:

- `SERVICE_NAME`: Your Kafka or Kafka Connect service name.
- `@mongodb_sink.json`: Path to your configuration file.

</TabItem>
</Tabs>

## Sink topic data to MongoDB

The following examples show how to sink data from a Kafka topic to a MongoDB collection.

### Insert mode

If the Kafka topic `students` contains the following records:

```json
{"name": "carlo", "age": 77}
{"name": "lucy", "age": 55}
{"name": "carlo", "age": 33}
```

Use the following connector configuration to insert each record into a MongoDB
collection named `studentscol`:

```json
{
  "name": "my-mongodb-sink",
  "connector.class": "com.datamountaineer.streamreactor.connect.mongodb.sink.MongoSinkConnector",
  "connect.mongo.connection": "mongodb://MONGODB_USERNAME:MONGODB_PASSWORD@MONGODB_HOST:MONGODB_PORT",
  "connect.mongo.db": "MONGODB_DB_NAME",
  "topics": "students",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter.schemas.enable": "false",
  "connect.mongo.kcql": "INSERT INTO studentscol SELECT * FROM students"
}
```

Replace all placeholders (such as `MONGODB_HOST`, `MONGODB_DB_NAME`, and
`MONGODB_USERNAME`) with your actual MongoDB connection details.

This configuration does the following:

- `"topics": "students"`: Specifies the Kafka topic to sink.
- Connection settings (`connect.mongo.*`): Provide the MongoDB host, port, credentials,
  and database name.
- `"value.converter"` and `"value.converter.schemas.enable"`: Set the message format.
  The topic uses raw JSON without a schema.
- `"connect.mongo.kcql"`: Defines the insert logic. Each Kafka message is written as a
  new document in the `studentscol` MongoDB collection.

After creating the connector, check the MongoDB collection to verify that the data
has been inserted. You should see three documents in the `studentscol` collection.

### Upsert mode

To ensure only one document per unique name is stored, use upsert mode. If
the `students` topic contains:

```json
{"name": "carlo", "age": 77}
{"name": "lucy", "age": 55}
{"name": "carlo", "age": 33}
```

Use the following connector configuration:

```json
{
  "name": "my-mongodb-sink",
  "connector.class": "com.datamountaineer.streamreactor.connect.mongodb.sink.MongoSinkConnector",
  "connect.mongo.connection": "mongodb://MONGODB_USERNAME:MONGODB_PASSWORD@MONGODB_HOST:MONGODB_PORT",
  "connect.mongo.db": "MONGODB_DB_NAME",
  "topics": "students",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter.schemas.enable": "false",
  "connect.mongo.kcql": "UPSERT INTO studentscol SELECT * FROM students PK name"
}
```

This configuration performs the following:

- Uses the same connection and converter settings as the insert mode example.
- `"connect.mongo.kcql"`: Uses `UPSERT` logic with `PK name` to update the document
  based on the `name` field.

After the connector runs, the `studentscol` collection contains two documents,
because the record with `"name": "carlo"` is upserted:

```json
{"name": "lucy", "age": 55}
{"name": "carlo", "age": 33}
```
