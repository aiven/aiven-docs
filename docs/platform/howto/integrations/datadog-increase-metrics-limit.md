---
title: Increase metrics limit setting for Datadog
---

Monitoring services and applications are essential to know whether programs work as expected. To get started with monitoring, see [Aiven and Datadog integration](/docs/integrations/datadog/).

Sometimes, you cannot find the metrics you expected, or some values are
missing on dashboards for large service clusters. You can overcome this limitation
and get more metrics from the integration.

## Identify that metrics have been dropped

The following is an example log of a large Apache Kafka® service cluster
where some metrics are missing and cannot be found in the Datadog
dashboards after service integration. These metrics have been dropped by
user Telegraf.

```text
2022-02-15T22:47:30.601220+0000 scoober-kafka-3c1132a3-82 user-telegraf: 2022-02-15T22:47:30Z W! [outputs.prometheus_client] Metric buffer overflow; 3378 metrics have been dropped
2022-02-15T22:47:30.625696+0000 scoober-kafka-3c1132a3-86 user-telegraf: 2022-02-15T22:47:30Z W! [outputs.prometheus_client] Metric buffer overflow; 1197 metrics have been dropped
```

You can address this problem by following the steps below.

## Configure the maximum metric limit

You can set the maximum metric limit for services in the Datadog
integration configuration, where the Datadog agents gather metrics via
`JMX` using the `max_jmx_metrics` option. The value of this metric can
be set to any value between 10 and 100000. The default value is 2000.

:::note
Datadog may also limit the number of custom metrics that can be
received, based on your pricing
[plan](https://docs.datadoghq.com/account_management/billing/custom_metrics/?tab=countrate#allocation)
.
:::

The `max_jmx_metrics` is not exposed in the Aiven Console yet, but you
can change the value for it from the [Aiven
CLI](https://github.com/aiven/aiven-client) using the following
procedure:

1. Find the `SERVICE_INTEGRATION_ID` for your Datadog integration with

   ```bash
   avn sehrvice integration-list --project=PROJECT_NAME SERVICE_NAME
   ```

1. Change the value of `max_jmx_metrics` to the new LIMIT:

   ```bash
   avn service integration-update SERVICE_INTEGRATION_ID --project PROJECT_NAME -c max_jmx_metrics=LIMIT
   ```

:::note
We recommend you gradually increase the value and monitor the memory
usage on the cluster.
:::
