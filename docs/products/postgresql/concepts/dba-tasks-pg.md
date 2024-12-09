---
title: Perform DBA-type tasks in Aiven for PostgreSQL®
sidebar_label: DBA-type tasks
---

Aiven doesn't allow superuser access to Aiven for PostgreSQL® services. However, most DBA-type actions are still available through other methods.

## `avnadmin` user privileges

By default, in every PostgreSQL instance, an `avnadmin` database user is
created, with permissions to perform most of the usual DB management
operations. It can manage:

-   Databases (`CREATE DATABASE`, `DROP DATABASE`)
-   Database users (`CREATE USER/ROLE`, `DROP USER/ROLE`)
-   Extensions (`CREATE EXTENSION`), you can also view the
    [list of available extensions](/docs/products/postgresql/reference/list-of-extensions)
-   Access permissions (`GRANT`, `REVOKE`)
-   Logical replication with the `REPLICATION` privilege

:::tip
You can also manage databases and users in the Aiven Console or
though our [REST API](/docs/tools/api).
:::

## `aiven_extras` extension {#aiven_extras_extension}

The `aiven_extras` extension, developed and maintained by Aiven, enables
the `avnadmin` to perform superuser-like functionalities like:

-   Manage
    [subscriptions](https://www.postgresql.org/docs/current/catalog-pg-subscription.html)
-   Manage `auto_explain`
    [functionality](https://www.postgresql.org/docs/current/auto-explain.html)
-   Manage
    [publications](https://www.postgresql.org/docs/current/sql-createpublication.html)
-   [Claim public schema ownership](/docs/products/postgresql/howto/claim-public-schema-ownership)

You can install the `aiven_extras` extension executing the following
command with the `avnadmin` user:

```sql
CREATE EXTENSION aiven_extras CASCADE;
```

For more information about `aiven_extras` check the [GitHub
repository](https://github.com/aiven/aiven-extras) for the project.
