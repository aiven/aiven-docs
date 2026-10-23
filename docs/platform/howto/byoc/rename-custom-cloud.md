---
title: Rename a custom cloud
sidebar_label: Rename custom clouds
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import ByocTerraformBeta from "@site/static/includes/byoc-terraform-beta.md";

Change the name of your [custom cloud](/docs/platform/concepts/byoc).

With the [BYOC feature enabled](/docs/platform/howto/byoc/enable-byoc), you can
[create custom clouds](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in your Aiven
organizations. While
[creating a custom cloud](/docs/platform/howto/byoc/create-cloud/create-custom-cloud), you specify the
custom cloud name. You can change this name any time later by following
[Rename your cloud](#rename-your-cloud).

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
<TabItem value="3" label="Terraform (AWS and Azure only)">
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in your Aiven
    organization
-   [Aiven Provider for Terraform](/docs/tools/terraform) set up
-   [Organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    role in your Aiven organization
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
<TabItem value="3" label="Terraform (AWS and Azure only)">
Change the `display_name` attribute of the resource that manages your custom cloud, then
apply the configuration. Renaming the cloud does not replace it.

<ByocTerraformBeta />

The custom cloud environment is managed by the
[`aiven_byoc_aws_entity`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/byoc_aws_entity)
resource for AWS custom clouds and by the
[`aiven_byoc_azure_entity`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/byoc_azure_entity)
resource for Azure custom clouds. The following example uses AWS.

```hcl
resource "aiven_byoc_aws_entity" "example_cloud" {
  organization_id  = var.organization_id
  cloud_region     = "eu-west-1"
  deployment_model = "standard"
  display_name     = "byoc-cloud-prod-eu-west-1"
  reserved_cidr    = "10.0.0.0/16"
}
```

Apply the configuration:

```bash
terraform apply
```

</TabItem>
</Tabs>

<RelatedPages/>

-   [View the status of a custom cloud](/docs/platform/howto/byoc/view-custom-cloud-status)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
