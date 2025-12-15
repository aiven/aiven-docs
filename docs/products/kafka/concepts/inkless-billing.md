---
title: Billing
sidebar_label: Billing
---

Inkless uses a usage-based billing model. Charges are based on compute measured in Aiven Kafka Units (AKUs), storage, and data movement used by the service.

:::note
Inkless BYOC deployments continue to use the existing plans-based pricing model.
:::

## AKU-hours

Compute charges are based on AKU-hours.

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
Only topic ingress and egress are billed. Internal Kafka replication traffic is not billed.
:::
