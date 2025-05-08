---
title: Configure the Iceberg sink connector with Snowflake Open Catalog
sidebar_label: Snowflake Open Catalog (Polaris)
---

import CreateIcebergSinkConnector from "@site/static/includes/create-iceberg-sink-connector.md";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from '@site/src/components/ConsoleIcons';
import RelatedPages from "@site/src/components/RelatedPages";

[Snowflake Open Catalog](https://other-docs.snowflake.com/en/opencatalog/overview) is a managed [Apache Polaris™](https://polaris.apache.org/) service that supports the [Apache Iceberg™](https://iceberg.apache.org/) REST catalog API and uses Amazon S3 for storage.

Use the Iceberg sink connector in Aiven for Apache Kafka® Connect to write data to
Iceberg tables managed by Snowflake Open Catalog.

## Prerequisites

- A [Snowflake Open Catalog account](https://other-docs.snowflake.com/en/opencatalog/create-open-catalog-account)
- A Polaris catalog created using
  [Amazon S3 as the storage backend](https://other-docs.snowflake.com/en/opencatalog/create-catalog#create-a-catalog-using-amazon-simple-storage-service-amazon-s3)
- An [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Apache Kafka Connect enabled, or
  a [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster)
- An Apache Kafka topic that contains data to sink
- An Apache Kafka control topic (default: `control-iceberg`)
- AWS S3 credentials and a configured S3 bucket
- Polaris authentication credentials
  - `iceberg.catalog.scope`: A role scope defined in the Open Catalog
  - `iceberg.catalog.credential`: A token or hash for authenticating with the catalog

:::note
Snowflake Open Catalog does not support automatic catalog creation. You must create the
catalog manually in the Snowflake console.
:::

## Create an Iceberg sink connector configuration

To configure the Iceberg sink connector, define a JSON configuration with the required catalog, S3, and Kafka settings.

:::note
Loading worker properties is not supported. Use `iceberg.kafka.*` properties instead.
:::

```json
{
  "name": "<your-connector-name>",
  "connector.class": "org.apache.iceberg.connect.IcebergSinkConnector",
  "tasks.max": "2",
  "topics": "<your-topics>",
  "key.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "key.converter.schemas.enable": "false",
  "value.converter.schemas.enable": "false",
  "consumer.override.auto.offset.reset": "earliest",
  "iceberg.kafka.auto.offset.reset": "earliest",
  "iceberg.kafka.bootstrap.servers": "<your-kafka-host>:<your-kafka-port>",
  "iceberg.kafka.security.protocol": "SSL",
  "iceberg.kafka.ssl.key.password": "password",
  "iceberg.kafka.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
  "iceberg.kafka.ssl.keystore.password": "password",
  "iceberg.kafka.ssl.keystore.type": "PKCS12",
  "iceberg.kafka.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
  "iceberg.kafka.ssl.truststore.password": "password",
  "iceberg.tables": "<database>.<table>",
  "iceberg.tables.auto-create-enabled": "true",
  "iceberg.control.commit.interval-ms": "1000",
  "iceberg.control.commit.timeout-ms": "20000",
  "iceberg.control.topic": "control-iceberg",
  "iceberg.catalog.type": "rest",
  "iceberg.catalog.uri": "https://<snowflake_account_id>.<your-aws-region>.snowflakecomputing.com/polaris/api/catalog",
  "iceberg.catalog.scope": "PRINCIPAL_ROLE:<role_name_in_open_catalog>",
  "iceberg.catalog.credential": "<catalog_credentials>",
  "iceberg.catalog.warehouse": "<your-catalog-name>",
  "iceberg.catalog.client.region": "<your-aws-region>",
  "iceberg.catalog.io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
  "iceberg.catalog.s3.access-key-id": "<your-access-key-id>",
  "iceberg.catalog.s3.secret-access-key": "<your-secret-access-key>",
  "iceberg.catalog.s3.path-style-access": "true"
}
```

Parameters:

- `name`: Name of the connector
- `connector.class`: Set to `org.apache.iceberg.connect.IcebergSinkConnector`
- `tasks.max`: Maximum number of tasks the connector can run in parallel
- `topics`: Apache Kafka topics to read data from
- `key.converter`: Use `org.apache.kafka.connect.json.JsonConverter`
- `value.converter`: Use `org.apache.kafka.connect.json.JsonConverter`
- `key.converter.schemas.enable`: Enable (`true`) or disable (`false`) schema support
  in the key converter
- `value.converter.schemas.enable`: Enable (`true`) or disable (`false`) schema support
  in the value converter
- `consumer.override.auto.offset.reset`: Kafka consumer offset reset policy
  (recommended: `earliest`)
- `iceberg.kafka.auto.offset.reset`: Offset reset policy for the Iceberg internal Apache
  Kafka consumer
- `iceberg.kafka.bootstrap.servers`: Apache Kafka broker address in `<hostname>:<port>`
  format
- `iceberg.kafka.security.protocol`: Use `SSL` for secure communication
- `iceberg.kafka.ssl.keystore.location`: File path to the SSL keystore
- `iceberg.kafka.ssl.keystore.password`: Keystore password
- `iceberg.kafka.ssl.keystore.type`: Use `PKCS12`
- `iceberg.kafka.ssl.truststore.location`: File path to the truststore
- `iceberg.kafka.ssl.truststore.password`: Truststore password
- `iceberg.kafka.ssl.key.password`: Password for the SSL private key
- `iceberg.tables`: Iceberg table name in `<database>.<table>` format
- `iceberg.tables.auto-create-enabled`: Enable (`true`) or disable (`false`) automatic
  table creation
- `iceberg.control.commit.interval-ms`: Frequency (in ms) to commit data to Iceberg
- `iceberg.control.commit.timeout-ms`: Max time (in ms) to wait for a commit
- `iceberg.control.topic`: Control topic used by Iceberg (default: `control-iceberg`)
- `iceberg.catalog.type`: Set to `rest` for Snowflake Open Catalog
- `iceberg.catalog.uri`: Polaris REST catalog endpoint (from the Snowflake Open Catalog
  console)
- `iceberg.catalog.scope`: Role scope in the format `PRINCIPAL_ROLE:<role_name>`
- `iceberg.catalog.credential`: Authentication credential for Snowflake Open Catalog
  Use the format `<client_id>:<secret>` from the configured service connection that
  uses a Principal role
- `iceberg.catalog.warehouse`: Name of the catalog created in Snowflake Open Catalog.
  This is not the S3 bucket name
- `iceberg.catalog.client.region`: AWS region of the S3 bucket
- `iceberg.catalog.io-impl`: Set to `org.apache.iceberg.aws.s3.S3FileIO`
- `iceberg.catalog.s3.access-key-id`: AWS access key ID with write permissions
- `iceberg.catalog.s3.secret-access-key`: AWS secret access key
- `iceberg.catalog.s3.path-style-access`: Enable (`true`) or disable (`false`)
  path-style access

## Create the Iceberg sink connector

<CreateIcebergSinkConnector />

## Example: Define and create an Iceberg sink connector

This example shows a full configuration using Polaris:

```json
{
  "name": "iceberg_sink_polaris",
  "connector.class": "org.apache.iceberg.connect.IcebergSinkConnector",
  "tasks.max": "2",
  "topics": "test-topic",
  "iceberg.catalog.type": "rest",
  "iceberg.catalog.uri": "https://1234567890.us-east-1.snowflakecomputing.com/polaris/api/catalog",
  "iceberg.catalog.scope": "PRINCIPAL_ROLE:my-role",
  "iceberg.catalog.credential": "my-token",
  "iceberg.catalog.io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
  "iceberg.catalog.s3.access-key-id": "your-access-key-id",
  "iceberg.catalog.s3.secret-access-key": "your-secret-access-key",
  "iceberg.catalog.warehouse": "my-bucket",
  "iceberg.tables": "mydatabase.mytable",
  "iceberg.tables.auto-create-enabled": "true",
  "iceberg.control.commit.interval-ms": "1000",
  "iceberg.control.commit.timeout-ms": "20000",
  "key.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
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

<RelatedPages/>

- [Iceberg sink connector overview](/docs/products/kafka/kafka-connect/howto/iceberg-sink-connector)
- [Snowflake Open Catalog documentation](https://other-docs.snowflake.com/en/opencatalog)
- [Iceberg REST catalog specification](https://iceberg.apache.org/spec/#rest-catalog)
