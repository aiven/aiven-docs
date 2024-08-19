---
title: Create a JDBC sink connector from Apache Kafka® to another database
sidebar_label: Create a JDBC sink connector to a database
---

The JDBC (Java Database Connectivity) sink connector enables you to move data from an Aiven for Apache Kafka® cluster to any relational database offering JDBC drivers like PostgreSQL® or MySQL.

:::warning
The JDBC sink connector requires topics to have a schema to transfer data to
relational databases. You can define or manage this schema for each topic through
the [Karapace](/docs/products/kafka/karapace) schema registry.
:::

For a complete list of parameters and configuration options, see the
[connector's documentation](https://github.com/aiven/aiven-kafka-connect-jdbc/blob/master/docs/sink-connector.md).

## Prerequisites {#connect_jdbc_sink_prereq}

- Aiven for Apache Kafka service [with Kafka Connect enabled](enable-connect) or a
  [dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

- Gather the following information about your target database service:

  - `DB_CONNECTION_URL`: The database JDBC connection URL. Examples for PostgreSQL
    and MySQL:
    - PostgreSQL: `jdbc:postgresql://HOST:PORT/DB_NAME?sslmode=SSL_MODE`.
    - MySQL: `jdbc:mysql://HOST:PORT/DB_NAME?ssl-mode=SSL_MODE`.
  - `DB_USERNAME`: The database username to connect.
  - `DB_PASSWORD`: The password for the username selected.
  - `TOPIC_LIST`: The list of topics to sink divided by comma.
  - `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service.
    Required only when using Avro as the data format.
  - `SCHEMA_REGISTRY_PORT`: The Apache Kafka's schema registry port.
    Required only when using Avro as data format.
  - `SCHEMA_REGISTRY_USER`: The Apache Kafka's schema registry
    username. Required only when using Avro as data format.
  - `SCHEMA_REGISTRY_PASSWORD`: The Apache Kafka's schema registry user
    password. Required only when using Avro as data format.

For Aiven for PostgreSQL® and Aiven for MySQL®, access the connection
details (URL, username, and password) on the **Overview** page of your service in
the [Aiven Console](https://console.aiven.io/), or retrieve them using
the `avn service get` command in the [Aiven CLI](/docs/tools/cli/service-cli#avn_service_get).

Locate the `SCHEMA_REGISTRY` parameters in the **Schema Registry** tab under
**Connection information** on the service **Overview** page.

:::note
As of Apache Kafka version 3.0, Aiven for Apache Kafka no longer supports
Confluent Schema Registry. Consider using [Karapace](/docs/products/kafka/karapace) instead.
:::

## Setup a JDBC sink connector with Aiven Console

The following example demonstrates setting up a JDBC sink connector
for Apache Kafka using the [Aiven Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Define a Kafka Connect configuration file, such as `jdbc_sink.json`, with
the following connector settings:

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "io.aiven.connect.jdbc.JdbcSinkConnector",
    "topics": "TOPIC_LIST",
    "connection.url": "DB_CONNECTION_URL",
    "connection.user": "DB_USERNAME",
    "connection.password": "DB_PASSWORD",
    "tasks.max":"1",
    "auto.create": "true",
    "auto.evolve": "true",
    "insert.mode": "upsert",
    "pk.mode": "record_key",
    "pk.fields": "field1,field2",
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

- `name`: The connector name.
- `connector.class`: Specifies the class Kafka Connect will use to create the
  connector. For JDBC sink connectors, use `io.aiven.connect.jdbc.JdbcSinkConnector`.

- `connection.url`, `connection.username`, `connection.password`: JDBC parameters for
  the sink, collected in the
  [prerequisite](/docs/products/kafka/kafka-connect/howto/jdbc-sink#connect_jdbc_sink_prereq)
  phase.

- `topics`: List the Kafka topics you wish to sink into the database.

- `tasks.max`: The maximum number of tasks to execute in parallel. The
  maximum is 1 per topic and partition.

- `auto.create`: Enables automatic creation of the target table in the database
  if it doesn't exist.

- `auto.evolve`: Enables automatic modification of the target table schema to
  match changes in the Kafka topic messages.

- `insert.mode`: Defines how data is inserted into the database:

  - `insert`: Standard `INSERT` statements.
  - `upsert`: Upsert semantics supported by the target database.
    See the [dedicated GitHub repository](https://github.com/aiven/jdbc-connector-for-apache-kafka/blob/master/docs/sink-connector.md).
  - `update`: Update semantics supported by the target database.
    See [dedicated GitHub repository](https://github.com/aiven/jdbc-connector-for-apache-kafka/blob/master/docs/sink-connector.md).

- `pk.mode`: Defines how the connector identifies rows in the target table (primary key):

  -   `none`: No primary key is used.
  -   `kafka`: Apache Kafka coordinates are used.
  -   `record_key`: Entire or part of the message key is
      used.
  -   `record_value`: Entire or part of the message value is
      used.

  For more information, see the [dedicated GitHub repository](https://github.com/aiven/jdbc-connector-for-apache-kafka/blob/master/docs/sink-connector.md).

- `pk.fields`: Defines which fields of the composite key or value to
  use as record key in the database.

- `key.converter` and `value.converter`: Defines the data format of messages within
  the Apache Kafka topic. The `io.confluent.connect.avro.AvroConverter` translates
  messages from the Avro format. The message schemas are retrieved from
  Aiven's [Karapace schema registry](https://github.com/aiven/karapace),
  as specified by the `schema.registry.url` parameter and related credentials.

:::note

The `key.converter` and `value.converter` settings in the connector configuration
define how the connector parses messages.

When using Avro as source data format, set the following parameters:

- `value.converter.schema.registry.url`: Points to the Aiven for
  Apache Kafka schema registry URL. Use the format
  `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT` where
  `APACHE_KAFKA_HOST` and `SCHEMA_REGISTRY_PORT` are the values
  [retrieved earlier in the prerequisites](/docs/products/kafka/kafka-connect/howto/jdbc-sink#connect_jdbc_sink_prereq).
- `value.converter.basic.auth.credentials.source`: Set to `USER_INFO` to enable username
  and password access to the schema registry.
- `value.converter.schema.registry.basic.auth.user.info`: Enter the required schema registry
  credentials in the `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD` format, using
  the `SCHEMA_REGISTRY_USER` and `SCHEMA_REGISTRY_PASSWORD` parameters
  [retrieved earlier in the prerequisites](/docs/products/kafka/kafka-connect/howto/jdbc-sink#connect_jdbc_sink_prereq).

:::

### Create a Kafka Connect connector with the Aiven Console

To create a Kafka Connect connector:

1. Log in to the [Aiven Console](https://console.aiven.io/) and select
   the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
   service where the connector needs to be defined.
1. Click **Connectors** from the sidebar.
1. Click **Create connector** to start setting up a new connector. This option is visible
   only if [Kafka Connect](enable-connect) is enabled for your service.
1. On the **Select connector** page, locate **JDBC Sink** and click **Get started**.
1. In the **Common** tab, find the **Connector configuration** text box.
1. Click **Edit** to modify the connector configuration.
1. Paste the configuration details from your `jdbc_sink.json` file into the text box.
1. Click **Apply**.

   :::note
   The Aiven Console automatically populates the UI fields with the data from the
   configuration file. You can review and edit these fields across the
   different tabs. Any modifications you make are updated in the
   **Connector configuration** text box in JSON format.
   :::

1. Once you've entered all the required settings, click **Create connector**.
1. Verify the connector status in the **Connectors** page.
1. Confirm that the data has appeared in the target database service.
   The table name should match the Apache Kafka topic name.

You can also create connectors using the
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).


## Example: Create a JDBC sink connector to PostgreSQL® on a topic with a JSON schema

Suppose you have a topic named `iot_measurements` that contains data in
JSON format with a defined JSON schema as follows:

```json
{
    "schema": {
        "type":"struct",
        "fields":[{
            "type":"int64",
            "optional": false,
            "field": "iot_id"
            },{
            "type":"string",
            "optional": false,
            "field": "metric"
            },{
            "type":"int32",
            "optional": false,
            "field": "measurement"
            }]
    },
    "payload":{ "iot_id":1, "metric":"Temperature", "measurement":14}
}
{
    "schema": {
        "type":"struct",
        "fields":[{
            "type":"int64",
            "optional": false,
            "field": "iot_id"
            },{
            "type":"string",
            "optional": false,
            "field": "metric"
            },{
            "type":"int32",
            "optional": false,
            "field": "measurement"
            }]
    },
    "payload":{"iot_id":2, "metric":"Humidity", "measurement":60}
}
```

:::note
Embedding a JSON schema in every message can increase the data size.
For a more efficient size-to-content ratio, consider using the Avro format
with the [Karapace schema registry](https://karapace.io/).
:::

To sink the `iot_measurements` topic to PostgreSQL, use the following connector
configuration. Replace the placeholders for `DB_HOST`, `DB_PORT`, `DB_NAME`,
`DB_SSL_MODE`, `DB_USERNAME`, and `DB_PASSWORD`:

```json
{
    "name":"sink_iot_json_schema",
    "connector.class": "io.aiven.connect.jdbc.JdbcSinkConnector",
    "topics": "iot_measurements",
    "connection.url": "jdbc:postgresql://DB_HOST:DB_PORT/DB_NAME?sslmode=DB_SSL_MODE",
    "connection.user": "DB_USERNAME",
    "connection.password": "DB_PASSWORD",
    "tasks.max":"1",
    "auto.create": "true",
    "auto.evolve": "true",
    "insert.mode": "upsert",
    "pk.mode": "record_value",
    "pk.fields": "iot_id",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter"
}
```

Key aspects of the configuration:

- `"topics": "iot_measurements"`: Identifies `iot_measurements` topic as the data source
  for the sink operation.
- `"value.converter": "org.apache.kafka.connect.json.JsonConverter"`: Indicates
  that the message value is in plain JSON format without a schema. Since the key is
  empty, no converter is defined for it.
- `"pk.mode": "record_value"`: Indicates the connector is using the message
  value to set the target database key.
- `"pk.fields": "iot_id"`: Indicates the connector is using the field `iot_id`
  on the message value to set the target database key.


## Example: Create a JDBC sink connector to MySQL on a topic using Avro and schema registry

Suppose you have a topic named `students` that contains data in Avro format. The schema
is stored in the schema registry provided by [Karapace](/docs/products/kafka/karapace)
and has the following structure:

```text
key: {"student_id": 1234}
value: {"student_name": "Mary", "exam": "Math", "exam_result":"A"}
```

To sink the `students` topic to MySQL, use the following connector configuration.
Make sure to replace the placeholders for `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_SSL_MODE`,
DB_USERNAME, DB_PASSWORD, APACHE_KAFKA_HOST, SCHEMA_REGISTRY_PORT,
`SCHEMA_REGISTRY_USER`, and `SCHEMA_REGISTRY_PASSWORD`:


```json
{
    "name": "sink_students_avro_schema",
    "connector.class": "io.aiven.connect.jdbc.JdbcSinkConnector",
    "topics": "students",
    "connection.url": "jdbc:mysql://DB_HOST:DB_PORT/DB_NAME?ssl-mode=DB_SSL_MODE",
    "connection.user": "DB_USERNAME",
    "connection.password": "DB_PASSWORD",
    "insert.mode": "upsert",
    "table.name.format": "students",
    "pk.mode": "record_key",
    "pk.fields": "student_id",
    "auto.create": "true",
    "auto.evolve": "true",
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

Key aspects of the configuration:

-   `"topics": "students"`: Identifies `students` topic as the data source for
    the sink operation.
-   `"pk.mode": "record_key"`: Uses the message key as the database key.
-   `"pk.fields": "student_id"`: Sets the database key using the `student_id` field
    from the message key.
-   `key.converter` and `value.converter`: Defines the Avro data format with
    `io.confluent.connect.avro.AvroConverter` and provides the URL and credentials
    for the [Karapace](/docs/products/kafka/karapace) schema registry.

With `"auto.create": "true"`, the connector automatically creates a `students` table
in the MySQL database. This table is populated with data from the `students`
Apache Kafka topic and includes the `student_id`, `student_name`, `exam`, and
`exam_result` columns.

## Related pages

- View the [Database migration with Apache Kafka® and Apache Kafka® Connect](https://aiven.io/blog/db-technology-migration-with-apache-kafka-and-kafka-connect) blog post
