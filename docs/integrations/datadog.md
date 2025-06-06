---
title: Datadog and Aiven
---

import Note from "@site/static/includes/startup-plan-datadog.md"

[Datadog](https://www.datadoghq.com/) is a monitoring platform, allowing
you to keep an eye on all aspects of your cloud estate. Aiven has
integrations that make it easy to include an Aiven service in your
Datadog dashboards.

## Datadog for metrics

You can send the metrics from any or all of your Aiven services to
Datadog. The integration also supports adding tags to the data, either
for all metrics, or on a per-service basis.

Find out
[how to send your Aiven service metrics to Datadog](/docs/integrations/datadog/datadog-metrics).

:::tip
If you're using Aiven for Apache Kafka® you can also
[customise the metrics sent to Datadog](/docs/products/kafka/howto/datadog-customised-metrics).
:::

<Note/>

## Datadog for logs

The RSyslog integration can be used with any Aiven service to send the
service logs to Datadog. We have a handy guide to show you
[how to ship logs to Datadog from your Aiven service](/docs/integrations/datadog/datadog-logs)
