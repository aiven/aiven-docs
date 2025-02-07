---
title: Apache Kafka® upgrade procedure
sidebar_label: Upgrade procedure
---

import MyImg from "@site/static/images/content/figma/kafka-cluster-overview.png";
import MyImg2 from "@site/static/images/content/figma/kafka-cluster-overview-upgraded.png";
import MyImg3 from "@site/static/images/content/figma/kafka-cluster-overview-final.png";

One of the benefits of using a managed service like Aiven for Apache Kafka® is the automated upgrade procedure.

The upgrade procedure is executed during:

- Maintenance updates
- Plan changes
- Cloud region migrations
- Manual node replacements performed by an Aiven operator

All the preceding operations involve creating new broker nodes to replace existing ones.

## Upgrade procedure steps

<!-- vale off -->
This example demonstrates the steps in the automated upgrade procedure for
a 3-node Apache Kafka service, visualized below:
<!-- vale on -->

<img src={MyImg} className="centered" alt="3-node Kafka service" width="50%" />

During an upgrade procedure:

1. **Start new nodes:** New Apache Kafka® nodes are started alongside the existing nodes.

1. **Join cluster:** The new nodes join the Apache Kafka cluster once they are running.

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

1. **Retire old nodes:** Once old nodes no longer have partition data, they are retired
   from the cluster.

   :::note
   Depending on the cluster size, more new nodes are added (by default, up to 6 nodes
   are replaced at a time).
   :::

1. **Complete process**: The process is completed once the last old node has been
  removed from the cluster.

    <img src={MyImg3} className="centered" alt="Kafka cluster new node illustration" width="50%" />

## No downtime during upgrade

The preceding upgrade process has no downtime because there are always active nodes
in the cluster, and the same service URI resolves to all active nodes. However, the
upgrade generates extra load during the transfer of partitions. This can slow down
overall cluster performance or even prevent normal work progress if the cluster is
already under heavy load.

When Apache Kafka clients attempt to produce or consume messages, they might encounter
`leader not found` warnings as partitions are being moved between brokers. Although
most client libraries handle this automatically, the warnings can appear
alarming in the logs. To learn more, see [NOT_LEADER_FOR_PARTITION errors](/docs/products/kafka/concepts/non-leader-for-partition).

## Upgrade duration

The duration of the upgrade can vary significantly and depends on several factors:

- **Amount of data:** The more data stored in the cluster, the longer
  the upgrade will take.
- **Number of partitions:** Each partition adds overhead, as partition leadership
  also needs to be moved to the new nodes.
- **Spare resources:** If the cluster is already under heavy load, there will be
  minimal resources available for the upgrade procedure.

To achieve faster upgrades, Aiven recommends running the procedure during periods of
low load to reduce the overhead on producers and consumers. If the service is already
tightly constrained on resources, it is recommended to disable all non-essential
usage during the upgrade. This allows more resources to be dedicated to
coordinating and moving data between nodes.

## Upgrade rollback

Rollback is unavailable because old nodes are deleted once they are removed from the
cluster.

:::note
Nodes are not removed from the cluster while they hold data. If an upgrade doesn't
progress, the nodes are not removed to prevent data loss.
:::

If there is enough disk capacity on the smaller plan, you can downgrade from a
larger service plan to a smaller one. This can be done via the
[Aiven Console](/docs/platform/howto/scale-services) or the [Aiven CLI](/docs/tools/cli/service-cli#avn-cli-service-update).

The upgrade procedure remains the same when changing the node type during a service plan
change. If you downgrade to a service plan with nodes that have fewer CPUs, memory, or
disk space, the latest system software versions are used for all newly created nodes.
The upgrade mechanism, as explained in this document, is used to transfer data to
the new nodes.

## Upgrade impact and risks

During the upgrade procedure, partition leadership coordination and streaming data to
new nodes generate additional CPU load. To mitigate the risk, run the upgrade at a
time of low traffic and reduce the normal workload on the cluster by disabling
non-essential producers and consumers.

Specifically, when upgrading to a smaller plan, the disk can reach the
[maximum allowed limit](https://aiven.io/docs/products/kafka/howto/prevent-full-disks),
which can prevent the procedure from progressing. To mitigate the risk, check the disk
usage before the upgrade and evaluate the amount of space left.

:::note
In an emergency, our operations team can temporarily add additional volumes to
the old nodes.
:::
