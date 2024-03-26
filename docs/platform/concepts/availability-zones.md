---
title: Availability zones
---

Availability zones (AZs) are physically isolated locations (data centers) where cloud services operate.

There are multiple AZs within a region, each with independent power, cooling, and network
infrastructure.

The choice of AZs is usually affected by the
latency/proximity to customers, compliance, SLA, redundancy/data
security requirements, and cost. All AZs in a region are interconnected
for an easy resource replication and application partitioning.

## Cross-availability-zone data distribution {#cross-zone-data-distro}

Services can be replicated across multiple availability zones (AZs),
which simplifies handling failures, decreases network latency, and
enhances resource protection. This deployment model provides redundancy
and failover in case an AZ goes down. Deploying services across multiple
AZs enables smooth traffic transfer between AZs. It improves resiliency
and reliability of workloads.

## Aiven services across availability zones

For Aiven services, nodes automatically spread across multiple
AZs. All Aiven's multi-node service plans are
automatically spread among AZs of a region as long as the underlying
cloud provider supports it.

<!-- vale off -->
The virtual machines (VMs) are distributed evenly across zones to
provide the best possible service availability in cases an entire AZ
(which may include one or more datacenters) goes down.
<!-- vale on -->

Cloud providers with AZs available to support your Aiven services are
the following:

-   Amazon Web Services
-   Google Cloud Platform
-   Microsoft Azure
-   UpCloud

## Supported availability zones

To learn what availability zones per cloud provider and region are supported for
Aiven-managed services, check the **Cloud** column in
[List of available cloud regions](/docs/platform/reference/list_of_clouds).

:::note[Example]
With UpCloud, the only location where Aiven can automatically balance
replicas of services is `upcloud-fi-hel`. For `upcloud-fi-hel`, UpCloud
provides two datacenters (`fi-hel1` and `fi-hel2`). With a two-node
plan, for example, it will result in one of the servers in `fi-hel1` and
the other in `fi-hel2`.
:::

## Smart availability zones for Apache Kafka®

On top of spreading service's nodes across the availability zones
of a cloud region, Aiven automatically balances replicas of your Apache
Kafka® partitions into different AZs. Since Aiven automatically
rebalances the data in your Apache Kafka® cluster, your data remains
fully available when a node or a whole AZ is lost.

## Related pages

-   [List of available cloud regions](/docs/platform/reference/list_of_clouds)
-   [PostgreSQL® backups](/docs/products/postgresql/concepts/pg-backups)
-   [High availability](/docs/products/postgresql/concepts/high-availability)
-   [Create and use read-only replicas](/docs/products/postgresql/howto/create-read-replica)
-   [Migrate service to another cloud or region](/docs/platform/howto/migrate-services-cloud-region)
-   [Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker)
-   [OpenSearch backups](/docs/products/opensearch/concepts/backups)
-   [MySQL backups](/docs/products/mysql/concepts/mysql-backups)
