---
title: Manage Aiven for MySQL® service users
sidebar_label: Service users
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import UsersConcepts from "@site/static/includes/service-users-concepts.md";
import AddUser from "@site/static/includes/service-users-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

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

<RelatedPages/>

- [Create a database](/docs/products/mysql/howto/create-database)
- [Connect to your service](/docs/products/mysql/howto/list-code-samples)
- [Maintenance updates](/docs/products/mysql/howto/maintenance-updates)
