---
title: Manage Aiven for PostgreSQL® extensions
sidebar_label: Manage extensions
---

import RelatedPages from "@site/src/components/RelatedPages";

Install, update, and remove PostgreSQL® extensions on Aiven for PostgreSQL using SQL commands.

Aiven for PostgreSQL supports a curated set of extensions that you install, update, and
remove using SQL commands. By default, all database users can manage extensions,
including the default `avnadmin` user and any other database user created through the
Aiven Console, Aiven CLI, Aiven API, or Aiven Provider for Terraform. Aiven for
PostgreSQL applies an extension allowlist at the service level, so managing extensions
doesn't require elevated database privileges. On PostgreSQL 15 and later, you can
[restrict extension management to the database owner](#restrict-extension-management-to-the-database-owner).

:::tip
Instead of running SQL commands, you can also manage extensions using an AI assistant
connected to [Aiven MCP](/docs/tools/mcp-server), or using the extensions manager in
[PG Studio](/docs/products/postgresql/howto/pg-studio/#extensions).
:::

## Install an extension

To install an extension, run:

```sql
CREATE EXTENSION EXTENSION_NAME CASCADE;
```

## Update an extension

To upgrade an already-installed extension to the latest version, run:

```sql
ALTER EXTENSION EXTENSION_NAME UPDATE;
```

## Delete an extension

To delete an extension, run:

```sql
DROP EXTENSION EXTENSION_NAME;
```

## Restrict extension management to the database owner

On PostgreSQL 15 and later, you can restrict extension management in a database to the
owner of that database. Use this when your security policy requires that users without
`CREATE` privilege on a database cannot add or remove extensions in it.

This restriction is off by default and applies per database, so databases where you
don't enable it keep their existing behavior.

1. Connect to the service as `avnadmin`. For instructions, see
   [Connect to Aiven for PostgreSQL](/docs/products/postgresql/howto/list-code-samples).

1. Enable the restriction on a database:

   ```sql
   ALTER DATABASE DATABASE_NAME SET extwlist.restrict_to_database_owner = on;
   ```

1. Reconnect to the database. Database-level settings apply to new sessions only.

While the restriction applies, users other than the database owner cannot create,
update, delete, or comment on extensions in that database. The database owner can still
manage them.

To remove the restriction, run:

```sql
ALTER DATABASE DATABASE_NAME SET extwlist.restrict_to_database_owner = off;
```

:::note
Only `avnadmin` and other members of the `avnadmin_group` role can change
`extwlist.restrict_to_database_owner`. Database owners and other database users cannot
turn the restriction off, and they cannot grant that privilege to other users.
:::

## Request an extension

Aiven welcomes suggestions for additional extensions, and some extensions can be enabled
on request. For any extension that's not on the
[list of approved extensions](/docs/products/postgresql/reference/list-of-extensions),
[open a support ticket](/docs/platform/howto/support#create-a-support-ticket) and
include:

-   The extension you're requesting.
-   The database service and user database that need it.

## FAQ

-   **Do you need extra configuration before installing `pg_stat_plans` or
    `pg_stat_monitor`?** Yes. Enable the matching
    [advanced configuration](/docs/products/postgresql/reference/advanced-params)
    parameter for your service, `pg_stat_plans_enable` or `pg_stat_monitor_enable`,
    before you install either extension. Enabling either parameter applies a service
    restart.
-   **Does a maintenance update also update your extensions?** No. User schemas and
    functions often rely on specific extension versions, so Aiven for PostgreSQL doesn't
    assume that every extension is safe to upgrade automatically. To test an extension
    upgrade before applying it to your live database, fork your service and run the
    upgrade on the copy.
-   **Can you install untrusted language extensions, such as `plpythonu`?** No. Aiven
    for PostgreSQL doesn't support _untrusted_ language extensions because they would
    compromise the ability to guarantee the highest possible service level.

<RelatedPages/>

-   [Extensions on Aiven for PostgreSQL®](/docs/products/postgresql/reference/list-of-extensions)
-   [PG Studio for Aiven for PostgreSQL®](/docs/products/postgresql/howto/pg-studio/)
-   [Extension versions per PostgreSQL release](/docs/products/postgresql/reference/list-of-extensions-for-each-version)
-   [Advanced parameters for Aiven for PostgreSQL®](/docs/products/postgresql/reference/advanced-params)
-   [Support](/docs/platform/howto/support)
