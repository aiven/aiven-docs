---
title: Reindex Aiven for OpenSearch® data on a newer version
sidebar_label: Reindex data on newer version
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

When upgrading Aiven for OpenSearch® to a newer version, you may need to reindex indices created with an earlier version to ensure compatibility with the target version.

## Why reindexing is required

Newer Aiven for OpenSearch versions may introduce compatibility requirements where indices
must have been created with a minimum version. If you upgrade to a newer version with
indices created in an incompatible earlier version, the upgrade can fail.

To upgrade when reindexing is required:

1. Upgrade your service to an intermediate compatible version if needed.
1. Reindex all indices created with incompatible earlier versions.
1. Upgrade to the target version.

## Prerequisites

- Your Aiven for OpenSearch service is running at an intermediate version.
- You have identified indices created with earlier versions that need reindexing.
- You have the service connection credentials.

## Identify indices requiring reindexing

Check which indices were created with an earlier version of Aiven for OpenSearch:

```bash
curl -X GET "https://USER:PASSWORD@HOST:PORT/_cat/indices?v&h=index,creation.date.string,version"
```

Replace `USER`, `PASSWORD`, `HOST`, and `PORT` with your service connection details.

This command lists indices showing their creation version. Identify indices with versions
that are incompatible with your target upgrade version.

## Reindex earlier-version indices

For each index created with an earlier version of Aiven for OpenSearch, follow these steps:

### 1. Create an index

Create an index with updated settings and mappings:

```bash
PUT /new_index_name
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  }
}
```

Adjust `number_of_shards` and `number_of_replicas` based on your requirements.

### 2. Copy the mapping

Export the mapping from the source index:

```bash
GET /old_index_name/_mapping
```

Apply the mapping to the new index, removing the outer wrapper and keeping only the
`properties` object:

```bash
PUT /new_index_name/_mapping
{
  "properties": {
    // Paste the properties from the source index mapping
  }
}
```

### 3. Reindex the data

Use the Reindex API to copy data from the old index to the new index:

```bash
POST /_reindex
{
  "source": {
    "index": "old_index_name"
  },
  "dest": {
    "index": "new_index_name"
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
  "source": {
    "index": "old_index_name"
  },
  "dest": {
    "index": "new_index_name"
  }
}
```

The `slices` parameter splits the reindexing into multiple subtasks. Use a value equal to
the number of shards for optimal performance.

</TabItem>
<TabItem value="async" label="Asynchronous reindexing">

For very large indices, run the reindex operation asynchronously:

```bash
POST /_reindex?wait_for_completion=false
{
  "source": {
    "index": "old_index_name"
  },
  "dest": {
    "index": "new_index_name"
  }
}
```

This returns a task ID that you can use to monitor progress:

```bash
GET /_tasks/<task_id>
```

</TabItem>
<TabItem value="batching" label="Batch size control">

Control the batch size to manage memory usage:

```bash
POST /_reindex
{
  "source": {
    "index": "old_index_name",
    "size": 1000
  },
  "dest": {
    "index": "new_index_name"
  }
}
```

The `size` parameter controls how many documents are processed in each batch.

</TabItem>
</Tabs>

### 4. Verify the reindexing

Check that all documents were copied successfully:

```bash
GET /old_index_name/_count
GET /new_index_name/_count
```

The document counts should match.

### 5. Update aliases and delete the old index

If the old index uses aliases, update them to point to the new index:

```bash
POST /_aliases
{
  "actions": [
    {
      "remove": {
        "index": "old_index_name",
        "alias": "my_alias"
      }
    },
    {
      "add": {
        "index": "new_index_name",
        "alias": "my_alias"
      }
    }
  ]
}
```

After verifying that your application works correctly with the new index, delete the old
index:

```bash
DELETE /old_index_name
```

## Complete the upgrade

After reindexing all indices created with earlier versions:

1. Verify all indices now have a compatible version.
1. [Upgrade your service](/docs/products/opensearch/howto/os-version-upgrade) to the
   target version.

<RelatedPages/>

- [Upgrade Aiven for OpenSearch](/docs/products/opensearch/howto/os-version-upgrade)
- [Manage large shards in Aiven for OpenSearch](/docs/products/opensearch/howto/resolve-shards-too-large)
- [OpenSearch reindex API documentation](https://opensearch.org/docs/latest/api-reference/document-apis/reindex/)
