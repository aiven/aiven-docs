---
title: Manage application users
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"

Application users give non-human users programmatic access to Aiven.

:::info
You must be a [super admin](/docs/platform/howto/make-super-admin) to access this feature.
:::

:::important
 Application users can be a security risk if not carefully managed and monitored. Follow
 [best practices](/docs/platform/concepts/application-users#security-best-practices) for
 mitigating these risks.
:::

## Create an application user

1.  Click **Admin**.
1.  Click <ConsoleLabel name="application users"/>.
1.  Click **Create application user**.
1.  Enter a name and click **Create application user**.

## Make an application user a super admin

To create organizations, units, and projects, an application user must have the super
admin role.

:::important
The super admin role has full access to an organization, including all
organizational units, projects, services, billing, and other settings.
:::

1.  Click **Admin**.
1.  Click <ConsoleLabel name="application users"/>.
1.  Find the user and click <ConsoleLabel name="actions"/> > <ConsoleLabel name="make super admin"/>.

To revoke super admin privileges for a user, follow the same steps and
select **Revoke super admin**.

## Create a token for an application user

1.  Click **Admin**.
1.  Click <ConsoleLabel name="application users"/>.
1.  Find the user and click <ConsoleLabel name="actions"/> >
    <ConsoleLabel name="viewappuserprofile"/>.
1.  In the **Authentication tokens** section, click **Generate token**.
1.  Optional: Enter a description and session duration.
1.  Click **Generate token**.
1.  Click the **Copy** icon and save your token somewhere safe.

    :::important
    You cannot view the token after you close this window.
    :::

1.  Click **Close**.

## Revoke a token for an application user

1.  Click **Admin** > <ConsoleLabel name="application users"/>.
1.  Find the user and click <ConsoleLabel name="actions"/> >
    <ConsoleLabel name="viewappuserprofile"/>.
1.  In the **Authentication tokens** section, click <ConsoleLabel name="actions"/>.
1.  Select **Revoke**.

## Delete an application user

1.  Click **Admin** > <ConsoleLabel name="application users"/>.
1.  Find the user and click <ConsoleLabel name="actions"/> >
<ConsoleIcon name="delete"/> **Delete**.
