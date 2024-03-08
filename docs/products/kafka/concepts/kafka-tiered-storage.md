---
title: Tiered storage in Aiven for Apache Kafka® overview
early: true
---

Tiered storage in Aiven for Apache Kafka® enables more effective data
management by utilizing two different storage types--local disk and
remote cloud storage solutions such as AWS S3, Google Cloud Storage, and
Azure Blob Storage. This feature offers a tailored approach to data
storage, allowing you to allocate frequently accessed data to high-speed
local disks while offloading less critical or infrequently accessed data
to more cost-effective remote storage solutions. Tiered storage enables
you to indefinitely store data on specific topics without running out of
space. Once enabled, it is configured per topic, giving you granular
control over data storage needs.

:::note

-  Tiered storage for Aiven for Apache Kafka® is supported starting
   from Apache Kafka® version 3.6.
-  Tiered storage for Aiven for Apache Kafka® is not available for
   startup-2 plans.

:::

## Benefits of tiered storage

Tiered storage offers multiple benefits, including:

-   **Scalability:** With tiered storage in Aiven for Apache Kafka,
    storage and computing are effectively decoupled, enabling them to
    scale independently. This flexibility ensures that while the storage
    capacity can expand almost infinitely with cloud solutions, compute
    resources can also be adjusted based on demand, thereby eliminating any
    concerns about storage or processing limitations.
-   **Cost efficiency:** By moving less frequently accessed data to a
    cost-effective storage tier, you can achieve significant financial
    savings.
-   **Operational speed:** With the bulk of data offloaded to remote
    storage, service rebalancing in Aiven for Apache Kafka becomes
    faster, making for a smoother operational experience.
-   **Infinite data retention:** With the scalability of cloud storage,
    you can achieve unlimited data retention, valuable for analytics and
    compliance.
-   **Transparency:** Even older Kafka clients can benefit from tiered
    storage without needing to be explicitly aware of it.

## When to and why use it

Understanding when and why to use tiered storage in Aiven for Apache
Kafka will help you maximize its benefits, particularly around cost
savings and system performance.

**Scenarios for use:**

-   **Long-term data retention**: Many organizations require large-scale
    data storage for extended periods, either for regulatory compliance
    or historical data analysis. Cloud services provide an almost
    limitless storage capacity, making it possible to keep data
    accessible for as long as required at a reasonable cost. This is
    where tiered storage becomes especially valuable.
-   **High-speed data ingestion**: Tiered storage can offer a solution
    when dealing with unpredictable or sudden influxes of data. By
    supplementing the local disks with cloud storage, sudden increases
    in incoming data can be managed, ensuring optimum system
    performance.
-   **Unlock unexplored opportunities:** Tiered storage in Aiven for
    Apache Kafka addresses existing storage challenges and opens the
    door to new and innovative use cases that were once unfeasible or
    cost-prohibitive. By eliminating traditional storage limitations,
    organizations gain the flexibility to support a wide range of
    applications and workflows, even those where Apache Kafka might have
    been considered impractical before. We encourage users to leverage
    this newfound flexibility to think creatively and redefine their
    experience with Apache Kafka.

## Pricing

Tiered storage costs are determined by the amount of remote storage
used, measured in GB/hour. The highest usage level within each hour is
the basis for calculating charges.

## Related pages

-   [How tiered storage works in Aiven for Apache Kafka®](/docs/products/kafka/concepts/tiered-storage-how-it-works)
-   [Guarantees](/docs/products/kafka/concepts/tiered-storage-guarantees)
-   [Limitations](/docs/products/kafka/concepts/tiered-storage-limitations)
-   [Enabled tiered storage for Aiven for Apache Kafka® service](/docs/products/kafka/howto/enable-kafka-tiered-storage)
