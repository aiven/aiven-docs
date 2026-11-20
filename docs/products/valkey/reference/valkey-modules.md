---
title: Supported Valkey™ modules
sidebar_label: Modules
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Valkey™ supports modules that extend Valkey with additional data types and commands.

You can enable or disable individual modules based on what your application uses.
For instructions, see [Configure Aiven for Valkey™ modules](/docs/products/valkey/howto/configure-modules).

## Module availability and defaults

Use the `valkey_modules_enabled` configuration parameter in your service's advanced
configuration to choose which modules run on your service. The value is a list of module names.

The supported modules and the default list depend on your Valkey version:

| Valkey version | Supported modules         | Default value                 |
| -------------- | ------------------------- | ----------------------------- |
| 8.1            | `json`                    | `["json"]`                    |
| 9              | `json`, `bloom`, `search` | `["json", "bloom", "search"]` |

New services have all modules available for their Valkey version enabled by default.

## Valkey Bloom

Valkey Bloom adds a probabilistic Bloom filter data type to Valkey. A Bloom filter is a
space-efficient data structure that tests set membership: it can tell you that an element
is _possibly in a set_ or _definitely not in a set_, using a fraction of the memory needed
to store the elements themselves.

Valkey Bloom is available on services running Valkey 9, where it's enabled by default.
If you disable the module, Bloom filter commands (`BF.*`) return an unknown command error.

### Capabilities

With Valkey Bloom, you can:

- Create Bloom filters with a custom capacity and false positive rate
- Add single or multiple elements to a filter
- Check whether one or more elements might exist in a filter
- Scale filters automatically as more elements are added
- Persist filters alongside the rest of your data

Bloom filters suit high-traffic workloads that need to prevent cache penetration,
deduplicate streams, or filter out known items at low memory cost.

Valkey Bloom commands start with `BF.`. For example, `BF.RESERVE` creates a filter,
`BF.ADD` and `BF.MADD` add elements, and `BF.EXISTS` and `BF.MEXISTS` check whether
elements exist.

For complete documentation on Valkey Bloom commands and usage, see the
[Valkey Bloom documentation](https://valkey.io/topics/bloomfilters/).

## Valkey JSON

Valkey JSON provides native JSON document storage and manipulation capabilities within Valkey.

Valkey JSON is enabled by default.
If you disable the module, JSON commands (`JSON.*`) return an unknown command error.

### Capabilities

Valkey JSON allows you to:

- Store JSON documents as values
- Query JSON documents using JSONPath
- Make atomic updates to JSON elements
- Index and search JSON data

For complete documentation on Valkey JSON commands and usage, see the
[Valkey JSON documentation](https://valkey.io/topics/valkey-json/).

## Valkey Search

Valkey Search is a high-performance search engine module that supports vector search,
full-text search, numeric filtering, and tag filtering. It enables indexing data stored in
Valkey Hash or Valkey JSON data types and querying it with low latency.

Valkey Search is available on services running Valkey 9, where it's enabled by default.
If you disable the module, Search commands (`FT.*`) return an unknown command error.

Valkey Search requires the Valkey JSON module to create indexes on JSON
documents. You can index and query Valkey Hash data without enabling Valkey JSON.

### Capabilities

Valkey Search allows you to:

- Create indexes over Valkey Hash and Valkey JSON data
- Run vector similarity searches using Approximate Nearest Neighbor (HNSW) or exact
  K-Nearest Neighbor (KNN) algorithms
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
