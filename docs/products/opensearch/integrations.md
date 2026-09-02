---
title: Integrations for Aiven for OpenSearch®
sidebar_label: Integrations
---

import RelatedPages from "@site/src/components/RelatedPages";

Connect your Aiven for OpenSearch® service to logs, metrics, and other Aiven services.

## Integrations run in two directions

The [log integration](/docs/products/opensearch/howto/opensearch-log-integration)
sends data into your Aiven for OpenSearch service. It forwards logs from another
Aiven service, such as Aiven for Apache Kafka® or Aiven for PostgreSQL®, so you can
search and analyze them in one place. The
[Prometheus](/docs/products/opensearch/howto/os-metrics) and
[Grafana®](/docs/products/opensearch/howto/integrate-with-grafana) integrations do
the opposite. They pull metrics and data out of Aiven for OpenSearch so you can
monitor the cluster itself. Combine both directions to route your service logs into
OpenSearch and visualize them in Grafana.

## Things to know

- The log integration always forwards the `MESSAGE` and timestamp fields, on top of
  whichever additional fields you select, and its index retention limit is
  configurable so logs don't expire before you've had a chance to review them.
- Prometheus credentials for your OpenSearch metrics live in the
  **Integration endpoints** section of the Aiven Console, once the integration itself
  is enabled at the project level.
- Grafana needs a data source pointed at your OpenSearch connection details before it
  can visualize anything, since the integration doesn't wire that up for you the way
  the log integration does.

<RelatedPages/>

- [Manage OpenSearch® log integration](/docs/products/opensearch/howto/opensearch-log-integration)
- [Aiven for OpenSearch® metrics available via
  Prometheus](/docs/products/opensearch/howto/os-metrics)
- [Integrate with Grafana®](/docs/products/opensearch/howto/integrate-with-grafana)
