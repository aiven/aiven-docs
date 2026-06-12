---
title: Network pricing for Aiven for Apache Kafka®
sidebar_label: Network pricing
---

import RelatedPages from "@site/src/components/RelatedPages";

For eligible Kafka services, billing separates compute, storage, and network usage.
Instead of including assumed network usage in the price, network usage is measured and priced
based on traffic through your Kafka topics.

Network pricing is enabled at the organization level and shown in the
[Aiven Console](https://console.aiven.io) where available. It does not apply to Classic
Kafka services, including services on Free and Developer tiers.

## Pricing components

Applicable Kafka service are billed across three components:

- **Compute**: The cost of the selected service plan.
- **Storage**: The cost of data retained by the service.
- **Network usage**: The cost of data produced to and consumed from Kafka topics.

## Network usage

Network usage is based on Kafka topic traffic. Data produced to Kafka topics is data ingress. Data consumed from Kafka topics is data egress.

Classic topics and Diskless topics can exist in the same cluster (service).
Network usage is measured separately for each topic type. Ingress and egress can have
different price rates depending on whether the traffic is for Classic topics or Diskless
topics.

Measured ingress and egress can be higher than the payload data your application sends
and receives. Kafka protocol overhead, including record headers, message framing, and
retries, can affect traffic volume, as can client batching behavior.

### Why egress and ingress differ

Ingress and egress are measured independently, so your egress total does not need to
match your ingress total. Egress depends on how data is consumed. Reading the same data
with multiple consumer groups, repeated reads, retries, or client reconnects will
cause egress.

Your client library and client configuration can also affect egress traffic levels. For example, a
client that fetches the same data more than once, uses small fetches, or reconnects
frequently can generate more consumed data than expected.

## Cost estimates

When you create a service, Aiven provides a monthly cost estimate based on your
selected configuration. An estimate is a projection, not a commitment. Your final cost
depends on actual usage during the billing period.

For instructions, see
[Review the cost estimate](/docs/products/kafka/get-started/create-inkless-service#review-the-cost-estimate).

## View usage

For services with network pricing, the [Aiven Console](https://console.aiven.io) shows
usage information for the current billing period.

To review usage, open the service and go to **Overview** >
**Service utilization**. You can review:

- Ingress and egress usage
- Usage split by Classic topics and Diskless topics
- Storage usage
- Predicted usage for the billing period

Network usage is shown separately for Classic topics and Diskless topics where
available. Predicted usage estimates future usage for the billing period based on
recent usage patterns. Usage information shown during the billing period can change as
new usage data is processed.

## Cost drivers

The following factors affect your estimated or actual cost:

- **Service plan**: Determines the running compute rate.
- **Cloud and region**: Prices vary by provider and region.
- **Topic type**: Classic topics and Diskless topics have different ingress and
  egress rates. For current network pricing rates, see the
  [Aiven pricing page](https://aiven.io/pricing).
- **Traffic split**: The share of traffic that uses Classic topics or Diskless topics
  affects network usage costs.
- **Data produced**: Higher ingress will increase network usage costs, depending on
  the topic type.
- **Data consumed**: More consumer groups, repeated reads, retries, client
  reconnects, or client configuration all increase egress.
- **Retention period**: Longer retention or higher ingress rates increase the amount of data stored.

## Manage costs

To manage costs, review the factors that affect compute, storage, and network usage:

- Choose a service plan that matches your workload. The Console provides some best practice starting points.
- Use Diskless topics for higher throughput, latency insensitive workloads.
- Adjust topic retention to control storage usage.
- Review consumer applications and client configuration if egress is higher than
  expected. Some library defaults can be much leaner than others.
- Monitor usage during the billing period to identify unexpected changes.

## Limitations

Expensive networking architectures may be flagged as breach of our fair usage policy. In such a case we will contact you to discuss suitable adjustments. This includes but is not limited to inter-regional traffic, to-internet traffic, or excessive inter-az traffic on diskless topics.

<RelatedPages />
