---
title: Change data retention period
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"

To avoid running out of disk space, by default, Apache Kafka® drops the oldest messages from the beginning of each log after their retention period expires.
**Aiven for Apache Kafka®** allows you to configure the
retention period for each topic.

The retention period can be configured at both the service and topic
levels. If no retention period is specified for a particular topic, the
service-level setting will be applied, with a default value of 168
hours. When modifying the service retention period, it will override the
retention period of any previously created topics.

## For a single topic

To change the retention period for a single topic:

1. In the [Aiven Console](https://console.aiven.io/), select your
   project and choose your Aiven for Apache Kafka® service.

1. Select <ConsoleLabel name="manage stream" /> > **Topics** from the left sidebar.

1. Select the topic to modify.

1. In the **Topic info** screen, select **Modify**.

1. In the modify topic screen, update the value of **Retention ms** to
   the desired retention length in milliseconds. If you cannot find
   **Retention ms**, use the search bar to locate it

   :::note
   The **Retention ms** option is displayed in the modify topic screen
   for topics where advanced configuration was enabled during topic
   creation.
   :::

1. Select **Update** to save your changes.

1. In the *Advanced configuration* view find **Retention ms**.

1. Change the value of **Retention ms** value to the desired retention
   length in milliseconds.

   :::tip
   You can also change **Retention bytes** setting to limit
   amount of data retained based on the storage usage.
   :::

## At a service level

1. In the [Aiven Console](https://console.aiven.io/), select your project and choose
   your Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="service settings" />, scroll to
   **Advanced configuration**, and click **Configure**.
1. In the **Advanced configuration** dialog, click
   <ConsoleLabel name="addadvancedconfiguration" />.
1. Configure the retention period for Apache Kafka® logs:
   - Find `kafka.log_retention_hours` or `kafka.log_retention_ms`, and set the
     retention period.
   - To limit retention by storage usage, set `kafka.log_retention_bytes`.
1. Click **Save configuration**.

## Unlimited retention

Aiven does not limit the maximum retention period. To turn off time-based content
expiration, set the retention value to `-1`.

:::warning
Using high retention periods without monitoring the available storage
space can cause your service to run out of disk space. These situations
are not covered by the Aiven SLA.
:::
