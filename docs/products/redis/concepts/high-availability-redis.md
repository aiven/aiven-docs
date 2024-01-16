---
title: High availability in Aiven for Redis®*
---

Aiven for Redis®\* is available on a variety of plans, offering
different levels of high availability. The selected plan defines the
features available, and a summary is provided in the table below:

  --------------------------------------------------------------------------------------
  Plan           Node             High availability & Backup features     Backup history
                 configuration    failover features                       
  -------------- ---------------- ------------------- ------------------- --------------
  **Hobbyist**   Single-node      Limited             Single backup only  N/A
                                  availability. No    for disaster        
                                  automatic failover. recovery.           

  **Startup**    Single-node      Limited             Automatic backups   1 day
                                  availability. No    to a remote         
                                  automatic failover. location.           

  **Business**   Two-node         High availability   Automatic backups   3 days
                 (primary +       with automatic      to a remote         
                 standby)         failover to a       location.           
                                  standby node if the                     
                                  primary fails.                          

  **Premium**    Three-node       Enhanced high       Automatic backups   13 days
                 (primary +       availability with   to a remote         
                 standby +        automatic failover  location.           
                 standby)         among multiple                          
                                  standby nodes if                        
                                  the primary fails.                      

  **Custom**     Custom           Custom high         Custom backup       Custom based
                 configurations   availability and    features based on   on user
                                  failover features   user requirements.  requirements
                                  based on user                           
                                  requirements.                           
  --------------------------------------------------------------------------------------

Check out our [Plans & Pricing](https://aiven.io/pricing?product=redis)
page for more information.

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

## Highly available business, premium, and custom service plans

If a standby Redis node fails, the primary node continues running
normally, serving client applications without interruption. Once the
replacement standby node is ready and synchronized with the primary, it
begins real-time replication until the system stabilizes.

When the failed node is a Redis primary, the combined information from
the Aiven monitoring infrastructure and the standby node is used to make
a failover decision. The standby node is promoted as the new primary and
immediately serves clients. A new replacement node is automatically
scheduled and becomes the new standby node.

If both the primary and standby nodes fail simultaneously, new nodes
will be created automatically to take their place as the new primary and
standby. However, this process involves some degree of data loss since
the primary node is restored from the most recent backup available.
Therefore, any writes made to the database since the last backup will be
lost.

:::note
The amount of time it takes to replace a failed node depends mainly on
the used **cloud region** and the **amount of data** that needs to be
restored. However, in the case of services with two or more node
Business, Premium and Custom plans the surviving nodes will keep on
serving clients even during the recreation of the other node. All of
this is automatic and requires no administrator intervention.
:::

## Single-node hobbyist and startup service plans

Losing the only node in the service triggers an automatic process of
creating a new replacement node. The new node then restores its state
from the latest available backup and resumes serving customers.

Since there was just a single node providing the service, the service
will be unavailable for the duration of the restore operation. All the
write operations made since the last backup are lost.
