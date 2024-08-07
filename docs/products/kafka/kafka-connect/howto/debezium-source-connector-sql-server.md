---
title: Create a Debezium source connector from SQL Server to Apache Kafka® with CDC
---
The SQL Server Debezium source connector uses the [change data capture (CDC) ](https://learn.microsoft.com/en-us/sql/relational-databases/track-changes/about-change-data-capture-sql-server?view=sql-server-2017) feature to extract database changes from designated tables and write them to Apache Kafka® topic in a standard format for multiple consumers to read and transform.

import Note from "@site/static/includes/debezium-breakingchange.md"

<Note/>

## Enable CDC in SQL Server {#connect_debezium_sql_server_schema_versioning}

To use the Debezium source connector for SQL Server, enable the SQL Server
Change Data Capture (CDC) at both the database and table levels. This creates the
necessary schemas and tables containing a history of all change events in the tables
you wish to track with the connector.

### Enable CDC at database level

To enable the CDC at database level, you can use the following command:

```sql
USE <DATABASE_NAME>
GO
EXEC sys.sp_cdc_enable_db
GO
```

:::note
If you're using GCP Cloud SQL for SQL Server, you can enable database
CDC with:

```sql
EXEC msdb.dbo.gcloudsql_cdc_enable_db '<DATABASE_NAME>'
```

:::

Enabling CDC creates a new schema called `cdc` in the target database, which contains
all necessary tables.

### Enable CDC at table level

To enable CDC for a table you can execute the following command:

```sql
USE <DATABASE_NAME>
GO

EXEC sys.sp_cdc_enable_table
@source_schema = N'<SCHEMA_NAME>',
@source_name   = N'<TABLE_NAME>',
@role_name     = N'<ROLE_NAME>',
@filegroup_name = N'<FILEGROUP_NAME>',
@supports_net_changes = 0
GO
```

The command above has the following parameters:

-   `<DATABASE_NAME>`, `<SCHEMA_NAME>`, `<TABLE_NAME>`: The references
    to the table where CDC needs to be set.
-   `<ROLE_NAME>`: The database role that will have access to the change
    tables. Leave it `NULL` to only allow access to members of
    `sysadmin` or `db_owner` groups.
-   `<FILEGROUP_NAME>`: Specifies the [file
    group](https://learn.microsoft.com/en-us/sql/relational-databases/databases/database-files-and-filegroups)
    where the files will be written, needs to be pre-existing.

:::note
If you're using GCP Cloud SQL for SQL Server, you can enable database
CDC on a table with:

```sql
EXEC sys.sp_cdc_enable_table
@source_schema = N'<SCHEMA_NAME>',
@source_name = N'<TABLE_NAME>',
@role_name = N'<ROLE_NAME>'
```

:::

:::warning
When modifying table schemas online, new column information can be lost
until CDC is re-enabled for the table. For more details,
refer to the [related Debezium
documentation](https://debezium.io/documentation/reference/stable/connectors/sqlserver.html#sqlserver-schema-evolution).
:::

## Prerequisites {#connect_debezium_sql_server_source_prereq}

To configure a Debezium source connector for MongoDB, you need either an
Aiven for Apache Kafka service with [Apache Kafka Connect enabled](enable-connect) or
a [dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Before you begin, gather the necessary information about your source MongoDB database:

-   `SQLSERVER_HOST`: The database hostname
-   `SQLSERVER_PORT`: The database port
-   `SQLSERVER_USER`: The database user to connect
-   `SQLSERVER_PASSWORD`: The database password for the `SQLSERVER_USER`
-   `SQLSERVER_DATABASE_NAME`: The database name
-   `SQLSERVER_TABLES`: The list of database tables to be included in Apache Kafka. Format
    the list as `schema_name1.table_name1,schema_name2.table_name2`
-   `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service,
    needed when storing the
    [schema definition changes](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-sql-server#connect_debezium_sql_server_schema_versioning)
-   `APACHE_KAFKA_PORT`: The port of the Apache Kafka service, needed
    when storing the
    [schema definition changes](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-sql-server#connect_debezium_sql_server_schema_versioning)
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
Debezium [connector's documentation](https://debezium.io/documentation/reference/stable/connectors/sqlserver.html).

## Setup a SQL Server Debezium source connector with Aiven Console

The following example demonstrates how to setup a Debezium source
Connector for Apache Kafka to a SQL Server database using the [Aiven
Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Create a configuration file named `debezium_source_mysql.json` with the following
connector configurations. While optional, creating this file helps you organize your
settings in one place and copy/paste them into the
[Aiven Console](https://console.aiven.io/) later.

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "io.debezium.connector.sqlserver.SqlServerConnector",
    "database.hostname": "SQLSERVER_HOST",
    "database.port": "SQLSERVER_PORT",
    "database.user": "SQLSERVER_USER",
    "database.password": "SQLSERVER_PASSWORD",
    "database.dbname": "SQLSERVER_DATABASE_NAME",
    "database.server.name": "KAFKA_TOPIC_PREFIX",
    "table.include.list": "SQLSERVER_TABLES",
    "tasks.max":"NR_TASKS",
    "poll.interval.ms": 500,
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "key.converter.basic.auth.credentials.source": "USER_INFO",
    "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "value.converter.basic.auth.credentials.source": "USER_INFO",
    "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
    "database.history.kafka.topic": "HISTORY_TOPIC_NAME",
    "database.history.kafka.bootstrap.servers": "APACHE_KAFKA_HOST:APACHE_KAFKA_PORT",
    "database.history.producer.security.protocol": "SSL",
    "database.history.producer.ssl.keystore.type": "PKCS12",
    "database.history.producer.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
    "database.history.producer.ssl.keystore.password": "password",
    "database.history.producer.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
    "database.history.producer.ssl.truststore.password": "password",
    "database.history.producer.ssl.key.password": "password",
    "database.history.consumer.security.protocol": "SSL",
    "database.history.consumer.ssl.keystore.type": "PKCS12",
    "database.history.consumer.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
    "database.history.consumer.ssl.keystore.password": "password",
    "database.history.consumer.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
    "database.history.consumer.ssl.truststore.password": "password",
    "database.history.consumer.ssl.key.password": "password",
    "include.schema.changes": "true"
}
```

The configuration file contains the following entries:

-   `name`: The connector name, replace CONNECTOR_NAME with the name you
    want to use for the connector.

-   `SQLSERVER_HOST`, `SQLSERVER_PORT`, `SQLSERVER_DATABASE_NAME`,
    `SSL_MODE`, `SQLSERVER_USER`, `SQLSERVER_PASSWORD`,
    `SQLSERVER_TABLES`: Source database parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-sql-server#connect_debezium_sql_server_source_prereq) phase.

-   `database.server.name`: The logical name of the database, which determines the prefix
    used for Apache Kafka topic names. The resulting topic name is a combination of the
    `database.server.name` and the table name.

-   `tasks.max`: Maximum number of tasks to execute in parallel. By
    default this is 1, the connector can use at most 1 task for each
    source table defined. Replace `NR_TASKS` with the amount of parallel
    task based on the number of input tables.

-   `poll.interval.ms`: The frequency of the queries to the CDC tables.

-   `database.history.kafka.topic`: The name of the Apache Kafka topic
    that contains the history of schema changes.

-   `database.history.kafka.bootstrap.servers`: Directs to the Aiven for
    Apache Kafka service where the connector is running and is needed to
    store
    [schema definition changes](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-sql-server#connect_debezium_sql_server_schema_versioning)

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

1. Log in to the [Aiven Console](https://console.aiven.io/).

1. Select the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect® service
   to define the connector.

1. Select **Connectors** from the  sidebar.

1. Select **Create New Connector**, which is available only for
   services [that have Apache Kafka Connect enabled](enable-connect).

1. Select **Debezium - SQL Server**.

1. In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

1. Paste the connector configuration (stored in the
   `debezium_source_sql_server.json` file) in the form.

1. Select **Apply**.

   :::note
   The Aiven Console reads through the configuration file and automatically populates
   the relevant UI fields. You can view and modify these fields across
   different tabs. Any change you make is reflected in JSON format
   within the **Connector configuration** text box.
   :::

1. After all the settings are correctly configured, select **Create connector**.

   :::tip
   With Aiven for Apache Kafka, topics are not created automatically. You have two options:

   - Manually create topics using the naming pattern: `database.server.name.schema_name.table_name`.
   - Enable the `Kafka topic auto-creation` feature.
     See [Enable automatic topic creation with Aiven CLI](/docs/products/kafka/howto/create-topics-automatically).

1.  Verify the connector status under the **Connectors** screen.

1. Verify the presence of the data in the target Apache Kafka topic
   coming from the MySQL dataset. The topic name is equal to
   concatenation of the database and table name. To change
   the target table name, you can use Apache Kafka Connect
   `RegexRouter` transformation.

:::note
You can also create connectors using the
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
:::
