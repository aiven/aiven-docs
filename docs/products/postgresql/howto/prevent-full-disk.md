---
title: Prevent PostgreSQL® full disk issues
---

If your Aiven for PostgreSQL® service runs out of disk space, the
service will start malfunctioning, which will preclude proper backup
creation.

To prevent this situation, Aiven automatically detects when your service
is running out of free space and stops further write operations by
setting the `default_transaction_read_only` parameter to `ON`.

With this setting in place, clients trying to execute write operations
will start facing errors like:

```
cannot execute CREATE TABLE in a read-only transaction.
```

To re-enable database writes you need to increase the available space,
by either deleting data or upgrading to a larger plan.

## Increase free space by upgrading to a larger plan

When upgrading to a larger plan, new nodes with bigger disk space
capacity are created and replace the original nodes. Once the new nodes
with increased disk capacity are up and running, the disk usage returns
to below the critical level and the system automatically sets the
`default_transaction_read_only` parameter to `OFF` allowing write
operations again. You can upgrade the Aiven for PostgreSQL service plan
via the [Aiven console](https://console.aiven.io/) or
[Aiven CLI](/docs/tools/cli).

To perform a plan upgrade via the [Aiven
console](https://console.aiven.io/):

1.  Log in to [Aiven Console](https://console.aiven.io/), and select
    your Aiven for PostgreSQL service.
2.  Select **Service settings** from the sidebar of your service's
    page.
3.  Navigate to the **Service plan** section, and select **Change plan**
    from the **Actions** (**...**) menu.
4.  In the **Change service plan** window, select a new plan with a
    higher capacity, and select **Change**.

Once the new nodes with the increased disk capacity are up and running,
the disk usage drops below the critical level and the system
automatically sets the `default_transaction_read_only` parameter to
`OFF` allowing write operations again.

:::note
You might want to temporarily upgrade your service to a bigger plan to
enable all users or applications to delete data without strict time
limits. In such cases, you may have to wait for the next service backup
to complete before you can downgrade to a smaller plan.
:::

## Increase free space by deleting data

To release space from a database, you can also delete data stored in it,
but the database read-only mode also prevents this. You can enable
deletions by either enabling writes for a specific session or for a
limited amount of time over the full database.

### Enable database writes for a specific session

If you want to enable writes for a session, login to the required
database and execute the following command:

```
SET default_transaction_read_only = OFF;
```

You can then delete data within your session.

### Enable database writes for a limited amount of time

If you want to enable any writes to the database for a limited amount of
time, send the following `POST` request using
[Aiven APIs](/docs/tools/api) and
replacing the `PROJECT_NAME` and `SERVICE_NAME` placeholders:

```
https://api.aiven.io/v1/project/<PROJECT_NAME>/service/<SERVICE_NAME>/enable-writes
```

The above API call enables write operations in the target Aiven for
PostgreSQL database for 15 minutes, allowing you to delete some data.
