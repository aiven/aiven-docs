---
title: Aiven for Apache Kafka® metrics available via Prometheus
---
import HostMetrics from "@site/static/includes/host-metrics.md";

Explore common metrics available via Prometheus for your Aiven for Apache Kafka® service.

## How to retrieve metrics
You can retrieve a complete list of metrics from your service by querying the Prometheus
endpoint. To do this:

1. Gather the necessary details:

   - Aiven project certificate: `ca.pem`. To download the CA certificate, see
     [Download CA certificates](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates).
   - Prometheus credentials: `<PROMETHEUS_USER>:<PROMETHEUS_PASSWORD>`
   - Aiven for Apache Kafka hostname: `<KAFKA_HOSTNAME>`
   - Prometheus port: `<PROMETHEUS_PORT>`

1. Run the following `curl` command to query the Prometheus endpoint:

   ```bash
      curl --cacert ca.pem \
        --user '<PROMETHEUS_USER>:<PROMETHEUS_PASSWORD>' \
         'https://<KAFKA_HOSTNAME>:<PROMETHEUS_PORT>/metrics'
   ```

For more information about setting up Prometheus integration,
see [Use Prometheus with Aiven](/docs/platform/howto/integrations/prometheus-metrics)

<HostMetrics />

## Aiven for Apache Kafka-specific metrics

Metrics specific to Apache Kafka provide detailed insights into the health and
performance of your Kafka clusters, including broker, controller, and topic-level metrics.

## Garbage collector `MXBean`

Metrics associated with the `java_lang_GarbageCollector` provide insights
into the JVM's garbage collection process. These metrics include the collection count
and the duration of collections.

| Metric                                                               | Description                                                                |
|----------------------------------------------------------------------|----------------------------------------------------------------------------|
| `java_lang_GarbageCollector_G1_Young_Generation_CollectionCount`     | Returns the total number of collections that have occurred                |
| `java_lang_GarbageCollector_G1_Young_Generation_CollectionTime`      | Returns the approximate accumulated collection elapsed time in milliseconds|
| `java_lang_GarbageCollector_G1_Young_Generation_duration`            | Duration of G1 Young Generation garbage collections                       |

## Memory Usage

Metrics starting with `java_lang_Memory` provide insights into the JVM's memory usage,
including committed memory, initial memory, max memory, and used memory.

| Metric                                             | Description                                                                         |
|----------------------------------------------------|-------------------------------------------------------------------------------------|
| `java_lang_Memory_committed`                       | Returns the amount of memory in bytes that is committed for the Java virtual machine to use  |
| `java_lang_Memory_init`                            | Returns the amount of memory in bytes that the Java virtual machine initially requests from the operating system for memory management. |
| `java_lang_Memory_max`                             | Returns the maximum amount of memory in bytes that can be used for memory management  |
| `java_lang_Memory_used`                            | Returns the amount of used memory in bytes.                                          |
| `java_lang_Memory_ObjectPendingFinalizationCount`  | Number of objects pending finalization                                              |

## Apache Kafka Connect

For a comprehensive list of Apache Kafka Connect metrics exposed through Prometheus,
see [Apache Kafka® Connect available via Prometheus](../kafka-connect/reference/connect-metrics-prometheus).

## Apache Kafka broker metrics

