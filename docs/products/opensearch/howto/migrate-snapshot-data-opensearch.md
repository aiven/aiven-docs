---
title: Migrate data to Aiven for OpenSearch® using snapshots
sidebar_label: Migrate snapshot data
limited: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven for OpenSearch lets you to restore data from external OpenSearch or Elasticsearch snapshots, enabling migration from third-party repositories.

## Supported cloud providers

Aiven for OpenSearch supports restoring snapshots from the following cloud providers:

- Google Cloud Storage (GCS)
- Amazon S3
- Microsoft Azure
- S3-compatible services, such as Oracle Cloud Infrastructure (OCI) or any other
  S3-compatible repository

## Prerequisites

Before you begin, ensure that:

- You have an active Aiven account with a configured project.
- A target Aiven for OpenSearch service within your project.
- Your OpenSearch or Elasticsearch snapshot is from version 7.10.2 or earlier, or
  from OpenSearch 1.x/2.x, and it is not newer than the target service version.
- Optional: To verify the compatibility of your snapshot for migration, run
  the `pre_snapshot_checks.py` script from the
  [Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/blob/main/solutions/validate-elasticsearch-to-opensearch-migration/pre_snapshot_checks.py).

:::note
When creating the snapshot, set `include_global_state: true` to include the global
state, which contains important metadata like aliases and templates. If the snapshot
does not include the global state, setting `include_global_state: true` during migration
will not work. For more details, see
[Reapply ISM policies after snapshot restore](/docs/products/opensearch/howto/migrate-ism-policies.md).
:::

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
    indices. If no patterns are provided, all indices are restored by default. Exclude
    the `.opendistro_security` index pattern from your snapshot restore process

- **Google Cloud Storage (GCS)**

  - `credentials`: GCS credentials file content
  - `bucket`: Name of the GCS bucket that contains the snapshot
  - `base_path`: Path to repository data within the bucket
  - `snapshot_name`: Name of the snapshot to restore.
  - `compress` and `chunk_size`: Optional. Settings for metadata compression
    and file chunking
  - `indices`: Optional. A comma-separated list of index patterns to restore specific
    indices. If no patterns are provided, all indices are restored by default. Exclude
    the `.opendistro_security` index pattern from your snapshot restore process

- **Microsoft Azure**

  - `account`: Azure account name
  - `key` or `sas_token`: Azure secret key or shared access signature token
  - `container`: Name of the Azure container that contains the snapshot
  - `base_path`: Path to repository data within the container
  - `snapshot_name`: Name of the snapshot to restore
  - `compress`, `chunk_size`, `endpoint_suffix`: Optional. Additional configuration
    settings
  - `indices`: Optional. Comma-separated list of index patterns to restore specific
    indices. If no patterns are provided, all indices are restored by default. Exclude
    the `.opendistro_security` index pattern from your snapshot restore process

- **S3-compatible services**

  - `endpoint`: Service endpoint for S3-compatible services
  - `access_key`: Access key for the S3-compatible service
  - `secret_key`: Secret key for the S3-compatible service
  - `region`: Region or endpoint-specific region
  - `bucket`, `base_path`, `snapshot_name`: Bucket details and snapshot name
  - `server_side_encryption`, `compress`, `chunk_size`: Optional. Settings
    for encryption, compression, and file chunking
  - `indices`: Optional. Comma-separated list of index patterns to restore specific
    indices. If no patterns are provided, all indices are restored by default. Exclude
    the `.opendistro_security` index pattern from your snapshot restore process

### Optional: Collect data for migration validation {#collect-data-for-migration-validation}

You can collect and compare data from the source and target services to verify the
migration's accuracy. This step is optional but recommended to ensure the migration
was successful.

1. Collect data from the source service: Before migrating the data, collect data from
   the source service and save it in a JSON file
  (for example, `file1.json`). Use the following script from the
  [Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/blob/main/solutions/validate-elasticsearch-to-opensearch-migration/get_migration_validation_data.py):

   ```bash
   python get_migration_validation_data.py \
   --patterns "YOUR_INDEX_PATTERNS" \
   --waitsec 30 \
   --outfile file1.json \
   --es_host https://YOUR_SOURCE_ES_HOST
   ```

1. Collect data from the target service after migration: After the migration is
   complete, collect data from the target Aiven for OpenSearch service and save it in
   a separate JSON file (for example, `file2.json`) using the same script:

   ```bash
   python get_migration_validation_data.py \
   --patterns "YOUR_INDEX_PATTERNS" \
   --waitsec 30 --outfile file2.json \
   --es_host https://YOUR_AIVEN_OPENSEARCH_HOST
   ```

