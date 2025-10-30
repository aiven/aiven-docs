---
title: Prepare AWS for S3 sink connector
sidebar_label: Prepare AWS for S3 sink
---

Set up AWS to allow the S3 sink connector to write data from Apache Kafka® to Amazon S3.

## Create the S3 bucket

1. Open the [AWS S3 console](https://s3.console.aws.amazon.com/).
1. Create a bucket.
1. Enter a bucket name and choose a region. Keep the remaining settings as default.

:::note
Keep **Block all public access** enabled. The connector uses IAM permissions to access
the bucket.
:::

## Create an IAM policy

The Apache Kafka Connect S3 sink connector requires these permissions:

- `s3:GetObject`
- `s3:PutObject`
- `s3:AbortMultipartUpload`
- `s3:ListMultipartUploadParts`
- `s3:ListBucketMultipartUploads`

Create an inline policy in AWS IAM and replace `<AWS_S3_BUCKET_NAME>` with your bucket
name:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:AbortMultipartUpload",
        "s3:ListMultipartUploadParts",
        "s3:ListBucketMultipartUploads"
      ],
      "Resource": [
        "arn:aws:s3:::<AWS_S3_BUCKET_NAME>",
        "arn:aws:s3:::<AWS_S3_BUCKET_NAME>/*"
      ]
    }
  ]
}
```

## Create the IAM user

1. Open the [IAM console](https://console.aws.amazon.com/iamv2/home).
1. Create a user.
1. In **Select AWS credential type**, select **Access key - Programmatic access**.
   Copy the **Access key ID** and **Secret access key**. You use these values in the connector configuration.
1. In **Permissions**, attach the policy created in the previous section.

:::note
If you see `Access Denied` errors when starting the connector, review the AWS guidance
for
[S3 access issues](https://docs.aws.amazon.com/AmazonS3/latest/userguide/troubleshoot-403-errors).
:::
