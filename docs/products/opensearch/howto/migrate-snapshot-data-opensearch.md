---
title: Migrate data to Aiven for OpenSearch® using snapshots
sidebar_label: Migrate snapshot data
limited: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons"
import RelatedPages from "@site/src/components/non-swizzled/RelatedPages";

Aiven for OpenSearch lets you restore data from external OpenSearch or Elasticsearch snapshots, enabling migration from third-party repositories.

## Supported cloud providers

Aiven for OpenSearch supports snapshot restoration from these providers:

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
- Optional: Verify snapshot compatibility using the `pre_snapshot_checks.py` script from
  the
  [Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/blob/main/solutions/validate-elasticsearch-to-opensearch-migration/pre_snapshot_checks.py).

:::note

When creating a snapshot, configure these options:

- `restore_global_state`: Set to `true` to restore the cluster state, which includes
  important metadata like aliases and templates. Default is `false`. If the snapshot
  does not include the global state, setting this option to `true` has no effect.

- `include_aliases`: Set to `true` to restore aliases and their indices. Default is
  `true`.

For more details, see
[Reapply ISM policies after snapshot restore](/docs/products/opensearch/howto/migrate-ism-policies.md).
:::

### Optional: Validate migration data {#collect-data-for-migration-validation}

To ensure data consistency after migration, you can collect and compare data from the
source and target services. While optional, this step helps confirm that all expected
data has been restored successfully.

1. **Collect source service data**: Before migration, collect data from
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

1. **Collect target service data**: After migration, collect
   data from the target Aiven for OpenSearch service and save it in
   a separate JSON file (for example, `file2.json`) using the same script:

   ```bash
   python get_migration_validation_data.py \
   --patterns "YOUR_INDEX_PATTERNS" \
   --waitsec 30 --outfile file2.json \
   --es_host https://YOUR_AIVEN_OPENSEARCH_HOST
   ```

1. **Compare data**: Use the `compare_migration_validation_data.py`
   script from the [Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/blob/main/solutions/validate-elasticsearch-to-opensearch-migration/compare_migration_validation_data.py)
   to compare the two JSON files:

   ```bash
   python compare_migration_validation_data.py file1.json file2.json
   ```

### Gather required parameters {#gather-required-parameters}

Before registering the snapshot repository, collect the following details:

- `API_TOKEN`: Your [Aiven token](/docs/platform/concepts/authentication-tokens).
- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven for OpenSearch service.

Cloud provider-specific information:

- **Amazon S3**

  - `snapshot_name`: The name of the snapshot to restore.
  - `base_path`: The path within the S3 bucket where the snapshot data is stored
  - `bucket`: The S3 bucket name.
  - `region`: The AWS region of the S3 bucket.
  - `access_key`: AWS access key for accessing the S3 bucket.
  - `secret_key`: AWS secret key associated with the access key.
  - `server_side_encryption`: Optional. Enable server-side encryption for files in the
    S3 bucket.
  - `endpoint`: Optional. The endpoint for S3-compatible services if not using AWS S3
    directly
  - `indices`: Optional. Comma-separated list of index patterns to restore specific
    indices.
    - If no index pattern is provided and a previous restore request was made, the
      index pattern from the previous request is reused.
    - If no previous restore request exists, all indices are restored by default.
    - Exclude the `.opendistro_security` index pattern from your snapshot restore.
  - `restore_global_state`: Optional. If true, restores the cluster state. Defaults to
    false.
  - `include_aliases`: Optional. Whether to restore aliases alongside their associated
    indices. Defaults to true.

- **Google Cloud Storage (GCS)**

  - `credentials`: GCS credentials file content.
  - `bucket`: Name of the GCS bucket that contains the snapshot.
  - `base_path`: Path to repository data within the bucket.
  - `snapshot_name`: Name of the snapshot to restore.
  - `compress` and `chunk_size`: Optional. Settings for metadata compression
    and file chunking.
  - `indices`: Optional. Comma-separated list of index patterns to restore specific
    indices.
    - If no index pattern is provided and a previous restore request was made, the
      index pattern from the previous request is reused.
    - If no previous restore request exists, all indices are restored by default.
    - Exclude the `.opendistro_security` index pattern from your snapshot restore.
  - `restore_global_state`: Optional. If true, restores the cluster state. Defaults to
    false.
  - `include_aliases`: Optional. Whether to restore aliases alongside their associated
    indices. Defaults to true.

- **Microsoft Azure**

  - `account`: Azure account name.
  - `key` or `sas_token`: Azure secret key or shared access signature token.
  - `container`: Name of the Azure container that contains the snapshot.
  - `base_path`: Path to repository data within the container.
  - `snapshot_name`: Name of the snapshot to restore.
  - `compress`, `chunk_size`, `endpoint_suffix`: Optional. Additional configuration
    settings.
  - `indices`: Optional. Comma-separated list of index patterns to restore specific
    indices.
    - If no index pattern is provided and a previous restore request was made, the
      index pattern from the previous request is reused.
    - If no previous restore request exists, all indices are restored by default.
    - Exclude the `.opendistro_security` index pattern from your snapshot restore.
  - `restore_global_state`: Optional. If true, restores the cluster state. Defaults to
    false.
  - `include_aliases`: Optional. Whether to restore aliases alongside their associated
    indices. Defaults to true.

