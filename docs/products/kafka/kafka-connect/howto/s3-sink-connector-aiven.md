---
title: Create an Amazon S3 sink connector for Aiven from Apache Kafka®
sidebar_label: Aiven S3 sink connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

The Amazon S3 sink connector sends data from Aiven for Apache Kafka® to Amazon S3 for long-term storage.

To view the full configuration reference in the [S3 sink connector documentation](https://github.com/Aiven-Open/cloud-storage-connectors-for-apache-kafka/blob/main/s3-sink-connector/README.md).

## Prerequisites

- An Aiven for Apache Kafka® service [with Kafka Connect enabled](enable-connect), or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- AWS access to an S3 bucket. See [Prepare AWS for S3 sink](/docs/products/kafka/kafka-connect/howto/s3-sink-prepare)
  to complete bucket and IAM setup. After setup, you will have the required S3 bucket
  details and access credentials.

To use AWS IAM assume role credentials, see
[Use AWS IAM assume role credentials provider](/docs/products/kafka/kafka-connect/howto/s3-iam-assume-role).

## Create an S3 sink connector configuration file

Create a file named `s3_sink_connector.json` with the following configuration:

```json
{
  "name": "s3_sink",
  "connector.class": "io.aiven.kafka.connect.s3.AivenKafkaConnectS3SinkConnector",
  "tasks.max": "1",
  "topics": "my-topic",
  "aws.access.key.id": "AKIAXXXXXXXXXX",
  "aws.secret.access.key": "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "aws.s3.bucket.name": "my-bucket",
  "aws.s3.region": "eu-central-1",
  "key.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
  "value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter"
}
```

Parameters:

- `name`: Connector name
- `topics`: Apache Kafka topics to sink data from
- `aws.access.key.id`: AWS access key ID
- `aws.secret.access.key`: AWS secret access key
- `aws.s3.bucket.name`: S3 bucket name
- `aws.s3.region`: AWS region
- `key.converter`, `value.converter`: Converters for key and value formats
- `file.compression.type` optional: Compression type for output files. Supported values:
  `gzip`, `snappy`, `zstd`, `none`. Default is `gzip`.

  If you use the [Amazon S3 source connector](/docs/products/kafka/kafka-connect/howto/s3-source-connector),
  set the same `file.compression.type` in the source configuration to ensure the source
  can read data written by the sink. The S3 source connector defaults to `none`.

For additional parameters (for example, file naming or output format), see
[S3 sink connector reference](https://github.com/Aiven-Open/cloud-storage-connectors-for-apache-kafka/blob/main/s3-sink-connector/README.md).

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Aiven Console" default>

1. Open the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka® or Apache Kafka Connect® service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector**.
   If connectors are not enabled, click **Enable connectors on this service**.
1. Search for **Amazon S3 sink** and click **Get started**.
1. Go to the **Common** tab and click <ConsoleLabel name="edit"/> in the
   **Connector configuration** section.
1. Paste your `s3_sink_connector.json` content.
1. Click **Create connector**.
1. Confirm the connector is running in the <ConsoleLabel name="Connectors"/> view.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Create the connector:

```bash
avn service connector create SERVICE_NAME @s3_sink_connector.json
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka® service
- `@s3_sink_connector.json`: Path to the connector configuration file

Check the connector status:

```bash
avn service connector status SERVICE_NAME CONNECTOR_NAME
```

</TabItem>
</Tabs>

## Example: create an Amazon S3 sink connector

This example creates an S3 sink connector that writes data from the `students` topic to
the `my-test-bucket` bucket in the `eu-central-1` region.

```json
{
  "name": "my_s3_sink",
  "connector.class": "io.aiven.kafka.connect.s3.AivenKafkaConnectS3SinkConnector",
  "tasks.max": "1",
  "topics": "students",
  "aws.access.key.id": "AKIAXXXXXXXXXX",
  "aws.secret.access.key": "hELuXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "aws.s3.bucket.name": "my-test-bucket",
  "aws.s3.region": "eu-central-1",
  "key.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
  "value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter"
}
```

Save this as `s3_sink_connector.json`, then create the connector:

```bash
avn service connector create demo-kafka @s3_sink_connector.json
```

After creation, confirm that data from the `students` topic appears in
the `my-test-bucket` S3 bucket.

The S3 sink connector compresses files using `gzip` by default. To read these files using
the S3 source connector, set `file.compression.type` in the source
configuration to `gzip` or another matching value.

<RelatedPages/>

[Amazon S3 sink connector by Confluent](/docs/products/kafka/kafka-connect/howto/s3-sink-connector-confluent)
