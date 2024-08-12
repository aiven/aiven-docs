---
title: Create a source connector from MongoDB to Apache Kafka®
---

The MongoDB source connector periodically queries MongoDB collections
and copies the new documents to Apache Kafka® where they can be
transformed and read by multiple consumers.

:::tip
The MongoDB source connector uses change streams to capture changes in
MongoDB data at set intervals. Rather than directly polling the
collection, the connector pulls new changes from a change stream using a
query-based approach. You can set the polling interval as a parameter to
determine how often changes are emitted from the stream. For a log-based
change data capture method, use the [Debezium source connector for
MongoDB](https://debezium.io/documentation/reference/stable/connectors/mongodb.html)
instead.
:::

:::note
See the full set of available parameters and configuration
options in the [connector's
documentation](https://docs.mongodb.com/kafka-connector/current/).
:::

## Prerequisites {#connect_mongodb_pull_source_prereq}

To set up a MongoDB source connector, you need an Aiven for Apache Kafka
service [with Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

:::tip
The connector will write to a topic named `DATABASE.COLLECTION` so
either create the topic in your Kafka service, or enable the
`auto_create_topic` parameter so that the topic will be created
automatically.
:::

Also collect the following information about the
source MongoDB database upfront:

-   `MONGODB_CONNECTION_URI`: The MongoDB database connection URL in the
    format `mongodb://USERNAME:PASSWORD@HOST:PORT` where:
    -   `USERNAME`: The database username to connect
    -   `PASSWORD`: The password for the username selected
    -   `HOST`: the MongoDB hostname
    -   `PORT`: the MongoDB port
-   `MONGODB_DATABASE_NAME`: The name of the MongoDB database
-   `MONGODB_COLLECTION_NAME`: The name of the MongoDB collection

The complete list of parameters and customization options is available
in the [MongoDB dedicated
documentation](https://docs.mongodb.com/kafka-connector/current/).

## Setup a MongoDB source connector with Aiven Console

The following example demonstrates how to setup an Apache Kafka MongoDB
source connector using the [Aiven Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Define the connector configurations in a file (we'll refer to it with
the name `mongodb_source.json`) with the following content, creating a
file is not strictly necessary but allows to have all the information in
one place before copy/pasting them in the [Aiven
Console](https://console.aiven.io/):

```
{
    "name":"CONNECTOR_NAME",
    "connector.class": "com.mongodb.kafka.connect.MongoSourceConnector",
    "connection.uri": "MONGODB_CONNECTION_URI",
    "database": "MONGODB_DATABASE_NAME",
    "collection": "MONGODB_COLLECTION_NAME",
    "poll.await.time.ms": "POLL_INTERVAL",
    "output.format.value": "VALUE_OUTPUT_FORMAT",
    "output.format.key": "KEY_OUTPUT_FORMAT",
    "publish.full.document.only": "true"
}
```

The configuration file contains the following entries:

-   `name`: the connector name, replace `CONNECTOR_NAME` with the name
    to give to the connector.
-   `connection.uri`, `database`, `collection`: source database
    parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/mongodb-poll-source-connector#connect_mongodb_pull_source_prereq) phase.
-   `poll.await.time.ms`: polling period, time between two queries to
    the collection, default 5000 milliseconds.
-   `output.format.value` and `output.format.key`: the output format of
    the data produced by the connector for the key/value. Supported
    formats are:
    -   `json`: Raw JSON strings
    -   `bson`: Binary JavaScript Object Notation byte array
    -   `schema`: Avro schema output, using this option an additional
        parameter (`output.schema.key` or `output.schema.value`) needs
        to be passed defining the documents schema
-   `publish.full.document.only`: only publishes the actual document
    rather than the full change stream document including additional
    metadata. Defaults to `false`.

See the [dedicated
documentation](https://docs.mongodb.com/kafka-connector/current/) for
the full list of parameters.

### Create a Kafka Connect connector with the Aiven Console

To create a Kafka Connect connector:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
    service where the connector needs to be defined.

2.  Select **Connectors** from the left sidebar.

3.  Select **Create New Connector**, it is enabled only for
    services
    [with Kafka Connect enabled](enable-connect).

4.  Select **MongoDB Kafka Source Connector**.

5.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

6.  Paste the connector configuration (stored in the
    `mongodb_source.json` file) in the form.

7.  Select **Apply**.

    :::note
    The Aiven Console parses the configuration file and fills the
    relevant UI fields. You can review the UI fields across the various
    tab and change them if necessary. The changes will be reflected in
    JSON format in the **Connector configuration** text box.
    :::

8.  After all the settings are correctly configured, select **Create
    connector**.

9.  Verify the connector status under the **Connectors** screen.

10. Verify the presence of the data in the target Apache Kafka topic,
    the topic name is equal to the concatenation of MongoDB database and
    collection names

:::note
You can also create connectors using the
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
:::

## Example: Create a MongoDB source connector

<!-- vale off -->
If you have in MongoDB a collection named `students` in a database named
`districtA` containing the following data that you want to move to
Apache Kafka:
<!-- vale on -->

```json
{"name":"carlo", "age": 77}
{"name":"lucy", "age": 55}
{"name":"carlo", "age": 33}
```

You can create a source connector taking the `students` MongoDB
collection to Apache Kafka with the following connector configuration,
after replacing the placeholders for `MONGODB_HOST`, `MONGODB_PORT`,
`MONGODB_DB_NAME`, `MONGODB_USERNAME` and `MONGODB_PASSWORD`:

```json
{
    "name": "my-mongodb-source",
    "connector.class": "com.mongodb.kafka.connect.MongoSourceConnector",
    "connection.uri": "mongodb://MONGODB_USERNAME:MONGODB_PASSWORD@MONGODB_HOST:MONGODB_PORT",
    "database": "MONGODB_DB_NAME",
    "collection": "students",
    "output.format.key": "json",
    "output.format.value": "json",
    "output.schema.infer.value": "true",
    "poll.await.time.ms": "1000"
}
```

The configuration file contains the following peculiarities:

-   `"collection": "students"`: setting the collection to source.
-   `"database": "MONGODB_DB_NAME"`: the database used is the one
    referenced by the placeholder `MONGODB_DB_NAME`.
-   `"output.format.key"` and `"output.format.value"`: are both set to
    produce messages in JSON format.
-   `"output.schema.infer.value": "true"`: the schema is automatically
    inferred.
-   `"poll.await.time.ms": "1000"`: One second polling time

Once the connector is created successfully, you should see a topic named
`MONGODB_DB_NAME.students` in Aiven for Apache Kafka.
