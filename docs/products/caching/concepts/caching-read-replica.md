---
title: Aiven for Caching read replica
sidebar_label: Caching read replica
pro: true
---

Aiven for Caching read replica replicates data from a primary to a replica cluster across different DNS, clouds, or regions, improving data availability and supporting disaster recovery.

## Features and benefits

- **High availability:** By replicating data across clusters in different locations,
  Aiven for Caching read replica ensures that your application remains available even if one
  cluster goes down.
- **Disaster recovery:** Automatic promotion of the follower cluster to leader status in
  case of the primary/main cluster's failure provides a robust disaster
  recovery mechanism.
- **Geographical distribution:** With support for all clouds and regions, Aiven for Caching
  read replica reduces latency by keeping data closer to your users.

## How read replica works

Aiven for Caching uses an **active-passive replication model** for its read replica
cluster, ensuring high availability and data resilience across deployments.

**Replication process:** The replication process involves two services - the primary and
replica services. The system automatically and asynchronously copies any new data you
add to the primary service to the replica service. The primary service manages all
read and write operations for optimal performance and data consistency under
normal conditions.

**Handling failures:**  In the event of a primary service failure, Aiven's automatic
failover feature promotes the read replica service to become the new primary,
ensuring continuous service availability.

However, to fully resume normal operations, manually update your application’s
connection settings to point to the new primary service.

## Limitations

- This feature requires Aiven enterprise.
- Aiven for Caching read replica follows an active-passive model, which means that only
  the data ingested in the primary service gets replicated.
- Aiven for Caching services only support replication within their own service type.
  Cross-service replication to or from Aiven for Dragonfly services is not supported.

## Related pages

- [Create read replica for Aiven for Caching](/docs/products/caching/howto/create-caching-read-replica)
