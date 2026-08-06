---
title: Network pricing for Aiven for Apache Kafka®
sidebar_label: Network pricing
---

import RelatedPages from "@site/src/components/RelatedPages";

For Standard Kafka services, Aiven bills compute, storage, and network usage separately.
Unlike Classic Kafka, where network usage costs are included in the compute price, Aiven
measures and bills Standard Kafka network usage based on actual traffic through your
Kafka topics.

Network pricing applies to Standard Kafka plans. It does not apply to Classic Kafka
services, including Free and Developer tiers.

## Pricing components

Aiven bills Standard Kafka services across three components:

- **Compute**: The cost of the selected service plan.
- **Storage**: The cost of data retained by the service, based on the amount of data
  stored and for how long.
- **Network usage**: The cost of data produced to and consumed from Kafka topics.

## Network usage

Network usage depends on Kafka topic traffic. Aiven measures data that producers write
to Kafka topics as ingress and data that consumers read from Kafka topics as egress.

In Standard Kafka services, Classic topics and Diskless topics can exist in the same
service.
Aiven measures network usage separately for each topic type. Ingress and egress can have
different rates depending on whether the traffic is for Classic topics or Diskless
topics.

Measured ingress and egress will be higher than just the size of the payload data your
application sends and receives. Kafka protocol overhead, including record headers,
message framing, and retries, can affect measured traffic, as can client batching
behavior. Different client defaults can significantly affect how data is produced and
consumed from the cluster.

### Why egress and ingress differ

Aiven measures the ingress and egress independently. Egress is typically higher as data is usually read by more than one client, or consumed more than once.
Egress depends on how clients consume data. Reading the same
data with multiple consumer groups, repeated reads, retries, or client reconnections all
affect cluster egress.

Your client library and client configuration can also affect traffic. For example, a
client that fetches the same data more than once, uses small fetches, or reconnects
frequently can generate more consumed data than expected.

## Cost estimates

When you create a service, Aiven provides a monthly cost estimate based on your
selected configuration. An estimate is a projection, not a commitment. Your final cost
depends on actual usage during the billing period.

To estimate costs before creating a service, use the
[Kafka pricing calculator](https://aiven.io/kafka).

For instructions, see
[Review the cost estimate](/docs/products/kafka/get-started/create-standard-kafka-service#review-the-cost-estimate).

## View usage

For services with network pricing, the [Aiven Console](https://console.aiven.io) shows
usage information for the current billing period.

To review usage, open the service and go to **Overview** > **Service usage**. You can
review:

- Ingress and egress usage
- Usage split by Classic topics and Diskless topics
- Storage usage
- Predicted usage for the billing period

:::note
The Aiven Console shows usage values in the unit that best fits the size of the
number, for example bytes, KB, MB, GB, or TB. The unit can change as usage grows
during the billing period.
:::

Storage usage reflects both the amount of data stored and how long it's retained. For
example, $0.12 per GB-month is equivalent to $0.000164 per GB-hour, so the Aiven
Console can show storage usage in units such as KB-hours or MB-hours.

The Aiven Console shows network usage separately for Classic topics and Diskless topics.
Predicted usage is based on your usage so far in the billing period. Usage information
shown during the billing period can change as Aiven processes new usage data.

## Cost drivers

The following factors affect your estimated or actual cost:

- **Service plan**: Determines the compute rate.
- **Cloud and region**: Prices vary by region.
- **Topic type**: Classic topics and Diskless topics have different ingress and
  egress rates, so the share of traffic that uses each topic type affects network
  usage costs. For network pricing rates, see the
  [Aiven pricing page](https://aiven.io/pricing).
- **Data produced**: Higher ingress can increase network usage costs, depending on
  the topic type.
- **Data read**: More consumer groups, repeated reads, retries, client
  reconnections, or client configuration can increase egress.
- **Retention period**: Longer retention or higher ingress rates increase storage usage.

## Manage costs

To manage costs, review the factors that affect compute, storage, and network usage:

- Choose a service plan that matches your workload.
- Use Diskless topics for high-throughput workloads that do not require low latency.
- Adjust topic retention to control storage usage.
- Review consumer applications and client configuration if egress is higher than
  expected.
- Monitor usage during the billing period to identify unexpected changes.

<RelatedPages />

- [Create a Standard Kafka service](/docs/products/kafka/get-started/create-standard-kafka-service)
- [Standard Kafka overview](/docs/products/kafka/standard-kafka-overview)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
- [Compare diskless and classic topics](/docs/products/kafka/diskless/concepts/topics-vs-classic)
