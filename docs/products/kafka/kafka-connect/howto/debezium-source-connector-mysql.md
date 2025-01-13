---
title: Create a Debezium source connector from MySQL to Apache Kafka®
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The MySQL Debezium source connector extracts the changes committed to the database binary log (binlog), and writes them to an Apache Kafka® topic in a standard format where they can be transformed and read by multiple consumers.

import Note from "@site/static/includes/debezium-breakingchange.md"

<Note/>

## Schema versioning {#connect_debezium_mysql_schema_versioning}

Database table schemas can evolve over time by adding, modifying, or
removing columns. The MySQL Debezium source connector keeps track of
schema changes by storing them in a separate \"history\" topic that you
can set up with dedicated `history.*` configuration parameters.

:::warning
The MySQL Debezium source connector `history.*` parameters are not
visible in the list of options available in the [Aiven
Console](https://console.aiven.io/). However, you can insert or modify them by editing
the JSON configuration in the **Connector configuration** section.
:::

## Prerequisites {#connect_debezium_mysql_source_prereq}

To configure a Debezium source connector for MySQL, you need either an
Aiven for Apache Kafka service with [Apache Kafka Connect enabled](enable-connect) or
a [dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Before you begin, gather the necessary information about your source MySQL database:

:::note
You can view the full set of available parameters and configuration
options in the [connector's
documentation](https://debezium.io/docs/connectors/mysql/).
:::

- `MYSQL_HOST`: The database hostname
- `MYSQL_PORT`: The database port
- `MYSQL_USER`: The database user to connect
- `MYSQL_PASSWORD`: The database password for the `MYSQL_USER`
- `MYSQL_DATABASE_NAME`: The database name
- `SSL_MODE`: The [SSL
  mode](https://dev.mysql.com/doc/refman/5.7/en/connection-options.html)
- `MYSQL_TABLES`: The list of database tables to be included in Apache Kafka. Format
  the list as `schema_name1.table_name1,schema_name2.table_name2`.
- `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service,
  needed when storing the
  [schema definition changes](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-mysql#connect_debezium_mysql_schema_versioning)
- `APACHE_KAFKA_PORT`: The port of the Apache Kafka service, needed
  when storing the
  [schema definition changes](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-mysql#connect_debezium_mysql_schema_versioning)
- `SCHEMA_REGISTRY_PORT`: The Apache Kafka's schema registry port is
  only needed when using Avro as a data format
- `SCHEMA_REGISTRY_USER`: The Apache Kafka's schema registry username
  is only needed when using Avro as a data format
- `SCHEMA_REGISTRY_PASSWORD`: The Apache Kafka's schema registry user
  password is only needed when using Avro as a data format

:::note
When using Aiven for MySQL and Aiven for Apache Kafka, you can gather the necessary
details from the service's Overview page on  [Aiven
console](https://console.aiven.io/)  or by using the `avn service get` command with
the [Aiven CLI](/docs/tools/cli/service-cli#avn_service_get).
:::

## Setup a MySQL Debezium source connector with Aiven Console

The following example demonstrates how to set up a Debezium source
Connector for Apache Kafka to a MySQL database using the
[Aiven CLI dedicated command](/docs/tools/cli/service/connector).

### Define a Kafka Connect configuration file

Create a configuration file named `debezium_source_mysql.json` with the following
connector configurations. While optional, creating this file helps you organize your
settings in one place and copy/paste them into the
[Aiven Console](https://console.aiven.io/) later.

<Tabs groupId="group1">
<TabItem value="2.5" label="2.5 config" default>

```json
{
  "name" : "mssql-source",
  "connector.class" : "io.debezium.connector.sqlserver.SqlServerConnector",
  "database.hostname": "MYSQL_HOST",
  "database.port": "MYSQL_PORT",
  "database.user": "MYSQL_USER",
  "database.password": "MYSQL_PASSWORD",
  "database.dbname": "MYSQL_DATABASE_NAME",
  "database.names" : "dbtest",
  "database.server.name" : "dbserver",
  "table.include.list": "MYSQL_TABLES",
  "tasks.max":"NR_TASKS",
  "topic.prefix" : var.cdc_topic_prefix,
  "poll.interval.ms" : 500,
  "schema.history.internal.kafka.topic" : format("%s.history", var.cdc_topic_prefix),
  "schema.history.internal.kafka.bootstrap.servers" : format("%s:%s", aiven_kafka.kafka.service_host, aiven_kafka.kafka.service_port)
  "schema.history.internal.producer.security.protocol" : "SSL",
  "schema.history.internal.producer.ssl.keystore.type" : "PKCS12",
  "schema.history.internal.producer.ssl.keystore.location" : "/run/aiven/keys/public.keystore.p12",
  "schema.history.internal.producer.ssl.keystore.password" : "password",
  "schema.history.internal.producer.ssl.truststore.location" : "/run/aiven/keys/public.truststore.jks",
  "schema.history.internal.producer.ssl.truststore.password" : "password",
  "schema.history.internal.producer.ssl.key.password" : "password",
  "schema.history.internal.consumer.security.protocol" : "SSL",
  "schema.history.internal.consumer.ssl.keystore.type" : "PKCS12",
  "schema.history.internal.consumer.ssl.keystore.location" : "/run/aiven/keys/public.keystore.p12",
  "schema.history.internal.consumer.ssl.keystore.password" : "password",
  "schema.history.internal.consumer.ssl.truststore.location" : "/run/aiven/keys/public.truststore.jks",
  "schema.history.internal.consumer.ssl.truststore.password" : "password",
  "schema.history.internal.consumer.ssl.key.password" : "password",
  "include.schema.changes" : "true"
  "key.converter" : "org.apache.kafka.connect.storage.StringConverter",
  "transforms" : "unwrap,createKey,extractInt",
  "transforms.unwrap.type" : "io.debezium.transforms.ExtractNewRecordState",
  "transforms.unwrap.drop.tombstones" : "false",
  "transforms.createKey.type" : "org.apache.kafka.connect.transforms.ValueToKey",
  "transforms.createKey.fields" : "id",
  "transforms.extractInt.type" : "org.apache.kafka.connect.transforms.ExtractField$Key",
  "transforms.extractInt.field" : "id",
}
```

</TabItem>
<TabItem value="1.9" label="1.9 config">

```json
{
  "name":"CONNECTOR_NAME",
  "connector.class": "io.debezium.connector.mysql.MySqlConnector",
  "database.hostname": "MYSQL_HOST",
  "database.port": "MYSQL_PORT",
  "database.user": "MYSQL_USER",
  "database.password": "MYSQL_PASSWORD",
  "database.dbname": "MYSQL_DATABASE_NAME",
  "database.sslmode": "SSL_MODE",
  "database.server.name": "KAFKA_TOPIC_PREFIX",
  "table.include.list": "MYSQL_TABLES",
  "tasks.max":"NR_TASKS",
  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "key.converter.basic.auth.credentials.source": "USER_INFO",
  "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "value.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter.basic.auth.credentials.source": "USER_INFO",
  "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "database.history.consumer.security.protocol": "SSL",
  "database.history.consumer.ssl.key.password": "password",
  "database.history.consumer.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
  "database.history.consumer.ssl.keystore.password": "password",
  "database.history.consumer.ssl.keystore.type": "PKCS12",
  "database.history.consumer.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
  "database.history.consumer.ssl.truststore.password": "password",
  "database.history.kafka.bootstrap.servers": "APACHE_KAFKA_HOST:APACHE_KAFKA_PORT",
  "database.history.kafka.topic": "HISTORY_TOPIC_NAME",
  "database.history.producer.security.protocol": "SSL",
  "database.history.producer.ssl.key.password": "password",
  "database.history.producer.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
  "database.history.producer.ssl.keystore.password": "password",
  "database.history.producer.ssl.keystore.type": "PKCS12",
  "database.history.producer.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
  "database.history.producer.ssl.truststore.password": "password",
  "include.schema.changes": "true"
}
```

</TabItem>
</Tabs>

The configuration file contains the following entries:

-   `name`: The connector name, replace CONNECTOR_NAME with the name you
    want to use for the connector.

-   `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DATABASE_NAME`, `SSL_MODE`,
    `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_TABLES`: Source database
    parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-mysql#connect_debezium_mysql_source_prereq) phase.

-   `database.server.name`: The logical name of the database, which determines the prefix
    used for Apache Kafka topic names. The resulting topic name is a combination of the
    `database.server.name` and the table name.

-   `tasks.max`: Maximum number of tasks to execute in parallel. By
    default this is 1, the connector can use at most 1 task for each
    source table defined. Replace `NR_TASKS` with the amount of parallel
    task based on the number of tables.

-   `database.history.kafka.topic`: The name of the Apache Kafka topic
    that contains the history of schema changes.

-   `database.history.kafka.bootstrap.servers`: Directs to the Aiven for
    Apache Kafka service that runs the connector and stores
    [schema definition changes](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-mysql#connect_debezium_mysql_schema_versioning).

-   `database.history.producer` and `database.history.consumer`: Refers
    to truststores and keystores pre-created on the Aiven for Apache
    Kafka node to handle SSL authentication

    :::warning
    The values defined for each `database.history.producer` and
    `database.history.consumer` parameters are already set to work with
    the predefined truststore and keystore created in the Aiven for
    Apache Kafka nodes. Modifying these values is not recommended.
    :::

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

1. Select **Connectors** from the sidebar.

1. Select **Create New Connector**, which is available only for
   services [that have Apache Kafka Connect enabled](enable-connect).

1. Select the **Debezium - MySQL**.

1. In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

1. Paste the connector configuration (stored in the
    `debezium_source_mysql.json` file) in the form.

1. Select **Apply**.

   :::note
   The Aiven Console reads through the configuration file and automatically populates
   the relevant UI fields. You can view and modify these fields across
   different tabs. Any change you make is reflected in JSON format
   within the **Connector configuration** text box.
   :::

1. After all the settings are correctly configured, select **Create connector**

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

:::note
You can also create connectors using the
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
:::
