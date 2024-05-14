---
title: Enable your AWS custom cloud in Aiven organizations, units, or projects
sidebar_label: Attach projects
---

Configure the availability of your [custom cloud](/docs/platform/concepts/byoc) to access
it in all the projects, selected organizational units, or specific projects only.

## About making custom clouds available from your projects

With the BYOC feature enabled, you can
[create custom clouds](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
organization. As a part of the
[initial custom cloud's setup in the Aiven Console](/docs/platform/howto/byoc/create-custom-cloud),
you select in what projects you'll be able to use your new custom cloud to host Aiven
services. Later, you can come back to the **Available projects** tab in your
cloud's page in [Aiven Console](https://console.aiven.io/) and update
the settings you configured during the
[initial custom cloud's setup](/docs/platform/howto/byoc/create-custom-cloud).

1.  In the **Custom cloud's availability in your organization**
    section, select either:
    -   **By default for all projects** to make your custom cloud
        available in all existing and future projects in the
        organization, or;
    -   **By selection** to pick specific projects or organizational
        units where you want your custom cloud to be available.
1.  If you go for the **By selection** option, the **Assign
    organizational units** field and the **Assign projects** field show
    up. Enter the names of organizational units and/ or projects in
    which to be able to use your custom cloud.

## Prerequisites

-   Administrator's role for your Aiven organization
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization
-   Access to [Aiven Console](https://console.aiven.io/)

## Enable projects to use your custom cloud

1.  Log in to [Aiven Console](https://console.aiven.io/) as an
    administrator.

1.  Select the organization to use from the menu in
    the top right corner.

1.  From the top navigation bar, select **Admin**.

1.  From the left sidebar, select **Bring your own cloud**.

1.  In the **Bring your own cloud** view, select one of the clouds
    available on the list.

1.  In the selected cloud's page, go to the **Available
    projects** tab and modify the settings provided as needed:

    -   Select **Set availability** to decide if your custom cloud is
        available in all the projects in your organization or in
        selected projects only. In the **Custom cloud's availability in
        your organization** window, select either **By default for all
        projects** or **By selection**. If you go for the **By
        selection** option, dropdown menus **Assign organizational
        units** and **Assign projects** show up. Use them to select
        desired organizational units and/ or projects and confirm your
        choice by selecting **Save**.

    :::note
    By selecting an organizational unit, you make your custom cloud
    available from all the projects in this unit.
    :::

    -   Select **Assign projects** to enable your custom cloud in
        specific organizational units and/ or projects. In the **Assign
        projects** window, use the available dropdown menus to select
        desired units and/ or projects as needed. Confirm your choice by
        selecting **Assign projects**.

As a result, in the projects and/or organizational units for which you enable your
custom cloud, you can:

- Create new services in the custom cloud
- Migrate existing services to your custom cloud if your service and networking
  configuration allows it. For more information, contact the
  [sales team](mailto:sales@aiven.io).

## Verify the update

To verify if the cloud availability changes you made are live:

1.  Log in to [Aiven Console](https://console.aiven.io/) as an
    administrator.
1.  Select the organization you want to use from the dropdown menu in
    the top right corner.
1.  From the top navigation bar, select **Admin**.
1.  From the left sidebar, select **Bring your own cloud**.
1.  In the **Bring your own cloud** view, select one of the clouds
    available on the list.
1.  In the selected cloud's page, go to the **Available
    projects** tab and check the available projects and organizational
    units list for the updates you made.

## Related pages

-   [Bring your own cloud](/docs/platform/concepts/byoc)
-   [Enable the bring your own cloud (BYOC) feature](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Rename your custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
