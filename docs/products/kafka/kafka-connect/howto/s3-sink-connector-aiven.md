---
title: Create an Amazon S3 sink connector by Aiven from Apache Kafka®
---

The Apache Kafka Connect® S3 sink connector by Aiven enables you to move data from an Aiven for Apache Kafka® cluster to Amazon S3 for long term storage.

<!-- vale off -->
:::note

- There are two versions of S3 sink connector available with Aiven for
  Apache Kafka Connect®: an Aiven version and a Confluent version. This article is about
  the Aiven version. To use the S3 sink connector by
  Confluent see [Amazon S3 sink connector by Confluent](/docs/products/kafka/kafka-connect/howto/s3-sink-connector-confluent).

- See the full set of available parameters and configuration
  options in the [connector's
  documentation](https://github.com/aiven/s3-connector-for-apache-kafka).

:::

<!-- vale on -->

## Prerequisites

- An Aiven for Apache Kafka® service [with Apache Kafka Connect enabled](enable-connect)
  or a [dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

- [Prepare the AWS account and S3 sink](/docs/products/kafka/kafka-connect/howto/s3-sink-prereq)
  and collect the following information about the target S3 bucket:

  - `AWS_S3_NAME`: The name of the S3 bucket
  - `AWS_S3_REGION`: The AWS region where the S3 bucket has been created
  - `AWS_USER_ACCESS_KEY_ID`: The AWS user access key ID
  - `AWS_USER_SECRET_ACCESS_KEY`: The AWS user secret access key

:::tip
To secure your Kafka Connect to S3 using [AWS Assume role
credentials](https://docs.aws.amazon.com/sdkref/latest/guide/feature-assume-role-credentials),
see [Use AWS IAM assume role credentials provider](/docs/products/kafka/kafka-connect/howto/s3-iam-assume-role).
:::

## Setup an S3 sink connector with Aiven CLI

The following example demonstrates how to setup an Apache Kafka Connect®
S3 sink connector using the
[Aiven CLI dedicated command](/docs/tools/cli/service/connector#avn_service_connector_create).

### Define a Kafka Connect® configuration file

Define the connector configurations in a file (we'll refer to it with
the name `s3_sink.json`) with the following content:

```json
{
    "name": "<CONNECTOR_NAME>",
    "connector.class": "io.aiven.kafka.connect.s3.AivenKafkaConnectS3SinkConnector",
    "key.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
    "value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
    "topics": "<TOPIC_NAME>",
    "aws.access.key.id": "<AWS_USER_ACCESS_KEY_ID>",
    "aws.secret.access.key": "<AWS_USER_SECRET_ACCESS_KEY>",
    "aws.s3.bucket.name": "<AWS_S3_NAME>",
    "aws.s3.region": "<AWS_S3_REGION>"
}
```

The configuration file contains the following entries:

-   `name`: The connector name
-   `topics`: The list of Apache Kafka® topics to sink to the S3 bucket
-   `key.converter` and `value.converter`: Data converters, depending on
    the topic data format. Check the [GitHub repository
    documentation](https://github.com/aiven/s3-connector-for-apache-kafka)
    for more information
-   `aws.access.key.id`: The AWS user access key ID
-   `aws.secret.access.key`: The AWS user secret access key
-   `aws.s3.bucket.name`: The name of the S3 bucket
-   `aws.s3.region`: The AWS region where the S3 bucket has been created

:::tip
You can define S3 sink connector naming and data formats by setting the
[dedicated parameters](/docs/products/kafka/kafka-connect/reference/s3-sink-additional-parameters).
:::

See the [GitHub repository parameters
documentation](https://github.com/aiven/s3-connector-for-apache-kafka)
for the full list of configuration options.

### Create an S3 sink connector with Aiven CLI

To create the connector, execute the following
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create), replacing the `SERVICE_NAME` with the name of the existing
Aiven for Apache Kafka® service where the connector needs to run:

```shell
avn service connector create SERVICE_NAME @s3_sink.json
```

Check the connector status with the following command, replacing the
`SERVICE_NAME` with the existing Aiven for Apache Kafka® service and the
`CONNECTOR_NAME` with the name of the connector defined before:

```
avn service connector status SERVICE_NAME CONNECTOR_NAME
```

With the connection in place, verify that the data is flowing to the
target S3 bucket.

## Example: define a S3 sink connector

The example creates an S3 sink connector with the following properties:

-   connector name: `my_s3_sink`
-   source topics: `students`
-   target S3 bucket name: `my-test-bucket`
-   target S3 bucket region: `eu-central-1`
-   AWS user access key id: `AKIAXXXXXXXXXX`
-   AWS user secret access key: `hELuXXXXXXXXXXXXXXXXXXXXXXXXXX`

The connector configuration is the following:

```json
{
    "name": "my_s3_sink",
    "connector.class": "io.aiven.kafka.connect.s3.AivenKafkaConnectS3SinkConnector",
    "key.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
    "value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
    "topics": "students",
    "aws.access.key.id": "AKIAXXXXXXXXXX",
    "aws.secret.access.key": "hELuXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "aws.s3.bucket.name": "my-test-bucket",
    "aws.s3.region": "eu-central-1"
}
```

With the above configuration stored in a `s3_sink.json` file, you can
create the connector in the `demo-kafka` instance with:

```shell
avn service connector create demo-kafka @s3_sink.json
```
