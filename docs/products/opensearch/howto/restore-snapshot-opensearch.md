---
title: Snapshot restoration in Aiven for OpenSearch®
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Restore snapshots from third-party repositories into your Aiven for OpenSearch service.

Aiven supports snapshot restoration from Google Cloud Storage (GCS), Amazon S3, and
Microsoft Azure. Additionally, you can restore from Oracle Cloud Infrastructure (OCI) or
other S3-compatible repositories using the S3 repository type.

## Prerequisites

Before starting the restoration process, ensure you have the following:

- An Aiven account with a configured project.
- A target Aiven for OpenSearch service set up within your project.
- A snapshot that is compatible with your target service (only snapshots from
  Elasticsearch 7.10.2 or below are supported).
- The feature flag enabled for your project, allowing external
  migrations to be configured and executed.
- Access credentials for the cloud provider hosting the snapshot.

### Gather required parameters

For each cloud provider, ensure you have the following information:

- **Google Cloud Storage (GCS)**:
  - `credentials`: GCS credentials file content.
  - `bucket`: GCS bucket name where the snapshot is stored.
  - `base_path`: Path to repository data within the bucket.
  - `snapshot_name`: Name of the snapshot to restore from.
  - `compress`: (Optional) Whether to store metadata files in compressed format.
  - `chunk_size`: (Optional) Size of chunks for large files during snapshot creation.

- **Amazon S3 and S3-compatible services**:
  - `region`: AWS/OCI region.
  - `bucket`: S3/OCI bucket name where the snapshot is stored.
  - `base_path`: Path to repository data within the bucket.
  - `snapshot_name`: Name of the snapshot to restore from.
  - `endpoint`: (Optional) The service endpoint for S3-compatible services.
  - `server_side_encryption`: (Optional) Whether to enable server-side encryption.
  - `compress`: (Optional) Whether to store metadata files in compressed format.
  - `chunk_size`: (Optional) Size of chunks for large files during snapshot creation.

- **Microsoft Azure**:
  - `container`: Azure container name where the snapshot is stored.
  - `base_path`: Path to repository data within the container.
  - `snapshot_name`: Name of the snapshot to restore from.
  - `compress`: (Optional) Whether to store metadata files in compressed format.
  - `chunk_size`: (Optional) Size of chunks for large files during snapshot creation.

## Register the snapshot repository

Configure Aiven for OpenSearch to identify and access the location where your
snapshot is stored.

### Amazon S3 and S3-compatible services

For Amazon S3 or any S3-compatible service, use one of the following methods to
register the snapshot repository.

<Tabs groupId="config-methods">
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
    "endpoint": "https://s3.amazonaws.com"
  }
}'
```

**Parameters:**

- `SERVICE_NAME`: The name of your Aiven OpenSearch service.
- `API_TOKEN`: The [API token for authentication](/docs/platform/howto/create_authentication_token).
- `bucket`: The S3 bucket name where the snapshot is stored.
- `region`: The AWS region where the bucket is located.
- `endpoint`: (Optional) The service endpoint for S3-compatible services.

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
  --endpoint https://s3.amazonaws.com
```

**Parameters:**

- `PROJECT_NAME`: The name of your Aiven project.
- `SERVICE_NAME`: The name of your Aiven for OpenSearch service.
- `repository`: The name of the snapshot repository.
- `repository-type`: The repository type, set to `s3` for Amazon S3 and
  S3-compatible services.
- `bucket`: The S3 bucket name where the snapshot is stored.
- `region`: The AWS region where the bucket is located.
- `endpoint`: (Optional) The service endpoint for S3-compatible services.

</TabItem>
</Tabs>

### Google Cloud Storage (GCS)

For Google Cloud Storage (GCS), use one of the following methods to register the
snapshot repository

<Tabs groupId="config-methods">
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

**Parameters:**

- `SERVICE_NAME`: The name of your Aiven OpenSearch service.
- `API_TOKEN`: The [API token for authentication](/docs/platform/howto/create_authentication_token).
- `bucket`: The GCS bucket name where the snapshot is stored.
- `base_path`: The path within the bucket where the snapshot is stored.
- `credentials`: The GCS credentials file content.

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

**Parameters:**

- `PROJECT_NAME`: The name of your Aiven project.
- `SERVICE_NAME`: The name of your Aiven OpenSearch service.
- `repository`: The name of the snapshot repository.
- `repository-type`:The repository type, set to `gcs` for Google Cloud Storage.
- `bucket`: The GCS bucket name where the snapshot is stored.
- `base_path`: The path within the bucket where the snapshot is stored.
- `credentials`: The GCS credentials file content.

</TabItem>
</Tabs>

### Microsoft Azure

For Microsoft Azure, use one of the following methods to register the snapshot repository.

<Tabs groupId="config-methods">
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
    "endpoint_suffix": "AZURE_ENDPOINT_SUFFIX"
  }
}'
```

**Parameters:**

- `SERVICE_NAME`: The name of your Aiven OpenSearch service.
- `API_TOKEN`: The [API token for authentication](/docs/platform/howto/create_authentication_token).
- `container`: The Azure container name where the snapshot is stored.
- `base_path`: The path within the container where the snapshot is stored.


</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service elasticsearch-register-repository \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  --repository my-snapshot-repo \
  --repository-type azure \
  --container my-container \
  --base-path snapshots/ \
  --endpoint-suffix AZURE_ENDPOINT_SUFFIX
```

**Parameters:**

- `PROJECT_NAME`: The name of your Aiven project.
- `SERVICE_NAME`: The name of your Aiven OpenSearch service.
- `repository`: The name of the snapshot repository.
- `repository-type`: The repository type, set to `azure` for Microsoft Azure.
- `container`: The Azure container name where the snapshot is stored.
- `base_path`: The path within the container where the snapshot is stored.


</TabItem>
</Tabs>

## Verify the restoration

Check that the data has been successfully restored and is ready to use.

### Verify indices

<Tabs groupId="config-methods">
<TabItem value="api" label="API" default>

```bash
curl -X GET "https://SERVICE_NAME.aivencloud.com/_cat/indices?v" \
-H "Authorization: Bearer API_TOKEN"
```

**Parameters:**

- `SERVICE_NAME`: The name of your Aiven OpenSearch service.
- `API_TOKEN`: The [API token for authentication](/docs/platform/howto/create_authentication_token).

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service elasticsearch-list-indices \
  --project PROJECT_NAME \
  --service SERVICE_NAME
```

**Parameters:**

- `PROJECT_NAME`: The name of your Aiven project.
- `SERVICE_NAME`: The name of your Aiven OpenSearch service.

</TabItem>
</Tabs>

## Post-restoration steps

After a successful restoration:

1. **Update client configurations**: Point your applications to the new
   Aiven for OpenSearch service.
1. **Adjust service settings**: Scale your OpenSearch service or optimize settings
   based on your workload needs.

## Related pages

- [Aiven for OpenSearch documentation](https://docs.aiven.io/docs/products/opensearch.html)
- [Elasticsearch snapshot and restore](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html)
