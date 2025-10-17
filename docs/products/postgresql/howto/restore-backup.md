---
title: Restore PostgreSQL® from a backup
sidebar_label: Restore from a backup
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import ForkService from "@site/static/includes/fork-service-console.md";

Aiven for PostgreSQL® databases are automatically backed up and can be restored from a backup at any point in time within the **backup retention period**, which [varies by plan](/docs/products/postgresql/concepts/pg-backups).
The restore is created by forking: a new PostgreSQL instance is created and content from the original database is restored into it.

:::note
Aiven for PostgreSQL doesn't allow a service to be rolled back to a
backup in-place since it creates alternative timelines for the database,
adding complexity for the user.
:::

To restore a PostgreSQL database:

<ForkService/>

Once the new service is running, you can change your application's
connection settings to point to it.

:::tip
Forked services can also be very useful for testing purposes, allowing
you to create a completely realistic, separate copy of the actual
production database with its data.
:::

## Manual restores

Manual restoration should only be necessary when data is accidentally
corrupted by the pointing applications. Aiven automatically handles
outages and software failures by replacing broken nodes with new ones
that resume correctly from the point of failure.

:::note
The Hobbyist service plan does not support database forking, so you have
to use an external tool, such as `pg_dump`, to perform a backup.
:::

To perform a manual backup, see
[Create manual PostgreSQL® backups](/docs/products/postgresql/howto/create-manual-backups).
