---
title: Optimize storage and resources
---

Aiven for Metrics optimizes storage and compute resources using tiered storage, disk storage, memory, and compute power to balance cost and performance.

## Storage solutions

Aiven for Metrics optimizes storage using tiered storage for long-term retention and
disk storage for temporary processing. This combination ensures scalability,
reliability, and cost-efficient metric storage.

### Tiered storage

Tiered storage is the **primary storage** for metrics and metadata in Aiven for Metrics.
It is **required and automatically enabled for all plans** to provide
scalability and long-term cost efficiency. Aiven manages this storage infrastructure to
ensure data security and reliability.

- Metrics are uploaded to tiered storage every 2 hours for historical analysis.
- Stored data remains accessible for queries at all times, ensuring continuous
  availability for real-time decision-making.

### Disk storage

Aiven for Metrics uses disk storage for internal processing tasks. Three main components
that rely on disk storage:

- **Thanos Metric Receiver**: This component is the initial point of contact for your
  metrics. It accepts incoming data streams, temporarily stores them in a
  local cache using disk space, and transfers them to tiered storage at
  regular intervals.
- **Thanos Metric Store**: The store component tracks the location of your metric
  data shards within the tiered storage. It also maintains a small amount of
  information about these remote blocks on the local disk, ensuring it stays
  synchronized with the tiered storage.
- **Thanos Metric Compactor**: The compactor component is crucial in optimizing
  long-term data storage usage. It periodically downloads data chunks from object
  storage, performs downsampling (reducing data granularity for older data), and
  uploads the compacted data back to tiered storage. This process requires temporary
  storage of the downloaded data on the local disk.

The amount of disk space needed varies depending on your data volume and complexity.
Aiven's service plans are designed to handle the most typical use cases.

## Storage costs and billing

Aiven for Metrics storage costs consist of two components:

- **Local disk storage**: Included in the base service plan for temporary processing and
  caching.
- **Data stored in tiered storage**: Billed based on the highest amount of data retained
  in tiered storage during each billing period.

**Example billing scenario**

If you use a **Start-16** plan with **640 GB** of local disk storage, your
billing includes:

- The base cost of the Start-16 plan.
- Additional tiered storage costs, determined by the volume of metrics data retained.

The local disk is used to temporarily store or process historical data to improve
performance, but all metrics data is stored in tiered storage.

### BYOC (Bring Your Own Cloud) billing

[BYOC](/docs/platform/concepts/byoc) billing for tiered storage can vary depending on
your specific agreement with Aiven.
Possible scenarios include:

- **Customer costs**: In all BYOC setups, you are responsible for the full cost of the
  underlying cloud storage used by tiered storage. This includes all stored data,
  regardless of local retention settings.

- **Aiven management fee**: In addition to cloud storage costs, an Aiven management fee
  applies to data stored in tiered storage. This fee is based on the total storage used.

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

Consider enabling DDS when:

- A large influx of metrics occurs within a short period, such as during data migrations.
- A significant amount of data with many unique metric identifiers can strain the
  disk space used for temporary processing by the compactor and potentially
  other components.
- While Aiven's plans work for most workloads, consider using DDS if you
  anticipate a recent large data migration or a significant increase in metric volume.

## Related pages

- [Thanos Receiver](https://thanos.io/tip/components/receive.md/)
- [Thanos Store](https://thanos.io/tip/components/store.md/#store)
- [Thanos Compactor](https://thanos.io/tip/components/compact.md/#disk)
