---
title: Guarantees
---

With Aiven for Apache Kafka®'s tiered storage, there are two primary types of data retention guarantees: **total retention** and **local retention**.

**Total retention**: Tiered storage ensures that your data remains available up to the
limit defined by the total retention threshold, whether stored locally or remotely.
This means your data is not deleted until reaching the total retention threshold,
regardless of storage location.

**Local retention**: Log segments are only removed from local storage
after being successfully uploaded to remote storage, even if the data exceeds the local
retention threshold.

## Example

Let's say you have a topic with a **total retention threshold** of
**1000 GB** and a **local retention threshold** of **200 GB**. This
means that:

- All data for the topic is retained,  whether stored locally or remotely, as long as
  the total size does not exceed 1000 GB.
- If tiered storage is enabled per topic, older segments are
  uploaded immediately to remote storage, regardless of whether the
  local retention threshold of 200 GB is exceeded. Data is deleted from local storage
  only after it has been safely transferred
  to remote storage.
- If the total size of the data exceeds 1000 GB, Aiven for Apache Kafka begins deleting the
  oldest data from remote storage.

## Related pages

-   [Tiered storage in Aiven for Apache Kafka® overview](/docs/products/kafka/concepts/kafka-tiered-storage)
-   [How tiered storage works in Aiven for Apache Kafka®](/docs/products/kafka/concepts/tiered-storage-how-it-works)
-   [Enabled tiered storage for Aiven for Apache Kafka® service](/docs/products/kafka/howto/enable-kafka-tiered-storage)
