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

## Limited migration rollout

If you have an existing service that uses ZooKeeper and want to migrate to KRaft,
review the following limitations before you start. For the full migration process,
see [Migration from ZooKeeper to KRaft](#migration-from-zookeeper-to-kraft).

You can start a KRaft migration for eligible Aiven for Apache Kafka services. The
migration capability is rolled out gradually across all Aiven for Apache Kafka services.
During this rollout, the following temporary limitations apply. These limitations will
be removed in phases.

These restrictions do not apply when creating a new service that runs on KRaft with
Apache Kafka version 3.9 or later.

### Limit on concurrent migrations

A limited number of migrations can run at the same time across all Aiven for Apache Kafka
services. Migration requests are processed in the order received. If the maximum number
of concurrent migrations is reached, the request returns an error.

### Migration window

You can start a migration only during EU office hours:

- Monday to Friday
- 06:00 to 14:00 UTC

### Supported service plans

You can start a migration only if your service uses one of these plans:

- `startup-2`
- `business-4`
- `business-8`

Some plans have additional requirements. For details, see
[Before you migrate](#before-you-migrate).

Support for more plans will be added in phases.

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

Before you migrate, review [Limited migration rollout](#limited-migration-rollout) for
migration windows, supported service plans, and limits on concurrent migrations.

The migration is part of the upgrade to Apache Kafka 3.9. It is fully automated and
does not require manual steps. After the migration completes, reverting to ZooKeeper is
not supported.

### How the migration works

- The migration starts automatically when you upgrade your service to Apache Kafka 3.9
  in the Aiven Console.
- The migration runs during your configured
  [maintenance window](/docs/platform/concepts/maintenance-window).
- During the upgrade, the service status changes to **Rebuilding**.
- When the upgrade completes, the service status returns to **Running** and the service
  runs in KRaft mode.

#### What happens in the background

1. Aiven replaces the Kafka 3.8 nodes with Kafka 3.9 nodes. The new nodes temporarily
   run on ZooKeeper.
1. After the old nodes are decommissioned and the new cluster is healthy, Aiven starts
   the KRaft controllers. The service now runs in dual mode (ZooKeeper + KRaft).
1. Aiven transfers the cluster metadata from ZooKeeper to KRaft.
1. Brokers switch to KRaft mode and no longer use ZooKeeper.
1. During a one-week grace period, the KRaft controllers remain in migration mode.
1. After the grace period ends, the KRaft controllers switch to full KRaft mode.

#### Emergency rollback

The KRaft migration can be rolled back by Aiven for up to one week after it completes.
Rolling back reverts the service to using ZooKeeper and decommissions the KRaft
controller cluster. At this point, the service continues to run on Kafka 3.9, and the
migration can be retried.

### Before you migrate

- **Service version**: To upgrade to Apache Kafka 4.0 or later, your service must first
  migrate to KRaft by upgrading to Apache Kafka 3.9.
- **Grace period**: After the migration completes, there is a one-week grace period
  during which the cluster cannot be upgraded to Apache Kafka 4.0.
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
