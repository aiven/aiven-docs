---
title: Cross-region disaster recovery in Aiven for PostgreSQL®
sidebar_label: CRDR overview
limited: true
keywords: [recovery, primary, outage, failure, failover]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import readyForCrdr from "@site/static/images/content/figma/ready-for-crdr.png";
import crdrSetup from "@site/static/images/content/figma/crdr-setup.png";

The cross-region disaster recovery (CRDR) feature ensures your business continuity by
automatically recovering your workloads to a remote region in the event of a region-wide
failure.

## CRDR overview

The CRDR setup is a pair of integrated multi-node services sharing credentials and a
DNS address but located in different regions. CRDR peer services may be hosted on 1-3 nodes.

- Primary region service (**PRS**) is the original service you use unless there's a region
  outage, in which case it hands over to the RRS. As soon as the region is up again and
  the PRS is ready, the PRS takes back control from the RRS.
- Recovery region service (**RRS**) is the service you create for disaster recovery purposes.
  This service takes over from the PRS when a region is down and hands over to the PRS when
  the region and the PRS are up and running again.

The CRDR cycle is a sequence of actions involving CRDR peer services aimed at enabling and
executing CRDR as well as resuming the original service operation.

Throughout the CRDR cycle, CRDR peer services or service nodes go into the following states:

- Active

  A CRDR peer service is **Active** when it runs on a node that is replicating data to
  CRDR standby nodes.
  - PRS is active during normal operations, when a region is up and running.
  - RRS is active after taking over from PRS in the event of a region outage.

- Passive

  A CRDR peer service is **Passive** when it runs on CRDR standby nodes only. Either CRDR
  peer service can be passive depending on a phase of the CRDR cycle.

- Failed

  A CRDR peer service is **Failed** when it's defunct or unreachable after failing over
  automatically or manually in the event of a region outage. Only a PRS can be failed.

- Standby

  A CRDR service node is **Standby** when it is replicating data from the CRDR service
  node that is running the active service.

## Limitations

- RRS needs to use the same service plan and cloud provider as the PRS.

## How it works

The CRDR feature is eligible for all startup, business, and premium service plans.

<img src={readyForCrdr} className="centered" alt="Ready for CRDR" width="100%" />

### CRDR setup

You [enable CRDR by creating an RRS](/docs/products/postgresql/crdr/enable-crdr). As a
result, both PRS and RRS are up and running:

- PRS as an **Active** service, where the traffic goes
- RRS as a **Passive** service in sync with the PRS

<img src={crdrSetup} className="centered" alt="CRDR setup" width="100%" />

### Failover to the recovery region

[Failover to the RRS](/docs/products/postgresql/crdr/crdr-failover-to-recovery) is
performed either
[automatically](/docs/products/postgresql/crdr/crdr-failover-to-recovery) or
[manually](/docs/products/postgresql/crdr/crdr-failover-to-recovery). When completed, the
PRS is **Failed** and the RRS is up and running as an **Active** service.

#### Automatic switchover

In the even of a region-wide failure, a CRDR process is triggered automatically. The RRS
takes over from the PRS so that your workloads remain available at all times during
the region outage.

#### Manual switchover

You trigger a failover to the RRS yourself for testing purposes: to simulate a
disaster scenario and verify the disaster resilience of your infrastructure.

### Revert to the primary region

The purpose of a revert operation is shifting your workload back to the original region
and restoring the CRDR setup to its original configuration.

You [initiate a revert](/docs/products/postgresql/crdr/crdr-revert-to-primary) to the PRS
manually as soon as the PRS is ready to take back control.

A revert process consists of two steps you initiate at your convenience:

1. **Restore the primary service** by recreating its nodes from the local backups as well as
   synchronize (replicate) the most recent data from the active service (RRS).
   When completed, the PRS is restored and in near real-time sync with the RRS.
1. **Switch the direction of the replication** to effectively route the traffic back to the
   primary region. When completed, both the PRS and the RRS are up and running again: the
   PRS as an active service, and the RRS as a passive service.

## DNS address and service URI

### Active service DNS address

CRDR allows you to access your active service always using the same **Service URI**,
which doesn't change in the event of a failover to the recovery region.

:::note
**Service URI** is a locator that is shared between the PRS and the RRS. It always points
to the replicating node of the active service. This node is the only read-write node
in both CRDR regions.
:::

The **Service URI** of an active service can remain unchanged in the event of a region outage
because the DNS record of this **Service URI** is updated to point to the active service.
This allows your applications to work uninterrupted and adapt to the change automatically
without updating its code or data.

### Standby nodes DNS addresses

Regardless of the CRDR cycle phase, you can always connect and access separately
each standby node in the CRDR peer services. This can help you compensate for potential
network delays by using the service geographically closer to your applications.

Standby nodes in the CRDR service pair can have two different URIs, depending on the CRDR
service (region) they belong to:

- For the **primary service standby URI**, the DNS record always points to the standby nodes
  in the primary region.
- For the **recovery service standby URI**, the DNS record always points to the standby nodes
  in the recovery region.

Both the PRS standby URI and the RRS standby URI are dedicated, not shared, and read-only.

## Backups in the recovery region

After a failover to the recovery region in the event of a primary region outage, service
backups start to be taken in the recovery region. You can use this backup history for
operations and data resiliency purposes.

## Related pages

- [Aiven for PostgreSQL high availability](/docs/products/postgresql/concepts/high-availability)
- [Aiven for PostgreSQL backups](/docs/products/postgresql/concepts/pg-backups)
- [Aiven for PostgreSQL read-only replica](/docs/products/postgresql/howto/create-read-replica)
- [Backup to another region](/docs/platform/concepts/backup-to-another-region)
