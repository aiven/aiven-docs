---
title: Create a JDBC source connector from PostgreSQL® to Apache Kafka®
---

The JDBC source connector pushes data from a relational database, such
as PostgreSQL®, to Apache Kafka® where can be transformed and read by
multiple consumers.

:::tip
Sourcing data from a database into Apache Kafka decouples the database
from the set of consumers. Once the data is in Apache Kafka, multiple
applications can access it without adding any additional query overhead
to the source database.
:::

:::note
You can check the full set of available parameters and configuration
options in the [connector's
documentation](https://github.com/aiven/aiven-kafka-connect-jdbc/blob/master/docs/source-connector.md).
:::

## Prerequisites {#connect_jdbc_pg_source_prereq}

To setup a JDBC source connector pointing to PostgreSQL, you need an
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
-   `PG_TABLES`: The list of database tables to be included in Apache
    Kafka; the list must be in the form of
    `schema_name1.table_name1,schema_name2.table_name2`

:::note
If you're using Aiven for PostgreSQL the above details are available in
the [Aiven console](https://console.aiven.io/) service Overview tab or
via the dedicated `avn service get` command with the
[Aiven CLI](/docs/tools/cli/service-cli#avn_service_get).
:::

## Setup a PostgreSQL JDBC source connector with Aiven CLI

The following example demonstrates how to setup an Apache Kafka JDBC
source connector to a PostgreSQL database using the
[Aiven CLI dedicated command](/docs/tools/cli/service/connector#avn_service_connector_create).

### Define a Kafka Connect configuration file

Define the connector configurations in a file (we'll refer to it with
the name `jdbc_source_pg.json`) with the following content:

```
{
    "name":"CONNECTOR_NAME",
    "connector.class":"io.aiven.connect.jdbc.JdbcSourceConnector",
    "connection.url":"jdbc:postgresql://PG_HOST:PG_PORT/PG_DATABASE_NAME?sslmode=SSL_MODE",
    "connection.user":"PG_USER",
    "connection.password":"PG_PASSWORD",
    "table.whitelist":"PG_TABLES",
    "mode":"JDBC_MODE",
    "topic.prefix":"KAFKA_TOPIC_PREFIX",
    "tasks.max":"NR_TASKS",
    "poll.interval.ms":"POLL_INTERVAL"
}
```

The configuration file contains the following entries:

-   `name`: the connector name
-   `PG_HOST`, `PG_PORT`, `PG_DATABASE_NAME`, `SSL_MODE`, `PG_USER`,
    `PG_PASSWORD` and `PG_TABLES`: source database parameters collected
    in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/jdbc-source-connector-pg#connect_jdbc_pg_source_prereq) phase.
-   `mode`: the query mode, more information in the
    [dedicated page](../concepts/jdbc-source-modes); depending on the selected mode, additional
    configuration entries might be required.
-   `topic.prefix`: the prefix that will be used for topic names. The
    resulting topic name will be the concatenation of the `topic.prefix`
    and the table name.
-   `tasks.max`: maximum number of tasks to execute in parallel. By
    default is 1, the connector can use at max 1 task for each source
    table defined.
-   `poll.interval.ms`: query frequency, default 5000 milliseconds

Check out the [dedicated
documentation](https://github.com/aiven/jdbc-connector-for-apache-kafka/blob/master/docs/source-connector-config-options.rst)
for the full list of parameters.

:::tip
Check the [dedicated blog
post](https://aiven.io/blog/using-kafka-connect-jdbc-source-a-postgresql-example)
for an end-to-end example of the JDBC source connector in action with
PostgreSQL®.
:::

### Create a Kafka Connect connector with Aiven CLI

To create the connector, execute the following
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create), replacing the `SERVICE_NAME` with the name of the Aiven
service where the connector needs to run:

```
avn service connector create SERVICE_NAME @jdbc_source_pg.json
```

Check the connector status with the following command, replacing the
`SERVICE_NAME` with the Aiven service and the `CONNECTOR_NAME` with the
name of the connector defined before:

```
avn service connector status SERVICE_NAME CONNECTOR_NAME
```

Verify in the Apache Kafka target instance, the presence of the topic
and the data

:::tip
If you're using Aiven for Apache Kafka, topics will not be created
automatically. Either create them manually following the
`topic.prefix.schema_name.table_name` naming pattern or enable the
`kafka.auto_create_topics_enable` advanced parameter.
:::

## Example: define a JDBC incremental connector

The example creates an
[incremental](../concepts/jdbc-source-modes) JDBC connector with the following properties:

-   connector name: `jdbc_source_pg_increment`
-   source tables: `students` and `exams` from the `public` schema,
    available in an Aiven for PostgreSQL database
-   [incremental column name](../concepts/jdbc-source-modes): `id`
-   topic prefix: `jdbc_source_pg_increment.`
-   maximum number of concurrent tasks: `1`
-   time interval between queries: 5 seconds

The connector configuration is the following:

```
{
    "name":"jdbc_source_pg_increment",
    "connector.class":"io.aiven.connect.jdbc.JdbcSourceConnector",
    "connection.url":"jdbc:postgresql://demo-pg-myproject.aivencloud.com:13039/defaultdb?sslmode=require",
    "connection.user":"avnadmin",
    "connection.password":"mypassword123",
    "table.whitelist":"public.students,public.exams",
    "mode":"incrementing",
    "incrementing.column.name":"id",
    "topic.prefix":"jdbc_source_pg_increment.",
    "tasks.max":"1",
    "poll.interval.ms":"5000"
}
```

With the above configuration stored in a
`jdbc_incremental_source_pg.json` file, you can create the connector in
the `demo-kafka` instance with:

```
avn service connector create demo-kafka @jdbc_incremental_source_pg.json
```
