---
title: Configure Apache Kafka® metrics sent to Datadog
---

import RelatedPages from "@site/src/components/non-swizzled/RelatedPages";

When creating a [Datadog service integration](https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration), you can customize which metrics are sent to the Datadog endpoint using the [Aiven CLI](/docs/tools/cli).

## Prerequisites

- A running Aiven for Apache Kafka service
- A Datadog account
- A Datadog [API key](https://docs.datadoghq.com/account_management/api-app-keys/)
- A [Datadog integration endpoint](/docs/integrations/datadog/datadog-metrics#add-a-datadog-metrics-integration-to-an-aiven-service)

:::note
Datadog integration is not available for new Startup-2 plans in Aiven for Apache Kafka.
Upgrade to a Business-4 plan or higher to use Datadog. Existing services with
Datadog integration are not affected.

If you have questions, contact [Aiven Support](mailto:support@aiven.io).
:::

## Supported metrics

The following metrics are currently supported for each topic and
partition in Apache Kafka®:

-   `kafka.log.log_size`
-   `kafka.log.log_start_offset`
-   `kafka.log.log_end_offset`

All metrics are tagged with `topic` and `partition`, enabling independent monitoring
of each `topic` and `partition`.

## Variables

Replace the following placeholders in the code samples:

 | Variable         | Description                                                               |
 | ---------------- | ------------------------------------------------------------------------- |
 | `SERVICE_NAME`   | Aiven for Apache Kafka® service name                                      |
 | `INTEGRATION_ID` | ID of the integration between Aiven for Apache Kafka® service and Datadog |

To find the `INTEGRATION_ID` parameter, run:

```bash
avn service integration-list SERVICE_NAME
```

## Customize metrics for Datadog

Before customizing metrics, configure and enable a Datadog endpoint in your
Aiven for Apache Kafka service.
For setup instructions, see
[Send metrics to Datadog](/docs/integrations/datadog/datadog-metrics).

Format any listed parameters as a comma-separated list:
`['value0', 'value1', 'value2', ...]`.

To customize the metrics sent to Datadog, use the `service integration-update` command
with the `kafka_custom_metrics` parameter. Specify a comma-separated list of custom
metrics, such as `kafka.log.log_size`, `kafka.log.log_start_offset`, and
`kafka.log.log_end_offset`.

For example, to send the `kafka.log.log_size` and
`kafka.log.log_end_offset` metrics, run:

```bash
avn service integration-update                                                \
    -c 'kafka_custom_metrics=["kafka.log.log_size","kafka.log.log_end_offset"]' \
    INTEGRATION_ID
```

After updating settings, view the collected metrics in your Datadog explorer.

## Customize consumer metrics for Datadog

[Apache Kafka Consumer
Integration](https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration)
collects metrics for message offsets. To customize the metrics sent from
this Datadog integration to Datadog, use the `service integration-update` command with
the following parameters:

- `include_topics`: A comma-separated list of topics to include.

  :::note
  By default, all topics are included.
  :::

- `exclude_topics`: A comma-separated list of topics to exclude.

  :::warning
  To use `exclude_topics`, you must specify at least one `include_consumer_groups`
  value. Otherwise, `exclude_topics` does not take effect.
  :::

- `include_consumer_groups`: A comma-separated list of consumer groups to include.

- `exclude_consumer_groups`: A comma-separated list of consumer groups to exclude.

For example, to include topics `topic1` and `topic2`, and exclude
`topic3`, run:

```bash
avn service integration-update                                                  \
    -c 'kafka_custom_metrics=["kafka.log.log_size","kafka.log.log_end_offset"]' \
    -c 'include_topics=["topic1","topic2"]'                                     \
    INTEGRATION_ID
```

After updating settings, view the collected metrics in your Datadog explorer.

<RelatedPages/>

- [Datadog and Aiven](/docs/integrations/datadog)
