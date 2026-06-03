---
title: Supported Valkey™ modules
sidebar_label: Modules
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Valkey includes pre-enabled modules that extend core Valkey functionality with additional data types and commands.

## Valkey JSON

Valkey JSON provides native JSON document storage and manipulation capabilities within Valkey.

### Configuration

- Valkey JSON is enabled by default.
- No configuration is required.
- Valkey JSON cannot be disabled.

### Capabilities

Valkey JSON allows you to:

- Store JSON documents as values
- Query JSON documents using JSONPath
- Make atomic updates to JSON elements
- Index and search JSON data

For complete documentation on Valkey JSON commands and usage, see the
[Valkey JSON documentation](https://valkey.io/topics/valkey-json/).

## Valkey Search

Valkey Search is a high-performance search engine module that supports vector search, full-text search, numeric filtering, and tag filtering. It enables indexing data stored in Valkey Hash or Valkey JSON data types and querying it with low latency.

### Configuration

- Valkey Search is enabled by default.
- No configuration is required.
- Valkey Search cannot be disabled.

### Capabilities

Valkey Search allows you to:

- Create indexes over Valkey Hash and Valkey JSON data
- Run vector similarity searches using Approximate Nearest Neighbor (HNSW) or exact K-Nearest Neighbor (KNN) algorithms
- Apply numeric, tag, and full-text filters in hybrid queries
- Aggregate search results using `FT.AGGREGATE`
- Monitor index status and backfill progress using `FT.INFO`

### Supported commands

The following commands are available with Valkey Search:

| Command | Description |
|---------|-------------|
| `FT.CREATE` | Create an index |
| `FT.DROPINDEX` | Delete an index |
| `FT.INFO` | Return index details and statistics |
| `FT._LIST` | List all indexes |
| `FT.SEARCH` | Search an index |
| `FT.AGGREGATE` | Aggregate search results |

For the full command reference, see [Valkey Search commands](https://valkey.io/commands/#search).

### Cluster mode

Valkey Search is supported on Aiven for Valkey cluster plans.

### Further reading

For more information about Valkey Search, see the following upstream resources:

- [Valkey Search overview](https://valkey.io/topics/search/)
- [Search query syntax](https://valkey.io/topics/search-query/)
- [Search expressions](https://valkey.io/topics/search-expressions/)
- [Search data formats](https://valkey.io/topics/search-data-formats/)
- [Search monitoring](https://valkey.io/topics/search-monitoring/)

<RelatedPages/>

- [Valkey data types](https://valkey.io/topics/data-types/)
- [Valkey commands reference](https://valkey.io/commands/)
