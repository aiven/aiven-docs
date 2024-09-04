---
title: Replication factors in Aiven for OpenSearch®
sidebar_label: Replication factors
---

The replication factor in Aiven for OpenSearch® determines the number of copies (replicas) of each index shard, which ensures data availability and prevents data loss.

The `number_of_replicas` is an index-level setting that defines how many replicas
each primary shard has. By default, it is set to `1`, meaning each shard has one
replica for redundancy. You can configure this when creating or updating an index in the OpenSearch Dashboard.

## Automatic replication factor adjustment

Aiven for OpenSearch automatically adjusts replication factors in your indexes
to maintain data availability.

- The maximum `number_of_replicas` is the total number
  of nodes in your cluster minus one. This ensures that your data is replicated across
  all available nodes.

  **Example:** In a 3-node cluster, the maximum `number_of_replicas` is `2`, which
  replicates all shards across the three nodes.

- If you set `number_of_replicas` to `0` in a multi-node
  cluster, Aiven automatically increases it to `1`. This ensures that your data remains
  available if one node fails.

## Replication factor 0

Setting the replication factor (`number_of_replicas`) to `0` means your data has no
replicas. This reduces storage usage but significantly increases the risk of data
loss if a node in the cluster fails.

:::note
Enabling this setting comes with a reduced SLA, which must be agreed with your
account manager.
:::

### When to use replication factor 0

Consider using replication factor to `0` in the following scenarios:

- **Non-critical environments:** Ideal for QA, testing, or development clusters where
  potential data loss doesn’t significantly impact operations.
- **Temporary data:** Suitable when data can be recreated or is not critical, allowing
  you to save on storage costs.

### Risks and considerations

- **Data loss:** Without replicas, a node failure can result in permanent data loss.
- **Manual recovery:** If data loss occurs, data must be restored from snapshots
  manually, which can lead to downtime.

:::note

- In a scenario where a node fails before the first snapshot is taken, the system cannot
  recover the data. Aiven for OpenSearch automatically recreates the missing index, but
  the recreated index is empty.
- In a normal node recovery scenario, Aiven for OpenSearch loads the latest snapshot to
  restore your data.

:::

### Set replication factor 0

Once the SLA is agreed upon, contact [Aiven support](mailto:support@aiven.io) to enable
the setting that allows you to set the replication factor to 0.
