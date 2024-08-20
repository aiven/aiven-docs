---
title: Snapshot restoration in Aiven for OpenSearch®
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven for OpenSearch enables you to restore data from external OpenSearch or Elasticsearch snapshots, allowing seamless migration from third-party repositories directly into your OpenSearch clusters.

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

### Gather the required parameters

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
  - `authentication_method`: `key` (Azure secret key) or `sas_token` (shared access
    signature token).
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

## Step 1: Register the snapshot repository

After collecting the necessary parameters, set up the snapshot repository within your
Aiven for OpenSearch service.

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
avn service elasticsearch-register-repository \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  --repository my-snapshot-repo \
  --repository-type gcs \
  --bucket my-gcs-bucket \
  --base-path snapshots/ \
  --credentials GCS_CREDENTIALS_FILE_CONTENT
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
avn service elasticsearch-register-repository \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  --repository my-snapshot-repo \
  --repository-type s3 \
  --bucket my-bucket \
  --region us-west-2
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
avn service elasticsearch-register-repository \
  --project PROJECT_NAME \
  --service SERVICE NAME \
  --repository my-snapshot-repo \
  --repository-type azure \
  --container my-container \
  --account my-account \
  --key YOUR_SECRET_KEY
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
avn service elasticsearch-register-repository \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  --repository my-snapshot-repo \
  --repository-type s3 \
  --bucket my-bucket \
  --region us-west-2 \
  --endpoint https://my-s3-compatible-service.com \
  --access-key your-access-key \
  --secret-key your-secret-key
```

</TabItem>
</Tabs>

## Step 2: Restore the snapshot

After registering the snapshot repository, restore the snapshot to your Aiven for OpenSearch service.

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

## Step 3: Monitor the restoration

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

## Step 4: Verify the restoration

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

## Step 5: Complete the restoration

Finalize the restoration process and clean up resources.

<Tabs groupId="finalize-migration">
<TabItem value="api" label="API" default>

1. Finalize the migration:

   ```bash
   curl -X POST "https://SERVICE_NAME.aivencloud.com/_snapshot/my-snapshot-repo/SNAPSHOT_NAME/_finalize" \
     -H "Authorization: Bearer API_TOKEN"
   ```

1. Delete the snapshot repository:

   ```bash
   curl -X DELETE "https://SERVICE_NAME.aivencloud.com/_snapshot/my-snapshot-repo" \
     -H "Authorization: Bearer API_TOKEN"
   ```

</TabItem>
<TabItem value="cli" label="CLI">

1. Finalize the migration:

   ```bash
   avn service elasticsearch-complete-migration \
     --project PROJECT_NAME \
     --service SERVICE_NAME \
     --repository my-snapshot-repo \
     --snapshot SNAPSHOT_NAME
   ```

1. Delete the snapshot repository:

   ```bash
   avn service elasticsearch-delete-repository \
     --project PROJECT_NAME \
     --service SERVICE_NAME \
     --repository my-snapshot-repo
   ```

</TabItem>
</Tabs>

## Error handling

- **Validation errors**: Ensure that inputs like `snapshot_name`, `base_path`, and URLs
  are properly formatted. Refer to the API documentation for detailed validation rules.
- **Common issues**: Address common errors such as missing credentials, incorrect paths,
  or unsupported snapshot versions.

## Related pages

- [Aiven for OpenSearch documentation](/docs/products/opensearch)
- [Elasticsearch snapshot and restore guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html)
