---
title: KRaft in Aiven for Apache Kafka®
sidebar_label: KRaft
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka 3.9 and later uses **KRaft** (Kafka Raft) to manage metadata and controllers, replacing ZooKeeper.
Like ZooKeeper, KRaft is an internal component of Apache Kafka, reducing complexity and
improving efficiency.

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


 Feature              | ZooKeeper                                        | KRaft                                      |
|----------------------|------------------------------------------------|--------------------------------------------|
| Consensus algorithm | Uses Zab (ZooKeeper Atomic Broadcast)          | Uses Raft, built into Kafka for internal coordination                 |
| Architecture      | Requires a separate ZooKeeper cluster for metadata management           | Built into Apache Kafka with dedicated controllers |
| Metadata storage  | Stored externally in ZooKeeper                 | Stored internally in Kafka                 |
| Operational overhead | Requires ZooKeeper cluster management       | No external cluster required               |

## How KRaft works

KRaft introduces two key roles within an Aiven for Apache Kafka service:

- **Brokers**: Handle message storage and processing.
- **Controllers**: Manage cluster metadata using the Raft consensus algorithm.

Separating these roles improves metadata management efficiency without affecting broker
performance.

## Impact of KRaft

### Compatibility and impact

KRaft does not change how Apache for Apache Kafka services work. Applications, clients,
and integrations, such as Apache Kafka brokers, Aiven for Apache Kafka Connect,
Aiven for Apache MirrorMaker 2, and Karapace, continue to function as expected.

### Monitoring and metrics

Some ZooKeeper-related controller metrics are not available in KRaft. For a list of
removed metrics, see [KRaft and metrics changes](/docs/products/kafka/reference/kafka-metrics-prometheus#kraft-mode-and-metrics-changes)


<RelatedPages/>

[Transitioning to KRaft](/docs/products/kafka/concepts/upgrade-procedure#transitioning-to-kraft-)
