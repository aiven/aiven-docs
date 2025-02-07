---
title: Manage teams
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Teams are groups of users that you can assign to projects.

:::important
**Teams have been deprecated and are being migrated to groups.**

- **On September 30, 2024 the Account Owners team will be removed.**

  The Account Owners and super admin are synced, so the removal of the
  Account Owners team will have no impact on existing permissions.
  Super admin have full access to organizations.

- **From November 4, 2024 you won't be able to create new teams or update existing ones.**

  To simplify the move, Aiven will also begin migrating your existing teams to groups.

- **On December 2, 2024 all teams will be migrated to groups and deleted.**

  To make the transition to groups smoother, you can
  [migrate your teams](#migrate-teams-to-groups) yourself.
:::

## Create a team

1.  In the organization, click **Admin**.
1.  Click **Teams**.
1.  Click **Create new team**.
1.  Enter a **Team Name**.
1.  Click **Create team**.

## Add users to a team

Users must be part of an organization before being added to a team.

1.  In the organization, click **Admin**.
1.  Click **Teams**.
1.  Click the name of the team to add users to.
1.  On the **Team Members** tab, click **Invite users**.
1.  Enter the email address of the user and click **Invite users**.

The user will get an email with an invitation link.

## Add projects and roles to a team

For each team you can specify which projects they can access and the
level of permissions:

-   **Admin:** Full access to the project, including inviting other
    users and modifying billing information.
-   **Developer:** Make changes to services that do not affect billing.
-   **Operator:** Full access to services, except billing information
    and project members.
-   **Read only:** View services only.

To add projects and roles to a team:

1.  Click the name of the team and select the **Projects and Roles**
    tab.
1.  Click **Add projects**.
1.  Select a **Project Name** and **Permission Level**.
1.  Click **Add project to team**.

## Migrate teams to groups

:::important
You can't delete the Account Owners team. **Deleting all other teams in your organization
will disable the teams feature.** You won't be able to create new teams or access your
Account Owners team.
:::

1.  In the organization, click **Admin**.

1.  On the **Teams** tab, click each team name to view it and make a note of:

    -   which users are members of the team
    -   which projects the team is assigned to
    -   the permission level that is assigned for each project

    :::note
    Users on the Account Owners team are automatically made super admin
    with full access to manage the organization. You don't need to create a
    group for these users.

    If you create a group named Account Owners, users you add to that group won't
    automatically become super admin. Instead, you can
    [make them super admin](/docs/platform/howto/make-super-admin).
    :::

1.  Click **Groups**.

1.  Click **Create group**.

1.  Enter the name of one of the teams and assign the same users to this group. Do this
    for each team.

1.  [Add each new group to the projects](/docs/platform/howto/manage-permissions)
    that the teams are assigned to with the same role.

1.  After confirming all users have the correct level of access to the projects,
    delete the teams.
    :::note
    You cannot delete the Account Owners team.
    :::
