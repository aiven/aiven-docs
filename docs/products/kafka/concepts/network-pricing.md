---
title: Network pricing for Aiven for Apache Kafka®
sidebar_label: Network pricing
---

import RelatedPages from "@site/src/components/RelatedPages";

For Standard Kafka services, Aiven bills compute, storage, and network usage separately.
Instead of including assumed network usage in the compute price, Aiven measures and
prices network usage based on traffic through your Kafka topics.

The network pricing model shows how service capacity, retained data, and topic traffic
contribute to your monthly cost.

Network pricing is available on Standard Kafka plans. It does not apply to Classic Kafka
services, including services on Free and Developer tiers.

## Pricing components

Aiven bills Standard Kafka services across three components:

- **Compute**: The cost of the selected service plan.
- **Storage**: The cost of data retained by the service.
- **Network usage**: The cost of data produced to and consumed from Kafka topics.

## Network usage

Network usage depends on Kafka topic traffic. Aiven measures data that producers write
to Kafka topics as ingress and data that consumers read from Kafka topics as egress.

In Standard Kafka services, Classic topics and Diskless topics can exist in the same
service.
Aiven measures network usage separately for each topic type. Ingress and egress can have
different rates depending on whether the traffic is for Classic topics or Diskless
topics.

Measured ingress and egress can be higher than the payload data your application sends
and receives. Kafka protocol overhead, including record headers, message framing, and
retries, can affect measured traffic, as can client batching behavior.

### Why egress and ingress differ

Aiven measures ingress and egress independently, so your egress total does not need to
match your ingress total. Egress depends on how clients consume data. Reading the same
data with multiple consumer groups, repeated reads, retries, or client reconnections can
increase egress.

Your client library and client configuration can also affect egress. For example, a
client that fetches the same data more than once, uses small fetches, or reconnects
frequently can generate more consumed data than expected. Aiven measures this traffic as
egress because it is data the Kafka service sends to the client.

## Cost estimates

When you create a service, Aiven provides a monthly cost estimate based on your
selected configuration. An estimate is a projection, not a commitment. Your final cost
depends on actual usage during the billing period.

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

The Aiven Console shows network usage separately for Classic topics and Diskless topics.
Predicted usage estimates future usage for the billing period based on recent usage
patterns. Usage information shown during the billing period can change as Aiven processes
new usage data.

For a breakdown by topic type and direction, go to **Billing** > **Reports**. The report
separates Classic and Diskless topic usage, and ingress and egress.

## Cost drivers

The following factors affect your estimated or actual cost:

- **Service plan**: Determines the compute rate.
- **Cloud and region**: Prices vary by region.
- **Topic type**: Classic topics and Diskless topics have different ingress and
  egress rates. For network pricing rates, see the
  [Aiven pricing page](https://aiven.io/pricing).
- **Traffic split**: The share of traffic that uses Classic topics or Diskless topics
  affects network usage costs.
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

## Fair usage

Network architectures that generate unusually high costs can result in additional
charges under Aiven's fair usage policy. Examples include inter-region traffic, internet
traffic, and excessive cross-availability zone traffic for Diskless topics.

If your service generates unusually high network costs, Aiven contacts you to discuss
suitable adjustments.

<RelatedPages />

- [Create a Standard Kafka service](/docs/products/kafka/get-started/create-standard-kafka-service)
- [Standard Kafka overview](/docs/products/kafka/standard-kafka-overview)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
- [Compare diskless and classic topics](/docs/products/kafka/diskless/concepts/topics-vs-classic)
