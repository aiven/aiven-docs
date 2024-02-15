---
title: Manage application users
limited: true
---

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
1.  Find the user and open the **Actions** menu.
1.  Select **View profile**.
1.  In the **Authentication tokens** section, click **Generate token**.
1.  (Optional) Enter a description and session duration.
1.  Click **Generate token**.
1.  Click the **Copy** icon and save your token somewhere safe.

    :::important
    You cannot view the token after you close this window.
    :::

1.  Click **Close**.

## Revoke a token for an application user

1.  Click **Admin**.
1.  Click **Application users**.
1.  Find the user, open the **Actions** menu and select **View profile**.
1.  In the **Authentication tokens** section, open the **Actions** menu.
1.  Select **Revoke** and confirm that you want to revoke the token.

## Delete an application user

1.  Click **Admin**.
1.  Click **Application users**.
1.  Find the user and open the **Actions** menu.
1.  Click **Delete**.