- **S3-compatible services**

  - `endpoint`: Service endpoint for S3-compatible services.
  - `access_key`: Access key for the S3-compatible services.
  - `secret_key`: Secret key for the S3-compatible services.
  - `region`: Region or endpoint-specific region.
  - `bucket`, `base_path`, `snapshot_name`: Bucket details and snapshot name.
  - `server_side_encryption`, `compress`, `chunk_size`: Optional. Settings
    for encryption, compression, and file chunking.
  - `indices`: Optional. Comma-separated list of index patterns to restore specific
    indices.
    - If no index pattern is provided and a previous restore request was made, the
      index pattern from the previous request is reused.
    - If no previous restore request exists, all indices are restored by default.
    - Exclude the `.opendistro_security` index pattern from your snapshot restore.
  - `restore_global_state`: Optional. If true, restores the cluster state. Defaults to
    false.
  - `include_aliases`: Optional. Whether to restore aliases alongside their associated
    indices. Defaults to true.

## Configure snapshot migration settings

Choose one of the following methods to start the migration: Aiven Console, Aiven API, or
Aiven CLI.

:::warning
Aiven for OpenSearch allows only one migration at a time. After migration completes,
backups start automatically, and you cannot start a new migration until the backup
process finishes.

To start a new migration sooner, wait for backups to finish or
[contact Aiven Support](mailto:support@aiven.io) to disable backups.
:::

<Tabs groupId="method">
<TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/) and select
   the **Aiven for OpenSearch** service for your migration.
1. Click <ConsoleLabel name="service settings"/>.
1. Go to **Service management** section, and click
   <ConsoleLabel name="actions"/> > **Migrate snapshot**.
1. In the **Migrate snapshot** wizard, review the prerequisites and click **Get started**.
1. In **Configure settings** step, select your cloud provider and click **Continue**.
1. Enter the required details based on the selected cloud provider. For details,
   see [Gather required parameters](#gather-required-parameters).
1. Once validation is complete, click **Start migration**.

</TabItem>
<TabItem value="api" label="Aiven API">

To start the migration, configure the `user-config` object in your
Aiven for OpenSearch service. The migration starts automatically once these settings are
applied.

Specify index patterns in the `indices` field of the `user-config` object to restore
specific indices from the snapshot. For details, see the
[Collect required parameters](#gather-required-parameters) section.

Configure snapshot migration using the Aiven API for different cloud providers:

#### Amazon S3

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
        "base_path": "snapshots",
        "restore_global_state": false,
        "include_aliases": true

      }
    }
  }'
```

#### Google Cloud Storage (GCS)

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
        "base_path": "snapshots",
        "restore_global_state": false,
        "include_aliases": true
      }
    }
  }'
```

#### Microsoft Azure

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
        "base_path": "snapshots",
        "restore_global_state": false,
        "include_aliases": true
      }
    }
  }'
```

#### S3-Compatible Services

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
        "base_path": "snapshots",
        "restore_global_state": false,
        "include_aliases": true
      }
    }
  }'
```

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To start the migration, configure the `user-config` object in your
Aiven for OpenSearch service. The migration starts automatically once these settings are
applied.

