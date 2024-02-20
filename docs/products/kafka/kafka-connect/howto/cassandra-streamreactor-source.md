---
title: Create a stream reactor source connector from Apache Cassandra® to Apache Kafka®
---

**The Apache Cassandra® stream reactor source connector** enables you to
move data from **a Apache Cassandra® database** to **an Aiven for Apache
Kafka® cluster**. The Lenses.io implementation enables you to write
[KCQL
transformations](https://docs.lenses.io/5.0/integrations/connectors/stream-reactor/sources/cassandrasourceconnector/)
on the topic data before sending it to the Apache Kafka cluster.

:::note
You can check the full set of available parameters and configuration
options in the [connector's
documentation](https://docs.lenses.io/connectors/source/cassandra.html).
:::

## Prerequisites {#connect_cassandra_lenses_source_prereq}

To setup a Apache Cassandra source connector, you need an Aiven for
Apache Kafka service
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

-   `CASSANDRA_KEYSPACE`: The Cassandra keyspace to use to source the
    data from

-   `KCQL_TRANSFORMATION`: The KCQL syntax to parse the topic data,
    should be in the format:

    ```
    INSERT INTO APACHE_KAFKA_TOPIC
    SELECT LIST_OF_FIELDS
    FROM CASSANDRA_TABLE
    [PK CASSANDRA_TABLE_COLUMN]
    [INCREMENTAL_MODE=MODE]
    ```

    :::warning
    By default the connector acts in **bulk mode**, extracting all the
    rows from the Cassandra table on a polling interval and pushing them
    to the Apache Kafka topic. You can however define **incremental
    options** by defining the [incremental mode and primary
    key](https://docs.lenses.io/5.0/integrations/connectors/stream-reactor/sources/cassandrasourceconnector/).
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

## Setup an Apache Cassandra source connector with Aiven Console

The following example demonstrates how to setup an Apache Cassandra
source connector for Apache Kafka using the [Aiven
Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Define the connector configurations in a file (we'll refer to it with
the name `cassandra_source.json`) with the following content, creating a
file is not strictly necessary but allows to have all the information in
one place before copy/pasting them in the [Aiven
Console](https://console.aiven.io/):

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "com.datamountaineer.streamreactor.connect.cassandra.source.CassandraSourceConnector",
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
-   `connect.cassandra.*`: source parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/cassandra-streamreactor-source#connect_cassandra_lenses_source_prereq) phase.
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
    [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/cassandra-streamreactor-source#connect_cassandra_lenses_source_prereq).
-   `value.converter.basic.auth.credentials.source`: to the value
    `USER_INFO`, since you're going to login to the schema registry
    using username and password.
-   `value.converter.schema.registry.basic.auth.user.info`: passing the
    required schema registry credentials in the form of
    `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD` with the
    `SCHEMA_REGISTRY_USER` and `SCHEMA_REGISTRY_PASSWORD` parameters
    [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/cassandra-streamreactor-source#connect_cassandra_lenses_source_prereq).
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

4.  Select **Stream Reactor Cassandra Source**.

5.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

6.  Paste the connector configuration (stored in the
    `cassandra_source.json` file) in the form.

7.  Select **Apply**.

    :::note
    The Aiven Console parses the configuration file and fills the
    relevant UI fields. You can review the UI fields across the various
    tab and change them if necessary. The changes will be reflected in
    JSON format in the **Connector configuration** text box.
    :::

8.  After all the settings are correctly configured, select **Create new
    connector**.

9.  Verify the connector status under the **Connectors** screen.

10. Verify the presence of the data in the target Cassandra service.

You can also create connectors using the
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).

## Example: Create a Cassandra source connector

If you have a Cassandra table named `students` in the
`students_keyspace` keyspace, with four columns (`id`, `name`, `age` and
`timestamp_added`) and you want to load incrementally an Apache Kafka
topic called `students_topic`, you can use the following connector
configuration, after replacing the placeholders for `CASSANDRA_HOST`,
`CASSANDRA_PORT`, `CASSANDRA_USERNAME`, `CASSANDRA_PASSWORD`,
`CASSANDRA_KEYSTORE`, `CASSANDRA_KEYSTORE_PASSWORD`,
`CASSANDRA_TRUSTSTORE`, `CASSANDRA_TRUSTSTORE_PASSWORD`,
`CASSANDRA_KEYSPACE`:

```json
{
    "name": "my-cassandra-source",
    "connector.class": "com.datamountaineer.streamreactor.connect.cassandra.source.CassandraSinkConnector",
    "topics": "TOPIC_LIST",
    "connect.cassandra.host": "CASSANDRA_HOSTNAME",
    "connect.cassandra.port": "CASSANDRA_PORT",
    "connect.cassandra.username": "CASSANDRA_USERNAME",
    "connect.cassandra.password": "CASSANDRA_PASSWORD",
    "connect.cassandra.ssl.enabled": "CASSANDRA_SSL",
    "connect.cassandra.trust.store.path": "CASSANDRA_TRUSTSTORE",
    "connect.cassandra.trust.store.password": "CASSANDRA_TRUSTSTORE_PASSWORD",
    "connect.cassandra.key.space": "students_keyspace",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "connect.cassandra.kcql": "INSERT INTO students_topic SELECT id, name, age, timestamp_added FROM students PK timestamp_added INCREMENTALMODE=TIMESTAMP"
}
```

The configuration file contains the following peculiarities:

-   `"topics": "students"`: setting the topic to source
-   `"connect.cassandra"`: the connection parameters placeholders
-   `"value.converter": "org.apache.kafka.connect.json.JsonConverter"`:
    the topic will be populated in JSON format
-   `"connect.cassandra.kcql": "INSERT INTO students_topic SELECT id, name, age, timestamp_added FROM students PK timestamp_added INCREMENTALMODE=TIMESTAMP"`:
    the connector logic is to insert every row in a new topic message
    and use the column `timestamp_added` to check for new rows compared
    to the previous poll.

Once the connector is created successfully, you should see one message
per row in the Cassandra table appearing in the target Apache Kafka
`students_topic` topic.

:::tip
If your Aiven for Apache Kafka instance doesn't have the
[automatic creation of topic enabled](/docs/products/kafka/howto/create-topics-automatically), you might need to create the `students_topic` topic upfront
before starting the connector
:::
