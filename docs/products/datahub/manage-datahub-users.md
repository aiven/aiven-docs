---
title: Manage DataHub users
sidebar_label: Manage users
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Invite users to your DataHub service, giving them access to read or edit metadata.

For programmatic access to your DataHub service, use DataHub’s
[personal access tokens (PATs)](https://docs.datahub.com/docs/authentication/personal-access-tokens).

## Security best practices

Don’t share the Aiven for DataHub default password.
Instead, invite users to your DataHub service in the DataHub UI,
assigning only the level of access they need.

## Invite users to DataHub

1. [Log in to DataHub](/docs/products/datahub/get-started#log-in-to-datahub)
   and click **Settings**.
1. Click **Users & Groups**.
1. Click **Invite Users**.
1. Select a [role](https://docs.datahub.com/docs/authorization/roles).
1. Click **Copy**.
1. Send the link to the users.

After clicking the link, the users sign up with their email and
create a password.

## Manage user roles

The [DataHub documentation on roles](https://docs.datahub.com/docs/authorization/roles#assigning-roles)
has instructions on assigning roles to individual users, and details of the privileges
for each role.
For more fine-grained control over permissions, use [policies](https://docs.datahub.com/docs/authorization/policies).

### Assign roles to groups of users

You can also create groups of users to more easily manage user access:

1. [Log in to DataHub](/docs/products/datahub/get-started#log-in-to-datahub)
   and click **Settings**.
1. Click **Users & Groups**.
1. Click **Create group**.
1. Enter a name for the group.
1. Click **Create**.
1. Assign a [role](https://docs.datahub.com/docs/authorization/roles) to the group.
1. Click the group name.
1. On the **Members** tab, click **Add Member**.
1. Select the users to add to the group and click **Add**.

<RelatedPages/>
- [Resetting user passwords](https://docs.datahub.com/docs/authentication/guides/add-users#resetting-user-passwords)
