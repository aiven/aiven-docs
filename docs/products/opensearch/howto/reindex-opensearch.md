---
title: Reindex Aiven for OpenSearch® data on a newer version
sidebar_label: Reindex data on newer version
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

When upgrading Aiven for OpenSearch® to a newer version, reindex indices created with an earlier version to ensure compatibility with the target version.

## Why reindexing is required

In a production environment, reindexing is more than a version upgrade tool. It is a
fundamental administrative task required whenever you need to change the underlying
structure of your data. Because Aiven for OpenSearch utilizes immutable Lucene segments,
certain changes require creating a new index and moving data into it.

### Version upgrades

Newer Aiven for OpenSearch versions can introduce compatibility
  requirements where indices require a minimum version. Upgrading to a newer version
  with indices created in an incompatible earlier version can cause the upgrade to fail.

:::important[Version compatibility rules]

An index version cannot be more than one major version lower than the target service
version. For example:

- An index with version `1.3.2` is compatible with service version `2.19.4` but not with
  `3.3.0` because the difference in the major version is greater than one.
- Upgrading a service to version 3.x requires all indices to have version `>=2.0.0`.
- Services with old Elasticsearch® indices at versions `6.x` or `7.x` require first
  upgrading those indices to OpenSearch version `2.19` before upgrading the service to
  version 3.x. This process is the same as for `1.x` indices.

:::

To upgrade when reindexing is required:

1. Upgrade your service to an intermediate compatible version if needed.
1. Reindex all indices created with incompatible earlier versions.
1. Upgrade to the target version.

### Mapping transformations

You might need reindexing when changing a field type, for example, when converting a text
field to a keyword for exact matching.

### Static setting updates

Common reasons for reindexing are changing the number of primary shards and updating
custom analyzers and tokenizers.

## Prerequisites

- You have an Aiven for OpenSearch service at an intermediate version.
- You have identified indices created with earlier versions that need reindexing.
- You have the service connection credentials.
- Your cluster health is green, and all applications writing to the index are stopped if
  possible.
- You have enough storage space for both the source index and the destination index, plus
  transient merge space required by the segments.
- You have required permissions to create and delete indices.

:::note
In the examples,

- `$OS_URI` is used for the service connection URL (for example,
  `https://USER:PASSWORD@HOST:PORT`).
- `$OLD_INDEX` is used for the index to be reindexed.
- `$NEW_INDEX` is used for the target index.

:::

## Identify indices requiring reindexing

Check which indices were created with an earlier version of Aiven for OpenSearch:

```bash
curl "https://USER:PASSWORD@HOST:PORT/_all/_settings?filter_path=*.settings.index.version.created_string,*.settings.index.creation_date_string&human=true"
```

Replace `USER`, `PASSWORD`, `HOST`, and `PORT` with your service connection details.

This lists the indices with their creation version and date. Identify indices with
versions that are incompatible with your target upgrade version.

## Choose your reindexing strategy

There are two primary patterns for reindexing. Your choice depends on whether you can use
aliases.

### Strategy A: blue-green swap

Create a new index alongside your existing index and move a pointer (alias) once the data
is synchronized.

- **How it works**: Data is copied to a new version, for example, v2. Once verified, the
  application alias is updated to point to v2 in a single, atomic operation.
- **Pros**: Instant rollback, low downtime, and source data remains untouched until the
  end.
- **Use when**: Your application uses aliases to reference indices.

### Strategy B: double reindex

Use when you cannot use aliases.

- **How it works**: Data is moved to a temporary buffer index, the original index is
  deleted and recreated with new settings, and data is reindexed back to the original name.
- **Pros**: No application code changes required.
- **Cons**: Involves a window of downtime.
- **Use when**: Your application references indices by name and cannot use aliases.

## Check storage availability

Before starting a reindex, verify you have enough storage space by checking how Aiven for
OpenSearch views its disk watermarks.

### Check disk usage per node

The `_cat/allocation` API provides a view of available space across your cluster:

```bash
curl -s "$OS_URI/_cat/allocation?v&s=disk.avail:desc"
```

Check these values:

- `disk.indices`: the amount of space currently taken by your data
- `disk.avail`: the remaining space on the node
- `disk.percent`: your current usage percentage

