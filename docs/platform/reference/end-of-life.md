---
title: End of life for Aiven services
---

Learn about the upcoming end of life (EOL) for select Aiven services, including timelines, actions after end of life, recommended migration options, and next steps.

## Aiven for M3DB

**Timeline**: End of life (EOL) on April 30, 2025

### What happens after EOL

Service status and data access: After April 30, 2025, all running Aiven for M3DB
services are powered off and deleted, making data from these services inaccessible.

### Recommended alternative

Aiven for Metrics provides a seamless replacement for time-series workloads.

- **Aiven for Metrics**: Provides a seamless transition for time-series workloads,
  supporting PromQL for query compatibility. Refer to the
  [migration guide for Aiven for M3DB to Aiven for Metrics](https://aiven.io/docs/products/metrics/howto/migrate-m3db-thanos)
  for instructions.
- **Dashboard migration:** If you use Aiven’s pre-made Metrics and Grafana dashboard
  integration, your dashboards migrate automatically. Custom dashboards need to be
  manually reconfigured.

To ensure uninterrupted service, complete your migration to Aiven for Metrics before
April 30, 2025. For further assistance, contact
[Aiven support team](mailto:support@aiven.io) or your [sales team](mailto:sales@aiven.io).

## Aiven for InfluxDB

**Timeline**: End of life (EOL) on April 30, 2025

### What happens after EOL

Service status and data access: After April 30, 2025, all active Aiven for InfluxDB
services are powered off and deleted, making data from these services inaccessible.

### Recommended alternative

- **Aiven for Metrics**: A recommended option for time-series data storage and querying.
  Refer to
  the [migration guide for Aiven for InfluxDB to Aiven for Metrics](/docs/products/metrics/howto/migrate-influxdb-thanos)
  for instructions.
- **Aiven for PostgreSQL**: Supports both relational and time-series data, though a
  direct migration path is not available. Refer to the
  [Aiven for PostgreSQL documentation](https://aiven.io/docs/products/postgresql) for
  more information.

### Download data

To keep your InfluxDB data, download a backup before April 30, 2025. You can use the
Aiven Console, Aiven API, or Aiven CLI to download the data. For detailed instructions,
see [Download InfluxDB data](/docs/platform/reference/end-of-support).
