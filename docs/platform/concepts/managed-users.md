---
title: Managed users
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

The managed users feature lets you centrally manage your organization's users and helps you to secure your organization in Aiven.

With managed users, you can:

- Control how users log in with [authentication policies](/docs/platform/howto/set-authentication-policies),
  not just how they access the organization
- Have visibility of all users in your domain even if they weren't added to the Aiven
  organization
- Set their state, including deactivating and deleting user accounts

Managed users are also restricted from making changes to their profiles and creating new
organizations.
[Organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
can create organizations.

## Make organizations user managed users

To make your users managed users, [verify a domain](/docs/platform/howto/manage-domains).
Users in an organization with a verified domain automatically become managed users.

## View all managed users in an organization

1. Click **Admin** > **Users**.

## Deactivate a managed user

1. Click **Admin**.
1. Select **Users**.
1. Find the user and click <ConsoleLabel name="actions"/> > **Deactivate**.

You can follow the same process to reactivate the user.
