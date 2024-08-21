---
title: Migrate to Aiven for OpenSearch® using snapshots
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven for OpenSearch enables you to restore data from external OpenSearch or Elasticsearch snapshots, facilitating seamless migration from third-party repositories into your clusters.

Aiven supports snapshot restoration from Google Cloud Storage (GCS), Amazon S3, and
Microsoft Azure. Additionally, you can restore data from Oracle Cloud Infrastructure
(OCI) or other S3-compatible repositories using the S3 repository type.

## Supported cloud providers

- Google Cloud Storage (GCS)
- Amazon S3
- Microsoft Azure
- S3-compatible services. For example, Oracle Cloud Infrastructure

## Prerequisites

Before you begin, ensure that:

- You have an active Aiven account with a configured project.
- A target Aiven for OpenSearch service within your project.
- Your OpenSearch or Elasticsearch snapshot is from version 7.10.2 or earlier and is
  compatible with your target service.
- The feature flag is enabled for your project, allowing external migrations.

### Gather required parameters

Before registering the snapshot repository, gather the following information:

- `API_TOKEN`: Your Aiven API token for authentication.
- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven for OpenSearch service.

Information specific to cloud providers:

- **Google Cloud Storage (GCS)**

  - `credentials`: GCS credentials file content.
  - `bucket`: Name of the GCS bucket that contains the snapshot.
  - `base_path`: Path to repository data within the bucket.
  - `snapshot_name`: Name of the snapshot to restore.
  - `compress` and `chunk_size`: (Optional) Settings for metadata compression
    and file chunking.

- **Amazon S3**

  - `region`: AWS region where the S3 bucket is located.
  - `bucket`: Name of the S3 bucket that contains the snapshot.
  - `base_path`: Path to repository data within the bucket.
  - `snapshot_name`: Name of the snapshot to restore.
  - `server_side_encryption`, `compress`, `chunk_size`* (Optional) Settings
    for encryption, compression, and file chunking.

  :::note
  Authentication credentials (`access_key`, `secret_key`) are not included in the
  repository creation request. These are managed separately through environment variables,
  IAM roles, or other methods.

  :::

- **Microsoft Azure**

  - `account`: Azure account name.
  - `key` or `sas_token`: Azure secret key or shared access signature token.
  - `container`: Name of the Azure container that contains the snapshot.
  - `base_path`: Path to repository data within the container.
  - `snapshot_name`: Name of the snapshot to restore.
  - `compress`, `chunk_size`, `endpoint_suffix`: (Optional) Additional configuration
    settings.

- **S3-compatible services**

  - `endpoint`: Service endpoint for S3-compatible services.
  - `access_key`: Access key for the S3-compatible service.
  - `secret_key`**: Secret key for the S3-compatible service.
  - `region`: Region or endpoint-specific region.
  - `bucket`, `base_path`, `snapshot_name`: Bucket details and snapshot name.
  - `server_side_encryption`, `compress`, `chunk_size`: (Optional) Settings
    for encryption, compression, and file chunking.

## Register the snapshot repository

To begin the restoration process, register the snapshot repository with your
Aiven for OpenSearch service. This step involves configuring your service to recognize
and access the storage location where your OpenSearch or Elasticsearch snapshots are
stored.

### Google Cloud Storage (GCS)

Register a snapshot repository on GCS.

<Tabs groupId="method">
<TabItem value="api" label="API" default>

```bash
curl -X PUT "https://SERVICE_NAME.aivencloud.com/_snapshot/my-snapshot-repo" \
-H "Authorization: Bearer API_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "type": "gcs",
  "settings": {
    "bucket": "my-gcs-bucket",
    "base_path": "snapshots/",
    "credentials": "GCS_CREDENTIALS_FILE_CONTENT"
  }
}'
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service update \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  -c gcs_migration.bucket="my-gcs-bucket" \
  -c gcs_migration.base_path="snapshots/" \
  -c gcs_migration.credentials="GCS_CREDENTIALS_FILE_CONTENT" \
  -c gcs_migration.snapshot_name="SNAPSHOT_NAME"

```

</TabItem>
</Tabs>

### Amazon S3

Register a snapshot repository on Amazon S3.

<Tabs groupId="method">
<TabItem value="api" label="API" default>

```bash
curl -X PUT "https://SERVICE_NAME.aivencloud.com/_snapshot/my-snapshot-repo" \
-H "Authorization: Bearer API_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "type": "s3",
  "settings": {
    "bucket": "my-bucket",
    "region": "us-west-2"
  }
}'
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service update \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  -c s3_migration.bucket="my-bucket" \
  -c s3_migration.region="us-west-2" \
  -c s3_migration.base_path="snapshots/" \
  -c s3_migration.access_key="your-access-key" \
  -c s3_migration.secret_key="your-secret-key" \
  -c s3_migration.snapshot_name="SNAPSHOT_NAME"

```

