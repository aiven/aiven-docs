---
title: Aiven for Apache Kafka® metrics available via Prometheus
---

Explore common metrics available via Prometheus for your Aiven for Apache Kafka® service.

## How to retrieve metrics

To get the complete list of available metrics for your service, query the
Prometheus endpoint. To get started:

1. Ensure you have the following information:

   - Aiven project certificate: `ca.pem`. To download the CA certificate, see
     [Download CA certificates](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates).
   - Prometheus credentials: `<PROMETHEUS_USER>:<PROMETHEUS_PASSWORD>`
   - Aiven for Apache Kafka hostname: `<KAFKA_HOSTNAME>`
   - Prometheus port: `<PROMETHEUS_PORT>`

1. Use the `curl` command to query the Prometheus endpoint:

   ```bash
      curl --cacert ca.pem \
        --user '<PROMETHEUS_USER>:<PROMETHEUS_PASSWORD>' \
         'https://<KAFKA_HOSTNAME>:<PROMETHEUS_PORT>/metrics'
   ```

For detailed instructions on setting up Prometheus integration with
Aiven, see [Use Prometheus with Aiven](/docs/platform/howto/integrations/prometheus-metrics)

## CPU utilization

CPU utilization metrics offer insights into CPU usage. These metrics
include time spent on different processes, system load, and overall uptime.

| Metric                  | Description                                                                                           |
|-------------------------|-------------------------------------------------------------------------------------------------------|
| `cpu_usage_guest`       | CPU time spent running a virtual CPU for guest operating systems                                     |
| `cpu_usage_guest_nice`  | CPU time spent running low-priority virtual CPUs for guest operating systems. These processes can be interrupted by higher-priority tasks. Metric is measured in hundredths of a second |
| `cpu_usage_idle`        | Time the CPU spends doing nothing                                                                   |
| `cpu_usage_iowait`      | Time waiting for I/O to complete                                                                     |
| `cpu_usage_irq`         | Time servicing interrupts                                                                            |
| `cpu_usage_nice`        | Time running user-niced processes                                                                   |
| `cpu_usage_softirq`     | Time servicing softirqs                                                                         |
| `cpu_usage_steal`       | Time spent in other operating systems when running in a virtualized environment                      |
| `cpu_usage_system`      | Time spent running system processes                                                                  |
| `cpu_usage_user`        | Time spent running user processes                                                                    |
| `system_load1`          | System load average for the last minute                                                              |
| `system_load15`         | System load average for the last 15 minutes                                                          |
| `system_load5`          | System load average for the last 5 minutes                                                           |
| `system_n_cpus`         | Number of CPU cores available                                                                        |
| `system_n_users`        | Number of users logged in                                                                            |
| `system_uptime`         | Time for which the system has been up and running                                                    |

## Disk space utilization

Disk space utilization metrics provide a snapshot of disk usage. These metrics include
information about free and used disk space, as well as `inode` usage and
total disk capacity.

| Metric               | Description                   |
|----------------------|-------------------------------|
| `disk_free`          | Amount of free disk space    |
| `disk_inodes_free`   | Number of free inodes        |
| `disk_inodes_total`  | Total number of inodes       |
| `disk_inodes_used`   | Number of used inodes        |
| `disk_total`         | Total disk space             |
| `disk_used`          | Amount of used disk space    |
| `disk_used_percent`  | Percentage of disk space used|

## Disk input and output

Metrics such as `diskio_io_time` and `diskio_iops_in_progress` provide insights into
disk I/O operations. These metrics cover read/write operations, the duration of these
operations, and the number of bytes read/written.

| Metric                   | Description                                                                                           |
|--------------------------|-------------------------------------------------------------------------------------------------------|
| `diskio_io_time`         | Total time spent on I/O operations                                                                   |
| `diskio_iops_in_progress`| Number of I/O operations currently in progress                                                       |
| `diskio_merged_reads`    | Number of read operations that were merged                                                           |
| `diskio_merged_writes`   | Number of write operations that were merged                                                          |
| `diskio_read_bytes`      | Total bytes read from disk                                                                           |
| `diskio_read_time`       | Total time spent on read operations                                                                  |
| `diskio_reads`           | Total number of read operations                                                                      |
| `diskio_weighted_io_time`| Weighted time spent on I/O operations, considering their duration and intensity                      |
| `diskio_write_bytes`     | Total bytes written to disk                                                                          |
| `diskio_write_time`      | Total time spent on write operations                                                                 |
| `diskio_writes`          | Total number of write operations                                                                     |

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

