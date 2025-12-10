---
title: Inkless overview
sidebar_label: Overview
---

Inkless is Aiven’s cloud-native Apache Kafka® service that modernizes Kafka with diskless topics and object-storage retention to reduce operating costs while preserving full compatibility with existing Kafka clients.

Inkless runs on Kafka 4.x and uses Aiven Kafka Units (AKUs) to size services by
throughput instead of hardware plans. It supports both classic and diskless topics in
the same service.

## Key differences from classic Kafka

Inkless changes how Kafka services are sized, stored, and managed:

- **Throughput-based plans:** Services use AKUs instead of hardware plans. The service
  scales within your defined limits as throughput changes.
- **Flexible storage:** Diskless topics store all data in object storage. Classic topics
  use local disk with tiered storage enabled by default.
- **Managed configuration:** Broker-level settings are fixed to maintain service
  stability and allow automatic scaling.
- **KRaft metadata management:** Inkless uses KRaft for metadata and consensus,
  replacing ZooKeeper.
- **Cloud availability:** Inkless is initially available on AWS, with additional cloud
  providers to follow.

## When to use Inkless

Use Inkless when:

- Workload throughput fluctuates and requires autoscaling.
- Storage and compute must scale independently.
- Your use cases require diskless topics for long-term retention or large datasets.
- You need a simplified capacity model without hardware planning.

Classic Kafka remains available for existing deployments and appears in the Aiven Console
only for customers who already run Classic services..
