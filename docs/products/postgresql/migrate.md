---
title: Migrate to Aiven for PostgreSQL®
sidebar_label: Migrate
---

import RelatedPages from "@site/src/components/RelatedPages";

Migrate PostgreSQL® databases to Aiven for PostgreSQL® using the Aiven Console,
aiven-db-migrate, pg_dump and pg_restore, or Bucardo.

## Choose a migration method

Each method copies schema and data from a source PostgreSQL database to Aiven for
PostgreSQL. Pick a method based on your source database, your permissions on it, and how
much downtime you can accept.

- **Aiven Console**: A guided migration wizard for a one-time setup. It runs the same
  continuous migration engine as `aiven-db-migrate` behind the scenes, so it's a good
  default when you don't need to script the process.
- **aiven-db-migrate**: The CLI and Python tool behind the console migration. Use it to
  automate a migration, run it from a script, or get more detailed failure output than
  the console shows.
- **pg_dump and pg_restore**: A point-in-time snapshot using standard PostgreSQL tools.
  Data written to the source database after the dump starts isn't included, so plan for a
  period with no writes to the source.
- **Bucardo**: An open source alternative for sources the other methods can't handle,
  specifically PostgreSQL 9.6 or earlier, or a source where you don't have superuser
  access to create replication slots.

## Before you start

- The default method for the console and `aiven-db-migrate` is continuous migration using
  logical replication, which keeps the source database available throughout the
  migration. It requires either superuser access on the source or the `aiven_extras`
  extension. Without either, the migration falls back to a one-time `pg_dump` snapshot.
- Logical replication doesn't copy every object. Review the [PostgreSQL logical
  replication
  restrictions](https://www.postgresql.org/docs/current/logical-replication-restrictions.html)
  before you start, particularly around sequences and DDL changes.
- The target Aiven for PostgreSQL service needs at least 130% of the source database's
  size in free disk space, and its PostgreSQL version must be the same as or newer than
  the source version.
- The console and `aiven-db-migrate` both let you exclude specific databases
  (`ignore_dbs`) and specific database roles (`ignore_roles`) from a migration.

<RelatedPages/>

- [Migrate PostgreSQL® databases to Aiven using the Aiven
  Console](/docs/products/postgresql/howto/migrate-db-to-aiven-via-console)
- [Prepare for migrating PostgreSQL® to Aiven using
  aiven-db-migrate](/docs/products/postgresql/concepts/aiven-db-migrate)
- [Migrate PostgreSQL® databases to Aiven using
  aiven-db-migrate](/docs/products/postgresql/howto/migrate-aiven-db-migrate)
- [Migrate between PostgreSQL® instances using aiven-db-migrate in
  Python](/docs/products/postgresql/howto/run-aiven-db-migrate-python)
- [Migrate PostgreSQL® databases to Aiven using pg_dump and
  pg_restore](/docs/products/postgresql/howto/migrate-pg-dump-restore)
- [Migrate PostgreSQL® databases to Aiven using
  Bucardo](/docs/products/postgresql/howto/migrate-using-bucardo)
