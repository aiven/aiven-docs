---
title: Manage Aiven for ClickHouse® users and roles
sidebar_label: Manage users and roles
---

Create Aiven for ClickHouse® users and roles and grant them specific privileges to efficiently control or restrict access to your service.

## Add a user

To create a user account for your service,

1.  Log in to the [Aiven Console](https://console.aiven.io/), and
    select your Aiven for ClickHouse® service.

1.  Click **Users and roles** in the sidebar.

    This shows a list of all users that are currently
    available in your service. The default `avnadmin` user has all
    available access grants to the service.

    :::tip
    To view the roles and grants for any of the listed users, select
    **View details & grants** for that user.
    :::

1.  In the **Users and roles** page, select **Add user**.

1.  In the **Create a service user** window, enter a name for the
    new user and select a role.

    The role that you select defines the access grants that are assigned
    to the user. For more information on roles, see
    [Manage roles and privileges](/docs/products/clickhouse/howto/manage-users-roles#manage-roles-and-privileges).

1.  Select **Add user**.

    This creates the new user and shows you a summary of the
    information.

1.  Copy the password on screen to a safe place. It can't be accessed
    again in future, however it can be reset if needed.

## Manage roles and privileges

Aiven for ClickHouse has no predefined roles. All roles you create are custom roles you
design for your purposes by granting specific privileges to particular roles.
For example: you can create a role that allows only reading a single database, table, or
column; or you can create another role that allows only inserting data, not deleting it.

ClickHouse® supports a **Role Based Access Control** model and allows
you to configure access privileges by using SQL statements. You can
either [use the query editor](query-databases) or rely on
[the command-line interface](connect-with-clickhouse-cli).

The upstream ClickHouse documentation includes
[detailed documentation for access rights](https://clickhouse.com/docs/en/operations/access-rights/).

### Create a role

To create a role named **auditor**, run the following command:

```sql
CREATE ROLE auditor;
```

Find more information on creating roles in the
[upstream ClickHouse documentation](https://clickhouse.com/docs/en/sql-reference/statements/create/role/).

### Grant privileges

You can grant privileges both to specific roles and to individual
users. The grants can be also granular, targeting specific databases,
tables, columns, or rows.

:::important
You cannot grant additional privileges to the main service user. Aiven may grant privileges
to the main service user during maintenance updates when adding new features for the service.
:::

As an example, the following request grants the `auditor` role privileges
to select data from the `transactions` database:

```sql
GRANT SELECT ON transactions.* TO auditor;
```

You can limit the grant to a specified table:

```sql
GRANT SELECT ON transactions.expenses TO auditor;
```

Or to particular columns of a table:

```sql
GRANT SELECT(date,description,amount) ON transactions.expenses TO auditor
```

To grant the `auditor` and `external` roles to several users, run:

```sql
GRANT auditor, external TO Mary.Anderson, James.Miller;
```

To allow the creation of new users:

```sql
GRANT CREATE USER ON transactions.* TO administrator
```

There are a variety of privileges that you can grant. Find the full list in the
[upstream ClickHouse documentation](https://clickhouse.com/docs/en/sql-reference/statements/grant/#privileges).

:::note
You can grant privileges to a table that does not yet exist.
:::

:::note
Users can grant privileges according to their privileges. If the user
lacks the required privileges for a requested operation, they receive a
`Not enough privileges` exception.
:::

:::warning
Privileges are not revoked when a table or database is removed. They
continue to be active for any new table or database that is created with
the same name.
:::

Find all details on how the GRANT statement is supported in ClickHouse
in the
[upstream ClickHouse documentation](https://clickhouse.com/docs/en/sql-reference/statements/grant/).

### Set roles

A single user can be assigned different roles, either individually or
simultaneously.

```sql
SET ROLE auditor;
```

You can also specify a role to be activated by default when the user
logs in:

```sql
SET DEFAULT ROLE auditor, external TO Mary.Anderson, James.Miller;
```

### Delete a role

If you no longer need a role, you can remove it:

```sql
DROP ROLE auditor;
```

### Revoke privileges

Remove all or specific privileges from users or roles:

```sql
REVOKE SELECT ON transactions.expenses FROM Mary.Anderson;
```

Revoke all privileges to a table or database simultaneously:

```sql
REVOKE ALL PRIVILEGES ON database.table FROM external;
```

See the ClickHouse documentation [for more information on revoking
privileges](https://clickhouse.com/docs/en/sql-reference/statements/revoke/).

### Check privileges

Run the following commands to see all available grants, users, and
roles:

```sql
SHOW GRANTS;
```

```sql
SHOW USERS;
```

```sql
SHOW ROLES;
```

### Preview users and roles in the console

You can also see the users, their roles, and privileges in the [Aiven
Console](https://console.aiven.io/).

1.  Log in to the [Aiven Console](https://console.aiven.io/), and
    select your Aiven for ClickHouse® service.
1.  Click **Users and roles** in the sidebar.
1.  Click **View details & grants** next to one of the user listed on the page.
    This shows you a list of all grants for the selected user.

## Manage using Terraform

You can also manage user roles and access using the
[Aiven Provider for Terraform](/docs/tools/terraform).
Try Aiven Terraform Provider Cookbook recipe
[Manage user privileges for Aiven for ClickHouse® services using Terraform](https://aiven.io/developer/manage-user-privileges-clickhouse-terraform).
