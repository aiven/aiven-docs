---
title: Manage large shards in Aiven for OpenSearch®
sidebar_label: Manage large shards
---

import RelatedPages from "@site/src/components/RelatedPages";

Resolve the large shard size alert in Aiven for OpenSearch® by deleting old data, splitting an index, or increasing its shard count.

OpenSearch doesn't enforce a shard size limit, but for guidance on the recommended range,
see [Optimal number of shards](/docs/products/opensearch/concepts/shards-number). Shards
that grow too large can fail to relocate or recover, which risks data loss.

Aiven for OpenSearch monitors shard sizes for all services. If a shard exceeds the
recommended size, you get a notification through the
`user_alert_resource_usage_es_shard_too_large` alert. Use one of the following options to
resolve it.

## Delete records from the index

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

## Reindex into several smaller indices

Split an index into multiple smaller indices based on a field value. For example, create
a separate index for each `event_type`:

```bash
curl -X POST "https://USER:PASSWORD@HOST:PORT/_reindex" \
     -H 'Content-Type: application/json' \
     -d '{
  "source": {
    "index": "INDEX_NAME"
  },
  "dest": {
    "index": "logs"
  },
  "script": {
    "lang": "painless",
    "source": "ctx._index = \"logs-\" + ctx._source.event_type"
  }
}'
```

## Reindex into a new index with more shards

Create an index with a higher shard count, then reindex your data into it. For example,
create an index with 2 shards:

```bash
curl -X PUT "https://USER:PASSWORD@HOST:PORT/NEW_INDEX_NAME" \
     -H 'Content-Type: application/json' \
     -d '{
  "settings": {
    "number_of_shards": 2
  }
}'
```

Reindex your data into the new index:

```bash
curl -X POST "https://USER:PASSWORD@HOST:PORT/_reindex" \
     -H 'Content-Type: application/json' \
     -d '{
  "source": {
    "index": "INDEX_NAME"
  },
  "dest": {
    "index": "NEW_INDEX_NAME"
  }
}'
```

Replace the following in the preceding commands:

- `USER`: the username for the OpenSearch cluster.
- `PASSWORD`: the password for the OpenSearch cluster.
- `HOST`: the hostname for the connection.
- `PORT`: the port number for the connection.
- `INDEX_NAME`: the name of the existing index.
- `NEW_INDEX_NAME`: the name of the index you're creating.

<RelatedPages/>

- [Optimal number of shards](/docs/products/opensearch/concepts/shards-number)
- [Manage indices in Aiven for OpenSearch®](/docs/products/opensearch/concepts/indices)
- [Reindex Aiven for OpenSearch® data on a newer version](/docs/products/opensearch/howto/reindex-opensearch)
