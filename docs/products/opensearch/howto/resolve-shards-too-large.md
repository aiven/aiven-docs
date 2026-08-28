---
title: Manage large shards in Aiven for OpenSearch®
sidebar_label: Manage large shards
---

import RelatedPages from "@site/src/components/RelatedPages";

Resolve the large shard size alert in Aiven for OpenSearch® by deleting old data, splitting an index, or reindexing it with more shards.

OpenSearch doesn't enforce a shard size limit, but for guidance on the recommended range,
see [Optimal number of shards](/docs/products/opensearch/concepts/shards-number). Shards
that grow too large can fail to relocate or recover, which risks data loss.

Aiven for OpenSearch monitors shard sizes for all services. If a shard exceeds the
recommended size, you get a notification through the
`user_alert_resource_usage_es_shard_too_large` alert. Use one of the following options to
resolve it.

## Delete old records and force merge

If your application allows it, permanently delete old or unnecessary records from the
index. For example, delete records older than five days:

```bash
curl -X POST "https://USER:PASSWORD@HOST:PORT/INDEX_NAME/_delete_by_query" \
     -H 'Content-Type: application/json' \
     -d '{
  "query": {
    "range": {
      "@timestamp": {
        "lte": "now-5d"
      }
    }
  }
}'
```

Deleting documents doesn't reduce disk usage on its own. OpenSearch only marks matching
documents as deleted; it removes them from disk the next time it merges the underlying
segments. To reclaim the space immediately, force a merge after the deletion completes
and write traffic to the index has stopped:

```bash
curl -X POST "https://USER:PASSWORD@HOST:PORT/INDEX_NAME/_forcemerge?max_num_segments=1"
```

:::warning
Both operations temporarily increase disk usage before they reduce it. Deleting the
records creates new segments to record the deletions, and the force merge rewrites the
remaining segments into new ones before removing the old ones. Setting
`max_num_segments` to `1` can temporarily double the shard's disk usage. Confirm you
have enough free disk space for this spike before you start.
:::

## Split the index

Use the Split API to create an index with a multiple of the current shard count. The
new index keeps the source index's mappings and settings automatically, so you don't
need to recreate them.

1. Make the source index read-only:

    ```bash
    curl -X PUT "https://USER:PASSWORD@HOST:PORT/INDEX_NAME/_settings" \
         -H 'Content-Type: application/json' \
         -d '{
      "index.blocks.write": true
    }'
    ```

1. Split it into a new index. The target shard count must be a multiple of the source
   shard count. For example, 2 shards can split into 4, 6, or 8, and 3 shards can split
   into 6, 9, or 12:

    ```bash
    curl -X POST "https://USER:PASSWORD@HOST:PORT/INDEX_NAME/_split/NEW_INDEX_NAME" \
         -H 'Content-Type: application/json' \
         -d '{
      "settings": {
        "index.number_of_shards": 4,
        "index.blocks.write": null
      }
    }'
    ```

The split creates an index under a new name. If your application references the index by
name rather than through an alias, add an alias that points to the new index so existing
clients keep working without changes. For more information, see
[Aliases](/docs/products/opensearch/concepts/indices#aliases).

## Reindex with more shards

You can also create an index with the shard count you want and copy the data across
with the Reindex API. Unlike the Split API, reindexing doesn't carry over the source
index's mappings and settings automatically. Capture and reapply them yourself, or follow
the full procedure in
[Reindex Aiven for OpenSearch® data on a newer version](/docs/products/opensearch/howto/reindex-opensearch),
which covers this end to end, including exporting and reapplying the original settings.

<RelatedPages/>

- [Optimal number of shards](/docs/products/opensearch/concepts/shards-number)
- [Manage indices in Aiven for OpenSearch®](/docs/products/opensearch/concepts/indices)
- [Reindex Aiven for OpenSearch® data on a newer version](/docs/products/opensearch/howto/reindex-opensearch)
