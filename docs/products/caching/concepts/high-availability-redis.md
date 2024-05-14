---
title: High availability in Aiven for Caching
---

Explore high availability with Aiven for Caching across multiple plans. Gain insights into service continuity and understand the approach to handling failures.

Compare Aiven for Caching plans in the table below. Each plan offers unique
configurations and features. Choose what best fits your needs.

| Plan         | Node configuration                       | High availability & Backup features                                                                   | Backup history                                     |
| ------------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Hobbyist** | Single-node                              | Limited availability. No automatic failover.                                                          | Single backup only for disaster recovery. N/A      |
| **Startup**  | Single-node                              | Limited availability. No automatic failover.                                                          | Automatic backups to a remote location.            |
| **Business** | Two-node (primary + standby)             | High availability with automatic failover to a standby node if the primary fails.                     | Automatic backups to a remote location.            |
| **Premium**  | Three-node (primary + standby + standby) | Enhanced high availability with automatic failover among multiple standby nodes if the primary fails. | Automatic backups to a remote location.            |
| **Custom**   | Custom configurations                    | Custom high availability and failover features based on user requirements.                            | Custom backup features based on user requirements. |

Refer to the [Plans & Pricing](https://aiven.io/pricing?product=redis)
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
    measures are required. Aiven's monitoring infrastructure
    automatically detects a failing node when it reports problems with
    its self-diagnostics or stops communicating altogether. The
    monitoring infrastructure then schedules the creation of a new
    replacement node.

:::note
In case of database failover, the **Service URI** remains unchanged, and only the IP address
is updated to point to the new primary node.
:::

## Highly available business, premium, and custom service plans

If a standby Caching node fails, the primary node continues running
normally, serving client applications without interruption. Once the
replacement standby node is ready and synchronized with the primary, it
begins real-time replication until the system stabilizes.

When the failed node is a Caching primary, the combined information from
the Aiven monitoring infrastructure and the standby node is used to make
a failover decision. The standby node is promoted as the new primary and
immediately serves clients. A new replacement node is automatically
scheduled and becomes the new standby node.

If both the primary and standby nodes fail simultaneously, new nodes
are created automatically to take their place as the new primary and
standby. However, this process involves some degree of data loss since
the primary node is restored from the most recent backup available.
Therefore, any writes made to the database since the last backup is lost.

:::note
The amount of time it takes to replace a failed node depends mainly on
the used **cloud region** and the **amount of data** that needs to be
restored. However, in services with two or more nodes,
such as business, premium, and custom plans, the surviving nodes continue serving
clients even while recreating the other node. This is automatic and
requires no administrator intervention.
:::

## Single-node hobbyist and startup service plans

Losing the only node in the service triggers an automatic process of
creating a new replacement node. The new node then restores its state
from the latest available backup and resumes serving customers.

During the restore operation, the service is unavailable since there is only
one node providing the service. Any write operations made after the last backup are lost.
