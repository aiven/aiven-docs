---
title: Create an Iceberg sink connector for Aiven for Apache Kafka®
sidebar_label: Iceberg sink connector
early: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Integrate Aiven for Apache Kafka® with the Iceberg sink connector to ingest real-time data into Iceberg tables for analytics and storage.
<!-- vale off -->
It supports exactly-once delivery, schema evolution, and metadata management and is
optimized for large-scale, high-performance data processing. For more details, see the
[official Iceberg documentation](https://iceberg.apache.org/docs/latest/kafka-connect/#apache-iceberg-sink-connector).

## Catalogs in Iceberg

In Apache Iceberg, a catalog stores table metadata and supports key operations such as
creating, renaming, and deleting tables. It manages collections of tables organized
into namespaces and provides the metadata needed for access.

The Iceberg sink connector writes data to storage backends, while the catalog manages
metadata, allowing multiple compute engines to share a common data layer. The connector
supports the following catalog types:

- **AWS Glue REST catalog:** An AWS-managed catalog leveraging the Iceberg REST API.
- **AWS Glue catalog:** A native AWS Glue implementation for Iceberg.

:::note
The AWS Glue REST catalog does not support automatic table creation. You must
manually create tables in AWS Glue and ensure the schema matches the Apache Kafka data.
:::

For more details, see the
[Iceberg catalogs documentation](https://iceberg.apache.org/concepts/catalog/).

## File I/O and write format

The Iceberg sink connector supports the following settings:

- **File I/O**: Supports `S3FileIO` for AWS S3 storage.

- **Write format**: Supports the Parquet format.

## Future enhancements

Future updates to the Iceberg sink connector include:

- **FileIO implementations:** Support for GCS and Azure FileIO.
- **Write formats:** Additional support for Avro and ORC formats.
- **Catalogs:** Planned support for Hive, JDBC, and Amazon S3 Tables.

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Apache Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- Apache Kafka client settings: The Iceberg sink connector requires these settings to
  connect to the Iceberg control topic. For a full list of supported configurations, see
  [Iceberg configuration](https://iceberg.apache.org/docs/latest/kafka-connect/#kafka-configuration).
- AWS-specific setup:
  - Create an **S3 bucket** to store data.
  - Configure **AWS IAM roles** with the following permissions:
    - Read and write access to the S3 bucket.
    - Manage AWS Glue databases and tables.
  - Create an **AWS Glue database and tables**:
    - If using the **AWS Glue REST catalog**, manually create tables and ensure the
      schema matches Apache Kafka records.
    - Specify the S3 bucket as the storage location. For more details, see the
      [AWS Glue data catalog documentation](https://docs.aws.amazon.com/glue/latest/dg/start-data-catalog.html).

:::note
[Aiven for Apache Kafka® Connect secret providers](/docs/products/kafka/kafka-connect/howto/configure-secret-providers)
are not supported in this release.
:::

## Create an Iceberg sink connector configuration

To configure the Iceberg sink connector, define a JSON configuration file. Use the
examples below based on your selected catalog type:

:::note
Loading worker properties is not supported. Use `iceberg.kafka.*` properties instead.
:::

<Tabs groupId="setup-method">
  <TabItem value="rest-catalog" label="AWS Glue REST catalog" default>

1. Create AWS resources, including an S3 bucket, Glue database, and tables.

   :::note
   The AWS Glue REST catalog does not support automatic table creation. Manually create
   tables in AWS Glue and ensure the schema matches the Apache Kafka data.
   :::

1. Add the following configurations to the Iceberg sink connector:

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
    "iceberg.tables": "<database-name>.<table-name>",
    "iceberg.tables.auto-create-enabled": "false",
    "iceberg.control.topic": "<your-iceberg-control-topic-name>",
    "iceberg.control.commit.interval-ms": "1000",
    "iceberg.control.commit.timeout-ms": "2147483647",
    "iceberg.catalog.type": "rest",
    "iceberg.catalog.uri": "https://glue.<your-aws-region>.amazonaws.com/iceberg",
    "iceberg.catalog.warehouse": "<your-aws-account-id>",
    "iceberg.catalog.client.region": "<your-aws-region>",
    "iceberg.catalog.io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
    "iceberg.catalog.rest.signing-name": "glue",
    "iceberg.catalog.rest.signing-region": "<your-aws-region>",
    "iceberg.catalog.rest.sigv4-enabled": "true",
    "iceberg.catalog.rest.access-key-id": "<your-access-key-id>",
    "iceberg.catalog.rest.secret-access-key": "<your-secret-access-key>",
    "iceberg.catalog.rest-metrics-reporting-enabled": "false",
    "iceberg.catalog.s3.access-key-id": "<your-access-key-id>",
    "iceberg.catalog.s3.secret-access-key": "<your-secret-access-key>",
    "iceberg.catalog.s3.path-style-access": "true",
    "iceberg.kafka.bootstrap.servers": "<APACHE_KAFKA_HOST>:<APACHE_KAFKA_PORT>",
    "iceberg.kafka.security.protocol": "SSL",
    "iceberg.kafka.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
    "iceberg.kafka.ssl.keystore.password": "password",
    "iceberg.kafka.ssl.keystore.type": "PKCS12",
    "iceberg.kafka.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
    "iceberg.kafka.ssl.truststore.password": "password",
    "iceberg.kafka.ssl.key.password": "password"
   }
   ```

   Parameters:

   - `name`: Specify the connector name.
   - `connector.class`: Defines the connector class.
     Use `org.apache.iceberg.connect.IcebergSinkConnector`.
   - `tasks.max`: Define the maximum number of tasks the connector can run.
   - `topics`: List the Apache Kafka topics containing data for Iceberg tables.
   - `key.converter`: Set the key converter class. Use
     `org.apache.kafka.connect.json.JsonConverter` for JSON data.
   - `value.converter`: Set the value converter class. Use
     `org.apache.kafka.connect.json.JsonConverter` for JSON data.
   - `key.converter.schemas.enable`: Enable (`true`) or disable (`false`) schema support
     for the key converter.
   - `value.converter.schemas.enable`: Enable (`true`) or disable (`false`) schema
     support for the value converter.

   - `consumer.override.auto.offset.reset`: Set the Kafka consumer offset reset policy.
     Options: `earliest` (consume from the beginning) or `latest` (consume new messages).
   - `iceberg.kafka.auto.offset.reset`: Set the offset reset policy for Iceberg’s
     Apache Kafka consumer.
   - `iceberg.tables`: Define the target Iceberg table in `<database-name>.<table-name>`
     format.
   - `iceberg.tables.auto-create-enabled`: Enable (`true`) or disable (`false`)
     automatic table creation.
   - `iceberg.control.topic`: Set the Kafka topic for Iceberg control operations.
     Defaults to `control-iceberg` if not set.
   - `iceberg.control.commit.interval-ms`: Define how often (in milliseconds) the
     connector commits data to Iceberg tables. Default: `1000` (1 second).
   - `iceberg.control.commit.timeout-ms`: Set the maximum wait time (in milliseconds)
     for a commit before timing out. Default: `2147483647` (~24 days).
   - `iceberg.catalog.type`: Specify the Iceberg catalog type. Use `rest` for
     AWS Glue REST catalog.
   - `iceberg.catalog.uri`: Set the URI of the Iceberg REST catalog.
   - `iceberg.catalog.warehouse`: Set the AWS account ID when using the REST catalog.
   - `iceberg.catalog.client.region`: Set the AWS region for Iceberg catalog operations.
   - `iceberg.catalog.io-impl`: Specify the file I/O implementation. Use
     `org.apache.iceberg.aws.s3.S3FileIO` for AWS S3.
   - `iceberg.catalog.rest.signing-name`: Specify the AWS service name for signing
     requests (for example, `glue`).
   - `iceberg.catalog.rest.signing-region`: Set the AWS region used for request signing.
   - `iceberg.catalog.rest.sigv4-enabled`: Enable (`true`) or disable (`false`)
     AWS SigV4 authentication for REST requests.
   - `iceberg.catalog.rest.access-key-id`: Set the AWS access key ID for REST catalog
     authentication.
   - `iceberg.catalog.rest.secret-access-key`: Set the AWS secret access key for
     REST catalog authentication.
   - `iceberg.catalog.rest-metrics-reporting-enabled`: Enable (`true`) or disable
     (`false`) metrics reporting for the Iceberg REST catalog.
   - `iceberg.catalog.s3.access-key-id`: Set the AWS access key ID for S3 authentication.
   - `iceberg.catalog.s3.secret-access-key`: Set the AWS secret access key for
     S3 authentication.
   - `iceberg.catalog.s3.path-style-access`: Enable (`true`) or disable (`false`)
     path-style access for S3 buckets.
   - `iceberg.kafka.bootstrap.servers`: Define the Kafka broker connection details
     in `<APACHE_KAFKA_HOST>:<APACHE_KAFKA_PORT>` format.
   - `iceberg.kafka.security.protocol`: Defines the security protocol. Use `SSL` for
     encrypted communication.
   - `iceberg.kafka.ssl.keystore.location`: Specify the file path to the keystore
     containing the SSL certificate.
   - `iceberg.kafka.ssl.keystore.password`: Set the password for the keystore.
   - `iceberg.kafka.ssl.keystore.type`: Set the keystore type (for example, `PKCS12`).
   - `iceberg.kafka.ssl.truststore.location`: Specify the file path to the truststore
     containing trusted SSL certificates.
   - `iceberg.kafka.ssl.truststore.password`: Set the password for the truststore.
   - `iceberg.kafka.ssl.key.password`: Set the password to access the private key
     stored in the keystore.

</TabItem>
<TabItem value="glue-catalog" label="AWS Glue catalog">

1. Create AWS resources, including an S3 bucket, Glue database, and tables.

1. Add the following configurations to the Iceberg sink connector:

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
    "iceberg.tables": "<database-name>.<table-name>",
    "iceberg.tables.auto-create-enabled": "true",
    "iceberg.control.topic": "<your-iceberg-control-topic-name>",
    "iceberg.control.commit.interval-ms": "1000",
    "iceberg.control.commit.timeout-ms": "2147483647",
    "iceberg.catalog.type": "glue",
    "iceberg.catalog.glue_catalog.glue.id": "<your-aws-account-id>",
    "iceberg.catalog.warehouse": "s3://<your-bucket-name>",
    "iceberg.catalog.client.region": "<your-aws-region>",
    "iceberg.catalog.client.credentials-provider": "org.apache.iceberg.aws.StaticCredentialsProvider",
    "iceberg.catalog.client.credentials-provider.access-key-id": "<your-access-key-id>",
    "iceberg.catalog.client.credentials-provider.secret-access-key": "<your-secret-access-key>",
    "iceberg.catalog.io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
    "iceberg.catalog.s3.access-key-id": "<your-access-key-id>",
    "iceberg.catalog.s3.secret-access-key": "<your-secret-access-key>",
    "iceberg.catalog.s3.path-style-access": "true",
    "iceberg.kafka.bootstrap.servers": "<APACHE_KAFKA_HOST>:<APACHE_KAFKA_PORT>",
    "iceberg.kafka.security.protocol": "SSL",
    "iceberg.kafka.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
    "iceberg.kafka.ssl.keystore.password": "password",
    "iceberg.kafka.ssl.keystore.type": "PKCS12",
    "iceberg.kafka.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
    "iceberg.kafka.ssl.truststore.password": "password",
    "iceberg.kafka.ssl.key.password": "password"
   }
   ```

   Parameters:

   Use the same parameters as those listed for AWS Glue REST catalog, except for
   the following differences:

   - `iceberg.tables.auto-create-enabled`: Set to `true` to enable automatic table
     creation for AWS Glue catalog.
   - `iceberg.catalog.type`: Specify `glue` for AWS Glue catalog.
   - `iceberg.catalog.glue_catalog.glue.id`: Enter the AWS account ID for AWS Glue catalog.
   - `iceberg.catalog.client.credentials-provider`: Specify the credentials provider for
     AWS Glue catalog.

</TabItem>
</Tabs>

:::note
Apache Kafka security settings are the same for both AWS Glue REST and AWS Glue
catalog configurations.
:::

For a complete list of configurations,
see [Iceberg configuration](https://iceberg.apache.org/docs/latest/kafka-connect/#configuration).

## Create the Iceberg sink connector

<Tabs groupId="setup-method">
  <TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Apache Kafka Connect is enabled on the service.
   If not, click **Enable connector on this service**.

   Alternatively, to enable connectors:

   1. Click <ConsoleLabel name="Service settings"/> in the sidebar.
   1. In the **Service management** section, click
      <ConsoleLabel name="Actions"/> > **Enable Kafka connect**.

1. In the sink connectors list, select **Iceberg Sink Connector**, and click
   **Get started**.
1. On the **Iceberg Sink Connector** page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `iceberg_sink_connector.json` file into the text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To create the Iceberg sink connector using the [Aiven CLI](/docs/tools/cli), run:

```bash
avn service connector create SERVICE_NAME @iceberg_sink_connector.json
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka® service.
- `@iceberg_sink_connector.json`: Path to the JSON configuration file.

</TabItem>
</Tabs>

## Example: Define and create an Iceberg sink connector

<Tabs groupId="setup-method">
  <TabItem value="rest-catalog" label="AWS Glue REST catalog" default>

This example shows how to create an Iceberg sink connector using AWS Glue as
REST Catalog with the following properties:

- Connector name: `iceberg_sink_rest`
- Apache Kafka topic: `test-topic`
- AWS Glue region: `us-west-1`
- AWS S3 bucket: `my-s3-bucket`
- AWS IAM access key ID: `your-access-key-id`
- AWS IAM secret access key: `your-secret-access-key`
- Target table: `mydatabase.mytable`
- Commit interval: `1000 ms`
- Tasks: `2`

```json
{
  "name": "iceberg_sink_rest",
  "connector.class": "org.apache.iceberg.connect.IcebergSinkConnector",
  "tasks.max": "2",
  "topics": "test-topic",
  "iceberg.catalog.type": "rest",
  "iceberg.catalog.uri": "https://glue.us-west-1.amazonaws.com/iceberg",
  "iceberg.catalog.rest.signing-name": "glue",
  "iceberg.catalog.rest.signing-region": "us-west-1",
  "iceberg.catalog.io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
  "iceberg.catalog.s3.access-key-id": "your-access-key-id",
  "iceberg.catalog.s3.secret-access-key": "your-secret-access-key",
  "iceberg.catalog.warehouse": "<your-aws-account-id>",
  "iceberg.tables": "mydatabase.mytable",
  "iceberg.tables.auto-create-enabled": "false",
  "iceberg.control.commit.interval-ms": "1000",
  "iceberg.control.commit.timeout-ms": "2147483647",
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

</TabItem>
<TabItem value="glue-catalog" label="AWS Glue catalog">

This example shows how to create an Iceberg sink connector using AWS Glue Catalog
with the following properties:

- Connector name: `iceberg_sink_glue`
- Apache Kafka topic: `test-topic`
- AWS Glue region: `us-west-1`
- AWS S3 bucket: `my-s3-bucket`
- AWS IAM access key ID: `your-access-key-id`
- AWS IAM secret access key: `your-secret-access-key`
- Target table: `mydatabase.mytable`
- Commit interval: `1000 ms`
- Tasks: `2`

```json
{
  "name": "iceberg_sink_glue",
  "connector.class": "org.apache.iceberg.connect.IcebergSinkConnector",
  "tasks.max": "2",
  "topics": "test-topic",
  "iceberg.catalog.type": "glue",
  "iceberg.catalog.glue_catalog.glue.id": "123456789012",
  "iceberg.catalog.client.region": "us-west-1",
  "iceberg.catalog.client.credentials-provider": "org.apache.iceberg.aws.StaticCredentialsProvider",
  "iceberg.catalog.client.credentials-provider.access-key-id": "your-access-key-id",
  "iceberg.catalog.client.credentials-provider.secret-access-key": "your-secret-access-key",
  "iceberg.catalog.io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
  "iceberg.catalog.s3.access-key-id": "your-access-key-id",
  "iceberg.catalog.s3.secret-access-key": "your-secret-access-key",
  "iceberg.catalog.warehouse": "s3://<your-bucket-name>",
  "iceberg.tables": "mydatabase.mytable",
  "iceberg.tables.auto-create-enabled": "true",
  "iceberg.control.commit.interval-ms": "1000",
  "iceberg.control.commit.timeout-ms": "2147483647",
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

</TabItem>
</Tabs>

Once these configurations are saved in `iceberg_sink_rest.json` or
`iceberg_sink_glue.json`, you can create the connector using the Aiven Console or
Aiven CLI. Verify that the connector is running and that data from the Apache Kafka
topic `test-topic` is successfully written to the Iceberg table.

## Related pages

- [Apache Iceberg sink connector](https://iceberg.apache.org/docs/latest/kafka-connect/#apache-iceberg-sink-connector)
- [AWS Glue Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/start-data-catalog.html)
