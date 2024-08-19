---
title: Replication factors in Aiven for OpenSearch®
sidebar_label: Replication factors
---

The replication factor determines the number of copies (replicas) of each index shard. Aiven for OpenSearch® manages replication factors to ensure data availability and prevent data loss.

## Automatic replication factor adjustment

Aiven for OpenSearch automatically adjusts replication factors in your indexes
to maintain data availability.

### How it works

- **Maximum replication factor:** The maximum `number_of_replicas` is the total number
  of nodes in your cluster minus one. This ensures that your data is replicated across
  all available nodes.
  - **Example:** In a 3-node cluster, the maximum `number_of_replicas` is `2`, which
    replicates all shards across the three nodes.

- **Preventing data loss:** If you set `number_of_replicas` to `0` in a multi-node
  cluster, Aiven automatically increases it to `1`. This ensures that your data remains
  available if one node fails.

## Replication factor 0

Setting the replication factor to `0` means that your data will not have any replicas.
While this can save storage costs, it significantly increases the risk of data loss
if a node in the cluster fails.

### How to enable replication factor 0

To enable replication factor `0`, contact [Aiven support](mailto:support@aiven.io).

### When to use replication factor 0

Consider setting the replication factor to `0` in the following scenarios:

- **Non-critical environments:** This setting is ideal for QA, testing, or development
  clusters where potential data loss won’t significantly impact your operations.
- **Temporary data:** Suitable if your data can be recreated or is not critical,
  allowing you to save on storage costs.

### Risks and considerations

- **Data loss:** With no replicas, a node failure can result in permanent data loss.
- **Manual recovery:** If data loss occurs, you will need to restore data from snapshots
  manually, which can lead to downtime.
