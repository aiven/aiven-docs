---
title: Apache Kafka® metrics sent to Datadog
---

import RelatedPages from "@site/src/components/RelatedPages";
import Note from "@site/static/includes/startup-plan-datadog.md"

<!-- markdownlint-disable MD013 MD060 -->

When you configure a [Datadog service integration](https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration) for Aiven for Apache Kafka®, Aiven sends Kafka metrics to Datadog.
You can also customize selected metrics using the [Aiven CLI](/docs/tools/cli).

## Prerequisites

- A running Aiven for Apache Kafka® service
- A Datadog account
- A Datadog [API key](https://docs.datadoghq.com/account_management/api-app-keys/)
- A [Datadog integration endpoint](/docs/integrations/datadog/datadog-metrics#add-a-datadog-metrics-integration-to-an-aiven-service)

<Note/>

## Metrics sent to Datadog

When you configure a Datadog integration for your Aiven for Apache Kafka® service, Aiven
collects Kafka metrics covering broker throughput, request handling, replication, the
controller, consumers, producers, the JVM, quotas, and tiered storage.

Datadog uses a different naming convention from
[Prometheus metrics](/docs/products/kafka/reference/kafka-metrics-prometheus). Metrics
in this section are grouped by category to help you find the relevant Datadog metric.

:::note
The available metrics depend on your Apache Kafka version, service configuration, and
metadata mode:

- KRaft controller metrics apply to services running in KRaft mode (Apache Kafka 3.9 and later).
- Group coordinator metrics apply to the new group coordinator (Apache Kafka 4.x and later).
- ZooKeeper metrics apply only to services running in ZooKeeper mode.

:::

### Broker throughput metrics

| Metric | Description |
|--------|-------------|
| `kafka.messages_in.rate` | Rate of messages received by the broker |
| `kafka.net.bytes_in.rate` | Rate of bytes received by the broker across all topics |
| `kafka.net.bytes_out.rate` | Rate of bytes sent by the broker across all topics |
| `kafka.net.bytes_rejected.rate` | Rate of bytes rejected by the broker |
| `kafka.net.processor.avg.idle.pct.rate` | Average idle percentage of network processor threads |

### Per-topic throughput metrics

| Metric | Description |
|--------|-------------|
| `kafka.topic.messages_in.rate` | Rate of incoming messages per topic (tagged by `topic` and `partition`) |
| `kafka.topic.net.bytes_in.rate` | Rate of incoming bytes per topic |
| `kafka.topic.net.bytes_out.rate` | Rate of outgoing bytes per topic |
| `kafka.topic.net.bytes_rejected.rate` | Rate of rejected bytes per topic |

### Request handling metrics

| Metric | Description |
|--------|-------------|
| `kafka.request.channel.queue.size` | Number of requests in the request queue |
| `kafka.request.handler.avg.idle.pct.rate` | Average idle percentage of request handler threads (1-minute rate) |
| `kafka.request.produce.rate` | Rate of Produce requests |
| `kafka.request.produce.failed.rate` | Rate of failed Produce requests |
| `kafka.request.produce.time.avg` | Average total time for Produce requests (ms) |
| `kafka.request.produce.time.99percentile` | 99th-percentile total time for Produce requests (ms) |
| `kafka.request.fetch_consumer.rate` | Rate of FetchConsumer requests |
| `kafka.request.fetch_consumer.time.avg` | Average total time for FetchConsumer requests (ms) |
| `kafka.request.fetch_consumer.time.99percentile` | 99th-percentile total time for FetchConsumer requests (ms) |
| `kafka.request.fetch_follower.rate` | Rate of FetchFollower requests |
| `kafka.request.fetch_follower.time.avg` | Average total time for FetchFollower requests (ms) |
| `kafka.request.fetch_follower.time.99percentile` | 99th-percentile total time for FetchFollower requests (ms) |
| `kafka.request.fetch.failed.rate` | Rate of failed Fetch requests |
| `kafka.request.metadata.time.avg` | Average total time for Metadata requests (ms) |
| `kafka.request.metadata.time.99percentile` | 99th-percentile total time for Metadata requests (ms) |
| `kafka.request.offsets.time.avg` | Average total time for Offsets requests (ms) |
| `kafka.request.offsets.time.99percentile` | 99th-percentile total time for Offsets requests (ms) |
| `kafka.request.update_metadata.time.avg` | Average total time for UpdateMetadata requests (ms) |
| `kafka.request.update_metadata.time.99percentile` | 99th-percentile total time for UpdateMetadata requests (ms) |
| `kafka.request.producer_request_purgatory.size` | Number of requests waiting in the producer purgatory |
| `kafka.request.fetch_request_purgatory.size` | Number of requests waiting in the fetch purgatory |

### Replication metrics

| Metric | Description |
|--------|-------------|
| `kafka.replication.active_controller_count` | Number of active controllers (should be 1) |
| `kafka.replication.leader_count` | Number of partitions for which this broker is the leader |
| `kafka.replication.partition_count` | Number of partitions on this broker |
| `kafka.replication.under_replicated_partitions` | Number of under-replicated partitions |
| `kafka.replication.offline_partitions_count` | Number of offline partitions |
| `kafka.replication.isr_expands.rate` | Rate of in-sync replica (ISR) expand events |
| `kafka.replication.isr_shrinks.rate` | Rate of ISR shrink events |
| `kafka.replication.leader_elections.rate` | Rate of leader elections |
| `kafka.replication.unclean_leader_elections.rate` | Rate of unclean leader elections. Unclean leader elections can lead to data loss |
| `kafka.replication.max_lag` | Maximum replication lag across all followers |

### KRaft controller metrics

| Metric | Description |
|--------|-------------|
| `kafka.controller.active_broker_count` | Number of active brokers |
| `kafka.controller.global_topic_count` | Total number of topics |
| `kafka.controller.global_partition_count` | Total number of partitions |
| `kafka.controller.topics_to_delete_count` | Number of topics pending deletion |
| `kafka.controller.replicas_to_delete_count` | Number of replicas pending deletion |
| `kafka.controller.election_from_eligible_leader_replicas_per_sec` | Rate of leader elections from eligible replicas |

### Group coordinator metrics

| Metric | Description |
|--------|-------------|
| `kafka.server.group_coordinator_metrics.group_count` | Total number of consumer groups |
| `kafka.server.group_coordinator_metrics.consumer_group_count` | Number of consumer groups in the new protocol |
| `kafka.server.group_coordinator_metrics.consumer_group_rebalance_count` | Total count of consumer group rebalances |
| `kafka.server.group_coordinator_metrics.consumer_group_rebalance_rate` | Rate of consumer group rebalances |
| `kafka.server.group_coordinator_metrics.group_completed_rebalance_count` | Total count of completed group rebalances |
| `kafka.server.group_coordinator_metrics.group_completed_rebalance_rate` | Rate of completed group rebalances |
| `kafka.server.group_coordinator_metrics.streams_group_count` | Number of Kafka Streams groups |
| `kafka.server.group_coordinator_metrics.streams_group_rebalance_count` | Total count of Kafka Streams group rebalances |
| `kafka.server.group_coordinator_metrics.streams_group_rebalance_rate` | Rate of Kafka Streams group rebalances |
| `kafka.server.group_coordinator_metrics.offset_commit_count` | Total count of offset commits |
| `kafka.server.group_coordinator_metrics.offset_commit_rate` | Rate of offset commits |
| `kafka.server.group_coordinator_metrics.offset_deletion_count` | Total count of offset deletions |
| `kafka.server.group_coordinator_metrics.offset_deletion_rate` | Rate of offset deletions |
| `kafka.server.group_coordinator_metrics.offset_expiration_count` | Total count of offset expirations |
| `kafka.server.group_coordinator_metrics.offset_expiration_rate` | Rate of offset expirations |
| `kafka.server.group_coordinator_metrics.num_partitions` | Number of partitions managed by the group coordinator |
| `kafka.server.group_coordinator_metrics.partition_load_time_avg` | Average partition load time for the group coordinator (ms) |
| `kafka.server.group_coordinator_metrics.partition_load_time_max` | Maximum partition load time for the group coordinator (ms) |
| `kafka.server.group_coordinator_metrics.batch_flush_rate` | Rate of batch flushes in the group coordinator |
| `kafka.server.group_coordinator_metrics.batch_flush_time_ms_max` | Maximum batch flush time in the group coordinator (ms) |
| `kafka.server.group_coordinator_metrics.batch_linger_time_ms_max` | Maximum batch linger time in the group coordinator (ms) |
| `kafka.server.group_coordinator_metrics.event_processing_time_ms_max` | Maximum event processing time in the group coordinator (ms) |
| `kafka.server.group_coordinator_metrics.event_purgatory_time_ms_max` | Maximum time events spent in the group coordinator purgatory (ms) |
| `kafka.server.group_coordinator_metrics.event_queue_size` | Size of the group coordinator event queue |
| `kafka.server.group_coordinator_metrics.event_queue_time_ms_max` | Maximum time events waited in the group coordinator queue (ms) |
| `kafka.server.group_coordinator_metrics.thread_idle_ratio_avg` | Average idle ratio of group coordinator threads |

### Group metadata manager metrics

| Metric | Description |
|--------|-------------|
| `kafka.server.group_metadata_manager.num_groups` | Number of consumer groups managed by this broker |
| `kafka.server.group_metadata_manager.num_groups_preparing_rebalance` | Number of consumer groups preparing for rebalance |
| `kafka.server.group_metadata_manager.num_offsets` | Number of committed offsets stored by this broker |

### Log metrics

| Metric | Description |
|--------|-------------|
| `kafka.log.flush_rate.rate` | Rate of log flush operations |

:::note
Per-partition log size and offset metrics (`kafka.log.log_size`, `kafka.log.log_start_offset`,
and `kafka.log.log_end_offset`) are not collected by default. You can enable them by
configuring the Datadog integration. See
[Configurable custom metrics](#configurable-custom-metrics).
:::

### JVM metrics

| Metric | Description |
|--------|-------------|
| `jvm.heap_memory` | Heap memory used (bytes) |
| `jvm.heap_memory_committed` | Heap memory committed (bytes) |
| `jvm.heap_memory_init` | Heap memory initially requested (bytes) |
| `jvm.heap_memory_max` | Maximum heap memory (bytes) |
| `jvm.non_heap_memory` | Non-heap memory used (bytes) |
| `jvm.non_heap_memory_committed` | Non-heap memory committed (bytes) |
| `jvm.non_heap_memory_init` | Non-heap memory initially requested (bytes) |
| `jvm.non_heap_memory_max` | Maximum non-heap memory (bytes) |
| `jvm.gc.cms.count` | Number of concurrent (CMS) garbage collections |
| `jvm.gc.parnew.time` | Time spent in ParNew garbage collection (ms) |
| `jvm.gc.eden_size` | Size of the eden space (bytes) |
| `jvm.gc.survivor_size` | Size of the survivor space (bytes) |
| `jvm.gc.old_gen_size` | Size of the old generation (bytes) |
| `jvm.gc.metaspace_size` | Size of the metaspace (bytes) |
| `jvm.buffer_pool.direct.capacity` | Capacity of direct buffer pools (bytes) |
| `jvm.buffer_pool.direct.count` | Number of direct buffers in the pool |
| `jvm.buffer_pool.direct.used` | Memory used by direct buffer pools (bytes) |
| `jvm.buffer_pool.mapped.capacity` | Capacity of mapped buffer pools (bytes) |
| `jvm.buffer_pool.mapped.count` | Number of mapped buffers in the pool |
| `jvm.buffer_pool.mapped.used` | Memory used by mapped buffer pools (bytes) |
| `jvm.cpu_load.process` | JVM process CPU load |
| `jvm.cpu_load.system` | System CPU load |
| `jvm.thread_count` | Number of live JVM threads |
| `jvm.loaded_classes` | Number of currently loaded classes |
| `jvm.unloaded_classes` | Number of classes unloaded since JVM start |
| `jvm.os.open_file_descriptors` | Number of open file descriptors |

### Quota metrics

| Metric | Description |
|--------|-------------|
| `kafka.bandwidth.quota.byte.rate` | Bandwidth quota byte rate per client or user |
| `kafka.bandwidth.quota.throttle.time` | Bandwidth quota throttle time per client or user (ms) |
| `kafka.request.quota.request.time` | Request quota request time per client or user (ms) |
| `kafka.request.quota.throttle.time` | Request quota throttle time per client or user (ms) |

### Producer metrics

| Metric | Description |
|--------|-------------|
| `kafka.producer.request_rate` | Producer request rate |
| `kafka.producer.response_rate` | Producer response rate |
| `kafka.producer.request_latency_avg` | Average producer request latency (ms) |
| `kafka.producer.request_latency_max` | Maximum producer request latency (ms) |
| `kafka.producer.requests_in_flight` | Number of producer requests in flight |
| `kafka.producer.message_rate` | Rate of messages sent by producers |
| `kafka.producer.bytes_out` | Rate of bytes sent by producers |
| `kafka.producer.record_send_rate` | Rate of records sent per topic (tagged by `topic` and `partition`) |
| `kafka.producer.records_send_rate` | Rate of records sent by producers |
| `kafka.producer.records_per_request` | Average records per producer request |
| `kafka.producer.record_error_rate` | Rate of errored producer records |
| `kafka.producer.record_retry_rate` | Rate of retried producer records |
| `kafka.producer.record_size_avg` | Average producer record size (bytes) |
| `kafka.producer.record_size_max` | Maximum producer record size (bytes) |
| `kafka.producer.record_queue_time_avg` | Average record queue time for producers (ms) |
| `kafka.producer.record_queue_time_max` | Maximum record queue time for producers (ms) |
| `kafka.producer.batch_size_avg` | Average batch size for producers (bytes) |
| `kafka.producer.batch_size_max` | Maximum batch size for producers (bytes) |
| `kafka.producer.compression_rate` | Compression rate per topic (tagged by `topic` and `partition`) |
| `kafka.producer.compression_rate_avg` | Average compression rate for producers |
| `kafka.producer.available_buffer_bytes` | Available producer buffer memory (bytes) |
| `kafka.producer.buffer_bytes_total` | Total producer buffer memory (bytes) |
| `kafka.producer.bufferpool_wait_time` | Time producer threads blocked on the buffer pool (ms) |
| `kafka.producer.waiting_threads` | Number of waiting producer threads |
| `kafka.producer.io_wait` | Average I/O wait time for producers (ns) |
| `kafka.producer.metadata_age` | Age of producer metadata (seconds) |
| `kafka.producer.throttle_time_avg` | Average producer throttle time (ms) |
| `kafka.producer.throttle_time_max` | Maximum producer throttle time (ms) |

### Consumer metrics

| Metric | Description |
|--------|-------------|
| `kafka.consumer.messages_in` | Rate of messages consumed |
| `kafka.consumer.bytes_in` | Rate of bytes consumed |
| `kafka.consumer.bytes_consumed` | Rate of bytes consumed per topic (tagged by `topic` and `partition`) |
| `kafka.consumer.records_consumed` | Rate of records consumed per topic (tagged by `topic` and `partition`) |
| `kafka.consumer.records_per_request_avg` | Average records per fetch request per topic (tagged by `topic` and `partition`) |
| `kafka.consumer.fetch_rate` | Consumer fetch rate |
| `kafka.consumer.fetch_size_avg` | Average fetch size per topic (tagged by `topic` and `partition`) |
| `kafka.consumer.fetch_size_max` | Maximum fetch size per topic (tagged by `topic` and `partition`) |
| `kafka.consumer.max_lag` | Maximum consumer lag |
| `kafka.consumer.kafka_commits` | Rate of offset commits through Kafka (legacy) |
| `kafka.consumer.zookeeper_commits` | Rate of offset commits through ZooKeeper (legacy) |

:::note
Some client-side producer and consumer metrics require additional configuration to appear
in Datadog. See
[Add client-side Apache Kafka® producer and consumer Datadog metrics](/docs/products/kafka/howto/add-missing-producer-consumer-metrics).
:::

### Consumer lag and offset metrics

| Metric | Description |
|--------|-------------|
| `kafka.broker_offset` | Latest offset on the broker for a topic-partition (tagged by `topic` and `partition`) |
| `kafka.consumer_offset` | Committed consumer offset for a topic-partition (tagged by `topic` and `partition`) |
| `kafka.consumer_lag` | Consumer lag in messages (tagged by `topic` and `partition`) |

### ZooKeeper metrics

These metrics apply only to services running in ZooKeeper mode.

| Metric | Description |
|--------|-------------|
| `kafka.session.zookeeper.disconnect.rate` | Rate of ZooKeeper disconnections |
| `kafka.session.zookeeper.expire.rate` | Rate of ZooKeeper session expirations |
| `kafka.session.zookeeper.readonly.rate` | Rate of ZooKeeper read-only connections |
| `kafka.session.zookeeper.sync.rate` | Rate of ZooKeeper sync connections |

### Tiered storage metrics

For services with [tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage)
enabled, the following metrics are collected automatically to monitor the health and
performance of tiered storage operations.

#### Throughput metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.remote_copy_bytes.rate` | Rate of bytes copied to remote storage |
| `kafka.tiered_storage.remote_copy_requests.rate` | Rate of copy requests to remote storage |
| `kafka.tiered_storage.remote_fetch_bytes.rate` | Rate of bytes fetched from remote storage |
| `kafka.tiered_storage.remote_fetch_requests.rate` | Rate of fetch requests from remote storage |
| `kafka.tiered_storage.remote_delete_requests.rate` | Rate of delete requests to remote storage |
| `kafka.tiered_storage.build_remote_log_aux_state_requests.rate` | Rate of remote log aux-state build requests |

#### Error metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.remote_copy_errors.rate` | Rate of errors when copying segments to remote storage |
| `kafka.tiered_storage.remote_fetch_errors.rate` | Rate of errors when fetching segments from remote storage |
| `kafka.tiered_storage.remote_delete_errors.rate` | Rate of errors when deleting segments from remote storage |
| `kafka.tiered_storage.build_remote_log_aux_state_errors.rate` | Rate of errors rebuilding remote log auxiliary state |

#### Lag metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.remote_copy_lag_bytes` | Bytes eligible for tiering but not yet copied |
| `kafka.tiered_storage.remote_copy_lag_segments` | Segments eligible for tiering but not yet copied |
| `kafka.tiered_storage.remote_delete_lag_bytes` | Bytes eligible for deletion but not yet deleted |
| `kafka.tiered_storage.remote_delete_lag_segments` | Segments eligible for deletion but not yet deleted |

#### Storage metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.remote_log_size_bytes` | Total size of remote log in bytes |
| `kafka.tiered_storage.remote_log_size_computation_time` | Time taken to compute remote log size (ms) |
| `kafka.tiered_storage.remote_log_metadata_count` | Number of remote log metadata entries |

#### Thread pool metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.remote_log_manager_tasks_avg_idle_percent` | Average idle percentage of remote log manager task threads |
| `kafka.tiered_storage.remote_log_reader_avg_idle_percent` | Average idle percentage of remote log reader threads |
| `kafka.tiered_storage.remote_log_reader_task_queue_size` | Size of the remote log reader task queue |
| `kafka.tiered_storage.remote_log_reader_fetch.rate` | Rate of remote log reader fetch operations |
| `kafka.tiered_storage.remote_log_reader_fetch_time_avg` | Average time for remote log reader fetch operations (ms) |
| `kafka.tiered_storage.remote_log_reader_fetch_time_99percentile` | 99th-percentile time for remote log reader fetch (ms) |
| `kafka.tiered_storage.delayed_remote_fetch_expires.rate` | Rate of expired delayed remote fetch operations |

#### Throttling metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.remote_copy_throttle_time_avg` | Average copy throttle time for remote storage (ms) |
| `kafka.tiered_storage.remote_copy_throttle_time_max` | Maximum copy throttle time for remote storage (ms) |
| `kafka.tiered_storage.remote_fetch_throttle_time_avg` | Average fetch throttle time for remote storage (ms) |
| `kafka.tiered_storage.remote_fetch_throttle_time_max` | Maximum fetch throttle time for remote storage (ms) |

#### Cache metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.cache.chunk_cache_size` | Total size of the chunk cache |
| `kafka.tiered_storage.cache.chunk_cache_hits` | Chunk cache hit count |
| `kafka.tiered_storage.cache.chunk_cache_misses` | Chunk cache miss count |
| `kafka.tiered_storage.cache.chunk_cache_evictions` | Chunk cache eviction count |
| `kafka.tiered_storage.cache.chunk_cache_eviction_weight` | Total eviction weight from the chunk cache |
| `kafka.tiered_storage.cache.segment_manifest_cache_size` | Total size of the segment manifest cache |
| `kafka.tiered_storage.cache.segment_manifest_cache_hits` | Segment manifest cache hit count |
| `kafka.tiered_storage.cache.segment_manifest_cache_misses` | Segment manifest cache miss count |
| `kafka.tiered_storage.cache.segment_manifest_cache_evictions` | Segment manifest cache eviction count |
| `kafka.tiered_storage.cache.segment_indexes_cache_size` | Total size of the segment indexes cache |
| `kafka.tiered_storage.cache.segment_indexes_cache_hits` | Segment indexes cache hit count |
| `kafka.tiered_storage.cache.segment_indexes_cache_misses` | Segment indexes cache miss count |
| `kafka.tiered_storage.cache.segment_indexes_cache_evictions` | Segment indexes cache eviction count |

Metrics specific to your cloud storage provider and to the Aiven remote storage manager
are listed by backend below.

#### Amazon S3 tiered storage metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.s3.get_object_requests_rate` | Rate of S3 GetObject requests |
| `kafka.tiered_storage.s3.get_object_time_avg` | Average latency of S3 GetObject requests (ms) |
| `kafka.tiered_storage.s3.delete_object_requests_rate` | Rate of S3 DeleteObject requests |
| `kafka.tiered_storage.s3.upload_part_requests_rate` | Rate of S3 UploadPart requests |
| `kafka.tiered_storage.s3.create_multipart_upload_time_avg` | Average latency of S3 CreateMultipartUpload requests (ms) |
| `kafka.tiered_storage.s3.complete_multipart_upload_time_avg` | Average latency of S3 CompleteMultipartUpload requests (ms) |

#### Google Cloud Storage tiered storage metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.gcs.object_get_rate` | Rate of GCS object get requests |
| `kafka.tiered_storage.gcs.object_delete_rate` | Rate of GCS object delete requests |
| `kafka.tiered_storage.gcs.resumable_upload_initiate_rate` | Rate of GCS resumable upload initiations |
| `kafka.tiered_storage.gcs.resumable_chunk_upload_rate` | Rate of GCS resumable chunk uploads |

#### Azure Blob Storage tiered storage metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.azure.blob_get_rate` | Rate of Azure Blob get requests |
| `kafka.tiered_storage.azure.blob_upload_rate` | Rate of Azure Blob upload requests |
| `kafka.tiered_storage.azure.blob_delete_rate` | Rate of Azure Blob delete requests |
| `kafka.tiered_storage.azure.block_upload_rate` | Rate of Azure Block upload requests |
| `kafka.tiered_storage.azure.block_list_upload_rate` | Rate of Azure BlockList upload requests |

#### Aiven remote storage manager (RSM) tiered storage metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.aiven.segment_copy_bytes_rate` | Rate of bytes copied to remote storage (Aiven RSM) |
| `kafka.tiered_storage.aiven.segment_copy_time_avg` | Average time to copy a segment to remote storage (ms) |
| `kafka.tiered_storage.aiven.segment_copy_time_max` | Maximum time to copy a segment to remote storage (ms) |
| `kafka.tiered_storage.aiven.segment_delete_bytes_rate` | Rate of bytes deleted from remote storage (Aiven RSM) |
| `kafka.tiered_storage.aiven.segment_delete_time_avg` | Average time to delete a segment from remote storage (ms) |
| `kafka.tiered_storage.aiven.segment_delete_time_max` | Maximum time to delete a segment from remote storage (ms) |

## Configurable custom metrics

The following per-partition log metrics are not collected by default. You can enable them
by configuring the Datadog integration. These metrics are tagged with `topic`
and `partition`, enabling independent monitoring of each topic and partition:

- `kafka.log.log_size`
- `kafka.log.log_start_offset`
- `kafka.log.log_end_offset`

## Variables

Replace the following placeholders in the code samples:

 | Variable         | Description                                                               |
 | ---------------- | ------------------------------------------------------------------------- |
 | `SERVICE_NAME`   | Aiven for Apache Kafka® service name                                      |
 | `INTEGRATION_ID` | ID of the integration between Aiven for Apache Kafka® service and Datadog |

To find the `INTEGRATION_ID` parameter, run:

```bash
avn service integration-list SERVICE_NAME
```

## Customize metrics for Datadog

Before customizing metrics, configure and enable a Datadog endpoint in your
Aiven for Apache Kafka® service.
For setup instructions, see
[Send metrics to Datadog](/docs/integrations/datadog/datadog-metrics).

Format any listed parameters as a comma-separated list:
`['value0', 'value1', 'value2', ...]`.

To customize Datadog metrics, use the `service integration-update` command with the
`kafka_custom_metrics` parameter. Specify a comma-separated list of custom
metrics, such as `kafka.log.log_size`, `kafka.log.log_start_offset`, and
`kafka.log.log_end_offset`.

For example, to send the `kafka.log.log_size` and
`kafka.log.log_end_offset` metrics, run:

```bash
avn service integration-update                                                \
    -c 'kafka_custom_metrics=["kafka.log.log_size","kafka.log.log_end_offset"]' \
    INTEGRATION_ID
```

After updating settings, view the collected metrics in the Datadog Metrics Explorer.

## Customize consumer metrics for Datadog

[Apache Kafka Consumer
Integration](https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration)
collects metrics for message offsets. To customize the metrics sent from
this Datadog integration to Datadog, use the `service integration-update` command with
the following parameters:

- `include_topics`: A comma-separated list of topics to include.

  :::note
  By default, all topics are included.
  :::

- `exclude_topics`: A comma-separated list of topics to exclude.

  :::note
  To use `exclude_topics`, specify at least one `include_consumer_groups` value.
  Otherwise, `exclude_topics` does not take effect.
  :::

- `include_consumer_groups`: A comma-separated list of consumer groups to include.

- `exclude_consumer_groups`: A comma-separated list of consumer groups to exclude.

For example, to include topics `topic1` and `topic2`, run:

```bash
avn service integration-update                                                  \
    -c 'kafka_custom_metrics=["kafka.log.log_size","kafka.log.log_end_offset"]' \
    -c 'include_topics=["topic1","topic2"]'                                     \
    INTEGRATION_ID
```

After updating settings, view the collected metrics in the Datadog Metrics Explorer.

<RelatedPages/>

- [Datadog and Aiven](/docs/integrations/datadog)
- [Add client-side Apache Kafka® producer and consumer Datadog metrics](/docs/products/kafka/howto/add-missing-producer-consumer-metrics)
- [Aiven for Apache Kafka® metrics available via Prometheus](/docs/products/kafka/reference/kafka-metrics-prometheus)
