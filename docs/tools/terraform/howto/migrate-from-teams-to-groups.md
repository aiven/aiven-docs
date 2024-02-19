---
title: Migrate from teams to groups with Terraform
sidebar_label: Migrate from teams to groups
---

Teams in Aiven are becoming groups. [Groups](/docs/platform/howto/manage-groups) are an easier way to control access to your organization's projects and services for a group of users.

To get started using organization groups, replace your existing teams with groups.

1.  For each team, make a note of:

    -   which users are members of the team
    -   which projects the team is assigned to
    -   the team's role for each project

1. To use the resources related to groups, set the `PROVIDER_AIVEN_ENABLE_BETA`
   environment variable to `true`.

1.  For each team in your organization, create a group with the same name. The following
    sample creates a group using the
    [`aiven_organization_user_group` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_user_group).

    ```terraform
    resource "aiven_organization_user_group" "admin" {
      organization_id = data.aiven_organization.ORGANIZATION_RESOURCE_NAME.id
      name       = "Admin user group"
      description = "Administrators"
    }
    ```

    :::note
    Users on the Account Owners team automatically become super admin with full access to
    manage the organization. You don't need to create a group for these users or manage
    this team after the migration.
    :::

1.  To add the users to the groups, use the
    [`aiven_organization_user_group_member` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_user_group_member):

    ```terraform
    resource "aiven_organization_user_group_member" "admin_members" {
      group_id      = aiven_organization_user_group.admin.group_id
      organization_id = data.aiven_organization.ORGANIZATION_RESOURCE_NAME.id
      user_id = "USER_ID"
    }
    ```

1.  To add each new group to the same projects that the teams are assigned to, use the
    [`aiven_organization_group_project` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_group_project):

    ```terraform
    resource "aiven_organization_group_project" "admin_project1" {
      group_id      = aiven_organization_user_group.admin.group_id
      project = aiven_project.PROJECT_RESOURCE_NAME.project
      role    = "admin"
    }
    ```

1.  After confirming all users have the correct access, delete the team resources.
