---
title: Create and manage teams
---

**Teams** let you create user groups and assign different access levels to specific projects.

Users must be part of an organization before being added to a team. To create and manage
teams, click **Admin** and select **Teams**.

The members of the Account Owners team are automatically made super admin. Adding other
users to this team makes them a super admin with full access to your organization,
its units, and projects. Likewise, when you make a user a super admin, they are added
to the account owners team.

:::important
**Teams are becoming groups**

Groups are an easier way to control access to your organization's
projects and services for a group of users.
[Migrate your teams to groups](#migrate_teams_to_groups).
:::

## Create a team

1.  Click **Create new team**.
1.  Enter a **Team Name**.
1.  Click **Create team**.

## Add users to a team

1.  Click the name of the team to add users to.
1.  On the **Team Members** tab, click **Invite users**.
1.  Enter the email address of the user and click **Invite users**.

The user will get an email with an invitation link.

## Add projects and roles to a team

:::important
Teams cannot be assigned to units.
:::

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

You can edit the permissions or delete the project from this team by
clicking the more options menu for the project.

## Migrate teams to groups {#migrate_teams_to_groups}

1.  In the organization, click **Admin**.

1.  On the **Teams** tab, click each team name to view it and make a note of:

    -   which users are members of the team
    -   which projects the team is assigned to
    -   the permission level that is assigned for each project

    :::note
    Users on the Account Owners team automatically become super admin with full access to
    manage the organization. You don't need to create a group for these users or manage
    this team after the migration. Instead, you can
    [make users super admin](/docs/platform/howto/make-super-admin).
    :::

1.  Click **Groups**.

1.  Click **Create group**.

1.  Enter the name of one of the teams and assign the same users to this group. Do this
    for each team.

1.  [Add each new group to the projects](/docs/platform/howto/add-groups-projects)
    that the teams are assigned to with the same role.

1.  After confirming all users have the correct level of access to the projects,
    delete the teams.
    :::note
    You cannot delete the Account Owners team.
    :::
