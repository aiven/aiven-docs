---
title: Create manual PostgreSQL® backups with pg_dump
sidebar_label: Create manual backups
---

Aiven provides [fully automated backup management for PostgreSQL](/docs/products/postgresql/concepts/pg-backups).
All backups are encrypted with service-specific keys, and point-in-time recovery
is supported to allow recovering the system to any point within the backup
window. Aiven stores the backups to the closest available cloud storage to
enhance restore speed.

Perform a backup of your database using the standard PostgreSQL
`pg_dump` command. See the [pg_dump docs](https://www.postgresql.org/docs/current/app-pgdump.html),
but a typical command looks like:

```bash
pg_dump 'POSTGRESQL_URI' \
    -f backup_folder     \
    -j 2                 \
    -F directory
```

Where:

- `POSTGRESQL_URI` is the URL for PostgreSQL connection, from the service overview page.

This command creates a backup in `directory` format (ready for use with
`pg_restore`) using 2 concurrent jobs and storing the output to a folder
called `backup_folder`.

:::tip
`pg_dump` can be run against any **standby** node, using the *Replica
URI* from the Aiven Console. Creating more jobs via the `-j` option
can be useful, since it may not be a problem to add extra
load to the standby node.
:::
