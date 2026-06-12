---
title: Inkless Kafka overview
---

import RelatedPages from "@site/src/components/RelatedPages";

Inkless is an Apache Kafka® service from Aiven for cloud deployments, supporting diskless topics and object storage-backed data retention.

Inkless is available on Aiven Cloud and Bring Your Own Cloud (BYOC) deployments. It runs
on Kafka 4.x and supports both classic and diskless topics within the same service.
Classic Kafka remains available and can be selected when creating a new Kafka service.

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

Diskless topics store retained data directly in object storage. Aiven manages the
internal service components that Inkless requires and does not bill them separately.

For eligible Inkless services, Aiven bills compute, storage, and network usage as
separate components. Billing also depends on the deployment model, selected service
plan, and actual usage.

For more information about how network usage is measured and priced, see
[Network pricing for Aiven for Apache Kafka®](/docs/products/kafka/concepts/network-pricing).

## When to use Inkless

Use Inkless to:

- Scale storage without managing broker disk capacity.
- Retain large volumes of data for extended periods.
- Scale and recover clusters faster than fixed-storage deployments.
- Combine classic and diskless topics in the same service.

## Existing Classic Kafka services

Existing Classic Kafka services continue to run unchanged.

Upgrading or migrating an existing Classic Kafka service to Inkless is not supported at
this time. The cluster type is fixed at service creation. To use Inkless, create a
Kafka service with Inkless as the cluster type.

<RelatedPages />

- [Create an Inkless Kafka service](/docs/products/kafka/get-started/create-inkless-service)
- [Network pricing for Aiven for Apache Kafka®](/docs/products/kafka/concepts/network-pricing)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
