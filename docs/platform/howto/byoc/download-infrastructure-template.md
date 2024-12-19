---
title: Download an infrastructure template and a variables file
sidebar_label: Download TF template & tfvars file
keywords: [Terraform, deployment, deploy, byoc, bring your own cloud, custom cloud]
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Download a Terraform template and a variables file that define the infrastructure of your
[custom cloud](/docs/platform/concepts/byoc).

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
avn byoc template terraform get-template                       \
    --organization-id "ORGANIZATION_IDENTIFIER"                \
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
avn byoc template terraform get-vars                             \
    --organization-id "ORGANIZATION_IDENTIFIER"                  \
    --byoc-id "CUSTOM_CLOUD_IDENTIFIER" >| "tf_dir/tf_file.tfvars"
```

</TabItem>
</Tabs>

## Related pages

-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
