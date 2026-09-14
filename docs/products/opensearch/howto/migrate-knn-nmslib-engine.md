---
title: Migrate Aiven for OpenSearch® k-NN indices off the nmslib engine
sidebar_label: Migrate off nmslib engine
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

Identify indices that use the deprecated `nmslib` k-NN engine, and reindex them to
`faiss` or `lucene` before upgrading Aiven for OpenSearch® from version 2.19 to 3.x.

## Why migrate off nmslib

Upstream, the k-NN plugin deprecated the `nmslib` engine as of version 2.19.0 and
scheduled it for removal. `faiss` is the current default k-NN engine.

To give you time to migrate before `nmslib` is removed, Aiven for OpenSearch blocks
upgrades from version 2.19 to 3.x for any service with an index that has a
`knn_vector` field using `method.engine: "nmslib"`. The upgrade request fails with
`403 Forbidden`, and the response lists the affected index names.

## Prerequisites

- You have an Aiven for OpenSearch service running version 2.19.
- You have the service connection credentials.
- You have required permissions to create, reindex, and delete indices.

:::note
In the examples,

- `$OS_URI` is used for the service connection URL (for example,
  `https://USER:PASSWORD@HOST:PORT`).
- `$OLD_INDEX_NAME` is used for the index using the `nmslib` engine.

:::

## Identify indices using nmslib

List the indices with a `knn_vector` field whose `method.engine` is `nmslib`:

```bash
curl -s "$OS_URI/_all/_mapping?filter_path=*.mappings.properties.*.method.engine" | \
  jq -r 'to_entries[] as $idx
    | $idx.value.mappings.properties // {} | to_entries[]
    | select(.value.method.engine? == "nmslib")
    | $idx.key' | sort -u
```

## Choose a destination engine

| Engine | When to choose | Notes |
| ------ | --------------- | ----- |
| `faiss` | Most workloads; matches the current default engine | Supports the same `hnsw` method as `nmslib`, plus filtering and radial search |
| `lucene` | You prefer a pure Java implementation with no native library | Uses Lucene's native filtering |

## Create the destination mapping

Create an index with the same `knn_vector` field definitions, but with
`method.engine` set to `faiss` or `lucene`. Keep the same `method.name` and
`space_type` as the source index so search behavior stays consistent.

<Tabs groupId="engine">
<TabItem value="faiss" label="nmslib to faiss" default>

```json title="PUT /my-index-v2"
{
  "settings": {
    "index.knn": true
  },
  "mappings": {
    "properties": {
      "embedding": {
        "type": "knn_vector",
        "dimension": 768,
        "method": {
          "name": "hnsw",
          "engine": "faiss",
          "space_type": "l2",
          "parameters": {
            "m": 16,
            "ef_construction": 100
          }
        }
      }
    }
  }
}
```

</TabItem>
<TabItem value="lucene" label="nmslib to lucene">

```json title="PUT /my-index-v2"
{
  "settings": {
    "index.knn": true
  },
  "mappings": {
    "properties": {
      "embedding": {
        "type": "knn_vector",
        "dimension": 768,
        "method": {
          "name": "hnsw",
          "engine": "lucene",
          "space_type": "cosinesimil",
          "parameters": {
            "m": 16,
            "ef_construction": 100
          }
        }
      }
    }
  }
}
```

</TabItem>
</Tabs>

Adjust `dimension`, `space_type`, and the other field definitions to match your source
index mapping. Get the full source mapping with:

```bash
curl -s "$OS_URI/$OLD_INDEX_NAME/_mapping"
```

## Reindex and switch over

Reindex data into the new index, verify the results, and switch your application over
to it by following
[Reindex Aiven for OpenSearch data on a newer version](/docs/products/opensearch/howto/reindex-opensearch#reindex-earlier-version-indices).
Exporting settings, running the reindex, verifying document counts, and swapping
aliases work the same way for an engine migration.

## Complete the upgrade

After reindexing all indices that use the `nmslib` engine:

1. Confirm no indices remain with `method.engine: "nmslib"` using the query in
   [Identify indices using nmslib](#identify-indices-using-nmslib).
1. [Upgrade your service](/docs/products/opensearch/howto/os-version-upgrade) to
   OpenSearch 3.x.

<RelatedPages/>

- [Upgrade Aiven for OpenSearch](/docs/products/opensearch/howto/os-version-upgrade)
- [Reindex Aiven for OpenSearch data on a newer version](/docs/products/opensearch/howto/reindex-opensearch)
- [Available plugins for Aiven for OpenSearch](/docs/products/opensearch/reference/plugins)
- [OpenSearch® k-NN plugin documentation](https://docs.opensearch.org/latest/search-plugins/knn/knn-index/)
