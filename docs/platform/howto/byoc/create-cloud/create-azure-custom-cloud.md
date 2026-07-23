---
title: Create a Microsoft Azure-integrated custom cloud
sidebar_label: Microsoft Azure
keywords: [Azure, Microsoft Azure, byoc, bring your own cloud, custom cloud]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create a [custom cloud](/docs/platform/concepts/byoc) for BYOC in your Aiven organization to better address your specific business needs or project requirements.

To configure a custom cloud in your Aiven organization and prepare your Azure
subscription so that Aiven can access it:

1. With the Aiven CLI client, you specify new cloud details to generate a Terraform
   infrastructure-as-code template.
1. You download the generated template and deploy it in your Azure subscription using
   your App Registration credentials.
1. You provision the custom cloud by supplying your Azure subscription ID to the Aiven
   platform, which gives Aiven the permissions to access your Azure subscription, create
   resources, and manage them onward.
1. You select Aiven projects that can use your new custom cloud for creating services.
1. You add contact details for individuals from your organization that Aiven can reach out
   to in case of technical issues with the new cloud.

:::note
The `pci_dss` and `hipaa` deployment models are not supported for Azure custom clouds.
:::

## Before you start

### Prerequisites

- You have [enabled the BYOC feature](/docs/platform/howto/byoc/enable-byoc).
- You have an active Azure subscription where the BYOC infrastructure will be deployed.
- You have an **App Registration (service principal)** in
  [Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/what-is-application-management)
  with the **Contributor** role on the subscription. This is used for Terraform
  authentication.
- You have the following credentials for the service principal available as environment
  variables when running `terraform apply`:
  - `ARM_CLIENT_ID`: Application (client) ID of the App Registration
  - `ARM_CLIENT_SECRET`: A client secret for the App Registration
  - `ARM_TENANT_ID`: Directory (tenant) ID
  - `ARM_SUBSCRIPTION_ID`: Azure subscription ID
