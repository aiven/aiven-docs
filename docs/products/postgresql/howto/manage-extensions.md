---
title: Manage Aiven for PostgreSQL® extensions
sidebar_label: Manage extensions
---

import RelatedPages from "@site/src/components/RelatedPages";

Install, update, and remove PostgreSQL® extensions on Aiven for PostgreSQL using SQL commands.

Aiven for PostgreSQL supports a curated set of extensions that you install, update, and
remove using SQL commands. All database users can manage extensions, including the
default `avnadmin` user and any other database user created through the Aiven Console,
Aiven CLI, Aiven API, or Aiven Provider for Terraform. Aiven for PostgreSQL applies an
extension allowlist at the service level, so managing extensions doesn't require
elevated database privileges.

:::tip
Instead of running SQL commands, you can also manage extensions using an AI assistant
connected to [Aiven MCP](/docs/tools/mcp-server), or using the extension manager in the
Aiven Console.
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
-   [Extension versions per PostgreSQL release](/docs/products/postgresql/reference/list-of-extensions-for-each-version)
-   [Advanced parameters for Aiven for PostgreSQL®](/docs/products/postgresql/reference/advanced-params)
-   [Support](/docs/platform/howto/support)
