---
title: Configure Apache Kafka® MirrorMaker 2 metrics sent to Datadog
---

When creating a [Datadog service integration](https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration), customize which metrics are sent to the Datadog endpoint using the [Aiven CLI](/docs/tools/cli).

## Supported metrics

The following metric is supported for each replication flow in
Apache Kafka® MirrorMaker 2:

-   `kafka_mirrormaker_summary.replication_lag`

The metric is tagged with `replication-flow`, enabling independent monitoring of
each one of them.

:::note
The `kafka_mirrormaker_summary.replication_lag` metric is available as a custom metric
in our Datadog integration. As a custom metric, it may be subject to separate
billing by Datadog.
:::

## Variables

Replace the following placeholders in the code samples:

| Variable         | Description                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| `SERVICE_NAME`   | Aiven for Apache Kafka® MirrorMaker 2 service name                                      |
| `INTEGRATION_ID` | ID of the integration between Aiven for Apache Kafka® MirrorMaker 2 service and Datadog |

To find the `INTEGRATION_ID` parameter, run:

```bash
avn service integration-list SERVICE_NAME
```

## Customize metrics for Datadog

Before customizing metrics, ensure a Datadog endpoint is configured and
enabled in your Aiven for Apache Kafka service. For setup instructions,
see
[Send metrics to Datadog](/docs/integrations/datadog/datadog-metrics).
Format any listed parameters as a comma-separated list:
`['value0', 'value1', 'value2', ...]`.

To customize the metrics sent to Datadog, use the `service integration-update`
command with the following customized parameter:

-   `mirrormaker_custom_metrics`: Define the comma-separated list of custom metrics to
    include (currently, only `kafka_mirrormaker_summary.replication_lag` is
    supported).

For example, to send the `kafka_mirrormaker_summary.replication_lag`
metric, execute the following command:

```bash
avn service integration-update                                                    \
    -c 'mirrormaker_custom_metrics=["kafka_mirrormaker_summary.replication_lag"]' \
    INTEGRATION_ID
```

After updating settings, view the collected metrics in your Datadog explorer.

## Related pages

- [Datadog and Aiven](/docs/integrations/datadog)
