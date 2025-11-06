---
title: Create a MongoDB source connector for Aiven for Apache Kafka®
sidebar_label: MongoDB source connector
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Use the MongoDB source connector to stream data from MongoDB collections into Apache Kafka® topics for processing and analytics.

:::tip
The MongoDB source connector uses **change streams** to capture and emit changes
at defined intervals. Instead of continuously polling the collection, the connector
queries the change stream at a configurable interval to detect updates.
For a log-based change data capture (CDC) approach, use the
[Debezium source connector for MongoDB](https://debezium.io/documentation/reference/stable/connectors/mongodb.html).
:::

## Prerequisites {#connect_mongodb_pull_source_prereq}


- An
  [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster)
- A MongoDB database and collection with accessible credentials
- The following MongoDB connection details:
  - `connection.uri`: Connection URI in the format `mongodb://USERNAME:PASSWORD@HOST:PORT`
  - `database`: Name of the MongoDB database
  - `collection`: Name of the MongoDB collection
- A target Apache Kafka topic where the connector writes the data
- Access to one of the following setup methods:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven Provider for Terraform](/docs/tools/terraform#get-started)
- Authentication configured for your project
  (for example, set the `AIVEN_API_TOKEN` environment variable if using the CLI or Terraform)

:::tip
The connector writes to a topic named `DATABASE.COLLECTION`.
Create the topic in advance or enable the `auto_create_topic` parameter in your Kafka
service.
:::

## Create a MongoDB source connector configuration file

Create a file named `mongodb_source_config.json` with the following configuration:

```json
{
"name": "mongodb-source",
"connector.class": "com.mongodb.kafka.connect.MongoSourceConnector",
"connection.uri": "mongodb://USERNAME:PASSWORD@HOST:PORT",
"database": "DATABASE_NAME",
"collection": "COLLECTION_NAME",
"poll.await.time.ms": "5000",
"output.format.key": "json",
"output.format.value": "json",
"publish.full.document.only": "true"
}
```

Parameters:

- `name`: Name of the connector
- `connector.class`: Class name of the MongoDB source connector
- `connection.uri`: MongoDB connection URI with authentication
- `database`: Name of the MongoDB database to read from
- `collection`: Name of the MongoDB collection to stream from
- `poll.await.time.ms`: Interval in milliseconds for polling new changes. Default is `5000`
- `output.format.key` and `output.format.value`: Format for the key and value of each
  Kafka record. Supported values: `json`, `bson`, `schema`
- `publish.full.document.only`: When `true`, only the changed document is published
  instead of the full change event

### Advanced options

For advanced use cases, such as schema inference, document filtering, or topic overrides,
you can customize additional parameters.
See the
[MongoDB Kafka connector documentation](https://www.mongodb.com/docs/kafka-connector/current/)
for the full list of available options.

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Kafka Connect is enabled on the service.
   If not, enable Kafka Connect under **Service settings** > **Actions** >
   **Enable Kafka Connect**.
1. In the source connectors list, select **MongoDB source connector**, and
   click **Get started**.
1. In the **Common** tab, locate the **Connector configuration** text box and
   click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `mongodb_source_config.json` file into the text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.
1. Verify that data appears in the target Kafka topic.
   By default, the connector writes to a topic named after the MongoDB database and
   collection, for example, `districtA.students`.

</TabItem>
<TabItem value="cli" label="CLI">

To create the MongoDB source connector using the Aiven CLI, run:

```bash
avn service connector create SERVICE_NAME @mongodb_source_config.json
```

Replace:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka or Kafka Connect service
- `@mongodb_source_config.json`: Path to your JSON configuration file

</TabItem>
<TabItem value="terraform" label="Terraform">

You can configure this connector using the
[`aiven_kafka_connector`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_connector)
resource in the Aiven Provider for Terraform.

Example:

```hcl
resource "aiven_kafka_connector" "mongodb_source_connector" {
  project        = var.project_name
  service_name   = aiven_kafka.example_kafka.service_name
  connector_name = "mongodb-source-connector"

  config = {
    "name"                       = "mongodb-source-connector"
    "connector.class"            = "com.mongodb.kafka.connect.MongoSourceConnector"
    "connection.uri"             = var.mongodb_connection_uri
    "database"                   = "sample_airbnb"
    "collection"                 = "listingsAndReviews"
    "copy.existing"              = "true"
    "poll.await.time.ms"         = "1000"
    "output.format.value"        = "json"
    "output.format.key"          = "json"
    "publish.full.document.only" = "true"
  }
}
```

Define variables such as `project_name` and `mongodb_connection_uri` in your Terraform configuration.

</TabItem>
</Tabs>

## Example: Create a MongoDB source connector

The following example shows how to create a MongoDB source connector that reads data
from the `students` collection in the `districtA` database and writes it to a Kafka
topic named `districtA.students`.

**MongoDB collection (`students`):**

```json
{"name": "carlo", "age": 77}
{"name": "lucy", "age": 55}
{"name": "carlo", "age": 33}
```

**Connector configuration:**

```json
{
  "name": "mongodb-source-students",
  "connector.class": "com.mongodb.kafka.connect.MongoSourceConnector",
  "connection.uri": "mongodb://USERNAME:PASSWORD@HOST:PORT",
  "database": "districtA",
  "collection": "students",
  "output.format.key": "json",
  "output.format.value": "json",
  "output.schema.infer.value": "true",
  "poll.await.time.ms": "1000"
}
```

This configuration streams data from the `students` collection to the Kafka
topic `districtA.students` every second, based on the polling interval (`poll.await.time.ms`).

### Verify data flow

After you create the connector:

1. Check the connector status on the **Connectors** page in the Aiven Console.
1. Confirm that the Kafka topic `districtA.students` exists in your service.
1. Consume messages from the topic to verify that data from MongoDB is streaming
   correctly.
