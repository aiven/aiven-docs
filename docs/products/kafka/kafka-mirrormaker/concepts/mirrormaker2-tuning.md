---
title: Configuration parameters for Aiven for Apache Kafka® MirrorMaker 2
---

Learn about the configuration layers in Aiven for Apache Kafka® MirrorMaker 2, including service, replication flow, and integration settings.
Optimize data replication and performance in your Kafka ecosystem.

## Configuration layers

Aiven for Apache Kafka® MirrorMaker 2 configurations are organized into three layers:
**service**, **replication flow**, and **integration**. Each layer controls a specific
aspect of the replication process.

### Service configurations

Service configurations control the behavior of nodes and workers in the
Aiven for Apache Kafka® MirrorMaker 2 cluster.

**Example of a service configuration**:

- Parameter: [`kafka_mirrormaker.emit_checkpoints_enabled`](https://aiven.io/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_emit_checkpoints_enabled)
- Description: Enables or disables periodically emitting consumer group offset
    checkpoints to the target cluster.
- Impact:
  - Automatically restarts the workers.
  - Restarts all connectors and tasks.

### Replication-flow configurations

Replication-flow configurations manage the behavior of connectors, such as Source, Sink,
Checkpoint, and Heartbeat.

**Example of a replication-flow configuration**:

- Parameter: [`topics`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mirrormaker_replication_flow)
- Description: Specifies a list of topics or regular expressions to replicate.
    For more information, see the [topics included in a replication flow](/docs/products/kafka/kafka-mirrormaker/concepts/replication-flow-topics-regex).
- Impact:
  - Automatically restarts the affected connectors.
  - Restarts their associated tasks.

### Integration configurations

Integration configurations fine-tune the interaction between producers and consumers
within connectors.

**Example of an integration configuration**:

- Parameter: [`consumer_fetch_min_bytes`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration#nested-schema-for-kafka_mirrormaker_user_configkafka_mirrormaker)
- Description: Sets the minimum amount of data the server should return for a fetch
  request.
- Impact:
  - Automatically restarts the workers.
  - Restarts all connectors and tasks.

:::note
Most configuration parameters are derived from
[KIP-382: MirrorMaker 2.0 - Configuration Properties](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=95650722#KIP382:MirrorMaker2.0-ConnectorConfigurationProperties). Refer to this resource for additional details.
:::

## Common parameters

This section describes common parameters that can be adjusted to optimize the performance
and behavior of Aiven for Apache Kafka MirrorMaker 2 replication.

1. **Optimize task allocation**:
   Increase the value of
   [`kafka_mirrormaker.tasks_max_per_cpu`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_tasks_max_per_cpu)
   in the advanced configuration.
   Setting this to match the number of partitions can improve performance.

1. **Align interval settings**:
   Ensure the following interval settings match to achieve more frequent and synchronized
   data replication:
   - **Advanced configurations**:
     - [`kafka_mirrormaker.emit_checkpoints_interval_seconds`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_emit_checkpoints_interval_seconds)
     - [`kafka_mirrormaker.sync_group_offsets_interval_seconds`](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params#kafka_mirrormaker_sync_group_offsets_interval_seconds)
   - **Replication flow**:
     - `Sync interval in seconds`

1. **Exclude internal topics**:
   Add these patterns to your topic blacklist to exclude internal topics:
   - `.*[\-\.]internal`
   - `.*\.replica`
   - `__.*`
   - `connect.*`

1. **Adjust integration parameters**:
   Modify these integration parameters based on your use case to improve producer and
   consumer performance:
   - `consumer_fetch_min_bytes`
   - `producer_batch_size`
   - `producer_buffer_memory`
   - `producer_linger_ms`
   - `producer_max_request_size`