Apache Kafka brokers expose metrics that provide insights into the health and
performance of the Apache Kafka cluster. Find detailed descriptions of these metrics,
see the [monitoring section of the Apache Kafka documentation](https://kafka.apache.org/documentation/#monitoring).

### Metric types

#### Cumulative counters (`_count`)
Metrics with a `_count` suffix are cumulative counters. They track the total number of
occurrences for a specific event since the broker started.

**Example:**

`kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_Count`: Total number of
 leader elections that have occurred in the controller.

#### Rate counters (`perSec`)
Metrics with a `perSec` suffix in their name are also cumulative counters. They track
the total number of events per second, not the current rate.

**Example:**

`kafka_server_BrokerTopicMetrics_MessagesInPerSec_Count`: Total number of
incoming messages received by the broker.

:::note
To calculate the rate of change for these `_Count` metrics, you can use
functions such as `rate()` in PromQL.
:::

### Apache Kafka controller metrics

Apache Kafka offers a range of metrics to help you assess the performance and
health of your Apache Kafka controller.

- **Percentile Metrics**: Metrics like
  `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_XthPercentile`
  (where X can be 50th, 75th, 95th, etc.) show the time taken for leader elections to
  complete at various percentiles. This helps in understanding the distribution of
  leader election times.
- **Interval Metrics**: Metrics ending with `FifteenMinuteRate`, `FiveMinuteRate`,
  following `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_`, show the
  rate of leader elections over different time intervals.
- **Statistical Metrics**: Metrics ending with `Max`, `Mean`, `Min`, `StdDev`, following
  `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_`, provide statistical
  measures about the leader election times.
- **Controller State Metrics**: Metrics starting with `kafka_controller_KafkaController_`
  give insights into the state of the Kafka controller, such as the number of active
  brokers, offline partitions, and replicas to delete.

| Metric                                                                                         | Description                                                                                  |
|------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_50thPercentile`                  | Time taken for leader elections to complete at the 50th percentile                          |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_75thPercentile`                  | Time taken for leader elections to complete at the 75th percentile                          |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_95thPercentile`                  | Time taken for leader elections to complete at the 95th percentile                          |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_98thPercentile`                  | Time taken for leader elections to complete at the 98th percentile                          |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_99thPercentile`                  | Time taken for leader elections to complete at the 99th percentile                          |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_999thPercentile`                 | Time taken for leader elections to complete at the 99.9th percentile                        |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_Count`                           | The total number of leader elections                                                        |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_FifteenMinuteRate`               | Rate of leader elections over the last 15 minutes                                           |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_FiveMinuteRate`                  | Rate of leader elections over the last 5 minutes                                            |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_Max`                             | Maximum time taken for a leader election                                                    |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_Mean`                            | Mean time taken for leader elections                                                        |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_MeanRate`                        | Mean rate of leader elections                                                               |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_Min`                             | Minimum time taken for a leader election                                                    |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_OneMinuteRate`                   | Rate of leader elections over the last minute                                               |
| `kafka_controller_ControllerStats_LeaderElectionRateAndTimeMs_StdDev`                          | Standard deviation of leader election times                                                 |
| `kafka_controller_ControllerStats_UncleanLeaderElectionsPerSec_Count`                          | Number of unclean leader elections. Unclean leader elections can lead to data loss     |
| `kafka_controller_KafkaController_ActiveBrokerCount_Value`                                     | Number of active brokers                                                                    |
| `kafka_controller_KafkaController_ActiveControllerCount_Value`                                 | Number of active controllers                                                                |
| `kafka_controller_KafkaController_FencedBrokerCount_Value`                                     | Number of fenced brokers                                                                    |
| `kafka_controller_KafkaController_OfflinePartitionsCount_Value`                                | Number of offline partitions                                                                |
| `kafka_controller_KafkaController_PreferredReplicaImbalanceCount_Value`                        | Number of preferred replica imbalances                                                      |
| `kafka_controller_KafkaController_ReplicasIneligibleToDeleteCount_Value`                       | Number of replicas ineligible to delete                                                     |
| `kafka_controller_KafkaController_ReplicasToDeleteCount_Value`                                 | Number of replicas to delete                                                                |
| `kafka_controller_KafkaController_TopicsIneligibleToDeleteCount_Value`                         | Number of topics ineligible to delete                                                       |
| `kafka_controller_KafkaController_TopicsToDeleteCount_Value`                                   | Number of topics to delete                                                                  |

### `Jolokia` collector collect time

Jolokia is a JMX-HTTP bridge that provides an alternative to native JMX access. The
following metric provides insights into the time taken by the Jolokia collector to
collect metrics.

| Metric                                    | Description                                                             |
|-------------------------------------------|-------------------------------------------------------------------------|
| `kafka_jolokia_collector_collect_time`    | Represents the time taken by the Jolokia collector to collect metrics  |

### Apache Kafka log

Apache Kafka provides a variety of metrics that offer insights into its operation.
These metrics are useful for understanding the operation of the log cleaner and log
flush operations.

#### Log cleaner metrics

These metrics provide insights into the log cleaner's operation, which helps in
compacting the Apache Kafka logs.

| Metric                                                         | Description                                                        |
|----------------------------------------------------------------|--------------------------------------------------------------------|
| `kafka_log_LogCleaner_cleaner_recopy_percent_Value`            | Percentage of log segments that were recopied during cleaning     |
| `kafka_log_LogCleanerManager_time_since_last_run_ms_Value`     | Time in milliseconds since the last log cleaner run               |
| `kafka_log_LogCleaner_max_clean_time_secs_Value`               | Maximum time in seconds taken for a log cleaning operation        |

#### Log flush rate metrics

Metrics like `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_XthPercentile` provide the
time taken to flush logs at various percentiles.

These metrics offer insights into log flush operations, ensuring that the system writes
data from memory to disk. They also indicate the time required to flush logs at
different percentiles.

| Metric                                                         | Description                                                        |
|----------------------------------------------------------------|--------------------------------------------------------------------|
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_50thPercentile` | Time taken to flush logs at the 50th percentile                   |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_75thPercentile` | Time taken to flush logs at the 75th percentile                   |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_95thPercentile` | Time taken to flush logs at the 95th percentile                   |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_98thPercentile` | Time taken to flush logs at the 98th percentile                   |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_99thPercentile` | Time taken to flush logs at the 99th percentile                   |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_999thPercentile`| Time taken to flush logs at the 99.9th percentile                 |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_Count`          | Total number of log flush operations                              |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_FifteenMinuteRate` | Rate of log flush operations over the last 15 minutes             |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_FiveMinuteRate` | Rate of log flush operations over the last 5 minutes              |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_Max`            | Maximum time taken for a log flush operation                      |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_Mean`           | Mean time taken for log flush operations                          |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_MeanRate`       | Mean rate of log flush operations                                 |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_Min`            | Minimum time taken for a log flush operation                      |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_OneMinuteRate`  | Rate of log flush operations over the last minute                 |
| `kafka_log_LogFlushStats_LogFlushRateAndTimeMs_StdDev`         | Standard deviation of log flush times                             |

#### Log metrics

These metrics provide general information about log sizes and offsets.

| Metric                                        | Description                                        |
|-----------------------------------------------|----------------------------------------------------|
| `kafka_log_Log_LogEndOffset_Value`            | End offset of the log                         |
| `kafka_log_Log_LogStartOffset_Value`          | Start offset of the log                       |
| `kafka_log_Log_Size_Value`                    | Size of the log                               |

### Apache Kafka network

Apache Kafka provides several metrics, such as
`kafka_network_RequestMetrics_RequestsPerSec_Count` and
`kafka_network_RequestMetrics_TotalTimeMs_Mean`, to monitor the performance and
health of network requests made to the Apache Kafka brokers.

| Metric                                                         | Description                                                                      |
|----------------------------------------------------------------|----------------------------------------------------------------------------------|
| `kafka_network_RequestChannel_RequestQueueSize_Value`          | Size of the request queue                                                       |
| `kafka_network_RequestChannel_ResponseQueueSize_Value`         | Size of the response queue                                                      |
| `kafka_network_RequestMetrics_RequestsPerSec_Count`            | Total number of requests per second.                                             |
| `kafka_network_RequestMetrics_TotalTimeMs_95thPercentile`      | Total time for requests at the 95th percentile                                  |
| `kafka_network_RequestMetrics_TotalTimeMs_Count`               | Total number of requests                                                        |
| `kafka_network_RequestMetrics_TotalTimeMs_Mean`                | Mean total time for requests                                                    |
| `kafka_network_SocketServer_NetworkProcessorAvgIdlePercent_Value` | Average idle percentage of the network processor                              |

### Apache Kafka server

Apache Kafka provides a range of metrics that help monitor the server's
performance and health.

- **Topic metrics**: `BrokerTopicMetrics` offer insights into various operations related
  to topics, such as bytes in/out and failed fetch/produce requests.
- **Replica metrics**: `kafka_server_ReplicaManager_LeaderCount_Value` provides
  insights into the state of replicas within the Apache Kafka cluster.

The `topic` tag is crucial in these metrics. If you don't specify it, the system displays
a combined rate for all topics, along with the rate for each individual topic. To view
rates for specific topics, use the `topic` tag. To exclude the combined rate
for all topics and only list metrics for individual topics, filter with `topic!=""`.

| Metric                                                                           | Description                                                                 |
|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `kafka_server_BrokerTopicMetrics_BytesInPerSec_Count`                            | Byte in (from the clients) rate per topic. Omitting `topic=(...)` will yield the all-topic rate |
| `kafka_server_BrokerTopicMetrics_BytesOutPerSec_Count`                           | Byte out (to the clients) rate per topic. Omitting `topic=(...)` will yield the all-topic rate |
| `kafka_server_BrokerTopicMetrics_BytesRejectedPerSec_Count`                      | Rejected byte rate per topic due to the record batch size being greater than `max.message.bytes` configuration. Omitting `topic=(...)` will yield the all-topic rate |
| `kafka_server_BrokerTopicMetrics_FailedFetchRequestsPerSec_Count`                | Failed fetch request (from clients or followers) rate per topic. Omitting `topic=(...)` will yield the all-topic rate |
| `kafka_server_BrokerTopicMetrics_FailedProduceRequestsPerSec_Count`              | Failed produce request rate per topic. Omitting `topic=(...)` will yield the all-topic rate |
| `kafka_server_BrokerTopicMetrics_FetchMessageConversionsPerSec_Count`            | Message format conversion rate for produce or fetch requests per topic. Omitting `topic=(...)` will yield the all-topic rate. |
| `kafka_server_BrokerTopicMetrics_MessagesInPerSec_Count`                         | Incoming message rate per topic. Omitting `topic=(...)` will yield the all-topic rate |
| `kafka_server_BrokerTopicMetrics_ProduceMessageConversionsPerSec_Count`          | Message format conversion rate for produce or fetch requests per topic. Omitting `topic=(...)` will yield the all-topic rate |
| `kafka_server_BrokerTopicMetrics_ReassignmentBytesInPerSec_Count`                | Incoming byte rate of reassignment traffic. |
| `kafka_server_BrokerTopicMetrics_ReassignmentBytesOutPerSec_Count`               | Outgoing byte rate of reassignment traffic. |
| `kafka_server_BrokerTopicMetrics_ReplicationBytesInPerSec_Count`                 | Byte in (from other brokers) rate per topic. Omitting `topic=(...)` will yield the all-topic rate |
| `kafka_server_BrokerTopicMetrics_ReplicationBytesOutPerSec_Count`                | Byte out (to other brokers) rate per topic. Omitting `topic=(...)` will yield the all-topic rate |
| `kafka_server_BrokerTopicMetrics_TotalFetchRequestsPerSec_Count`                 | Fetch request (from clients or followers) rate per topic. Omitting `topic=(...)` will yield the all-topic rate |
| `kafka_server_BrokerTopicMetrics_TotalProduceRequestsPerSec_Count`               | Total number of produce requests per second. This metric is collected per host and not per topic |
| `kafka_server_DelayedOperationPurgatory_NumDelayedOperations_Value`              | Number of delayed operations in purgatory. |
| `kafka_server_DelayedOperationPurgatory_PurgatorySize_Value`                     | Size of the purgatory queue. |
| `kafka_server_KafkaRequestHandlerPool_RequestHandlerAvgIdlePercent_OneMinuteRate` | Average idle percentage of request handlers over the last minute |
| `kafka_server_KafkaServer_BrokerState_Value`                                     | State of the broker |
| `kafka_server_ReplicaManager_IsrExpandsPerSec_Count`                             | Number of ISR expansions per second |
| `kafka_server_ReplicaManager_IsrShrinksPerSec_Count`                             | Number of ISR shrinks per second |
| `kafka_server_ReplicaManager_LeaderCount_Value`                                  | Number of leader replicas |
| `kafka_server_ReplicaManager_PartitionCount_Value`                               | Number of partitions |
| `kafka_server_ReplicaManager_UnderMinIsrPartitionCount_Value`                    | Number of partitions under the minimum ISR |
| `kafka_server_ReplicaManager_UnderReplicatedPartitions_Value`                    | Number of under-replicated partitions |
| `kafka_server_group_coordinator_metrics_group_completed_rebalance_count`         | Number of completed group rebalances |
| `kafka_server_group_coordinator_metrics_group_completed_rebalance_rate`          | Rate of completed group rebalances |
| `kafka_server_group_coordinator_metrics_offset_commit_count`                     | Number of offset commits |
| `kafka_server_group_coordinator_metrics_offset_commit_rate`                      | Rate of offset commits |
| `kafka_server_group_coordinator_metrics_offset_deletion_count`                   | Number of offset deletions |
| `kafka_server_group_coordinator_metrics_offset_deletion_rate`                    | Rate of offset deletions |
| `kafka_server_group_coordinator_metrics_offset_expiration_count`                 | Number of offset expirations |
| `kafka_server_group_coordinator_metrics_offset_expiration_rate`                  | Rate of offset expirations |

### Tiered storage metrics

Aiven for Apache Kafka includes several metrics to monitor the performance and
health of your Apache Kafka broker's tiered storage operations. Access these metrics
through Prometheus to gain insights into various aspects of tiered storage, including
data copying, fetching, deleting, and their associated lags and errors.

| Metric                                                           | Description                                                                                                      |
|------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `kafka_server_BrokerTopicMetrics_RemoteCopyBytesPerSec_Count`    | Number of bytes per second being copied to remote storage                                                   |
| `kafka_server_BrokerTopicMetrics_RemoteCopyRequestsPerSec_Count` | Number of copy requests per second to remote storage                                                        |
| `kafka_server_BrokerTopicMetrics_RemoteCopyErrorsPerSec_Count`   | Number of errors per second encountered during remote copy                                                  |
| `kafka_server_BrokerTopicMetrics_RemoteCopyLagBytes_Value`       | Number of bytes in non-active segments eligible for tiering that are not yet uploaded to remote storage           |
| `kafka_server_BrokerTopicMetrics_RemoteCopyLagSegments_Value`    | Number of non-active segments eligible for tiering that are not yet uploaded to remote storage                  |
| `kafka_server_BrokerTopicMetrics_RemoteFetchBytesPerSec_Count`   | Number of bytes per second being fetched from remote storage                                                |
| `kafka_server_BrokerTopicMetrics_RemoteFetchRequestsPerSec_Count`| Number of fetch requests per second from remote storage                                                     |
| `kafka_server_BrokerTopicMetrics_RemoteFetchErrorsPerSec_Count`  | Number of errors per second encountered during remote fetch                                                 |
| `kafka_server_BrokerTopicMetrics_RemoteDeleteRequestsPerSec_Count`| Number of delete requests per second to remote storage                                                     |
| `kafka_server_BrokerTopicMetrics_RemoteDeleteErrorsPerSec_Count` | Number of errors per second encountered during remote delete                                                |
| `kafka_server_BrokerTopicMetrics_RemoteDeleteLagBytes_Value`     | Number of bytes in non-active segments marked for deletion but not yet deleted from remote storage           |
| `kafka_server_BrokerTopicMetrics_RemoteDeleteLagSegments_Value`  | Number of non-active segments marked for deletion but not yet deleted from remote storage                   |
