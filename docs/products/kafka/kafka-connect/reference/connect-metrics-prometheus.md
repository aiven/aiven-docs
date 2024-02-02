---
title: Metrics for Aiven for Apache Kafka® Connect available via Prometheus
---

These are the metrics available via Prometheus for an Aiven for Apache Kafka® Connect service.

You can review the list
of metrics available via Prometheus for the Aiven for Apache Kafka®
service in the
[dedicated document](/docs/products/kafka/reference/kafka-metrics-prometheus).

A full description of the metrics is available in the [Connect
Monitoring section of the Apache Kafka®
documentation](https://kafka.apache.org/documentation/#connect_monitoring).

:::note
The metrics only appear if there is activity in the underlying
Apache Kafka Connect service.
:::

-   `kafka_connect_connect_worker_metrics_connector_count`: the number
    of connectors run in this worker
-   `kafka_connect_connect_worker_metrics_connector_startup_attempts_total`:
    the total number of connector startups that this worker has
    attempted
-   `kafka_connect_connect_worker_metrics_connector_startup_failure_percentage`:
    the average percentage of this worker's connector starts that
    failed
-   `kafka_connect_connect_worker_metrics_connector_startup_failure_total`:
    the total number of connector starts that failed
-   `kafka_connect_connect_worker_metrics_connector_startup_success_percentage`:
    the average percentage of this worker's connector starts that
    succeeded
-   `kafka_connect_connect_worker_metrics_connector_startup_success_total`:
    the total number of connector starts that succeeded
-   `kafka_connect_connect_worker_metrics_task_count`: the number of
    tasks run in this worker
-   `kafka_connect_connect_worker_metrics_task_startup_attempts_total`:
    the total number of task startups that this worker has attempted
-   `kafka_connect_connect_worker_metrics_task_startup_failure_percentage`:
    the average percentage of this worker's task starts that failed
-   `kafka_connect_connect_worker_metrics_task_startup_failure_total`:
    the total number of task starts that failed
-   `kafka_connect_connect_worker_metrics_task_startup_success_percentage`:
    the average percentage of this worker's task starts that succeeded
-   `kafka_connect_connect_worker_metrics_task_startup_success_total`:
    the total number of task starts that succeeded
-   `kafka_connect_connect_worker_rebalance_metrics_completed_rebalances_total`:
    the total number of rebalances completed by this worker
-   `kafka_connect_connect_worker_rebalance_metrics_epoch`: the epoch or
    generation number of this worker
-   `kafka_connect_connect_worker_rebalance_metrics_rebalance_avg_time_ms`:
    the average time in milliseconds spent by this worker to rebalance
-   `kafka_connect_connect_worker_rebalance_metrics_rebalancing`:
    whether this worker is currently rebalancing
-   `kafka_connect_connect_worker_rebalance_metrics_time_since_last_rebalance_ms`:
    the time in milliseconds since this worker completed the most recent
    rebalance
