---
title: Create an Iceberg sink connector for Aiven for Apache Kafka®
sidebar_label: Iceberg sink connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Integrate Aiven for Apache Kafka with Apache Iceberg for real-time data ingestion into Iceberg tables.
<!-- vale off -->
The connector supports exactly-once delivery semantics, schema evolution, and metadata
management, optimized for large-scale, high-performance data processing. For more
information about the Apache Iceberg Sink Connector, see the
[official Iceberg documentation](https://iceberg.apache.org/docs/latest/kafka-connect/#apache-iceberg-sink-connector).

## Catalogs in Iceberg

A catalog in Apache Iceberg stores table metadata and supports key operations such as
creating, renaming, and deleting tables. Catalogs manage collections of tables organized
into namespaces and provide the metadata needed to access them.

The Iceberg Sink Connector writes data to storage backends, while the catalog manages
metadata to enable multiple compute engines to share a common data layer.

The Iceberg Sink Connector for Aiven for Apache Kafka Connect currently supports the
following catalog types:

- **AWS Glue as REST Catalog:** An AWS-managed catalog leveraging the Iceberg REST API.
- **AWS Glue as Glue Catalog:** A native AWS Glue implementation for Iceberg.

## FileIO and write format support

The Iceberg sink connector supports the following configurations:

- **FileIO**: Supports S3FileIO for AWS S3 storage. Other implementations, such as GCS,
  ADLS, and Hadoop, are not supported.

- **Write format**: Supports Parquet format. Other formats, such as Avro and ORC,
  are not supported.

## Future enhancements

The following features are planned for future updates to the Iceberg sink connector:

- **FileIO implementations:** Support for GCS and Azure FileIO.
- **Write formats:** Additional support for Avro and ORC formats.
- **Catalogs:** Expand catalog support to include Hive, JDBC, and Amazon S3 Tables.

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Apache Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- AWS-specific setup:
  - Create an S3 bucket for storing data.
  - Configure AWS IAM roles with permissions for:
    - Read and write access to the S3 bucket.
    - Managing AWS Glue databases and tables.
  - Create an AWS Glue database and tables. For REST Catalog, ensure the schema matches
    the Apache Kafka records and specify the S3 bucket as the storage location. For more
    details, see the
    [AWS Glue Data Catalog documentation](https://docs.aws.amazon.com/glue/latest/dg/start-data-catalog.html).

## Create an Iceberg sink connector configuration file

Create a JSON configuration file for the Iceberg Sink Connector. Use the examples below,
based on the catalog type:

<Tabs groupId="catalog-type">
  <TabItem value="rest-catalog" label="AWS Glue as REST Catalog" default>

1. Create AWS resources, including an S3 bucket, Glue database, and tables.
1. Add the following configurations to the Iceberg sink connector:

   ```JSON
   {
      "iceberg.tables": "<database-name>.<table-name>",
      "iceberg.tables.auto-create-enabled": "false",
      "iceberg.control.commit.interval-ms": "1000",
      "iceberg.control.commit.timeout-ms": "2147483647",
      "iceberg.control.topic": "<your-iceberg-control-topic-name>",
      "name": "<your-connector-name>",
      "connector.class": "org.apache.iceberg.connect.IcebergSinkConnector",
      "tasks.max": "2",
      "key.converter": "org.apache.kafka.connect.json.JsonConverter",
      "value.converter": "org.apache.kafka.connect.json.JsonConverter",
      "topics": "<your-topics>",
      "consumer.override.auto.offset.reset": "earliest",
      "iceberg.catalog.client.region": "<your-aws-region>",
      "iceberg.catalog.io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
      "iceberg.catalog.rest-metrics-reporting-enabled": "false",
      "iceberg.catalog.rest.access-key-id": "<your-access-key-id>",
      "iceberg.catalog.rest.secret-access-key": "<your-secret-access-key>",
      "iceberg.catalog.rest.signing-name": "glue",
      "iceberg.catalog.rest.signing-region": "<your-aws-region>",
      "iceberg.catalog.rest.sigv4-enabled": "true",
      "iceberg.catalog.s3.access-key-id": "<your-access-key-id>",
      "iceberg.catalog.s3.path-style-access": "true",
      "iceberg.catalog.s3.secret-access-key": "<your-secret-access-key>",
      "iceberg.catalog.type": "rest",
      "iceberg.catalog.uri": "https://glue.<your-aws-region>.amazonaws.com/iceberg",
      "iceberg.catalog.warehouse": "<your-aws-account-id>",
      "iceberg.kafka.auto.offset.reset": "earliest",
      "key.converter.schemas.enable": "false",
      "value.converter.schemas.enable": "false"
   }
   ```

   Parameters:

   - `iceberg.tables`: The target Glue database and table in the
     format `<database-name>.<table-name>`.
   - `iceberg.tables.auto-create-enabled`: Indicates whether tables can be
     automatically created. Set to `false` for AWS Glue REST Catalog.
   - `iceberg.control.commit.interval-ms`: The frequency in milliseconds at which
     commits are made to Iceberg tables.
   - `iceberg.control.commit.timeout-ms`: The maximum time in milliseconds to
     wait for a commit to complete.
   - `iceberg.control.topic`: The control topic for Iceberg operations. If omitted,
     the default is `control-iceberg`.
   - `name`: The name of the connector.
   - `connector.class`: Specifies the class to use for the Iceberg Sink Connector.
   - `tasks.max`: The maximum number of tasks to run for this connector.
   - `key.converter` and `value.converter`: Specify the converters for the keys
     and values. Use `JsonConverter` for JSON data.
   - `topics`: The Kafka topics containing the data to sink into Iceberg tables.
   - `consumer.override.auto.offset.reset`: Configures the offset reset policy
     (`earliest` or `latest`).
   - `iceberg.catalog.client.region`: The AWS region for Iceberg catalog operations.
   - `iceberg.catalog.io-impl`: The file I/O implementation. Use
     `org.apache.iceberg.aws.s3.S3FileIO` for AWS S3.
   - `iceberg.catalog.rest-metrics-reporting-enabled`: Enables or disables metrics
     reporting for the REST catalog.
   - `iceberg.catalog.rest.access-key-id` and
     `iceberg.catalog.rest.secret-access-key`: AWS credentials for accessing the
     REST catalog.
   - `iceberg.catalog.rest.signing-name`: The AWS service name for request
     signing (for example, `glue`).
   - `iceberg.catalog.rest.signing-region`: The AWS region for request signing.
   - `iceberg.catalog.rest.sigv4-enabled`: Enables AWS SigV4 signing for REST
     requests.
   - `iceberg.catalog.s3.access-key-id` and
     `iceberg.catalog.s3.secret-access-key`: AWS credentials for S3 access.
   - `iceberg.catalog.s3.path-style-access`: Enables path-style access for S3 buckets.
   - `iceberg.catalog.type`: Specifies the catalog type. Use `rest` for AWS Glue REST Catalog.
   - `iceberg.catalog.uri`: The URI of the Iceberg REST endpoint for AWS Glue.
   - `iceberg.catalog.warehouse`: The S3 bucket URI to store data.
   - `iceberg.kafka.auto.offset.reset`: Configures the offset reset policy for
     Iceberg Apache Kafka.
   - `key.converter.schemas.enable` and `value.converter.schemas.enable`: Enable
     or disable schemas for the converters.

</TabItem>
<TabItem value="glue-catalog" label="AWS Glue Catalog">

1. Create AWS resources, including an S3 bucket, Glue database, and tables.

1. Add the following configurations to the Iceberg sink connector:

   ```json
   {
      "iceberg.tables": "<database-name>.<table-name>",
      "iceberg.tables.auto-create-enabled": "true",
      "iceberg.control.commit.interval-ms": "1000",
      "iceberg.control.commit.timeout-ms": "2147483647",
      "iceberg.control.topic": "<your-iceberg-control-topic-name>",
      "name": "<your-connector-name>",
      "connector.class": "org.apache.iceberg.connect.IcebergSinkConnector",
      "tasks.max": "2",
      "key.converter": "org.apache.kafka.connect.json.JsonConverter",
      "value.converter": "org.apache.kafka.connect.json.JsonConverter",
      "topics": "<your-topics>",
      "consumer.override.auto.offset.reset": "earliest",
      "iceberg.catalog.client.region": "<your-aws-region>",
      "iceberg.catalog.client.credentials-provider": "org.apache.iceberg.aws.StaticCredentialsProvider",
      "iceberg.catalog.client.credentials-provider.access-key-id": "<your-access-key-id>",
      "iceberg.catalog.client.credentials-provider.secret-access-key": "<your-secret-access-key>",
      "iceberg.catalog.io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
      "iceberg.catalog.s3.access-key-id": "<your-access-key-id>",
      "iceberg.catalog.s3.path-style-access": "true",
      "iceberg.catalog.s3.secret-access-key": "<your-secret-access-key>",
      "iceberg.catalog.type": "glue",
      "iceberg.catalog.glue_catalog.glue.id": "<your-aws-account-id>",
      "iceberg.catalog.warehouse": "s3://<your-bucket-name>",
      "iceberg.kafka.auto.offset.reset": "earliest",
      "key.converter.schemas.enable": "false",
      "value.converter.schemas.enable": "false"
   }
   ```

   Parameters:

   - All parameters are identical to those listed for AWS Glue as REST Catalog, with
     the following differences:
   - `iceberg.tables.auto-create-enabled`: Set to `true` for AWS Glue Catalog to enable
     automatic table creation.
   - `iceberg.catalog.type`: Use `glue` for AWS Glue Catalog.
   - `iceberg.catalog.glue_catalog.glue.id`: The AWS account ID for AWS Glue Catalog.
   - `iceberg.catalog.client.credentials-provider`: Specifies the credentials provider
     for AWS Glue Catalog.

</TabItem>
</Tabs>

## Create the Iceberg sink connector

<Tabs groupId="setup-method">
  <TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Apache Kafka Connect is already enabled on the service.
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

- `SERVICE_NAME`: The name of your Aiven for Apache Kafka® service.
- `@iceberg_sink_connector.json`: The path to the JSON configuration file.

</TabItem>
</Tabs>

## Example: Define and create an Iceberg sink connector

<Tabs groupId="catalog-type">
  <TabItem value="rest-catalog" label="AWS Glue as REST Catalog" default>

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
  "iceberg.catalog.warehouse": "s3://my-s3-bucket",
  "iceberg.tables": "mydatabase.mytable",
  "iceberg.tables.auto-create-enabled": "false",
  "iceberg.control.commit.interval-ms": "1000",
  "iceberg.control.commit.timeout-ms": "2147483647",
  "key.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter"
}
```

</TabItem>
<TabItem value="glue-catalog" label="AWS Glue Catalog">

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
  "iceberg.catalog.warehouse": "s3://my-s3-bucket",
  "iceberg.tables": "mydatabase.mytable",
  "iceberg.tables.auto-create-enabled": "true",
  "iceberg.control.commit.interval-ms": "1000",
  "iceberg.control.commit.timeout-ms": "2147483647",
  "key.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter"
}
```

</TabItem>
</Tabs>

Once these configurations are saved in `iceberg_sink_rest.json` or
`iceberg_sink_glue.json`, you can create the connector using the Aiven Console or
Aiven CLI. Verify that data from the Apache Kafka topic `test-topic` is successfully
ingested into your Iceberg table.



## Related pages

- [Apache Iceberg sink connector](https://iceberg.apache.org/docs/latest/kafka-connect/#apache-iceberg-sink-connector)
- [AWS Glue Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/start-data-catalog.html)
