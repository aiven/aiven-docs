---
title: Limitations of diskless topics
sidebar_label: Limitations
---

Diskless topics are compatible with Kafka APIs and clients, with some limitations:

- Transactions are not supported for produce or consume operations.
- Compacted topics are not supported.
- Kafka Streams state stores are not supported. Stream processing can read from diskless
  topics but must write to classic topics.
- Classic and tiered Kafka topics cannot be converted to diskless topics.

## Internal metadata service behavior {#internal-metadata-service}

Diskless topics rely on an internal metadata service that Aiven operates on your behalf.
This service tracks offsets and batch locations used by diskless topics and is not exposed
as a separate service in the console or billing.

To maintain performance and stability, Aiven may adjust the capacity of this internal
service automatically. These changes do not require any action from you and do not affect
how you use diskless topics.

For Aiven Inkless Kafka services that use diskless topics, maintenance for this internal
service happens in the same maintenance window as the Kafka service. In the Aiven Console,
you may see references to internal components during maintenance or upgrade flows, but
they cannot be managed independently.

For details about the Batch Coordinator and metadata,
see [Architecture](/docs/products/kafka/diskless/concepts/diskless-topics-architecture#batch-coordinator-and-metadata).
