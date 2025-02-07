---
title: Create a Debezium source connector from PostgreSQL® to Apache Kafka®
---

The Debezium source connector extracts the changes committed to the transaction log in a relational database, such as PostgreSQL®, and writes them to an Apache Kafka® topic in a standard format where they can be transformed and read by multiple consumers.

import Note from "@site/static/includes/debezium-breakingchange.md"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Note/>

## Prerequisites {#connect_debezium_pg_source_prereq}

To configure a Debezium source connector for PostgreSQL, you need either an
Aiven for Apache Kafka service with [Apache Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Before you begin, gather the necessary information about your source PostgreSQL database:

-   `PG_HOST`: The database hostname
-   `PG_PORT`: The database port
-   `PG_USER`: The database user to connect
-   `PG_PASSWORD`: The database password for the `PG_USER`
-   `PG_DATABASE_NAME`: The database name
-   `SSL_MODE`: The [SSL
    mode](https://www.postgresql.org/docs/current/libpq-ssl.html)
-   `PLUGIN_NAME`: The [logical decoding
    plugin](https://debezium.io/documentation/reference/stable/connectors/postgresql.html),
    possible values are `decoderbufs` and `pgoutput`.
    :::note
    Starting with Debezium version 2.5, the `wal2json` plugin is deprecated.
    :::
-   `PG_TABLES`: The list of database tables to be included in Apache
    Kafka; the list must be in the form of
    `schema_name1.table_name1,schema_name2.table_name2`
-   `PG_PUBLICATION_NAME`: The name of the [PostgreSQL logical
    replication
    publication](https://www.postgresql.org/docs/current/logical-replication-publication.html),
    if left empty, `debezium` is used as default
-   `PG_SLOT_NAME`: name of the [PostgreSQL replication
    slot](/docs/products/postgresql/howto/setup-logical-replication),
    if left empty, `debezium` is be used as default
-   `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service, only
    needed when using Avro as data format
-   `SCHEMA_REGISTRY_PORT`: The Apache Kafka's schema registry port,
    only needed when using Avro as data format
-   `SCHEMA_REGISTRY_USER`: The Apache Kafka's schema registry
    username, only needed when using Avro as data format
-   `SCHEMA_REGISTRY_PASSWORD`: The Apache Kafka's schema registry user
    password, only needed when using Avro as data format

If you are using Aiven for PostgreSQL and Aiven for Apache Kafka the above details are
available in the [Aiven console](https://console.aiven.io/) service Overview page or
via the dedicated `avn service get` command with the
[Aiven CLI](/docs/tools/cli/service-cli#avn_service_get).

For a complete list of all available parameters and configuration options, see
Debezium [connector's documentation](https://debezium.io/documentation/reference/stable/connectors/postgresql.html).

:::warning
Debezium updates the LSN positions of the PostgreSQL replication slot only when changes
occur in the connected database. If any replication slots have not acknowledged receiving
old WAL segments, PostgreSQL cannot delete them.

This means that if your system is idle (even though Aiven for PostgreSQL still generates
16 MiB of WAL every 5 minutes) or if changes are only happening in databases not
connected to Debezium, PostgreSQL is unable to clean up the WAL, eventually leading to
the service running out of disk space.
Therefore, ensure you regularly update any database connected to Debezium.
:::

## Set up a PostgreSQL Debezium source connector using Aiven CLI

The following example demonstrates how to set up a Debezium source
Connector for Apache Kafka to a PostgreSQL database using the
[Aiven CLI dedicated command](/docs/tools/cli/service/connector).

### Define a Kafka Connect configuration file

Create a configuration file named `debezium_source_pg.json` with the following
connector configurations:

<Tabs groupId="group1">
  <TabItem value="2" label="Debezium 2.5 config" default>

```json
{
  "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
  "database.dbname": "PG_DATABASE_NAME",
  "database.hostname": "PG_HOST",
  "database.password": "PG_PASSWORD",
  "database.port": "PG_PORT",
  "database.names": "testing",
  "database.server.name": "KAFKA_TOPIC_PREFIX",
  "database.sslmode": "SSL_MODE",
  "database.trustServerCertificate": "true",
  "database.user": "sqlserver",
  "include.schema.changes": "true",
  "key.converter.basic.auth.credentials.source": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "key.converter.schema.registry.basic.auth.user.info": "USER:PASS",
  "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "name": "CONNECTOR_NAME",
  "plugin.name": "PLUGIN_NAME",
  "poll.interval.ms": "500",
  "publication.name": "PG_PUBLICATION_NAME",
  "schema.history.internal.consumer.security.protocol": "SSL",
  "schema.history.internal.consumer.ssl.key.password": "password",
  "schema.history.internal.consumer.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
  "schema.history.internal.consumer.ssl.keystore.password": "password",
  "schema.history.internal.consumer.ssl.keystore.type": "PKCS12",
  "schema.history.internal.consumer.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
  "schema.history.internal.consumer.ssl.truststore.password": "password",
  "schema.history.internal.kafka.bootstrap.servers": "URL.com:10934",
  "schema.history.internal.kafka.topic": "sql-testing-history",
  "schema.history.internal.producer.security.protocol": "SSL",
  "schema.history.internal.producer.ssl.key.password": "password",
  "schema.history.internal.producer.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
  "schema.history.internal.producer.ssl.keystore.password": "password",
  "schema.history.internal.producer.ssl.keystore.type": "PKCS12",
  "schema.history.internal.producer.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
  "schema.history.internal.producer.ssl.truststore.password": "password",
  "slot.name": "PG_SLOT_NAME",
  "table.include.list": "PG_TABLES",
  "tasks.max":"NR_TASKS",
  "topic.prefix": "sql_topic",
  "value.converter.basic.auth.credentials.source": "USER_INFO",
  "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "value.converter": "io.confluent.connect.avro.AvroConverter"
}
```

  </TabItem>
  <TabItem value="1" label="Debezium 1.9 config">

```json
{
  "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
  "database.dbname": "PG_DATABASE_NAME",
  "database.hostname": "PG_HOST",
  "database.password": "PG_PASSWORD",
  "database.port": "PG_PORT",
  "database.server.name": "KAFKA_TOPIC_PREFIX",
  "database.sslmode": "SSL_MODE",
  "database.user": "PG_USER",
  "key.converter.basic.auth.credentials.source": "USER_INFO",
  "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "name":"CONNECTOR_NAME",
  "plugin.name": "PLUGIN_NAME",
  "publication.name": "PG_PUBLICATION_NAME",
  "slot.name": "PG_SLOT_NAME",
  "table.include.list": "PG_TABLES",
  "tasks.max":"NR_TASKS",
  "value.converter.basic.auth.credentials.source": "USER_INFO",
  "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "value.converter": "io.confluent.connect.avro.AvroConverter"
}
```

  </TabItem>
</Tabs>

The configuration file contains the following entries:

-   `name`: The name of the connector.
-   `PG_HOST`, `PG_PORT`, `PG_DATABASE_NAME`, `SSL_MODE`, `PG_USER`,
    `PG_PASSWORD`, `PG_TABLES`, `PG_PUBLICATION_NAME` and
    `PG_SLOT_NAME`: Source database parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-pg#connect_debezium_pg_source_prereq)
    phase.
-   `database.server.name`: The logical name of the database, which determines the prefix
    used for Apache Kafka topic names. The resulting topic name is a combination of the
    `database.server.name` and the table name.
-   `tasks.max`: The maximum number of tasks to execute in parallel. By
    default, this is 1, the connector can use at most 1 task for each
    source table defined.
-   `plugin.name`: Defines the [PostgreSQL output
    plugin](https://debezium.io/documentation/reference/connectors/postgresql.html)
    used to convert changes in the database into events in Apache Kafka.

    :::warning
    The `wal2json` logical decoding plugin has certain limitations with the data types it
    can support. Apart from the basic data types, it converts all other data types into
    strings based on their textual representation. If you use complex data types, verify the
    corresponding `wal2json` string representation.
    :::

-   `key.converter` and `value.converter`: Defines the messages data
    format in the Apache Kafka topic. The
    `io.confluent.connect.avro.AvroConverter` converter pushes messages
    in Avro format. To store the message schemas, Aiven's
    [Karapace schema registry](https://github.com/Aiven-Open/karapace) is used,
    specified by the `schema.registry.url` parameter and related credentials.

    :::note
    The `key.converter` and `value.converter` sections are only needed when pushing data in
    Avro format. Otherwise, messages default to JSON format.
    :::

:::tip
Check the [dedicated blog
post](https://aiven.io/blog/db-technology-migration-with-apache-kafka-and-kafka-connect)
for an end-to-end example of the Debezium source connector in action
with PostgreSQL.
:::

### Create a Kafka Connect connector with Aiven CLI

To create the connector, execute the following
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create),
replacing the `SERVICE_NAME` with the name of the Aiven
service where the connector needs to run:

```bash
avn service connector create SERVICE_NAME @debezium_source_pg.json
```

Check the connector status with the following command, replacing the
`SERVICE_NAME` with the Aiven service and the `CONNECTOR_NAME` with the
name of the connector defined before:

```bash
avn service connector status SERVICE_NAME CONNECTOR_NAME
```

Verify the presence of the topic and data in the Apache Kafka target
instance.

:::tip
With Aiven for Apache Kafka, topics are not created automatically. You have two options:

- Manually create topics using the naming pattern: `database.server.name.schema_name.table_name`.
- Enable the `Kafka topic auto-creation` feature. See
  [Enable automatic topic creation with Aiven CLI](/docs/products/kafka/howto/create-topics-automatically)
:::

## Solve the error `must be superuser to create FOR ALL TABLES publication`

When creating a  Debezium source connector with Aiven for
PostgreSQL as the target using  `pgoutput` plugin, you might encounter the
following error:

```bash
Caused by: org.postgresql.util.PSQLException: ERROR: must be superuser to create FOR ALL TABLES publication
```

This error occurs when Debezium attempts to create a publication and fails because
`avnadmin` is not a superuser. You can address this issue in two ways:

- Add the `"publication.autocreate.mode": "filtered"` parameter to the Debezium connector
  configuration. This enables the creation of publications only for the tables
  specified in the `table.include.list`  parameter.
- Create the publication on the source database before configuring the connector,
as detailed in the following section.

The older versions of Debezium had a bug that prevented the addition of more tables to
the filter when using `filtered` mode. As a result, this configuration did not conflict
with a `FOR ALL TABLES` publication. Starting with Debezium 1.9.7, these configurations
are causing conflicts which result in the following error message:

```bash
Caused by: org.postgresql.util.PSQLException: ERROR: publication "dbz_publication" is defined as FOR ALL TABLES
   Detail: Tables cannot be added to or dropped from FOR ALL TABLES publications.
```

This error is triggered when Debezium tries to include more tables in the publication,
which is incompatible with `FOR ALL TABLES`.

To resolve this error, remove the `publication.autocreate.mode` configuration default
to `all_tables`. To maintain `filtered` mode, recreate the publication and replication
slot accordingly.

### Create the publication in PostgreSQL

To create the publication in PostgreSQL:

-   Installing the `aiven-extras` extension:

    ```bash
    CREATE EXTENSION aiven_extras CASCADE;
    ```

-   Create a publication (with name for example, `my_test_publication`) for all
    the tables:

    ```SQL
    SELECT *
    FROM aiven_extras.pg_create_publication_for_all_tables(
       'my_test_publication',
       'INSERT,UPDATE,DELETE'
    );
    ```

-   Make sure to use the correct publication name (for example,
    `my_test_publication`) in the connector definition and restart the
    connector
