---
title: Trade-offs and limitations
---

The main trade-off of tiered storage is the higher latency when accessing and reading data from remote storage compared to local disk storage.

Adding local caching can partially mitigate this issue, but it cannot eliminate the
latency entirely.

## Limitations

- Tiered storage does not support compacted topics.
- After tiered storage is enabled, you cannot disable it. As a workaround
  to keep all data locally, set the local retention to `-2` (the default value).For
  further assistance, contact [Aiven support](mailto:support@aiven.io).
- Increasing the local retention threshold does not move segments already uploaded to
  remote storage back to local storage. This change only affects new data segments.
- If tiered storage is enabled, you cannot migrate the service to a different region or
  cloud, except to a virtual cloud in the same region. For migration assistance,
  contact [Aiven support](mailto:support@aiven.io).
- Tiered storage is only available on AWS, GCP, and Azure.
- If you power off your service with tiered storage enabled, you will permanently
  lose all remote data. Charges for tiered storage are not applicable while the service
  is off.
- Tiered storage is not available on all plans and regions. Check the
  [plans and pricing page](https://aiven.io/pricing?product=kafka) for supported plans
  and regions.

## Related pages

- [Tiered storage in Aiven for Apache Kafka® overview](/docs/products/kafka/concepts/kafka-tiered-storage)
- [Enabled tiered storage for Aiven for Apache Kafka® service](/docs/products/kafka/howto/enable-kafka-tiered-storage)
