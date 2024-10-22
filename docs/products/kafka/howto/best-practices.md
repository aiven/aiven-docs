---
title: Get the best from Apache Kafka®
---

Follow these best practices to ensure that your Aiven for Apache Kafka® service is fast and reliable.

## Check your topic replication factors

Apache Kafka services use replication between brokers to preserve data in case of a
node failure. Consider how critical the data in each topic is to your business, and set
a replication factor high enough to ensure data protection.

When creating or editing a topic, you can set the replication factor in the
[Aiven Console](https://console.aiven.io/).

:::note
Replication factors below 2 are not allowed to prevent data loss from unexpected node
terminations.
:::

## Choose a reasonable number of partitions for a topic

Too few partitions can cause bottlenecks in data processing. In the extreme case, a
single partition means that messages are processed sequentially. However, too many
partitions strain the cluster due to overhead. As you cannot reduce the
number of partitions for existing topics, it is best to start with a low number that
supports efficient data processing and increase it as needed.

It is generally recommended to have a maximum of 4,000 partitions per broker and
200,000 partitions per cluster
([source](https://blogsarchive.apache.org/kafka/entry/apache-kafka-supports-more-partitions)).

:::note
Ordering is only guaranteed within a partition. To maintain the order of related records,
make sure they are placed in the same partition.
:::

## Periodically examine topics with entity-based partitioning for imbalances

Partitioning messages based on an entity ID (such as a user ID) can lead to
imbalanced partitions. This results in uneven load distribution and reduces the
cluster's efficiency in processing messages in parallel.

You can view the size of each partition in the **Partitions** tab under topic details
in the [Aiven Console](https://console.aiven.io/).

## Balance between throughput and latency

To find the right balance between throughput and latency, adjust the batch sizes in
your producer and consumer settings. Larger batches improve throughput but can increase
the time it takes to process individual messages. Smaller batches reduce this time
but increase the overhead, which may lower overall throughput.

You can change settings like `batch.size` and `linger.ms` in your producer
configuration. For more details, refer to the
[Apache Kafka documentation](https://kafka.apache.org/documentation/).

## Configure acknowledgments for received data

The `acks` parameter in the client producer configuration controls how the success of a
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


## Configure single availability zone (AZ) for BYOC customers

For Bring Your Own Cloud (BYOC) customers looking to optimize costs, consider
deploying Aiven for Apache Kafka® in a single availability zone (AZ) configuration.
This option can significantly reduce infrastructure costs while still providing the
full features of Aiven’s managed Kafka service. You can enable this setting during
service creation by selecting the **single_zone.enabled** option
under **Advanced configuration**.

- Contact [Aiven support](mailto:support@aiven.io) to enable this feature for your
  project before service creation.
- You must configure single-AZ deployments when creating a new service. You cannot
  change existing services to a single-AZ setup.
