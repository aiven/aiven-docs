---
title: Configure the Iceberg sink connector with AWS Glue catalog
sidebar_label: AWS Glue catalog
---

import CreateIcebergSinkConnector from "@site/static/includes/create-iceberg-sink-connector.md";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from '@site/src/components/ConsoleIcons';
import RelatedPages from "@site/src/components/RelatedPages";

The AWS Glue catalog directly manages Iceberg metadata within AWS Glue. It supports automatic table creation and schema evolution.

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Apache Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- Apache Kafka client settings: The Iceberg sink connector requires these settings to
  connect to the Iceberg control topic. For a full list of supported configurations, see
  [Iceberg configuration](https://iceberg.apache.org/docs/latest/kafka-connect/#kafka-configuration).
- AWS-specific setup:
  - Create an **S3 bucket** to store data.
  - Configure **AWS IAM roles** with the appropriate permissions. See
    [Configure AWS IAM permissions](#configure-aws-iam-permissions).
  - Create an **AWS Glue database and tables**, and specify the S3 bucket as the
    storage location. For more details, see the
    [AWS Glue data catalog documentation](https://docs.aws.amazon.com/glue/latest/dg/start-data-catalog.html).

## Configure AWS IAM permissions {#configure-aws-iam-permissions}

The Iceberg sink connector requires an IAM user with permissions to access Amazon S3 and
AWS Glue. These permissions allow the connector to write data to an S3 bucket and manage
metadata in the AWS Glue catalog.

To set up the required permissions:

1. Create an IAM user in
   [AWS Identity and Access Management (IAM)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html)
   with permissions for Amazon S3 and AWS Glue.
1. Attach the following policy to the IAM user:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "S3Access",
         "Effect": "Allow",
         "Action": [
           "s3:GetObject",
           "s3:PutObject",
           "s3:DeleteObject",
           "s3:ListBucket",
           "s3:GetBucketLocation",
           "s3:AbortMultipartUpload",
           "s3:ListMultipartUploadParts"
         ],
         "Resource": [
           "arn:aws:s3:::<your-bucket-name>/*"
         ]
       },
       {
         "Sid": "S3ListBucket",
         "Effect": "Allow",
         "Action": "s3:ListBucket",
         "Resource": [
           "arn:aws:s3:::<your-bucket-name>"
         ]
       },
       {
         "Sid": "GlueAccess",
         "Effect": "Allow",
         "Action": [
           "glue:CreateDatabase",
           "glue:GetDatabase",
           "glue:GetTables",
           "glue:SearchTables",
           "glue:CreateTable",
           "glue:UpdateTable",
           "glue:GetTable",
           "glue:BatchCreatePartition",
           "glue:CreatePartition",
           "glue:UpdatePartition",
           "glue:GetPartition",
           "glue:GetPartitions"
         ],
           "Resource": [
             "arn:aws:glue:<your-aws-region>:<your-aws-account>:catalog",
             "arn:aws:glue:<your-aws-region>:<your-aws-account>:database/*",
             "arn:aws:glue:<your-aws-region>:<your-aws-account>:table/*"
           ]
         }
       ]
     }
   ```

   Replace the placeholder values in the policy:

   - `<your-aws-region>`: Your AWS Glue catalog’s region
   - `<your-aws-account>`: Your AWS account ID
   - `<your-bucket-name>`: The name of your Amazon S3 bucket

1. Obtain the access key ID and secret access key for the IAM user.
1. Add these credentials to the Iceberg sink connector configuration.

For more information on creating and managing AWS IAM users and policies, see the
[AWS IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html).

### AWS Glue naming conventions

When creating databases and tables in AWS Glue for the Iceberg sink connector,
follow these naming conventions to ensure compatibility:

- **Database names**:
  - Use only lowercase letters (a-z), numbers (0-9), and underscores (_).
  - Must be between **1 and 252 characters** long.
  - Examples:
    - Valid: `sales_data`, `customer_orders_2024`
    - Invalid: `SalesData`, `customer orders`

- **Table names**:
  - Use only lowercase letters, numbers, and underscores.
  - Must be between **1 and 255 characters** long.
  - Examples:
    - Valid: `product_catalog`, `order_history_2023`
    - Invalid: `ProductCatalog` , `order-history`

- **Column names**:
  AWS Glue has minimal restrictions on column names. Using only letters, numbers, and
  underscores is recommended for best compatibility.

For more details, see the [AWS Athena naming conventions](https://docs.aws.amazon.com/athena/latest/ug/tables-databases-columns-names.html).

## Create an Iceberg sink connector configuration

To configure the Iceberg sink connector, define a JSON configuration file based on your
catalog type.

:::note
Loading worker properties is not supported. Use `iceberg.kafka.*` properties instead.
:::

1. Create AWS resources, including an S3 bucket, Glue database, and tables.

1. Add the following configurations to the Iceberg sink connector:

   ```json
   {

     "name": "CONNECTOR_NAME",
     "connector.class": "org.apache.iceberg.connect.IcebergSinkConnector",
     "tasks.max": "2",
     "topics": "KAFKA_TOPICS",
     "key.converter": "org.apache.kafka.connect.json.JsonConverter",
     "value.converter": "org.apache.kafka.connect.json.JsonConverter",
     "key.converter.schemas.enable": "false",
     "value.converter.schemas.enable": "false",
     "consumer.override.auto.offset.reset": "earliest",
     "iceberg.kafka.auto.offset.reset": "earliest",
     "iceberg.tables": "DATABASE_NAME.TABLE_NAME",
     "iceberg.tables.auto-create-enabled": "true",
     "iceberg.control.topic": "ICEBERG_CONTROL_TOPIC_NAME",
     "iceberg.control.commit.interval-ms": "1000",
     "iceberg.control.commit.timeout-ms": "2147483647",
     "iceberg.catalog.type": "glue",
     "iceberg.catalog.glue_catalog.glue.id": "AWS_ACCOUNT_ID",
     "iceberg.catalog.warehouse": "s3://BUCKET_NAME",
     "iceberg.catalog.client.region": "AWS_REGION",
     "iceberg.catalog.client.credentials-provider": "org.apache.iceberg.aws.StaticCredentialsProvider",
     "iceberg.catalog.client.credentials-provider.access-key-id": "AWS_ACCESS_KEY_ID",
     "iceberg.catalog.client.credentials-provider.secret-access-key": "AWS_SECRET_ACCESS_KEY",
     "iceberg.catalog.io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
     "iceberg.catalog.s3.access-key-id": "AWS_ACCESS_KEY_ID",
     "iceberg.catalog.s3.secret-access-key": "AWS_SECRET_ACCESS_KEY",
     "iceberg.catalog.s3.path-style-access": "true",
     "iceberg.kafka.bootstrap.servers": "KAFKA_HOST:KAFKA_PORT",
     "iceberg.kafka.security.protocol": "SSL",
     "iceberg.kafka.ssl.keystore.location": "/run/aiven/keys/public.keystore.p12",
     "iceberg.kafka.ssl.keystore.password": "KEYSTORE_PASSWORD",
     "iceberg.kafka.ssl.keystore.type": "PKCS12",
     "iceberg.kafka.ssl.truststore.location": "/run/aiven/keys/public.truststore.jks",
     "iceberg.kafka.ssl.truststore.password": "TRUSTSTORE_PASSWORD",
     "iceberg.kafka.ssl.key.password": "KEY_PASSWORD"
   }
   ```

   Parameters:

   Most connector parameters are shared with the
   [AWS Glue REST catalog parameters](/docs/products/kafka/kafka-connect/howto/aws-glue-rest-catalog#parameters)
   configuration. The key differences for the AWS Glue catalog are:

   - `iceberg.tables.auto-create-enabled`: Set to `true` to enable automatic table
     creation for AWS Glue catalog.
   - `iceberg.catalog.type`: Specify `glue` for AWS Glue catalog.
   - `iceberg.catalog.glue_catalog.glue.id`: Enter the AWS account ID for AWS Glue catalog.
   - `iceberg.catalog.client.credentials-provider`: Specify the credentials provider for
     AWS Glue catalog.

:::note
Apache Kafka security settings are the same for both AWS Glue REST and AWS Glue
catalog configurations.
:::

## Create the Iceberg sink connector

<CreateIcebergSinkConnector />

## Example

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

<RelatedPages/>

- [Iceberg sink connector overview](/docs/products/kafka/kafka-connect/howto/iceberg-sink-connector)
- [AWS Glue REST catalog](/docs/products/kafka/kafka-connect/howto/aws-glue-rest-catalog)
- [AWS Glue documentation](https://docs.aws.amazon.com/glue/latest/dg/start-data-catalog.html)
- [Iceberg connector configuration](https://iceberg.apache.org/docs/latest/kafka-connect/)
