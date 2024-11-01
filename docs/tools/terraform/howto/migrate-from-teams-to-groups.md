---
title: Migrate from teams to groups with Terraform
sidebar_label: Migrate from teams to groups
---

Teams in Aiven are becoming groups. Groups are an easier way to control access to your organization's projects and services for a group of users.

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
  migrate your teams before this date.
:::

## Migrate teams to groups

:::important
You can't delete the Account Owners team. **Deleting all other teams in your organization
will disable the teams feature.** You won't be able to create new teams or access your
Account Owners team.
:::

1.  For each team, make a note of:

    -   which users are members of the team
    -   which projects the team is assigned to
    -   the team's role for each project

1.  For each team in your organization, create a group with the same name. The following
    sample creates a group using the
    [`aiven_organization_user_group` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_user_group).

    ```hcl
    resource "aiven_organization_user_group" "admin" {
      organization_id = data.aiven_organization.main.id
      name            = "Admin user group"
      description     = "Administrators"
    }
    ```

    :::note
    Users on the Account Owners team automatically become super admin with full access to
    manage the organization. You don't need to create a group for these users or manage
    this team after the migration.
    :::

1.  To add the users to the groups, use the
    [`aiven_organization_user_group_member` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_user_group_member):

    ```hcl
    resource "aiven_organization_user_group_member" "admin_members" {
      group_id        = aiven_organization_user_group.admin.group_id
      organization_id = data.aiven_organization.main.id
      user_id         = "u123a456b7890c"
    }
    ```

1.  To add each new group to the same projects that the teams are assigned to, use the
    [`aiven_organization_permission` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_permission):

    ```hcl
    resource "aiven_organization_permission" "project_admin" {
      organization_id = data.aiven_organization.main.id
      resource_id     = data.aiven_project.example_project.id
      resource_type   = "project"
      permissions {
        permissions = [
          "admin"
        ]
        principal_id   = aiven_organization_user_group.admin.group_id
        principal_type = "user_group"
      }
    }
    ```

1.  Preview your changes by running:

    ```bash
    terraform plan
    ```

1.  To apply the new configuration, run:

    ```bash
    terraform apply --auto-approve
    ```

1.  After confirming all users have the correct access, delete the team resources and
    apply the changes.

## Related pages

- [Aiven Provider for Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
