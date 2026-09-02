---
title: User and schema management in Aiven for PostgreSQL®
sidebar_label: User and schema
---

import RelatedPages from "@site/src/components/RelatedPages";

Perform DBA tasks and manage schema ownership and access for your Aiven for PostgreSQL® service.

## What `avnadmin` can and can't do

Aiven doesn't grant superuser access to Aiven for PostgreSQL® services, but the
default `avnadmin` user can still manage databases, database users, extensions, and
access permissions. The `aiven_extras` extension extends `avnadmin` with a few
superuser-like abilities, including managing subscriptions, publications, and
`auto_explain`, and claiming ownership of the `public` schema.

## Before you start

- An internal `postgres` user, not `avnadmin`, owns the `public` schema until you
  claim ownership with `aiven_extras`. Claim it before you plan to alter objects in
  that schema.
- Restricting access to databases or tables with read-only roles doesn't require the
  `aiven_extras` extension. You can set it up with standard `GRANT` and `REVOKE`
  statements.

<RelatedPages/>

- [Perform DBA-type tasks in Aiven for
  PostgreSQL®](/docs/products/postgresql/concepts/dba-tasks-pg)
- [Claim public schema
  ownership](/docs/products/postgresql/howto/claim-public-schema-ownership)
- [Restrict access to databases or tables in Aiven for
  PostgreSQL®](/docs/products/postgresql/howto/readonly-user)