### Kernel

The metrics listed below, such as `kernel_boot_time` and `kernel_context_switches`, provide
insights into the operations of your system's kernel.


| Metric                     | Description                                      |
|----------------------------|--------------------------------------------------|
| `kernel_boot_time`         | Time at which the system was last booted   |
| `kernel_context_switches`  | Number of context switches that have occurred in the kernel |
| `kernel_entropy_avail`     | Amount of available entropy in the kernel's entropy pool |
| `kernel_interrupts`        | Number of interrupts that have occurred     |
| `kernel_processes_forked`  | Number of processes that have been forked   |

### Generic memory

The following metrics, including `mem_active` and `mem_available`, provide insights into
your system's memory usage.

| Metric                   | Description                                                    |
|--------------------------|----------------------------------------------------------------|
| `mem_active`             | Amount of actively used memory                            |
| `mem_available`          | Amount of available memory                                |
| `mem_available_percent`  | Percentage of available memory                            |
| `mem_buffered`           | Amount of memory used for buffering I/O                   |
| `mem_cached`             | Amount of memory used for caching                         |
| `mem_commit_limit`       | Maximum amount of memory that can be committed            |
| `mem_committed_as`       | Total amount of committed memory                          |
| `mem_dirty`              | Amount of memory waiting to be written to disk            |
| `mem_free`               | Amount of free memory                                     |
| `mem_high_free`          | Amount of free memory in the high memory zone             |
| `mem_high_total`         | Total amount of memory in the high memory zone            |
| `mem_huge_pages_free`    | Number of free huge pages                                 |
| `mem_huge_page_size`     | Size of huge pages                                        |
| `mem_huge_pages_total`   | Total number of huge pages                                |
| `mem_inactive`           | Amount of inactive memory                                 |
| `mem_low_free`           | Amount of free memory in the low memory zone              |
| `mem_low_total`          | Total amount of memory in the low memory zone             |
| `mem_mapped`             | Amount of memory mapped into the process's address space  |
| `mem_page_tables`        | Amount of memory used by page tables                      |
| `mem_shared`             | Amount of memory shared between processes                 |
| `mem_slab`               | Amount of memory used by the kernel for data structure caches |
| `mem_swap_cached`        | Amount of swap memory cached                             |
| `mem_swap_free`          | Amount of free swap memory                                |
| `mem_swap_total`         | Total amount of swap memory                               |
| `mem_total`              | Total amount of memory                                    |
| `mem_used`               | Amount of used memory                                     |
| `mem_used_percent`       | Percentage of used memory                                 |
| `mem_vmalloc_chunk`      | Largest contiguous block of vmalloc memory available      |
| `mem_vmalloc_total`      | Total amount of vmalloc memory                            |
| `mem_vmalloc_used`       | Amount of used vmalloc memory                             |
| `mem_wired`              | Amount of wired memory                                    |
| `mem_write_back`         | Amount of memory being written back to disk               |
| `mem_write_back_tmp`     | Amount of temporary memory being written back to disk     |

### Network

The following metrics, including `net_bytes_recv` and `net_packets_sent`, provide insights
into your system's network operations.

