---
title: Enable your custom cloud in Aiven organizations, units, or projects
sidebar_label: Attach projects
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Configure the availability of your [custom cloud](/docs/platform/concepts/byoc) to access
it in desired projects and/or organizational units.

## About enabling custom clouds in projects and units

With the BYOC feature enabled, you can
[create custom clouds](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
organization. As a part of the
[initial custom cloud's setup in the Aiven Console](/docs/platform/howto/byoc/create-custom-cloud),
you select in what projects you'll be able to use your new custom cloud to host Aiven
services. Later, you can come back to the **Available projects** tab on your
cloud's page in the [Aiven Console](https://console.aiven.io/) and update
the settings you configured during the
[initial custom cloud's setup](/docs/platform/howto/byoc/create-custom-cloud) to change
how your custom cloud is available in projects and/or units.

You can make your custom cloud available by default in all existing and future projects,
or you can pick specific projects and/or organizational units where you want your custom
cloud to be available.

## Prerequisites

-   [Super admin](/docs/platform/howto/make-super-admin) role for your Aiven organization
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization
-   Access to [Aiven Console](https://console.aiven.io/)

## Enable projects to use your custom cloud

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, select a desired cloud.
1.  On the selected cloud's page, go to the **Available projects** tab, and modify the
    settings:

    -   Click **Set availability** to decide if your custom cloud is
        available in all projects in your organization or in
        selected projects only.

        - In the **Custom cloud's availability in your organization** window, choose between:
          - **By default for all projects**
          - **By selection**
            - **Assign organizational units**: select desired organizational units
            - **Assign projects**: select desired projects

        - Confirm your choice by clicking **Save**.

        :::note
        By selecting an organizational unit, you make your custom cloud
        available from all the projects in this unit.
        :::

    -   Click **Assign projects** to enable your custom cloud in
        specific organizational units and/or projects.

        - In the **Assign projects** window, use the available menus to select
        desired units and/or projects.

        - Confirm your choice by clicking **Assign projects**.

In the projects and/or organizational units for which you enable your
custom cloud, you can:

- Create services in the custom cloud
- Migrate existing services to your custom cloud if your service and networking
  configuration allows it. For more information, contact the
  [sales team](mailto:sales@aiven.io).

## Related pages

-   [About bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
-   [Enable the bring your own cloud (BYOC) feature](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
-   [Use tiered storage in custom clouds](/docs/platform/howto/byoc/use-byoc-tiered-storage)
-   [Rename your custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
