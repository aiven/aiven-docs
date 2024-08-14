---
title: Rename a custom cloud
sidebar_label: Rename custom clouds
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Change the name of your [custom cloud](/docs/platform/concepts/byoc).

With the [BYOC feature enabled](/docs/platform/howto/byoc/enable-byoc), you can
[create custom clouds](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
organizations. While
[creating a custom cloud](/docs/platform/howto/byoc/create-custom-cloud), you specify the
custom cloud name. You can change this name any time later by following
[Rename your cloud](#rename-your-cloud).

## Prerequisites

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization
-   Access to the [Aiven Console](https://console.aiven.io/)
-   [Super admin](/docs/platform/howto/make-super-admin) role in your Aiven
    organization
</TabItem>
<TabItem value="2" label="Aiven CLI">
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization
-   [Aiven CLI client](/docs/tools/cli) installed
-   [Super admin](/docs/platform/howto/make-super-admin) role in your Aiven
    organization
</TabItem>
</Tabs>

## Rename your cloud

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>
1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, select a cloud.
1.  On the selected cloud's page, click <ConsoleLabel name="actions"/> > **Rename**.
1.  In the **Rename custom cloud** window, enter a new name, and click **Rename**.
</TabItem>
<TabItem value="2" label="Aiven CLI">
Use the
[`avn byoc update`](/docs/tools/cli/byoc#avn-byoc-update) command to change the name of your
custom cloud.

```bash
avn byoc update                                 \
    --organization-id "ORGANIZATION_IDENTIFIER" \
    --byoc-id "CUSTOM_CLOUD_IDENTIFIER"         \
    --display-name "NAME_OF_CUSTOM_CLOUD"
```

</TabItem>
</Tabs>

## Related pages

-   [About bring your own cloud](/docs/platform/concepts/byoc)
-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Download an infrastructure template and a variables file](/docs/platform/howto/byoc/download-infrastructure-template)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
-   [Storing data in custom clouds](/docs/platform/howto/byoc/store-data)
-   [Delete a custom cloud](/docs/platform/howto/byoc/delete-custom-cloud)
