---
title: Manage application users
---

import ActionsIcon from "@site/static/images/icons/more.svg";

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
1.  Click **Application users**.
1.  Click **Create application user**.
1.  Enter a name and click **Create application user**.

## Create a token for an application user

1.  Click **Admin**.
1.  Click **Application users**.
1.  Find the user and click
    <ActionsIcon className="icon"/> **Actions** > **View profile**.
1.  In the **Authentication tokens** section, click **Generate token**.
1.  Optional: Enter a description and session duration.
1.  Click **Generate token**.
1.  Click the **Copy** icon and save your token somewhere safe.

    :::important
    You cannot view the token after you close this window.
    :::

1.  Click **Close**.

## Revoke a token for an application user

1.  Click **Admin** > **Application users**.
1.  Find the user, click <ActionsIcon className="icon"/> **Actions** > **View profile**.
1.  In the **Authentication tokens** section, click **Actions** > **Revoke**.

## Delete an application user

1.  Click **Admin** > **Application users**.
1.  Find the user and click <ActionsIcon className="icon"/> **Actions** > **Delete**.
