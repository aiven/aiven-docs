---
title: Manage permissions
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can grant [organization users](/docs/platform/howto/manage-org-users), [application users](/docs/platform/concepts/application-users), and [groups](/docs/platform/howto/manage-groups) access at the organization, organizational unit, and project level through [roles and permissions](/docs/platform/concepts/permissions).

If you don't grant any roles or permissions to an organization user, they have the
[default access level](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to the organization.

:::important
When you remove permissions from a user or group, service credentials are not changed.
Users can still directly access services if they know the service credentials. To prevent
this type of access, reset all service passwords.
:::

## Organization and organizational unit permissions

Grant permissions at the organization level for access to all
organizational units and projects in the organization.
Grant permissions at the organizational unit level to give users access to
all projects in that unit.

### Grant organization or unit permissions to a user or group

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the organization, click **Admin**.

1. Click <ConsoleLabel name="orgpermissions"/>.

1. Click **Grant permissions** and select **Grant to users** or **Grant to groups**.

1. Select the users or groups to grant permissions to.

1. In **Resource**, choose an organization or organizational unit.

1. Select the [roles and permissions](/docs/platform/concepts/permissions) to grant.

1. Click **Grant permissions**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use [the `aiven_organization_permission` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_permission)
and set the `resource_type` to `organization` or `organization_unit`.

</TabItem>
</Tabs>

### Change organization or unit permissions for a user or group

You can change the permissions granted at the organization or organizational unit level
for a user or group. In the Aiven Console, you cannot change the resource for
existing permissions. To change the resource, remove the existing permissions and
grant the permissions for the other resource.

1. In the organization, click **Admin**.

1. Click <ConsoleLabel name="orgpermissions"/>.

1. For the user or group click <ConsoleLabel name="actions"/> >
   <ConsoleIcon name="edit"/> **Edit permissions**.

1. Add or remove permissions and click **Save changes**.

### Remove all organization or unit-level roles and permissions

You can remove all permissions that you granted to a user or group at the
organization or organizational unit level.

To remove all organization and unit permissions for a user or group:

1. In the organization, click **Admin**.

1. Click <ConsoleLabel name="orgpermissions"/>.

1. For the user or group click <ConsoleLabel name="actions"/> >
   <ConsoleIcon name="delete"/> **Remove**.

### Make users super admin

The super admin role is a special role that has unrestricted access to an organization
and all its resources and settings.

You cannot make application users super admin.

:::important
This role should be limited to as few users as possible for organization setup and
emergency use. For daily administrative tasks, assign users the
[organization admin role](/docs/platform/concepts/permissions) instead.
Aiven also highly recommends enabling
[two-factor authentication](/docs/platform/howto/user-2fa) for super admin.
:::

1.  In the organization, click **Admin**.
1.  Click <ConsoleLabel name="users"/>.
1.  Find the user and click <ConsoleLabel name="actions"/> > <ConsoleLabel name="make super admin"/>.

To revoke super admin privileges for a user, follow the same steps and
select **Revoke super admin**.

## Project permissions

You can give users access to a specific project by granting them roles and permissions
at the project level.

### Grant project permissions to a user or group

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the project, click <ConsoleLabel name="projectpermissions"/>.

1. Click **Grant permissions** and select **Grant to users** or **Grant to groups**.

1. Select the users or groups to add to the project.

1. Select the [roles and permissions](/docs/platform/concepts/permissions) to grant.

1. Click **Grant permissions**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use [the `aiven_organization_permission` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_permission)
and set the `resource_type` to `project`.

</TabItem>
</Tabs>

### Change permissions for a user or group

1. In the project, click <ConsoleLabel name="projectpermissions"/>.

1. For the user or group click <ConsoleLabel name="actions"/> >
   <ConsoleIcon name="edit"/> **Edit permissions**.

1. Add or remove permissions and click **Save changes**.

### Remove all project-level roles and permissions

To remove all permissions to a project:

1. In the project, click <ConsoleLabel name="projectpermissions"/>.

1. For the user or group click <ConsoleLabel name="actions"/> >
   <ConsoleIcon name="delete"/> **Remove**.
