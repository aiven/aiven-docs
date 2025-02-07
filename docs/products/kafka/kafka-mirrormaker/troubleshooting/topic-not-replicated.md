---
title: Why topics or partitions not replicated
---

Apache Kafka® MirrorMaker 2 provides reliable message replication across Kafka clusters using configurations, states, and offsets.
Various factors can disrupt the replication of topics and partitions, preventing
them from progressing as expected.

These guidelines assume that you have previously
[set up a MirrorMaker replication flow](/docs/products/kafka/kafka-mirrormaker/howto/setup-replication-flow)
and have identified an issue with the replication of certain topics or partitions.

:::note
You can assess Aiven for Apache Kafka MirrorMaker 2 replication issues in several ways:

- Basic monitoring
- Log search
- [Offset sync status analysis](/docs/products/kafka/kafka-mirrormaker/howto/log-analysis-offset-sync-tool)

:::

## Excessive message size

The error `RecordTooLargeException` appears in service logs when a record exceeds the
allowed size. This can occur in two scenarios:

1. **Target Apache Kafka broker rejects a record**

   - **Cause**: The record is larger than the destination topic's allowed size.
   - **Solution**: Increase the `max_message_bytes` value for the topic or the
     broker’s `message_max_bytes` configuration. Restart the worker tasks to apply
     the new settings.

1. **MirrorMaker connector rejects the record**

   - **Cause**: The record is larger than the maximum producer request size.
   - **Solution**: Update the `producer_max_request_size` in the integration
     configuration. For more details, see the [integration configuration documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration#producer_max_request_size-1).

## Limited replication

The following worker configurations can significantly impact topic partition replication:

- [`kafka_mirrormaker.offset_lag_max`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_offset_lag_max)

  - Default value: 100
  - Description: This parameter applies globally to all replication topics and defines
    how far behind a remote partition can be before catching up. Consider its impact
    on high-throughput and low-throughput topics carefully.
  - Considerations:
    - A low value can increase load on Apache Kafka MirrorMaker 2 workers and Kafka
      brokers due to high-throughput topics.
    - A high value can prevent low-throughput topics from progressing.

- [`kafka_mirrormaker.tasks_max_per_cpu`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_tasks_max_per_cpu)

  - Default value: 1
  - Description: Specifies the maximum number of Apache Kafka MirrorMaker 2 tasks
    per service CPU. For example, in a typical cluster with 3 nodes, each having 2 CPUs,
    the `tasks.max` is automatically set to 6, allowing 6 tasks to execute simultaneously.
    The optimal performance is achieved when each Kafka consumer is assigned to a single
    partition. If Apache Kafka MirrorMaker 2 processes more partitions than available
    tasks, multiple partitions are assigned to a single task.
  - Considerations:
    - A low value can introduce replication lag on some partitions.
    - A high value can result in idle tasks.

:::note
Starting with Apache Kafka v3.7, Aiven for Apache Kafka MirrorMaker 2 emits offset sync
information periodically, enhancing replication monitoring and troubleshooting.
:::

## Non-coherent offset

Apache Kafka MirrorMaker 2 stores offsets in the target cluster’s internal
topic `mm2-offsets.<source cluster alias>.internal`. By design, it checks if an offset
is already stored for the replication topic and resumes replication from the last stored
offset to avoid duplicate consumption. This behavior can cause confusion when:

- A replication topic was previously replicated and later removed from the replication
  flow.
- A replication topic was deleted and recreated at the source.

To resolve these issues, you can reset the offsets using one of the following methods:

### Resetting all offsets

1. Disable the replication flow.
1. Delete the internal offsets topic.
1. Re-enable the replication flow to recreate the internal offsets topic automatically.
1. MirrorMaker will replicate from the earliest offset.

### Resetting offsets for a specific topic

1. [Configure the Kafka toolbox](/docs/products/kafka/howto/kafka-tools-config-file) to
   access the Kafka cluster hosting the internal offsets topic.
1. Disable the replication flow.
1. Produce a tombstone record to the offset storage for the replication topic using
  [this script](https://gist.github.com/C0urante/30dba7b9dce567f33df0526d68765860).

   :::note
   The `-o` option is not needed if the default offsets topic applies.
   :::

1. Re-enable the replication flow.
1. MirrorMaker replicates from the earliest offset.
