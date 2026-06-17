---
title: End of life for Aiven services
---

Learn about the upcoming end of life (EOL) for select Aiven services, including timelines, actions after end of life, recommended migration options, and next steps.

## Aiven for M3DB

**EOL date**: April 30, 2025

After April 30, 2025, all running Aiven for M3DB
services are powered off and deleted, making data from these services inaccessible.

The recommended alternative for your metrics management and analysis is
[Aiven for Metrics](/docs/products/metrics).

## Aiven for InfluxDB

**EOL date**: April 30, 2025

After April 30, 2025, all active Aiven for InfluxDB services are powered off and
deleted, making data from these services inaccessible.

The recommended alternative for monitoring and observability of your applications and
infrastructure is [Aiven for Metrics](/docs/products/metrics).

## Aiven for Caching

**EOL date**: March 31, 2025

After March 31, 2025, Aiven for Caching services are automatically upgraded to
**Aiven for Valkey™** to maintain Redis compatibility.

The recommended alternative that offers high performance, scalability, and security is
the managed, in-memory NoSQL database service: [Aiven for Valkey™](/docs/products/valkey).

## Aiven for Apache Cassandra®

**EOL date**: January 7, 2026

Since January 7, 2026, Aiven for Apache Cassandra services are no longer available,
and data they hosted is inaccessible.

## Aiven for AlloyDB Omni

**EOL date**: December 5, 2025

Since December 5, 2025, Aiven for AlloyDB Omni services are no longer available,
and data they hosted is inaccessible.

### Migration options

The recommended alternatives to Aiven for AlloyDB Omni are:

- [Aiven for PostgreSQL®](/docs/products/postgresql)
- [Aiven for ClickHouse®](/docs/products/clickhouse)
- [Aiven for MySQL®](/docs/products/mysql)

## Aiven for Dragonfly

### Service impact

#### EOA date: June 17, 2026

After the end-of-availability (EOA) date, you can
**no longer create new services**.
Your existing services remain operational until the EOL date.

#### EOL date: September 30, 2026

After the end-of-life (EOL) date, all running
**services are powered off and deleted**, making data from these services inaccessible.

### Migration

The recommended alternative that offers high performance, scalability, and security is
the managed, in-memory NoSQL database service: [Aiven for Valkey™](/docs/products/valkey).
See the
[guide for migrating from Aiven for Dragonfly to Aiven for Valkey™](/docs/products/valkey/howto/migrate-dragonfly-to-valkey).

To ensure uninterrupted service, complete your migration before the EOL date.
For further assistance, contact the [Aiven support team](mailto:support@aiven.io) or your
account team.
