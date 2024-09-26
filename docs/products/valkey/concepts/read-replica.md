---
title: Aiven for Valkey read replica
sidebar_label: Valkey read replica
early: true
---

import Button from "@site/src/components/Buttons";
import GridContainer from "@site/src/components/GridContainer";

Aiven for Valkey read replica replicates data from a primary cluster to a replica cluster across different DNS zones, clouds, or regions, enhancing data availability and supporting disaster recovery.

## Features and benefits

- **High availability:** By replicating data across clusters in different locations,
  Aiven for Valkey read replica ensures your application remains available even if one
  cluster experiences downtime.
- **Disaster recovery:** The replica cluster is automatically promoted to primary in
  case of failure in the original primary cluster, ensuring business continuity.
- **Geographical distribution:** Valkey read replica supports all clouds and regions,
  reducing latency by keeping data closer to users.

## How read replica works

Aiven for Valkey uses an **active-passive replication model** for its read replica
clusters, ensuring high availability and data resilience.

**Replication process:**
New data added to the primary cluster is asynchronously copied to the replica cluster.
The primary cluster handles all read and write operations to ensure performance and
data consistency under normal conditions.

**Handling failures:**
If of a primary cluster failure, Aiven's automatic failover mechanism promotes
the replica cluster to the new primary, ensuring continuous availability. To resume
normal operations, update your application's connection settings to
point to the new primary cluster.

## Limitations

- Aiven for Valkey uses an active-passive model, meaning only data added to the primary
  cluster is replicated to the replica.
- Read replicas are supported only within the same service type. Cross-service
  replication is not available.
- You can create a maximum of 5 read replicas per primary service.
- Read replicas can only be created on the **Startup-4** plan.

## Next steps

<Button to="/docs/products/valkey/howto/create-valkey-read-replica">Create a read replica</Button>
