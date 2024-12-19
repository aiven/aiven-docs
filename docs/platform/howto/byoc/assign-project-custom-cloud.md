---
title: Enable a custom cloud in Aiven organizations, units, or projects
sidebar_label: Attach projects
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Select your organizations, units, or project that can access and use your [custom cloud](/docs/platform/concepts/byoc).

With the [BYOC feature enabled](/docs/platform/howto/byoc/enable-byoc), you can
[create custom clouds](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in your Aiven
organization. As a part of the
[initial custom cloud's setup](/docs/platform/howto/byoc/create-cloud/create-custom-cloud),
you select in what projects you'll be able to use your new custom cloud to host Aiven
services. You can update this setting any time later by following
by following
[Enable projects to use your custom cloud](#enable-projects-to-use-your-custom-cloud).

You can make your custom cloud available by default in all existing and future projects,
or you can pick specific projects and/or organizational units where you want your custom
cloud to be available.

## Prerequisites

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in your Aiven
    organization
-   Access to the [Aiven Console](https://console.aiven.io/)
-   [Organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    role in your Aiven organization
</TabItem>
<TabItem value="2" label="Aiven CLI">
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in your Aiven
    organization
-   [Aiven CLI client](/docs/tools/cli) installed
-   [Organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    role in your Aiven organization
</TabItem>
</Tabs>

## Enable projects to use your custom cloud

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>
1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, select a cloud.
1.  On the selected cloud's page, go to the **Available projects** tab, and modify the
    settings:

    - **Set availability**

      1. Click **Set availability** to decide if your custom cloud is
         available in all projects in your organization or in selected projects/units only.

      1. In the **Custom cloud's availability in your organization** window, choose between:
          - **By default for all projects**
          - **By selection**
            - **Assign organizational units**: select organizational units
            - **Assign projects**: select projects

         :::note
         By selecting an organizational unit, you make your custom cloud
         available from all the projects in this unit.
         :::

      1. Click **Save**.

    - **Assign projects**

      1. Click **Assign projects** to enable your custom cloud in
         specific organizational units and/or projects.

      1. In the **Assign projects** window, use the available menus to select
         units and/or projects.

      1. Click **Assign projects**.
</TabItem>
<TabItem value="2" label="Aiven CLI">
Use the [`avn byoc cloud permissions add`](/docs/tools/cli/byoc#avn-byoc-cloud-permissions-add)
command to enable your custom cloud in organizations, projects, or units.

```bash
avn byoc cloud permissions add                  \
    --organization-id "ORGANIZATION_IDENTIFIER" \
    --byoc-id "CUSTOM_CLOUD_IDENTIFIER"         \
    --account "ACCOUNT_IDENTIFIER"
```

</TabItem>
</Tabs>

In the organizations projects, or organizational units for which you enable your
custom cloud, you can:

- Create services in the custom cloud
- Migrate existing services to your custom cloud if your service and networking
  configuration allows it. For more information, contact your account team.

## Related pages

-   [View the status of a custom cloud](/docs/platform/howto/byoc/view-custom-cloud-status)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Rename a custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
