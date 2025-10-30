---
title: Use AWS IAM assume role credentials provider
sidebar_label: Use AWS IAM assume role credentials
---

The [Aiven for Apache Kafka® S3 sink connector](s3-sink-connector-aiven) moves data from an Aiven for Apache Kafka cluster to Amazon S3 for long-term storage.

You can connect the S3 sink connector to Amazon S3 using either:

- Long-term AWS credentials (`ACCESS_KEY_ID` and `SECRET_ACCESS_KEY`)
- [AWS IAM assume role credentials](https://docs.aws.amazon.com/sdkref/latest/guide/feature-assume-role-credentials) (recommended)

When you use IAM assume role credentials, the connector requests short-term credentials each time it writes data to the S3 bucket.

To use IAM assume role credentials:

- Request a unique IAM user from Aiven support.
- Create an AWS cross-account access role.
- Create a Kafka Connect S3 sink connector.

## Request a unique IAM user from Aiven support

Each Aiven project has a dedicated IAM user. Aiven does not share IAM users or roles
across customers. Contact Aiven support at `support@aiven.io` to request:

- An IAM user ARN
- An [External ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid) (used to identify your role)

Example:

- IAM user: `arn:aws:iam::012345678901:user/sample-project-user`
- External ID: `2f401145-06a0-4938-8e05-2d67196a0695`

The [cross-account role](https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles)
you create provides access to one Aiven project only.

## Create an AWS cross-account access role

1. Sign in to the AWS console.
1. Go to **IAM** > **Roles** > **Create role**.
1. Select **Another AWS account** as the trusted entity type.
1. Enter the **Account ID**.
   This is the numeric string in the IAM user ARN between `aws:iam::` and `:user/`.
   Example: `012345678901`
1. Select **Require external ID** and enter the External ID provided by Aiven support.
1. Add permissions to allow writing to an S3 bucket. The following permissions are required:
   - `s3:GetObject`
   - `s3:PutObject`
   - `s3:AbortMultipartUpload`
   - `s3:ListMultipartUploadParts`
   - `s3:ListBucketMultipartUploads`
1. Optional: Add tags.
1. Enter a name for the role. Example: `AivenKafkaConnectSink`
1. To restrict access, edit the trust relationship for the new role:
   - Go to **Trust relationships** > **Edit trust relationship**
   - Set the IAM user as the `Principal`.
1. Copy the new **IAM role ARN**. You will need it in the connector configuration.

## Create a Kafka Connect S3 sink connector

Create the connector as described in the [S3 sink connector documentation](s3-sink-connector-aiven).

To use IAM assume role credentials, remove these parameters from the connector configuration:

- `aws.access.key.id`
- `aws.secret.access.key`

Add these parameters:

- `aws.sts.role.arn`: ARN of the IAM role created in AWS.
- `aws.sts.role.external.id`: External ID provided by Aiven support.

Optional parameters:

- `aws.sts.role.session.name`: Session identifier for the task. Appears in AWS CloudTrail
  logs and helps distinguish tasks within the same project.
- `aws.sts.config.endpoint`: Security Token Service (STS) endpoint. Use the endpoint in
  the same region as the S3 bucket for better performance.
  Example: For region `eu-north-1`, set `https://sts.eu-north-1.amazonaws.com`.
  For the list of STS endpoints, see the [AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_enable-regions).

### Example configuration file (`s3_sink.json`)

```json
{
  "name": "<CONNECTOR_NAME>",
  "connector.class": "io.aiven.kafka.connect.s3.AivenKafkaConnectS3SinkConnector",
  "key.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
  "value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
  "topics": "<TOPIC_NAME>",
  "aws.sts.role.arn": "<AWS_ROLE_ARN>",
  "aws.sts.role.external.id": "<AWS_IAM_USER_EXTERNAL_ID>",
  "aws.sts.role.session.name": "<AWS_STS_SESSION_NAME>",
  "aws.sts.config.endpoint": "<AWS_STS_ENDPOINT>",
  "aws.s3.bucket.name": "<AWS_S3_BUCKET_NAME>",
  "aws.s3.region": "<AWS_S3_REGION>"
}
```

For the full list of S3 sink connector settings and examples, see the
[S3 sink connector documentation](s3-sink-connector-aiven).
