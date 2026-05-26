---
title: Configuration and tuning for Aiven for Apache Kafka® MirrorMaker 2
sidebar_label: Configuration and tuning
---

import RelatedPages from "@site/src/components/RelatedPages";

Learn where Aiven for Apache Kafka® MirrorMaker 2 settings are configured across service, replication-flow, and integration layers, which parameters affect performance, and what restarts when you change them.

## Configuration layers

Aiven for Apache Kafka® MirrorMaker 2 uses three configuration layers. Each layer
controls a different part of the replication process and has a different restart impact.

- **Service configurations**
- **Replication-flow configurations**
- **Integration configurations**

### Service configurations

Service configurations control the behavior of nodes and workers in the MirrorMaker 2
cluster.

**Example**

- **Parameter:** [`kafka_mirrormaker.emit_checkpoints_enabled`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_emit_checkpoints_enabled)
- **Description:** Enables or disables periodic emission of consumer group offset
  checkpoints to the target cluster.
- **Impact:**
  - Restarts workers
  - Restarts all connectors and tasks

### Replication-flow configurations

Replication-flow configurations control the behavior of connectors such as Source, Sink,
Checkpoint, and Heartbeat connectors.

**Example**

- **Parameter:** [`topics`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mirrormaker_replication_flow)
- **Description:** Specifies a list of topics or regular expressions to replicate.
  For more information, see
  [Topics included in a replication flow](/docs/products/kafka/kafka-mirrormaker/concepts/replication-flow-topics-regex).
- **Impact:**
  - Restarts the affected connectors
  - Restarts their tasks

### Integration configurations

Integration configurations refine how producers and consumers behave within connectors.

**Example**

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
MirrorMaker 2 producers and consumers communicate with the source and target Kafka
clusters. Set them on the service integration resource. If you do not set a parameter,
Kafka applies its built-in default. These settings apply to MirrorMaker 2 integrations
with both Aiven for Apache Kafka services and external Kafka clusters.

To update these settings, see
[Update integration configurations](/docs/products/kafka/kafka-mirrormaker/howto/update-integration-configurations).

| Parameter | Description | Maximum value |
|-----------|-------------|---------------|
| `consumer_fetch_min_bytes` | Minimum amount of data the server returns for a fetch request. Higher values reduce fetch frequency. | — |
| `consumer_fetch_max_bytes` | Maximum amount of data the server returns for a fetch request. | 100 MiB |
| `consumer_max_partition_fetch_bytes` | Maximum amount of data per partition the server returns in a single fetch response. | 100 MiB |
| `consumer_receive_buffer_bytes` | Size of the TCP receive buffer for the consumer. A value of `-1` uses the OS default. | 100 MiB |
| `consumer_request_timeout_ms` | Timeout for consumer requests to the broker, in milliseconds. | 600,000 ms (10 minutes) |
| `producer_batch_size` | Maximum size of a record batch sent to a single partition, in bytes. | — |
| `producer_buffer_memory` | Total memory available to the producer for buffering records, in bytes. | — |
| `producer_linger_ms` | Time the producer waits for additional records before sending a batch, in milliseconds. | — |
| `producer_max_request_size` | Maximum size of a single producer request, in bytes. | — |
| `producer_request_timeout_ms` | Timeout for producer requests to the broker, in milliseconds. | 600,000 ms (10 minutes) |
| `producer_send_buffer_bytes` | Size of the TCP send buffer for the producer, in bytes. A value of `-1` uses the OS default. | 100 MiB |

<RelatedPages/>

- [Update integration configurations](/docs/products/kafka/kafka-mirrormaker/howto/update-integration-configurations)
- [Advanced parameters for Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params)
- [Set up an Apache Kafka® MirrorMaker 2 replication flow](/docs/products/kafka/kafka-mirrormaker/howto/setup-replication-flow)
- [Topics included in a replication flow](/docs/products/kafka/kafka-mirrormaker/concepts/replication-flow-topics-regex)
- [Known issues](/docs/products/kafka/kafka-mirrormaker/reference/known-issues)
