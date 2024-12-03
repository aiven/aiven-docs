---
title: Configuration parameters
---

Apache Kafka® MirrorMaker 2 provides a suite of configuration parameters
to help with data replication within Apache Kafka® ecosystems.

## Configuration layers

1.  **Service** configurations apply to the nodes and workers of Apache Kafka® MirrorMaker 2 cluster. 
    - They are documented under [Advanced parameters for Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker/reference/advanced-params).
    - An example of service configuration is `kafka_mirrormaker.emit_checkpoints_enabled`: Whether to emit consumer group offset checkpoints to target cluster periodically.
    - Changing the value of such parameter leads to a restart of the workers (along with their connectors and tasks).
1.  **Replication-flow** configurations apply to the connectors (Source, Sink, Checkpoint, Heartbeat).
    - They are documented under [Aiven Terraform provider mirrormaker_replication_flow resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mirrormaker_replication_flow).
    - An example of replication-flow configuration is `topics`: List of topics and/or regular expressions to replicate (see [topics included in a replication flow](/docs/products/kafka/kafka-mirrormaker/concepts/replication-flow-topics-regex)).
    - Chaging the value of such parameter leads to the restart of impacted connectors (along with their tasks).
1.  **Integration** configurations apply to the consumers and producers of the connectors.
    - They are documented under [Aiven Terraform provider service_integration resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration#nested-schema-for-kafka_mirrormaker_user_configkafka_mirrormaker).
    - An example of integration configuration is `consumer_fetch_min_bytes`: The minimum amount of data the server should return for a fetch request.
    - Changing the value of such parameter leads to a restart of the workers (along with their connectors and tasks).

:::note
Most configurations are directly inherited from the upstream [KIP-382: MirrorMaker 2.0 - Configuration Properties](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=95650722#KIP382:MirrorMaker2.0-ConnectorConfigurationProperties).
:::

## Common parameters

This section outlines common parameters which you can adjust.

1.  Increase the value of `kafka_mirrormaker.tasks_max_per_cpu` _in the
    advanced options. Setting this to match the number of partitions can
    enhance performance.
1.  Ensure the interval seconds for the following settings match. You
    can reduce these intervals for more frequent data synchronization:
    -   Advanced options:
        -   `kafka_mirrormaker.emit_checkpoints_interval_seconds`
        -   `kafka_mirrormaker.sync_group_offsets_interval_seconds`
    -   Replication flow:
        -   `Sync interval in seconds`.
1.  To exclude internal topics, add these patterns to your topic
    blacklist:
    -   `.*[\-\.]internal` `.*\.replica` `__.*` `connect.*`
1.  Depending on your use case, consider adjusting these integration parameters:
    -   `consumer_fetch_min_bytes`
    -   `producer_batch_size`
    -   `producer_buffer_memory`
    -   `producer_linger_ms`
    -   `producer_max_request_size`
