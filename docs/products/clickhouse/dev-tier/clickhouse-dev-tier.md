---
title: Aiven for ClickHouse® Developer tier
sidebar_label: Developer tier overview
description: Learn about the Aiven for ClickHouse Developer tier, including features, specifications, limitations, and upgrade options.
keywords: [clickhouse developer tier, clickhouse dev tier, clickhouse prototype, developer-4]
---

import RelatedPages from "@site/src/components/RelatedPages";

The Aiven for ClickHouse® Developer tier is a low-cost, always-on, single-node ClickHouse service.
Use it for learning, development, prototypes, side projects, and small analytics
workloads.

As your requirements grow, you can upgrade to a higher service tier.

To create a service, see
[Create an Aiven for ClickHouse® Developer tier service](/docs/products/clickhouse/dev-tier/create-dev-tier-clickhouse-service).

## When to use the Developer tier

Use the Developer tier for:

- Learning and evaluating ClickHouse
- Development and prototypes
- Side projects
- Small analytics workloads and dashboards

The Developer tier isn't intended for production workloads or applications that serve end
users.

## What the Developer tier includes

- Single-node ClickHouse service
- Daily backups, with one backup retained
- Public endpoint with TLS
- Encryption at rest and in transit
- Role-based access control
- Metrics and logs
- Multiple logical databases
- Aiven and third-party service integrations
- Basic support
- Always-on operation without idle pausing

The Developer tier has no integration restrictions. For example, you can integrate a
Developer tier service with Aiven for PostgreSQL®.

## Limits and specifications

| Specification              | Value                       |
| -------------------------- | --------------------------- |
| Plan                       | `developer-4`               |
| Price                      | $43/month                   |
| Nodes                      | 1                           |
| CPU                        | 2 shared vCPUs              |
| RAM                        | 4 GB                        |
| Storage                    | 25 GB fixed local storage   |
| Maximum concurrent queries | 50                          |
| Maximum connections        | 1,000                       |
| Backups                    | Daily, one retained         |
| Cloud provider             | DigitalOcean                |
| High availability          | Not supported               |
| SLA                        | None                        |
| VPC peering                | Not supported               |
| Static IP addresses        | Not supported               |
| Tiered storage             | Not supported               |
| ClickHouse version         | Current default version     |
| Support                    | Basic                       |

Aiven bills hourly. The estimated monthly cost of $43 assumes 730 hours. The price
includes storage, backups, and networking.

## Limitations

- The service has a single node, without replication or high availability.
- The service runs on DigitalOcean only.
- Storage is fixed at 25 GB. You can't expand storage or use tiered storage.
- CPU resources are shared.
- VPC peering and static IP addresses aren't supported.
- You can't select the ClickHouse version when you create the service.
- The service retains one daily backup.
- You can't downgrade from the Startup plan or higher to the Developer tier.
- Forking isn't supported. To get a copy at the same size, create a new Developer tier
  service and load your data. To move to a larger plan, migrate or upgrade the service
  instead.

## Storage and memory considerations

The service stays available when it reaches its disk or memory limits. Inserts might be
rejected temporarily. When this happens, ClickHouse returns an error in the query
response to your client. This is expected behavior at the plan's limits.

ClickHouse needs free disk space for background merges and other operations. When disk
space is low, inserts might be rejected while merges complete. Reads aren't affected.

Large inserts might exceed available memory. Load data in smaller batches.

If an insert fails:

- If the error reports insufficient disk space, retry after background merges complete.
  If the error continues, reduce the amount of stored data or upgrade to the next
  service tier.
- If the error reports that the memory limit was exceeded, retry using smaller insert
  batches. If it continues, upgrade to the next service tier.

## Upgrade to a higher service tier

Upgrade when you need:

- More compute or storage
- Larger inserts or more demanding queries
- Additional networking capabilities
- Other cloud providers
- High availability, which requires the Business plan or higher
- An SLA

You can upgrade to the Startup plan or higher. Because these plans aren't available on
DigitalOcean, your service migrates to another cloud provider when you upgrade. Your
credentials and Aiven DNS records don't change, so your connection details stay the same.

You can't downgrade to the Developer tier after you upgrade.

For instructions, see
[Change the plan for your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/change-service-plan).

<RelatedPages />

- [Create an Aiven for ClickHouse® Developer tier service](/docs/products/clickhouse/dev-tier/create-dev-tier-clickhouse-service)
- [Get started with Aiven for ClickHouse®](/docs/products/clickhouse/get-started)
- [Aiven for ClickHouse® limits and limitations](/docs/products/clickhouse/reference/limitations)
- [Change the plan for your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/change-service-plan)
