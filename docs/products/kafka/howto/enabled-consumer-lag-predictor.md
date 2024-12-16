---
title: Enable the consumer lag predictor for Aiven for Apache Kafka®
limited: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons"

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

## Enable and configure the consumer lag predictor

<Tabs groupId="enable-methods">
<TabItem value="console" label="Aiven Console" default>

1. Once the consumer lag predictor is activated for your account,
   log in to the [Aiven Console](https://console.aiven.io/),
   select your project, and choose your Aiven for Apache Kafka® service.

1. On the <ConsoleLabel name="overview"/> page,
   click <ConsoleLabel name="service settings"/> from the sidebar.

1. Go to the **Advanced configuration** section, and click **Configure**.

1. In the **Advanced configuration** window, click <ConsoleIcon name="Add config options"/>.

1. Set `kafka_lag_predictor.enabled` to **Enabled**. This enables the lag
   predictor to compute predictions for all consumer groups and topics.

1. Configure the following options:

   - **Set `kafka_lag_predictor.group_filters`**: Specify the consumer group pattern to
     include only the desired consumer groups in the lag prediction. By default, the
     consumer lag predictor calculates the lag for all consumer groups, but you can
     restrict this by specifying group patterns.

     Example group patterns:
     - `consumer_group_*`: Matches any consumer group that starts with
       `consumer_group_`, such as `consumer_group_1` or `consumer_group_a`.
     - `important_group`: Matches exactly the consumer group named `important_group`.
     - `group?-test`: Matches consumer groups like `group1-test` or `groupA-test`, where
       the `?` represents any single character.

   - **Set `kafka_lag_predictor.topics`**: Specify which topics to include in the lag
     prediction. By default, predictions are computed for all topics, but you can
     restrict this by using topic names or patterns.

     Example topic patterns:
     - `important_topic_*`: Matches any topic that starts with `important_topic_`, such
       as `important_topic_1`, `important_topic_data`.
     - `secondary_topic`: Matches exactly the topic named  `secondary_topic`.
     - `topic?-logs`: Matches topics like `topic1-logs` or `topicA-logs`, where
       the `?` represents any single character.

1. Click **Save configuration** to save your changes and enable consumer lag prediction.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To enable the consumer lag predictor for your Aiven for Apache Kafka service using
[Aiven CLI](/docs/tools/cli):

1. Ensure the consumer lag predictor feature is activated for your account by contacting
   the sales team at sales@aiven.io. The consumer lag predictor is a limited availability
   feature and needs to be activated for your account.

1. Get the project information:

   ```text
   avn project details
   ```

   If you need details for a specific project, use:

   ```text
   avn project details --project PROJECT_NAME
   ```

1. Get the name of the Aiven for Apache Kafka service:

   ```text
   avn service list
   ```

   Make a note of the `SERVICE_NAME` corresponding to your Aiven for Apache Kafka service.

1. Enable the consumer lag predictor for your service:

   ```text
   avn service update SERVICE_NAME -c kafka_lag_predictor.enabled=true
   ```

   Replace `SERVICE_NAME` with your service name.

    :::note
    This enables the lag predictor to compute predictions for all
    consumer groups across all topics.
    :::

1. Configure the consumer groups and topics to be included in the lag prediction:

   - **For consumer groups**: Set the `kafka_lag_predictor.group_filters` option to
     specify which consumer groups should be included in the lag prediction. By default,
     the consumer lag predictor calculates the lag for all consumer groups, but you can
     restrict this by specifying group patterns.

     ```bash
     avn service update SERVICE_NAME \
     -c kafka_lag_predictor.group_filters='["example_consumer_group_1", "example_consumer_group_2"]'
     ```

     - Replace `SERVICE_NAME` with the actual name or ID of your Aiven for Apache Kafka®
       service.
     - Replace `example_consumer_group_1` and `example_consumer_group_2` with your
       consumer group names.

   - **For topics**: Set the `kafka_lag_predictor.topics` option to specify which topics
     should be included in the lag prediction. By default, predictions are computed for
     all topics, but you can
     restrict this by using topic names or patterns.

     ```bash
     avn service update SERVICE_NAME \
     -c kafka_lag_predictor.topics='["important_topic_*", "secondary_topic"]'
     ```

     Replace `important_topic_*` and `secondary_topic` with your topic names or
     patterns.

</TabItem> </Tabs>

## Monitor metrics with Prometheus

After enabling the consumer lag predictor, you can use [Prometheus](/docs/platform/howto/integrations/prometheus-metrics)
to access and monitor detailed metrics that provide insights into your Apache Kafka
cluster's performance:

| Metric                                             | Type    | Description                                                                                            |
| -------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `kafka_lag_predictor_topic_produced_records_total` | Counter | Represents the total count of records produced.                                                        |
| `kafka_lag_predictor_group_consumed_records_total` | Counter | Represents the total count of records consumed.                                                        |
| `kafka_lag_predictor_group_lag_predicted_seconds`  | Gauge   | Represents the estimated time lag, in seconds, for a consumer group to catch up to the latest message. |

For example, you can monitor the average estimated time lag in seconds for a
consumer group to consume produced messages using the following PromQL query:

```promql
avg by(topic,group)(kafka_lag_predictor_group_lag_predicted_seconds_gauge)
```

Another useful metric to monitor is the consume/produce ratio. You can monitor this per
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
