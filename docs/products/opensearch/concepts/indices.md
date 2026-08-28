---
title: Manage indices in Aiven for OpenSearch®
sidebar_label: Manage indices
---

import RelatedPages from "@site/src/components/RelatedPages";

Learn how documents, indices, shards, and replicas relate to each other in Aiven for OpenSearch®, and how mapping, aliases, and index lifecycle management keep your indices efficient.

## Documents and indices

OpenSearch® stores data as documents, which are JSON records made up of fields and their
values. An index is a named collection of documents that share a similar structure and
purpose, similar to a table in a relational database. Each index has a single mapping
that defines its fields, rather than multiple types within the index.

Aiven for OpenSearch doesn't limit the number of indices you can create.

:::warning
Avoid storing all your data in a single, continuously growing index with one
primary shard. A single-shard index can't spread its data or query load across
multiple nodes, and it runs into the memory and recovery-time limits described in
[Shards and replicas](#shards-and-replicas) sooner than a properly sized index would.
:::

## Mapping

Mapping defines the fields in an index and their data types, similar to a schema in a
relational database. When OpenSearch sees a field for the first time in a document, it
can create that field automatically. This is known as dynamic mapping.

Dynamic mapping causes two problems in production. Every field gets indexed even if you
never query most of them, which wastes CPU, increases index size on disk, and uses more
memory than a deliberate mapping would. It also locks in a field's type from the first
document that introduces it. For example, if the first document sets `user_id` to
`12345`, OpenSearch maps `user_id` as a number. A later document that sets `user_id` to
`A123` fails to index as a mapping conflict. If you write through the bulk API without
checking each item's result, that failure can go unnoticed.

Explicit mapping also lets you opt individual fields out of indexing. For example, if a
field holds a large value you only need to retrieve, such as a full description, but
never search or filter on, set `"index": false` for that field. OpenSearch then stores
the value without building search structures for it, which saves CPU, disk space, and
memory.

For production workloads, define an explicit mapping when you create an index so that
field types stay consistent and predictable. For the full mapping syntax, see the
[OpenSearch mapping documentation](https://opensearch.org/docs/latest/field-types/).

## Shards and replicas

Each index is split into primary shards, the units that OpenSearch distributes across
the nodes in your cluster. The number of primary shards is set when you create the index
and can't be changed later, except by creating a different index with the Split API or
by reindexing. A replica is a copy of a primary shard. Replicas protect
against data loss, and OpenSearch can also serve search queries from replicas, so more
replicas can spread read load across more nodes, not just add redundancy. For details on
how Aiven for OpenSearch manages replicas, see
[Replication factors in Aiven for OpenSearch®](/docs/products/opensearch/concepts/index-replication).

Shard count and size directly affect performance:

- **Memory**: Aggregations and searches over a large shard build large data structures
  in memory. Too many large shards can exhaust the memory available to the service.
- **Recovery time**: During recovery, such as a version upgrade or node replacement,
  OpenSearch copies each shard in full. Large shards take longer to recover and
  generate more disk I/O, which degrades service performance while recovery is in
  progress.

For guidance on choosing a shard count and size, see
[Optimal number of shards](/docs/products/opensearch/concepts/shards-number).

## When to create an index

The number of indices in your service directly affects performance, so plan your
indexing strategy before you create indices at scale. For guidance on when to create a
dedicated index instead of reusing an existing one, see
[When to create an index](/docs/products/opensearch/concepts/when-create-index).

## Indices vs data streams

For continuously generated, time-series data such as logs and metrics, OpenSearch also
offers data streams as an alternative to managing rolling indices manually. A data stream
groups a sequence of backing indices under a single name and creates a new backing index
through rollover automatically, so you always write to the current one without managing
an alias yourself.

Use manually managed indices with an alias when you need direct control over rollover
timing, mapping changes between generations, or per-index lifecycle policies. Use a data
stream when your data is append-only and time-ordered, and you want OpenSearch to manage
index creation and rollover for you.

For setup and query syntax, see the
[OpenSearch data streams documentation](https://opensearch.org/docs/latest/im-plugin/data-streams/).

## Aliases

An alias is a name that points to one or more indices. Applications and queries can
target an alias instead of a specific index name, so you can change which indices the
alias points to without updating client code.

Aliases are useful for the following:

- **Zero-downtime reindexing**: Point an alias at a new index after reindexing, then
  switch the alias to it in a single atomic operation.
- **Grouping indices**: Query multiple indices, such as `logs-2026.01` and
  `logs-2026.02`, through a single alias.
- **Rollover**: Automatically create an index and switch a write alias to it when
  the current index reaches an age, size, or document count threshold.

Rollover aliases are commonly used together with Index State Management. For a worked
example, see
[Hot and warm tiering](/docs/products/opensearch/concepts/hot-warm-tiering).

## Index lifecycle management

Aiven for OpenSearch includes the Index State Management (ISM) plugin, which automates
actions such as rollover, replica changes, and deletion based on policies you define.

Historically, some teams managed retention by embedding dates in index names, such as
`logs-2018-07-20`, and deleting old indices on a schedule. ISM policies replace this
manual approach. Define a policy once, apply it to a rollover alias, and let OpenSearch
handle transitions and deletions automatically.

Configure ISM policies through the OpenSearch API using the `_plugins/_ism` endpoints.
For an example that creates and applies a policy, see
[Hot and warm tiering](/docs/products/opensearch/concepts/hot-warm-tiering).

### Index retention patterns

Aiven for OpenSearch also provides an index retention feature you configure directly in
the Aiven Console. It caps the number of indices that match a name pattern and deletes
the oldest ones once that limit is exceeded.

This is a legacy approach that predates ISM being available on Aiven for OpenSearch. It
can't combine other lifecycle actions, such as rollover or tiering, into a single
policy, and it only deletes indices, so it can't move data to lower-cost storage tiers.
Use ISM for any index you're setting up now. Only rely on index retention patterns for
existing setups you haven't migrated to ISM yet.

For setup steps, see
[Index retention patterns](/docs/products/opensearch/howto/set_index_retention_patterns).

<RelatedPages/>

- [Optimal number of shards](/docs/products/opensearch/concepts/shards-number)
- [Replication factors in Aiven for OpenSearch®](/docs/products/opensearch/concepts/index-replication)
- [When to create an index](/docs/products/opensearch/concepts/when-create-index)
- [Reindex data in Aiven for OpenSearch®](/docs/products/opensearch/howto/reindex-opensearch)
