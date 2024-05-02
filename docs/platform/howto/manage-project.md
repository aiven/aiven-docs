---
title: Manage projects
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

## Create a project

In the [Aiven Console](https://console.aiven.io/), follow these steps to
create a project:

1.  Click **Project** and select **Create project**.
2.  Enter a name for the project.
3.  Select an organization or organizational unit to add the project to.
4.  Select a
    [billing group](/docs/platform/concepts/billing-groups). The costs from all services within this project will be
    charted to the payment method for that billing group.

## Rename a project

:::important

- Except for Aiven for Apache Kafka®, all services have backups that
  are restored when you power them back on.
- The project name in your DNS records will not be updated.

:::

To rename a project in the [Aiven Console](https://console.aiven.io/):

1. Power off all services in the project.
1. In the **Project**, click **Settings**.
1. Edit the **Project name**.
1. Click **Save changes**.

## Move a project

To move a project from one organizational unit to another in the [Aiven
Console](https://console.aiven.io/):

1.  Click **Admin** and select the organizational unit with the project
    to move.

1.  In the project to be moved, click <ConsoleLabel name="actions"/> > **Move project**.

1.  Select the organizational unit to move the project to.
    You can also move the project up a level to the organization.

    :::note
    Projects cannot be moved to other organizations. They cannot be
    moved to organizational units that are in other organizations.
    :::

1.  Choose a billing group.

1.  Click **Move project**.

## Delete a project

To delete a project in the [Aiven Console](https://console.aiven.io/):

1. Delete all the services in the project.
1. Click **Settings** > **Delete** > **Confirm**.
