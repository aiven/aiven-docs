---
title: Audit logging for Aiven for Apache Kafka®
sidebar_label: Audit logging
early: true
---

Audit logging for Aiven for Apache Kafka® records Kafka client activity on your
service, including which authenticated Kafka users connected and which Kafka operations
were allowed or denied during a configured time period.

Use audit logs to support security reviews and compliance workflows.

## How audit logging works

When a Kafka client connects to your Aiven for Apache Kafka service, Aiven checks each
requested operation and records whether it is allowed or denied. Audit logging writes
the results to the service logs with the `AUDIT:` prefix.

Each audit entry identifies the Kafka user, also called a principal, that connected.
In audit logs, the principal is the Kafka user account that a client authenticates
with, for example `User:avnadmin`.

Audit logging supports any authentication method and does not require additional
access control list (ACL) setup. To enable it, see
[Configure audit logging for Aiven for Apache Kafka®](/docs/products/kafka/howto/configure-audit-logging).

## What audit logging records

Audit logging supports two record types. Use the `record_type` setting to choose how
much detail to include. Aiven writes audit entries to the service logs at the end of
each aggregation period.

- **`user_operations`** (default): Records each Kafka user's activity and the distinct
  Kafka operations performed during the aggregation period, such as produce, fetch,
  and configuration changes. If the same operation on the same resource occurs
  multiple times during the period, it appears once in the audit entry.
- **`user_activity`**: Records only that a Kafka user was active during the aggregation
  period. It does not list the operations performed. Use it when you need less
  detailed logs that show which users were active, but not what they did.

A `user_operations` entry lists the Kafka user, the source IP address, when the user
first became active in the aggregation period, and each operation performed with its
result:

```text
AUDIT: User:alice (192.168.1.10) was active since 2024-01-15T10:00:00Z: Allow WRITE on TOPIC:orders, Allow READ on GROUP:my-consumer
```

A `user_activity` entry includes only the Kafka user, source IP address, and the time
the user first became active in the aggregation period:

```text
AUDIT: User:alice (192.168.1.10) was active since 2024-01-15T10:00:00Z.
```

Other audit log settings control whether denied authorization attempts are included,
how entries are grouped, and how often entries are written to the service logs. To
configure these settings, see
[Configure audit logging for Aiven for Apache Kafka®](/docs/products/kafka/howto/configure-audit-logging).

## Limitations

Review these limitations before you rely on audit logs:

- **Audit entries do not include exact operation times.** Audit logging groups
  activity over an aggregation period, so an entry's timestamp is not the exact time
  of an individual operation.
- **Actions made with Aiven tools are not attributed to individual Aiven accounts.**
  Kafka audit logs record only Kafka client activity. Operations performed in the
  Aiven Console, Aiven CLI, Aiven API, Aiven Provider for Terraform, or Kubernetes
  operator appear under an internal Aiven service account, not the individual Aiven
  account. This includes topic creation and deletion. To find who performed an
  operation, use the [project event log](/docs/platform/howto/manage-project-audit-logs).

## Related pages

- [Configure audit logging for Aiven for Apache Kafka®](/docs/products/kafka/howto/configure-audit-logging)
- [Advanced parameters for Aiven for Apache Kafka®](/docs/products/kafka/reference/advanced-params)
- [Integrate service logs into an Apache Kafka® topic](/docs/products/kafka/howto/integrate-service-logs-into-kafka-topic)
- [Manage project audit logs](/docs/platform/howto/manage-project-audit-logs)
