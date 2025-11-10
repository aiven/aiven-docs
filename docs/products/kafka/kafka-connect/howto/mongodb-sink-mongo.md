---
title: Create a MongoDB sink connector for Aiven for Apache Kafka®
sidebar_label: MongoDB sink connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';
import RelatedPages from "@site/src/components/RelatedPages";

Use the MongoDB sink connector to move data from an Aiven for Apache Kafka® service to a MongoDB database.

Aiven provides two MongoDB sink connectors with different capabilities:

- **MongoDB Kafka Sink Connector (by MongoDB):** The standard connector maintained by
  MongoDB.
- **MongoDB Sink Connector (by Lenses.io):** Supports KCQL transformations for topic data
  before writing to MongoDB.

For information about the Lenses.io connector,
see [MongoDB sink connector (Lenses.io)](mongodb-sink-lenses).

For detailed configuration parameters, refer to the
[MongoDB Kafka connector documentation](https://www.mongodb.com/docs/kafka-connector/current/).

## Prerequisites {#connect_mongodb_sink_prereq}

- An
  [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster)
- A running MongoDB database with valid credentials and network access from the Kafka
  Connect service
- The following MongoDB connection details:
  - `MONGODB_USERNAME`: Database username
  - `MONGODB_PASSWORD`: Database password
  - `MONGODB_HOST`: MongoDB host name
  - `MONGODB_PORT`: MongoDB port
  - `MONGODB_DATABASE_NAME`: Target database name
- A source Kafka topic with data to write to MongoDB
- Access to one of the following setup methods:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven Provider for Terraform](/docs/tools/terraform#get-started)
- Authentication configured for your project
  (for example, set the `AIVEN_API_TOKEN` environment variable if using the CLI or Terraform)

### Additional details for Avro data format

If you use Avro serialization, collect the following Schema Registry details:

- `SCHEMA_REGISTRY_URL`: Schema Registry URL, for example `https://HOST:PORT`
- `SCHEMA_REGISTRY_PORT`: Schema Registry port
- `SCHEMA_REGISTRY_USER`: Schema Registry username
- `SCHEMA_REGISTRY_PASSWORD`: Schema Registry password

:::tip
Aiven for Apache Kafka® includes [Karapace](https://github.com/aiven/karapace) as the
built-in Schema Registry.

Find connection details in the Aiven Console under
**<ConsoleLabel name="overview"/> > Connection information > Schema Registry**, or
using the [Aiven CLI](/docs/tools/cli/service-cli#avn_service_get)
command `avn service get`.
:::

## Create a MongoDB sink connector configuration file

Create a file named `mongodb_sink_config.json` with the following configuration:

```json
{
  "name": "mongodb-sink",
  "connector.class": "com.mongodb.kafka.connect.MongoSinkConnector",
  "topics": "students",
  "connection.uri": "mongodb://USERNAME:PASSWORD@HOST:PORT",
  "database": "school",
  "collection": "students",
  "tasks.max": "1",
  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "key.converter.schema.registry.url": "https://SCHEMA_REGISTRY_HOST:SCHEMA_REGISTRY_PORT",
  "key.converter.basic.auth.credentials.source": "USER_INFO",
  "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "value.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter.schema.registry.url": "https://SCHEMA_REGISTRY_HOST:SCHEMA_REGISTRY_PORT",
  "value.converter.basic.auth.credentials.source": "USER_INFO",
  "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD"
}
```

Parameters:

- `name`: Name of the connector
- `connector.class`: Class name of the MongoDB sink connector
- `topics`: Comma-separated list of Kafka topics to sink
- `connection.uri`: MongoDB connection URI
- `database`: Target MongoDB database name
- `collection`: Target MongoDB collection name. If not specified, the connector uses the
  topic name by default
- `tasks.max`: Maximum number of parallel tasks for writing data
- `key.converter` and `value.converter`: Define the serialization format for records
  (Avro, JSON, or others supported by your Kafka service)
- `key.converter.schema.registry.url` and `value.converter.schema.registry.url`: URL of
  the Schema Registry
- `key.converter.basic.auth.credentials.source` and
  `value.converter.basic.auth.credentials.source`: Method used to supply Schema Registry
  credentials
- `key.converter.schema.registry.basic.auth.user.info` and
  `value.converter.schema.registry.basic.auth.user.info`: Schema Registry credentials in
  the format `username:password`

For advanced configuration options, including batch size, document mapping, and
topic management, refer to the [MongoDB Kafka connector documentation](https://www.mongodb.com/docs/kafka-connector/current/).

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Kafka Connect is enabled on the service.
   If not, enable it under **Service settings** > **Actions** > **Enable Kafka Connect**.
1. From the list of sink connectors, select **MongoDB sink connector**, and click **Get started**.
1. In the **Common** tab, locate the **Connector configuration** text box and click
   <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `mongodb_sink_config.json` file into the text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.
1. Verify that data from the Kafka topic appears in MongoDB.

</TabItem>
<TabItem value="cli" label="CLI">

To create the MongoDB sink connector using the Aiven CLI, run:

```bash
avn service connector create SERVICE_NAME @mongodb_sink_config.json
```

Replace:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka or Kafka Connect service
- `@mongodb_sink_config.json`: Path to your JSON configuration file

</TabItem>
<TabItem value="terraform" label="Terraform">

You can configure this connector using the
[`aiven_kafka_connector`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_connector)
resource in the Aiven Provider for Terraform.

For configuration examples, see the
[MongoDB sink connector Terraform example](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/kafka/kafka_connectors/mongo_sink).

</TabItem>
</Tabs>

## Example: Create a MongoDB sink connector

The following example creates a MongoDB sink connector that writes data
from the Kafka topic `students` to a MongoDB database named `school`.

**Kafka topic (`students`):**

```
key: 1       value: {"name": "carlo"}
key: 2       value: {"name": "lucy"}
key: 3       value: {"name": "mary"}
```

**Connector configuration:**

```json
{
"name": "mongodb-sink",
"connector.class": "com.mongodb.kafka.connect.MongoSinkConnector",
"topics": "students",
"connection.uri": "mongodb://USERNAME:PASSWORD@HOST:PORT",
"database": "school",
"tasks.max": "1"
}
```

This configuration writes records from the Kafka topic `students` to a collection
named `students` in the MongoDB database `school`.

### Verify data flow

After creating the connector:

1. Check the connector status on the **Connectors** page in the Aiven Console.
1. Verify that a `students` collection exists in the MongoDB database.
1. Confirm that records from the Kafka topic are written to the collection.

<RelatedPages/>

- [MongoDB sink connector (Lenses.io) for Aiven for Apache Kafka®](/docs/products/kafka/kafka-connect/howto/mongodb-sink-lenses)
- [MongoDB source connector for Aiven for Apache Kafka®](/docs/products/kafka/kafka-connect/howto/mongodb-poll-source-connector)
