---
title: Inkless overview
---

import RelatedPages from "@site/src/components/RelatedPages";

Inkless is Aiven’s cloud-native Apache Kafka® service that supports diskless topics and object storage-backed data retention, while remaining compatible with standard Kafka APIs and clients.

Inkless is the default Kafka cluster type for Aiven Cloud projects. It runs on Kafka 4.x and
supports both classic and diskless topics within the same service. Classic Kafka is available
only for existing, eligible projects.

## Key differences from classic Kafka

Inkless changes how Kafka services store and manage data:

- **Diskless topics:** Opt-in diskless topics store all retained data in object storage.
- **Tiered storage for classic topics:** Classic topics retain recent data on local disk and
  move older data to object storage.
- **Managed configuration:** Some broker-level settings are managed by Aiven and cannot
  be changed.
- **KRaft-based metadata management:** Inkless uses
  [KRaft](/docs/products/kafka/concepts/kraft-mode) for metadata and consensus, replacing
  ZooKeeper.
- **Service availability:** Inkless is available on selected cloud providers and deployment
  modes.

Diskless topics are available only in Inkless services.

## When to use Inkless

Use Inkless when:

- KRaft-based metadata management is required.
- Object storage-backed data retention is needed.
- Diskless topics are required for large datasets or long retention periods.
- Managed defaults are preferred over configuring broker-level settings.

## Inkless capabilities

Inkless supports:

- Diskless and classic topics
- Mixed workloads within the same service

## Existing Classic Kafka services

Existing Classic Kafka services continue to run unchanged.

Classic Kafka remains available for existing deployments and is visible in the Aiven
Console only for projects that already include a Classic Kafka service.

Upgrading or migrating an existing Classic Kafka service to Inkless is not supported at
this time. Cluster type is fixed at creation. To use Inkless, create a Kafka service and
select Inkless as the cluster type.

<RelatedPages />

- [Create an Inkless Kafka service](/docs/products/kafka/get-started/create-inkless-service)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview)
