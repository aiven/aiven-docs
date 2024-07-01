---
title: Tiered storage in Aiven for Apache Kafka® overview
---

Tiered storage in Aiven for Apache Kafka® helps you manage data more effectively by using two different storage types: local disk and remote cloud storage solutions like AWS S3, Google Cloud Storage, and Azure Blob Storage.

This feature lets you allocate frequently accessed data to high-speed local disks while
moving less critical or infrequently accessed data to more cost-effective remote storage
solutions. You can store data on specific topics indefinitely without running out of
space. Once enabled, you configure tiered storage per topic, giving you granular
control over your data storage needs.

:::note

-  Tiered storage for Aiven for Apache Kafka® is supported starting
   from Apache Kafka® version 3.6.
-  Tiered storage for Aiven for Apache Kafka® is not available for
   startup-2 plans.

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
- **Infinite data retention:** Offloading bulk data to remote storage speeds up service
  rebalancing in Aiven for Apache Kafka, enhancing operational efficiency.
- **Transparency:** Even older Kafka clients can benefit from tiered
  storage without needing to be explicitly aware of it.

## When to and why use it

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
  influxes by supplementing local disks with cloud storage, ensuring optimal performance.
- **Unlock unexplored opportunities:**Tiered storage in Aiven for Apache Kafka addresses
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

Aiven charges for tiered storage data based on the data transmitted and stored in
AWS S3. This means you pay for:

- **Data transferred to S3:** Aiven automatically transfers data to S3 based on your
  tier configuration, regardless of local storage retention settings.
- **Data stored in S3:** Billing is based on the highest amount of data stored in S3
  within each hour, not the total amount stored over the hour.
- **Local storage on the Aiven platform:** Local storage has a fixed cost based on the
  provisioned capacity. You pay a set amount each month for a fixed amount of
  local storage.

#### Example

Imagine having a tiered topic with 40 TB of data for local and tiered storage. You set a
local retention time of 7 days. Consider the following:

- You will pay a fixed monthly cost for the 40 TB of local storage.
- You will be charged for storing 40 TB of data in S3, even if some data is over 7 days.
  This is because data is automatically transferred to S3, and billing is based on the
  highest usage level within each hour.

:::note
A tiered topic means all data is eventually stored in S3. If you plan for 80 TB on a
tiered topic, expect to pay for 80 TB on S3 regardless of local retention settings. Even
if you configure retention to keep 40 TB local and 40 TB tiered, eager loading means up
to 78 TB of the 80 TB can reside in the object store.

:::

### BYOC (Bring your own cloud) billing

BYOC billing for tiered storage can vary depending on your specific agreement
with Aiven. Potential scenarios include:

- **Customer responsibility:** In all BYOC setups, you are responsible for the full
  cost of the underlying cloud storage used by tiered storage. This includes the
  entire storage used, regardless of local retention settings (for example,
  80 TB in this example).
- **Aiven management fee:** Typically, you also pay the Aiven management fee
  for the data stored in S3 in addition to the underlying S3 storage costs. However,
there might be scenarios where the management fee does not apply.

## Related pages

-   [How tiered storage works in Aiven for Apache Kafka®](/docs/products/kafka/concepts/tiered-storage-how-it-works)
-   [Guarantees](/docs/products/kafka/concepts/tiered-storage-guarantees)
-   [Limitations](/docs/products/kafka/concepts/tiered-storage-limitations)
-   [Enabled tiered storage for Aiven for Apache Kafka® service](/docs/products/kafka/howto/enable-kafka-tiered-storage)
