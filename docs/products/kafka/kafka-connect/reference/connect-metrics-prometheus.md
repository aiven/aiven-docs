---
title: Aiven for Apache Kafka® Connect metrics available via Prometheus
---

Discover metrics offered by Prometheus for the Aiven for Apache Kafka® Connect service.

:::note
The metrics only appear if there is activity in the underlying
Apache Kafka Connect service.
:::

| Metric                                                                         | Description                                                            |
|--------------------------------------------------------------------------------|------------------------------------------------------------------------|
| `kafka_connect_connect_worker_metrics_connector_count`                         | Number of connectors run in this worker                            |
| `kafka_connect_connect_worker_metrics_connector_startup_attempts_total`        | Total number of connector startups that this worker has attempted  |
| `kafka_connect_connect_worker_metrics_connector_startup_failure_percentage`    | Average percentage of this worker's connector starts that failed  |
| `kafka_connect_connect_worker_metrics_connector_startup_failure_total`         | Total number of connector starts that failed                       |
| `kafka_connect_connect_worker_metrics_connector_startup_success_percentage`    | Average percentage of this worker's connector starts that succeeded |
| `kafka_connect_connect_worker_metrics_connector_startup_success_total`         | Total number of connector starts that succeeded              |
| `kafka_connect_connect_worker_metrics_task_count`                              | Number of tasks run in this worker                           |
| `kafka_connect_connect_worker_metrics_task_startup_attempts_total`             | Total number of task startups that this worker has attempted |
| `kafka_connect_connect_worker_metrics_task_startup_failure_percentage`         | Average percentage of this worker's task starts that failed  |
| `kafka_connect_connect_worker_metrics_task_startup_failure_total`              | Total number of task starts that failed                      |
| `kafka_connect_connect_worker_metrics_task_startup_success_percentage`         | Average percentage of this worker's task starts that succeeded |
| `kafka_connect_connect_worker_metrics_task_startup_success_total`              | Total number of task starts that succeeded                   |
| `kafka_connect_connect_worker_rebalance_metrics_completed_rebalances_total`    | Total number of rebalances completed by this worker          |
| `kafka_connect_connect_worker_rebalance_metrics_epoch`                         | Epoch or generation number of this worker                    |
| `kafka_connect_connect_worker_rebalance_metrics_rebalance_avg_time_ms`         | Average time in milliseconds spent by this worker to rebalance |
| `kafka_connect_connect_worker_rebalance_metrics_rebalancing`                   | Whether this worker is currently rebalancing                     |
| `kafka_connect_connect_worker_rebalance_metrics_time_since_last_rebalance_ms`  | Time in milliseconds since this worker completed the most recent rebalance |
| `kafka_connect:connector_task_metrics_info`                                    | Aggregated information about the connector tasks, such as their statuses and other metadata. |
| `kafka.connect:connector-metrics_info`                                         | Aggregated information about the connectors, including statuses and metadata. |
| `kafka_connect_connector_metrics_connector_class`                              | The class name of the connector                                             |
| `kafka_connect_connector_metrics_connector_version`                            | The version of the connector                                                |
| `kafka_connect_connector_metrics_connector_type`                               | The type of the connector, for example, source or sink                        |
| `kafka_connect_connector_metrics_status`                                       | The status of the connector, for example, running, paused                     |
| `kafka_connect_connect_worker_rebalance_metrics_failed_rebalances_total`       | Total number of rebalances that failed                                      |
| `kafka_connect_connect_worker_rebalance_metrics_rebalance_max_time_ms`         | Maximum time in milliseconds taken by this worker to rebalance              |
| `kafka_connect_connect_worker_rebalance_metrics_rebalance_min_time_ms`         | Minimum time in milliseconds taken by this worker to rebalance              |


## Related pages

- [Aiven for Apache Kafka® metrics available via Prometheus](/docs/products/kafka/reference/kafka-metrics-prometheus)
- [Connect Monitoring section of the Apache Kafka® documentation](https://kafka.apache.org/documentation/#connect_monitoring)
