---
title: Manage application users
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/non-swizzled/ConsoleIcons"

Application users give non-human users programmatic access to Aiven.

You must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to access this feature.


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

## Make an application user an organization admin

To allow an application user to create organizations, units, and projects, you
[grant them the organization admin role](/docs/platform/howto/manage-permissions).

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
