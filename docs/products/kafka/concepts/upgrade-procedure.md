---
title: Apache Kafka® upgrade procedure
sidebar_label: Upgrade procedure
---

import MyImg from "@site/static/images/content/figma/kafka-cluster-overview.png";
import MyImg2 from "@site/static/images/content/figma/kafka-cluster-overview-upgraded.png";
import MyImg3 from "@site/static/images/content/figma/kafka-cluster-overview-final.png";

Aiven for Apache Kafka® offers an automated upgrade procedure, ensuring a smooth transition during various operations.

The upgrade process is performed during:

- Maintenance updates
- Plan changes
- Cloud region migrations
- Manual node replacements performed by an Aiven operator

These operations involve creating new broker nodes to replace existing ones.

## Upgrade procedure steps

<!-- vale off -->
The following steps outline the upgrade procedure for a 3-node Apache Kafka service:
<!-- vale on -->

<img src={MyImg} className="centered" alt="3-node Kafka service" width="50%" />

During an upgrade procedure:

1. **Start new nodes:** New Apache Kafka® nodes are started alongside the existing nodes.

1. **Join the cluster:** The new nodes join the Apache Kafka cluster once they are running.

   :::note
   The Apache Kafka cluster now contains a mix of old and new nodes.
   :::

1. **Transfer data and leadership:** The partition data and leadership are transferred
   to new nodes.

    <img src={MyImg2} className="centered" alt="Kafka cluster illustration" width="50%" />

    :::warning
    This step is CPU intensive due to the additional data movement
    overhead.
    :::

1. **Retire old nodes:** Old nodes are retired after their data is fully transferred.

   :::note
   The number of new nodes added depends on the cluster size. By default, up to 6 nodes
   are replaced at a time during the upgrade.
   :::

1. **Complete process**: The upgrade is complete when all old nodes are removed.

    <img src={MyImg3} className="centered" alt="Kafka cluster new node illustration" width="50%" />

## Zero downtime during upgrade

The upgrade process ensures no downtime. Active nodes remain operational, and the
service URI continues to resolve to all active nodes. However, partition transfers
create additional load, which can slow cluster performance if the cluster is already
under heavy load.

During partition transfers, clients attempting to produce or consume messages might
encounter `leader not found` warnings. Most client libraries handle these warnings
automatically, but they can still appear in logs. For more information,
see [NOT\_LEADER\_FOR\_PARTITION errors](/docs/products/kafka/concepts/non-leader-for-partition).

## Upgrade duration

The upgrade duration depends on several factors:

- **Data volume:** Larger data volumes increase the time required.
- **Number of partitions:** Each partition adds processing overhead.
- **Cluster load:** Heavily loaded clusters have fewer resources available for upgrades.

To reduce upgrade times, Aiven recommends performing upgrades during periods of low
traffic to minimize the impact on producers and consumers. If your service is
constrained by resources, consider disabling non-essential workloads during the upgrade.
This frees up resources for coordinating and transferring data between nodes, improving
efficiency.

## Rollback options

Rollback is not available because old nodes are removed once the upgrade progresses.

:::note
Nodes holding data are not removed from the cluster to prevent data loss.
If the upgrade does not progress, old nodes remain in the cluster.
:::

If sufficient disk capacity is available, you can downgrade to a smaller plan. Use the
[Aiven Console](/docs/platform/howto/scale-services) or the
[Aiven CLI](/docs/tools/cli/service-cli#avn-cli-service-update) to perform the downgrade.

The upgrade process remains the same when changing the node type during a service plan
change. For instance, when downgrading to a plan with fewer resources, such as fewer
CPUs, memory, or disk space, the latest system software versions are applied to all
new nodes, and data is transferred accordingly.

## Upgrade impact and risks

Upgrading your cluster can increase CPU usage due to partition leadership coordination
and data streaming to new nodes. To reduce the risk of disruptions, schedule the
upgrade during low-traffic periods and minimize the cluster's normal workload by pausing non-essential producers and consumers.

If you are upgrading to a smaller plan, the disk may reach the
[maximum allowed limit](https://aiven.io/docs/products/kafka/howto/prevent-full-disks),
which can block the upgrade. Check disk usage before upgrading and ensure there is enough free space.

:::note
In critical situations, Aiven's operations team can temporarily add extra storage to
the old nodes.
:::

## Transitioning to KRaft

With the release of Apache Kafka® 3.9, Aiven introduces support for Apache Kafka Raft
(KRaft), the new consensus protocol for Kafka metadata management. This enhancement
simplifies architecture while maintaining compatibility with existing features and
integrations, including Aiven for Apache Kafka Connect, Aiven for Apache Kafka
MirrorMaker 2, and Aiven for Karapace.

All features and monitoring metrics supported in Apache Kafka 3.8 remain unchanged
in APache Kafka 3.9, with no updates to ACL permissions or governance behaviors.

### Availability and migration

#### New services

- All new Aiven for Apache Kafka services with Apache Kafka® 3.9 will run KRaft as the
  default metadata management protocol.
- Initially supported on startup and business plans on Google Cloud Platform (GCP).
- Support for premium and custom plans, as well as additional cloud providers, will be
  rolled out progressively.

#### Existing services

- Migration for existing services is not yet available. Aiven expects to provide a
  migration path by Q2 2025.
- The migration consists of two steps:
  1. Upgrade your service from Apache Kafka 3.8 to 3.9.
  1. Migrate metadata from ZooKeeper to KRaft within Apache Kafka 3.9.
- Aiven has extended support for Apache Kafka 3.8 by one year to ensure you have enough
  time to plan and complete the migration.
