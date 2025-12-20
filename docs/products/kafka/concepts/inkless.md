---
title: Inkless overview
sidebar_label: Overview
---

import RelatedPages from "@site/src/components/RelatedPages";

Inkless is Aiven’s cloud-native Apache Kafka® service that modernizes Kafka with diskless topics and object storage for data retention.
It reduces operational overhead while preserving full compatibility with existing
Kafka clients.

Inkless runs on Kafka 4.x and uses Aiven Kafka Units (AKUs) to size services by throughput
instead of hardware plans. It supports both classic and diskless topics within the same
service.


## Key differences from classic Kafka

Inkless changes how Kafka services are sized, stored, and managed:

- **Throughput-based sizing:** Services use AKUs instead of hardware plans and scale
  within defined limits as throughput changes.
- **Flexible storage:** Diskless topics store all data in object storage. Classic topics
  use local disk with tiered storage enabled by default.
- **Managed configuration:** Broker-level settings are fixed to maintain service
  stability and allow automatic scaling.
- **KRaft metadata management:** Inkless uses KRaft for metadata and consensus,
  replacing ZooKeeper.
- **Cloud availability:** Inkless is available on selected cloud providers, with support
  expanding over time.
- **Diskless topics:** Diskless topics are available only in Inkless services.

## When to use Inkless

Use Inkless when:

- Workload throughput fluctuates and requires autoscaling.
- Storage and compute must scale independently.
- Your use cases require diskless topics for long-term retention or large datasets.
- You need a simplified capacity model without hardware planning.

Classic Kafka remains available for existing deployments and appears in the Aiven Console
only for customers who already run Classic services.

## Inkless capabilities

Inkless supports:

- High-throughput workloads by reducing cross-availability zone network traffic with diskless topics.
- Workloads with fluctuating throughput through autoscaling.
- Independent scaling of storage and compute.
- Diskless topics for long-term retention and large datasets.
- A simplified, throughput-based capacity model without hardware planning.


## Existing Classic Kafka services

Existing Classic Kafka services continue to run unchanged.

Classic Kafka remains available only for existing deployments and appears in the
Aiven Console only when a project already includes a Classic Kafka service.

Upgrading or migrating an existing Classic Kafka service to Inkless is not supported at this time.
Service type is fixed at creation. To use Inkless, create a Kafka service and select
Inkless as the service type.
<RelatedPages />

- [Create a Kafka service](/docs/products/kafka/create-kafka-service)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview)
- [AKU plans and scaling](/docs/products/kafka/concepts/inkless-aku)
- [Billing for Inkless](/docs/products/kafka/concepts/inkless-billing)
