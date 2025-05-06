---
title: Configure the Iceberg sink connector with a PostgreSQL JDBC catalog
sidebar_label: PostgreSQL JDBC catalog
---

import RelatedPages from "@site/src/components/RelatedPages";
import CreateIcebergSinkConnector from "@site/static/includes/create-iceberg-sink-connector.md";

The JDBC catalog stores Iceberg table metadata in a PostgreSQL database. Use it to
integrate Apache Kafka, Amazon S3, and a PostgreSQL-based metadata store.

## Prerequisites

- [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Apache Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster)
- Apache Kafka topic that contains the source data
- Apache Kafka control topic used to coordinate Iceberg table commits
  (for example, `control-iceberg`)
- [Aiven for PostgreSQL® service](/docs/products/postgresql/get-started) or another
  PostgreSQL instance that is publicly accessible
- Amazon S3 bucket for storing Iceberg table data
- IAM user or role with permissions to read and write to the S3 bucket
- AWS access key ID and secret access key for the IAM credentials


## Create an Iceberg sink connector configuration

To configure the Iceberg sink connector with the JDBC catalog, define a JSON file that
uses PostgreSQL for metadata and Amazon S3 for storage.

:::note
Loading worker properties is not supported. Use `iceberg.kafka.*` properties instead.
:::

```json
{
"name": "<connector-name>",
"connector.class": "org.apache.iceberg.connect.IcebergSinkConnector",
"tasks.max": "2",
"topics": "<kafka-topics>",
"key.converter": "org.apache.kafka.connect.json.JsonConverter",
"value.converter": "org.apache.kafka.connect.json.JsonConverter",
"key.converter.schemas.enable": "false",
"value.converter.schemas.enable": "false",
"consumer.override.auto.offset.reset": "earliest",
"iceberg.kafka.auto.offset.reset": "earliest",
"iceberg.tables": "<database>.<table>",
"iceberg.tables.auto-create-enabled": "true",
"iceberg.control.commit.interval-ms": "1000",
"iceberg.control.commit.timeout-ms": "20000",
"iceberg.catalog.type": "jdbc",
"iceberg.catalog.uri": "jdbc:postgresql://<host>:<port>/<database>?user=<username>&password=<password>&ssl=require",
"iceberg.catalog.warehouse": "s3://<bucket-name>",
"iceberg.catalog.client.region": "<region>",
"iceberg.catalog.io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
"iceberg.catalog.jdbc.useSSL": "true",
"iceberg.catalog.jdbc.verifyServerCertificate": "true",
"iceberg.catalog.s3.access-key-id": "<aws-access-key-id>",
"iceberg.catalog.s3.secret-access-key": "<aws-secret-access-key>",
"iceberg.catalog.s3.path-style-access": "true",
"iceberg.kafka.bootstrap.servers": "<kafka-host>:<port>",
"iceberg.kafka.security.protocol": "SSL",
"iceberg.kafka.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
"iceberg.kafka.ssl.keystore.password": "password",
"iceberg.kafka.ssl.keystore.type": "PKCS12",
"iceberg.kafka.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
"iceberg.kafka.ssl.truststore.password": "password",
"iceberg.kafka.ssl.key.password": "password"
}
```

Parameters

- `name`: Name of the connector.
- `connector.class`: Connector implementation class.
- `topics`: Apache Kafka topics with source data.
- `iceberg.catalog.type`: Catalog type. Use `jdbc` for PostgreSQL.
- `iceberg.catalog.uri`: JDBC connection string for PostgreSQL.
- `iceberg.catalog.warehouse`: S3 bucket for table storage.
- `iceberg.catalog.client.region`: AWS region where the S3 bucket is located. Required if
  no region is set in the environment or system properties.
- `iceberg.tables`: Target Iceberg table in `<database>.<table>` format.
- `iceberg.tables.auto-create-enabled`: Automatically create tables if they do not exist.
- `iceberg.catalog.io-impl`: File I/O implementation for S3.
- `iceberg.catalog.s3.access-key-id` and `secret-access-key`: AWS credentials for S3.
- `iceberg.kafka.*`: Apache Kafka security settings.

For the full list of parameters, see the [Iceberg Kafka Connect configuration](https://iceberg.apache.org/docs/latest/kafka-connect/).

## Create the connector

<CreateIcebergSinkConnector />

## Example

This example creates an Iceberg sink connector with PostgreSQL as the catalog:

```json
{
"name": "iceberg_sink_jdbc",
"connector.class": "org.apache.iceberg.connect.IcebergSinkConnector",
"tasks.max": "2",
"topics": "test-topic",
"iceberg.catalog.type": "jdbc",
"iceberg.catalog.uri": "jdbc:postgresql://postgres.example.com:5432/iceberg_db?user=iceberg_user&password=secret&ssl=require",
"iceberg.catalog.warehouse": "s3://my-s3-bucket",
"iceberg.catalog.client.region": "us-west-2",
"iceberg.catalog.io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
"iceberg.catalog.s3.access-key-id": "your-access-key-id",
"iceberg.catalog.s3.secret-access-key": "your-secret-access-key",
"iceberg.catalog.s3.path-style-access": "true",
"iceberg.catalog.jdbc.useSSL": "true",
"iceberg.catalog.jdbc.verifyServerCertificate": "true",
"iceberg.tables": "mydatabase.mytable",
"iceberg.tables.auto-create-enabled": "true",
"iceberg.control.commit.interval-ms": "1000",
"iceberg.control.commit.timeout-ms": "20000",
"key.converter": "org.apache.kafka.connect.json.JsonConverter",
"value.converter": "org.apache.kafka.connect.json.JsonConverter",
"key.converter.schemas.enable": "false",
"value.converter.schemas.enable": "false",
"iceberg.kafka.bootstrap.servers": "kafka.example.com:9092",
"iceberg.kafka.security.protocol": "SSL",
"iceberg.kafka.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
"iceberg.kafka.ssl.keystore.password": "password",
"iceberg.kafka.ssl.keystore.type": "PKCS12",
"iceberg.kafka.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
"iceberg.kafka.ssl.truststore.password": "password",
"iceberg.kafka.ssl.key.password": "password"
}
```

<RelatedPages />

- [Iceberg sink connector overview](/docs/products/kafka/kafka-connect/howto/iceberg-sink-connector)
- [AWS Glue REST catalog](/docs/products/kafka/kafka-connect/howto/aws-glue-rest-catalog)
- [PostgreSQL documentation](https://www.postgresql.org/docs/)
- [Iceberg Kafka Connect configuration](https://iceberg.apache.org/docs/latest/kafka-connect/)
