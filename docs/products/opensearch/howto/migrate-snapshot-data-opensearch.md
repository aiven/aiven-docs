---
title: Migrate data to Aiven for OpenSearch® using snapshots
sidebar_label: Migrate snapshot data
limited: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven for OpenSearch enables you to restore data from external OpenSearch or Elasticsearch snapshots, enabling seamless migration from third-party repositories.

Aiven supports snapshot restoration from Google Cloud Storage (GCS), Amazon S3, and
Microsoft Azure. Additionally, you can restore data from Oracle Cloud Infrastructure
(OCI) or other S3-compatible repositories using the S3 repository type.

## Supported cloud providers

Aiven for OpenSearch supports restoring snapshots from the following cloud providers:

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

### Gather required parameters

Gather these details before registering the snapshot repository:

- `API_TOKEN`: Your [Aiven token](/docs/platform/concepts/authentication-tokens)
- `PROJECT_NAME`: Name of your Aiven project
- `SERVICE_NAME`: Name of your Aiven for OpenSearch service

Information specific to cloud providers:

- **Amazon S3**

  - `snapshot_name`: The name of the snapshot to restore
  - `base_path`: The path within the S3 bucket where the snapshot data is stored
  - `bucket`: The S3 bucket name
  - `region`: The AWS region of the S3 bucket
  - `access_key`: AWS access key for accessing the S3 bucket
  - `secret_key`: AWS secret key associated with the access key
  - `server_side_encryption`: Optional. Enable server-side encryption for files in the
    S3 bucket
  - `endpoint`: Optional. The endpoint for S3-compatible services if not using AWS S3
    directly
  - `indices`: Optional. Comma-separated list of index patterns to restore specific
    indices. If no patterns are provided, all indices are restored by default

- **Google Cloud Storage (GCS)**

  - `credentials`: GCS credentials file content
  - `bucket`: Name of the GCS bucket that contains the snapshot
  - `base_path`: Path to repository data within the bucket
  - `snapshot_name`: Name of the snapshot to restore.
  - `compress` and `chunk_size`: Optional. Settings for metadata compression
    and file chunking
  - `indices`: Optional. A comma-separated list of index patterns to restore specific
    indices. If no patterns are provided, all indices are restored by default

- **Microsoft Azure**

  - `account`: Azure account name
  - `key` or `sas_token`: Azure secret key or shared access signature token
  - `container`: Name of the Azure container that contains the snapshot
  - `base_path`: Path to repository data within the container
  - `snapshot_name`: Name of the snapshot to restore
  - `compress`, `chunk_size`, `endpoint_suffix`: Optional. Additional configuration
    settings
  - `indices`: Optional. Comma-separated list of index patterns to restore specific
    indices. If no patterns are provided, all indices are restored by default

- **S3-compatible services**

  - `endpoint`: Service endpoint for S3-compatible services
  - `access_key`: Access key for the S3-compatible service
  - `secret_key`**: Secret key for the S3-compatible service
  - `region`: Region or endpoint-specific region
  - `bucket`, `base_path`, `snapshot_name`: Bucket details and snapshot name
  - `server_side_encryption`, `compress`, `chunk_size`: Optional. Settings
    for encryption, compression, and file chunking
  - `indices`: Optional. Comma-separated list of index patterns to restore specific
    indices. If no patterns are provided, all indices are restored by default

## Configure snapshot migration settings

To start the migration, configure the `user-config` object in your
Aiven for OpenSearch service. The migration starts automatically once these settings are
applied.

To restore specific indices from the snapshot, specify index patterns in the `indices`
field within the `user-config` object during configuration. If no index patterns are
provided, Aiven restores all indices by default. For example, to restore indices starting
with `logs-` and `metrics-`, use: `indices: "logs-*,metrics-*"`.

:::note
Exclude the `.opendistro_security` index pattern from your snapshot restore process.
:::

:::warning
Aiven for OpenSearch only allows one migration to progress at a time. Ensure the current
migration finishes before starting a new one to avoid interruptions.
:::

### Amazon S3

<Tabs groupId="method">
<TabItem value="api" label="API" default>

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/{project_name}/service/{service_name}/config \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "s3_migration": {
        "bucket": "my-s3-bucket",
        "region": "us-west-2",
        "access_key": "YOUR_ACCESS_KEY",
        "secret_key": "YOUR_SECRET_KEY",
        "snapshot_name": "my-snapshot",
        "base_path": "snapshots"
      }
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
  -c s3_migration.base_path="snapshots" \
  -c s3_migration.access_key="your-access-key" \
  -c s3_migration.secret_key="your-secret-key" \
  -c s3_migration.snapshot_name="SNAPSHOT_NAME"