| Metric                       | Description                                                                     |
|------------------------------|---------------------------------------------------------------------------------|
| `net_bytes_recv`             | Total bytes received on the network interfaces                                 |
| `net_bytes_sent`             | Total bytes sent on the network interfaces                                     |
| `net_drop_in`                | Incoming packets dropped                                                      |
| `net_drop_out`               | Outgoing packets dropped                                                       |
| `net_err_in`                 | Incoming packets with errors                                                   |
| `net_err_out`                | Outgoing packets with errors                                                   |
| `net_icmp_inaddrmaskreps`    | Number of ICMP address mask replies received                                   |
| `net_icmp_inaddrmasks`       | Number of ICMP address mask requests received                                  |
| `net_icmp_incsumerrors`      | Number of ICMP checksum errors                                                 |
| `net_icmp_indestunreachs`    | Number of ICMP destination unreachable messages received                       |
| `net_icmp_inechoreps`        | Number of ICMP echo replies received                                           |
| `net_icmp_inechos`           | Number of ICMP echo requests received                                          |
| `net_icmp_inerrors`          | Number of ICMP messages received with errors                                |
| `net_icmp_inmsgs`            | Total number of ICMP messages received                                        |
| `net_icmp_inparmprobs`       | Number of ICMP parameter problem messages received                             |
| `net_icmp_inredirects`       | Number of ICMP redirect messages received                                      |
| `net_icmp_insrcquenchs`      | Number of ICMP source quench messages received                                 |
| `net_icmp_intimeexcds`       | Number of ICMP time exceeded messages received                                 |
| `net_icmp_intimestampreps`   | Number of ICMP timestamp reply messages received                               |
| `net_icmp_intimestamps`      | Number of ICMP timestamp request messages received                             |
| `net_icmpmsg_intype3`        | Number of ICMP type 3 (destination unreachable) messages received              |
| `net_icmpmsg_intype8`        | Number of ICMP type 8 (echo request) messages received                         |
| `net_icmpmsg_outtype0`       | Number of ICMP type 0 (echo reply) messages sent                               |
| `net_icmpmsg_outtype3`       | Number of ICMP type 3 (destination unreachable) messages sent                  |
| `net_icmp_outaddrmaskreps`   | Number of ICMP address mask reply messages sent                                |
| `net_icmp_outaddrmasks`      | Number of ICMP address mask request messages sent                              |
| `net_icmp_outdestunreachs`   | Number of ICMP destination unreachable messages sent                           |
| `net_icmp_outechoreps`       | Number of ICMP echo reply messages sent                                        |
| `net_icmp_outechos`          | Number of ICMP echo request messages sent                                      |
| `net_icmp_outerrors`         | Number of ICMP messages sent with errors                                       |
| `net_icmp_outmsgs`           | Total number of ICMP messages sent                                             |
| `net_icmp_outparmprobs`      | Number of ICMP parameter problem messages sent                                 |
| `net_icmp_outredirects`      | Number of ICMP redirect messages sent                                          |
| `net_icmp_outsrcquenchs`     | Number of ICMP source quench messages sent                                     |
| `net_icmp_outtimeexcds`      | Number of ICMP time exceeded messages sent                                     |
| `net_icmp_outtimestampreps`  | Number of ICMP timestamp reply messages sent                                   |
| `net_icmp_outtimestamps`     | Number of ICMP timestamp request messages sent                                 |
| `net_ip_defaultttl`          | Default time-to-live for IP packets                                            |
| `net_ip_forwarding`          | Indicates if IP forwarding is enabled                                          |
| `net_ip_forwdatagrams`       | Number of forwarded IP datagrams                                               |
| `net_ip_fragcreates`         | Number of IP fragments created                                                 |
| `net_ip_fragfails`           | Number of failed IP fragmentations                                             |
| `net_ip_fragoks`             | Number of successful IP fragmentations                                         |
| `net_ip_inaddrerrors`        | Number of incoming IP packets with address errors                              |
| `net_ip_indelivers`          | Number of incoming IP packets delivered to higher layers                       |
| `net_ip_indiscards`          | Number of incoming IP packets discarded                                        |
| `net_ip_inhdrerrors`         | Number of incoming IP packets with header errors                               |
| `net_ip_inreceives`          | Total number of incoming IP packets received                                   |
| `net_ip_inunknownprotos`     | Number of incoming IP packets with unknown protocols                           |
| `net_ip_outdiscards`         | Number of outgoing IP packets discarded                                        |
| `net_ip_outnoroutes`         | Number of outgoing IP packets with no route available                         |
| `net_ip_outrequests`         | Total number of outgoing IP packets requested to be sent                       |
| `net_ip_reasmfails`          | Number of failed IP reassembly attempts                                        |
| `net_ip_reasmoks`            | Number of successful IP reassembly attempts                                    |
| `net_ip_reasmreqds`          | Number of IP fragments received needing reassembly                             |
| `net_ip_reasmtimeout`        | Number of IP reassembly timeouts                                               |
| `net_packets_recv`           | Total number of packets received on the network interfaces                     |
| `net_packets_sent`           | Total number of packets sent on the network interfaces                         |
| `netstat_tcp_close`          | Number of TCP connections in the CLOSE state                                   |
| `netstat_tcp_close_wait`     | Number of TCP connections in the CLOSE_WAIT state                              |
| `netstat_tcp_closing`        | Number of TCP connections in the CLOSING state                                 |
| `netstat_tcp_established`    | Number of TCP connections in the ESTABLISHED state                             |
| `netstat_tcp_fin_wait1`      | Number of TCP connections in the FIN_WAIT_1 state                              |
| `netstat_tcp_fin_wait2`      | Number of TCP connections in the FIN_WAIT_2 state                              |
| `netstat_tcp_last_ack`       | Number of TCP connections in the LAST_ACK state                                |
| `netstat_tcp_listen`         | Number of TCP connections in the LISTEN state                                 |
| `netstat_tcp_none`           | Number of TCP connections in the NONE state                                    |
| `netstat_tcp_syn_recv`       | Number of TCP connections in the SYN_RECV state                                |
| `netstat_tcp_syn_sent`       | Number of TCP connections in the SYN_SENT state                               |
| `netstat_tcp_time_wait`      | Number of TCP connections in the TIME_WAIT state                               |
| `netstat_udp_socket`         | Number of UDP sockets                                                          |
| `net_tcp_activeopens`        | Number of active TCP open connections                                          |
| `net_tcp_attemptfails`       | Number of failed TCP connection attempts                                       |
| `net_tcp_currestab`          | Number of currently established TCP connections                                |
| `net_tcp_estabresets`        | Number of established TCP connections reset                                    |
| `net_tcp_incsumerrors`       | Number of TCP checksum errors in incoming packets                              |
| `net_tcp_inerrs`             | Number of incoming TCP packets with errors                                     |
| `net_tcp_insegs`             | Number of TCP segments received                                                |
| `net_tcp_maxconn`            | Maximum number of TCP connections supported                                    |
| `net_tcp_outrsts`            | Number of TCP reset packets sent                                               |
| `net_tcp_outsegs`            | Number of TCP segments sent                                                    |
| `net_tcp_passiveopens`       | Number of passive TCP open connections                                         |
| `net_tcp_retranssegs`        | Number of TCP segments retransmitted                                           |
| `net_tcp_rtoalgorithm`       | TCP retransmission timeout algorithm                                           |
| `net_tcp_rtomax`             | Maximum TCP retransmission timeout                                             |
| `net_tcp_rtomin`             | Minimum TCP retransmission timeout                                             |
| `net_udp_ignoredmulti`       | Number of UDP multicast packets ignored                                        |
| `net_udp_incsumerrors`       | Number of UDP checksum errors in incoming packets                              |
| `net_udp_indatagrams`        | Number of UDP datagrams received                                               |
| `net_udp_inerrors`           | Number of incoming UDP packets with errors                                     |
| `net_udplite_ignoredmulti`   | Number of UDP-Lite multicast packets ignored                                  |
| `net_udplite_incsumerrors`   | Number of UDP-Lite checksum errors in incoming packets                         |
| `net_udplite_indatagrams`    | Number of UDP-Lite datagrams received                                          |
| `net_udplite_inerrors`       | Number of incoming UDP-Lite packets with errors                                |
| `net_udplite_noports`        | Number of UDP-Lite packets received with no port available                     |
| `net_udplite_outdatagrams`   | Number of UDP-Lite datagrams sent                                              |
| `net_udplite_rcvbuferrors`   | Number of UDP-Lite receive buffer errors                                       |
| `net_udplite_sndbuferrors`   | Number of UDP-Lite send buffer errors                                          |
| `net_udp_noports`            | Number of UDP packets received with no port available                          |
| `net_udp_outdatagrams`       | Number of UDP datagrams sent                                                   |
| `net_udp_rcvbuferrors`       | Number of UDP receive buffer errors                                            |
| `net_udp_sndbuferrors`       | Number of UDP send buffer errors                                               |

