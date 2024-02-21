---
title: Create a stream reactor sink connector from Apache Kafka® to Apache Cassandra®
---

**The Apache Cassandra® stream reactor sink connector** enables you to
move data from **an Aiven for Apache Kafka® cluster** to **a Apache
Cassandra® database**. The Lenses.io implementation enables you to write
[KCQL
transformations](https://docs.lenses.io/5.0/integrations/connectors/stream-reactor/sinks/cassandrasinkconnector/)
on the topic data before sending it to the Cassandra database.

:::note
You can check the full set of available parameters and configuration
options in the [connector's
documentation](https://docs.lenses.io/connectors/sink/cassandra.html).
:::

## Prerequisites {#connect_cassandra_lenses_sink_prereq}

To setup a Apache Cassandra sink connector, you need an Aiven for Apache
Kafka service
[with Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Furthermore you need to collect the following information about the
target Cassandra database upfront:

-   `CASSANDRA_HOSTNAME`: The Cassandra hostname
-   `CASSANDRA_PORT`: The Cassandra port
-   `CASSANDRA_USERNAME`: The Cassandra username
-   `CASSANDRA_PASSWORD`: The Cassandra password
-   `CASSANDRA_SSL`: The Cassandra SSL setting, can be `true`, `false`
    or `default`
-   `CASSANDRA_KEYSTORE`: The path to the Keystore containing the CA
    certificate, used when connection is secured via SSL
-   `CASSANDRA_KEYSTORE_PASSWORD`: The Keystore password, used when
    connection is secured via SSL

:::note
If you're using Aiven for Apache Cassandra, you can use the following
keystore values

-   `CASSANDRA_TRUSTSTORE`: `/run/aiven/keys/public.truststore.jks`
-   `CASSANDRA_TRUSTSTORE_PASSWORD`: `password`
:::

-   `CASSANDRA_KEYSPACE`: The Cassandra keyspace to use to sink the data

:::warning
The Cassandra keyspace and destination table need to be created before
starting the connector, otherwise the connector task will fail.
:::

-   `TOPIC_LIST`: The list of topics to sink divided by comma

-   `KCQL_TRANSFORMATION`: The KCQL syntax to parse the topic data,
    should be in the format:

    ```
    INSERT INTO CASSANDRA_TABLE
    SELECT LIST_OF_FIELDS
    FROM APACHE_KAFKA_TOPIC
    ```

:::warning
The Cassandra destination table `CASSANDRA_TABLE` needs to be created
before starting the connector, otherwise the connector task will fail.
:::

-   `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service, only
    needed when using Avro as data format
-   `SCHEMA_REGISTRY_PORT`: The Apache Kafka's schema registry port,
    only needed when using Avro as data format
-   `SCHEMA_REGISTRY_USER`: The Apache Kafka's schema registry
    username, only needed when using Avro as data format
-   `SCHEMA_REGISTRY_PASSWORD`: The Apache Kafka's schema registry user
    password, only needed when using Avro as data format

:::note
If you're using Aiven for Cassandra and Aiven for Apache Kafka, the
above details are available in the [Aiven
console](https://console.aiven.io/) service *Overview tab* or via the
dedicated `avn service get` command with the
[Aiven CLI](/docs/tools/cli/service-cli#avn_service_get).

The `SCHEMA_REGISTRY` related parameters are available in the Aiven for
Apache Kafka® service page, *Overview* tab, and *Schema Registry* subtab

As of version 3.0, Aiven for Apache Kafka no longer supports Confluent
Schema Registry. For more information, read [the article describing the
replacement, Karapace](https://help.aiven.io/en/articles/5651983)
:::

## Setup an Apache Cassandra sink connector with Aiven Console

The following example demonstrates how to setup an Apache Cassandra sink
connector for Apache Kafka using the [Aiven
Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Define the connector configurations in a file (we'll refer to it with
the name `cassandra_sink.json`) with the following content, creating a
file is not strictly necessary but allows to have all the information in
one place before copy/pasting them in the [Aiven
Console](https://console.aiven.io/):

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

The configuration file contains the following entries:

-   `name`: the connector name, replace `CONNECTOR_NAME` with the name
    you want to use for the connector.
-   `connect.cassandra.*`: sink parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/cassandra-streamreactor-sink#connect_cassandra_lenses_sink_prereq) phase.
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

When using Avro as source data format, you need to set following
parameters

-   `value.converter.schema.registry.url`: pointing to the Aiven for
    Apache Kafka schema registry URL in the form of
    `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT` with the
    `APACHE_KAFKA_HOST` and `SCHEMA_REGISTRY_PORT` parameters
    [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/cassandra-streamreactor-sink#connect_cassandra_lenses_sink_prereq).
-   `value.converter.basic.auth.credentials.source`: to the value
    `USER_INFO`, since you're going to login to the schema registry
    using username and password.
-   `value.converter.schema.registry.basic.auth.user.info`: passing the
    required schema registry credentials in the form of
    `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD` with the
    `SCHEMA_REGISTRY_USER` and `SCHEMA_REGISTRY_PASSWORD` parameters
    [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/cassandra-streamreactor-sink#connect_cassandra_lenses_sink_prereq).
:::

### Create a Kafka Connect connector with the Aiven Console

To create a Apache Kafka Connect connector, follow these steps:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
    service where the connector needs to be defined.

2.  Select **Connectors** from the left sidebar.

3.  Select **Create New Connector**, the button is enabled only for
    services
    [with Kafka Connect enabled](enable-connect).

4.  Select **Stream Reactor Cassandra Sink**.

5.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

6.  Paste the connector configuration (stored in the
    `cassandra_sink.json` file) in the form.

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

10. Verify the presence of the data in the target Cassandra service.

:::note
You can also create connectors using the
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
:::

## Example: Create a Cassandra sink connector

If you have a topic named `students` containing the following data that
you want to move to a Cassandra table called `students_tbl` in the
keyspace `students_keyspace`:

```
{"id":1, "name":"carlo", "age": 77}
{"id":2, "name":"lucy", "age": 55}
{"id":3, "name":"carlo", "age": 33}
{"id":2, "name":"lucy", "age": 21}
```

You can sink the `students` topic to Cassandra with the following
connector configuration, after replacing the placeholders for
`CASSANDRA_HOST`, `CASSANDRA_PORT`, `CASSANDRA_USERNAME`,
`CASSANDRA_PASSWORD`, `CASSANDRA_KEYSTORE`,
`CASSANDRA_KEYSTORE_PASSWORD`, `CASSANDRA_TRUSTSTORE`,
`CASSANDRA_TRUSTSTORE_PASSWORD`, `CASSANDRA_KEYSPACE`.

```json
{
    "name": "my-cassandra-sink",
    "connector.class": "com.datamountaineer.streamreactor.connect.cassandra.sink.CassandraSinkConnector",
    "topics": "TOPIC_LIST",
    "connect.cassandra.host": "CASSANDRA_HOSTNAME",
    "connect.cassandra.port": "CASSANDRA_PORT",
    "connect.cassandra.username": "CASSANDRA_USERNAME",
    "connect.cassandra.password": "CASSANDRA_PASSWORD",
    "connect.cassandra.ssl.enabled": "CASSANDRA_SSL",
    "connect.cassandra.trust.store.path": "CASSANDRA_TRUSTSTORE",
    "connect.cassandra.trust.store.password": "CASSANDRA_TRUSTSTORE_PASSWORD",
    "connect.cassandra.key.space": "students_keyspace",
    "topics": "students",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "value.converter.schemas.enable": "false",
    "connect.cassandra.kcql": "INSERT INTO students_tbl SELECT id, name, age FROM students"
}
```

The configuration file contains the following peculiarities:

-   `"topics": "students"`: setting the topic to sink
-   `"connect.cassandra"`: the connection parameters placeholders
-   `"value.converter": "org.apache.kafka.connect.json.JsonConverter"`
    and `"value.converter.schemas.enable": "false"`: the topic value is
    in JSON format without a schema
-   `"connect.cassandra.kcql": "INSERT INTO students_tbl SELECT id, name, age FROM students"`:
    the connector logic is to insert every topic message as new entry in
    the table.

Once the connector is created successfully, you should see the data in
the target Cassandra database.
