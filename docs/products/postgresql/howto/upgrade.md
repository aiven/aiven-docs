---
title: Perform a PostgreSQL® major version upgrade
---

PostgreSQL® in-place upgrades allows to upgrade an instances to a new
major version without needing to fork and redirect the traffic. The
whole procedure usually takes 60 seconds or less for small databases.

For all upgrades, Aiven recommends to **test the upgrade on a fork** of
the database to be upgraded. Testing on a fork provides the benefit of
verifying the impact of the upgrade for the specific service without
affecting the running service. This is useful in two main aspects:

1.  Ensuring that it succeeds and is performed quickly enough, which
    might not be the case, usually when there many of databases or
    many "large objects". Smaller node sizes with a large dataset can
    run into OOM issues during the `pg_dump/pg_restore` phase of
    `pg_upgrade --link` and a fork will reveal this scenario.
1.  To test query performance directly after upgrade under real world
    load i.e. when no statistics are available and caches are cold.

:::warning
Very large databases may take a long time to upgrade. If this scenario
is unfeasible, a
[read-only replica service](create-read-replica) may be used to keep the data readable during an upgrade. Any
PostgreSQL upgrade has some risk of downtime and data loss if the node
goes down before the system is back in a normal state. A read-only
replica can help reduce this risk.
:::

To upgrade a PostgreSQL service:

1.  Log in to [Aiven Console](https://console.aiven.io/), and select the
    instance to upgrade.
1.  Select **Service settings** from the sidebar of your service's
    page.
1.  Go to the **Service management** section, and select **Upgrade
    versioin** from the **Actions** (**...**) menu.
1.  In the **Upgrade Aiven for PostgreSQL Confirmation** window, select
    the version to upgrade to from the dropdown menu.

    :::note
    When you select the version, the system checks the compatibility of the
    upgrade.
    :::

1.  Select **Upgrade**.

    The system starts applying the upgrade.

    1.  An automatic check is executed to confirm whether an upgrade is
        possible (`pg_upgrade --check`).
    1.  If the service has more than one node, any standby nodes are
        shut down and removed, as replication can not be performed
        during the upgrade.
    1.  The primary node starts an in-place upgrade to the new major
        version.
    1.  After a successful upgrade the primary node becomes available
        for use. A new full backup is initiated.
    1.  After completion of the full backup, new standby nodes are
        created for services with more than one node.
    1.  If the service is a configured to have a
        [read-only replica service](create-read-replica), the replica service will now be upgraded to the
        same version using the very same process. Read-only replicas
        remain readable during the upgrade of the primary service, but
        will go offline for the upgrade at this point.
    1.  `ANALYZE` will be automatically run for all tables after the
        upgrade to refresh table statistics and optimize queries.

:::note
A full backup of a large database may take a long time to complete. It
may take some time before the standby node becomes available, as they
can only be launched when a backup taken from the new version is
available.
:::

More information about upgrade and failover procedures can be found in
the
[dedicated page](/docs/products/postgresql/concepts/upgrade-failover).

:::warning
Once the upgrade is started, the PostgreSQL instance can't be restored
to the previous version. Similarly, the pre-existing backups cannot be
used for procedures such as Point In Time Recovery since they were
created with an earlier version of PostgreSQL.
:::