### Process

Metrics such as `processes_running` and `processes_zombies` provide insights into the
management of the system's processes.

| Metric                     | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `processes_blocked`        | Number of processes that are blocked                                       |
| `processes_dead`           | Number of processes that have terminated                                   |
| `processes_idle`           | Number of processes that are idle                                          |
| `processes_paging`         | Number of processes that are paging                                        |
| `processes_running`        | Number of processes currently running                                     |
| `processes_sleeping`       | Number of processes that are sleeping                                      |
| `processes_stopped`        | Number of processes that are stopped                                       |
| `processes_total`          | Total number of processes                                                  |
| `processes_total_threads`  | Total number of threads across all processes                               |
| `processes_unknown`        | Number of processes in an unknown state                                   |
| `processes_zombies`        | Number of zombie processes (terminated but not reaped by parent process)   |

### Swap usage

Metrics such as `swap_free` and `swap_used` provide insights into the usage of the
system's swap memory.

| Metric             | Description                                      |
|--------------------|--------------------------------------------------|
| `swap_free`        | Amount of free swap memory                      |
| `swap_in`          | Amount of data swapped in from disk             |
| `swap_out`         | Amount of data swapped out to disk              |
| `swap_total`       | Total amount of swap memory                     |
| `swap_used`        | Amount of used swap memory                      |
| `swap_used_percent`| Percentage of swap memory used                  |
