---
title: Configure permissions for MirrorMaker 2 with external Kafka clusters
sidebar_label: Permissions and internal topics
---

By default, Apache Kafka® MirrorMaker 2 creates internal topics to store metadata,
offsets, and status information. When connected to an external Kafka cluster through an
[integration endpoint](/docs/products/kafka/howto/integrate-external-kafka-cluster),
MirrorMaker 2 uses the credentials defined in that endpoint to authenticate.

For MirrorMaker 2 to create these internal topics and write to them, the service account
or credentials must have the necessary permissions. In external Kafka clusters, these
permissions are managed through Access Control Lists (ACLs).

## Required permissions

To replicate topics between clusters, configure the following permissions:

- On **source clusters**, the MirrorMaker 2 service account must have **READ** access
  to replicated topics.
- On **target clusters**, the service account must have **WRITE** access to replicated topics.
- On **both clusters**, the service account must have **READ** and **WRITE** access to
  internal topics,
  plus **CREATE** and **DESCRIBE** permissions to create and manage these topics.

## Source cluster internal topics

MirrorMaker 2 creates the following internal topics on the source cluster:

| Topic | Replication factor | Partitions (default) | Cleanup policy |
|-------|-------------------|---------------------|----------------|
| `heartbeats` | 3 | 1 | compact |
| `mm2-configs.<target_alias>.internal` | 3 | 1 | compact |
| `mm2-offsets.<target_alias>.internal` | 3 | 1 | compact |
| `mm2-status.<target_alias>.internal` | 3 | 5 | compact |

In the table, `<target_alias>` represents the cluster alias you configured for the target cluster.

:::note
The `__consumer_offsets` topic is a standard Kafka topic used for consumer
group management. While MirrorMaker 2 uses this topic, Kafka creates it automatically,
not MirrorMaker 2.
:::

## Target cluster internal topics

MirrorMaker 2 creates the following internal topics on the target cluster:

| Topic | Replication factor | Partitions (default) | Cleanup policy |
|-------|-------------------|---------------------|----------------|
| `<source_alias>.checkpoints.internal` | 3 | 1 | compact |
| `<source_alias>.heartbeats` | 3 | 1 | compact |
| `mm2-configs.<source_alias>.internal` | 3 | 1 | compact |
| `mm2-offsets.<source_alias>.internal` | 3 | 25 | compact |
| `mm2-status.<source_alias>.internal` | 3 | 5 | compact |

In the table, `<source_alias>` represents the cluster alias you configured for the source cluster.

## Configuration-based topics

Some MirrorMaker 2 settings, such as heartbeat emission, create additional internal topics that require specific permissions.
If you enable these options, ensure the service account has **READ** and **WRITE**
access to the corresponding topics:

- **`emit_backward_heartbeats_enabled`:**
  When set to `true`, MirrorMaker 2 requires access to
  `mm2-offsets.<target_alias>.internal` on the source cluster.
  If disabled, this topic and its permissions are not required on the source cluster.

- **`emit_heartbeats_enabled`:**
  When set to `true`, MirrorMaker 2 requires access to
  `mm2-offsets.<source_alias>.internal` on the target cluster.
  If disabled, this topic and its permissions are not required on the target cluster.

## Offset sync topic location

The `offset-syncs.topic.location` setting determines where MirrorMaker 2 creates the
offset synchronization topic:

- **`source`** (default): Creates `<source_alias>.offset-syncs` on the source cluster
- **`target`**: Creates `<source_alias>.offset-syncs` on the target cluster

The service account must have **READ** and **WRITE** access to this topic on whichever
cluster you configure.

:::note
You must configure ACLs on both source and target clusters to ensure that MirrorMaker 2 can
describe and create topics, as well as produce to and consume from all required topics.
:::

## Related pages

- [Integrate an external Kafka cluster](/docs/products/kafka/howto/integrate-external-kafka-cluster)
- [Set up a replication flow](/docs/products/kafka/kafka-mirrormaker/howto/setup-replication-flow)
- [Get started with MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker/get-started)
