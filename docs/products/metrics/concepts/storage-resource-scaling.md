---
title: Optimize storage and resources
---

Aiven for Metrics leverages various storage and resource types to optimize your monitoring experience for both cost and performance. Explores how Aiven uses object storage, disk storage, memory, and compute resources.

## Storage solutions

### Object storage

The primary storage for metrics and metadata, offering scalability and cost-effectiveness
for long-term retention. Aiven manages this infrastructure, ensuring data security
and reliability. Metrics are uploaded to object storage at regular intervals
(typically every 2 hours) for historical analysis and remain accessible for
queries, ensuring continuous data availability for real-time decision-making.

### Disk storage

Aiven for Metrics uses disk storage for internal processing tasks. Three main components
that rely on disk storage:

- **Thanos Metric Receiver**: This component is the initial point of contact for your
  metrics. It accepts incoming data streams, temporarily stores them in a
  local cache using disk space, and transfers them to object storage at
  regular intervals.
- **Thanos Metric Store**: The store component tracks the location of your metric
  data shards within the object storage. It also maintains a small amount of
  information about these remote blocks on the local disk, ensuring it stays
  synchronized with the object storage bucket.
- **Thanos Metric Compactor**: The compactor component is crucial in optimizing
  long-term data storage usage. It periodically downloads data chunks from object
  storage, performs downsampling (reducing data granularity for older data), and
  uploads the compacted data back to object storage. This process requires temporary
  storage of the downloaded data on the local disk.

The amount of disk space needed varies depending on your data volume and complexity.
Aiven's service plans are designed to handle the most typical use cases.

## Resource management

Aiven automatically manages memory and compute resources based on your service plan.
However, monitoring these resources can help identify potential bottlenecks.

- **Memory usage** refers to the RAM needed for Aiven for Metrics to run effectively.
  Aiven automatically manages memory allocation based on your service plan. However,
  monitoring memory usage can help you identify potential issues.
  Factors affecting memory usage include:
  - Number of ingested metrics
  - Complexity of metric queries
  - Number of concurrent users
- **Compute usage** refers to the processing power the Aiven for Metrics service uses.
  Aiven manages compute resources based on your service plan. Monitoring compute
  usage can help you identify if your plan offers sufficient resources.
  Factors affecting compute usage include:
  - The volume of ingested metric data
  - Frequency of queries
  - Complexity of queries

## Using Dynamic Disk Sizing (DDS)

Aiven offers [Dynamic Disk Sizing (DDS)](/docs/platform/howto/add-storage-space) as
a flexible option if you require additional disk space beyond the standard plan
allocation. DDS allows you to:

- **Scale up**: Increase disk space on demand for bursts of metrics or high cardinality.
- **Scale down**: Reduce disk space when needs change, optimizing costs.

Consider using DDS if:

- If a large influx of metrics is generated in a short period, such as during a
  data migration, you may require more disk space for the compactor component to
  process the data efficiently.
- A significant amount of data with many unique metric identifiers can strain the
  disk space used for temporary processing by the compactor and potentially
  other components.
- While Aiven's plans work for most workloads, consider using DDS if you
  anticipate a recent large data migration or a significant increase in metric volume.

## Related pages

- [Thanos Receiver](https://thanos.io/tip/components/receive.md/)
- [Thanos Store](https://thanos.io/tip/components/store.md/#store)
- [Thanos Compactor](https://thanos.io/tip/components/compact.md/#disk)
