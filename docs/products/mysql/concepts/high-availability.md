---
title: High availability of Aiven for MySQL®
sidebar_label: High availability
---

Aiven for MySQL® is available on a variety of plans, offering different levels of service availability. The selected plan defines the features available.

| Plan         | Service availability features                                              | Backup history |
| ------------ | -------------------------------------------------------------------------- | -------------- |
| **Hobbyist** | Single node (limited availability)                                         | 2 days         |
| **Startup**  | Single node (limited availability)                                         | 2 days         |
| **Business** | 1 primary node and 1 standby node (higher availability)                    | 14 days        |
| **Premium**  | 1 primary node and 2 standby nodes (top high availability characteristics) | 30 days        |

## Primary and standby nodes

Aiven's Business and Premium plans offer a primary node and standby nodes.
A standby node is useful for multiple reasons:

-   Provides another physical copy of the data in case of hardware,
    software, or network failures
-   Typically reduces the data loss window in disaster scenarios
-   Provides a quicker database time to restore with a controlled
    failover in case of failures as the standby is already installed,
    running, and synchronised with the data
-   Can be used for read-only queries to reduce the load on the primary
    server

## Failure handling

### Minor failures

Minor failures, such as service process crashes or temporary loss of
network access, are handled automatically by Aiven in all plans without
any major changes to the service deployment. The service automatically
restores normal operation once the crashed process is automatically restarted or when
network access is restored.

### Severe failures

Severe failures, such as losing a node entirely in case of hardware
or severe software problems, require radical recovery measures. The
Aiven monitoring infrastructure automatically detects a failing node
when the node starts reporting issues in the self-diagnostics or
when it stops communicating. In such cases, the monitoring infrastructure
automatically schedules a new replacement node to be created.

:::note
In the event of database failover, the **Service URI** of your service
remains the same; only the IP address changes to point to the new primary node.
:::

## Highly available Business and Premium service plans

When a standby node fails, the primary node
keeps running normally and provides a normal service level to the client
applications. Once the new replacement standby node is ready and
synchronised with the primary node, it starts replicating the primary
node in real time as the situation gets back to normal.

When a primary node fails, the combined
information from the Aiven monitoring infrastructure and the standby
node is used to make a failover decision. The standby node is promoted
as the new primary and immediately starts serving clients. A
new replacement node is automatically scheduled and becomes the new
standby node.

If the primary node and all the standby nodes fail at the same time, new
nodes are automatically scheduled for creation to become the new primary
and standby. The primary node is restored from the latest available
backup, which can involve some degree of data loss. Any write operations made
since the backup of the latest binary log file are lost. Typically, this time
window is limited to either five minutes or one binary log file.

:::note
The amount of time required to replace a failed node depends mainly on
the selected cloud region and the amount of data to be restored.

In the case of partial loss of the cluster, the surviving node
keeps on serving clients even during the recreation of the other node.
This happens automatically and requires no administrator intervention.
:::

**Premium** plans operate in a similar way as **Business** plans. The
main difference comes when one of the standby nodes or the primary node
fails. Premium plans have an additional, redundant standby node
available, providing platform availability even in the event of losing
two nodes. If the primary node fails, the Aiven monitoring infrastructure
determines which of the standby nodes is the furthest along in replication
(has the least potential for data loss) and does a controlled failover to that node.

:::note
For backups and restoration, Aiven uses [MyHoard](https://aiven.io/blog/introducing-myhoard-your-single-solution-to-mysql-backups-and-restoration).
:::

## Single-node Hobbyist and Startup service plans

Hobbyist and Startup plans provide a single node. When it's lost, Aiven
immediately starts the automatic process of creating a new replacement
node. The new node starts up, restores its state from the latest
available backup, and resumes serving clients.

Since there is just a single node providing the service, the service is
unavailable for the duration of the restoration. In addition, any write
operations made since the backup of the latest binary log file are lost.
Typically, this time window is limited to either five minutes or one binary log file.
