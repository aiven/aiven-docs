---
title: Super admin
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

The super admin role is a special role that has unrestricted access to an organization and all of its resources.

:::important
This role should be limited to as few users as possible for organization setup and emergency use. For daily administrative tasks, assign users the [organization admin role](/docs/platform/concepts/permissions) instead. Aiven also highly recommends enabling [two-factor authentication](/docs/platform/howto/user-2fa) for super admin.
:::

To make a user a super admin:

1.  In the organization, click **Admin**.
1.  Click <ConsoleLabel name="users"/>.
1.  Find the user and click <ConsoleLabel name="actions"/> > <ConsoleLabel name="make super admin"/>.

To revoke super admin privileges for a user, follow the same steps and
select **Revoke super admin**.
