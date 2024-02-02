---
title: Create a Debezium source connector from PostgreSQL® to Apache Kafka®
---

The Debezium source connector extracts the changes committed to the
transaction log in a relational database, such as PostgreSQL®, and
writes them to an Apache Kafka® topic in a standard format where they
can be transformed and read by multiple consumers.

:::warning
Debezium only updates the PostgreSQL replication slot LSN positions when
changes take place in the database it is connected to. PostgreSQL is
unable to delete old WAL segments if there are any replication slots
that have not acknowledged receiving them.

So if your system is completely idle (in which case Aiven for PostgreSQL
still generates 16 MiB of WAL every 5 minutes) or changes only occur in
databases Debezium is not connected to, PostgreSQL will not be able to
clean up WAL and the service will eventually run out of disk space. Thus
it is essential to ensure any database you connect to with Debezium is
updated frequently enough.
:::

:::note
You can check the full set of available parameters and configuration
options in the [connector's
documentation](https://debezium.io/documentation/reference/stable/connectors/postgresql.html).
:::

## Prerequisites {#connect_debezium_pg_source_prereq}

To setup a Debezium source connector pointing to PostgreSQL, you need an
Aiven for Apache Kafka service
[with Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Furthermore you need to collect the following information about the
source PostgreSQL database upfront:

-   `PG_HOST`: The database hostname
-   `PG_PORT`: The database port
-   `PG_USER`: The database user to connect
-   `PG_PASSWORD`: The database password for the `PG_USER`
-   `PG_DATABASE_NAME`: The database name
-   `SSL_MODE`: The [SSL
    mode](https://www.postgresql.org/docs/current/libpq-ssl.html)
-   `PLUGIN_NAME`: The [logical decoding
    plugin](https://debezium.io/documentation/reference/stable/connectors/postgresql.html),
    possible values are `decoderbufs`, `wal2json` and `pgoutput`
-   `PG_TABLES`: The list of database tables to be included in Apache
    Kafka; the list must be in the form of
    `schema_name1.table_name1,schema_name2.table_name2`
-   `PG_PUBLICATION_NAME`: The name of the [PostgreSQL logical
    replication
    publication](https://www.postgresql.org/docs/current/logical-replication-publication.html),
    if left empty, `debezium` is used as default
-   `PG_SLOT_NAME`: name of the [PostgreSQL replication
    slot](https://docs.aiven.io/docs/products/postgresql/howto/setup-logical-replication),
    if left empty, `debezium` is be used as default
-   `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service, only
    needed when using Avro as data format
-   `SCHEMA_REGISTRY_PORT`: The Apache Kafka's schema registry port,
    only needed when using Avro as data format
-   `SCHEMA_REGISTRY_USER`: The Apache Kafka's schema registry
    username, only needed when using Avro as data format
-   `SCHEMA_REGISTRY_PASSWORD`: The Apache Kafka's schema registry user
    password, only needed when using Avro as data format

:::note
If you're using Aiven for PostgreSQL and Aiven for Apache Kafka the
above details are available in the [Aiven
console](https://console.aiven.io/) service Overview tab or via the
dedicated `avn service get` command with the
[Aiven CLI](/docs/tools/cli/service-cli#avn_service_get).
:::

## Set up a PostgreSQL Debezium source connector with Aiven CLI

The following example demonstrates how to setup a Debezium source
Connector for Apache Kafka to a PostgreSQL database using the
[Aiven CLI dedicated command](/docs/tools/cli/service/connector).

### Define a Kafka Connect configuration file

Define the connector configurations in a file (we\'ll refer to it with
the name `debezium_source_pg.json`) with the following content:

``` json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "PG_HOST",
    "database.port": "PG_PORT",
    "database.user": "PG_USER",
    "database.password": "PG_PASSWORD",
    "database.dbname": "PG_DATABASE_NAME",
    "database.sslmode": "SSL_MODE",
    "plugin.name": "PLUGIN_NAME",
    "slot.name": "PG_SLOT_NAME",
    "publication.name": "PG_PUBLICATION_NAME",
    "database.server.name": "KAFKA_TOPIC_PREFIX",
    "table.include.list": "PG_TABLES",
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

-   `name`: the connector name
-   `PG_HOST`, `PG_PORT`, `PG_DATABASE_NAME`, `SSL_MODE`, `PG_USER`,
    `PG_PASSWORD`, `PG_TABLES`, `PG_PUBLICATION_NAME` and
    `PG_SLOT_NAME`: source database parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-pg#connect_debezium_pg_source_prereq) phase.
-   `database.server.name`: the logical name of the database, dictates
    the prefix that will be used for Apache Kafka topic names. The
    resulting topic name will be the concatenation of the
    `database.server.name` and the table name.
-   `tasks.max`: maximum number of tasks to execute in parallel. By
    default this is 1, the connector can use at most 1 task for each
    source table defined.
-   `plugin.name`: defines the [PostgreSQL output
    plugin](https://debezium.io/documentation/reference/connectors/postgresql.html)
    to convert changes in the database into events in Apache Kafka.

:::warning
Please note that the `wal2json` logical decoding plugin has limitations
in the data types that it can support. Besides the basic data types, it
automatically turns all other data types into strings based on their
textual representation. Therefore, if you're using complex data types,
check the related `wal2json` string representation.
:::

-   `key.converter` and `value.converter`: defines the messages data
    format in the Apache Kafka topic. The
    `io.confluent.connect.avro.AvroConverter` converter pushes messages
    in Avro format. To store the messages schema we use Aiven's
    [Karapace schema registry](https://github.com/aiven/karapace) as
    specified by the `schema.registry.url` parameter and related
    credentials.

:::note
The `key.converter` and `value.converter` sections are only needed when
pushing data in Avro format. If omitted the messages will be defined in
JSON format.
:::

:::tip
Check the [dedicated blog
post](https://aiven.io/blog/db-technology-migration-with-apache-kafka-and-kafka-connect)
for an end-to-end example of the Debezium source connector in action
with PostgreSQL.
:::

### Create a Kafka Connect connector with Aiven CLI

To create the connector, execute the following
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create), replacing the `SERVICE_NAME` with the name of the Aiven
service where the connector needs to run:

```
avn service connector create SERVICE_NAME @debezium_source_pg.json
```

Check the connector status with the following command, replacing the
`SERVICE_NAME` with the Aiven service and the `CONNECTOR_NAME` with the
name of the connector defined before:

```
avn service connector status SERVICE_NAME CONNECTOR_NAME
```

Verify the presence of the topic and data in the Apache Kafka target
instance.

:::tip
If you're using Aiven for Apache Kafka, topics will not be created
automatically. Either create them manually following the
`database.server.name.schema_name.table_name` naming pattern or enable
the `kafka.auto_create_topics_enable` advanced parameter.
:::

## Solve the error `must be superuser to create FOR ALL TABLES publication`

When creating a Debezium source connector pointing to Aiven for
PostgreSQL using the `pgoutput` plugin, you could get the following
error:

```
Caused by: org.postgresql.util.PSQLException: ERROR: must be superuser to create FOR ALL TABLES publication
```

The error is due to Debezium trying to create a publication and failing
because `avnadmin` is not a superuser. There are 2 different ways of
working around this issue:

-   either add the `"publication.autocreate.mode": "filtered"` parameter
    to the Debezium connector configuration to enable the publication
    creation only for the tables defined in the `table.include.list`
    parameter
-   or create the publication on the source database before configuring
    the connector as defined in the section further below.

Note that with older versions of Debezium, there was a bug preventing
the addition of more tables to the filter with `filtered` mode. As a
result, this configuration was not conflicting with a publication
`FOR ALL TABLES`. Starting with Debezium 1.9.7, those configurations are
conflicting and you could get the following error:

```
Caused by: org.postgresql.util.PSQLException: ERROR: publication "dbz_publication" is defined as FOR ALL TABLES
   Detail: Tables cannot be added to or dropped from FOR ALL TABLES publications.
```

The error is due to Debezium attempting to include more tables into the
publication which is incompatible with `FOR ALL TABLES`.

You can get rid of this error by removing `publication.autocreate.mode`
configuration, which will default to `all_tables`. In case you want to
maintain `filtered` mode for some reason, then the publication should be
recreated accordingly, so as the replication slot.

### Create the publication in PostgreSQL

To create the publication in PostgreSQL:

-   Installing the `aiven-extras` extension:

    ```
    CREATE EXTENSION aiven_extras CASCADE;
    ```

-   Create a publication (with name for example, `my_test_publication`) for all
    the tables:

    ```
    SELECT *
    FROM aiven_extras.pg_create_publication_for_all_tables(
       'my_test_publication',
       'INSERT,UPDATE,DELETE'
    );
    ```

-   Make sure to use the correct publication name (for example,
    `my_test_publication`) in the connector definition and restart the
    connector
