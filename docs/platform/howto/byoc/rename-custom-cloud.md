---
title: Rename a custom cloud
sidebar_label: Rename custom clouds
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Change the name of your [custom cloud](/docs/platform/concepts/byoc).

## About renaming custom clouds

With the [BYOC feature enabled](/docs/platform/howto/byoc/enable-byoc), you can
[create custom clouds](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
organizations. While
[creating a custom cloud](/docs/platform/howto/byoc/create-custom-cloud), you specify the
custom cloud name. You can change this name any time later by following
[Rename your cloud](#rename-your-cloud).

## Prerequisites

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization.
-   Depending on the dev tool to use, you have:
    - Access to the [Aiven Console](https://console.aiven.io/) or
    - [Aiven CLI client](/docs/tools/cli) installed
</TabItem>
<TabItem value="2" label="GCP">
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization.
-   You have the [Aiven CLI client](/docs/tools/cli) installed.
</TabItem>
<TabItem value="3" label="Azure & OCI">
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization.
</TabItem>
</Tabs>

## Rename your cloud

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>
1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, select a cloud.
1.  On the selected cloud's page, click <ConsoleLabel name="actions"/> > **Rename**.
1.  In the **Rename custom cloud** window, enter a new name, and click **Rename**.
</TabItem>
<TabItem value="2" label="GCP">
Use the
[avn byoc update](/docs/tools/cli/byoc#avn-byoc-update) command to change the name of your
custom cloud.
</TabItem>
<TabItem value="3" label="Azure & OCI">
Reach out to your account team to change the name of your custom cloud.
</TabItem>
</Tabs>

## Related pages

-   [About bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
