---
title: Optimize Apache Kafka® performance
---

Follow these best practices to optimize the performance and reliability of your Aiven for Apache Kafka® service.

## Check your topic replication factors

Apache Kafka uses replication between brokers to protect data in case of node failures.
The replication factor (RF) determines how many copies of each partition are maintained
across the cluster.

Evaluate the importance of each topic and set a replication factor that balances
durability requirements with cost and performance. An RF of 3 is recommended
for production because it improves durability and availability. In multi-AZ deployments,
replication traffic across availability zones can increase network costs, especially
for high-throughput workloads.

For Diskless Topics architecture and considerations, see
[Diskless Topics overview](/docs/products/kafka/diskless/concepts/diskless-overview).

Set the replication factor when creating or editing a
[topic](/docs/products/kafka/howto/create-topic) in the
[Aiven Console](https://console.aiven.io/).

:::note
Replication factors below 2 are not allowed to prevent data loss from unexpected node
terminations.
:::

## Choose a reasonable number of partitions for a topic

Too few partitions can create processing bottlenecks. A single partition processes
messages sequentially, which limits throughput. Too many partitions increase overhead
and reduce cluster efficiency. Because partition counts cannot be reduced, start with a
number that supports parallel processing and increase it as needed.

A maximum of 4,000 partitions per broker and 200,000 per cluster is recommended.
For details, see this
[Apache Kafka blog post](https://blogsarchive.apache.org/kafka/entry/apache-kafka-supports-more-partitions).
Keep the total number of topics under 7,000.

:::note
Ordering is guaranteed only within a partition. To maintain ordering of related records,
place them in the same partition.
:::

## Check entity-based partitions for imbalances

Partitioning messages by an entity identifier, such as a user ID, can create imbalanced
partitions. This results in uneven load distribution and reduces parallel processing
efficiency.

You can view the size of each partition by selecting the
[topic](/docs/products/kafka/howto/create-topic) in the Topics list and opening
the **Partitions** tab in the [Aiven Console](https://console.aiven.io/).

## Balance between throughput and latency

Adjust producer and consumer batch sizes to balance throughput and latency. Larger
batches increase throughput but add latency. Smaller batches reduce latency but increase
overhead, which can lower throughput.

Settings such as `batch.size` and `linger.ms` can be configured in the producer. For
more details, refer to the
[Apache Kafka documentation](https://kafka.apache.org/documentation/).

## Configure acknowledgments for received data

The `acks` parameter in the producer configuration controls how write operations are
acknowledged. Choose a setting that matches your reliability requirements:

- **`acks=0`**: The producer does not wait for confirmation. This minimizes latency but
  increases the risk of data loss if the broker fails during transmission. Use this
  setting only when some data loss is acceptable.

- **`acks=1`** (default and recommended): The producer waits for the leader broker to
  confirm receipt. This reduces the risk of data loss but does not protect against
  leader failure before replication completes.

- **`acks=all`**: The producer waits for acknowledgment from the leader and all in-sync
  replicas. This prevents data loss but increases latency.

## Configure single availability zone (AZ) for BYOC

Deploying Aiven for Apache Kafka in a single availability zone (AZ) reduces inter-zone
data transfer costs. Single-AZ deployment places all brokers and replicas in one
failure domain, so the cluster cannot tolerate an AZ outage. If the zone becomes
unavailable, the service cannot recover until the zone is restored.

:::note
Before enabling this configuration, contact your account team to discuss your use case
and agree on the reduced SLA. The standard uptime SLA does not apply to services
deployed in a single AZ.
:::

### Replication factor considerations in a single AZ

**Replication factor 1 (RF=1):**
Creates a single copy of each partition. In a single-AZ deployment, a broker or AZ
failure results in data loss. Use RF=1 only when losing data is acceptable.

**Replication factor 3 (RF=3):**
Protects against individual broker failures. It does not protect against an AZ failure
when all replicas are in the same zone. If the AZ becomes unavailable, all replicas can
be lost, and the cluster cannot recover until the zone is restored.

### When to use single AZ

Avoid single-AZ deployment for production workloads or any data that cannot be
recreated. Use single AZ only for:

- Development, QA, or test workloads
- Temporary proof-of-concept environments
- Workloads where data can be recreated

### Risks and considerations

- All brokers and replicas exist within one failure domain, increasing the impact of an
  AZ outage.
- Recovery options are limited because the cluster cannot fail over to another zone.
- Service downtime may increase during an AZ failure because no cross-zone redundancy
  exists.
- SLA terms for single-AZ deployments must be agreed with your account team.

### Enable single-AZ allocation

Single-AZ allocation must be configured during service creation. It cannot be enabled
for existing Kafka services.

To enable this option for your project, contact [Aiven support](mailto:support@aiven.io)
or your account team.

To create a single-AZ Kafka service using the [Aiven CLI](/docs/tools/cli),
set `single_zone.enabled=true`:

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
