---
title: Limitations of Diskless Topics
sidebar_label: Limitations
---

Diskless topics are compatible with Kafka APIs and clients, with some limitations:

- Transactions are not supported for produce or consume operations.
- Diskless topics must be created manually or via API. Automatic topic creation is not
  supported.
- Compacted topics are not supported.
- Kafka Streams state stores are not supported. Stream processing can read from diskless
  topics but must write to classic topics.
- Classic and tiered Kafka topics cannot be converted to diskless topics.

## Automatic PostgreSQL® service upgrades {#automatic-postgresql-service-upgrades}

Aiven monitors the PostgreSQL® service that supports diskless topics in
Bring Your Own Cloud (BYOC) deployments.
This Aiven-managed service stores metadata used by the Batch Coordinator, such as
offsets and batch locations.
When it experiences high load, Aiven automatically upgrades its plan to maintain
performance and stability.

- The upgrade is automatic and does not cause downtime.
- You receive an email notification when the upgrade occurs.
- The upgraded plan appears in your billing and usage metrics.
- No action is required.

For details about the Batch Coordinator and metadata,
see [Architecture](/docs/products/kafka/diskless/concepts/architecture#batch-coordinator-and-metadata).
