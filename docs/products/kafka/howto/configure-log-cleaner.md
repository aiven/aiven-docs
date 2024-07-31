---
title: Configure log cleaner for topic compaction
---

The log cleaner serves the purpose of preserving only the latest value associated with a specific message key in a partition for [compacted topics](/docs/products/kafka/concepts/log-compaction).
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

## Log cleaning frequency and delay

Before the cleaning begins, the cleaner thread will inspect the logs to
find those with highest **dirty ratio** calculated as the number of
bytes in the head vs the total number of bytes in the log (tail + head);
you can read more about head and tail definition in the
[compacted topic documentation](/docs/products/kafka/concepts/log-compaction).
The ratio provides an estimation of how many duplicated
keys are present in a topic, and therefore need to be compacted.

:::tip
For the log cleaner to start compacting a topic, the dirty ratio needs
to be bigger than a threshold set to 50% by default. You can change this
value either globally for the cluster by modifying the property
`kafka.log_cleaner_min_cleanable_ratio` in the **Advanced configuration**
section of the service overview or for a specific topic by modifying
`min_cleanable_ratio` value.
:::

The log cleaner can be configured to leave some amount of not compacted
"head" of the log by setting compaction time lag. You can achieve this
by setting two additional properties from the **Advanced configuration**
or a corresponding value for an individual topic:

-   `log.cleaner.min.compaction.lag.ms`: setting to a value greater
    than 0 will prevent log cleaner from compacting messages with an age
    newer than a minimum message age, this allows you to delay compacting
    records.
-   `log.cleaner.max.compaction.lag.ms`: the maximum amount of time a
    message will remain not compacted.

:::tip
That exact compaction lag can be bigger than the
`log.cleaner.max.compaction.lag.ms` setting since it directly depends on
the time to complete the actual compaction process and can be delayed by
the log cleaner threads availability.
:::

## Tombstone records

During the cleanup process, log cleaner threads also removes records
that have a null value, also known as **tombstone** records. These
records can be delayed from being deleted by configuring
`delete.retention.ms` for the compacted topic.

Consumers can read all tombstone messages as long as they reach the head
of the topic before the period defined in `delete.retention.ms`
(default: 24 hours) is passed.
