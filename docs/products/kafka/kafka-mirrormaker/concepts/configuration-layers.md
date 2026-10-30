---
title: Configuration and tuning for Aiven for Apache Kafka® MirrorMaker 2
sidebar_label: Configuration and tuning
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka® MirrorMaker 2 settings apply at three layers, which determine the restart impact of a change, how to tune performance, and how topics replicate.

## Configuration layers

Aiven for Apache Kafka® MirrorMaker 2 uses three configuration layers. Each layer
controls a different part of the replication process and has a different restart impact.

- **Service configurations**
- **Replication-flow configurations**
- **Integration configurations**

### Service configurations

Service configurations control the behavior of nodes and workers in the MirrorMaker 2
cluster.

For example:

- **Parameter:** [`kafka_mirrormaker.emit_checkpoints_enabled`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_emit_checkpoints_enabled)
- **Description:** Enables or disables periodic emission of consumer group offset
  checkpoints to the target cluster.
- **Impact:**
  - Restarts workers
  - Restarts all connectors and tasks

### Replication-flow configurations

Replication-flow configurations control the behavior of connectors such as Source, Sink,
Checkpoint, and Heartbeat connectors.

For example:

- **Parameter:** [`topics`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mirrormaker_replication_flow)
- **Description:** Specifies a list of topics or regular expressions to replicate.
  For more information, see
  [Topics included in a replication flow](/docs/products/kafka/kafka-mirrormaker/concepts/replication-flow-topics-regex).
- **Impact:**
  - Restarts the affected connectors
  - Restarts their tasks

### Integration configurations

Integration configurations refine how producers and consumers behave within connectors.

For example:

- **Parameter:** [`consumer_fetch_min_bytes`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration#nested-schema-for-kafka_mirrormaker_user_configkafka_mirrormaker)
- **Description:** Sets the minimum amount of data the server returns for a fetch request.
- **Impact:**
  - Restarts workers
  - Restarts all connectors and tasks

:::note
Many configuration parameters originate from
[KIP-382: MirrorMaker 2.0 configuration properties](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=95650722#KIP382:MirrorMaker2.0-ConnectorConfigurationProperties).
:::

## Common performance-related parameters

Some configuration parameters are commonly adjusted to improve replication throughput,
consistency, or topic selection. The configuration layer determines where the parameter
is set and what restarts when the value changes.

### Task allocation

Increasing the value of
[`kafka_mirrormaker.tasks_max_per_cpu`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_tasks_max_per_cpu)
in the advanced configuration can improve throughput. Set this value close to the
number of partitions when you need more parallelism.

### Interval settings

Aligning interval-based settings keeps replication activity consistent.

- **Advanced configurations:**
  - [`kafka_mirrormaker.emit_checkpoints_interval_seconds`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_emit_checkpoints_interval_seconds)
  - [`kafka_mirrormaker.sync_group_offsets_interval_seconds`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_sync_group_offsets_interval_seconds)
- **Replication flow:**
  - [`sync_group_offsets_interval_seconds`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mirrormaker_replication_flow#sync_group_offsets_interval_seconds-1)

### Topic exclusion

Adding these patterns to the topic exclusion list prevents internal and system topics from
being replicated:

- `.*[\-\.]internal`
- `.*\.replica`
- `__.*`
- `connect.*`

### Producer and consumer settings

These [integration configuration](#integration-configurations) parameters control how
MirrorMaker 2 producers and consumers interact with the source and target Kafka
clusters. Set them on the service integration resource. To update these settings, see
[Update integration configurations](/docs/products/kafka/kafka-mirrormaker/howto/update-integration-configurations).

:::important

- If you do not set a parameter, Kafka applies its built-in default.
- The settings apply to MirrorMaker 2 integrations with both Aiven for Apache Kafka services
  and external Kafka clusters.
- Exercise changes incrementally and cautiously, depending on the resources available in
  your service plan.

:::

The following table lists the integration parameters, their Kafka defaults, and their maximum values.

| Parameter | Description | Kafka default | Maximum value |
|-----------|-------------|---------------|---------------|
| `consumer_fetch_min_bytes` | Minimum amount of data the broker returns for a fetch request. Higher values reduce fetch frequency. | 1 byte | — |
| `consumer_fetch_max_bytes` | Maximum amount of data the broker returns for a fetch request. | 52,428,800 bytes (50 MiB) | 100 MiB |
| `consumer_fetch_max_wait_ms` | Maximum time the broker waits for enough data to fill a fetch request before it responds. | 500 ms | 600,000 ms (10 minutes) |
| `consumer_max_partition_fetch_bytes` | Maximum amount of data per partition the broker returns in a single fetch response. | 1,048,576 bytes (1 MiB) | 100 MiB |
| `consumer_max_poll_records` | Maximum number of records returned in a single poll request. | 500 records | — |
| `consumer_receive_buffer_bytes` | Size of the TCP receive buffer for the consumer. A value of `-1` uses the OS default. | 65,536 bytes (64 KiB) | 100 MiB |
| `consumer_request_timeout_ms` | Timeout for consumer requests to the broker. | 30,000 ms | 600,000 ms (10 minutes) |
| `producer_batch_size` | Maximum size of a record batch sent to a single partition. | 16,384 bytes (16 KiB) | — |
| `producer_buffer_memory` | Total memory available to the producer for buffering records. | 33,554,432 bytes (32 MiB) | — |
| `producer_linger_ms` | Time the producer waits for additional records before sending a batch. | 0 ms | — |
| `producer_max_request_size` | Maximum size of a single producer request. | 1,048,576 bytes (1 MiB) | — |
| `producer_request_timeout_ms` | Timeout for producer requests to the broker. | 30,000 ms | 600,000 ms (10 minutes) |
| `producer_send_buffer_bytes` | Size of the TCP send buffer for the producer. A value of `-1` uses the OS default. | 131,072 bytes (128 KiB) | 100 MiB |

## Topic configurations on the target cluster

MirrorMaker 2 periodically copies topic configurations from source topics to target
topics, unless you set
[`kafka_mirrormaker.sync_topic_configs_enabled`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_sync_topic_configs_enabled)
to `false`. It skips the properties in the default exclude list, or in the
`config_properties_exclude` list of the replication flow if you set one. Aiven always
excludes `unclean.leader.election.enable`.

### Minimum in-sync replicas

By default, `min.insync.replicas` is excluded, so MirrorMaker 2 doesn't copy it from
source topics. If you set `config_properties_exclude`, your list replaces the default
list. To keep `min.insync.replicas` excluded, include it in your list.

When `min.insync.replicas` is excluded, a target topic uses the first of the following
values that applies:

1. The `min.insync.replicas` value set on the target topic
1. The
   [`kafka.min_insync_replicas`](/docs/products/kafka/reference/advanced-params#kafka_min_insync_replicas)
   value of the target service, which defaults to `1`

To use a different value, set `min.insync.replicas` on the target topic or change
`kafka.min_insync_replicas` on the target service.

### Replication factor

MirrorMaker 2 sets the replication factor of a target topic only when it creates the
topic, using the `replication_factor` setting of the replication flow. It doesn't copy
the replication factor from the source topic or change it.

<RelatedPages/>

- [Update integration configurations](/docs/products/kafka/kafka-mirrormaker/howto/update-integration-configurations)
- [Advanced parameters for Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params)
- [Set up an Apache Kafka® MirrorMaker 2 replication flow](/docs/products/kafka/kafka-mirrormaker/howto/setup-replication-flow)
- [Topics included in a replication flow](/docs/products/kafka/kafka-mirrormaker/concepts/replication-flow-topics-regex)
