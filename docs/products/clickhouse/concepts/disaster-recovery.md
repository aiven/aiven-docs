---
title: Disaster recovery in Aiven for ClickHouse®
---

Aiven for ClickHouse® prevents and mitigates emergencies or crises with multiple disaster recovery methods to keep your data safe and sound.

Disaster recovery is a process of coping with emergencies or crises using dedicated methods
for protecting resources and/or reestablishing their desired status. In the context of data
infrastructure, well-established disaster recovery methods are of a particular importance
for preventing data loss or corruption. Software failure, loss of an availability zone,
or datacenter outage are only a few examples of emergencies when disaster recovery comes in.

## High availability

High availability (HA) is an entity's ability to continuously maintain
a certain level of operational performance for a desired period of time.
HA is typically achieved by redundancy - securing replicas of databases
or services to be highly available. To support disaster recovery
technologies, a database service needs to stay highly available, for
example, by operating on a few nodes holding the same data.

With Aiven, HA for your service is supported in business and premium
plans. See [Plan
comparison](https://aiven.io/pricing?tab=plan-comparison&product=clickhouse)
for details.

Also see [cross-availability-zone data distribution](/docs/platform/concepts/availability-zones#cross-zone-data-distro)

## Backup and restore

### Service backup

Backups of Aiven for ClickHouse services happen automatically on a daily
basis.

They cover the following:

-   Access entities (for example, users, roles, passwords, or secrets)
    stored in Zookeeper
-   Database definitions
-   Table schemas
-   Table content (`part files`)
-   Dictionaries

You can
[restore your service from a selected backup](/docs/products/clickhouse/howto/restore-backup).

:::note[Part files]
With the ClickHouse's ReplicatedMergeTree table engine, each INSERT
query results in creating a new file, so-called part, written only once
and not modifiable.

Using part files allows incremental backups in Aiven for ClickHouse:
only changed parts are backed up and files already available in the
object storage are left out from the backup.
:::

For more information on backups in Aiven, see
[Backups at Aiven](/docs/platform/concepts/service_backups).

### Service recovery

Regardless of whether your Aiven for ClickHouse service is powered on or powered off, you
can create its copy and
[restore the data from a selected service backup](/docs/products/clickhouse/howto/restore-backup).
For this purpose, you create a fork from the original service. This spins up a new service
that hosts the data recovered from the selected backup.

## Sharding

Essentially, sharding is a technique of splitting database rows across
multiple database nodes, which usually significantly increases
performance. However, integrating sharding with database replication
technologies, data can be replicated across shards of the sharded
database. Replication at the shard level provides high availability and
helps to achieve disaster recovery. A shard group can be replicated to
one or more data centers, which improves the disaster recovery
capability.

With Aiven for ClickHouse [business and premium
plans](https://aiven.io/pricing?tab=plan-comparison&product=clickhouse),
each shard is replicated across three availability zones. The service
and the data stay fully available even if an entire availability zone is
lost.

:::note
Although sharding with replicated nodes can reduce failures, it still
cannot save a service from the loss of an entire region.
:::

For information on how to work with shards in Aiven for ClickHouse, see
[Enable reading and writing data across shards](/docs/products/clickhouse/howto/use-shards-with-distributed-table).

## Limitations

Aiven for ClickHouse has a few restrictions on the disaster recovery
capability.

-   No backup to another region
-   No point in time recovery (PITR)

For all the restrictions and limits for Aiven for ClickHouse, see
[Aiven for ClickHouse limits and limitations](/docs/products/clickhouse/reference/limitations).

## Related pages

-   [Disaster Recovery testing scenarios](/docs/platform/concepts/disaster-recovery-test-scenarios)
-   [Failover procedures](/docs/products/postgresql/concepts/upgrade-failover)
