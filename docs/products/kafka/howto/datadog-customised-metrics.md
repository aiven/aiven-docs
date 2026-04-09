---
title: Configure Apache Kafka® metrics sent to Datadog
---

import RelatedPages from "@site/src/components/RelatedPages";
import Note from "@site/static/includes/startup-plan-datadog.md"

When creating a [Datadog service integration](https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration), you can customize which metrics are sent to the Datadog endpoint using the [Aiven CLI](/docs/tools/cli).

## Prerequisites

- A running Aiven for Apache Kafka service
- A Datadog account
- A Datadog [API key](https://docs.datadoghq.com/account_management/api-app-keys/)
- A [Datadog integration endpoint](/docs/integrations/datadog/datadog-metrics#add-a-datadog-metrics-integration-to-an-aiven-service)

<Note/>

## Default metrics

When a Datadog integration is configured for your Aiven for Apache Kafka service,
a comprehensive set of Kafka broker metrics is collected automatically. These include
standard JMX metrics for broker health, request handling, and replication.

### Tiered storage metrics

For services with [tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage)
enabled, the following metrics are collected automatically to monitor the health and
performance of tiered storage operations:

#### Error metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.remote_copy_errors.rate` | Rate of errors when copying segments to remote storage |
| `kafka.tiered_storage.remote_fetch_errors.rate` | Rate of errors when fetching segments from remote storage |
| `kafka.tiered_storage.remote_delete_errors.rate` | Rate of errors when deleting segments from remote storage |
| `kafka.tiered_storage.build_remote_log_aux_state_errors.rate` | Rate of errors rebuilding auxiliary state |

#### Throughput metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.remote_copy_bytes.rate` | Rate of bytes copied to remote storage |
| `kafka.tiered_storage.remote_copy_requests.rate` | Rate of copy requests to remote storage |
| `kafka.tiered_storage.remote_fetch_bytes.rate` | Rate of bytes fetched from remote storage |
| `kafka.tiered_storage.remote_fetch_requests.rate` | Rate of fetch requests from remote storage |
| `kafka.tiered_storage.remote_delete_requests.rate` | Rate of delete requests to remote storage |

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
| `kafka.tiered_storage.remote_log_metadata_count` | Number of metadata entries for remote storage |

#### Thread pool metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.remote_log_manager_tasks_avg_idle_percent` | Average idle percent of copy thread pool |
| `kafka.tiered_storage.remote_log_reader_avg_idle_percent` | Average idle percent of read thread pool |
| `kafka.tiered_storage.remote_log_reader_task_queue_size` | Size of read task queue |

#### Throttling metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.remote_fetch_throttle_time_avg` | Average fetch throttle time in milliseconds |
| `kafka.tiered_storage.remote_fetch_throttle_time_max` | Maximum fetch throttle time in milliseconds |
| `kafka.tiered_storage.remote_copy_throttle_time_avg` | Average copy throttle time in milliseconds |
| `kafka.tiered_storage.remote_copy_throttle_time_max` | Maximum copy throttle time in milliseconds |

#### Cache metrics

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.cache.chunk_cache_size` | Size of the chunk cache |
| `kafka.tiered_storage.cache.chunk_cache_hits` | Chunk cache hit count |
| `kafka.tiered_storage.cache.chunk_cache_misses` | Chunk cache miss count |
| `kafka.tiered_storage.cache.segment_manifest_cache_size` | Size of segment manifest cache |
| `kafka.tiered_storage.cache.segment_indexes_cache_size` | Size of segment indexes cache |

#### Cloud storage backend metrics

Metrics specific to your cloud storage provider, such as S3, GCS, or Azure:

| Metric | Description |
|--------|-------------|
| `kafka.tiered_storage.s3.get_object_requests_rate` | S3 GetObject request rate |
| `kafka.tiered_storage.s3.get_object_time_avg` | Average S3 GetObject latency |
| `kafka.tiered_storage.gcs.object_get_rate` | GCS object get rate |
| `kafka.tiered_storage.azure.blob_get_rate` | Azure Blob get rate |

## Configurable custom metrics

The following metrics can be enabled on-demand by configuring the Datadog integration.
These metrics are tagged with `topic` and `partition`, enabling independent monitoring
of each topic and partition:

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
Aiven for Apache Kafka service.
For setup instructions, see
[Send metrics to Datadog](/docs/integrations/datadog/datadog-metrics).

Format any listed parameters as a comma-separated list:
`['value0', 'value1', 'value2', ...]`.

To customize the metrics sent to Datadog, use the `service integration-update` command
with the `kafka_custom_metrics` parameter. Specify a comma-separated list of custom
metrics, such as `kafka.log.log_size`, `kafka.log.log_start_offset`, and
`kafka.log.log_end_offset`.

For example, to send the `kafka.log.log_size` and
`kafka.log.log_end_offset` metrics, run:

```bash
avn service integration-update                                                \
    -c 'kafka_custom_metrics=["kafka.log.log_size","kafka.log.log_end_offset"]' \
    INTEGRATION_ID
```

After updating settings, view the collected metrics in your Datadog explorer.

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

  :::warning
  To use `exclude_topics`, you must specify at least one `include_consumer_groups`
  value. Otherwise, `exclude_topics` does not take effect.
  :::

- `include_consumer_groups`: A comma-separated list of consumer groups to include.

- `exclude_consumer_groups`: A comma-separated list of consumer groups to exclude.

For example, to include topics `topic1` and `topic2`, and exclude
`topic3`, run:

```bash
avn service integration-update                                                  \
    -c 'kafka_custom_metrics=["kafka.log.log_size","kafka.log.log_end_offset"]' \
    -c 'include_topics=["topic1","topic2"]'                                     \
    INTEGRATION_ID
```

After updating settings, view the collected metrics in your Datadog explorer.

<RelatedPages/>

- [Datadog and Aiven](/docs/integrations/datadog)
