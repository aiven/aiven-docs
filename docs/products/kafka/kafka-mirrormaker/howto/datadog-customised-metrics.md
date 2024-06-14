---
title: Configure Apache Kafka® MirrorMaker 2 metrics sent to Datadog
---

When creating a [Datadog service
integration](https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration),
customize which metrics are sent to the Datadog endpoint using the
[Aiven CLI](/docs/tools/cli).

The following metrics are currently supported for each replication-flow
in Apache Kafka® MirrorMaker 2:

-   `kafka_mirrormaker_summary.replication_lag`

:::note
The metric is tagged with `replication-flow`, enabling
independent monitoring of each one of them.
:::

## Variables

These are the placeholders you will need to replace in the code samples.

 | Variable         | Description                                                                             |
 | ---------------- | --------------------------------------------------------------------------------------- |
 | `SERVICE_NAME`   | Aiven for Apache Kafka® MirrorMaker 2 service name                                      |
 | `INTEGRATION_ID` | ID of the integration between Aiven for Apache Kafka® MirrorMaker 2 service and Datadog |

You can find the `INTEGRATION_ID` parameter by executing this command:

```
avn service integration-list SERVICE_NAME
```

## Customize Apache Kafka® MirrorMaker 2 metrics for Datadog

Before customizing metrics, ensure a Datadog endpoint is configured and
enabled in your Aiven for Apache Kafka service. For setup instructions,
see
[Send metrics to Datadog](/docs/integrations/datadog/datadog-metrics). Format any listed parameters as a comma-separated list:
`['value0', 'value1', 'value2', ...]`.

To customize the metrics sent to Datadog, you can use the
`service integration-update` passing the following customized
parameters:

-   `mirrormaker_custom_metrics`: defining the comma-separated list of custom
    metrics to include (currently, only `kafka_mirrormaker_summary.replication_lag` is
    supported).

For example, to send the `kafka_mirrormaker_summary.replication_lag`
metric, execute the following code:

```
avn service integration-update                                                \
    -c 'mirrormaker_custom_metrics=["kafka_mirrormaker_summary.replication_lag"]' \
    INTEGRATION_ID
```

After you successfully updated and the metrics are collected and sent to
Datadog, you can view them in your Datadog explorer.

Also see [Datadog and Aiven](/docs/integrations/datadog).
