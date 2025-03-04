---
title: Create an Amazon S3 source connector for Aiven for Apache Kafka®
sidebar_label: S3 source connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

The Amazon S3 source connector allows you to ingest data from S3 buckets into Apache Kafka® topics for real-time processing and analytics.

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Aiven for Kafka Connect enabled, or a [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- An **Amazon S3 bucket** containing the data to stream into Aiven for Apache Kafka.
- Required S3 bucket details:

  - `AWS_S3_BUCKET_NAME`: The bucket name.
  - `AWS_S3_REGION`: The AWS region where the bucket is located. For example, us-east-1.
  - `AWS_S3_PREFIX`: Optional. A prefix path if the data is in a specific folder.
  - `AWS_ACCESS_KEY_ID`: The AWS access key ID.
  - `AWS_SECRET_ACCESS_KEY`: The AWS secret access key.
  - `TARGET_KAFKA_TOPIC`: The Apache Kafka topic where the data is published.

- **AWS IAM credentials** with the following permissions:
  - `s3:GetObject`
  - `s3:ListBucket`

For additional details on how the connector works, see the
[S3 source connector documentation](https://github.com/aiven-open/cloud-storage-connectors-for-apache-kafka/blob/main/s3-source-connector/README.md).

## S3 object key name format

The `file.name.template` parameter defines how the connector extracts metadata from S3
object keys. If this parameter is missing, no objects are processed.

Use the following placeholders to define the template:

- `{{topic}}`: The Apache Kafka topic name.
- `{{partition}}`: The Apache Kafka partition number.
- `{{start_offset}}`: The offset of the first record in the file.
- `{{timestamp}}`: Optional. The timestamp when the record was processed.

### Example templates and extracted values

The following table shows how different templates extract metadata from S3 object keys:

| Template                                                               | Example S3 object key                                            | Extracted values                                               |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------- |
| `{{topic}}-{{partition}}-{{start_offset}}`                             | `customer-topic-1-1734445664111.txt`                             | topic=customer-topic, partition=1, start_offset=1734445664111 |
| `{{topic}}-{{partition}}-{{start_offset}}`                             | `22-10-12/customer-topic-1-1734445664111.txt`                    | topic=22, partition=10, start_offset=112                      |
| `{{topic}}/{{partition}}/{{start_offset}}`                             | `customer-topic/1/1734445664111.txt`                             | topic=customer-topic, partition=1, start_offset=1734445664111 |
| `topic/{{topic}}/partition/{{partition}}/startOffset/{{start_offset}}` | `topic/customer-topic/partition/1/startOffset/1734445664111.txt` | topic=customer-topic, partition=1, start_offset=1734445664111 |

## Supported S3 object formats

The connector supports four S3 object formats. Choose the one that best fits your data
and processing needs:

| Format | Description | Configuration | Example |
|--------|------------|--------------|---------|
| JSON Lines (`jsonl`) | Each line is a valid JSON object, commonly used for event streaming. | `input.format=jsonl` | ```json { "key": "k1", "value": "v0", "offset": 1232155, "timestamp": "2020-01-01T00:00:01Z" } ``` |
| Avro (`avro`) | A compact, schema-based binary format for efficient serialization. | `input.format=avro` | ```json { "type": "record", "fields": [ { "name": "key", "type": "string" }, { "name": "value", "type": "string" }, { "name": "timestamp", "type": "long" } ] } ``` |
| Parquet (`parquet`) | A columnar format optimized for fast queries. Stores data in a compressed, column-based structure.| `input.format=parquet` | Uses a schema similar to Avro but optimized for analytics.|
| Bytes (`bytes`) (default) | A raw byte stream format for unstructured data. | `input.format=bytes` | No predefined structure |

## Acknowledged records and offset tracking

When a record is acknowledged, Apache Kafka confirms receipt but may not immediately
write it to the offset topic. If the connector restarts before Apache Kafka updates the
offset topic, some records may be duplicated. For details on offset tracking and retry
handling, see the [S3 source connector documentation](https://github.com/aiven-open/cloud-storage-connectors-for-apache-kafka/blob/main/s3-source-connector/README.md).

## Create an Amazon S3 source connector configuration file

Create a file named `s3_source_connector.json` and add the following configuration:

```json
  {
    "name": "aiven-s3-source-connector",
    "connector.class": "io.aiven.kafka.connect.s3.source.S3SourceConnector",
    "aws.access.key.id": "YOUR_AWS_ACCESS_KEY_ID",
    "aws.secret.access.key": "YOUR_AWS_SECRET_ACCESS_KEY",
    "aws.s3.bucket.name": "your-s3-bucket-name",
    "aws.s3.region": "your-s3-region",
    "aws.s3.prefix": "optional/prefix/",
    "aws.credentials.provider": "software.amazon.awssdk.auth.credentials.AwsCredentialsProviderChain",
    "topic": "your-target-kafka-topic",
    "file.name.template": "{{topic}}-{{partition}}-{{start_offset}}",
    "tasks.max": 1,
    "poll.interval.ms": 10000,
    "error.tolerance": "all",
    "input.format": "jsonl"
  }
```

Parameters:

- `name`: A unique name for the connector.
- `connector.class`: The Java class for the connector.
- `aws.access.key.id` and `aws.secret.access.key`: AWS IAM credentials for
  authentication.
- `aws.s3.bucket.name`: The name of the S3 bucket containing the source data.
- `aws.s3.region`: The AWS region where the bucket is located.
- `aws.s3.prefix` objectptional: Filters objects within the S3 bucket.
- `aws.credentials.provider`: Specifies the AWS credentials provider.
- `topic` optional: The connector publishes ingested data to the specified Apache
  Kafka topic. If not set, it derives the topic from the `file.name.template`
  configuration.
- `file.name.template`: Defines how to parse S3 object keys to extract data such as the
  topic, partition, and starting offset. Template variables were defined above.
  For example, a template like `{{topic}}-{{partition}}-{{start_offset}}` matches filenames
  such as `test-topic-1-1734445664111.txt`.
- `tasks.max`: The maximum number of tasks that run in parallel.
- `poll.interval.ms`: The polling interval (in milliseconds) for checking the S3 bucket
  for new files.
- `error.tolerance`: Specifies the error handling mode.
  - `all`: Logs and ignores errors.
  - `none`: Fails on errors.
- `input.format`: Specifies the S3 object format. Supported values:
  - `jsonl` (JSON Lines)
  - `avro` (Avro)
  - `parquet` (Parquet)
  - `bytes` (default)

For all available configuration options, see the
[S3 source connector configuration](/docs/products/kafka/kafka-connect/howto/S3SourceConfig).

## Create the connector

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

1. In the sink connectors list, select **Amazon S3 source connector**, and click
   **Get started**.
1. On the **Amazon S3 Source Connector** page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `s3_source_connector.json` file into the text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To create the S3 source connector using the
[Aiven CLI](/docs/tools/cli/service/connector#avn_service_connector_create), run:

```bash
avn service connector create SERVICE_NAME @s3_source_connector.json
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `@s3_source_connector.json`: Path to your JSON configuration file.

To check the connector status, run:

```bash
avn service connector status SERVICE_NAME CONNECTOR_NAME
```

Verify that data flows to the target Apache Kafka topic.

</TabItem>
</Tabs>

## Example: Define and create an Amazon S3 source connector

This example shows how to create an Amazon S3 source connector with the following properties:

- Connector name: `aiven-s3-source-connector`
- Apache Kafka topic: `test-topic`
- AWS region: `us-west-1`
- AWS S3 bucket: `my-s3-bucket`
- File name template: `{{topic}}-{{partition}}-{{start_offset}}`
- Poll interval: `10 seconds`

```json
{
"name": "aiven-s3-source-connector",
"connector.class": "io.aiven.kafka.connect.s3.source.S3SourceConnector",
"tasks.max": "1",
"topic": "test-topic",
"aws.access.key.id": "your-access-key-id",
"aws.secret.access.key": "your-secret-access-key",
"aws.s3.bucket.name": "my-s3-bucket",
"aws.s3.region": "us-west-1",
"aws.s3.prefix": "data-uploads/",
"file.name.template": "{{topic}}-{{partition}}-{{start_offset}}",
"poll.interval.ms": 10000
}
```

Once this configuration is saved in the `s3_source_connector.json` file, you can
create the connector using the Aiven Console or CLI, and verify that data from the
Apache Kafka topic `test-topic` is successfully ingested from the Amazon S3 bucket.
