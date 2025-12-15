---
title: Inkless billing
sidebar_label: Billing
description: Learn how billing works for Inkless Apache Kafka® on Aiven, including compute billed in AKUs, object storage costs, and topic ingress and egress charges.
---

import RelatedPages from "@site/src/components/RelatedPages";

Inkless uses a usage-based billing model.
You are charged for:

- **Compute**, measured in Aiven Kafka Units (AKUs)
- **Storage**, based on the amount of data retained in object storage
- **Data movement**, based on topic ingress and egress

:::note
Inkless BYOC deployments continue to use the existing plans-based pricing model.
:::

## AKU-hours

Compute charges are measured in AKU-hours.

An AKU (Aiven Kafka Unit) represents the throughput capacity of the service. The service
bills based on the number of AKUs in use over time, calculated in AKU-hours. When the
service scales up or down, the AKU-hour charge updates to match the current AKU level.

For details on how scaling works, see
[AKU plans and scaling](/docs/products/kafka/concepts/inkless-aku).

## Storage

Storage charges are based on the amount of data retained in object storage.

- Diskless topics store all retained data in object storage.
- Classic topics keep a short amount of recent data on local disk before offloading older
  data to object storage.

Local disk used by brokers is not billed.

## Network usage

Network charges apply to:

- **Ingress:** Data written to topics
- **Egress:** Data read by consumers, connectors, or mirroring processes

Network usage is measured at the service level across all topics.

:::note
Only data written to and read from Kafka topics is billed.
Data Kafka replicates between brokers for fault tolerance is not billed.
:::

<RelatedPages />

- [Inkless overview](/docs/products/kafka/concepts/inkless-overview)
- [AKU plans and scaling](/docs/products/kafka/concepts/inkless-aku)
- [Create a Kafka service](/docs/products/kafka/create-kafka-service)