### Check flood stage watermarks

Aiven for OpenSearch blocks all writes (including reindexing) if a node hits the flood
stage watermark. By default, this is 95%.

Check if your cluster has custom settings:

```bash
curl -s "$OS_URI/_cluster/settings?include_defaults=true" | jq '
  .defaults.cluster.routing.allocation.disk.watermark,
  .persistent.cluster.routing.allocation.disk.watermark,
  .transient.cluster.routing.allocation.disk.watermark
'
```

### Check index-specific storage

See the primary storage and total storage (primaries plus replicas):

```bash
curl -s "$OS_URI/_cat/indices/$OLD_INDEX?v&h=index,docs.count,pri.store.size,store.size"
```

Check these values:

- `pri.store.size`: the size of your unique data (the primary shards)
- `store.size`: the total space on disk, including replicas

### Verify safe-to-proceed

If current disk usage plus 1.5 times the index size (with replicas) does not push the disk
usage over the watermark levels (specifically the flood stage), you can proceed.

:::warning
As a rule of thumb, if your `disk.percent` is already above 70%, do not start a reindex of
a large index without first increasing your plan's storage. The reindex process creates
new segments before deleting the old ones, causing a temporary storage spike.
:::

## Reindex earlier-version indices

For each index created with an earlier version of Aiven for OpenSearch, follow these steps:

### 1. Export source index configuration

Reindexing does not automatically preserve the settings and mappings of the source index.
Capture the current settings as the source of truth.

Export the complete definition of your existing index:

```bash
curl -s "$OS_URI/$OLD_INDEX" > original_state.json
```

### 2. Create configuration for the new index

Keep your custom mappings and analyzers while stripping out system-generated metadata that
belongs only to the old index instance:

```bash
jq '.[0][value] | {
  settings: {
    index: (
      .settings.index | del(
        .uuid,
        .version,
        .creation_date,
        .provided_name,
        .creation_date_string,
        .store
      )
    )
  },
  mappings: .mappings
}' original_state.json > new_index_request.json
```

Alternatively, manually create an index with updated settings:

```bash
PUT /NEW_INDEX_NAME
{
  "settings":
  {
    "number_of_shards": 1,
    "number_of_replicas": 1
  }
}
```

Adjust `number_of_shards` and `number_of_replicas` based on your requirements.

### 3. Initialize the destination index

Use the sanitized settings to create the destination index:

```bash
curl -s -X PUT "$OS_URI/$NEW_INDEX" \
     -H 'Content-Type: application/json' \
     -d @new_index_request.json
```

For large indices, consider changing the index refresh interval to `-1` to speed up
reindexing. Change it back once reindexing completes.

If you created the index manually, apply the mapping. Extract only the `properties` object
from the mapping response:

```bash
PUT /NEW_INDEX_NAME/_mapping
{
  "properties":
  {
    "example_field":
    {
      "type": "text"
    }
  }
}
```

### 4. Make the source index read-only

Optionally, prevent the moving target problem by making the source index read-only. This
prevents writes during reindexing.

```bash
curl -s -X PUT "$OS_URI/$OLD_INDEX/_settings" \
     -H 'Content-Type: application/json' \
     -d '{
       "index.blocks.write": true
     }'
```

:::warning
Applications trying to write to the source index will receive a `403 Forbidden` error.
:::

### 5. Reindex the data

Use the Reindex API to copy data from the old index to the new index.

For large indices that might take a long time, use asynchronous reindexing to prevent
request timeouts:

```bash
TASK_ID=$(curl -s -X POST "$OS_URI/_reindex?wait_for_completion=false&slices=auto" \
     -H 'Content-Type: application/json' \
     -d "{
       \"source\": {\"index\": \"$OLD_INDEX\"},
       \"dest\": {\"index\": \"$NEW_INDEX\"}
     }" | jq -r '.task')

echo "Reindex Task started: $TASK_ID"
```

The `wait_for_completion=false` parameter allows the reindex to continue in the background.
The reindex returns a task ID for monitoring progress.

For synchronous reindexing of smaller indices:

```bash
POST /_reindex
{
  "source":
  {
    "index": "OLD_INDEX_NAME"
  },
  "dest":
  {
    "index": "NEW_INDEX_NAME"
  }
}
```

