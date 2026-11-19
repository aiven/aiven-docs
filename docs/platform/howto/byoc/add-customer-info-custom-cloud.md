---
title: Manage customer contacts for a custom cloud
sidebar_label: Update customer contacts
---

import {ConsoleIcon} from "@site/src/components/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import ByocTerraformBeta from "@site/static/includes/byoc-terraform-beta.md";

Update the list of customer contacts for your [custom cloud](/docs/platform/concepts/byoc).

With the [BYOC feature enabled](/docs/platform/howto/byoc/enable-byoc), you can
[create custom clouds](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in your Aiven
organizations. While
[creating a custom cloud](/docs/platform/howto/byoc/create-cloud/create-custom-cloud), you add at least
the **Admin** contact so that the Aiven team can reach out to them if needed. You can change
the provided contacts any time later by following
[Update the contacts list](#update-the-contacts-list).

:::important
While you can add multiple different customer contacts for your custom cloud, **Admin** is
a mandatory role that is always required as a primary support contact.
:::

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

## Update the contacts list

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>
1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, select a cloud.
1.  On the selected cloud's page, click <ConsoleLabel name="actions"/> > **Customer contact**.
1.  In the **Customer contact** window, select a new contact's role
    from the menu, enter the email address, and click <ConsoleIcon name="plus"/> to add
    the provided contact's details.
1.  When you're done adding all the contacts, select **Save changes**.
</TabItem>
<TabItem value="2" label="Aiven CLI">
Use the
[avn byoc update](/docs/tools/cli/byoc#avn-byoc-update)
command with the `--contact-email` option to edit the list of individuals from your
organization to be contacted by the Aiven team if needed.

    ```bash
    avn byoc update                                                             \
      --organization-id "ORGANIZATION_IDENTIFIER"                               \
      --byoc-id "CUSTOM_CLOUD_IDENTIFIER"                                       \
      --contact-email 'email="EMAIL_ADDRESS",real_name="John Doe",role="Admin"'
    ```

Each `--contact-email` value takes the `email`, `real_name`, and `role` fields in the
format `email="EMAIL",real_name="NAME",role="ROLE"`. The `email` field is required, and all
values must be quoted. To set multiple contacts, repeat the option:

    ```bash
    avn byoc update                                                                 \
      --organization-id "ORGANIZATION_IDENTIFIER"                                   \
      --byoc-id "CUSTOM_CLOUD_IDENTIFIER"                                           \
      --contact-email 'email="admin@example.com",real_name="John Doe",role="Admin"' \
      --contact-email 'email="ops@example.com",real_name="Jane Smith",role="Operator"'
    ```

:::note
The `--contact-email` option replaces the entire list of customer contacts. List every
contact, including the mandatory **Admin** contact, each time you run the command. Any
contact you omit is removed.
:::

</TabItem>
<TabItem value="3" label="Terraform (AWS and Azure only)">
Edit the `contact_emails` blocks of the resource that manages your custom cloud, then
apply the configuration.

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

  contact_emails {
    email     = "admin@example.com"
    real_name = "John Doe"
    role      = "Admin"
  }

  contact_emails {
    email     = "ops@example.com"
    real_name = "Jane Smith"
    role      = "Operator"
  }
}
```

Each `contact_emails` block takes a required `email` field and the optional `real_name`
and `role` fields. You can define up to 10 blocks.

:::note
Terraform manages the complete list of contacts. List every contact, including the
mandatory **Admin** contact, each time you change the configuration. Any contact you
remove from the configuration is removed from the custom cloud.
:::

Apply the configuration:

```bash
terraform apply
```

</TabItem>
</Tabs>

<RelatedPages/>

-   [View the status of a custom cloud](/docs/platform/howto/byoc/view-custom-cloud-status)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Rename a custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