- [Aiven CLI client](/docs/tools/cli) installed
- Aiven organization ID from the output of the `avn organization list` command or
  from the [Aiven Console](https://console.aiven.io/) > <ConsoleLabel name="userinformation"/>
  \> <ConsoleLabel name="organizations"/>.
- You have the
  [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
  role in your Aiven organization.
- You have Terraform >= 1.0 installed.

## Create a custom cloud

1. Generate an IaC template by running
   [avn byoc create](/docs/tools/cli/byoc#avn-byoc-create).

   ```bash
   avn byoc create                               \
     --organization-id "ORGANIZATION_ID"         \
     --deployment-model "DEPLOYMENT_MODEL_NAME"  \
     --cloud-provider "azure"                    \
     --cloud-region "CLOUD_REGION_NAME"          \
     --reserved-cidr "CIDR_BLOCK"                \
     --display-name "CUSTOM_CLOUD_DISPLAY_NAME"
   ```

   Replace the following:

   - `ORGANIZATION_ID` with the ID of your Aiven organization to connect with your own
     cloud account to create the custom cloud, for example `org123a456b789`. Get your
     `ORGANIZATION_ID`
     [from the Aiven Console or CLI](/docs/platform/howto/byoc/create-cloud/create-azure-custom-cloud#prerequisites).
   - `DEPLOYMENT_MODEL_NAME` with the type of
     [network architecture](/docs/platform/concepts/byoc#byoc-architecture) your custom
     cloud uses:
     - `standard_public` (public) model: The nodes have public IPs and can be configured
       to be publicly accessible for authenticated users. The Aiven control plane can
       connect to the service nodes via the public internet.
     - `standard` (private) model: The nodes reside in a virtual network without public
       IP addresses and are by default not accessible from outside. Traffic is routed
       through a proxy for additional security using a bastion host logically separated
       from the Aiven services.
   - `CLOUD_REGION_NAME` with the name of an Azure region where to create your custom
     cloud:
     1. Pick a region from the **Cloud** column in the supported
        [Azure cloud regions](/docs/platform/reference/list_of_clouds#azure) table.
     1. Drop the `azure-` prefix from the selected region name, for example,
        `azure-westeurope` > `westeurope`.
   - `CIDR_BLOCK` with a CIDR block defining the IP address range for the virtual
     networks that Aiven creates in your own cloud account, for example: `10.0.0.0/16`,
     `172.31.0.0/16`, or `192.168.0.0/20`.
   - `CUSTOM_CLOUD_DISPLAY_NAME` with the name of your custom cloud, which you can set
     arbitrarily.

   <details><summary>
   Show sample output
   </summary>

   ```json
   {
       "custom_cloud_environment": {
           "cloud_provider": "azure",
           "cloud_region": "westeurope",
           "contact_emails": [
               {
                   "email": "firstname.secondname@domain.com",
                   "real_name": "Test User",
                   "role": "Admin"
               }
           ],
           "custom_cloud_environment_id": "018b6442-c602-42bc-b63d-438026133f60",
           "deployment_model": "standard",
           "display_name": "My BYOC Cloud on Azure",
           "errors": [],
           "reserved_cidr": "10.0.0.0/16",
           "state": "draft",
           "tags": {},
           "update_time": "2024-05-07T14:24:18Z"
       }
   }
   ```

   </details>

1. Deploy the IaC template.

   1. Download the template and the variable file:

      - [avn byoc template terraform get-template](/docs/tools/cli/byoc#avn-byoc-template-terraform-get-template)

            ```bash
            avn byoc template terraform get-template             \
              --organization-id "ORGANIZATION_ID"                \
              --byoc-id "CUSTOM_CLOUD_ID" >| "tf_dir/tf_file.tf"
            ```

         Replace the following:

         - `ORGANIZATION_ID` with the ID of your Aiven organization, for example
           `org123a456b789`. Get your `ORGANIZATION_ID`
           [from the Aiven Console or CLI](/docs/platform/howto/byoc/create-cloud/create-azure-custom-cloud#prerequisites).
         - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can
           extract from the output of the
           [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list) command, for example
           `018b6442-c602-42bc-b63d-438026133f60`.

      - [avn byoc template terraform get-vars](/docs/tools/cli/byoc#avn-byoc-template-terraform-get-vars)

            ```bash
            avn byoc template terraform get-vars                     \
              --organization-id "ORGANIZATION_ID"                    \
              --byoc-id "CUSTOM_CLOUD_ID" >| "tf_dir/tf_file.tfvars"
            ```

         Replace the following:

         - `ORGANIZATION_ID` with the ID of your Aiven organization, for example
           `org123a456b789`. Get your `ORGANIZATION_ID`
           [from the Aiven Console or CLI](/docs/platform/howto/byoc/create-cloud/create-azure-custom-cloud#prerequisites).
         - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can
           extract from the output of the
           [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list) command, for example
           `018b6442-c602-42bc-b63d-438026133f60`.

   1. Optionally, modify the template as needed.

      :::note
      To connect to a custom-cloud service from IP address ranges outside the custom
      cloud, add specific ingress rules before you apply the Terraform infrastructure
      template.

      Before adding ingress rules, see the examples provided in the downloaded Terraform
      template.
      :::

   1. Set up Terraform to authenticate with Azure by exporting the App Registration
      credentials as environment variables:

      ```bash
      export ARM_CLIENT_ID="<app-registration-client-id>"
      export ARM_CLIENT_SECRET="<app-registration-client-secret>"
      export ARM_TENANT_ID="<entra-tenant-id>"
      export ARM_SUBSCRIPTION_ID="<azure-subscription-id>"
      ```

      For more authentication options and configuration details, see the
      [Azure Provider authentication documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs#authenticating-to-azure).

   1. Deploy the infrastructure template using Terraform with the provided variables
      file:

      ```bash
      terraform init
      terraform plan -var-file=FILE_NAME.tfvars
      terraform apply -var-file=FILE_NAME.tfvars
      ```

      Replace `FILE_NAME.tfvars` with the name of the variables file you downloaded.

      :::important
      The `-var-file` option is required to pass the configuration variables to
      Terraform.
      :::

1. Provision resources by running
   [avn byoc provision](/docs/tools/cli/byoc#avn-byoc-provision) and passing your Azure
   subscription ID.

   ```bash
   avn byoc provision                            \
     --organization-id "ORGANIZATION_ID"         \
     --byoc-id "CUSTOM_CLOUD_ID"                 \
     --azure-subscription-id "AZURE_SUBSCRIPTION_ID"
   ```

   Replace the following:

   - `ORGANIZATION_ID` with the ID of your Aiven organization, for example
     `org123a456b789`. Get your `ORGANIZATION_ID`
     [from the Aiven Console or CLI](/docs/platform/howto/byoc/create-cloud/create-azure-custom-cloud#prerequisites).
   - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can extract
     from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list) command,
     for example `018b6442-c602-42bc-b63d-438026133f60`.
   - `AZURE_SUBSCRIPTION_ID` with your Azure subscription ID (the same value as
     `ARM_SUBSCRIPTION_ID`).

1. Enable your custom cloud in organizations, projects, or units by running
   [avn byoc cloud permissions add](/docs/tools/cli/byoc#avn-byoc-cloud-permissions-add).

   ```bash
   avn byoc cloud permissions add        \
     --organization-id "ORGANIZATION_ID" \
     --byoc-id "CUSTOM_CLOUD_ID"         \
     --account "ACCOUNT_ID"
   ```

   Replace the following:

   - `ORGANIZATION_ID` with the ID of your Aiven organization, for example
     `org123a456b789`. Get your `ORGANIZATION_ID`
     [from the Aiven Console or CLI](/docs/platform/howto/byoc/create-cloud/create-azure-custom-cloud#prerequisites).
   - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can extract
     from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list) command,
     for example `018b6442-c602-42bc-b63d-438026133f60`.
   - `ACCOUNT_ID` with the identifier of your account (organizational unit) in Aiven,
     for example `a484338c34d7`. You can extract `ACCOUNT_ID` from the output of the
     `avn organization list` command.

1. Add customer contacts for the new cloud by running
   [avn byoc update](/docs/tools/cli/byoc#avn-byoc-update).

   ```bash
   avn byoc update                     \
   --organization-id "ORGANIZATION_ID" \
   --byoc-id "CUSTOM_CLOUD_ID"         \
   '
       {
       "contact_emails": [
           {
           "email": "EMAIL_ADDRESS",
           "real_name": "John Doe",
           "role": "Admin"
           }
       ]
       }
   '
   ```

   Replace the following:

   - `ORGANIZATION_ID` with the ID of your Aiven organization, for example
     `org123a456b789`. Get your `ORGANIZATION_ID`
     [from the Aiven Console or CLI](/docs/platform/howto/byoc/create-cloud/create-azure-custom-cloud#prerequisites).
   - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can extract
     from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list) command,
     for example `018b6442-c602-42bc-b63d-438026133f60`.

<RelatedPages/>

- [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
- [View the status of a custom cloud](/docs/platform/howto/byoc/view-custom-cloud-status)
- [Manage services hosted in custom clouds](/docs/platform/howto/byoc/manage-byoc-service)
