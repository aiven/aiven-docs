---
title: Audit logging for Aiven for Apache Kafka®
sidebar_label: Audit logging
---

Audit logging for Aiven for Apache Kafka® records Kafka client activity on your service.
Audit logs show which Kafka users were active and can show which Kafka operations
were allowed or denied during a configured time period.

Use audit logs to support security reviews and compliance workflows.

## How audit logging works

After a Kafka client authenticates with your Aiven for Apache Kafka service, Aiven
checks requested operations and records whether they are allowed or denied. Audit
logging writes entries to the service logs with the `AUDIT:` prefix.

Each audit entry identifies the Kafka user, also called a principal. In audit logs,
the principal is the Kafka user account that a client authenticates with, for example
`User:avnadmin`, the default principal in Aiven.

Audit logs also include internal client activity on your service. Some internal
activity is authenticated, for example `User:karapace_sr`, the principal used by
Karapace Schema Registry for accessing the `_schemas` topic. Other activity can be
unauthenticated and appear as `User:ANONYMOUS`.

Audit logging writes entries to the service logs at regular intervals, based on the
configured aggregation period. Each entry shows the first time activity was detected
for a Kafka user during that period.

Audit logging supports any authentication method and does not require additional
access control list (ACL) setup.

You can configure audit logging to:

- Record Kafka operations, such as read or write requests, or record only that a Kafka
  user was active.
- Include or exclude denied authorization attempts.
- Group entries by Kafka user or by Kafka user and source IP address.
- Change how often audit entries are written to the service logs.

To enable and configure audit logging, see
[Configure audit logging for Aiven for Apache Kafka®](/docs/products/kafka/howto/configure-audit-logging).

## Audit log examples

A `user_operations` entry lists the Kafka user, source IP address, when the user first
became active in the aggregation period, and each operation with its result:

```text
[2024-07-29 11:02:27,861] AUDIT: User:alice (/192.0.2.10) was active since 2024-07-29T10:57:28.048485122Z: Allow WRITE on TOPIC:orders, Allow READ on GROUP:order-consumers
```

A `user_activity` entry includes only the Kafka user, source IP address, and when the
user first became active:

```text
[2024-07-29 11:02:27,861] AUDIT: User:alice (/192.0.2.10) was active since 2024-07-29T10:57:28.048485122Z.
```

## Limitations

When using audit logs, note these limitations:

- **Audit entries do not include exact operation times.** Audit logging groups
  activity over an aggregation period, so an entry's timestamp is not the exact time
  of an individual operation.
- **Kafka audit logs do not show which Aiven account made changes using Aiven tools.**
  Kafka audit logs record only Kafka client activity. Operations performed in the
  Aiven Console, Aiven CLI, Aiven API, Aiven Provider for Terraform, or Kubernetes
  operator can appear under an internal Aiven service account, not the individual Aiven
  account. This includes topic creation and deletion. To find who performed an
  operation, use the [project event log](/docs/platform/howto/view-project-logs).

## Related pages

- [Configure audit logging for Aiven for Apache Kafka®](/docs/products/kafka/howto/configure-audit-logging)
- [Advanced parameters for Aiven for Apache Kafka®](/docs/products/kafka/reference/advanced-params)
- [Integrate service logs into an Apache Kafka® topic](/docs/products/kafka/howto/integrate-service-logs-into-kafka-topic)
- [View project logs](/docs/platform/howto/view-project-logs)
