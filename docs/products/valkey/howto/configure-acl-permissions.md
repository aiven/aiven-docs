---
title: Configure ACL permissions in Aiven for Valkey™
sidebar_label: Configure ACLs
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Aiven for Valkey™ uses [access control lists (ACLs)](https://valkey.io/topics/acl/) to manage the usage of commands and keys based on specific username and password combinations.
Direct use of [ACL commands](https://valkey.io/commands/acl-list/) is restricted to
ensure the reliability of replication, configuration management, and disaster recovery
backups for the default user. However, you can create custom ACLs using either the
[Aiven Console](https://console.aiven.io/) or [Aiven CLI](/docs/tools/cli).

Aiven for Valkey™ 9.1 and later supports [database-level access control](#restrict-access-to-databases), allowing you to restrict service users to specific logical databases.

## Create user and configure ACLs

<Tabs>
<TabItem value="console" label="Console" default>

To create a user and configure ACLs using the Aiven Console:

1. Log in to [Aiven Console](https://console.aiven.io/), select your project, and
   select your Aiven for Valkey service.
1. Click **Users** from the left sidebar.
1. Click **Create user**, and provide the following details:
   - **Username:** Enter a username for the user.
   - **Categories:** Define the command categories accessible to the user.
     For example, use the prefix `+@all` or a similar convention to grant users access
     to all categories. Separate each category entry with a single space.
   - **Commands:** List the commands the user can execute, separating each command by a
     single space. For example, input `+set -get` to grant the user permission to execute
     the SET command and deny access to the GET command.
   - **Channels:** Specify the Pub/Sub channels the user can access, separating each
     with a space.
   - **Keys:** Define the keys the user can interact with. For example, specify keys
     like `user:123` or `product:456`, or `order:789` to grant the user access to
     interact with these specific keys in Aiven for Valkey.
   - **Databases** (Valkey 9.1 and later): Enter database IDs separated by spaces,
     for example, `0 3`. Leave the field empty or enter `alldbs` to allow access to all
     databases. Enter `resetdbs` to deny access to all databases.
1. Once you have defined the ACL permissions for the user, click **Save**.

</TabItem>
<TabItem value="cli" label="CLI">

To create a user and configure ACLs using the Aiven CLI:

1. Ensure the [CLI tool](/docs/tools/cli) is set up and configured.
1. Use the following command to create a user named `mynewuser` with specific ACLs:

   ```bash
   avn service user-create \
     --project myproject \
     --service myservicename \
     --username mynewuser \
     --valkey-acl-keys 'mykeys.*' \
     --valkey-acl-commands '+get' \
     --valkey-acl-categories ''
   ```

1. Test the ACL settings by connecting to the service using the new username:

   ```bash
   valkey-cli \
     --user mynewuser \
     --pass ... \
     --tls \
     -h myservice-myproject.aivencloud.com \
     -p 12719

   myservice-myproject.aivencloud.com:12719> get mykeys.hello
   (nil)
   myservice-myproject.aivencloud.com:12719> set mykeys.hello world
   (error) NOPERM this user has no permissions to run the 'set' command or its subcommand
   ```

</TabItem>
</Tabs>

## Restrict access to databases

Database-level ACLs control which logical databases a service user can access. These
restrictions work alongside existing ACL permissions for commands, categories, channels,
and keys.

By default, service users can access all databases. Existing users have access to all
databases, including after you upgrade to Valkey 9.1 or later.

You can configure database permissions when [creating a user](#create-user-and-configure-acls)
or [editing ACL rules](#edit-acl-rules) in the Aiven Console. You can also configure
them using the Aiven API.

On Valkey 9.1 and later, the **Users** page shows a **Databases** column.

### Database access values

To configure database permissions using the Aiven API, set
`access_control.valkey_acl_databases` to an array of strings. Enter each database ID as
a string, for example, `"0"`, not `0`. The API accepts the following values:

| Value                                  | Description                                          |
| -------------------------------------- | ---------------------------------------------------- |
| `[]` or omitted when creating a user   | Allow access to all databases. This is the default.  |
| `[]` when updating a user              | Remove the existing restriction and allow access to all databases. |
| `["alldbs"]`                           | Allow access to all databases. The API returns the value as you sent it and doesn't change it to `[]`. |
| `["0", "3"]`                           | Allow access only to databases 0 and 3.              |
| `["resetdbs"]`                         | Deny access to all databases.                        |

The following rules apply:

- Database IDs must be non-negative integers lower than the number of databases
  configured for the service. Standalone services have 16 databases (0 through 15) by
  default. Clustered services have one database by default, unless you configure
  `valkey_number_of_databases`. The API rejects higher IDs.
- `alldbs` and `resetdbs` must each be the only value in the list. You can't combine
  either value with database IDs.
- When updating a user, omit `valkey_acl_databases` or set it to `null` to keep the
  current database permissions. Send `[]` to remove the restriction.

### Connect as a restricted user

Database restrictions determine which logical databases a user can access. Users must
also have the required command and key permissions to perform operations in those
databases.

For example, for a user with access to databases 0 and 3:

- `SELECT 3` succeeds if the user has permission to execute the `SELECT` command.
- `SELECT 1` fails because database 1 isn't allowed.
- `FLUSHALL` fails even if the user has permission to execute the command, because it
  affects all databases.
- With `resetdbs`, the user can't select any database.

New connections start in database 0, even if the user doesn't have access to it. If a
user is restricted to another database, configure the client to select an allowed
database when connecting, or use the `SELECT` command after connecting.

For more information about database permissions and supported commands, see
[Database permissions](https://valkey.io/topics/acl/#database-permissions) in the
Valkey documentation.

### Limitations

- Database restrictions require Valkey 9.1 or later on every node of the service.
  Requests to set database restrictions fail while any node runs an earlier version,
  including during an upgrade to 9.1. Sending an empty list (`[]`) is always accepted.
- Services already running Valkey 9.1 might need the latest maintenance updates before
  you can set database restrictions. If saving database restrictions fails with a
  maintenance error, apply the available maintenance update to your service and try
  again. For more information, see
  [Service maintenance, updates and upgrades](/docs/platform/concepts/maintenance-window).
- You can't restrict database access for the default user or Aiven-managed service
  users. These users always have access to all databases.

## User management

Manage users of your Aiven for Valkey service directly from the Aiven Console.

### Reset password

1. Click **Users** from the left sidebar.
1. Find the user whose password needs to be reset and
   Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="reset password"/>.
1. Confirm the password reset by clicking **Reset** on the confirmation dialog.

### Edit ACL rules

1. Click **Users** from the left sidebar.
1. Find the user whose ACL rules require editing and
   Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="edit ACL rules"/>.
1. In the **Edit access control** dialog, update the ACL rules. On Valkey 9.1 and later,
   you can also update **Databases**, or clear it to remove the restriction.
1. Click **Save**.

### Duplicate user

1. Click **Users** from the left sidebar.
1. Locate the user you wish to duplicate and
   click <ConsoleLabel name="actions"/> > <ConsoleLabel name="duplicate user"/>.
1. Enter a name for the new user in the **Duplicate user** dialog.
1. Click **Add user**.

The new user has the same ACL rules as the original user, including database access.

### Delete user

1. Click **Users** from the left sidebar.
1. Find the user you intend to delete and
   click <ConsoleLabel name="actions"/> > <ConsoleLabel name="delete user"/>.
1. Confirm the deletion by clicking **Delete** on the confirmation dialog.
