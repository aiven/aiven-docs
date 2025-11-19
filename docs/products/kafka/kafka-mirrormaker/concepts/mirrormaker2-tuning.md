---
title: Configuration parameters for Aiven for Apache Kafka® MirrorMaker 2
---

Learn about the service, replication-flow, and integration configuration layers in Aiven for Apache Kafka® MirrorMaker 2 and how they affect replication performance.

## Configuration layers

Aiven for Apache Kafka® MirrorMaker 2 uses three configuration layers:

- **Service configurations**
- **Replication-flow configurations**
- **Integration configurations**

Each layer manages a specific part of the replication process.

### Service configurations

Service configurations control the behavior of nodes and workers in the MirrorMaker 2 cluster.

**Example**

- **Parameter:** [`kafka_mirrormaker.emit_checkpoints_enabled`](https://aiven.io/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_emit_checkpoints_enabled)
- **Description:** Enables or disables periodic emission of consumer group offset checkpoints to the target cluster
- **Impact:**
  - Restarts workers
  - Restarts all connectors and tasks

### Replication-flow configurations

Replication-flow configurations control the behavior of connectors such as Source, Sink, Checkpoint, and Heartbeat connectors.

**Example**

- **Parameter:** [`topics`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mirrormaker_replication_flow)
- **Description:** Specifies a list of topics or regular expressions to replicate.
  For details, see
  [Topics included in a replication flow](/docs/products/kafka/kafka-mirrormaker/concepts/replication-flow-topics-regex).
- **Impact:**
  - Restarts the affected connectors
  - Restarts their tasks

### Integration configurations

Integration configurations refine how producers and consumers behave within connectors.

**Example**

- **Parameter:** [`consumer_fetch_min_bytes`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration#nested-schema-for-kafka_mirrormaker_user_configkafka_mirrormaker)
- **Description:** Sets the minimum amount of data the server returns for a fetch request
- **Impact:**
  - Restarts workers
  - Restarts all connectors and tasks

:::note
Many configuration parameters originate from
[KIP-382: MirrorMaker 2.0 configuration properties](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=95650722#KIP382:MirrorMaker2.0-ConnectorConfigurationProperties).
:::

## Common parameters

Use these commonly adjusted parameters to improve replication performance and consistency.

### Optimize task allocation

Increase the value of
[`kafka_mirrormaker.tasks_max_per_cpu`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_tasks_max_per_cpu)
in the advanced configuration.

Setting this value close to the number of partitions can improve throughput.

### Align interval settings

Align interval-based settings to keep replication activity consistent.

- **Advanced configurations:**
  - [`kafka_mirrormaker.emit_checkpoints_interval_seconds`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_emit_checkpoints_interval_seconds)
  - [`kafka_mirrormaker.sync_group_offsets_interval_seconds`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_sync_group_offsets_interval_seconds)
- **Replication flow:**
  - Sync interval in seconds

### Exclude internal topics

Add these patterns to the topic blacklist to avoid replicating internal or system topics:

- `.*[\-\.]internal`
- `.*\.replica`
- `__.*`
- `connect.*`

### Adjust integration parameters

Tune these integration parameters based on your workload to optimize producer and consumer behavior:

- `consumer_fetch_min_bytes`
- `producer_batch_size`
- `producer_buffer_memory`
- `producer_linger_ms`
- `producer_max_request_size`
