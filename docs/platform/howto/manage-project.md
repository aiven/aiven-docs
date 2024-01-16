---
title: Manage projects
---

## Create a project

In the [Aiven Console](https://console.aiven.io/), follow these steps to
create a new project:

1.  Click **Project** and select **Create project**.
2.  Enter a name for the project.
3.  Select an organization or organizational unit to add the project to.
4.  Select a
    [billing group](/docs/platform/concepts/billing-groups). The costs from all services within this project will be
    charted to the payment method for that billing group.

:::note
You can also
[create a project using the Aiven CLI](/docs/tools/cli/project#avn-create-update-project).
:::

## Rename a project

:::important
-   Except for Aiven for Apache Kafka®, all services have backups that
    are restored when you power them back on.
-   The project name in your DNS records will not be updated.
:::

To rename a project in the [Aiven Console](https://console.aiven.io/):

1.  Power off all services in the project.
2.  In the **Project**, click **Settings**.
3.  Edit the **Project name**.
4.  Click **Save changes**.

:::note
You can also
[rename a project using the Aiven CLI](/docs/tools/cli/project#avn-create-update-project).
:::

## Move a project

To move a project from one organizational unit to another in the [Aiven
Console](https://console.aiven.io/):

1.  Click **Admin** and select the organizational unit with the project
    you want to move.

2.  Click the actions menu for the project you want to move and select
    **Move project**.

3.  Select the organizational unit that you want to move the project to.
    You can also move the project up a level to the organization.

    :::note
    Projects cannot be moved to other organizations. They cannot be
    moved to organizational units that are in other organizations.
    :::

4.  Choose a billing group.

5.  Click **Move project**.

## Delete a project

To delete a project in the [Aiven Console](https://console.aiven.io/):

1.  Delete all of the services in the project.
2.  Click **Settings**.
3.  Click **Delete**.
4.  Click **Confirm**.

:::note
You can also
[delete a project using the Aiven CLI](/docs/tools/cli/project#avn-delete-project).
:::
