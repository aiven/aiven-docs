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

### Service impact

- **End of availability (EOA)**: February 15, 2025

  After this date, you can no longer create new Aiven for Caching services. Existing
  services continue to operate until the end of life (EOL) date.

- **End of life (EOL)**: March 31, 2025

  On this date, all active Aiven for Caching services are automatically upgraded
  to **Aiven for Valkey** to maintain Redis compatibility. Any powered-off Aiven for
  Caching services are permanently deleted, making data from these services
  inaccessible.

### Migration options

The recommended alternative to Aiven for Caching is **Aiven for Valkey**. Aiven for
Valkey is fully compatible with Aiven for Caching, allowing your existing applications
and workflows to operate without modification. Essential settings, including DNS, URLs,
ACLs, and user configurations, remain unchanged, ensuring minimal impact on your
infrastructure and workflows.

For upgrade instructions, see
[Upgrade from Aiven for Caching to Aiven for Valkey](/docs/products/caching/howto/upgrade-aiven-for-caching-to-valkey).

To ensure uninterrupted service, complete your migration to Aiven for Valkey before
March 31, 2025. For further assistance, contact the
[Aiven support team](mailto:support@aiven.io) or your account team.

## Aiven for Apache Cassandra®

**EOL date**: December 31, 2025

- **End of availability (EOA)**: November 30, 2025

  After this date, you can no longer create new Aiven for Apache Cassandra services.
  Existing services continue to operate until the end of life (EOL) date.

- **End of life (EOL)**: December 31, 2025

  After December 31, 2025, all active Aiven for Apache Cassandra services are powered off
  and deleted, making data from these services inaccessible.

To ensure uninterrupted service, complete your migration out of Aiven for Apache Cassandra
before December 31, 2025. For further assistance, contact your account team.
