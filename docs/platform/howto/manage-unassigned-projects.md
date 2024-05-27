---
title: Manage unassigned projects
---

An unassigned project is a project that isn't assigned to an organization or organizational unit. Projects that are part of an organization or unit are easier to maintain as common settings, like authentication, are centrally managed at the organization level. These projects also get the latest feature updates.

Learn more about
[organizations, organizational units, and projects](/docs/platform/concepts/orgs-units-projects).

## Manage unassigned projects in Aiven Console

### Assign projects to an organization or unit

:::note
If you don't have an organization,
[create one](/docs/platform/howto/manage-unassigned-projects#create-org).
:::

To assign standalone projects to an organization or unit in the [Aiven
Console](https://console.aiven.io/):

1. Click **Projects**.
1. Click **View unassigned projects** to list all projects unassigned
   to an organization or organizational unit.
   <!-- vale off -->
   :::note
   If you don't
   see **View unassigned projects** in the dropdown menu, you
   don't have any unassigned projects.
   :::
   <!-- vale on -->

1. On the **Unassigned projects** page, click **Assign project** for a
   project to assign.
1. Add any other projects to assign to the same
   organization or unit.
1. Select the organization or organizational unit.
1. Click **Assign projects**.

### Create an organization {#create-org}

Projects must be assigned to organizations or units. We recommend using
only one organization and creating organizational units to group your
projects.

To create an organization:

<!-- vale off -->

1. At the top-right side, click **Create organization**.

1. Enter a name for the organization.

1. Select the projects to assign to this organization.
   You can search for projects by name.

1. To invite admin users to the organization, set the
   toggle to **Yes** and enter their email addresses. They will receive
   an email to join the organization.

   :::important
   When admin users accept the invitation, they have full control over
   the organization and the projects assigned to it.
   :::

1. Click **Create organization**.

<!-- vale on -->

The **Admin** page opens, where you can add organizational units, and
manage users, groups, and other settings.

## Manage unassigned projects with the API

### List unassigned projects

To list the names of all unassigned projects use the following:

```bash
curl -sXGET \
 https://api.aiven.io/v1/project \
 -H "Authorization: Bearer TOKEN" | jq -r '.projects[] | select(.account_id==null) | .project_name'
```

### Assign standalone projects to an organization or unit programmatically {#assign-proj-api}

:::note
If you don't have an organization,
[create an organization](/docs/platform/howto/manage-unassigned-projects#create-org-api)
first and assign your projects to it.
:::

To assign a standalone project to an organization or unit use the
following call:

```bash
curl -sXPUT \
  https://api.aiven.io/v1/project/PROJECT_NAME \
  -H "Authorization: Bearer TOKEN" \
  -H 'content-type: application/json' \
  --data-raw '{"account_id":"ACCOUNT_ID","add_account_owners_admin_access":true}'
```

Where:

- `ACCOUNT_ID` is the ID of the organization or unit.
- `PROJECT_NAME` is the name of the project to assign.

### Create an organization programmatically {#create-org-api}

To create an organization use the following call:

```bash
curl -sXPOST \
 https://api.aiven.io/v1/account \
 -H "Authorization: Bearer TOKEN" \
 -H 'content-type: application/json' \
 --data '{"account_name":"ORG_NAME"}' | jq
```

Where:

- `ORG_NAME` is the name of your new organization.
