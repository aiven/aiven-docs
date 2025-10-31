---
title: Create an Amazon S3 sink connector by Confluent from Apache Kafka®
sidebar_label: Confluent S3 sink connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

The Amazon S3 sink connector by Confluent moves data from Apache Kafka® topics to Amazon S3 buckets for long-term storage.

For the full list of configuration options, see the
[Confluent S3 sink connector documentation](https://docs.confluent.io/current/connect/kafka-connect-s3/).

## Prerequisites

- An Aiven for Apache Kafka® service [with Kafka Connect enabled](enable-connect), or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

- AWS access to an S3 bucket. See [Prepare AWS for S3 sink](/docs/products/kafka/kafka-connect/howto/s3-sink-prepare)
  to complete bucket and IAM setup. After setup, you will have the required S3 bucket
  details and access credentials.


## Create the connector configuration file

Create a file named `s3_sink_confluent.json` with the following configuration:

```json
{
  "name": "s3_sink_confluent",
  "connector.class": "io.confluent.connect.s3.S3SinkConnector",
  "tasks.max": "1",
  "topics": "my-topic",
  "key.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
  "value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
  "format.class": "io.confluent.connect.s3.format.bytearray.ByteArrayFormat",
  "flush.size": "1",
  "s3.bucket.name": "my-bucket",
  "s3.region": "eu-central-1",
  "s3.credentials.provider.class": "io.aiven.kafka.connect.util.AivenAWSCredentialsProvider",
  "storage.class": "io.confluent.connect.s3.storage.S3Storage",
  "s3.credentials.provider.access_key_id": "AKIAXXXXXXXXXX",
  "s3.credentials.provider.secret_access_key": "hELuXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

Parameters:

- `connector.class`: Uses the Confluent S3 sink connector
- `topics`: Kafka topics to sink
- `format.class`: Output format (byte array in this example)
- `flush.size`: Number of messages written per file in S3
- `s3.bucket.name` / `s3.region`: Destination S3 bucket
- `s3.credentials.provider.class`: Use Aiven provider to supply AWS credentials

For all options, see the
[Confluent connector documentation](https://docs.confluent.io/current/connect/kafka-connect-s3/).

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Aiven Console" default>

1. Open the [Aiven Console](https://console.aiven.io/).
1. Select your Kafka or Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector**.
1. Search for **Amazon S3 sink (Confluent)** and click **Get started**.
1. On the connector page, go to the **Common** tab.
1. Click <ConsoleLabel name="edit"/> in **Connector configuration**.
1. Paste your `s3_sink_confluent.json` contents.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Create the connector:

```bash
avn service connector create SERVICE_NAME @s3_sink_confluent.json
```

Check the connector status:

```bash
avn service connector status SERVICE_NAME s3_sink_confluent
```

</TabItem>
</Tabs>

## Example: create an Amazon S3 sink connector (Confluent)

This example creates an S3 sink connector that writes data from the `students` topic to
the `my-test-bucket` bucket in the `eu-central-1` region, writing a file every 10 messages.

```json
{
  "name": "my_s3_sink",
  "connector.class": "io.confluent.connect.s3.S3SinkConnector",
  "tasks.max": "1",
  "topics": "students",
  "key.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
  "value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
  "format.class": "io.confluent.connect.s3.format.bytearray.ByteArrayFormat",
  "flush.size": "10",
  "s3.bucket.name": "my-test-bucket",
  "s3.region": "eu-central-1",
  "storage.class": "io.confluent.connect.s3.storage.S3Storage",
  "s3.credentials.provider.access_key_id": "AKIAXXXXXXXXXX",
  "s3.credentials.provider.secret_access_key": "hELuXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

Save this as `s3_sink_confluent.json`, then create the connector:

```bash
avn service connector create demo-kafka @s3_sink_confluent.json
```

After creation, confirm that data from the `students` topic appears in
the `my-test-bucket` S3 bucket.


<RelatedPages/>

[Amazon S3 sink connector by Aiven](/docs/products/kafka/kafka-connect/howto/s3-sink-connector-aiven)
