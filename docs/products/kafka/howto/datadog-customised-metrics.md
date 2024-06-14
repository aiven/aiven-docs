---
title: Configure Apache Kafka® metrics sent to Datadog
---

When creating a [Datadog service
integration](https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration),
customize which metrics are sent to the Datadog endpoint using the
[Aiven CLI](/docs/tools/cli).

The following metrics are currently supported for each topic and
partition in Apache Kafka®:

-   `kafka.log.log_size`
-   `kafka.log.log_start_offset`
-   `kafka.log.log_end_offset`

:::note
All metrics are tagged with `topic` and `partition`, enabling
independent monitoring of each `topic` and `partition`.
:::

## Variables

These are the placeholders you will need to replace in the code samples.

 | Variable         | Description                                                               |
 | ---------------- | ------------------------------------------------------------------------- |
 | `SERVICE_NAME`   | Aiven for Apache Kafka® service name                                      |
 | `INTEGRATION_ID` | ID of the integration between Aiven for Apache Kafka® service and Datadog |

You can find the `INTEGRATION_ID` parameter by executing this command:

```
avn service integration-list SERVICE_NAME
```

## Customize Apache Kafka® metrics for Datadog

Before customizing metrics, ensure a Datadog endpoint is configured and
enabled in your Aiven for Apache Kafka service. For setup instructions,
see
[Send metrics to Datadog](/docs/integrations/datadog/datadog-metrics). Format any listed parameters as a comma-separated list:
`['value0', 'value1', 'value2', ...]`.

To customize the metrics sent to Datadog, you can use the
`service integration-update` passing the following customized
parameters:

-   `kafka_custom_metrics`: defining the comma-separated list of custom
    metrics to include (within `kafka.log.log_size`,
    `kafka.log.log_start_offset` and `kafka.log.log_end_offset`).

For example, to send the `kafka.log.log_size` and
`kafka.log.log_end_offset` metrics, execute the following code:

```
avn service integration-update                                                \
    -c 'kafka_custom_metrics=["kafka.log.log_size","kafka.log.log_end_offset"]' \
    INTEGRATION_ID
```

After you successfully updated and the metrics are collected and sent to
Datadog, you can view them in your Datadog explorer.

Also see [Datadog and Aiven](/docs/integrations/datadog).

## Customize Apache Kafka® consumer metrics for Datadog

[Kafka Consumer
Integration](https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration)
collects metrics for message offsets. To customize the metrics sent from
this Datadog integration to Datadog, you can use the
`service integration-update` passing the following customized
parameters:

-   `include_topics`: Specify a comma-separated list of topics to
    include.

    :::note
    By default, all topics are included.
    :::

-   `exclude_topics`: Specify a comma-separated list of topics to
    exclude.

-   `include_consumer_groups`: Specify a comma-separated list of
    consumer groups to include.

-   `exclude_consumer_groups`: Specify a comma-separated list of
    consumer groups to exclude.

For example, to include topics `topic1` and `topic2`, and exclude
`topic3`, execute the following code:

```
avn service integration-update                                                  \
    -c 'kafka_custom_metrics=["kafka.log.log_size","kafka.log.log_end_offset"]' \
    -c 'include_topics=["topic1","topic2"]'                                     \
    INTEGRATION_ID
```

After you successfully updated and the metrics are collected and sent to
Datadog, you can view them in your Datadog explorer.
