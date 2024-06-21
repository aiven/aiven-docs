---
title: Download a custom cloud infrastructure template
sidebar_label: Download infra template
keywords: [Terraform, deployment, deploy, byoc, bring your own cloud, custom cloud]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Download a Terraform template that defines the infrastructure of your [custom cloud](/docs/platform/concepts/byoc).

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

## Download an infrastructure template

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>

#### Via the Aiven Console

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  Select a cloud, and find the **Infrastructure template** on the **Overview**.
1.  Click <ConsoleLabel name="download"/>.

#### Via the Aiven CLI client

[Run the `avn byoc template terraform get-template` command](/docs/tools/cli/byoc#avn-byoc-template-terraform-get-template)
to download your infrastructure template.
</TabItem>
<TabItem value="2" label="GCP">
[Run the `avn byoc template terraform get-template` command](/docs/tools/cli/byoc#avn-byoc-template-terraform-get-template)
to download your infrastructure template.
</TabItem>
<TabItem value="3" label="Azure & OCI">
Reach out to your account team to request the infrastructure template of your custom cloud.
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
