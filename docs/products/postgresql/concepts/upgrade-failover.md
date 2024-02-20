---
title: Upgrade and failover procedures
---

Aiven for PostgreSQL® Business and Premium plans include **standby
read-replica** servers. If the primary server fails, a standby replica
server is automatically promoted as new primary server.

:::warning
Standby read-replica servers available on PostgreSQL Business and
Premium plans are substantially different from manually created
read-replica services since the latter are not promoted if the primary
server fails.
:::

There are two distinct cases when failover or switchover occurs:

1.  Uncontrolled primary/replica disconnection
2.  Controlled switchover during rolling-forward upgrades

:::warning
For Hobbyist and Startup plans, due to missing standby read-replica
servers, uncontrolled disconnections can only be mitigated by restoring
data from a backup, and can result in data loss of the database changes
since the latest backup data that was uploaded to object storage.
:::

## Uncontrolled primary/replica disconnection {#Failover PGUncontrolled}

When a server unexpectedly disconnects, there is no certain way to know
whether it really disappeared or whether there is a temporary glitch in
the cloud provider's network. Aiven's management platform has
different procedures in case of primary or replica nodes disconnections.

### Primary server disconnection

If the **primary** server disappears, Aiven's management platform uses
a **60-second timeout** before marking the server as down and promoting
a replica server as new primary. During this 60-second timeout, the
master is unavailable (`servicename-projectname.aivencloud.com` does not
respond), and `replica-servicename-projectname.aivencloud.com` works
fine (in read-only mode).

After the replica promotion, `servicename-projectname.aivencloud.com`
would point to the new primary server, while
`replica-servicename-projectname.aivencloud.com` becomes unreachable.
Finally, a new replica server is created, and after the synchronisation
with the primary, the `replica-servicename-projectname.aivencloud.com`
DNS is switched to point to the new replica server.

### Replica server disconnection

If the **replica** server disappears, Aiven's management platform uses
a **60-second timeout** before marking the server as down and creating a
new replica server.

:::note
Each Aiven for PostgreSQL® Business plan supports one replica server
only, which is why the service's read replica endpoint
`replica-SERVICE_NAME-PROJECT_NAME.aivencloud.com` remains unavailable
and queries to this endpoint time-out until a new replica is available.
:::

:::tip
For higher availability on a service's read replica endpoint, you can
upgrade to a Premium plan with two standby servers used as read
replicas.
:::

The DNS record pointing to primary server
`SERVICE_NAME-PROJECT_NAME.aivencloud.com` remains unchanged during the
recovery of the replica server.

## Controlled switchover during upgrades or migrations

:::note
The below doesn't apply to major version upgrade with `pg_upgrade`, for
major version upgrade please read the related
[how-to](/docs/products/postgresql/howto/upgrade).
:::

During maintenance updates, cloud migrations, or plan changes, the below
procedure is followed:

1.  For each of the **replica** nodes (available only on Business and
    Premium plans), a new server is created, and data restored from a
    backup. Then the new server starts following the existing primary
    server. After the new server is up and running and data up-to-date,
    `replica-servicename-projectname.aivencloud.com` DNS entry is
    changed to point to it, and the old replica server is deleted.
2.  An additional server is created, and data restored from a backup.
    Then the new server is synced up to the old primary server.
3.  Cluster replication is changed to **quorum commit synchronous** to
    avoid data loss when changing primary server.

:::note
At this stage, one extra server is running: the old primary server, and
N+1 replica servers (2 for Business and 3 for Premium plans).
:::

3.  The old primary server is scheduled for termination, and one of the
    new replica servers is immediately promoted as a primary server.
    `servicename-projectname.aivencloud.com` DNS is updated to point to
    the new primary server. The new primary server is removed from the
    `replica-servicename-projectname.aivencloud.com` DNS record.

:::note
The old primary server is kept alive for a short period of time (minimum
60 seconds) with a TCP forwarding setup pointing to the new primary
server allowing clients to connect before learning the new IP address.
:::

:::note
If the service plan is changed from a business plan that has two nodes
to a startup plan which only has one node of the same tier (for example,
business-8 to startup-8), the standby node is removed while the primary
node is retained, and connections to the primary are not affected by the
downgrade. Similarly, upgrading the service plan from a startup one to a
business one adds a standby node to the service cluster, and connections
to the primary node are unaffected.
:::

## Recreation of replication slots

In case of failover or controlled switchover of an Aiven for PostgreSQL
service, the replication slots from the old primary server are
automatically recreated in the new primary server.

:::note
The recreation of replication slots feature is enabled automatically and
doesn't require restarting the nodes for services that have been
created or updated as of January 2023. Additional details are outlined
in [our blog
post](https://aiven.io/blog/aiven-for-pg-recreates-logical-replication-slots).
:::

:::important
Replication slots are not recovered after major version upgrades of
Aiven for PostgreSQL.
:::

### One-node cluster

Before replacing a node in the one-node cluster, the new node acquires
information on replication slots on the original service, re-creates
them, and only then the failover is performed.

### Multi-node cluster

For multi-node setups, replication slots from the primary are
synchronized to the standbys periodically. At regular time intervals

-   Dependencies for newly-created slots are installed in the
    corresponding databases (currently, every 30 seconds). When the new
    slot is created on a database and we want to re-create this slot on
    a standby, we use a functionality from the `aiven_extras` extension,
    which needs to be installed in the database. Therefore, every 30
    seconds there is a job checking that this extension is installed on
    the databases with logical replication slots.
-   Positions (`confirmed_flush_lsn`) of the slots are synchronized
    between the primary and the standbys.

When a failover to a standby occurs, the standby node already has
replication slots with an up-to-date (maximum 5-second delay) positions
from the primary.

:::warning
Uncontrolled failover ramifications

-   Slots created up to 30 seconds before the failover might be lost.
-   If due to a cloud provider failure, a node from the one-node cluster
    disappears, replication slots on a new replacement node cannot be
    restored since the replication slots information is lost.
:::

:::note
-   Position of recovered replication slots might be up to several
    seconds older than on the original primary. Therefore, when
    re-connecting to PostgreSQL and reading from replication slots,
    it's recommended to use start positions known to the client until
    which the data was already received. Otherwise, the client might
    receive duplicate entries.
-   In case of failover with a huge lag between the primary node and the
    standby node (for example, when a master disappears), the position
    of the replication slot restored on a new master is not newer than
    the position on the standby node, even though the position of that
    slot on the old master was newer.
:::
