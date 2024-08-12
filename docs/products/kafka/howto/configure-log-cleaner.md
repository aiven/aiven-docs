---
title: Configure the log cleaner for topic compaction
---

The log cleaner serves the purpose of preserving only the latest value associated with a specific message key in a partition for [compacted topics][logcompaction].
In Aiven for Apache Kafka®, the log cleaner is enabled by
default, while log compaction remains disabled.

## Enable log compaction for all topics

1.  In the [Aiven Console](https://console.aiven.io/), select your
    project and choose your Aiven for Apache Kafka® service.
1.  In the service page, select **Service settings** from the sidebar.
1.  On the **Service settings** page, scroll down to the **Advanced
    configuration** section, and click **Configure**.
1.  In the **Advanced configuration** dialog, click **Add configuration
    options**.
1.  Find `log.cleanup.policy` in the list and select it.
1.  Set the value to `compact`.
1.  Click **Save configuration**.

:::warning
This change will affect all topics in the cluster that do not have a
configuration override in place.
:::

## Enable log compaction for a specific topic

1.  In the [Aiven Console](https://console.aiven.io/), select your
    project and choose your Aiven for Apache Kafka® service.
1.  Select **Topics** from the left sidebar.
1.  Select the topic to modify and select **Modify** in the
    context menu.
1.  From the drop-down options for the **Cleanup policy**, select the
    value `compact`.
1.  Select **Update**.

## Configure log cleaning frequency and delay

Before the cleaning begins, the cleaner thread will inspect the logs to
find those with highest **dirty ratio** calculated as the number of
bytes in the head vs the total number of bytes in the log (tail + head).
Read more about head and tail definition in the
[compacted topic documentation][logcompaction].

The ratio provides an estimation of how many duplicated
keys are present in a topic, and therefore needs to be compacted.

:::tip
For the log cleaner to start compacting a topic, the dirty ratio needs
to be bigger than a threshold set to **50% by default**.

You can change this value:
- Globally for the cluster: In the **Advanced configuration**
  section of the service overview, modify the value of the
  `kafka.log_cleaner_min_cleanable_ratio` property.
- For a specific topic: Modify the value of `min_cleanable_ratio` property.
:::

The log cleaner can be configured to leave some amount of uncompacted data in the
head of the log by setting **compaction time lag**. To do so,

1. Open In the **Advanced configuration** of your service or an individual topic:
1. Set the following properties:
   - `log.cleaner.min.compaction.lag.ms`: Setting to a value greater
     than 0 will prevent the log cleaner from compacting messages with an age
     newer than a minimum message age. This delays compacting records.
   - `log.cleaner.max.compaction.lag.ms`: The maximum amount of time a
     message will remain uncompacted.

:::tip
The compaction lag can be bigger than the
`log.cleaner.max.compaction.lag.ms` setting since it directly depends on
the time to complete the actual compaction process and can be delayed by
the log cleaner threads availability.
:::

## Tombstone records

During the cleanup process, the log cleaner also remove records
that have a null value, also known as **tombstone** records. To delay tombstone records
from being deleted, set the `delete.retention.ms` property for the compacted topic.

Consumers can read all tombstone messages as long as they reach the head
of the topic before the period defined in `delete.retention.ms` is passed.

## Related pages

- [Compacted topics][logcompaction]
- [Kafka advanced parameters](/docs/products/kafka/reference/advanced-params)

[logcompaction]: /docs/products/kafka/concepts/log-compaction
