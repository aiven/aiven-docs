---
title: Aiven for OpenSearch® free tier
sidebar_label: Free tier overview
---

import RelatedPages from "@site/src/components/RelatedPages";

Get started with Aiven for OpenSearch® at no cost. The Aiven for OpenSearch free tier is a fully managed service for learning, prototyping, and evaluation. No credit card is required.

## When to use the free tier

Use the free tier to:

- Explore Aiven for OpenSearch concepts with a managed service
- Build or test small search applications
- Evaluate Aiven for OpenSearch before choosing a paid plan
- Test and experiment during early development
- Run small proofs of concept or demonstrations

The free tier supports limited-scale workloads. For production use, longer retention, or
more advanced features, choose a paid plan.

## What the free tier includes

The free tier includes:

- A managed Aiven for OpenSearch cluster with a fixed configuration
- Sample dataset tools for testing indexing and search
- Basic monitoring for metrics and logs

Standard Aiven for OpenSearch clients can connect the same way as they do to paid Aiven
for OpenSearch plans.

## Limitations

Free tier services have the following restrictions.

### Performance and capacity

- Fixed throughput limits for indexing and query traffic
- Fixed storage and performance limits
- Fixed cluster settings

### Features not available

- Service integrations such as logs, metrics, external authentication (SAML, OIDC, JWT)
- Custom dictionary files
- Custom repositories
- Custom domains
- Dynamic disk sizing

### Service restrictions

- One free Aiven for OpenSearch service per organization
- Paid services cannot be reverted to the free tier
- Cloud provider is fixed with a limited set of regions
- Cloud region is fixed: You cannot migrate your free tier service to another region.
- Free tier services are not covered by an SLA
- Maintenance window is fixed.
- Additional disk storage cannot be added.
- Creation available only through the Aiven Console

## How free tier services operate

Free tier Aiven for OpenSearch services operate as follows:

- **Idle shutdown:** The service powers off automatically if no data is indexed or
  queried for 24 hours. Extended inactivity can also trigger a shutdown. You receive a
  notification before shutdown and can power on the service from the Aiven Console.
- **First-use shutdown:** A new free tier service with no first use can power off after
  24 hours.
- **Alerts:** Platform alerts are not routed to Aiven operators.
- **Configuration updates:** Aiven may change the cloud provider, region availability,
  or configuration of free services.

<RelatedPages/>

[Create a free tier Aiven for OpenSearch service](/docs/products/opensearch/howto/create-free-tier-opensearch)
