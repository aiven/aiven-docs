---
title: Create organizations and organizational units
sidebar_label: Create organizations and units
---

Organizations and organizational units help you group projects and apply common settings like authentication and access.

When you sign up for Aiven, an organization is
automatically created for you. You can add organizational units in your organization
to group related projects and create custom
[hierarchical organizations](/docs/platform/concepts/orgs-units-projects).

## Create an organizational unit

You can create an organizational unit within an organization to group
your projects by, for example, your departments or environments. To
create an organizational unit in the [Aiven
Console](https://console.aiven.io):

1.  In the organization, click **Admin**.
2.  In the **Organizational units** section, click **Create
    organizational unit**.
3.  Enter a name for the unit.
4.  Optional: Select any projects to assign to this
    organizational unit. You can search for projects by name.
5.  Click **Create organizational unit**.

Your organizational unit is shown in the list. Click the unit name to
view and manage its projects.

:::note
Only one level of nesting is supported. This means that organizational
units cannot be created within other units.
:::

## Create an organization

:::important
You can only verify a domain in one organization, meaning you can't set up SAML
authentication, user provisiong with SCIM, or managed users for the same domain
in another organization. Additionally, support and commitment contracts cannot
be shared across organizations.

When you create another organization you also have to manually configure all settings
for the new organization such as:
- billing groups
- authentication policies
- users and groups
- roles and permissions
:::

To create an organization in the [Aiven
Console](https://console.aiven.io):

1.  Click the user information icon in the top right and select
    **Organizations**.
1.  Click **Create organization**.
1.  Enter a name for the organization.
1.  Optional: Select any projects to assign to this
    organization. You can search for projects by name.
1.  Click **Create organization**.
