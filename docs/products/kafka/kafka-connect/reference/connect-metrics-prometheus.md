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
| `kafka_connect_connect_worker_metrics_connector_count`                         | The number of connectors run in this worker                            |
| `kafka_connect_connect_worker_metrics_connector_startup_attempts_total`        | The total number of connector startups that this worker has attempted  |
| `kafka_connect_connect_worker_metrics_connector_startup_failure_percentage`    | The average percentage of this worker's connector starts that failed  |
| `kafka_connect_connect_worker_metrics_connector_startup_failure_total`         | The total number of connector starts that failed                       |
| `kafka_connect_connect_worker_metrics_connector_startup_success_percentage`    | The average percentage of this worker's connector starts that succeeded |
| `kafka_connect_connect_worker_metrics_connector_startup_success_total`         | The total number of connector starts that succeeded              |
| `kafka_connect_connect_worker_metrics_task_count`                              | The number of tasks run in this worker                           |
| `kafka_connect_connect_worker_metrics_task_startup_attempts_total`             | The total number of task startups that this worker has attempted |
| `kafka_connect_connect_worker_metrics_task_startup_failure_percentage`         | The average percentage of this worker's task starts that failed  |
| `kafka_connect_connect_worker_metrics_task_startup_failure_total`              | The total number of task starts that failed                      |
| `kafka_connect_connect_worker_metrics_task_startup_success_percentage`         | The average percentage of this worker's task starts that succeeded |
| `kafka_connect_connect_worker_metrics_task_startup_success_total`              | The total number of task starts that succeeded                   |
| `kafka_connect_connect_worker_rebalance_metrics_completed_rebalances_total`    | The total number of rebalances completed by this worker          |
| `kafka_connect_connect_worker_rebalance_metrics_epoch`                         | The epoch or generation number of this worker                    |
| `kafka_connect_connect_worker_rebalance_metrics_rebalance_avg_time_ms`         | The average time in milliseconds spent by this worker to rebalance |
| `kafka_connect_connect_worker_rebalance_metrics_rebalancing`                   | Whether this worker is currently rebalancing                     |
| `kafka_connect_connect_worker_rebalance_metrics_time_since_last_rebalance_ms`  | The time in milliseconds since this worker completed the most recent rebalance |

## Related pages

- [Aiven for Apache Kafka® metrics available via Prometheus](/docs/products/kafka/reference/kafka-metrics-prometheus)
- [Connect Monitoring section of the Apache Kafka® documentation](https://kafka.apache.org/documentation/#connect_monitoring)
