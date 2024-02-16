---
title: High availability of Aiven for MySQL®
sidebar_label: High availability
---

Aiven for MySQL® is available on a variety of plans, offering different levels of high availability. The selected plan defines the features available, and a summary is provided in the table below:

| Plan         | High availability features                                      | Backup history | Uptime  |
| ------------ | --------------------------------------------------------------- | -------------- | ------- |
| **Hobbyist** | Single node with limited availability                           | 2 days         | 98.5 %  |
| **Startup**  | Single node with limited availability                           | 2 days         | 99 %    |
| **Business** | Two nodes (primary + standby: regular high availability)        | 14 days        | 99.9 %  |
| **Premium**  | Three nodes (primary + 2 x standby: strong high availability)   | 30-day         | 99.99 % |

## About primary and standby nodes

Aiven's Business and Premium plans offer a primary node and standby nodes. A standby
service is useful for multiple reasons:

-   Provides another physical copy of the data in case of hardware,
    software, or network failures
-   Reduces the data loss window in failure scenarios
-   Provides higher availability as failure recovery leverages an already provisioned
    standby node and does not suffer the delay of restoring a backups
-   Can be used for low-availability or occasionnal read-only queries
    server

## Failure handling

### Minor failures

Minor failures, such as service process crashes or temporary loss of
network access, are handled automatically by Aiven in all plans without
any major changes to the service deployment. The service automatically
resumes normal operation once the crashed process is automatically restarted or when
network access is restored.

### Severe failures

Severe failures occur, for example, when a node is lost entirely in case of hardware
or severe software problems, such as an unrecoverable crash-looping condition. Severe
failures require radical recovery measures. The Aiven monitoring infrastructure
automatically detects a failing node both when the node starts reporting issues in the
self-diagnostics or when stops communicating. The monitoring infrastructure automatically
schedules the creation of a replacement node unless there is a standby to which a failover
can be performed.

:::note
In case of database failover, the **Service URI** of your service
remains the same; only the IP address changes to point to the new
primary node.
:::

### RTO and RPO

- With standby, recovery time objective (RTO) is quick, and recovery point objective (RPO)
  is close to zero loss.
- Without standby, RPO loses 5 minutes of data, and RTO is variable as it involves
  restoring a backup and applying binlogs, which depends on the database size and the
  write load (up to 6 hours or more in edge cases).

## Highly available Business and Premium service plans

When the failed node is a MySQL standby node, the primary node
keeps running normally and provides a normal service level to the client
applications.
Once the new replacement standby node is ready and
synchronised with the primary node, it starts replicating the primary
node in real time as the situation reverts back to normal.

:::note
When the only standby is restored, a failure of the primary is long to recover since the
recovery requires restoring a backup and applying binlogs.
:::

When the failed node is a MySQL primary node, the combined
information from the Aiven monitoring infrastructure and the standby
node is used to make a failover decision. The standby node is then
promoted as the new primary and starts serving clients. A
new replacement node is automatically scheduled and becomes the new
standby node. Data loss in this scenario is close to zero.

In case the primary node and all the standby nodes fail at the same time or the primary
node fails while all the standby nodes are being recovered:

- On a single-standby node plan

  New nodes are automatically scheduled for creation to become the new primary and standby.
  The primary node is restored from the latest available backup, which can involve some
  degree of data loss. Any write operations made since the backup of the binary log file
  are lost. Typically, this time window is limited to either five minutes of time or one
  binary log file.

- On a two-standby node plan

  To avoid a cascading failure condition leading to data lost, the second failover to the
  last standby is recommended only after a new standby is provisioned.

:::note
The amount of time it takes to replace a failed node depends mainly on
the selected cloud region and the amount of data to be restored.
However, in the case of partial loss of the cluster, the surviving node
keeps on serving clients even during the recreation of the other node.
All of this is automatic and requires no administrator intervention.
:::

**Premium** plans operate in a similar way as **Business** plans. The
main difference comes when one of the standby nodes or the primary node
fails. Premium plans have an additional, redundant standby node
available, providing platform availability even in the event of losing
two nodes. In cases where the primary node fails, Aiven monitoring tool determines which
of the standby nodes is the furthest along
in replication (has the least potential for data loss) and does a
controlled failover to that node.

:::note
For Aiven for MySQL backups and restoration, Aiven uses
[MyHoard](https://aiven.io/blog/introducing-myhoard-your-single-solution-to-mysql-backups-and-restoration).
:::

## Single-node Hobbyist and Startup service plans

Hobbyist and Startup plans provide a single node; when it's lost, Aiven
immediately starts the automatic process of creating a new replacement
node. The new node starts up and restores its state from the latest
available backup also applying the saved binlogs. Next, it resumes serving customers.

Since there is just a single node providing the service, the service is
unavailable for the duration of the restoration. In addition, any write
operations made since the backup of the latest binary log file are lost. Typically, this time
window is limited to either five minutes of time or one binary log file.
