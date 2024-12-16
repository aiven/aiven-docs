---
title: Configure ACL permissions in Aiven for Caching
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Aiven for Caching  uses [Access Control Lists (ACLs)](https://redis.io/docs/management/security/acl/) o manage the usage of commands and keys based on specific username and password combinations.
Direct use of [ACL commands](https://redis.io/commands/acl-list/) is restricted to
ensure the reliability of replication, configuration management, and disaster recovery
backups for the default user. However, you can create custom ACLs using either the
[Aiven Console](https://console.aiven.io/) or [Aiven CLI](/docs/tools/cli).

## Create user and configure ACLs

<Tabs>
<TabItem value="console" label="Console" default>

To create a user and configure ACLs using the Aiven Console:

1. Log in to [Aiven Console](https://console.aiven.io/), select your project, and
   select your Aiven for Caching service.
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
     interact with these specific keys in Aiven for Caching.
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
     --redis-acl-keys 'mykeys.*' \
     --redis-acl-commands '+get' \
     --redis-acl-categories ''
   ```

1. Test the ACL settings by connecting to the service using the new username:

   ```bash
   redis-cli \
     --user mynewuser \
     --pass ... \
     --tls \
     - h myservice-myproject.aivencloud.com \
     -p 12719

   myservice-myproject.aivencloud.com:12719> get mykeys.hello
   (nil)
   myservice-myproject.aivencloud.com:12719> set mykeys.hello world
   (error) NOPERM this user has no permissions to run the 'set' command or its subcommand
   ```

</TabItem>
</Tabs>

## User management

Manage users of your Aiven for Caching service directly from the Aiven Console.

### Reset password

1. Click **Users** from the left sidebar.
1. Find the user whose password needs to be reset and
   Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="reset password"/>.
1. Confirm the password reset by clicking **Reset** on the confirmation dialog.

### Edit ACL rules

1. Click **Users** from the left sidebar.
1. Find the user whose ACL rules require editing and
   Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="edit ACL rules"/>.
1. Make the necessary changes to the ACL rules on the **Edit access control** dialog.
1. Click **Save**.

### Duplicate user

1. Click **Users** from the left sidebar.
1. Locate the user you wish to duplicate and
   click <ConsoleLabel name="actions"/> > <ConsoleLabel name="duplicate user"/>.
1. Enter a name for the new user in the **Duplicate user** dialog.
1. Click **Add user**.

### Delete user

1. Click **Users** from the left sidebar.
1. Find the user you intend to delete and
   click <ConsoleLabel name="actions"/> > <ConsoleLabel name="delete user"/>.
1. Confirm the deletion by clicking **Delete** on the confirmation dialog.