```

</TabItem>
</Tabs>

### Google Cloud Storage (GCS)

<Tabs groupId="method">
<TabItem value="api" label="API" default>

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/{project_name}/service/{service_name}/config \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "gcs_migration": {
        "bucket": "my-gcs-bucket",
        "credentials": "GCS_CREDENTIALS_FILE_CONTENT",
        "snapshot_name": "my-snapshot",
        "base_path": "snapshots"
      }
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
  -c gcs_migration.base_path="snapshots" \
  -c gcs_migration.credentials="GCS_CREDENTIALS_FILE_CONTENT" \
  -c gcs_migration.snapshot_name="SNAPSHOT_NAME"
```

</TabItem>
</Tabs>

### Microsoft Azure

<Tabs groupId="method">
<TabItem value="api" label="API" default>

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/{project_name}/service/{service_name}/config \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "azure_migration": {
        "container": "my-azure-container",
        "account": "my-azure-account",
        "key": "YOUR_AZURE_KEY",
        "snapshot_name": "my-snapshot",
        "base_path": "snapshots"
      }
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
  -c azure_migration.base_path="snapshots" \
  -c azure_migration.account="my-account" \
  -c azure_migration.key="your-key" \
  -c azure_migration.snapshot_name="SNAPSHOT_NAME"
```

</TabItem>
</Tabs>

### S3-Compatible Services

<Tabs groupId="method">
<TabItem value="api" label="API" default>

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/{project_name}/service/{service_name}/config \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "s3_migration": {
        "bucket": "my-s3-compatible-bucket",
        "region": "us-west-2",
        "endpoint": "https://my-s3-compatible-service.com",
        "access_key": "YOUR_ACCESS_KEY",
        "secret_key": "YOUR_SECRET_KEY",
        "snapshot_name": "my-snapshot",
        "base_path": "snapshots"
      }
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
  -c s3_migration.base_path="snapshots" \
  -c s3_migration.snapshot_name="SNAPSHOT_NAME"
```

</TabItem>
</Tabs>

## Monitor the migration

Check migration status using this API request:

```bash
curl -X GET "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/migration" \
  -H "Authorization: Bearer API_TOKEN"
```

Parameters:

- `project_name`: The name of your Aiven project.
- `service_name`: The name of your Aiven for OpenSearch service.

## Verify the migration

Ensure that your data has been restored successfully by listing the indices and checking
the document count for your migrated data.

To view all indices in your Aiven for OpenSearch service, run the following command,
replacing `SERVICE_URL` with your service's URL:

```bash
curl $SERVICE_URL/_cat/indices?v&expand_wildcards=all
```

This command retrieves detailed information about all indices, including the number of
documents, shards, and index size. For example:

| Status | Index Name                           | UUID                                | Shards | Replicas | Documents | Deleted Docs | Size   | Primary Size |
|--------|--------------------------------------|-------------------------------------|--------|----------|-----------|--------------|--------|--------------|
| Green  | clustermember_correlation_v1-002573  | OLj34vDHTX-rIXCz3s8W7A              | 4      | 1        | 57        | 4            | 5.7mb  | 2.8mb        |
| Green  | clustermember_correlation_v1-002574  | j7obT9rXS-C0LJOuyulCfA              | 4      | 1        | 1         | 0            | 240.7kb| 120.3kb      |
| Green  | clustermember_correlation_v1-002575  | KG7lWPK2SrOMgMuJYUscyg              | 4      | 1        | 447       | 56           | 24.7mb | 12.3mb       |

To list all aliases for your indices, run the following command:

```bash
curl $SERVICE_URL/_cat/aliases?v&expand_wildcards=all
```

Compare the outputs from both the source and target services to ensure that document
counts and aliases match after the migration.

## Complete the migration

After the restoration process is complete, Aiven for OpenSearch automatically deletes
the snapshot repository used during the migration to clean up resources.

## Backup management during migration

**Automatic pausing of backups**: During the migration process, Aiven for OpenSearch
automatically pauses regular backups to prevent any potential conflicts with the
migration.

**Automatic resumption of backups**: After the migration is complete, Aiven for
OpenSearch automatically resumes regular backup operations.

## Error handling

During the migration process, you can encounter issues such as:

- **Validation errors**: Ensure inputs like `snapshot_name`, `base_path`, and URLs
  are properly formatted.
- **Common issues**: Address common errors such as missing credentials, incorrect paths,
  or unsupported snapshot versions.

## Related pages

- [Migration Opendistro security configuration](/docs/products/opensearch/howto/migrate-opendistro-security-config-aiven)
- [Aiven for OpenSearch documentation](/docs/products/opensearch)
- [Elasticsearch snapshot and restore guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html)
