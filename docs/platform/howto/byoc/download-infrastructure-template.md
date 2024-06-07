---
title: Download a custom cloud infrastructure template
sidebar_label: Download infra template
keywords: [Terraform, deployment, deploy, byoc, bring your own cloud, custom cloud]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Download a Terraform template that defines the infrastructure of your [custom cloud](/docs/platform/concepts/byoc). Use the [Aiven Console](#download-the-template-via-console) or the [Aiven CLI](#download-the-template-via-cli).

## Prerequisites

-   [Super admin](/docs/platform/howto/make-super-admin) role for your Aiven organization
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven organization
-   Access to the [Aiven Console](https://console.aiven.io/) or the
    [Aiven CLI](/docs/tools/cli) installed

## Download the template via console

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  Select a cloud, and find the **Infrastructure template** on the **Overview**.
1.  Click <ConsoleLabel name="download"/>.

## Download the template via CLI

[Run the `avn byoc templete terraform get-template` command](/docs/tools/cli/byoc#avn-byoc-templete-terraform-get-template)
to download your infrastructure template.

## Related pages

-   [Bring your own cloud](/docs/platform/concepts/byoc)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Rename a custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
-   [Delete a custom cloud](/docs/platform/howto/byoc/delete-custom-cloud)
