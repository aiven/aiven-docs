---
title: Replication factors in Aiven for OpenSearch®
sidebar_label: Replication factors
---

The replication factor in Aiven for OpenSearch® determines the number of copies (replicas) of each index shard, which ensures data availability and prevents data loss.

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

Setting the replication factor to `0` means your data has no replicas. This approach
reduces storage costs but significantly increases the risk of data loss if a node in
the cluster fails.

:::warning
If a node fails before a snapshot is taken, the system cannot recover the data.
In this case, Aiven for OpenSearch will automatically recreate the missing index to
restore operations. However, the recreated index will be empty. Consider this risk when
setting the replication factor to 0.

:::

### How to enable replication factor 0

To enable this setting, contact [Aiven support](mailto:support@aiven.io).

### When to use replication factor 0

Consider setting the replication factor to `0` in the following scenarios:

- **Non-critical environments:** Ideal for QA, testing, or development clusters where
  potential data loss doesn’t significantly impact operations.
- **Temporary data:** Suitable when data can be recreated or is not critical, allowing
  you to save on storage costs.

### Risks and considerations

- **Data loss:** Without replicas, a node failure can result in permanent data loss. If
  this happens, Aiven for OpenSearch® will automatically recreate the missing index, but
  it will be empty, with no data present.
- **Manual recovery:** If data loss occurs, data must be restored from snapshots
  manually, which can lead to downtime.
