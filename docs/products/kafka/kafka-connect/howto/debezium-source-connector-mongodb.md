---
title: Create a Debezium source connector from MongoDB to Apache Kafka®
---

The Debezium source connector for MongoDB tracks database changes using
a MongoDB replica set or shared cluster, and writes them to an Apache
Kafka® topic in a standard format where they can be transformed and read
by multiple consumers.

:::note
You can check the full set of available parameters and configuration
options in the [connector's
documentation](https://debezium.io/docs/connectors/mongodb/).
:::

## Prerequisites {#connect_debezium_mongodb_source_prereq}

To setup a Debezium source connector pointing to MongoDB, you need an
Aiven for Apache Kafka service
[with Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Furthermore you need to collect the following information about the
source MongoDB database upfront:

-   `MONGODB_HOST`: The database hostname
-   `MONGODB_PORT`: The database port
-   `MONGODB_USER`: The database user to connect
-   `MONGODB_PASSWORD`: The database password for the `MONGODB_USER`
-   `MONGODB_DATABASE_NAME`: The database name to include in the replica
-   `MONGODB_REPLICA_SET_NAME`: The name of MongoDB's replica set
-   `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service, only
    needed when using Avro as data format
-   `SCHEMA_REGISTRY_PORT`: The Apache Kafka's schema registry port,
    only needed when using Avro as data format
-   `SCHEMA_REGISTRY_USER`: The Apache Kafka's schema registry
    username, only needed when using Avro as data format
-   `SCHEMA_REGISTRY_PASSWORD`: The Apache Kafka's schema registry user
    password, only needed when using Avro as data format

:::note
If you're using Aiven for Apache Kafka®, the Kafka related details are
available in the [Aiven console](https://console.aiven.io/) service
Overview tab or via the dedicated `avn service get` command with the
[Aiven CLI](/docs/tools/cli/service-cli#avn_service_get).
:::

## Setup a MongoDB Debezium source connector with Aiven Console

The following example demonstrates how to setup a Debezium source
connector for Apache Kafka to a MongoDB database using the [Aiven
Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Define the connector configurations in a file (we'll refer to it with
the name `debezium_source_mongodb.json`) with the following content.
Creating a file is not strictly necessary but allows to have all the
information in one place before copy/pasting them in the [Aiven
Console](https://console.aiven.io/):

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "io.debezium.connector.mongodb.MongoDbConnector",
    "mongodb.hosts": "MONGODB_REPLICA_SET_NAME/MONGODB_HOST:MONGODB_PORT",
    "mongodb.name" : "MONGODB_DATABASE_NAME",
    "mongodb.user": "MONGODB_USER",
    "mongodb.password": "MONGODB_PASSWORD",
    "tasks.max":"NR_TASKS",
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

-   `name`: the connector name, replace CONNECTOR_NAME with the name you
    want to use for the connector

-   `MONGODB_HOST`, `MONGODB_PORT`, `MONGODB_DATABASE_NAME`,
    `MONGODB_USER`, `MONGODB_PASSWORD` and `MONGODB_REPLICA_SET_NAME`:
    source database parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-mongodb#connect_debezium_mongodb_source_prereq) phase.

-   `tasks.max`: maximum number of tasks to execute in parallel. By
    default this is 1, the connector can use at most 1 task for each
    collection defined. Replace `NR_TASKS` with the amount of parallel
    task based on the number of input collections.

-   `key.converter` and `value.converter`: defines the messages data
    format in the Apache Kafka topic. The
    `io.confluent.connect.avro.AvroConverter` converter pushes messages
    in Avro format. To store the messages schema we use Aiven's
    [Karapace schema registry](https://github.com/aiven/karapace) as
    specified by the `schema.registry.url` parameter and related
    credentials.

    :::note
    The `key.converter` and `value.converter` sections are only needed
    when pushing data in Avro format. If omitted the messages will be
    defined in JSON format.

    The `USER_INFO` is **not** a placeholder, no substitution is needed
    for that parameter.
    :::

### Create a Kafka Connect connector with the Aiven Console

To create a Kafka Connect connector, follow these steps:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
    service where the connector needs to be defined.

2.  Select **Connectors** from the left sidebar.

3.  Select **Create New Connector**, the button is enabled only for
    services
    [with Kafka Connect enabled](enable-connect).

4.  Select **Debezium - MongoDB**.

5.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

6.  Paste the connector configuration (stored in the
    `debezium_source_mongodb.json` file) in the form.

7.  Select **Apply**.

    :::note
    The Aiven Console parses the configuration file and fills the
    relevant UI fields. You can review the UI fields across the various
    tabs and change them if necessary. The changes will be reflected in
    JSON format in the **Connector configuration** text box.
    :::

8.  After all the settings are correctly configured, select **Create new
    connector**.

    :::tip
    If you're using Aiven for Apache Kafka, topics will not be created
    automatically. Either create them manually following the
    `database.server.name.schema_name.table_name` naming pattern or
    enable the `kafka.auto_create_topics_enable` advanced parameter.
    :::

9.  Verify the connector status under the **Connectors** screen.

10. Verify the presence of the data in the target Apache Kafka topic
    coming from the MongoDB dataset. The topic name is equal to the
    concatenation of the database and collection name. If you need to
    change the target table name, you can do so using the Kafka Connect
    `RegexRouter` transformation.

You can also create connectors using the
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
