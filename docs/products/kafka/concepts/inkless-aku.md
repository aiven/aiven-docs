---
title: AKU plans and scaling
---
import RelatedPages from "@site/src/components/RelatedPages";

Inkless uses Aiven Kafka Units (AKUs) to size Apache Kafka services by throughput instead of hardware resources. An AKU represents the amount of traffic a service can handle. You estimate the expected
throughput when creating the service. This estimate determines the initial AKU level and
the scaling range.

## How AKUs work

- Each AKU corresponds to a specific throughput capacity.
- The initial AKU level is derived from the expected throughput estimate provided during
  service creation.
- The service monitors throughput over time, not momentary spikes.
- When throughput reaches the threshold for the current AKU level, the service scales up
  within your configured limits.
- When throughput remains low for a sustained period, the service scales down.

Scaling changes the number of AKUs in use, which affects AKU-hour billing. Scaling
actions do not affect topic configuration or data retention.

## Throughput measurement

Inkless measures two types of traffic:

- **Ingress:** Data written to topics by producers.
- **Egress:** Data read from topics by consumers, connectors, and mirroring processes.

Both ingress and egress contribute to AKU usage. You can track ingress and egress usage
in the Service utilisation view, which also shows the AKU thresholds.

## Autoscaling limits

Depending on your cloud provider and account, you can configure:

- **Minimum AKUs:** The lowest capacity the service can scale down to.
- **Maximum AKUs:** The highest capacity the service can scale up to.

Inkless scales automatically within these limits. Scaling occurs only when
throughput remains above or below a threshold for a sustained period.

## Storage and AKUs

Storage does not influence AKU scaling:

- Diskless topics write directly to object storage.
- Classic topics use local disk for recent data and move older segments to object storage
  through tiered storage.

Storage and compute scale independently, so you can adjust retention without changing
AKU levels.

## When to adjust AKU ranges

Adjust your AKU limits when:

- Workload throughput increases for sustained periods.
- Traffic spikes begin to persist for longer periods.
- Reducing costs during low-traffic periods requires a lower maximum AKU.
- The workload needs a guaranteed minimum level of throughput.

For details on how AKU usage affects billing, see [Billing](/docs/products/kafka/concepts/inkless-billing).


<RelatedPages />

- [Inkless overview](/docs/products/kafka/concepts/inkless-overview)
- [Billing for Inkless](/docs/products/kafka/concepts/inkless-billing)
- [Create a Kafka service](/docs/products/kafka/create-kafka-service)
