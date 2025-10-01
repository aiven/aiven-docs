---
title: Get started with Diskless Topics
sidebar_label: Get started
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";

Diskless Topics is a deployment model for Aiven for Apache Kafka® that runs in your own cloud account.
It stores Kafka topic data in cloud object storage instead of broker disks,
reducing infrastructure complexity and minimizing cross-availability zone (AZ) traffic.

:::note
Diskless Topics is in limited availability. During this phase, Aiven creates the
Kafka service and sets up the required infrastructure in your cloud account. Self-service
setup will be available in a future release. To request access,
[contact Aiven](https://aiven.io/contact).
:::


## Prerequisites

To use Diskless Topics, you need:

- A [BYOC](/docs/platform/concepts/byoc) project on AWS (provide the project name and
  cloud region to Aiven)
- Access to Diskless Topics granted by Aiven

After access is granted, Aiven:

- Enables the required configuration (`inkless`) for your project
- Provisions Diskless Topics and Aiven-managed PostgreSQL services in your AWS
  account
- Configures topic storage and metadata tracking to preserve message ordering

## Service provisioning

During
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-),
Aiven provisions the service for you. The setup includes:

- Apache Kafka 4.0 with Tiered Storage and `inkless` enabled
- Configuration for object storage and metadata tracking
- [KRaft](/docs/products/kafka/concepts/kraft-mode) (Kafka Raft metadata mode) for
  managing cluster metadata
- Access credentials and connection details

## Topic creation

Once the service is ready, you can:

- Create diskless topics using the [Aiven Console](https://console.aiven.io),
  [Aiven API](/docs/tools/api), [Aiven Provider for Terraform](/docs/tools/terraform),
  or [Aiven CLI](/docs/tools/cli)
- Connect applications using standard Kafka clients
- Monitor the service using the Aiven Console

For detailed instructions, see
[Create a diskless topic](/docs/products/diskless/howto/create-diskless-topic).

### Topic creation methods

Diskless and classic topics can coexist in the same Kafka cluster.

- When `inkless` is enabled for the service, topics created using the Aiven Console,
  Aiven API, or Aiven Provider for Terraform are created as **diskless topics** by default.
- Topics created using the Aiven CLI or tools that use the Kafka Admin API must
  include the topic configuration `inkless.enable=true` to be created
  as **diskless topics**.

  **Aiven CLI example to create a diskless topic:**

  ```bash
  avn service topic-create \
  --project demo-kafka-project \
  --service-name demo-kafka-service \
  --topic exampleTopic \
  --partitions 2 \
  --replication 2 \
  --config inkless.enable=true
  ```

:::note
You cannot change a topic from classic to diskless, or vice versa, after it is created.
:::

## Architecture

Diskless topics separate compute and storage. Unlike traditional Kafka, they store
message data in object storage.

- Object storage holds message data.
- Batch Coordinator tracks message batches and offsets to preserve partition ordering.
- KRaft mode manages cluster metadata.

To learn more, see [Diskless Topics architecture](/docs/products/diskless/concepts/architecture).

## Performance

Diskless Topics are optimized for high-throughput workloads and cost efficiency:

- Improves throughput and reduces cost by batching.
  See [Batching and delivery](/docs/products/diskless/concepts/batching-and-delivery)
- Has a different latency profile due to batch writes to object storage.
- Reduces costs by minimizing cross-AZ traffic and using object storage.

You can tune batching settings to balance throughput, latency, and cost for your workload.

## Limitations

The following limitations apply to diskless topics:

- Transactions are not supported.
- Retention policies based on time or size are not fully implemented.
- Auto-creation of topics is not supported.
- Compacted topics are not supported.
- Kafka Streams state stores are not supported.
- Share groups and queue-type topics are not supported
- Topic type cannot be changed after creation.

Use classic topics for workloads that depend on these features.


<RelatedPages/>

- [Diskless Topics overview](/docs/products/diskless)
- [Diskless Topics architecture](/docs/products/diskless/concepts/architecture)
- [KRaft mode](/docs/products/kafka/concepts/kraft-mode)
