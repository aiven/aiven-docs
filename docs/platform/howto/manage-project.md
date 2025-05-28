---
title: Manage projects
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Projects help you
[organize your Aiven services](https://aiven.io/docs/platform/concepts/orgs-units-projects#projects)
and centrally configure settings for all services in the project. You can create
projects in your organization or its organizational units.

## Create a project

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1.  Click <ConsoleLabel name="Projects"/> and select **Create project**.
1.  Enter a name for the project.
1.  Select an organization or organizational unit to add the project to.
1.  Select a [billing group](/docs/platform/howto/use-billing-groups).
    The costs from all services in this project are charged to the
    payment method for this billing group.

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformSample filename='resources/aiven_project/resource.tf' />

More information on this resource and its configuration options are available in the
[Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/project).

</TabItem>
</Tabs>

## Rename a project

:::important
The project name in your DNS records will not be updated.
:::

1. Power off all services in the project.
   :::note
    Except for Aiven for Apache Kafka®, all services have backups that
    are restored when you power them back on.
   :::

1. In the project, click <ConsoleLabel name="projectsettings"/>.
1. In the **Project settings**, edit the **Project name**.
1. Click **Save changes**.

## Move a project

You can move a project to another organization or organizational unit.
Users with the organization admin or project admin
[role](/docs/platform/concepts/permissions#organization-roles-and-permissions)
can move projects within an organization.

To move a project to a different organization, you must be an
organization admin of both organizations. All users with permission to access the project
lose the permissions when you move it to a different organization unless they are
members of the target organization.

Services in the project continue running during the move.


<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1.  In the organization with the project, click **Admin**.
1.  Click <ConsoleLabel name="Projects"/> and find the project to move.
1.  Click <ConsoleIcon name="more"/> > <ConsoleLabel name="Move project"/>.
1.  Select the organization or organizational unit to move the project to.
1.  Select a **Billing group**.
1.  Click **Next** and **Finish**.

</TabItem>
<TabItem value="terraform" label="Terraform">

You can move a project to another organization or organizational unit by
[updating your `aiven_project` or `aiven_organization_project` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/guides/move-projects).

</TabItem>
</Tabs>

## Delete a project

1. Delete all the services in the project.
1. In the project, click <ConsoleLabel name="projectsettings"/>.
1. Click **Delete** and **Confirm**.