1. Compare data from the source and target services: After retrieving data from
   both the source and target services, use the `compare_migration_validation_data.py`
   script from the [Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/blob/main/solutions/validate-elasticsearch-to-opensearch-migration/compare_migration_validation_data.py)
   to compare the two JSON files:

   ```bash
   python compare_migration_validation_data.py file1.json file2.json
   ```

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
Aiven for OpenSearch allows only one migration at a time. After data migration completes,
the backup process starts automatically. You cannot begin a new migration until
the backup process finishes.

You can either wait for the backup to finish or contact
[Aiven Support](mailto:support@aiven.io) to disable backups and start a new migration.
:::

### Amazon S3

<Tabs groupId="method">
<TabItem value="api" label="Aiven API" default>

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/{project_name}/service/{service_name} \
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
<TabItem value="cli" label="Aiven CLI">

```bash
avn service update \
  --project PROJECT_NAME \
  SERVICE_NAME \
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
<TabItem value="api" label="Aiven API" default>

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/{project_name}/service/{service_name} \
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
<TabItem value="cli" label="Aiven CLI">

```bash
avn service update \
  --project PROJECT_NAME \
  SERVICE_NAME \
  -c gcs_migration.bucket="my-gcs-bucket" \
  -c gcs_migration.base_path="snapshots" \
  -c gcs_migration.credentials="GCS_CREDENTIALS_FILE_CONTENT" \
  -c gcs_migration.snapshot_name="SNAPSHOT_NAME"
```

</TabItem>
</Tabs>

### Microsoft Azure

<Tabs groupId="method">
<TabItem value="api" label="Aiven API" default>

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/{project_name}/service/{service_name} \
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
<TabItem value="cli" label="Aiven CLI">

```bash
avn service update \
  --project PROJECT_NAME \
  SERVICE_NAME \
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
<TabItem value="api" label="Aiven API" default>

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/{project_name}/service/{service_name} \
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
<TabItem value="cli" label="Aiven CLI">

```bash
avn service update \
  --project PROJECT_NAME \
  SERVICE_NAME \
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

:::note
The restore call’s return value may be large and contain details that are not
immediately relevant. You can ignore it unless troubleshooting specific issues.
:::

## Monitor the migration

Check migration status using this API request:

```bash
curl -X GET "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/migration" \
  -H "Authorization: Bearer API_TOKEN" | jq
```

Parameters:

- `PROJECT_NAME`: The name of your Aiven project.
- `SERVICE_NAME`: The name of your Aiven for OpenSearch service.

Use `jq` to format the JSON output for easier readability. If `jq` is not installed,
follow the [installation guide](https://stedolan.github.io/jq/download/).

:::note

- The initial migration status might not be immediately available. If you receive a
  404 response, this indicates a delay, not a failure. Try again later to retrieve
  the status.
- During the snapshot restore process, indices are temporarily closed and are not
  displayed in the user interface. Once the restore is complete, they are reopened.

:::

## Verify the migration

Ensure that your data has been restored successfully by listing the indices and checking
the document count for your migrated data.

If you have followed
[collect data for migration validation](#collect-data-for-migration-validation), you
can compare data from both the source and target services as part of the
verification process.

### Script-based validation

To verify migration results, run the `compare_migration_validation_data.py` script
from [Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/blob/main/solutions/validate-elasticsearch-to-opensearch-migration/compare_migration_validation_data.py)
to compare indices, document counts, aliases, and ISM policies between two datasets.

```bash
python compare_migration_validation_data.py file1.json file2.json
```

### Command-based validation

To verify indices in your Aiven for OpenSearch service, run the following command,
replacing `SERVICE_URL` with your service's URL:

```bash
curl $SERVICE_URL/_cat/indices?v&expand_wildcards=all
```

To view all aliases for your indices, run:

```bash
curl $SERVICE_URL/_cat/aliases?v&expand_wildcards=all
```

Compare the outputs from the source and target services to ensure that document
counts and aliases match after the migration.

## Complete the migration

After the restoration process is complete, Aiven for OpenSearch automatically deletes
the snapshot repository used during the migration to clean up resources.

### Reapply ISM policies and security configurations

After restoring your data:

- **Reapply ISM policies**: Reapply any Index State Management (ISM) policies to the
  restored indices. For more information, see
  [Reapply ISM policies after snapshot restore](/docs/products/opensearch/howto/migrate-ism-policies).

- **Update security configurations**: Review and reconfigure any security settings,
  including OpenDistro security configurations. For more details, see
  [Migration Opendistro security configuration](/docs/products/opensearch/howto/migrate-opendistro-security-config-aiven).

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

- [Aiven for OpenSearch documentation](/docs/products/opensearch)
- [Elasticsearch snapshot and restore guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html)
