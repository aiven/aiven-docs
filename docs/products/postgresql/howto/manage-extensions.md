---
title: Manage Aiven for PostgreSQL® extensions
sidebar_label: Manage extensions
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleIcon from "@site/src/components/ConsoleIcons";

Install, update, and remove PostgreSQL® extensions on Aiven for PostgreSQL using SQL commands.

Aiven for PostgreSQL supports a curated set of extensions that you install, update, and
remove using SQL commands. All database users can manage extensions, including the
default `avnadmin` user and any other database user created through the Aiven Console,
Aiven CLI, Aiven API, or Aiven Provider for Terraform. Aiven for PostgreSQL applies an
extension allowlist at the service level, so managing extensions doesn't require
elevated database privileges.

:::tip
Instead of running SQL commands, you can also manage extensions using an AI assistant
connected to [Aiven MCP](/docs/tools/mcp-server), or
[using the extensions manager in the Aiven Console](#manage-extensions-in-the-aiven-console).
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

## Manage extensions in the Aiven Console

The extensions manager is part of
[PG Studio](/docs/products/postgresql/howto/pg-studio/). It runs the same SQL commands for
you, in the database you select.

### Prerequisites

- The `service:data:write` and `service:secrets:read` permissions at the organization,
  unit, or project level. These permissions are included in the **Admin**, **Developer**,
  and **Operator** roles.
- Your IP address in the
  [service's IP filter configuration](/docs/platform/howto/restrict-access).
- PG Studio turned on for your organization, which is the default. See
  [Manage PG Studio and AI features](/docs/products/postgresql/howto/pg-studio/security-connections#manage-pg-studio-and-ai-features).

### View extensions

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for PostgreSQL
   service.
1. In the left-hand menu, click <ConsoleIcon name="pgextensions"/>.
1. Select a database.

The list shows the extensions you can enable in that database, with the installed version,
schema, and description of each. An **Update available** label marks installed extensions
that have a newer version. To find an extension, search by its name.

### Enable an extension

1. Turn on the extension.
1. In **Schema**, select the schema to create the extension in. The default is `public`.
   Some extensions can only be created in a specific schema, and some can't be moved to
   another schema after you create them.
1. Click **Enable**.

### Update an installed extension

1. Next to the extension, click **Update**.
1. Click **Update** to confirm.

### Disable an extension

1. Turn off the extension.
1. Optional: Select **Drop the objects that depend on the extension** to also drop the
   tables, indexes, functions, and other objects that depend on it. If you don't select
   it, disabling fails while any of those objects exist.
1. Click **Disable**.

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
