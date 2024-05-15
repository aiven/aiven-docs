---
title: Aiven for Apache Cassandra® alerts
sidebar_label: Alerts
---

There are the following user alerts defined for Aiven for Cassandra®:

| Alerts / Severity levels                          | Warning                                            | Critical                                           |
| ------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| user_alert_cassandra_too_many_tables              | More than 200 tables in a cluster                  | More than 500 tables in a cluster                  |
| user_alert_cassandra_mutation_exceeded_max_size   | More than 5 occurrences during the last 10 minutes | More than 5 occurrences during the last 30 minutes |
| user_alert_cassandra_too_many_tombstones          |                                                    |                                                    |

Example: definitions for `user_alert_too_many_tables`:

```yaml
aiven/alerting/rules/user_alerts.yaml

  - alert: user_alert_cassandra_too_many_tables
    annotations:
      runbook_url: http://norunbook.url
      summary: Alert for too many tables in the cluster
    expr: |-
      min_over_time
      (
        cassandra_table_count_value [1h]
      ) > 200
    labels:
      service_type: cassandra
      severity: warning

  - alert: user_alert_cassandra_too_many_tables
    annotations:
      runbook_url: http://norunbook.url
      summary: Alert for too many tables in the cluster
    expr: |-
      min_over_time
      (
       cassandra_table_count_value [1h]
      ) > 500
    labels:
      service_type: cassandra
      severity: critical
```
