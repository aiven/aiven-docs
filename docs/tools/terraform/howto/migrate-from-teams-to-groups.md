---
title: Migrate from teams to groups with Terraform
sidebar_label: Migrate from teams to groups
---

Teams in Aiven are becoming groups. [Groups](/docs/platform/howto/manage-groups) are an easier way to control access to your organization's projects and services for a group of users.

:::important[Teams have been deprecated and are being migrated to groups.]

- **On DATE Z the Account Owners team will be removed.**

    The Account Owners and super admin
    are synced, so the removal of the Account Owners team will have no impact on your
    operations. [Super admin](/docs/platform/concepts/orgs-units-projects#users-and-roles)
    have full access to organizations.

- **From DATE X you won’t be able to create new teams or update existing ones.**

    To simplify the move, Aiven will also begin migrating your existing teams to groups.

- **After DATE Y, all teams will be migrated to groups and deleted.**

    To make the transition to groups smoother, you can
    migrate your teams before this date. If you choose not to migrate to groups yourself
    then you will have to [update your resources](#update-teams-resources)
    after Aiven removes your teams.
:::

## Migrate teams to groups

1.  For each team, make a note of:

    -   which users are members of the team
    -   which projects the team is assigned to
    -   the team's role for each project

1.  For each team in your organization, create a group with the same name. The following
    sample creates a group using the
    [`aiven_organization_user_group` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_user_group).

    ```hcl
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

    ```hcl
    resource "aiven_organization_user_group_member" "admin_members" {
      group_id      = aiven_organization_user_group.admin.group_id
      organization_id = data.aiven_organization.ORGANIZATION_RESOURCE_NAME.id
      user_id = "USER_ID"
    }
    ```

1.  To add each new group to the same projects that the teams are assigned to, use the
    [`aiven_organization_group_project` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_group_project):

    ```hcl
    resource "aiven_organization_group_project" "admin_project1" {
      group_id      = aiven_organization_user_group.admin.group_id
      project = aiven_project.PROJECT_RESOURCE_NAME.project
      role    = "admin"
    }
    ```

1.  After confirming all users have the correct access, delete the team resources.

## Update teams resources

After the automatic migration from teams to groups you will need to
update your Terraform files with the groups resources.

Groups created during the migration have the same name of the teams.


:::tip
Backup your Terraform state file `terraform.tfstate` to use in the case
of a rollback.
:::


The following is an example file with a team that has one member
and one project.

```hcl
terraform {
  required_providers {
    aiven = {
      source  = "aiven/aiven"
      version = ">=4.0.0, <5.0.0"
    }
  }
}

provider "aiven" {
  api_token = var.aiven_token
}

# Your account
data "aiven_account" "main" {
  name = "Example Account"
}

# Your project
data "aiven_project" "example_project" {
  project = "example-project"
}

# Team
resource "aiven_account_team" "example_team" {
  account_id = data.aiven_account.main.account_id
  name       = "Example team"
}

# Team member
resource "aiven_account_team_member" "main" {
  account_id = data.aiven_account.main.account_id
  team_id    = aiven_account_team.example_team.team_id
  user_email = "amal@example.com"
}

# Project added to the team
resource "aiven_account_team_project" "main" {
  account_id   = data.aiven_account.main.account_id
  team_id      = aiven_account_team.example_team.team_id
  project_name = data.aiven_project.example_project.project
  team_type    = "admin"
}
```

1. Replace the `aiven_account_team` resources with
   `aiven_organization_user_group`:
   ```hcl
    # The new group created from a team of the same name.
   resource "aiven_organization_user_group" "example_group" {
    description     = "Example group migrated from teams."
    organization_id = data.aiven_organization.main.id
    name            = "Example group"
    }
    ```

1. Replace the `aiven_account_team_member` resources with
    `aiven_organization_user_group_member`:
    ```hcl
    resource "aiven_organization_user_group_member" "project_admin" {
        group_id        = aiven_organization_user_group.example_group.group_id
        organization_id = data.aiven_organization.main.id
        user_id         = "u123a456b7890c"
     }
    ```

1. Replace the `aiven_account_team_project` resources with
    `aiven_organization_group_project`:
    ```hcl
    resource "aiven_organization_group_project" "example" {
        group_id = aiven_organization_user_group.example_group.group_id
        project  = data.aiven_project.example_project.project
        role     = "admin"
     }
    ```

1.  To list all resources in the state file, run:

    ```bash
    terraform console
    terraform state list
    ```

3.  Remove Terraform's control of the team resources in this list by running:

    ```
    terraform state rm TEAM_RESOURCE
    ```

    Where TEAM_RESOURCE is your resource, for example: `aiven_account_team.example_team`.

    :::tip
    Use the `-dry-run` flag to preview the changes without applying
    them.
    :::

4.  Add the group resources to Terraform by importing them:

    ```
    terraform import aiven_organization_user_group.example ORGANIZATION_ID/USER_GROUP_ID
    terraform import aiven_organization_user_group_member.project_admin ORGANIZATION_ID/USER_GROUP_ID/USER_ID
    terraform import aiven_organization_group_project.example PROJECT/USER_GROUP_ID
    ```

5.  Check that the import is going to run as you expect:

    ```
    terraform plan
    ```

6.  Apply the new configuration:

    ```
    terraform apply
    ```
