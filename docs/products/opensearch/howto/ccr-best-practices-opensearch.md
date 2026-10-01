---
title: Best practices for cross-cluster replication in Aiven for OpenSearch®
sidebar_label: CCR best practices
---

import RelatedPages from "@site/src/components/RelatedPages";

Follow these best practices to plan, size, and operate cross-cluster replication (CCR) for
Aiven for OpenSearch, and to avoid the most common setup errors.

## Choose the right configuration for your use case

CCR is a one-way, active-passive model: The follower service continuously pulls data,
mappings, and metadata from the leader for the indices you choose to replicate. Typical
configurations include:

- **Data locality:** Replicate to a follower in a region closer to your users to reduce
  read latency for that region.
- **Cross-cloud resilience and disaster recovery:** Run the follower on a different cloud
  provider or region than the leader, and promote it to a standalone service if the leader
  becomes unavailable.
- **Read scaling:** Offload read-heavy or geographically distributed query traffic to one
  or more follower services while all writes continue to go to the leader.

A follower can't itself act as a leader for another CCR pairing, and it can't be forked or
used as the source of a read replica while it remains a follower. To use a follower as a
source for another purpose, [promote it to a standalone service](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch#promote-a-follower-service-to-a-standalone-service)
first.

## Match the leader and follower OpenSearch version

The leader and follower must run the same OpenSearch version to set up CCR. Keep both
services on the same version, and plan upgrades for both around the same time.

## Size the follower to at least match the leader

Aiven checks the following resource requirements when you create or update a CCR pairing:

- The follower can't have fewer nodes than the leader.
- The follower's total memory must be at least 80% of the leader's total memory.

If the follower doesn't meet these requirements, the integration request fails. For
predictable performance under replication load, size the follower with the same plan as
the leader or higher. There's no CPU or architecture check, so leader and follower can use
different CPU architectures, for example when pairing services across cloud providers.

## Keep both services powered on

Both the leader and the follower must be powered on to create the CCR integration. If
either service is powered off when you set up replication, the request fails.

## Don't combine CCR with tiered storage

Cross-cluster replication isn't supported when tiered storage (hot-warm) is enabled on
either the leader or the follower. If you rely on
[tiered storage](/docs/products/opensearch/concepts/hot-warm-tiering) for cost-efficient
retention of infrequently accessed data, plan for it as an alternative to CCR rather than
alongside it.

## Use auto-follow patterns for growing datasets

If you replicate indices that are created on a schedule, such as daily or monthly log or
time-series indices, use an auto-follow pattern instead of starting replication manually
for each new index. Auto-follow patterns match a wildcard against index names, so every
matching current and future leader index is replicated automatically. See
[Replicate indices by pattern](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch#replicate-indices-by-pattern).

## Plan for leader and follower deletion

You can't delete or power off a leader service while it still has a follower. Delete the
follower service, or promote it to standalone, before deleting or powering off the leader.

## Monitor replication status

Regularly check auto-follow statistics and the sync status of replicating indices so you
catch a paused or lagging replication before it affects failover readiness. See
[View follower services](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch#view-follower-services)
and the monitoring requests in
[Replicate indices by pattern](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch#replicate-indices-by-pattern).

<RelatedPages/>

- [Cross-cluster replication for Aiven for OpenSearch®](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch)
- [Set up cross-cluster replication for Aiven for OpenSearch®](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch)
- [Hot-warm tiering for Aiven for OpenSearch®](/docs/products/opensearch/concepts/hot-warm-tiering)
- [Change the service plan for Aiven for OpenSearch®](/docs/products/opensearch/howto/change-service-plan)
