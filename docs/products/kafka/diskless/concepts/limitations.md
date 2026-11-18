---
title: Diskless topic limitations and behavior
sidebar_label: Limitations and behavior
---

Diskless topics are compatible with Kafka APIs and clients, with some limitations:

- Transactions are not supported for produce or consume operations.
- Compacted topics are not supported.
- Kafka Streams state stores are not supported. Stream processing can read from diskless
  topics, but use classic topics for writes at this time.
- You cannot switch a diskless topic back to a classic topic. To switch a
  classic topic to diskless, see
  [Switch a classic topic to a diskless topic](/docs/products/kafka/howto/switch-topic-to-diskless).

## Internal metadata service behavior {#internal-metadata-service}

Diskless topics rely on an internal metadata service. Aiven manages this service
automatically as part of the Kafka service. The service stores the metadata that
diskless topics require.

If a service has no diskless topics for two days, Aiven automatically disables
diskless topics and turns off the metadata service.

When you re-enable diskless topics, there can be a short delay before you can create
or use them while the metadata service starts.

### Aiven Cloud deployments

In Aiven Cloud deployments, this service doesn't appear as a separate service in the
console or in billing.

### Bring Your Own Cloud (BYOC) deployments

In BYOC deployments, enabling diskless topics automatically creates an
Aiven for PostgreSQL® service in the project. This PostgreSQL service:

- Stores metadata required for diskless topics.
- Appears as a separate service in the project.
- Gets the linked Kafka service's tags when it's created. Later changes to the Kafka
  service's tags aren't copied.
- Has a `batch-coordinator` tag whose value is the Kafka service name.
- Has termination protection enabled, so you can't delete it directly.

Aiven manages this PostgreSQL service and automatically deletes it when you delete the
linked Kafka service. Don't configure or manage it independently.

### Maintenance behavior

Maintenance for this internal service occurs in the same maintenance window as the Kafka
service. In the Aiven Console, references to internal components can appear during
maintenance or upgrade flows, but you cannot manage them independently.

For more information about how diskless topics work, see
[Diskless topics architecture](/docs/products/kafka/diskless/concepts/diskless-topics-architecture).
