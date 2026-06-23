---
title: Diskless topic limitations and behavior
sidebar_label: Limitations and behavior
---

Diskless topics are compatible with Kafka APIs and clients, with some limitations:

- Transactions are not supported for produce or consume operations.
- Compacted topics are not supported.
- Kafka Streams state stores are not supported. Stream processing can read from diskless
  topics but writes to classic topics.
- You cannot switch a diskless topic back to a classic topic. To switch a
  classic topic to diskless, see
  [Switch a classic topic to a diskless topic](/docs/products/kafka/howto/switch-topic-to-diskless).

## Internal metadata service behavior {#internal-metadata-service}

Diskless topics rely on an internal metadata service that is managed automatically
as part of the Kafka service. This service stores the metadata required for
diskless topics to function.

If a service has no diskless topics for two days, Aiven automatically
disables diskless topics and turns off the metadata service.

When you re-enable diskless topics, you might experience a short delay before you
can create or use them while the metadata service starts.

### Aiven Cloud deployments

In Aiven Cloud deployments, this service does not appear as a separate service in the
console or billing.

### Bring Your Own Cloud (BYOC) deployments

In BYOC deployments, enabling diskless topics automatically creates an
Aiven for PostgreSQL® service in the project. This PostgreSQL service:

- Is required for diskless topics to function.
- Stores metadata required for diskless topics.
- Appears as a separate service in the project.
- Is created and managed automatically by Aiven.
- Do not configure or manage independently.

### Maintenance behavior

Maintenance for this internal service occurs in the same maintenance window as the Kafka
service. In the Aiven Console, references to internal components can appear during
maintenance or upgrade flows, but you cannot manage them independently.

For more information about how diskless topics work, see [Diskless topics
architecture](/docs/products/kafka/diskless/concepts/diskless-topics-architecture).
