---
title: Manage users in an organization
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Adding users to your organization lets you give them access to specific projects and services within that organization.

:::important
If you're using an identity provider (IdP), always add or remove users directly
through the IdP. This ensures the IdP is the authoritative source for user management,
preventing conflicts and simplifying administration.
:::

## Invite users to an organization

To add users to your organization, send them an invite:

1.  Click **Admin** > **Users**.
1.  Click **Invite users**.
1.  Enter the email addresses of the people to invite.
1.  Click **Invite users**.

The users receive an email with instructions to sign up (for new users)
and accept the invite.

## Remove users from an organization

If you remove a user from an organization, they will also be removed
from all groups and projects and no longer have access to any resources
in the organization.

To remove a user from an organization:

1.  Click **Admin** > **Users**.
1.  Find the user to remove and click
    <ConsoleLabel name="actions"/> > **Remove** and confirm.

## Resend an invite

To resend an invite to a user:

1.  Click **Admin** > **Users**.
1.  Find the email address to resend an invite to and click
    <ConsoleLabel name="actions"/> > **Resend invite**.

They receive a new email with instructions for signing up or accepting the
invite.
