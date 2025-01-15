---
title: End of life for Aiven services
---

Learn about the upcoming end of life (EOL) for select Aiven services, including timelines, actions after end of life, recommended migration options, and next steps.

## Aiven for M3DB

**EOL date**: April 30, 2025

### Service impact

After April 30, 2025, all running Aiven for M3DB
services are powered off and deleted, making data from these services inaccessible.

:::note
If your project includes an Aiven for M3DB service, you can continue creating new
Aiven for M3DB services in the same project. If your project did not previously include
an Aiven for M3DB service, you cannot create new Aiven for M3DB services. This applies
until the end of life (EOL) date on April 30, 2025.
:::

### Migration options

- **Aiven for Metrics**: Provides a seamless transition for time-series workloads,
  supporting PromQL for query compatibility. See the
  [migration guide for Aiven for M3DB to Aiven for Metrics](https://aiven.io/docs/products/metrics/howto/migrate-m3db-thanos)
  for instructions.
- **Dashboard migration:** If you use Aiven’s pre-configured Metrics and Grafana dashboard
  integration, your dashboards migrate automatically. Custom dashboards need to be
  manually reconfigured.

To ensure uninterrupted service, complete your migration to Aiven for Metrics before
April 30, 2025. For further assistance, contact
[Aiven support team](mailto:support@aiven.io) or your account team.

## Aiven for InfluxDB

**EOL date**: April 30, 2025

### Service impact

After April 30, 2025, all active Aiven for InfluxDB services are powered off and
deleted, making data from these services inaccessible.

### Migration options

- **Aiven for Metrics**: A recommended option for time-series data storage and querying.
  See the
  [migration guide for Aiven for InfluxDB to Aiven for Metrics](/docs/products/metrics/howto/migrate-influxdb-thanos)
  for instructions.
- **Aiven for PostgreSQL**: Supports both relational and time-series data, though a
  direct migration path is not available. Refer to the
  [Aiven for PostgreSQL documentation](/docs/products/postgresql) for
  more information.

To ensure uninterrupted service, complete your migration to Aiven for Metrics before
April 30, 2025. For further assistance, contact
[Aiven support team](mailto:support@aiven.io) or your account team.

### Download data

To keep your InfluxDB data, download a backup before April 30, 2025. You can use the
Aiven Console, Aiven API, or Aiven CLI to download the data. For detailed instructions,
see [Download InfluxDB data](/docs/products/metrics/howto/download-influxdb-data).

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
