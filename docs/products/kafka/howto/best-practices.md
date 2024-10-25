---
title: Get the best from Apache Kafka®
---

Follow these best practices to ensure that your Aiven for Apache Kafka® service is fast and reliable.

## Check your topic replication factors

Apache Kafka services use replication between brokers to preserve data in case of a
node failure. Consider how critical the data in each topic is to your business, and set
a replication factor high enough to ensure data protection.

Set the replication factor when creating or editing a
[topic](/docs/products/kafka/howto/create-topic) in the [Aiven Console](https://console.aiven.io/).

:::note
Replication factors below 2 are not allowed to prevent data loss from unexpected node
terminations.
:::

## Choose a reasonable number of partitions for a topic

Too few partitions can cause bottlenecks in data processing. In the extreme case, a
single partition means that messages are processed sequentially. Too many
partitions strain the cluster due to overhead. Since partition numbers cannot be reduced,
start with a low number that supports efficient processing and increase as needed.

A maximum of 4,000 partitions per broker and 200,000 per cluster is recommended. For more
details, see this [Apache Kafka blog post](https://blogsarchive.apache.org/kafka/entry/apache-kafka-supports-more-partitions).

:::note
Ordering is only guaranteed within a partition. To maintain the order of related records,
place them in the same partition.
:::

## Check entity-based partitions for imbalances

Partitioning messages based on an entity ID (such as a user ID) can lead to
imbalanced partitions. This results in uneven load distribution and reduces the
cluster's efficiency in processing messages in parallel.

You can view the size of each partition in the **Partitions** tab under
[topic](/docs/products/kafka/howto/create-topic) details in the
[Aiven Console](https://console.aiven.io/).

## Balance between throughput and latency

To find the right balance between throughput and latency, adjust the batch sizes in
your producer and consumer settings. Larger batches improve throughput but can increase
the time it takes to process individual messages. Smaller batches reduce this time
but increase the overhead, which may lower overall throughput.

You can change settings like `batch.size` and `linger.ms` in your producer
configuration. For more details, refer to the
[Apache Kafka documentation](https://kafka.apache.org/documentation/).

## Configure acknowledgments for received data

The `acks` parameter in the producer configuration controls how the success of a
write operation is determined. Choose the appropriate setting based on your data
reliability needs:

- **`acks=0`**: The producer sends data without waiting for confirmation from the
  broker. This speeds up communication, but there’s a risk of data loss if the broker
  goes down during transmission. Use this setting only if some data loss is acceptable.

- **`acks=1` (default and recommended setting)**: The producer waits for the leader
  broker to confirm receipt of the data. This reduces the chance of data loss, but
  data can still be lost if the leader fails before the data is fully replicated.

- **`acks=all`**: The producer waits for acknowledgment from both the leader and all
  replicas. This ensures no data loss but can slow down communication.

## Configure single availability zone (AZ) for BYOC

For Bring Your Own Cloud (BYOC) customers, deploying Aiven for Apache Kafka in a single
AZ can reduce costs by removing inter-zone data transfer fees.
However, using a single AZ removes Kafka's resiliency, as data is not replicated across
zones. This increases the risk of downtime if the AZ fails.

When considering a single AZ allocation, evaluate your organization's risk tolerance,
as Aiven's standard uptime SLA does not apply to services deployed in a single AZ.

- To enable this option for your project, contact
  [Aiven support](mailto:support@aiven.io) or your account team.
- You must configure single AZ allocation during service creation. It cannot be applied
  to existing services.

To enable single AZ allocation, use the [Aiven CLI](/docs/tools/cli) and
set `single_zone.enabled=true`.

Example command:

```bash
avn service create SERVICE_NAME           \
  --service-type kafka                    \
  --plan PLAN_NAME                        \
  --cloud CLOUD_REGION                    \
  -c single_zone.enabled=true             \
  --disk-space-gib DISK_SIZE              \
  --project PROJECT_NAME
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Kafka service.
- `--service-type SERVICE_TYPE`: Service type.
- `--plan PLAN_NAME`: Aiven service plan.
- `--cloud CLOUD_REGION`: Cloud region and provider.
- `-c single_zone.enabled=true`: Enables single AZ allocation.
- `--disk-space-gib DISK_SIZE`: Specifies total disk space for the service (in GiB).
- `--project PROJECT_NAME`: Name of your Aiven project.
