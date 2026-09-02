---
title: User and schema management in Aiven for PostgreSQL®
sidebar_label: User and schema
---

import RelatedPages from "@site/src/components/RelatedPages";

Perform DBA tasks and manage schema ownership and access for your Aiven for PostgreSQL® service.

## `aiven_extras` closes part of the superuser gap

Aiven doesn't grant [superuser
access](/docs/products/postgresql/concepts/dba-tasks-pg) on Aiven for PostgreSQL®
services. The `aiven_extras` extension closes part of that gap, but only for
specific tasks. Claiming ownership of the `public` schema needs it, while setting up
read-only access to databases or tables doesn't.

## Before you start

- [Claiming the `public`
  schema](/docs/products/postgresql/howto/claim-public-schema-ownership) requires
  `aiven_extras`, because that schema starts out owned by an internal `postgres`
  user, not `avnadmin`.
- [Restricting access](/docs/products/postgresql/howto/readonly-user) to databases or
  tables with read-only roles doesn't require the extension. You can set it up with
  standard `GRANT` and `REVOKE` statements.

<RelatedPages/>

- [Perform DBA-type tasks in Aiven for
  PostgreSQL®](/docs/products/postgresql/concepts/dba-tasks-pg)
- [Claim public schema
  ownership](/docs/products/postgresql/howto/claim-public-schema-ownership)
- [Restrict access to databases or tables in Aiven for
  PostgreSQL®](/docs/products/postgresql/howto/readonly-user)
