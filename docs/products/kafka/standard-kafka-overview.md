---
title: Standard Kafka overview
---

import RelatedPages from "@site/src/components/RelatedPages";

Standard Kafka is an Aiven for Apache Kafka® service type that stores topic data in object storage through diskless topics.
It is available on Aiven Cloud, runs on
Kafka 4.x and later, and supports classic and diskless topics in the same service.

Standard Kafka is compatible with Apache Kafka APIs and clients.

New customers can create Standard Kafka services. Classic Kafka remains available
only for existing customers.

In the Aiven CLI and advanced configuration, Standard Kafka is still identified with
`inkless`.

## Key differences from classic Kafka

Standard Kafka changes how Kafka services store and manage data:

- **Classic topics:** Tiered storage of classic topics is enforced with local retention
  set at 15 minutes or a 5 GB partition limit.
- **Diskless topics:** Opt-in diskless topics can be used and store all retained data in
  object storage.
- **Managed configuration:** Some broker-level settings use managed defaults.
- **KRaft-based metadata management:** Standard Kafka supports Apache Kafka 4.x and
  later, so all Standard Kafka services use
  [KRaft](/docs/products/kafka/concepts/kraft-mode) for metadata and consensus instead
  of ZooKeeper.
- **Kafka Connect deployment:** Kafka Connect is deployed as a separate service.

## Billing and cost

Aiven bills Standard Kafka services for compute, storage, and network usage as
separate components. Billing depends on your selected service plan and actual usage.

For details on how network usage is measured and priced, see
[Pricing for Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-pricing).

## When to use Standard Kafka

Use Standard Kafka to:

- Scale storage without managing broker disk capacity.
- Retain larger volumes of data for extended periods.
- Scale and recover clusters faster than fixed-storage deployments.
- Combine classic and diskless topics in the same service.

## Existing Classic Kafka services

Existing Classic Kafka services continue to run unchanged. You cannot upgrade or
migrate a Classic Kafka service to Standard Kafka. You set the service type when
you create the service and cannot change it later. To use Standard Kafka, create
a Standard Kafka service.

<RelatedPages />

- [Create an Aiven for Apache Kafka® Professional tier service](/docs/products/kafka/get-started/create-kafka-service)
- [Classic Kafka overview](/docs/products/kafka/classic-kafka-overview)
- [Pricing for Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-pricing)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
