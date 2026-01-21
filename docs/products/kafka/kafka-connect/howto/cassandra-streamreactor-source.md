---
title: Create a Stream Reactor source connector from Apache Cassandra® to Apache Kafka®
sidebar_label: Stream Reactor Apache Cassandra® source connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Note from "@site/static/includes/streamreactor-compatibility-note.md"

The Apache Cassandra® Stream Reactor source connector enables you to move data from an Apache Cassandra® database to an Aiven for Apache Kafka® cluster.
It supports
[KCQL transformations](https://docs.lenses.io/5.0/integrations/connectors/stream-reactor/sources/cassandrasourceconnector/)
to parse and filter Cassandra table data before sending it to Kafka.

<Note/>

## Prerequisites {#connect_cassandra_lenses_source_prereq}

- An Aiven for Apache Kafka service
  [with Apache Kafka Connect enabled](enable-connect) or a
  [dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

- Gather the following information for the source Cassandra database:

  - `CASSANDRA_HOSTNAME`: The Cassandra hostname.
  - `CASSANDRA_PORT`: The Cassandra port.
  - `CASSANDRA_USERNAME`: The Cassandra username.
  - `CASSANDRA_PASSWORD`: The Cassandra password.
  - `CASSANDRA_SSL`: Set to `true`, `false`, or `default`, depending on your SSL setup.
  - `CASSANDRA_KEYSTORE`: The path to the keystore containing the CA certificate,
    used for SSL connections.
  - `CASSANDRA_KEYSTORE_PASSWORD`: The password for the keystore.

    :::note

    If you are using Aiven for Apache Cassandra, use the following values:
    - `CASSANDRA_TRUSTSTORE`: `/run/aiven/keys/public.truststore.jks`
    - `CASSANDRA_TRUSTSTORE_PASSWORD`: `password`
    :::
  - `CASSANDRA_KEYSPACE`: The Cassandra keyspace to source the data from.
  - `KCQL_TRANSFORMATION`: A KCQL statement to map table fields to Kafka topics. Use the following format:

    ```sql
    INSERT INTO APACHE_KAFKA_TOPIC
    SELECT LIST_OF_FIELDS
    FROM CASSANDRA_TABLE
    [PK CASSANDRA_TABLE_COLUMN]
    [INCREMENTALMODE=MODE]
    ```

    :::warning
    By default, the connector runs in **bulk mode** and polls all rows in the table periodically.
    To source data incrementally, use the `PK` and `INCREMENTALMODE` parameters.
    See [KCQL syntax for Cassandra Source](https://docs.lenses.io/5.0/integrations/connectors/stream-reactor/sources/cassandrasourceconnector/)
    for details.
    :::

  - `APACHE_KAFKA_HOST`: The Apache Kafka host. Required only when using Avro as the data format.
  - `SCHEMA_REGISTRY_PORT`: The schema registry port. Required only when using Avro.
  - `SCHEMA_REGISTRY_USER`: The schema registry username. Required only when using Avro.
  - `SCHEMA_REGISTRY_PASSWORD`: The schema registry password. Required only when using Avro.

    :::note
    If you are using Aiven for Cassandra and Aiven for Apache Kafka, get all required
    connection details, including schema registry information, from the
    **Connection information** section on the <ConsoleLabel name="overview"/> page.

    As of version 3.0, Aiven for Apache Kafka uses Karapace as the schema registry and
    no longer supports the Confluent Schema Registry.
    :::

For a complete list of supported parameters and configuration options, see the
[connector's documentation](https://docs.lenses.io/connectors/source/cassandra).

## Create a connector configuration file

Create a file named `cassandra_source.json` and add the following configuration:

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

Parameters:

- `name`: The connector name. Replace `CONNECTOR_NAME` with your desired name.
- `connect.cassandra.*`: Cassandra connection parameters collected in the
  [prerequisite step](#connect_cassandra_lenses_source_prereq).
- `key.converter` and `value.converter`: Define the message data format. This example uses
  `AvroConverter`. The schema is retrieved from Aiven’s
  [Karapace schema registry](https://github.com/aiven/karapace).

:::note
The `key.converter` and `value.converter` fields define how Kafka messages are parsed
and must be included in the configuration.

When using Avro as the output format, set the following fields:

- `value.converter.schema.registry.url`: Use the Aiven for Apache Kafka schema registry URL
  in the format `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT`. Retrieve these values
  from the
  [prerequisite step](#connect_cassandra_lenses_source_prereq).
- `value.converter.basic.auth.credentials.source`: Set to `USER_INFO` to use username
  and password authentication.
- `value.converter.schema.registry.basic.auth.user.info`: Provide the credentials in the format
  `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD`. Retrieve these values from the
  [prerequisite step](#connect_cassandra_lenses_source_prereq).

:::

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Apache Kafka Connect is enabled on the service.
   If not, click **Enable connector on this service**.

   Alternatively, to enable connectors:

   1. Click <ConsoleLabel name="Service settings"/> in the sidebar.
   1. In the **Service management** section, click
      <ConsoleLabel name="Actions"/> > **Enable Kafka connect**.

1. In the source connectors list, select **Stream Reactor Cassandra Source**, and click
   **Get started**.
1. On the **Stream Reactor Cassandra Source** page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `cassandra_source.json` file into the text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.
1. Confirm that data appears in the target Kafka topic.

</TabItem>
<TabItem value="cli" label="CLI">

To create the connector using the
[Aiven CLI](/docs/tools/cli/service/connector#avn_service_connector_create), run:

```bash
avn service connector create SERVICE_NAME @cassandra_source.json
```

Replace:

- `SERVICE_NAME`: Your Kafka or Kafka Connect service name.
- `@cassandra_source.json`: Path to your configuration file.

</TabItem>
</Tabs>

## Source Cassandra data to a Kafka topic

The following example shows how to source data from a Cassandra table to a Kafka topic.

If your Cassandra table `students` in the `students_keyspace` keyspace contains the
following data:

<!-- vale off -->

| id | name  | age | timestamp_added |
|----|-------|-----|-----------------|
| 1  | carlo | 77  | 1719838880      |
| 2  | lucy  | 55  | 1719839999      |

To write this data incrementally to a Kafka topic named `students_topic`, use the
following connector configuration:

```json
{
  "name": "my-cassandra-source",
  "connector.class": "com.datamountaineer.streamreactor.connect.cassandra.source.CassandraSourceConnector",
  "connect.cassandra.host": "CASSANDRA_HOSTNAME",
  "connect.cassandra.port": "CASSANDRA_PORT",
  "connect.cassandra.username": "CASSANDRA_USERNAME",
  "connect.cassandra.password": "CASSANDRA_PASSWORD",
  "connect.cassandra.ssl.enabled": "CASSANDRA_SSL",
  "connect.cassandra.trust.store.path": "CASSANDRA_TRUSTSTORE",
  "connect.cassandra.trust.store.password": "CASSANDRA_TRUSTSTORE_PASSWORD",
  "connect.cassandra.key.space": "students_keyspace",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter.schemas.enable": "false",
  "connect.cassandra.kcql": "INSERT INTO students_topic SELECT id, name, age, timestamp_added FROM students PK timestamp_added INCREMENTALMODE=TIMESTAMP"
}
```

Replace all placeholder values (such as `CASSANDRA_HOSTNAME`, `CASSANDRA_PORT`,
and `CASSANDRA_USERNAME`) with your actual Cassandra connection details.

This configuration does the following:

- `connect.cassandra.kcql`: Defines how Cassandra data is mapped to the Kafka topic.
  This example uses the `timestamp_added` column for incremental polling.
- `value.converter` and `value.converter.schemas.enable`: Set the message format.
  This example uses raw JSON without a schema.
- Connection settings (`connect.cassandra.*`): Provide the Cassandra host, port,
  credentials, SSL settings, and truststore paths.

After creating the connector, check the Kafka topic to verify that the data has been written.

:::tip
If your Aiven for Apache Kafka instance does not have
[automatic topic creation enabled](/docs/products/kafka/howto/create-topics-automatically),
create the `students_topic` manually before starting the connector.
:::
