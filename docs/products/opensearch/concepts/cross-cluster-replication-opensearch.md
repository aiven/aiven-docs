---
title: OpenSearch® cross-cluster replication
limited: true
pro: true
---

Cross-cluster replication in Aiven for OpenSearch allows you to replicate the entire cluster, including its indexes, mappings, and metadata, from one service to another across different regions and cloud providers.

## How CCR works

Cross-cluster replication operates on an active-passive model. The follower service
retrieves all data and indexes from the leader service. Once you
[set up cross-cluster replication](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch), the leader cluster actively
replicates data to all follower clusters. You can establish follower clusters
in various regions and across different cloud providers. All index operations, data,
metadata, and configurations are replicated automatically.

## Benefits of cross-cluster replication

Cross-cluster replication offers key benefits, including:

-  **Data locality/proximity:** Replicating data to a cluster closer to
   the user's geographical location helps reduce latency and response
   time.
-  **Horizontal scalability:** Splits a query-heavy workload across
   multiple replica clusters to improve application availability.
-  **High availability and Disaster recovery (active-passive):** With
   tolerance for outages or complete failure of clusters, cross-cluster
   replication ensures uninterrupted service availability with the
   ability to failover to an alternate cluster.
-  **Centralized reporting cluster:** Having a single replica cluster
   as a single source of truth between different master cluster

## Limitations {#ccr-limitatons}

Some limitations include:

- This feature requires `[Pro Platform](/docs/platform/concepts/pro-platform)`.
- Hobbyist and Startup plans do not support cross-cluster replication.
- When creating the follower cluster service, it should match the memory of the leader
  cluster service. The service plan can be changed later if needed.
- To remove the cross-cluster replication integration, you must delete the follower
  cluster service.
- Manually perform maintenance and major version upgrades for leader and follower services.
- If a node recycle event occurs, the replication process is paused and resumes once
  the service is back up and running

## Related pages

- [Set up cross-cluster replication for Aiven for OpenSearch®](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch).