</TabItem>
</Tabs>

### Microsoft Azure

Register a snapshot repository on Microsoft Azure.

<Tabs groupId="method">
<TabItem value="api" label="API" default>

```bash
curl -X PUT "https://SERVICE_NAME.aivencloud.com/_snapshot/my-snapshot-repo" \
-H "Authorization: Bearer API_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "type": "azure",
  "settings": {
    "container": "my-container",
    "base_path": "snapshots/",
    "account": "my-account",
    "key": "your-key"
  }
}'
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service update \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  -c azure_migration.container="my-container" \
  -c azure_migration.base_path="snapshots/" \
  -c azure_migration.account="my-account" \
  -c azure_migration.key="your-key" \
  -c azure_migration.snapshot_name="SNAPSHOT_NAME"

```

</TabItem>
</Tabs>

### S3-compatible services

Register a snapshot repository on an S3-compatible service.

<Tabs groupId="method">
<TabItem value="api" label="API" default>

```bash
curl -X PUT "https://SERVICE_NAME.aivencloud.com/_snapshot/my-snapshot-repo" \
-H "Authorization: Bearer API_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "type": "s3",
  "settings": {
    "bucket": "my-bucket",
    "region": "us-west-2",
    "endpoint": "https://my-s3-compatible-service.com",
    "access_key": "your-access-key",
    "secret_key": "your-secret-key"
  }
}'
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service update \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  -c s3_migration.bucket="my-bucket" \
  -c s3_migration.region="us-west-2" \
  -c s3_migration.endpoint="https://my-s3-compatible-service.com" \
  -c s3_migration.access_key="your-access-key" \
  -c s3_migration.secret_key="your-secret-key" \
  -c s3_migration.base_path="snapshots/" \
  -c s3_migration.snapshot_name="SNAPSHOT_NAME"
```

</TabItem>
</Tabs>

## Restore the snapshot

After registering the snapshot repository, restore the snapshot to your Aiven for
OpenSearch service. This process migrates the data from the repository into your
Aiven for OpenSearch cluster.

<Tabs groupId="restore-snapshot">
<TabItem value="api" label="API" default>

```bash
curl -X POST "https://SERVICE_NAME.aivencloud.com/_snapshot/my-snapshot-repo/SNAPSHOT_NAME/_restore" \
-H "Authorization: Bearer API_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "indices": "INDEX_NAME",
  "ignore_unavailable": true,
  "include_global_state": false
}'
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service elasticsearch-restore-snapshot \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  --repository my-snapshot-repo \
  --snapshot SNAPSHOT_NAME \
  --indices INDEX_NAME

```

</TabItem>
</Tabs>

## Monitor the restoration process

Monitor the progress of the snapshot restoration to ensure that everything is
proceeding as expected.

<Tabs groupId="monitor-restoration">
<TabItem value="api" label="API" default>


```bash
curl -X GET "https://SERVICE_NAME.aivencloud.com/_snapshot/my-snapshot-repo/SNAPSHOT_NAME/_status" \
-H "Authorization: Bearer API_TOKEN"
```

</TabItem>
<TabItem value="cli" label="CLI">


```bash
avn service elasticsearch-check-restore-status \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  --repository my-snapshot-repo \
  --snapshot SNAPSHOT_NAME
```

</TabItem>
</Tabs>

## Verify the restoration

Ensure your data has been restored successfully by listing the indices.

<Tabs groupId="verify-restoration">
<TabItem value="api" label="API" default>

```bash
curl -X GET "https://SERVICE_NAME.aivencloud.com/_cat/indices?v" \
  -H "Authorization: Bearer API_TOKEN"
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service elasticsearch-list-indices \
  --project PROJECT_NAME \
  --service SERVICE_NAME
```

</TabItem>
</Tabs>

## Complete the restoration

After the restoration process is complete, clean up resources by deleting the snapshot
repository.

<Tabs groupId="finalize-migration">
<TabItem value="api" label="API" default>

```bash
curl -X DELETE "https://SERVICE_NAME.aivencloud.com/_snapshot/my-snapshot-repo" \
  -H "Authorization: Bearer API_TOKEN"
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service elasticsearch-delete-repository \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  --repository my-snapshot-repo
```

</TabItem>
</Tabs>

## Backup management during migration

**Automatic pausing of backups**: During the migration process, Aiven for OpenSearch
automatically pauses regular backups to prevent any potential conflicts with the
migration.
**Automatic resumption of backups**: After the migration is complete, Aiven for
OpenSearch automatically resumes regular backup operations.

## Error handling

- **Validation errors**: Ensure that inputs like `snapshot_name`, `base_path`, and URLs
  are properly formatted.
- **Common issues**: Address common errors such as missing credentials, incorrect paths,
  or unsupported snapshot versions.

## Related pages

- [Aiven for OpenSearch documentation](/docs/products/opensearch)
- [Elasticsearch snapshot and restore guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html)
