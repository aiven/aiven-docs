---
title: Cross-cluster replication for Aiven for OpenSearch®
sidebar_label: Cross-cluster replication
---

import RelatedPages from "@site/src/components/RelatedPages";

Cross-cluster replication (CCR) copies indices, including their data, mappings, and metadata, from one Aiven for OpenSearch® service to another, across regions and cloud providers.

## How cross-cluster replication works

CCR pairs a leader service with a follower service. The follower is a separate Aiven for
OpenSearch service that pulls changes from the leader, one way and asynchronously. You
write to the leader and read from either service.

1. [Create a follower](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch)
   for the leader. This connects the two services.
1. [Start replication](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch#start-replication)
   from the follower, for a single index or for every index that matches a pattern.
1. The follower keeps pulling new data, mappings, and metadata changes for each replicated
   index.

The follower can run in a different region or on a different cloud provider from the
leader. The leader, the follower, or both can also run in a
[custom cloud](/docs/platform/concepts/byoc) in your own cloud account.

## Use cases

- **Data locality:** Serve reads from a follower in a region close to your users to reduce
  latency.
- **Read scaling:** Spread query-heavy workloads across one or more followers while writes
  continue to go to the leader.
- **Disaster recovery standby:** Keep an up-to-date copy of your indices in another region
  or cloud. To fail over,
  [promote the follower to a standalone service](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch#promote-a-follower-service-to-a-standalone-service)
  and point your clients to it. You decide when to fail over: CCR keeps the data in sync,
  and switching traffic is up to you.

## Charges

Cross-cluster replication has two cost components:

- **Follower service:** Charged on its own service plan, like any other Aiven for
  OpenSearch service. The price of the leader service plan stays the same.
- **Replication traffic:** Charged for each GB replicated from the leader to the follower.
  The rate depends on whether the leader and follower regions are on the same continent,
  and replication within one continent costs less.

The Aiven Console shows the replication traffic rate in the **Create follower** dialog,
before you create the follower.

For a follower in a [custom cloud](/docs/platform/concepts/byoc), Aiven charges a flat
monthly fee for each follower service instead of a replication traffic charge. You pay
your cloud provider directly for the data transfer.

## Requirements

- **Service plans:** Business and Premium plans.
- **OpenSearch version:** The leader and the follower run the same OpenSearch version.
- **Follower size:** The follower's total memory is at least 80% of the leader's, and a
  multi-node leader needs a multi-node follower. You can change the service plans later.
- **Service state:** Both services are powered on when you create the follower.

## Limitations {#ccr-limitatons}

- A leader or a follower can't have
  [tiered storage](/docs/products/opensearch/concepts/hot-warm-tiering) enabled.
- While a service is a follower, it can't be forked, used as the source of a read replica,
  or act as the leader of another pairing. To use it for any of these,
  [promote it to a standalone service](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch#promote-a-follower-service-to-a-standalone-service)
  first.
- A leader can't be deleted or powered off while it has a follower. Promote or delete the
  follower first.
- Automated backups run on the leader. A follower isn't backed up separately while it
  remains a follower.
- Apply maintenance updates and major version upgrades to the leader and the follower
  yourself, and keep both on the same OpenSearch version.
- Replication pauses while a service recycles its nodes, and resumes when the service is
  running again.

<RelatedPages/>

- [Set up cross-cluster replication for Aiven for OpenSearch®](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch)
- [Best practices for cross-cluster replication in Aiven for OpenSearch®](/docs/products/opensearch/howto/ccr-best-practices-opensearch)
- [Bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
