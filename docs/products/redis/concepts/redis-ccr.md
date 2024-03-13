---
title: Aiven for Redis®* cross-cluster replication
sidebar_label: Redis CCR
pro: true
---

Aiven for Redis®* Cross-Cluster Replication (CCR) feature replicates data from a primary to a replica cluster across various DNS, clouds, or regions, improving data availability and aiding in disaster recovery.

## Features and benefits

- **High availability:** By replicating data across clusters in different locations,
  Aiven for Redis CCR ensures that your application remains available even if one
  cluster goes down.
- **Disaster recovery:** Automatic promotion of the follower cluster to leader status in
  case of the primary/main cluster's failure provides a robust disaster
  recovery mechanism.
- **Geographical distribution:** With the ability to work across all clouds and regions,
  Aiven for Redis CCR keeps data closer to your users, reducing latency and improving
  the user experience.

## How CCR works

Aiven for Redis uses an **active-passive replication model** for its CCR feature,
ensuring high availability and data resilience across deployments.

**Replication process:** The replication process involves two services - the primary and
replica services. The system automatically and asynchronously copies any new data you
add to the primary service to the replica service. The primary service manages all
read and write operations for optimal performance and data consistency under
normal conditions.

**Handling failures:** In case of any failure of the primary service, Aiven provides
automatic failover functionality, which promotes the replica service to become
the new primary, maintaining service continuity.

However, to fully resume normal operations, you must manually update your application’s
connection settings to point to the new primary service.

## Limitations

- This feature requires `[Pro Platform](/docs/platform/concepts/pro-platform)`.
- Aiven for Redis CCR follows an active-passive model, which means that only the data
ingested in the primary service gets replicated.
- Aiven for Redis services only support replication within their own service type.
Cross-service replication to or from Aiven for Dragonfly services is not supported.
- Enabling up CCR for Aiven for Redis is only possible via API/CLI, with console support
  planned for future releases.

## Related pages

- [Enable cross-cluster replication for Aiven for Redis](/docs/products/redis/howto/enable-redis-ccr)
