---
title: Create an Oracle Debezium source connector for Aiven for Apache Kafka®
sidebar_label: Debezium Oracle source connector
early: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

The Oracle Debezium source connector streams change data from an Oracle database to Apache Kafka® topics.

The connector uses Oracle LogMiner to read redo logs and capture row-level inserts,
updates, and deletes from selected tables. Each change event is written to an Apache
Kafka topic based on the configured topic prefix and table selection.

Use this connector to capture near real-time changes from Oracle transactional tables
into Apache Kafka. The connector does not support bulk ingestion or loading existing
data.

:::important
This connector does not perform large initial snapshots. It captures only changes that
occur after the connector starts.
:::

## Enable CDC in Oracle

To use the Oracle Debezium source connector, the source database must be configured to
support LogMiner-based change data capture (CDC).

### Required Oracle configuration

Ensure that the following settings are enabled on the Oracle database:

- Supplemental logging
- ARCHIVELOG mode
- Redo log retention long enough for the connector to process changes

:::note
On Amazon RDS for Oracle, enable supplemental logging using the RDS administrative
procedures instead of standard `ALTER DATABASE` commands.
:::

For detailed instructions, see:

- [Creating and connecting to an Oracle DB instance on Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.Oracle.html)
- [Enabling supplemental logging on Oracle RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.Oracle.CommonDBATasks.Log.html#Appendix.Oracle.CommonDBATasks.AddingSupplementalLogging)
- [Debezium Oracle connector documentation](https://debezium.io/documentation/reference/stable/connectors/oracle.html)

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Apache Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- The Kafka Connect service can connect to the Oracle database host and port.
- - A [secret provider configured for Kafka Connect](/docs/products/kafka/kafka-connect/howto/configure-secret-providers),
  such as [AWS Secrets Manager](/docs/products/kafka/kafka-connect/howto/configure-aws-secrets-manager).
  The configuration example below uses a secret provider as a best practice for managing
  database credentials.
- [Schema Registry enabled](/docs/products/kafka/karapace/howto/enable-karapace) when
  using Avro serialization.
- An Oracle Database instance with:
  - Oracle LogMiner enabled
  - Supplemental logging enabled
  - ARCHIVELOG mode enabled
  - A database user with sufficient privileges for LogMiner-based change data capture
    (CDC)

:::note
The Oracle user must have permissions to access redo logs and LogMiner views.
For the required permissions, see the
[Debezium Oracle connector documentation](https://debezium.io/documentation/reference/stable/connectors/oracle.html).
:::

### Collect Oracle and connector requirements for the connector

Before creating the connector, gather the following details:

- `ORACLE_HOST`: Oracle database hostname
- `ORACLE_PORT`: Oracle database port (default: 1521)
- `ORACLE_USER`: Database user
- `ORACLE_PASSWORD`: Database password
- `ORACLE_DATABASE_NAME`: Database name (SID or service name)
- `ORACLE_TABLES`: Tables to capture, formatted as `SCHEMA.TABLE`
- `TOPIC_PREFIX`: Prefix for Apache Kafka topic names
- Schema Registry endpoint and credentials, if using Avro

## Create an Oracle Debezium source connector configuration file

Create a file named `oracle_debezium_source_connector.json` with the following
configuration. This example streams only changes that occur after the connector starts.

```json
{
  "name": "oracle-debezium-source",
  "connector.class": "io.debezium.connector.oracle.OracleConnector",
  "tasks.max": 1,

  "database.hostname": "${aws:oracle/secrets:database.hostname}",
  "database.port": "1521",
  "database.user": "admin",
  "database.password": "${aws:oracle/secrets:database.password}",
  "database.dbname": "ORCL",

  "topic.prefix": "oracle.cdc",
  "table.include.list": "ADMIN.PERSON",

  "snapshot.mode": "no_data",
  "include.schema.changes": "true",

  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter": "io.confluent.connect.avro.AvroConverter",
  "key.converter.schema.registry.url": "<schema-registry-url>",
  "value.converter.schema.registry.url": "<schema-registry-url>",

  "schema.name.adjustment.mode": "avro",

  "schema.history.internal.kafka.topic": "oracle.cdc.history",
  "schema.history.internal.kafka.bootstrap.servers": "<kafka-service-host>:<kafka-service-port>",

  "schema.history.internal.producer.security.protocol": "SSL",
  "schema.history.internal.producer.ssl.keystore.type": "PKCS12",
  "schema.history.internal.producer.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
  "schema.history.internal.producer.ssl.keystore.password": "password",
  "schema.history.internal.producer.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
  "schema.history.internal.producer.ssl.truststore.password": "password",
  "schema.history.internal.producer.ssl.key.password": "password",

  "schema.history.internal.consumer.security.protocol": "SSL",
  "schema.history.internal.consumer.ssl.keystore.type": "PKCS12",
  "schema.history.internal.consumer.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
  "schema.history.internal.consumer.ssl.keystore.password": "password",
  "schema.history.internal.consumer.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
  "schema.history.internal.consumer.ssl.truststore.password": "password",
  "schema.history.internal.consumer.ssl.key.password": "password"
}

```

Parameters:

- `name`: A unique name for the connector.
- `connector.class`: The Java class for the connector. Set to
  `io.debezium.connector.oracle.OracleConnector`.
- `tasks.max`: The maximum number of tasks that run in parallel. For Oracle CDC, set
  this value to `1`.
- `database.hostname`: Hostname or IP address of the Oracle database.
- `database.port`: Oracle database port. Default is `1521`.
- `database.user`: Database user used by the connector.
- `database.password`: Password for the database user.
- `database.dbname`: Oracle database name, specified as a SID or service name.
- `topic.prefix`: Prefix for Apache Kafka topic names. Topics are created using the
  pattern `<topic.prefix>.<schema>.<table>`.
- `table.include.list`: Comma-separated list of tables to capture, formatted as
  `SCHEMA.TABLE`.
- `snapshot.mode`: Controls initial snapshot behavior. Set to `no_data` to stream only
  changes that occur after the connector starts.
- `include.schema.changes`: Specifies whether schema change events are published to
  Apache Kafka.
- `key.converter`: Converter used to serialize record keys.
- `value.converter`: Converter used to serialize record values.
- `key.converter.schema.registry.url`: Schema Registry endpoint used for key schemas
  when using Avro.
- `value.converter.schema.registry.url`: Schema Registry endpoint used for value schemas
  when using Avro.
- `schema.name.adjustment.mode`: Adjusts schema names for Avro compatibility. Set to
  `avro` when using Avro serialization.
- `schema.history.internal.kafka.topic`: Kafka topic Debezium uses to store schema
  history, including DDL and table structure changes.
- `schema.history.internal.kafka.bootstrap.servers`: Kafka bootstrap servers Debezium
  uses to connect to Kafka for schema history storage.
- `schema.history.internal.producer.*`: SSL settings Debezium uses to write schema
  history to Kafka.
- `schema.history.internal.consumer.*`: SSL settings Debezium uses to read schema
  history from Kafka.

:::note
On Aiven, Debezium requires SSL to access Kafka for schema history. Use the keystore and
truststore provided by the Kafka Connect service at `/run/aiven/keys/`. Keep the keystore
and truststore passwords set to `password`.
:::

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka® or Aiven for Apache Kafka Connect® service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector**.
1. In the source connectors list, select **Debezium - Oracle**, and click **Get started**.
1. On the **Oracle Debezium Source Connector** page, open the **Common** tab.
1. Locate the **Connector configuration** field and click <ConsoleLabel name="edit"/>.
1. Paste the contents of `oracle_debezium_source_connector.json`.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.

</TabItem>
<TabItem value="cli" label="CLI">

To create the connector using the
[Aiven CLI](/docs/tools/cli/service/connector#avn_service_connector_create), run:

```bash
avn service connector create SERVICE_NAME @oracle_debezium_source_connector.json
```

To check the connector status:

```bash
avn service connector status SERVICE_NAME oracle-debezium-source
```

</TabItem>
</Tabs>

## Verify data capture

After creating the connector:

1. Confirm that the connector state is `RUNNING`.
1. Verify that Apache Kafka topics exist for the selected tables, using the configured
   topic prefix.
1. Make an insert, update, or delete in the source Oracle table.
1. Confirm that a corresponding record appears in the Apache Kafka topic.

Once running, the connector continuously streams row-level changes from the selected
Oracle tables to Apache Kafka topics until it is stopped or reconfigured.

## Understand Kafka topic names

The connector writes change events to Apache Kafka topics using the following pattern:

```text
<topic.prefix>.<schema>.<table>
```
Use this pattern to identify the topic that contains change events for a specific
Oracle table.

For example, if `topic.prefix` is set to `oracle.cdc`, changes from the
`ADMIN.PERSON` table are written to:

```text
oracle.cdc.ADMIN.PERSON
```

Consume records from this topic to read change events for the `ADMIN.PERSON` table.

## Limitations

- Large initial snapshots are not supported.
- The connector streams ongoing changes only.
- Streaming performance depends on redo log volume and retention.
- High change rates can increase load on the source database.
- Exactly-once delivery is not supported.
- This connector is available as an early availability feature.

## Best practices

- Use the Oracle Debezium source connector for transactional tables that require
  change data capture.
- Avoid using this connector for append-only or bulk ingestion workloads.
  For those cases, use a JDBC source connector instead.
- Limit the number of tables per connector to reduce load on the source database.
- Start with streaming ongoing changes only before expanding to additional tables.
- Monitor the source database for increased load during initial deployment,
  especially in early access environments.

## Example: Oracle Debezium source connector

The following example shows an Oracle Debezium source connector that streams
ongoing changes from two tables using Avro serialization.

```json
{
  "name": "oracle-debezium-example",
  "connector.class": "io.debezium.connector.oracle.OracleConnector",
  "tasks.max": 1,

  "database.hostname": "${aws:oracle/secrets:database.hostname}",
  "database.port": "1521",
  "database.user": "admin",
  "database.password": "${aws:oracle/secrets:database.password}",
  "database.dbname": "ORCL",

  "topic.prefix": "oracle.cdc",
  "table.include.list": "SALES.ORDERS,SALES.CUSTOMERS",

  "snapshot.mode": "no_data",
  "include.schema.changes": "true",

  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter": "io.confluent.connect.avro.AvroConverter",
  "key.converter.schema.registry.url": "<schema-registry-url>",
  "value.converter.schema.registry.url": "<schema-registry-url>",

  "schema.name.adjustment.mode": "avro"
}
```

This connector creates Apache Kafka topics using the pattern
`<topic.prefix>.<schema>.<table>`, for example:

```text
oracle.cdc.SALES.ORDERS
oracle.cdc.SALES.CUSTOMERS
```

<RelatedPages/>

- [Debezium Oracle connector documentation](https://debezium.io/documentation/reference/stable/connectors/oracle.html)
- [Enable Apache Kafka Connect on Aiven](/docs/products/kafka/kafka-connect/howto/enable-connect)
