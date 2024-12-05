---
title: Why are some topics or partitions not replicated
---

Apache Kafka® MirrorMaker 2 stores its configs, states and offsets to ensure a resilient message replication across different Kafka clusters.
There are a number of factors that may prevent target topics (or their partitions) from progressing as you would expect.

The following guideline assumes that the user has previously [setup a MirrorMaker replication flow](/docs/products/kafka/kafka-mirrormaker/howto/setup-replication-flow)
and has assessed an issue with the replication of some topics or partitions.

:::note
There are different ways of assessing MirrorMaker replication issues, including:
- basic monitoring,
- log search,
- [offset sync status analysis](/docs/products/kafka/kafka-mirrormaker/howto/log-analysis-offset-sync-tool).
:::

## Excessive message size

The error `RecordTooLargeException` is typically observed by the user from the service logs when a record is larger than expected. 

Two different scenarios exist:
1. **Target Kafka broker rejects a record**
   - the reason is likely that the record is larger than configured at destination topic,
   - the user can fix it by increasing the value of topic configuration `max_message_bytes` or superseeded broker config `message_max_bytes`. Following to this change, it is necessary that the workers restart their task.
2. **MirrorMaker conector rejects a record**
   - the reason is likely that the record is larger than configured as maximal producer request size,
   - the user can fix it by increasing the value of integration configuration [producer_max_request_size](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration#producer_max_request_size-1).

## Limited replication

The following two worker configuration settings may significantly impact how topic partitions are replicated:
- [kafka_mirrormaker.offset_lag_max](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_offset_lag_max) (100 by default) defines how far behind a remote partition can be until it starts catching up. Given that this parameter is global to all replication topics, you need to find a compromise between:
  - a too low value that may put more load on your MirrorMaker workers and Kafka brokers due to high-throughput topics,
  - a too high value that may prevent the replication of low-throughput topics from progressing.

- [kafka_mirrormaker.tasks_max_per_cpu](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_tasks_max_per_cpu) (1 by default) influences the maximum number of MirrorMaker tasks (of each type) per service CPU. For example in a typical cluster of 3 nodes of 2 CPU, the MirrorMaker `tasks.max` is automatically set to 6 per default, allowing for 6 different tasks to execute at the same time. The optimal and best performance case is one Kafka consumer per partition. If MirrorMaker has to process more partitions than replication tasks available, then the tasks will get assigned more than one:
  - a too low value may introduce unexpected replication lag on some partitions,
  - a too high value result in the creation of idle tasks.

:::note
From Kafka v3.7 onwards, offset sync is emitted periodically by MirrorMaker.
:::

## Non-coherent offset 

By default, MirrorMaker is storing its offsets at target cluster in internal topic `mm2-offsets.<source cluster alias>.internal`. By design, it checks if it already stored an offset for the replication topic, if so it always continues mirroring from there, to avoid duplicate consumption.

This behaviour might lead to user confusion why topics are not replicated from their earliest offset, for example:
- when a replication topic had already been replicated some time ago, and then removed from the replication flow.
- when a replication topic had been deleted/re-created at source.

In both cases, the recommendation is to avoid these scenarios in production. Should they occur and require to be mitigated, the solution is to manually trigger MirrorMaker offset reset. There are 2 different options:

#### You can afford to reset offsets for the entire replication flow:

1. Disable the replication flow.
1. Delete the internal offsets topic.
1. Re-enable the replication flow.
1. The internal offset topic is automatically re-created.
1. MirrorMaker replicates from earliest offset.

#### You need to reset offsets related to a single topic

1. Following the steps defined in [Configure properties for Apache Kafka® toolbox](/docs/products/kafka/howto/kafka-tools-config-file), create a configuration file that can be used to access the Kafka cluster that hosts the internal offsets topic.
1. Disable the replication flow.
1. Produce a delete record (aka. tombstone) to the offset storage for the replication topic to reset. This can be achieved using [this script](https://gist.github.com/C0urante/30dba7b9dce567f33df0526d68765860). Note that the `-o` option does not need to specified if default offsets storage topic location applies.
1. Re-enable the replication flow.
1. MirrorMaker replicates from earliest offset.
