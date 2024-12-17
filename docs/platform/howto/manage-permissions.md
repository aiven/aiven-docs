---
title: Manage permissions
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/non-swizzled/ConsoleIcons"

You can grant [organization users](/docs/platform/howto/manage-org-users), [application users](/docs/platform/concepts/application-users), and [groups](/docs/platform/howto/manage-groups) access at the organization and project level through [roles and permissions](/docs/platform/concepts/permissions).

:::important
When you remove permissions from a user or group, service credentials are not changed.
Users can still directly access services if they know the service credentials. To prevent
this type of access, reset all service passwords.
:::

## Organization permissions

### Grant organization permissions to a user or group

1. In the organization, click **Admin**.

1. Click <ConsoleLabel name="orgpermissions"/>.

1. Click **Grant permissions** and select **Grant to users** or **Grant to groups**.

1. Select the users or groups, and the
   [roles and permissions](/docs/platform/concepts/permissions) to grant.

1. Click **Grant permissions**.

### Change organization permissions for a user or group

1. In the organization, click **Admin**.

1. Click <ConsoleLabel name="orgpermissions"/>.

1. For the user or group click <ConsoleLabel name="actions"/> >
   <ConsoleIcon name="edit"/> **Edit permissions**.

1. Add or remove permissions and click **Save changes**.

### Remove all organization-level roles and permissions

You can remove all organization-level permissions that you granted to a user or group.
After removing the permissions, organization users have the
[default access level](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to the organization.

To remove all organization permissions for a user or group:

1. In the organization, click **Admin**.

1. Click <ConsoleLabel name="orgpermissions"/>.

1. For the user or group click <ConsoleLabel name="actions"/> >
   <ConsoleIcon name="delete"/> **Remove**.

1. Click **Remove user** or **Remove group** to confirm.

## Project permissions

You can give users access to a specific project by granting them roles and permissions
at the project level.

### Grant project permissions to a user or group

1. In the project, click <ConsoleLabel name="projectpermissions"/>.

1. Click **Grant permissions** and select **Grant to users** or **Grant to groups**.

1. Select the users or groups to add to the project.

1. Select the [roles and permissions](/docs/platform/concepts/permissions) to grant.

1. Click **Grant permissions**.

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

1. Click **Remove user** or **Remove group** to confirm.
