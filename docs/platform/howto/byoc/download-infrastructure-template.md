---
title: Download an infrastructure template and a variables file
sidebar_label: Download TF template & vars file
keywords: [Terraform, deployment, deploy, byoc, bring your own cloud, custom cloud]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Download a Terraform template and a variables file that define the infrastructure of your
[custom cloud](/docs/platform/concepts/byoc).

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

## Download an infrastructure template

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  Select a cloud, and find the **Infrastructure template** on the **Overview**.
1.  Click <ConsoleLabel name="download"/>.

</TabItem>
<TabItem value="2" label="Aiven CLI">
[Run the `avn byoc template terraform get-template` command](/docs/tools/cli/byoc#avn-byoc-template-terraform-get-template)
to download your infrastructure template.

    ```bash
    avn byoc template terraform get-template        \
      --organization-id "ORGANIZATION_IDENTIFIER"   \
      --byoc-id "CUSTOM_CLOUD_IDENTIFIER" >| "tf_dir/tf_file.tf"
    ```

</TabItem>
</Tabs>

## Download a variable file

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  Select a cloud, and find the **Variables file** on the **Overview**.
1.  Click <ConsoleLabel name="download"/>.

</TabItem>
<TabItem value="2" label="Aiven CLI">
[Run the `avn byoc template terraform get-vars` command](/docs/tools/cli/byoc#avn-byoc-template-terraform-get-vars)
to download your variables file.

    ```bash
    avn byoc template terraform get-vars              \
      --organization-id "ORGANIZATION_IDENTIFIER"     \
      --byoc-id "CUSTOM_CLOUD_IDENTIFIER" >| "tf_dir/tf_file.vars"
    ```

</TabItem>
</Tabs>

## Related pages

-   [Bring your own cloud](/docs/platform/concepts/byoc)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Rename a custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
-   [Delete a custom cloud](/docs/platform/howto/byoc/delete-custom-cloud)
