---
title: Trade-offs and limitations
---

The main trade-off of tiered storage is the higher latency while accessing and reading data from remote storage compared to local disk storage. While adding local caching can partially solve this problem, it cannot eliminate the latency completely.

## Limitations

- Tiered storage currently does not support compacted topics.
- Once you enable tiered storage for a topic, you cannot deactivate it. As a workaround,
  set the local retention to `-2` (the default value) to keep all data available locally.
  For assistance, contact [Aiven support](mailto:support@aiven.io).
- Increasing the local retention threshold won't move segments
  already uploaded to remote storage back to local storage. This
  change only affects new data segments.
- If you enable tiered storage on a service, you can't migrate the
  service to a different region or cloud, except for moving to a
  virtual cloud in the same region. For migration to a different
  region or cloud, contact [Aiven support](mailto:support@aiven.io).

## Related pages

-   [Tiered storage in Aiven for Apache Kafka® overview](/docs/products/kafka/concepts/kafka-tiered-storage)
-   [How tiered storage works in Aiven for Apache Kafka®](/docs/products/kafka/concepts/tiered-storage-how-it-works)
-   [Enabled tiered storage for Aiven for Apache Kafka® service](/docs/products/kafka/howto/enable-kafka-tiered-storage)
