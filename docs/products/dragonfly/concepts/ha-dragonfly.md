---
title: High availability in Aiven for Dragonfly®
---

Aiven for Dragonfly® offers different plans with varying levels of high
availability. The available features depend on the selected plan. Refer
to the table below for a summary of these plans:

:::important
Aiven for Dragonfly® is currently a
[limited availability](/docs/platform/concepts/beta_services) service. If you are interested in exploring this offering,
reach out to our sales team at [sales@aiven.io](mailto:sales@aiven.io) for more information and
access.
:::

  --------------------------------------------------------------------------------------
  Plan           Node             High availability & Backup features     Backup history
                 configuration    failover features                       
  -------------- ---------------- ------------------- ------------------- --------------
  **Startup**    Single-node      Limited             During limited      1 day
                                  availability. No    availability, only  
                                  automatic failover. one latest snapshot 
                                                      stored.             

  **Business**   Two-node         High availability   During limited      3 days
                 (primary +       with automatic      availability, only  
                 standby)         failover to a       one latest snapshot 
                                  standby node if the stored.             
                                  primary fails.                          

  **Premium**    Three-node       Enhanced high       During limited      13 days
                 (primary +       availability with   availability, only  
                 standby +        automatic failover  one latest snapshot 
                 standby)         among multiple      stored.             
                                  standby nodes if                        
                                  the primary fails.                      

  **Custom**     Custom           Custom high         During limited      Custom based
                 configurations   availability and    availability, only  on user
                                  failover features   one latest snapshot requirements
                                  based on user       stored.             
                                  requirements.                           
  --------------------------------------------------------------------------------------

## Failure handling

-   **Minor failures**: Aiven automatically handles minor failures, such
    as service process crashes or temporary loss of network access,
    without any significant changes to the service deployment. In all
    plans, the service automatically restores regular operation by
    restarting crashed processes or restoring network access when
    available.
-   **Severe failures**: In case of severe hardware or software
    problems, such as losing an entire node, more drastic recovery
    measures are required. Aiven\'s monitoring infrastructure
    automatically detects a failing node when it reports problems with
    its self-diagnostics or stops communicating altogether. The
    monitoring infrastructure then schedules the creation of a new
    replacement node.

:::note
In case of database failover, your service\'s **Service URI** remains
the same---only the IP address changes to point to the new primary node.
:::

## High availability for business, premium, and custom plans

If a standby Dragonfly node fails, the primary node continues running.
The system prepares the replacement standby node and synchronizes it
with the primary for normal operations to resume.

In case the primary Dragonfly node fails, the standby node is evaluated
for promotion to the new primary based on data from the Aiven monitoring
infrastructure. Once promoted, this node starts serving clients, and a
new node is scheduled to become the standby. However, during this
transition, there may be a brief service interruption.

If the primary and standby nodes fail simultaneously, new nodes will be
created automatically to replace them. However, this may lead to data
loss as the primary node is restored from the latest backup. As a
result, any database writes made since the last backup could be lost.

:::note
The duration for replacing a failed node depends mainly on the **cloud
region** and the **amount of data** to be restored. For Business,
Premium, and Custom plans with multiple nodes, this process is automatic
and requires no administrator intervention, but service interruptions
may occur during the recreation of nodes.
:::

## Single-node startup service plans

Losing the only node in the service triggers an automatic process of
creating a new replacement node. The new node then restores its state
from the latest available backup and resumes serving customers.

Since there was just a single node providing the service, the service
will be unavailable for the duration of the restore operation. All the
write operations made since the last backup are lost.
