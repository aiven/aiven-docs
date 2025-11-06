---
title: Create a MongoDB sink connector (Lenses.io) for Aiven for Apache Kafka®
sidebar_label: MongoDB sink connector (Lenses.io)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Note from "@site/static/includes/streamreactor-compatibility-note.md"
import RelatedPages from "@site/src/components/RelatedPages";

Use the MongoDB sink connector by Lenses.io to write data from Apache Kafka® topics into a MongoDB database.
This connector supports
[KCQL transformations](https://docs.lenses.io/5.0/integrations/connectors/stream-reactor/sinks/mongosinkconnector/)
to filter and map topic data before inserting it into MongoDB.

Aiven supports two MongoDB sink connectors with different capabilities:

- [MongoDB sink connector by MongoDB](https://www.mongodb.com/docs/kafka-connector/current/)
- [MongoDB sink connector by Lenses.io](https://docs.lenses.io/connectors/sink/mongo)

## Prerequisites {#connect_mongodb_lenses_sink_prereq}

- An
  [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster)
- A MongoDB database with accessible connection credentials
- The following MongoDB and Kafka connection details:
  - `MONGODB_USERNAME`: MongoDB username
  - `MONGODB_PASSWORD`: MongoDB password
  - `MONGODB_HOST`: MongoDB hostname
  - `MONGODB_PORT`: MongoDB port
  - `MONGODB_DATABASE_NAME`: MongoDB database name
  - `TOPIC_LIST`: Comma-separated list of Kafka topics to sink
  - `KCQL_TRANSFORMATION`: KCQL mapping statement. For example:

    ```sql
    INSERT INTO MONGODB_COLLECTION
    SELECT * FROM APACHE_KAFKA_TOPIC
    ```

  - Schema Registry details (required only for Avro format):
    - `APACHE_KAFKA_HOST`: Kafka host
    - `SCHEMA_REGISTRY_PORT`: Schema Registry port
    - `SCHEMA_REGISTRY_USER`: Schema Registry username
    - `SCHEMA_REGISTRY_PASSWORD`: Schema Registry password
- Access to one of the following setup methods:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven Provider for Terraform](/docs/tools/terraform#get-started)
- Authentication configured for your Aiven project
  (for example, set the `AIVEN_API_TOKEN` environment variable if using CLI or Terraform)

:::tip
Aiven for Apache Kafka® uses [Karapace](https://github.com/aiven/karapace) as the
built-in Schema Registry.

Find connection details in the Aiven Console under
**Overview > Connection information > Schema Registry**,
or using the [Aiven CLI](/docs/tools/cli/service-cli#avn_service_get) command `avn service get`.
:::


## Create a MongoDB sink connector configuration file

Create a file named `mongodb_sink.json` with the following configuration:

```json
{
  "name": "mongodb-sink",
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

- `name`: Connector name
- `connector.class`: Class name of the MongoDB sink connector
- `connect.mongo.connection`: MongoDB connection URI with credentials
- `connect.mongo.db`: MongoDB database name
- `connect.mongo.kcql`: KCQL statement defining how Kafka topic data maps to MongoDB
- `key.converter` and `value.converter`: Configure the data format and schema registry details
- `topics`: Kafka topics to sink data from

:::note
The `key.converter` and `value.converter` fields define how Kafka messages are parsed
and must be included in the configuration.

When using Avro as the source format, configure the following parameters:

- `value.converter.schema.registry.url`: Schema Registry URL in the
  format `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT`.
  Retrieve these values from the [prerequisites](#prerequisites).
- `value.converter.basic.auth.credentials.source`: Set to `USER_INFO` to authenticate
  with a username and password.
- `value.converter.schema.registry.basic.auth.user.info`: Schema Registry credentials in
  the format `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD`.

  Retrieve these values from the [prerequisites](#prerequisites).
:::

For advanced configurations such as batch size, write strategy, or custom transformations,
see the
[Lenses.io MongoDB sink connector reference](https://docs.lenses.io/5.0/integrations/connectors/stream-reactor/sinks/mongosinkconnector/).

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Console" default>

1. Go to the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Kafka Connect is enabled on the service.
   If not, enable it under **Service settings** > **Actions** > **Enable Kafka Connect**.
1. From the list of sink connectors, select **Stream Reactor MongoDB Sink**, and
   click **Get started**.
1. In the **Common** tab, find the **Connector configuration** text box and
   click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `mongodb_sink.json` file.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.
1. Confirm that data appears in the target MongoDB collection.
   The collection name corresponds to the KCQL mapping.

</TabItem>
<TabItem value="cli" label="CLI">

To create the connector using the Aiven CLI, run:

```bash
avn service connector create SERVICE_NAME @mongodb_sink.json
```

Replace:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka or Kafka Connect service
- `@mongodb_sink.json`: Path to your configuration file

</TabItem>
</Tabs>

## Example: Sink data to MongoDB

The following examples show how to write Kafka topic data to MongoDB collections using
KCQL transformations.

### Insert mode

If the Kafka topic `students` contains:

```json
{"name": "carlo", "age": 77}
{"name": "lucy", "age": 55}
{"name": "carlo", "age": 33}
```

Use this configuration to insert all records into a MongoDB collection named `studentscol`:

```json
{
  "name": "mongodb-sink-insert",
  "connector.class": "com.datamountaineer.streamreactor.connect.mongodb.sink.MongoSinkConnector",
  "topics": "students",
  "connect.mongo.connection": "mongodb://MONGODB_USERNAME:MONGODB_PASSWORD@MONGODB_HOST:MONGODB_PORT",
  "connect.mongo.db": "MONGODB_DATABASE_NAME",
  "connect.mongo.kcql": "INSERT INTO studentscol SELECT * FROM students",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter.schemas.enable": "false"
}
```

### Upsert mode

To ensure only one document per unique name is stored, use upsert mode:

```json
{
  "name": "mongodb-sink-upsert",
  "connector.class": "com.datamountaineer.streamreactor.connect.mongodb.sink.MongoSinkConnector",
  "topics": "students",
  "connect.mongo.connection": "mongodb://MONGODB_USERNAME:MONGODB_PASSWORD@MONGODB_HOST:MONGODB_PORT",
  "connect.mongo.db": "MONGODB_DATABASE_NAME",
  "connect.mongo.kcql": "UPSERT INTO studentscol SELECT * FROM students PK name",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter.schemas.enable": "false"
}
```

This configuration updates existing records based on the `name` field instead of
inserting duplicates.

After the connector runs, the MongoDB collection `studentscol` contains:

```json
  {"name": "lucy", "age": 55}
  {"name": "carlo", "age": 33}
```

<RelatedPages/>

- [MongoDB sink connector for Aiven for Apache Kafka®](/docs/products/kafka/kafka-connect/howto/mongodb-sink-mongo)
- [MongoDB source connector for Aiven for Apache Kafka®](/docs/products/kafka/kafka-connect/howto/mongodb-poll-source-connector)
