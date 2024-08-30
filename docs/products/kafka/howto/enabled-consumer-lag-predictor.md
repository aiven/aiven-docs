---
title: Enable the consumer lag predictor for Aiven for Apache Kafka®
limited: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"

The [consumer lag predictor](/docs/products/kafka/concepts/consumer-lag-predictor) in Aiven for Apache Kafka® provides visibility into the time between message production and consumption, allowing for improved cluster performance and scalability.

## Prerequisites

Before you start, ensure you have the following:

-   Aiven account.
-   [Aiven for Apache Kafka®](/docs/products/kafka/get-started) service running.
-   [Prometheus integration](/docs/platform/howto/integrations/prometheus-metrics) set up
    for your Aiven for Apache Kafka for extracting
    metrics.
-   Necessary permissions to modify service configurations.
-   The consumer lag predictor for Aiven for Apache Kafka® is a
    **limited availability** feature and requires activation on your Aiven account.
    Contact the sales team at sales@aiven.io to request activation.

## Enable the consumer lag predictor

<Tabs groupId="enable-methods">
<TabItem value="console" label="Aiven Console" default>

1. Once the consumer lag predictor is activated for your account,
   log in to the [Aiven Console](https://console.aiven.io/),
   select your project, and choose your Aiven for Apache Kafka® service.

1. On the <ConsoleLabel name="overview"/> page,
   click <ConsoleLabel name="service settings"/>  from the sidebar.

1. Go to the **Advanced configuration** section, and click **Configure**.

1. In the **Advanced configuration** window, click <ConsoleIcon name="Add config options"/>.

1. In the add configuration options:

   - Set `kafka_lag_predictor.enabled` to **Enabled**. This enables the lag predictor to
     compute predictions for all consumer groups across all topics.
   - Set `kafka_lag_predictor.group_filters`  to the desired consumer group pattern. This
     specifies which consumer groups to consider during lag prediction calculations.

     :::note
     By default, the consumer lag predictor calculates the lag for all
     consumer groups. To restrict the calculation to specific groups, use
     the `kafka_lag_predictor.group_filters` option.
     :::

1. Click **Save configuration** to save your changes and enable consumer lag prediction.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To enable the consumer lag predictor for your Aiven for Apache Kafka service using
[Aiven CLI](/docs/tools/cli):

1. Ensure the consumer lag predictor feature is activated for your account by contacting
   the sales team at sales@aiven.io. The consumer lag predictor is a limited availability
   feature and needs to be activated for your account.

1. Once activated, retrieve the project information using the following command:

   ```text
   avn project details
   ```

   If you need details for a specific project, use:

   ```text
   avn project details --project <your_project_name>
   ```

1. Get the name of the Aiven for Apache Kafka service for which you
   want to enable the consumer lag predictor by using the following
   command:

   ```text
   avn service list
   ```

   Make a note of the `SERVICE_NAME` corresponding to your Aiven for Apache Kafka service.

1. Enable the consumer lag predictor for your service:

   ```text
   avn service update <SERVICE_NAME> -c kafka_lag_predictor.enabled=true
   ```

   Replace `SERVICE_NAME` with your actual service name.

    :::note
    This enables the lag predictor to compute predictions for all
    consumer groups across all topics.
    :::

1. To specify which consumer groups should be included in the lag prediction calculation,
   set the `group_filters` configuration

   ```text
   avn service update SERVICE_NAME \
   -c kafka_lag_predictor.group_filters=\
     '["example_consumer_group_1", "example_consumer_group_2"]'
    ```

   - Replace `SERVICE_NAME` with the actual name or ID of your
     Aiven for Apache Kafka® service.
   - Replace `example_consumer_group_1` and `example_consumer_group_2` with your
     actual consumer group names.

</TabItem> </Tabs>

## Monitor metrics with Prometheus

After enabling the consumer lag predictor, you can use [Prometheus](/docs/platform/howto/integrations/prometheus-metrics) to
access and monitor detailed metrics that offer insights into your Kafka
cluster's performance:

| Metric                                             | Type    | Description                                                                                            |
| -------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `kafka_lag_predictor_topic_produced_records_total` | Counter | Represents the total count of records produced.                                                        |
| `kafka_lag_predictor_group_consumed_records_total` | Counter | Represents the total count of records consumed.                                                        |
| `kafka_lag_predictor_group_lag_predicted_seconds`  | Gauge   | Represents the estimated time lag, in seconds, for a consumer group to catch up to the latest message. |

For example, you can use these metrics to monitor the average estimated time lag in
seconds for a consumer group to consume produced messages. You can try this with
following PromQL query

```promql
`avg by(topic,group)(kafka_lag_predictor_group_lag_predicted_seconds_gauge)`
```

Another useful choice to monitor is the consume/produce ratio. You can monitor this per
topic and partition for consumer groups by using the following  PromQL query:

```promql
sum by(group, topic, partition)(
  kafka_lag_predictor_group_consumed_records_total_counter
)
/ on(topic, partition) group_left()
sum by(topic, partition)(
  kafka_lag_predictor_topic_produced_records_total_counter
)
```
