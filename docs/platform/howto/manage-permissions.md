---
title: Manage permissions
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"

You can give users and groups access to a project and the services in it by granting them roles and permissions for that project.

## Grant project permissions to a user or group

1. In the project, click <ConsoleLabel name="projectpermissions"/>.

1. Click **Grant permissions** and select **Grant to users** or **Grant to groups**.

1. Select the users or groups to add to the project.

1. Select the [roles and permissions](/docs/platform/concepts/permissions) to grant.

1. Click **Grant permissions**.

## Change permissions for a user or group

1. In the project, click <ConsoleLabel name="projectpermissions"/>.

1. For the user or group click <ConsoleLabel name="actions"/> >
   <ConsoleIcon name="edit"/> **Edit permissions**.

1. Add or remove permissions and click **Save changes**.

## Remove access to a project

:::important
When you remove permissions from a user or group, service credentials are not changed.
Users can still directly access services if they know the service credentials. To prevent
this type of access, reset all service passwords.
:::

To remove all permissions to a project:

1. In the project, click <ConsoleLabel name="projectpermissions"/>.

1. For the user or group click <ConsoleLabel name="actions"/> >
   <ConsoleIcon name="delete"/> **Remove**.

1. Click **Remove user** or **Remove group** to confirm.
