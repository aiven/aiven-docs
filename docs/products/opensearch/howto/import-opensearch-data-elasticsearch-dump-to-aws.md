---
title: Copy data from Aiven for OpenSearch® to AWS S3 using elasticsearch-dump
sidebar_label: Copy data from Aiven for OpenSearch® to AWS S3
---

Backup your OpenSearch® data into an AWS S3 bucket.

To copy the index data, we will be using `elasticsearch-dump`
[tool](https://github.com/elasticsearch-dump/elasticsearch-dump). You
can read the [instructions on
GitHub](https://github.com/elasticsearch-dump/elasticsearch-dump/blob/master/README.md)
on how to install it. From this library, we will use `elasticdump`
command to copy the input index data to an specific output.

## Prerequisites {#copy-data-from-os-to-s3}

-   `elasticsearch-dump`
    [tool](https://github.com/elasticsearch-dump/elasticsearch-dump)
    installed
-   Aiven for OpenSearch cluster as the `input`
-   AWS S3 bucket as the `output`

Collect the following information about your Aiven for
OpenSearch cluster and your AWS service:

Aiven for OpenSearch:

-   `SERVICE_URI`: OpenSearch service URI, see it in
    the Aiven dashboard.
-   `INPUT_INDEX_NAME`: the index that you aim to copy from your input
    source.

AWS S3:

-   AWS credentials (`ACCESS_KEY_ID` and `SECRET_ACCESS_KEY`).
-   S3 file path. This includes bucket name and file name, for for example,
    `s3://${BUCKET_NAME}/${FILE_NAME}.json`

For more information about AWS credentials, see the [AWS
documentation](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types).

## Export OpenSearch index data to S3

Use `elasticsearch-dump` command to copy the data from your **Aiven for
OpenSearch cluster** to your **AWS S3 bucket**. Use your Aiven for
OpenSearch `SERVICE_URI` for the `input`. For the `output`, choose an
AWS S3 file path including the file name that you want for your
document.

```shell
elasticdump \
--s3AccessKeyId "${ACCESS_KEY_ID}" \
--s3SecretAccessKey "${SECRET_ACCESS_KEY}" \
--input=SERVICE_URI/INPUT_INDEX_NAME --output "s3://${BUCKET_NAME}/${FILE_NAME}.json"
```

### Resources

Aiven for OpenSearch databases are automatically backed up, so you can
check more information about how the
[Backup process works](/docs/products/opensearch/concepts/backups).
