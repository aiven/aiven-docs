---
title: Aiven for Apache Kafka® free tier
sidebar_label: Free tier overview
keywords: [kafka free tier, kafka free, kafka trial]
---

import RelatedPages from "@site/src/components/RelatedPages";

Get started with Apache Kafka at no cost. The Aiven for Apache Kafka free tier is a fully managed service for learning, prototyping, and evaluation, and it does not require a credit card.

## When to use the free tier

Use the free tier to:

- Explore Apache Kafka concepts with a managed service
- Build or test small event-driven applications
- Evaluate Aiven for Apache Kafka before choosing a paid plan
- Test end-to-end message flow during early development
- Run small proof-of-concepts or demonstrations

The free tier supports limited-scale workloads. For production use, longer retention, or
features such as Apache Kafka Connect, choose a paid plan.

## What the free tier includes

The free tier includes:

- A managed Kafka cluster with a fixed configuration
- Karapace Schema Registry
- Approximately 26 GB of local storage per node
- Sample data generation for testing message flow
- Basic monitoring for metrics and logs

Standard Kafka clients can connect the same way as they do to paid Aiven for Apache Kafka
plans.

## Limitations

Free tier services have the following restrictions.

### Performance and capacity

- Maximum throughput of 250 KiB/s total across all produce and consume operations
- Up to 10 topics with 1 partition each
- Fixed data retention settings
- Limited number of users and ACLs

### Features not available

- Apache Kafka Connect
- Apache MirrorMaker 2
- Tiered storage
- Service integrations such as logs, metrics, and authentication
- Custom configuration for certain Kafka settings

### Service restrictions

- One free Kafka service per project or organization
- Paid services cannot be downgraded to the free tier
- Cloud provider is fixed, with a limited set of regions
- Free tier services are not covered by an SLA
- The maintenance window is fixed
- Additional disk storage cannot be added
- Programmatic creation using the Aiven CLI, Aiven Provider for Terraform, or the Aiven
  API is not supported

## How free tier services operate

Free tier Kafka services operate as follows:

- **Idle shutdown:** If no data is produced or consumed for 24 hours, the service is
  powered off automatically. You receive a notification before shutdown, and you can power on
  the service from the Aiven Console.
- **Leader election:** The service continues operating after a node failure by using a
  simplified leader election mode. This ensures availability for small, non-production
  workloads.
- **Alerts:** Platform alerts are not routed to Aiven operators.
- **Configuration updates:** Aiven may change the cloud provider, region availability,
  or configuration of free services.

<RelatedPages/>

[Create free tier Aiven for Apache Kafka service](/docs/products/kafka/free-tier/create-free-tier-kafka-service)
