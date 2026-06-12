---
title: Network pricing for Aiven for Apache Kafka®
sidebar_label: Network pricing
---

import RelatedPages from "@site/src/components/RelatedPages";

For eligible Inkless Kafka services, Aiven bills compute, storage, and network usage as
separate components. Instead of including assumed network usage in the compute price,
network usage is priced separately based on traffic through your Kafka topics.

This shows how service capacity, retained data, and topic traffic contribute to your
monthly cost.

Network pricing is enabled at the organization level and shown in the
[Aiven Console](https://console.aiven.io) where available. It does not apply to Classic
Kafka services or to Free and Developer tier Inkless services.

## Pricing components

An Inkless Kafka service is billed across three components:

- **Compute**: The cost of the selected service plan.
- **Storage**: The cost of data retained by the service.
- **Network usage**: The cost of data produced to and consumed from Kafka topics.

## Network usage

Network usage is based on Kafka topic traffic. Data produced to Kafka topics is measured
as ingress. Data consumed from Kafka topics is measured as egress.

In Inkless services, Classic topics and Diskless topics can exist in the same service.
Network usage is measured separately for each topic type. Ingress and egress can have
different rates depending on whether the traffic is for Classic topics or Diskless
topics.

Measured ingress and egress can be higher than the payload data your application sends
and receives. Kafka protocol overhead, including record headers, message framing, and
retries, can affect measured traffic, as can client batching behavior.

### Why egress and ingress differ

Ingress and egress are measured independently, so your egress total does not need to
match your ingress total. Egress depends on how data is consumed. Reading the same data
with multiple consumer groups, repeated reads, retries, or client reconnections can
increase egress.

Your client library and client configuration can also affect egress. For example, a
client that fetches the same data more than once, uses small fetches, or reconnects
frequently can generate more consumed data than expected. This traffic is measured as
egress because it is data sent from the Kafka service to the client.

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

- **Service plan**: Determines the compute rate.
- **Cloud and region**: Prices vary by region.
- **Topic type**: Classic topics and Diskless topics have different ingress and
  egress rates. For current network pricing rates, see the
  [Aiven pricing page](https://aiven.io/pricing).
- **Traffic split**: The share of traffic that uses Classic topics or Diskless topics
  affects network usage costs.
- **Data produced**: Higher ingress can increase network usage costs, depending on
  the topic type.
- **Data consumed**: More consumer groups, repeated reads, retries, client
  reconnections, or client configuration can increase egress.
- **Retention period**: Longer retention or higher ingress rates increase storage usage.

## Manage costs

To manage costs, review the factors that affect compute, storage, and network usage:

- Choose a service plan that matches your workload.
- Use Diskless topics for suitable workloads.
- Adjust retention to control storage usage.
- Review consumer applications and client configuration if egress is higher than
  expected.
- Monitor usage during the billing period to identify unexpected changes.

## Limitations

Network surcharges, such as inter-region egress, internet egress, cross-AZ traffic, or
VPC-related traffic, are not included in the initial release.

<RelatedPages />