Specify index patterns in the `indices` field of the `user-config` object to restore
specific indices from the snapshot. For details, see the
[Gather required parameters](#gather-required-parameters) section.

Configure snapshot migration using Aiven CLI for different cloud providers:

#### Amazon S3

```bash
avn service update \
  --project PROJECT_NAME \
  SERVICE_NAME \
  -c s3_migration.bucket="my-bucket" \
  -c s3_migration.region="us-west-2" \
  -c s3_migration.base_path="snapshots" \
  -c s3_migration.access_key="your-access-key" \
  -c s3_migration.secret_key="your-secret-key" \
  -c s3_migration.snapshot_name="SNAPSHOT_NAME" \
  -c s3_migration.restore_global_state="false" \
  -c s3_migration.include_aliases="true"

```

#### Google Cloud Storage (GCS)

```bash
avn service update \
  --project PROJECT_NAME \
  SERVICE_NAME \
  -c gcs_migration.bucket="my-gcs-bucket" \
  -c gcs_migration.base_path="snapshots" \
  -c gcs_migration.credentials="GCS_CREDENTIALS_FILE_CONTENT" \
  -c gcs_migration.snapshot_name="SNAPSHOT_NAME" \
  -c s3_migration.restore_global_state="false" \
  -c s3_migration.include_aliases="true"
```

#### Microsoft Azure

```bash
avn service update \
  --project PROJECT_NAME \
  SERVICE_NAME \
  -c azure_migration.container="my-container" \
  -c azure_migration.base_path="snapshots" \
  -c azure_migration.account="my-account" \
  -c azure_migration.key="your-key" \
  -c azure_migration.snapshot_name="SNAPSHOT_NAME" \
  -c s3_migration.restore_global_state="false" \
  -c s3_migration.include_aliases="true"
```

#### S3-Compatible Services

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
  -c s3_migration.snapshot_name="SNAPSHOT_NAME" \
  -c s3_migration.restore_global_state="false" \
  -c s3_migration.include_aliases="true"
```

</TabItem>
</Tabs>

:::note
The restore process may return detailed logs, metadata, and system-generated output. You
can ignore it unless troubleshooting.
:::

## Monitor the migration

<Tabs groupId="method">
<TabItem value="console" label="Aiven Console" default>

The **Migrate snapshot** wizard displays the migration progress. You can close the
wizard and check the status later on the <ConsoleLabel name="overview"/> page.

To track progress:

- Go to the <ConsoleLabel name="overview"/> page of your Aiven for OpenSearch service.
- If the migration is running, a **Migration in progress** banner appears.
- Click **Manage migration** to reopen the wizard and view details.

To stop the migration:

- Click **Stop migration** in the wizard.
- Confirm the action in the dialog.
- Any data already transferred remains in the service.

</TabItem>
<TabItem value="api" label="Aiven API">

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

If the migration configuration exists but has not started, the status
displays `"status": "waiting"`. After an attempt, the status shows the most recent
migration and includes a timestamp so you can track when it was last updated.

:::note
During the snapshot restore process, indices are temporarily closed and do not appear
in the user interface. They reopen once the restore is complete.
:::

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Check migration status using Aiven CLI:

```bash
avn service migration-status --project PROJECT_NAME SERVICE_NAME
```
Parameters:

- `PROJECT_NAME`: The name of your Aiven project.
- `SERVICE_NAME`: The name of your Aiven for OpenSearch service.

</TabItem>
</Tabs>

### Retry the migration

If the migration fails, an error banner appears on the <ConsoleLabel name="overview"/>
page and in the **Migrate snapshot** wizard.

To retry the snapshot migration:

1. Go to the <ConsoleLabel name="overview"/> page.
1. Click **Manage migration** in the banner to open the wizard.
1. Fix the issue and click **Restart migration**.

Alternatively, retry from Service management section:

1. Click <ConsoleLabel name="service settings"/>.
1. Go to the **Service management** section.
1. Click **Restart migration** next to **Migrate external snapshot**.

### Check snapshot status

For a more detailed view of the snapshot restore progress, use the following API request:

```bash
curl -X GET "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/opensearch/snapshot-status" \
-H "Authorization: Bearer API_TOKEN" | jq
```

The response shows the snapshot status and details if a snapshot is in progress:

```json
{
  "status": {
    "in_progress": true,
    "details": {
      "snapshot_name": "name-of-the-snapshot",
      "started": "YYYY-MM-DDThh:mm:ssZ",
      "shards": {
        "done": number-of-completed-shards,
        "total": total-number-of-shards
      }
    }
  }
}
```

The `details` section is included only if a snapshot is in progress.

## Complete your migration

Once the migration is complete, verify and restore your configurations:

- Check your migrated data
- Reapply your service configurations
- Confirm automatic cleanup

### Check your migrated data

<Tabs groupId="method">
<TabItem value="console" label="Aiven Console" default>

You can confirm that the migration is complete in one of the following places:

- The <ConsoleLabel name="overview"/> page displays a migration completed banner.
- The **Migration wizard** shows the status **Migration completed**.

If you are in the Migration wizard, click **Close** to exit.
Then, go to <ConsoleLabel name="opensearchindexes" /> in the sidebar.

Verify that:

- All expected indices are present.
- Document counts match your source data.
- Index aliases are correct.

</TabItem>
<TabItem value="script" label="Script-based validation">

To verify migration results, run the `compare_migration_validation_data.py` script
from [Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/blob/main/solutions/validate-elasticsearch-to-opensearch-migration/compare_migration_validation_data.py)
to compare indices, document counts, aliases, and ISM policies between two datasets.

```bash
python compare_migration_validation_data.py file1.json file2.json
```

</TabItem>
<TabItem value="command" label="Command-based validation">

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

</TabItem>
</Tabs>

### Reapply ISM policies and security configurations

Reapply necessary configurations:

- **Reapply ISM policies**: Reapply Index State Management (ISM) policies to the
  restored indices. For more information, see
  [Reapply ISM policies after snapshot restore](/docs/products/opensearch/howto/migrate-ism-policies).

- **Update security configurations**: Review and reconfigure security settings,
  including OpenDistro security configurations. For more details, see
  [Migrate OpenDistro security configuration](/docs/products/opensearch/howto/migrate-opendistro-security-config-aiven).

### Confirm automatic cleanup

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

<RelatedPages/>

- [Aiven for OpenSearch documentation](/docs/products/opensearch)
- [Elasticsearch snapshot and restore guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html)
