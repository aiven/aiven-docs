---
title: End of support for Aiven services
---

Learn about the upcoming end of support for select Aiven services. Review the timelines, actions after end of life, recommended migration options, and next steps.

## Aiven for M3DB

**Timeline**: End of life (EOL) on April 30, 2025

### What happens after EOL

- **Service status:** All running Aiven for M3DB services will be powered off and
  deleted after April 30, 2025. Creating new Aiven for M3DB services will no longer be
  possible.
- **Data access:** After services are powered off, data will no longer be accessible.

### Recommended alternative

Aiven for Metrics provides a seamless replacement for time-series workloads.

- **Aiven for Metrics**: Provides a seamless transition for time-series workloads,
  supporting PromQL for query compatibility. Refer to the
  [migration guide for Aiven for M3DB to Aiven for Metrics](https://aiven.io/docs/products/metrics/howto/migrate-m3db-thanos)
  for detailed setup instructions.
- **Dashboard migration:** If you use Aiven’s pre-made Metrics and Grafana dashboard
  integration, your dashboards will migrate automatically. Custom dashboards require
  manual updates.

To ensure uninterrupted service, complete your migration to Aiven for Metrics before
April 30, 2025. For further assistance, contact
[Aiven support team](mailto:support@aiven.io) or your [sales team](mailto:sales@aiven.io).

## Aiven for InfluxDB

**Timeline**: End of life (EOL) on April 30, 2025

### What happens after EOL

- **Service status:** All active Aiven for InfluxDB services will be powered off and
  deleted after April 30, 2025. Creating new Aiven for InfluxDB services will no longer
  be possible.
- **Data access:** Data from powered-off services will no longer be accessible.

### Recommended alternative

- **Aiven for Metrics**: Transition for time-series data storage and querying. Refer to
  the [migration guide for Aiven for InfluxDB to Aiven for Metrics](docs/products/metrics/howto/migrate-influxdb-thanos)
  for detailed setup instructions.
- **Aiven for PostgreSQL**: Provides support for both relational and time-series data,
  though a direct migration path is not available. Refer to the
  [Aiven for PostgreSQL documentation](https://aiven.io/docs/products/postgresql) for
  more information.

### Download data

To retain your InfluxDB data, download a backup before April 30, 2025:

- **Console**: In the Aiven Console, select your InfluxDB service and choose **Download data**.
- **API**: Use the Aiven API to create and download a backup.
