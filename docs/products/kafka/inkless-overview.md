---
title: Inkless Kafka overview
---

import RelatedPages from "@site/src/components/RelatedPages";

Inkless is an Apache Kafka® service from Aiven for cloud deployments, supporting diskless topics and object storage-backed data retention.

Inkless is available on Aiven Cloud and Bring Your Own Cloud (BYOC) deployments. It runs
on Kafka 4.x and supports both classic and diskless topics within the same service.
Classic Kafka is available only for existing, eligible projects.

Inkless remains compatible with standard Kafka APIs and clients.

## Key differences from classic Kafka

Inkless changes how Kafka services store and manage data:

- **Diskless topics:** Opt-in diskless topics store all retained data in object storage.
- **Classic topics:** Data storage and retention are managed automatically by the service.
- **Managed configuration:** Some broker-level settings use managed defaults.
- **KRaft-based metadata management:** Inkless uses
  [KRaft](/docs/products/kafka/concepts/kraft-mode) for metadata and consensus, replacing
  ZooKeeper.
- **Kafka Connect deployment:** Kafka Connect is deployed as a separate service.

## Billing and cost

Inkless uses object storage and network traffic differently from Classic Kafka.

- **Diskless topics** store retained data directly in object storage.
- **Internal service components** required for Inkless operation are fully managed by
  Aiven and are not billed separately.

Billing depends on the deployment model (Aiven Cloud or Bring Your Own Cloud), the
selected service capacity, and actual storage and network usage.

## When to use Inkless

Use Inkless when:

- KRaft-based metadata management is required.
- Object storage-backed data retention is needed.
- Diskless topics are required for large datasets or long retention periods.
- Managed defaults are preferred over configuring broker-level settings.

## Existing Classic Kafka services

Existing Classic Kafka services continue to run unchanged.

Classic Kafka remains available for existing deployments and is visible in the Aiven
Console only for projects that already include a Classic Kafka service.

Upgrading or migrating an existing Classic Kafka service to Inkless is not supported at
this time. The cluster type is fixed at service creation. To use Inkless, create a
Kafka service and select Inkless as the cluster type.

<RelatedPages />

- [Create an Inkless Kafka service](/docs/products/kafka/get-started/create-inkless-service)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview)
