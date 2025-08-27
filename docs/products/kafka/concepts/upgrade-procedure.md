---
title: Apache Kafka® upgrade procedure
sidebar_label: Upgrade procedure
---

import MyImg from "@site/static/images/content/figma/kafka-cluster-overview.png";
import MyImg2 from "@site/static/images/content/figma/kafka-cluster-overview-upgraded.png";
import MyImg3 from "@site/static/images/content/figma/kafka-cluster-overview-final.png";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";

Aiven for Apache Kafka® provides an automated upgrade process that runs during the following operations:

- Maintenance updates
- Plan changes
- Cloud region migrations
- Manual node replacements by an Aiven operator

Aiven creates new broker nodes to replace the existing ones.

## How upgrades work

<!-- vale off -->
The following steps show the upgrade process for a 3-node Apache Kafka service:
<!-- vale on -->

<img src={MyImg} className="centered" alt="3-node Kafka service" width="50%" />

1. **Start new nodes:** New Apache Kafka® nodes start alongside existing ones.

1. **Join the cluster:** The new nodes join the Apache Kafka cluster once they are running.

   :::note
   The Apache Kafka cluster now contains a mix of old and new nodes.
   :::

1. **Transfer data and leadership:** The partition data and leadership are transferred
   to new nodes.

    <img src={MyImg2} className="centered" alt="Kafka cluster illustration" width="50%" />

    :::warning
    This step is CPU intensive because of the additional data movement.
    :::

1. **Retire old nodes:** Old nodes are removed after their data is transferred.

   :::note
   The number of new nodes added depends on the cluster size. By default, up to 6 nodes
   are replaced at a time during the upgrade.
   :::

1. **Finish upgrade**: The process finishes when all old nodes are removed.

    <img src={MyImg3} className="centered" alt="Kafka cluster new node illustration" width="50%" />

## Service availability during upgrades

Your Aiven for Apache Kafka service remains available during upgrades. All active
nodes stay operational, and clients can continue to connect.

What to expect during upgrades:

- Possible slower performance: Data transfers between nodes can reduce cluster
  performance, especially if the cluster is already near capacity.
- Temporary client warnings: You may see `leader not found` warnings in application
  logs during partition leadership changes.
- Automatic handling: Most Kafka client libraries retry automatically and handle these
warnings without manual action.

These effects are temporary and resolve as the upgrade completes.

For more information,
see [NOT\_LEADER\_FOR\_PARTITION errors](/docs/products/kafka/concepts/non-leader-for-partition).

## Upgrade duration

The time required to complete an upgrade depends on several factors:

- **Data volume:** Larger datasets take longer to process.
- **Number of partitions:** Each partition adds processing overhead.
- **Cluster load:** Heavily loaded clusters have fewer resources available for upgrades.

To reduce upgrade times, Aiven recommends performing upgrades during periods of low
traffic to minimize the impact on producers and consumers. If your service is
resource-constrained, consider pausing non-essential workloads during the upgrade.
This frees up resources for coordinating and transferring data between nodes, improving
efficiency.

## Rollback options

Rollback is not available because old nodes are removed once the upgrade progresses.

:::note
Nodes holding data are not removed until data transfer is complete, preventing data
loss. If the upgrade does not progress, old nodes remain in the cluster.
:::

If sufficient disk capacity is available, you can downgrade to a smaller plan. Use the
[Aiven Console](/docs/platform/howto/scale-services) or the
[Aiven CLI](/docs/tools/cli/service-cli#avn-cli-service-update) to perform the downgrade.

The upgrade process remains the same when changing the node type during a service plan
change. For instance, when downgrading to a plan with fewer resources, such as fewer
CPUs, memory, or disk space, the latest system software versions are applied to all
new nodes, and data is transferred accordingly.

## Upgrade impact and risks

Upgrades can increase CPU usage because of partition leadership changes and data
transfers to new nodes. To reduce the risk of disruptions, schedule the
upgrade during low-traffic periods and minimize the cluster's normal workload
by pausing non-essential producers and consumers.

If you are upgrading to a smaller plan, the disk may reach the
[maximum allowed limit](https://aiven.io/docs/products/kafka/howto/prevent-full-disks),
which can block the upgrade. Check disk usage before upgrading and ensure there is enough free space.

:::note
In critical situations, Aiven's operations team can temporarily add extra storage to
the old nodes.
:::

## Upgrading to Apache Kafka® 4.0

To upgrade to Apache Kafka® 4.0 or later, your service must first upgrade to
Apache Kafka 3.9 and migrate to [KRaft mode](/docs/products/kafka/concepts/kraft-mode).

- Services running Apache Kafka 3.8 or earlier (ZooKeeper-based) cannot be
  upgraded directly to 4.0. They must first upgrade to 3.9, which performs
  the ZooKeeper to KRaft migration.
- After migrating to KRaft in 3.9, the service can be upgraded to 4.0 or any
  later version.
- Once a service is migrated to KRaft, rollback to ZooKeeper is not possible.

## Transitioning to KRaft

With the release of Apache Kafka® 3.9, Aiven introduces support for Apache Kafka Raft
(KRaft), the new consensus protocol for Kafka metadata management. KRaft simplifies the
architecture while keeping compatibility with existing features and integrations,
including Aiven for Apache Kafka Connect, Aiven for Apache Kafka MirrorMaker 2, and
Aiven for Karapace.

Apache Kafka 3.9 includes all features from Apache Kafka 3.8. Some controller metrics
are no longer available due to the transition to KRaft mode. For details,
see [Apache Kafka controller metrics](/docs/products/kafka/reference/kafka-metrics-prometheus#kraft-mode-and-metrics-changes).
ACL permissions and governance behaviors remain unchanged.

For a detailed overview of how KRaft mode works and how it differs from ZooKeeper-based
metadata management, see [KRaft in Aiven for Apache Kafka®](/docs/products/kafka/concepts/kraft-mode).

### Availability and migration

#### New services

- All new Aiven for Apache Kafka services with Apache Kafka 3.9 run KRaft as the default
  metadata management protocol.
- Startup-4 replaces Startup-2 plans in Apache Kafka 3.9 and later. All feature
  restrictions from Startup-2 also apply to Startup-4, including Datadog restrictions.
- Available on all cloud providers.

#### Existing services

- Migration from ZooKeeper to KRaft is part of the upgrade from Apache Kafka 3.x to 3.9.
  This migration will be available soon.
- Aiven will notify you when your service becomes eligible for migration. For details,
  see [Migration from ZooKeeper to KRaft](/docs/products/kafka/concepts/kraft-mode#migration-from-zookeeper-to-kraft).
- After migrating to Kafka 3.9 in KRaft mode, you can upgrade to Kafka 4.0 or later.
- To support this transition, Aiven has extended support for Apache Kafka 3.8 by one
  year, allowing sufficient time for planning and migration.

#### Performance impact

Performance testing across different cloud providers and plan sizes has not shown
significant changes.
