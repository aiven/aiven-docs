---
title: Manage Aiven for MySQL® service users
sidebar_label: Service users
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';
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

A new user gets admin-level privileges unless you select a narrower set. See
[Restrict privileges for a new user](#restrict-privileges-for-a-new-user).

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

To restrict the privileges granted to the new user, set the optional `mysql_grants`
argument. See [Restrict privileges for a new user](#restrict-privileges-for-a-new-user).

</TabItem>
</Tabs>

## Restrict privileges for a new user

By default, a new Aiven for MySQL service user gets admin-level privileges, including the
ability to create other users. To limit what the user can do, select its privileges when
you create it.

The Aiven Console, Aiven API, and Terraform assign privileges when the user is created.
To change the privileges of an existing user, create another user with the privileges
you need.

### Requirements

Restricting privileges at user creation requires your Aiven for MySQL service to
support granular grants. If your service doesn't support this capability, creating a user
with selected privileges fails, and the Aiven API returns an HTTP `400 Bad Request`
status code. To add support, review and apply pending
[maintenance updates](/docs/products/mysql/howto/maintenance-updates) on your service.

### Create a user with selected privileges

<Tabs groupId="restrict-privileges">
<TabItem value="console" label="Aiven Console" default>

1.  In your service, in the <ConsoleLabel name="connect"/> section, click **Users**.
1.  Click **Add service user**.
1.  Enter a name for your service user.
1.  For **Privileges**, select **Custom privileges**.
1.  For **Privileges to grant**, select the privileges to assign to the user.

    Leave the selection empty to create a user that can connect to the service but
    can't access any data.

1.  Click **Add service user**.

Selecting **Default privileges** instead keeps the admin-level privileges.

</TabItem>
<TabItem value="api" label="Aiven API">

Set `mysql_grants` to an array containing only the privileges to assign. Set it to an
empty array to create a user with no privileges beyond connecting to the service. Omit
the field to keep the default admin-level privileges.

```bash
curl --request POST                                                          \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/user \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                         \
  --header 'content-type: application/json'                                  \
  --data '{"username": "USERNAME", "mysql_grants": ["SELECT", "INSERT"]}'
```

Replace the placeholders with your project name, service name, bearer token, and the
username to create.

</TabItem>
<TabItem value="terraform" label="Terraform">

Set `mysql_grants` to the privileges to assign. Omit the argument to keep the default
admin-level privileges. Changing `mysql_grants` replaces the user.

<TerraformSample filename='resources/aiven_mysql_user/resource.tf' />

</TabItem>
</Tabs>

If the assigned privileges include `CREATE USER` or `ROLE_ADMIN`, the created user can
also grant every assigned privilege to other users, equivalent to MySQL's
`WITH GRANT OPTION`.

### Available privileges

You can assign the following privileges:

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

<RelatedPages/>

- [Create a database](/docs/products/mysql/howto/create-database)
- [Connect to your service](/docs/products/mysql/howto/list-code-samples)
- [Maintenance updates](/docs/products/mysql/howto/maintenance-updates)
