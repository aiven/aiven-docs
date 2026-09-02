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

- **[Aiven Console](/docs/products/postgresql/howto/migrate-db-to-aiven-via-console)**: A
  guided migration wizard. It drives the same underlying migration settings as
  `aiven-db-migrate`, so it's a good default when you don't need to script the process.
- **[aiven-db-migrate](/docs/products/postgresql/howto/migrate-aiven-db-migrate)**: The
  CLI and Python tool behind the console migration. Reach for it when the console isn't
  available to you, such as migrating from a script, a CI pipeline, or another automated
  workflow.
- **[pg_dump and pg_restore](/docs/products/postgresql/howto/migrate-pg-dump-restore)**:
  A one-time snapshot using standard PostgreSQL tools instead of replication. Choose this
  when you don't need the source to stay in sync with Aiven after the initial copy.
- **[Bucardo](/docs/products/postgresql/howto/migrate-using-bucardo)**: The fallback for
  keeping a source continuously in sync when it can't meet the requirements for
  `aiven-db-migrate`'s logical replication method.

## Before you start

- The console and `aiven-db-migrate` both default to continuous migration using [logical
  replication](/docs/products/postgresql/howto/setup-logical-replication), which keeps
  the source database available throughout the migration. It requires either superuser
  access on the source or the [`aiven_extras`
  extension](/docs/products/postgresql/concepts/dba-tasks-pg#aiven_extras_extension).
  Without either, the migration falls back to a one-time `pg_dump` snapshot.
- Logical replication doesn't copy every object. Review the [PostgreSQL logical
  replication
  restrictions](https://www.postgresql.org/docs/current/logical-replication-restrictions.html)
  before you start, particularly around sequences and DDL changes.
- Both the console's validation step and `aiven-db-migrate`'s pre-migration checks
  confirm the target has enough disk space for the source data and runs a PostgreSQL
  version that's the same as or newer than the source, so problems surface before any
  data transfer starts.
- The console and `aiven-db-migrate` expose the same underlying setting for excluding
  data from a migration: specific databases (`ignore_dbs`) and specific database roles
  (`ignore_roles`).

<RelatedPages/>

- [Migrate PostgreSQL® databases to Aiven using the Aiven
  Console](/docs/products/postgresql/howto/migrate-db-to-aiven-via-console)
- [Migrate PostgreSQL® databases to Aiven using
  aiven-db-migrate](/docs/products/postgresql/howto/migrate-aiven-db-migrate)
- [Migrate PostgreSQL® databases to Aiven using pg_dump and
  pg_restore](/docs/products/postgresql/howto/migrate-pg-dump-restore)
