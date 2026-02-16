---
title: Aiven for Apache Kafka® free tier
sidebar_label: Free tier overview
keywords: [kafka free tier, kafka free, kafka trial]
---

import RelatedPages from "@site/src/components/RelatedPages";

Get started with Apache Kafka® at no cost. The Aiven for Apache Kafka® free tier is a fully managed service for learning, prototyping, and evaluation. No credit card is required.

## When to use the free tier

Use the free tier to:

- Explore Apache Kafka concepts with a managed service
- Build or test small event-driven applications
- Evaluate Aiven for Apache Kafka before choosing a paid plan
- Test end-to-end message flow during early development
- Run small proofs of concept or demonstrations

The free tier supports limited-scale workloads. For production use, longer retention, or
features such as Aiven for Apache Kafka® Connect, choose a paid plan.

## What the free tier includes

The free tier includes:

- A managed Kafka cluster with a fixed configuration
- Karapace Schema Registry
- Streaming throughput up to 250 KiB/s ingress and 250 KiB/s egress
- Sample data generation for testing message flow
- Basic monitoring for metrics and logs

Standard Kafka clients can connect the same way as they do to paid Aiven for Apache Kafka
plans.

## Limitations

Free tier services have the following restrictions.

### Performance and capacity

- Fixed throughput limits for produce and consume traffic
- Up to 5 topics, each with two partitions
- Fixed data retention settings
- Limited number of users and ACLs

### Features not available

- Aiven for Apache Kafka® Connect
- Aiven for Apache Kafka® MirrorMaker 2
- Tiered storage
- Service integrations such as logs, metrics, and authentication
- Custom configuration for certain Kafka settings

### Service restrictions

- One free Kafka service per organization
- Paid services cannot be reverted to the free tier
- Cloud provider is fixed with a limited set of regions
- Free tier services are not covered by an SLA
- Maintenance window is fixed
- Additional disk storage cannot be added
- Creation available only through the Aiven Console

## How free tier services operate

Free tier Kafka services operate as follows:

- **Idle shutdown:** The service powers off automatically if no data is produced or
  consumed for 24 hours. Extended inactivity can also trigger a shutdown. You receive a
  notification before shutdown and can power on the service from the Aiven Console.
- **Leader election:** The service continues operating after a node failure by using a
  simplified leader election mode. This ensures availability for small, non-production
  workloads.
- **Alerts:** Platform alerts are not routed to Aiven operators.
- **Configuration updates:** Aiven may change the cloud provider, region availability,
  or configuration of free services.

<RelatedPages/>

[Create a free tier Aiven for Apache Kafka® service](/docs/products/kafka/free-tier/create-free-tier-kafka-service)
