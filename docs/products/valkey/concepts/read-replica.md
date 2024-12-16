---
title: Aiven for Valkey read replica
sidebar_label: Valkey read replica
early: true
---

import Button from "@site/src/components/non-swizzled/Buttons";
import GridContainer from "@site/src/components/non-swizzled/GridContainer";

Aiven for Valkey read replica replicates data from a primary service to a replica service across different DNS zones, clouds, or regions, enhancing data availability and supporting disaster recovery.

## Features and benefits

- **High availability:** By replicating data across services in different locations,
  Aiven for Valkey read replica ensures your application remains available even if one
  service experiences downtime.
- **Disaster recovery:** The replica service is automatically promoted to primary in
  case of failure in the original primary service, ensuring business continuity.
- **Geographical distribution:** Valkey read replica supports all clouds and regions,
  reducing latency by keeping data closer to users.

## How read replica works

Aiven for Valkey uses an **active-passive replication model**, where only data added to
the primary service is replicated to the replica. This ensures high availability and
data resilience.

**Replication process:**
New data added to the primary service is asynchronously copied to the replica service.
The primary service handles all read and write operations to ensure performance and
data consistency under normal conditions.

**Handling failures:**
 If the primary service fails, Aiven’s automatic failover mechanism promotes the
 replica service to primary, ensuring continuous availability. To resume normal
 operations, update your application's connection settings to point to the new
 primary service.

## Limitations

- Read replicas are supported only within the same service type. Cross-service
  replication is not available.
- You can create a maximum of 5 read replicas per primary service.
- Read replicas are only supported on the **Startup** plan.
