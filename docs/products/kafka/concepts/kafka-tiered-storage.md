---
title: Tiered storage in Aiven for Apache Kafka® overview
---

Tiered storage in Aiven for Apache Kafka® helps you manage data more effectively by using two different storage types: local disk and remote cloud storage solutions like AWS S3, Google Cloud Storage, and Azure Blob Storage.

This feature lets you allocate frequently accessed data to high-speed local disks while
keeping an extended data retention on more cost-effective remote storage solutions. You
can store data on specific topics indefinitely without running out of space. Once enabled,
you configure tiered storage per topic, which gives you granular control over
your data storage.

:::note
- Aiven for Apache Kafka® supports tiered storage starting from Apache Kafka® version
  3.6 or later. It is recommended to upgrade to the latest default version and apply
  [maintenance updates](/docs/platform/concepts/maintenance-window#maintenance-updates)
  when using tiered storage for the latest fixes and improvements.
- Tiered storage is not available on startup-2 plans.
:::

## Benefits of tiered storage

Tiered storage offers multiple benefits, including:

- **Scalability:** Tiered storage in Aiven for Apache Kafka decouples storage and
  computing, allowing them to scale independently. Storage capacity can expand almost
  infinitely with cloud solutions, and compute resources can adjust based on demand,
  eliminating concerns about storage or processing limitations.
- **Cost efficiency:** By moving less frequently accessed data to a
  cost-effective storage tier, you can achieve significant financial
  savings.
- **Operational speed:** With the bulk of data offloaded to remote
  storage, service rebalancing in Aiven for Apache Kafka becomes
  faster, making for a smoother operational experience.
- **Infinite data retention:** Remote storage allows Aiven for Apache Kafka to retain
  data indefinitely, ensuring long-term storage without impacting local storage
  limits or speed.

## When and why use it

Understanding when and why to use tiered storage in Aiven for Apache
Kafka helps you maximize its benefits, particularly around cost
savings and system performance.

**Scenarios for use:**

- **Long-term data retention**: Many organizations require large-scale
  data storage for extended periods, either for regulatory compliance
  or historical data analysis. Cloud services provide an almost
  limitless storage capacity, making it possible to keep data
  accessible for as long as required at a reasonable cost. This is
  where tiered storage becomes especially valuable.
- **High-speed data ingestion**: Tiered storage can manage unpredictable or sudden data
  influxes by supplementing local disks with cloud storage, to ensure optimal performance.
- **Unlock unexplored opportunities:** Tiered storage in Aiven for Apache Kafka addresses
  current storage challenges and enables new and innovative use cases that were
  previously impractical or too expensive. By eliminating traditional storage
  limitations, organizations gain the flexibility to support a wide range of
  applications and workflows, including scenarios where using Apache Kafka was once
  deemed impractical. This flexibility encourages creative thinking and redefines the
  experience with Apache Kafka.

## Pricing and charges

Tiered storage costs depend on the amount of remote storage used, measured in GB/hour.
Charges are based on the highest usage level within each hour.

### Tiered storage charges

Aiven charges for tiered storage data based on the data stored in remote tier, such as
AWS S3. This means you pay for:

- **Data stored in S3:** Billing is based on the highest amount of data stored in S3
  within each hour, not the total amount stored over the hour.
- **Local storage on the Aiven platform:** Local storage has a fixed cost based on the
  provisioned capacity. You pay a set amount each month for a fixed amount of
  local storage.

Tiered Storage is designed to transfer **all** topic data to the remote tier, except
for the active log segment where the latest data is being appended. This transfer occurs
regardless of local storage retention settings.

#### Example

Imagine having a tiered topic with 40 TB of data and with tiered storage enabled.
You set a local retention time of 10 TB. Consider the following:

- You pay a fixed monthly cost for the local storage allocated to your service,
  which includes the 10 TB retained locally.
- You are charged for storing **approximately 40 TB** of data in S3, even if some data
  is available locally within the most recent 10 TB. This is because data is
  automatically transferred to S3, and billing is based on the highest usage
  level within each hour.

  :::note
  The estimated storage size of 40 TB excludes the active log segments, which are only
  stored locally. For more information, see [local vs. remote data retention](/docs/products/kafka/concepts/tiered-storage-how-it-works#local-vs-remote-data-retention).
  :::

### BYOC (Bring your own cloud) billing

[BYOC](/docs/platform/concepts/byoc) billing for tiered storage can vary depending on
your specific agreement with Aiven. Potential scenarios include:

- **Customer costs:** In all BYOC setups, you are responsible for the full
  cost of the underlying cloud storage used by tiered storage. This includes the
  entire storage used, regardless of local retention settings (80 TB in this example).
- **Aiven management fee:** In addition to the underlying S3 storage costs, you also pay
  an Aiven management fee for the data stored in S3. This fee is based on the amount of
  storage added via tiered storage.

## Related pages

- [How tiered storage works in Aiven for Apache Kafka®](/docs/products/kafka/concepts/tiered-storage-how-it-works)
- [Guarantees](/docs/products/kafka/concepts/tiered-storage-guarantees)
- [Limitations](/docs/products/kafka/concepts/tiered-storage-limitations)
- [Enabled tiered storage for Aiven for Apache Kafka® service](/docs/products/kafka/howto/enable-kafka-tiered-storage)
