---
title: Create a Debezium source connector from MongoDB to Apache Kafka®
---

Track and write MongoDB database changes to an Apache Kafka® topic in a standard format with the Debezium source connector, enabling transformation and access by multiple consumers using a MongoDB replica set or sharded cluster.

import Note from "@site/static/includes/debezium-breakingchange.md"

<Note/>


## Prerequisites {#connect_debezium_mongodb_source_prereq}

To configure a Debezium source connector for MongoDB, you need either an
Aiven for Apache Kafka service with [Apache Kafka Connect enabled](enable-connect) or
a [dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

:::note
You can view the full set of available parameters and configuration
options in the [connector's
documentation](https://debezium.io/docs/connectors/mongodb/).
:::

Before you begin, gather the necessary information about your source MongoDB database:

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
With Aiven for Apache Kafka, you can gather the necessary Apache Kafka
details from the service's Overview page on the [Aiven
console](https://console.aiven.io/)  or by using the `avn service get` command with
the [Aiven CLI](/docs/tools/cli/service-cli#avn_service_get).
:::

## Setup a MongoDB Debezium source connector with Aiven Console

The following example demonstrates how to setup a Debezium source
connector for Apache Kafka to a MongoDB database using the [Aiven
Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Create a configuration file named `debezium_source_mongodb.json` with the following
connector configurations. While optional, creating this file helps you organize your
settings in one place and copy/paste them into the
[Aiven Console](https://console.aiven.io/) later.

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

-   `name`: The connector name, replace CONNECTOR_NAME with the name you
    want to use for the connector

-   `MONGODB_HOST`, `MONGODB_PORT`, `MONGODB_DATABASE_NAME`,
    `MONGODB_USER`, `MONGODB_PASSWORD` and `MONGODB_REPLICA_SET_NAME`:
    Source database parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-mongodb#connect_debezium_mongodb_source_prereq)
    phase.

-   `tasks.max`: Maximum number of tasks to execute in parallel. By
    default this is 1, the connector can use at most 1 task for each
    collection defined. Replace `NR_TASKS` with the amount of parallel
    task based on the number of input collections.

-   `key.converter` and `value.converter`: Defines the messages data
    format in the Apache Kafka topic. The
    `io.confluent.connect.avro.AvroConverter` converter pushes messages
    in Avro format. To store the message schemas, Aiven's
    [Karapace schema registry](https://github.com/Aiven-Open/karapace) is used,
    specified by the `schema.registry.url` parameter and related credentials.

    :::note
    The `key.converter` and `value.converter` sections are only needed
    when pushing data in Avro format. Otherwise, messages default to JSON format.

    The `USER_INFO` is not a placeholder and does not require any parameter substitution.
    :::

### Create a Kafka Connect connector with the Aiven Console

To create a Kafka Connect connector:

1.  Log in to the [Aiven Console](https://console.aiven.io/).

1.  Select the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect® service
    to define the connector.

1.  Select **Connectors** from the sidebar.

1.  Select **Create New Connector**, which is available only for
    services [that have Apache Kafka Connect enabled](enable-connect).

1.  Select **Debezium - MongoDB**.

1.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

1.  Paste the connector configuration (stored in the
    `debezium_source_mongodb.json` file) in the form.

1.  Select **Apply**.

    :::note
    The Aiven Console reads through the configuration file and automatically populates
    the relevant UI fields. You can view and modify these fields across
    different tabs. Any change you make is reflected in JSON format
    within the **Connector configuration** text box.
    :::

1. After all the settings are correctly configured, select **Create new
   connector**.

   :::tip
   With Aiven for Apache Kafka, topics are not created automatically. You have two options:

   - Manually create topics using the naming pattern: `database.server.name.schema_name.table_name`.
   - Enable the `Kafka topic auto-creation` feature.
     See [Enable automatic topic creation with Aiven CLI](/docs/products/kafka/howto/create-topics-automatically).
   :::

1. Verify the connector status under the **Connectors** screen.

1. Verify the presence of the data in the target Apache Kafka topic
   coming from the MySQL dataset. The topic name is equal to
   concatenation of the database and table name. To change
   the target table name, you can use Apache Kafka Connect
   `RegexRouter` transformation.

You can also create connectors using the
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