For large indices, consider using these additional parameters:

<Tabs groupId="reindex-options">
<TabItem value="slicing" label="Slicing for performance" default>

Use slicing to parallelize the reindexing process:

```bash
POST /_reindex?slices=5&refresh
{
  "source":
  {
    "index": "OLD_INDEX_NAME"
  },
  "dest":
  {
    "index": "NEW_INDEX_NAME"
  }
}
```

The `slices` parameter splits the reindexing into multiple subtasks. Use a value equal to
the number of shards for optimal performance.

</TabItem>
<TabItem value="async" label="Monitor async reindexing">

Monitor the reindex task by periodically running:

```bash
curl -s "$OS_URI/_tasks/$TASK_ID" | jq '.task.status'
```

When the task completes, it disappears from the `_tasks` endpoint (the request returns
`404`). If the task is successful, its result is stored in the `.tasks` index for a short
period.

You can also use:

```bash
GET /_tasks/TASK_ID
```

</TabItem>
<TabItem value="batching" label="Batch size control">

Control the batch size to manage memory usage:

```bash
POST /_reindex
{
  "source":
  {
    "index": "OLD_INDEX_NAME",
    "size": 1000
  },
  "dest":
  {
    "index": "NEW_INDEX_NAME"
  }
}
```

The `size` parameter specifies how many documents to process in each batch.

</TabItem>
</Tabs>

### 6. Verify the reindexing

Check that all documents are copied successfully:

```bash
GET /OLD_INDEX_NAME/_count
GET /NEW_INDEX_NAME/_count
```

The document counts should match.

### 7. Finalize the reindex

Complete the reindexing process based on your chosen strategy.

#### Blue-green approach

Update aliases to point to the newly created index:

```bash
POST /_aliases
{
  "actions": [
    {
      "remove": {
        "index": "OLD_INDEX_NAME",
        "alias": "my_alias"
    },
    {
      "add": {
        "index": "NEW_INDEX_NAME",
        "alias": "my_alias"
    }
  ]
}
```

If you modified `refresh_interval`, set it back to the original value on the target index.

After verifying that your application works correctly with the new index, delete the old
index:

```bash
DELETE /OLD_INDEX_NAME
```

#### Double reindex approach

Before repeating the reindexing, ensure no applications are doing write or delete
operations targeting the index.

1. Optionally, clone the original source before deleting it (the index must be read-only):

   ```bash
   curl -s -X POST "$OS_URI/$OLD_INDEX/_clone/OLD_INDEX_BACKUP"
   ```

1. Delete the original source index and redo the reindex steps using the freshly created
   new index as the source and the original source index as the target.

1. After verifying that the second reindexing succeeded, remove the temporary index and
   the backup.

## Complete the upgrade

After reindexing all indices created with earlier versions:

1. Verify all indices have a compatible version.
1. [Upgrade your service](/docs/products/opensearch/howto/os-version-upgrade) to the
   target version.

## ISM plugin caveats

Reindexing does not consider lifecycle management provided by the ISM plugin. Issues that
can arise after reindexing:

### Orphaned index

When you create an index and move data into it, the ISM plugin sees it as a new entity.
Unless you explicitly attach a policy during creation (using a template or a manual API
call), the new index has no lifecycle management.

With the double reindex approach, the deletion of the original source index purges all ISM
metadata associated with that name. Even if you recreate the index with the same name, the
ISM plugin doesn't recognize it. Re-run the `_plugins/_ism/add` command to ensure the
index is managed.

### Clock reset

Most ISM policies calculate the age of data based on `index.creation_date`. Reindexing
creates an index today, resetting this date.

### Policy state reset

ISM policies are stateful. A policy might be in a warm state waiting to move to cold. You
cannot migrate the state of a policy from one index to another. The new index starts at
the initial state (usually hot).

<RelatedPages/>

- [Upgrade Aiven for OpenSearch](/docs/products/opensearch/howto/os-version-upgrade)
- [Manage large shards in Aiven for OpenSearch](/docs/products/opensearch/howto/resolve-shards-too-large)
- [OpenSearch® reindex API documentation](https://opensearch.org/docs/latest/api-reference/document-apis/reindex/)
