---
title: Reindex data before upgrading from OpenSearch® 1.x to 3.3
sidebar_label: Reindex for 1.x to 3.3 upgrade
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

OpenSearch® 3.3 requires all indices to have been created with OpenSearch 2.x or later and you must reindex any indices created with OpenSearch 1.x before upgrading to version 3.3.

## Why reindexing is required

OpenSearch 3.3 introduces a compatibility requirement where all indices must
have a minimum version of 2.x.x. If you attempt to upgrade directly from
OpenSearch 1.x to 3.3 with indices created in version 1.x, the upgrade fails.

To upgrade from OpenSearch 1.x to 3.3:

1. Upgrade your service to OpenSearch 2.x
1. Reindex all indices created in version 1.x
1. Upgrade to OpenSearch 3.3

## Prerequisites

- Your Aiven for OpenSearch service is running OpenSearch 2.x
- You have identified indices created with OpenSearch 1.x that need reindexing
- You have the service connection credentials

## Identify indices requiring reindexing

Check which indices were created with OpenSearch 1.x:

```bash
curl -X GET "https://USER:PASSWORD@HOST:PORT/_cat/indices?v&h=index,creation.date.string,version" | grep "^1\."
```

Replace `USER`, `PASSWORD`, `HOST`, and `PORT` with your service connection details.

This command lists indices showing their creation version. Any index with a version starting with `1.` requires reindexing.

## Reindex process

For each index created with OpenSearch 1.x, follow these steps:

### 1. Create the new index

Create a new index with updated settings and mappings:

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

Apply the mapping to the new index, removing the outer wrapper and keeping only the `properties` object:

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

The `slices` parameter splits the reindexing into multiple subtasks. Use a value equal to the number of shards for optimal performance.

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

After verifying that your application works correctly with the new index, delete the old index:

```bash
DELETE /old_index_name
```

## Automate reindexing for multiple indices

For services with many indices, automate the reindexing process using a script.
This example uses a bash script with `curl` and `jq`:

```bash
#!/bin/bash

SERVICE_URL="https://USER:PASSWORD@HOST:PORT"

# Get all indices created with version 1.x
INDICES=$(curl -s -X GET "$SERVICE_URL/_cat/indices?format=json" | \
  jq -r '.[] | select(.["creation.date.string"] | startswith("1.")) | .index')

for INDEX in $INDICES; do
  NEW_INDEX="${INDEX}_v2"

  echo "Reindexing $INDEX to $NEW_INDEX"

  # Get and apply mapping
  MAPPING=$(curl -s -X GET "$SERVICE_URL/$INDEX/_mapping" | \
    jq ".\"$INDEX\".mappings")

  curl -X PUT "$SERVICE_URL/$NEW_INDEX" \
    -H "Content-Type: application/json" \
    -d "{\"mappings\": $MAPPING}"

  # Reindex
  curl -X POST "$SERVICE_URL/_reindex" \
    -H "Content-Type: application/json" \
    -d "{\"source\": {\"index\": \"$INDEX\"}, \"dest\": {\"index\": \"$NEW_INDEX\"}}"

  echo "Completed reindexing $INDEX"
done
```

Replace `USER`, `PASSWORD`, `HOST`, and `PORT` with your service details.

:::warning
Test the script on a non-production service before running it on production data.
:::

## Complete the upgrade to OpenSearch 3.3

After reindexing all indices created with OpenSearch 1.x:

1. Verify all indices now have a version of 2.x or higher
1. [Upgrade your service](/docs/products/opensearch/howto/os-version-upgrade) to OpenSearch 3.3

<RelatedPages/>

- [Upgrade Aiven for OpenSearch](/docs/products/opensearch/howto/os-version-upgrade)
- [Manage large shards in OpenSearch](/docs/products/opensearch/howto/resolve-shards-too-large)
- [OpenSearch Reindex API documentation](https://opensearch.org/docs/latest/api-reference/document-apis/reindex/)
