---
title: Service integrations
---

Service integrations provide additional functionality and features by connecting different Aiven services together.

## About service integrations

Service integrations include:

- Metrics integration, which allows sending advanced telemetry data to an
  [Aiven for PostgreSQL®](https://aiven.io/postgresql) database for metrics and
  visualizing them in [Aiven for Grafana®](https://aiven.io/grafana)
- Log integration, which allows sending logs from any Aiven service to
  [Aiven for OpenSearch®](https://aiven.io/opensearch).

:::tip
For help with setting up a service integration or to request an integration type or
endpoint not yet available, contact the [support team](mailto:support@aiven.io)
:::

## Benefits of integrated telemetry

Aiven automatically provides basic host-level resource metrics (CPU,
memory, disk and network) for every service under the **Metrics** tab on
the Aiven Console.

The advanced telemetry feature brings much more detailed,
service-specific metrics to the Aiven user, who can then drill down into
the service behavior and identify issues and performance bottlenecks.

### Service integrations billing

The advanced telemetry data and predefined dashboards do not cost
anything extra, but they require you to have an Aiven for PostgreSQL®
and an Aiven for Grafana® service, which will be billed hourly as
regular Aiven services.

### Can I define my own metrics dashboards?

Yes. You can use the predefined dashboards as a starting point and save
them under a different name or you can build one from scratch.
Dashboards whose title starts with the word \"Aiven\" are automatically
managed, so it is better to name the dashboards differently from that.

### Can I access the telemetry data directly in PostgreSQL?

Yes. The PostgreSQL service is a normal PostgreSQL database service that
can be accessed via any PostgreSQL client software or your own
application or script. You can perform complex queries over the data and
so on.

### Can I add alerts in Grafana for the telemetry data?

Yes. You can add alert thresholds for individual graphs and attach
different alerting mechanisms to them for sending out alerts.
See the [Grafana documentation](/docs/products/grafana) for more information.

## Use service integrations

You can [create service integrations](/docs/platform/howto/create-service-integration) or
start using existing integrations.
