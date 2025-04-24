---
title: Configure the Iceberg sink connector with AWS Glue REST catalog
sidebar_label: AWS Glue REST catalog
---

import CreateIcebergSinkConnector from "@site/static/includes/create-iceberg-sink-connector.md";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from '@site/src/components/ConsoleIcons';
import RelatedPages from "@site/src/components/RelatedPages";

The AWS Glue REST catalog stores metadata using the Iceberg REST API. It integrates Apache Kafka with AWS Glue using REST-based communication.

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
  - Create an **AWS Glue database and tables**:
    - If using the **AWS Glue REST catalog**, manually create tables and ensure the
      schema matches Apache Kafka records.
    - Specify the S3 bucket as the storage location. For more details, see the
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

   <a id="rest-catalog-parameters"></a>
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

:::note
Apache Kafka security settings are the same for both AWS Glue REST and AWS Glue
catalog configurations.
:::

## Create the Iceberg sink connector

<CreateIcebergSinkConnector />


## Example: Define and create an Iceberg sink connector

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

<RelatedPages/>

- [Iceberg sink connector overview](/docs/products/kafka/kafka-connect/howto/iceberg-sink-connector)
- [AWS Glue catalog](/docs/products/kafka/kafka-connect/howto/aws-glue-catalog)
- [AWS Glue documentation](https://docs.aws.amazon.com/glue/latest/dg/start-data-catalog.html)
- [Iceberg connector configuration](https://iceberg.apache.org/docs/latest/kafka-connect/)
