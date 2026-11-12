---
title: Manage Aiven for MySQL® service users
sidebar_label: Service users
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import UsersConcepts from "@site/static/includes/service-users-concepts.md";
import AddUser from "@site/static/includes/service-users-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Create and manage service users in your Aiven for MySQL® service to control access to
its databases and tables.

<UsersConcepts/>

## Add a service user

<Tabs groupId="add-user">
<TabItem value="console" label="Aiven Console" default>

<AddUser sectionName="connect"/>

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the
[avn service user-create](/docs/tools/cli/service/user#avn-service-user-create) command:

```bash
avn service user-create SERVICE_NAME --username USERNAME
```

Replace the following:

- `SERVICE_NAME`: the name of your Aiven for MySQL service.
- `USERNAME`: the name of the service user to create.

</TabItem>
<TabItem value="api" label="Aiven API">

Use the
[ServiceUserCreate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUserCreate)
endpoint:

```bash
curl --request POST                                                          \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/user \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                         \
  --header 'content-type: application/json'                                  \
  --data '{"username": "USERNAME"}'
```

Replace the placeholders with your project name, service name, bearer token, and the
username to create.

To restrict the privileges granted to the new user, add the optional `mysql_grants`
field. See [Restrict privileges for a new user](#restrict-privileges-for-a-new-user).

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the
[`aiven_mysql_user` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mysql_user)
to create and manage service users.

</TabItem>
</Tabs>

## Restrict privileges for a new user

You can restrict the privileges assigned to a new Aiven for MySQL service user when you
create it with the Aiven API. By default, a service user gets admin-level privileges,
including the ability to create other users.

To restrict these privileges, set `mysql_grants` to an array containing only the
privileges to assign. Set it to an empty array to create a user with no privileges
beyond connecting to the service. Omit the field to keep the default admin-level
privileges.

```bash
curl --request POST                                                          \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/user \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                         \
  --header 'content-type: application/json'                                  \
  --data '{"username": "USERNAME", "mysql_grants": ["SELECT", "INSERT"]}'
```

Replace the placeholders with your project name, service name, bearer token, and the
username to create.

If `mysql_grants` includes `CREATE USER` or `ROLE_ADMIN`, the created user can also grant
every privilege in the list to other users, equivalent to MySQL's `WITH GRANT OPTION`.

You can set the same field in Terraform with the
[`aiven_mysql_user` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mysql_user):

<TerraformSample filename='resources/aiven_mysql_user/resource.tf' />

### Available privileges

`mysql_grants` accepts the following values:

| Privilege | Applies to |
| --- | --- |
| `ALTER` | Databases you create |
| `ALTER ROUTINE` | Databases you create |
| `CREATE` | The service and databases you create |
| `CREATE ROUTINE` | Databases you create |
| `CREATE TEMPORARY TABLES` | Databases you create |
| `CREATE USER` | The service |
| `CREATE VIEW` | Databases you create |
| `DELETE` | Databases you create |
| `DROP` | The service and databases you create |
| `EVENT` | Databases you create |
| `EXECUTE` | Databases you create |
| `INDEX` | Databases you create |
| `INSERT` | Databases you create |
| `LOCK TABLES` | Databases you create |
| `PROCESS` | The service |
| `REFERENCES` | Databases you create |
| `RELOAD` | The service |
| `REPLICATION_APPLIER` | The service |
| `REPLICATION CLIENT` | The service |
| `REPLICATION SLAVE` | The service |
| `ROLE_ADMIN` | The service |
| `SELECT` | Databases you create, and read-only access to system databases |
| `SHOW DATABASES` | The service |
| `SHOW VIEW` | Databases you create |
| `TRIGGER` | Databases you create |
| `UPDATE` | Databases you create |

For privileges that apply to databases, Aiven revokes the privilege from the service's
system databases, except `SELECT`. This keeps read access to system information on every
user without allowing changes to it.

### Requirements

Restricting privileges at user creation requires your Aiven for MySQL service to
support granular grants. If your service doesn't support this capability, requests
that include `mysql_grants` fail with an HTTP `400 Bad Request` status code. To add
support, review and apply pending
[maintenance updates](/docs/products/mysql/howto/maintenance-updates) on your service.

Granular grants depend on this service capability rather than on your service plan, so
every Aiven for MySQL plan supports them once the service has the required maintenance
update.

## Change privileges for an existing service user

You set a service user's privileges with `mysql_grants` when you create the user. To
change what an existing service user can do, create a service user with the privileges you
need, point your application at it, and delete the user you replaced:

1. Create a service user with the privileges you want. See
   [Restrict privileges for a new user](#restrict-privileges-for-a-new-user).
1. Update your application's connection details to use the new username and password. See
   [Connect to your service](/docs/products/mysql/howto/list-code-samples).
1. Verify your application works with the new user.
1. Delete the user you replaced. Run
   [avn service user-delete](/docs/tools/cli/service/user#avn-service-user-delete), or
   call the
   [ServiceUserDelete](https://api.aiven.io/doc/#tag/Service/operation/ServiceUserDelete)
   endpoint.

In Terraform, changing `mysql_grants` on an
[`aiven_mysql_user` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mysql_user)
replaces the user for you, because the field forces recreation of the resource. Plan the
change for a window where a short interruption for that user is acceptable.

:::note
Switch your application to the new user before you delete the user you replaced.
:::

## View the privileges of a service user

To see a service user's privileges, connect to your service as that user and run:

```sql
SHOW GRANTS;
```

To list the service users on your service, run
[avn service user-list](/docs/tools/cli/service/user#avn-service-user-list). The same
users are listed in [Aiven Console](https://console.aiven.io), where you
[add a service user](#add-a-service-user).

To view another user's privileges, run `SHOW GRANTS FOR 'USERNAME'@'%';`. This requires
`SELECT` on the service's system databases, which a service user has when its
`mysql_grants` include `SELECT`. Connect as `avnadmin`, or as a user that has `SELECT`,
to read another user's privileges.

## Use SQL GRANT statements

Aiven sets a service user's privileges when it creates the user, and leaves them unchanged
after that. To refine privileges further, connect as `avnadmin` with a SQL client and use
MySQL's [GRANT](https://dev.mysql.com/doc/refman/8.4/en/grant.html) and
[REVOKE](https://dev.mysql.com/doc/refman/8.4/en/revoke.html) statements.

Privileges you set this way exist only in MySQL. They are not part of the user's
`mysql_grants` value, so keep a record of them alongside the rest of your service
configuration, and reapply them if you replace the user.

## Example: separate application and migration users

A common setup is one user for everyday application traffic and a second, broader user
used only while a migration runs.

Create the application user with the privileges your application needs at runtime:

```bash
curl --request POST                                                            \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/user \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                           \
  --header 'content-type: application/json'                                    \
  --data '{"username": "app_user", "mysql_grants": ["SELECT", "INSERT", "UPDATE", "DELETE"]}'
```

Create the migration user with the privileges your migration tooling needs, such as
schema changes and temporary tables:

```bash
curl --request POST                                                            \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/user \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                           \
  --header 'content-type: application/json'                                    \
  --data '{
      "username": "migration_user",
      "mysql_grants": [
          "SELECT", "INSERT", "UPDATE", "DELETE", "CREATE", "ALTER", "INDEX",
          "DROP", "CREATE TEMPORARY TABLES", "LOCK TABLES"
      ]
  }'
```

In Terraform, declare the two users as separate resources:

```hcl
resource "aiven_mysql_user" "app_user" {
  project      = "PROJECT_NAME"
  service_name = "SERVICE_NAME"
  username     = "app_user"
  mysql_grants = ["SELECT", "INSERT", "UPDATE", "DELETE"]
}

resource "aiven_mysql_user" "migration_user" {
  project      = "PROJECT_NAME"
  service_name = "SERVICE_NAME"
  username     = "migration_user"
  mysql_grants = [
    "SELECT", "INSERT", "UPDATE", "DELETE", "CREATE", "ALTER", "INDEX", "DROP",
    "CREATE TEMPORARY TABLES", "LOCK TABLES",
  ]
}
```

Delete the migration user once the migration is complete.

The Aiven CLI creates service users with the default privileges. To set `mysql_grants`,
use the Aiven API or Terraform.

<RelatedPages/>

- [Create a database](/docs/products/mysql/howto/create-database)
- [Connect to your service](/docs/products/mysql/howto/list-code-samples)
- [Maintenance updates](/docs/products/mysql/howto/maintenance-updates)
- [Migrate to Aiven for MySQL® via CLI](/docs/products/mysql/howto/migrate-from-external-mysql)
