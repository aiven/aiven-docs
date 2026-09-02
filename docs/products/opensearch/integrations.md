---
title: Integrations for Aiven for OpenSearch®
sidebar_label: Integrations
---

import RelatedPages from "@site/src/components/RelatedPages";

Connect your Aiven for OpenSearch® service to logs, metrics, and other Aiven services.

## Integrations run in two directions

The log integration sends data into your Aiven for OpenSearch service: it forwards
logs from another Aiven service, such as Aiven for Apache Kafka® or Aiven for
PostgreSQL®, so you can search and analyze them in one place. The Prometheus and
Grafana® integrations do the opposite: they pull metrics and data out of Aiven for
OpenSearch so you can monitor the cluster itself. Combine both directions to route
your service logs into OpenSearch and visualize them in Grafana.

## Things to know

- The log integration always forwards the `MESSAGE` and timestamp fields. Select
  additional log fields if you need more context in your indexed logs.
- Log indices have a retention limit. Raise it if you don't want logs to expire before
  you've had a chance to review them.
- Enable the Prometheus integration first, then find the Prometheus username and
  password in the **Integration endpoints** section of the Aiven Console.
- The Grafana integration requires a running Aiven for Grafana service and manual
  data source setup. It's not a one-click integration like logs.

<RelatedPages/>

- [Manage OpenSearch® log integration](/docs/products/opensearch/howto/opensearch-log-integration)
- [Aiven for OpenSearch® metrics available via
  Prometheus](/docs/products/opensearch/howto/os-metrics)
- [Integrate with Grafana®](/docs/products/opensearch/howto/integrate-with-grafana)
