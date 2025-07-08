---
title: Create organizations and organizational units
sidebar_label: Create organizations and units
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Organizations and organizational units help you group projects and apply common settings like authentication and access.

When you sign up for Aiven, an organization is automatically created for you.
You can add organizational units in your organization to group related projects
and create custom
[hierarchical organizations](/docs/platform/concepts/orgs-units-projects).

## Create an organizational unit

You can create an organizational unit within an organization to group
your projects by, for example, your departments or environments. Only one level of
nesting is supported. This means that you can't create organizational units
within other units.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1.  In the organization, click <ConsoleLabel name="userinformation"/> > **Admin**.
1.  In the **Organizational units** section, click **Create organizational unit**.
1.  Enter a name for the unit.
1.  Click **Create organizational unit**.

</TabItem>

<TabItem value="terraform" label="Terraform">

<TerraformSample filename='resources/aiven_organizational_unit/resource.tf' />

More information on this resource and its configuration options
are available in the
[Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organizational_unit).

</TabItem>
</Tabs>

## Create an organization

:::important
You can only verify a domain in one organization, meaning you can't set up SAML
authentication, user provisioning with SCIM, or managed users for the same domain
in another organization. Additionally, support and commitment contracts cannot
be shared across organizations.

When you create another organization you also have to manually configure all settings
for the new organization such as:
- billing groups
- authentication policies
- users and groups
- roles and permissions
:::

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

:::note
You cannot create an organization while logged in with
an [identity provider](/docs/platform/howto/list-identity-providers). To create an
organization, log in to the Aiven Console using another authentication method.
:::  

1.  Click <ConsoleLabel name="userinformation"/> > <ConsoleLabel name="organizations"/>.
1.  Click **Create organization**.
1.  Enter a name for the organization.
1.  Optional: Select any projects to assign to this
    organization. You can search for projects by name.
1.  Click **Create organization**.

</TabItem>
<TabItem value="terraform" label="Terraform">

:::note
You cannot create an organization with a token that you created when you were logged in
using an [identity provider](/docs/platform/howto/list-identity-providers).
:::

<TerraformSample filename='resources/aiven_organization/resource.tf' />

More information on this resource and its configuration options are
available in the
[Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization).

</TabItem>
</Tabs>
