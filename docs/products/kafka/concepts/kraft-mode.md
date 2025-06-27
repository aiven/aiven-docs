---
title: KRaft in Aiven for Apache Kafka®
sidebar_label: KRaft
---

import RelatedPages from "@site/src/components/RelatedPages";

Starting with Apache Kafka 3.9, Aiven for Apache Kafka uses **KRaft** (Kafka Raft) to manage metadata and controllers, replacing ZooKeeper.
KRaft, like ZooKeeper, is an internal component of Apache Kafka but simplifies
metadata management and improves efficiency.

:::note
All new Aiven for Apache Kafka services running Apache Kafka 3.9 or later use KRaft
by default.
:::

## What is KRaft?

KRaft is the built-in metadata and consensus management system in Aiven for Apache Kafka
3.9 and later, replacing ZooKeeper. Aiven for Apache Kafka services use KRaft to
manage metadata internally, eliminating the need for a separate ZooKeeper cluster.
Apache Kafka manages metadata and controllers using the **Raft consensus algorithm**.

### Key differences between KRaft and ZooKeeper

KRaft introduces a new way of managing metadata directly within Apache Kafka. Instead
of relying on a separate ZooKeeper cluster for metadata storage and coordination,
Apache Kafka uses dedicated **controller nodes** that operate using
the **Raft consensus algorithm**.

| Feature              | ZooKeeper                                        | KRaft                                      |
|----------------------|------------------------------------------------|--------------------------------------------|
| Consensus algorithm | ZooKeeper uses the Zab (ZooKeeper Atomic Broadcast) protocol. | KRaft uses the Raft protocol, which is built into Apache Kafka for metadata management. |
| Architecture      | A separate ZooKeeper cluster is required for metadata management. | KRaft is built into Apache Kafka and uses dedicated controllers. |
| Metadata storage  | Metadata is stored externally in ZooKeeper. | Metadata is stored internally in Apache Kafka. |

Both ZooKeeper and KRaft are fully managed by Aiven. You do not need to handle any
operational aspects of either system. Aiven takes care of all maintenance, monitoring,
and scaling, regardless of which system is used for metadata management.

## How KRaft works

KRaft introduces two key roles within an Aiven for Apache Kafka service:

- **Brokers**: Handle message storage and processing.
- **Controllers**: Manage cluster metadata using the Raft consensus algorithm.

Separating these roles improves metadata management efficiency without affecting broker
performance.

## Migration from ZooKeeper to KRaft

Migration from ZooKeeper to KRaft is not yet available for existing
Aiven for Apache Kafka services. Aiven will notify you when your service becomes eligible.

The migration is included in the upgrade to Apache Kafka 3.9. It is fully automated and
does not require any manual steps. After the migration is complete, reverting to
ZooKeeper is not supported.

### How the migration works

- The migration is triggered when you upgrade your service to Apache Kafka 3.9 using the
  Aiven Console.
- The migration runs during your configured
  [maintenance window](/docs/platform/howto/maintenance-window), like other major
  version upgrades.
- During the upgrade, the service status changes to **Rebuilding**.
- AAiven transfers your service’s metadata from ZooKeeper to KRaft and updates the
  cluster to use KRaft mode.
- When the migration finishes, the service status returns to **Running**, and the
  service operates in KRaft mode.

### Before you migrate

- **Service version**: To upgrade to Apache Kafka 4.0 or later, your service must first
  migrate to KRaft by upgrading to Kafka 3.9.
- **Service plan**: If your service is on the **Startup-2** plan, you must upgrade
  to **Startup-4** or higher during the same maintenance window as the version upgrade.

## Impact of KRaft

### Compatibility and impact

KRaft does not change how Aiven for Apache Kafka services work. Applications, clients,
and integrations, such as Apache Kafka brokers, Aiven for Apache Kafka Connect,
Aiven for Apache MirrorMaker 2, and Karapace, continue to function as expected.

You can run services on Apache Kafka 3.8 or earlier (using ZooKeeper) alongside services
on Apache Kafka 3.9 or later (using KRaft) without compatibility issues. The only
differences come from features available in Apache Kafka 3.9 that may not exist in
previous versions.

### Monitoring and metrics

Some ZooKeeper-related controller metrics are not available in KRaft. For a list of
removed metrics, see [KRaft and metrics changes](/docs/products/kafka/reference/kafka-metrics-prometheus#kraft-mode-and-metrics-changes)

<RelatedPages/>

[Transitioning to KRaft](/docs/products/kafka/concepts/upgrade-procedure#transitioning-to-kraft)
