---
title: AKU plans and scaling
---

Inkless uses Aiven Kafka Units (AKUs) to size Apache Kafka services by throughput instead of hardware resources.
An AKU represents the amount of traffic a service can handle. You select an initial AKU
level when creating the service and define how far the service can scale.

## How AKUs work

- Each AKU corresponds to a specific throughput capacity.
- You set the initial AKU level by choosing the expected throughput during service
  creation.
- The service monitors throughput over time, not momentary spikes.
- When throughput reaches the threshold for the current AKU level, the service scales up
  within your configured limits.
- When throughput stays low, the service scales down.

Scaling changes the number of ACUs in use, which affects ACU-hour billing. Scaling
actions do not affect topic configuration or data retention.

## Throughput measurement

Inkless measures two types of traffic:

- **Ingress:** Data written to topics by producers.
- **Egress:** Data read from topics by consumers, connectors, and mirroring processes.

Both ingress and egress contribute to AKU usage. You can track ingress and egress usage
in the Service utilisation view, which also shows the ACU thresholds.

## Autoscaling limits

You can configure:

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
- Short-term traffic spikes are expected.
- Reducing costs during low-traffic periods requires a lower maximum ACU.
- The workload needs a guaranteed minimum level of throughput.

For details on how ACU usage affects billing, see [Billing](/docs/products/kafka/concepts/inkless-billing).
