---
title: Optimal number of shards
sidebar_label: Optimal shards number
---

A key component of using OpenSearch® is determining the optimal number of shards for your index.
Learn how to choose the appropriate number of shards and maximizing performance.

For a broader overview of index configuration, including shard sizing guidelines, see
[Shards and replicas](/docs/products/opensearch/concepts/indices#shards-and-replicas).

## Considerations for optimal shard count

The ideal number of shards depends on your data volume, usage patterns, and expected
data growth. As a starting point, aim for a shard size of about 30 GB. For example, an
index with 100 GB of expected data can start with 3 to 4 shards.

A more critical limit than any single index's shard count is the total number of shards
your service's memory can support. As a rule of thumb, don't exceed 20 shards per GB of
memory available to the service. Going over this significantly increases the risk of
the service running out of memory, regardless of how those shards are distributed
across indices.

For a multi-node OpenSearch® service, Aiven enforces a minimum of one replica per shard
to ensure high availability and data redundancy, and replicas also let OpenSearch spread
search queries across more nodes. While there is no limit on the number of replicas per
shard, adding too many can impact performance and increase disk usage.

## Determining shard count

Base your shard count on a target shard size, since the right target depends on how you
query the data rather than on a single fixed divisor:

-   **Search-heavy indices:** Target 10-30 GB per shard. Use the lower end of that range
    for a smaller total data volume, and the higher end as total data volume grows.

-   **Write-heavy or seldom-queried indices**, such as logs: Target 30-50 GB per shard.

Divide your expected total data volume by your target shard size to get a starting
shard count. For example, a 250 GB search-heavy index at 25 GB per shard starts with 10
shards.

For a small data volume spread across many indices, start with one shard per index and
split the index later if it grows.

These are starting points. Monitor disk and CPU usage, and adjust as your usage patterns
and data volume evolve.

## Use the plan calculator

To help configure your shards, the OpenSearch plan calculator is available for online
use or download:

- [View on Google
  Docs](https://docs.google.com/spreadsheets/d/1wJwzSdnQiGIADcxb6yx1cFjDR0LEz-pg13U-Mt2PEHc) -
  Make a copy to your Google drive to use it.
- [Download
  XLSX](https://docs.google.com/spreadsheets/d/1wJwzSdnQiGIADcxb6yx1cFjDR0LEz-pg13U-Mt2PEHc/export) -
  Download and use it locally.

Enter details like the number of nodes, CPUs, RAM, and max shard size to get recommended
starting values for your setup.

![Screenshot of the spreadsheet: enter your information and get recommendations.](/images/content/products/opensearch/opensearch-plan-calculator.png)

Yellow cells such as `data node count`, `CPUs`, `RAM`, `Max Shard Size` are input fields
used to calculate recommended plan sizes.

:::warning
Dashboards from Aiven for OpenSearch are not compatible across minor versions of
OpenSearch. If your service instance runs an older OpenSearch version, expect downtime
during migration or plan changes.
:::

## Adjusting shard count

OpenSearch doesn't let you change the shard count of an existing index directly, so
increasing or decreasing it always means creating a different index. The right approach
depends on how much you can prepare in advance:

-   **Split the index**: Use the Split API to create an index with a multiple of the
    current shard count. The new index keeps the source index's mappings and settings
    automatically, but it gets a new name, so you need an alias if you want existing
    clients to keep using the original name.
-   **Reindex to a new index**: Create an index with the shard count you want and copy
    the data across with the Reindex API. This works for any index, but unlike the
    Split API, it doesn't carry over mappings and settings automatically, and it needs
    more planning around writes that happen during the copy.
-   **Point an alias at the current index in advance**: If your application already
    writes through an alias rather than the index name directly, you can create the
    replacement index ahead of time and switch the alias to it in a single atomic step,
    with no application changes.

For step-by-step instructions, see
[Manage large shards in Aiven for OpenSearch®](/docs/products/opensearch/howto/resolve-shards-too-large).

If you're using OpenSearch for daily logs or a similar rolling pattern, you can also
change the shard count for new indices going forward, without touching existing ones.

OpenSearch automatically rebalances shards across nodes to even out overall disk usage
per node. This isn't driven by individual shard size. A single large shard doesn't
trigger rebalancing on its own, though its size can limit which nodes have enough free
disk space to host it.
