---
title: Create and manage teams
---

**Teams** let you create user groups and assign different access levels
to specific projects. Users must be part of an organization before being
added to a team. To create and manage teams, click **Admin** and then
select **Teams**.

:::important
**Teams are becoming groups**

Groups are an easier way to control access to your organization\'s
projects and services for a group of users. See
[Migrate teams to groups](#migrate_teams_to_groups).
:::

## Create a new team

1.  Click **Create new team**.
2.  Enter a **Team Name**.
3.  Click **Create team**.

## Add users to a team

1.  Click the name of the team that you want to add users to.
2.  On the **Team Members** tab, click **Invite users**.
3.  Enter the email address of the user and click **Invite users**.

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
2.  Click **Add projects**.
3.  Select a **Project Name** and **Permission Level**.
4.  Click **Add project to team**.

You can edit the permissions or delete the project from this team by
clicking the more options menu for the project.

## Migrate teams to groups {#migrate_teams_to_groups}

To get started using organization groups, replace your existing teams
with groups:

1.  In the organization, click **Admin**

2.  Click **Organization** and on the **Teams** tab view each team to
    make a note of:

    -   which users are members of the team
    -   which projects the team is assigned to
    -   the permission level that is assigned for each project

3.  Click **Groups** and then **Create group**.

4.  Enter the name of one of the teams and assign the same users to this
    group. Do this for each of your organization\'s teams.

5.  [Add each new group to the same projects](/docs/platform/howto/add-groups-projects) that the teams are assigned to. Set the role to the same
    permission level that is used for the team.

    :::important
    Users on the account owners team automatically become super admin.
    To give them the same permission level, after deleting the account
    owners team
    [make them super admin](/docs/platform/howto/make-super-admin).
    :::

6.  After confirming all users have the correct access, delete the
    teams.
