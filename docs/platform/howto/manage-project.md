---
title: Manage projects
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"

## Create a project

1.  Click **Projects** and select **Create project**.
2.  Enter a name for the project.
3.  Select an organization or organizational unit to add the project to.
4.  Select a [billing group](/docs/platform/concepts/billing-groups).
    The costs from all services in this project are charged to the
    payment method for this billing group.

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
Users with admin access to projects can move them to another
organizational unit or up a level to the organization.

To move a project to a different organization, you must be a super admin
of both organizations. All project members are removed when you
move a project to a different organization.

1.  In the organization with the project, click **Admin**.
1.  Click **Projects** and find the project to move.
1.  Click <ConsoleIcon name="more"/> > <ConsoleLabel name="Move project"/>.
1.  Select the organization or organizational unit to move the project to.
1.  Select a **Billing group**.
1.  Click **Next** and **Finish**.

## Delete a project

1. Delete all the services in the project.
1. In the project, click <ConsoleLabel name="projectsettings"/>.
1. Click **Delete** and **Confirm**.
