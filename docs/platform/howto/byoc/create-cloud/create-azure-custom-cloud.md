---
title: Create a Microsoft Azure-integrated custom cloud
sidebar_label: Microsoft Azure
keywords: [Azure, Microsoft Azure, byoc, bring your own cloud, custom cloud]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

Create a [custom cloud](/docs/platform/concepts/byoc) for BYOC in your Aiven organization to better address your specific business needs or project requirements.

To configure a custom cloud in your Aiven organization and prepare your Azure
subscription so that Aiven can access it:

1. In the Aiven Console or with the Aiven CLI client, you specify new cloud details to
   generate a Terraform infrastructure-as-code template.
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
- Depending on the tool to use for creating a custom cloud:
  - Console: Access to the [Aiven Console](https://console.aiven.io/) or
  - CLI:
    - [Aiven CLI client](/docs/tools/cli) installed
    - Aiven organization ID from the output of the `avn organization list` command or
      from the [Aiven Console](https://console.aiven.io/) > <ConsoleLabel name="userinformation"/>
      \> <ConsoleLabel name="organizations"/>.
- You have the
  [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
  role in your Aiven organization.
- You have Terraform >= 1.0 installed.

## Create a custom cloud

Create a custom cloud either in the Aiven Console or with the Aiven CLI.

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>

#### Launch the BYOC setup

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to an organization.
1. Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
   in the sidebar.
1. In the **Bring your own cloud** view, select **Create custom cloud**.

#### Generate an infrastructure template

In this step, an IaC template is generated in the Terraform format. In
[the next step](/docs/platform/howto/byoc/create-cloud/create-azure-custom-cloud#deploy-the-template),
you'll deploy this template in your Azure subscription.

In the **Create custom cloud** wizard:

1. Specify cloud details:

   - Cloud provider
   - Region
   - Custom cloud name
   - [Infrastructure tags](/docs/platform/howto/byoc/tag-custom-cloud-resources)

1. Click **Next**.

1. Specify deployment and storage details:

   - [Deployment model](/docs/platform/concepts/byoc#byoc-architecture)

     Choose between:
     - **Private**: Routes traffic through a proxy for additional security using a
       bastion host logically separated from the Aiven services.
     - **Public**: Lets the Aiven control plane connect to the service nodes via the
       public internet.

   - CIDR for BYOC resources

     The **CIDR** block defines the IP address range for the virtual networks that
     Aiven creates in your Azure subscription. Any Aiven service created in the custom
     cloud will be placed in those networks and will get an IP address within this
     address range.

     In the **CIDR** field, specify an IP address range using CIDR block notation,
     for example: `10.0.0.0/16`, `172.31.0.0/16`, or `192.168.0.0/20`.

     Make sure that the IP address range you use meets the following requirements:

     - IP address range is within the private IP address ranges allowed in
       [RFC 1918](https://datatracker.ietf.org/doc/html/rfc1918).
     - CIDR block size is between `/16` (65536 IP addresses) and `/24`
       (256 IP addresses).
     - CIDR block is large enough to host the desired number of services after
       splitting it into per-availability-zone subnets.

       For example, the smallest `/24` CIDR block might be enough for a few services
       but can pose challenges during node replacements or maintenance upgrades if
       running low on available free IP addresses.

     - CIDR block of your BYOC virtual networks doesn't overlap with the CIDR blocks
       of virtual networks you plan to peer with. You cannot change the CIDR block
       after your custom cloud is created.

1. Click **Generate template**.

Your IaC Terraform template gets generated based on your inputs. You can view, copy, or
download it. Now, you can use the template to
[deploy your Azure infrastructure](/docs/platform/howto/byoc/create-cloud/create-azure-custom-cloud#deploy-the-template).

#### Deploy the template

Use the
[generated Terraform template](/docs/platform/howto/byoc/create-cloud/create-azure-custom-cloud#generate-an-infrastructure-template)
to create the BYOC resources in your Azure subscription.

1. Copy or download the template and the variables file from the
   **Create custom cloud** wizard.

1. Optionally, modify the template as needed.

   :::note
   To connect to a custom-cloud service from IP address ranges outside the custom cloud,
   add specific ingress rules before you apply the Terraform infrastructure template.

   Before adding ingress rules, see the examples provided in the Terraform template you
   generated and downloaded from [Aiven Console](https://console.aiven.io/).
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

1. Deploy the infrastructure template using Terraform:

   ```bash
   terraform init
   terraform plan -var-file=FILE_NAME.tfvars
   terraform apply -var-file=FILE_NAME.tfvars
   ```

   Replace `FILE_NAME.tfvars` with the name of the variables file you downloaded.

   :::important
   The `-var-file` option is required to pass the configuration variables to Terraform.
   :::

   The template creates the following resources in your Azure subscription:

   - A resource group containing all BYOC resources
   - Two virtual networks (bastion and workload VNets) with subnets
   - VNet peering between the bastion and workload networks
   - Network security groups (NSGs) controlling ingress and egress
   - NAT gateways for outbound internet access from both networks
   - Storage accounts (premium and standard) for service data
   - A role assignment granting the service principal access

1. Enter your Azure subscription ID into the **Azure subscription ID** field in the
   **Create custom cloud** wizard.

1. Click **Next** to proceed or park your cloud setup and save your current configuration
   as a draft by selecting **Save draft**. You can resume creating your cloud later.

#### Set up your custom cloud's availability

Select projects where the new custom cloud will be available for hosting your services.
These projects will support creating new services in the custom cloud or migrating your
existing services to the custom cloud if your service and networking configuration allows
it. For more information on migrating your existing services to the custom cloud, contact
your account team.

Your cloud can be available in:

- All the projects in your organization
- Selected organizational units
- Specific projects only

To set up your cloud's availability in the **Create custom cloud** wizard >
the **Assign BYOC to projects** section, select one of the two following options:

- **By default for all projects** to make your custom cloud available in all existing
  and future projects in the organization
- **By selection** to pick specific projects or organizational units where you want
  your custom cloud to be available.

:::note
By selecting an organizational unit, you make your custom cloud available from all the
projects in this unit.
:::

#### Add customer contacts

Select at least one person whom Aiven can contact in case of any technical issues with
your custom cloud.

:::note
**Admin** is a mandatory role, which is required as a primary support contact.
:::

In the **Create custom cloud** wizard > the **Customer contacts** section:

1. Select a contact person's role using the **Job title** menu, and provide their email
   address in the **Email** field.
1. Use **+ Add another contact** to add as many customer contacts as needed for your
   custom cloud.
1. Click **Save and validate**.

The custom cloud process has been initiated.

#### Complete the cloud setup

Select **Done** to close the **Create custom cloud** wizard.

The deployment of your new custom cloud might take a few minutes. As soon as it's over,
and your custom cloud is ready to use, you'll be able to see it in the list of your
custom clouds in the **Bring your own cloud** view.

:::note
Your new custom cloud is ready to use only after its status changes to **Active**.
:::

</TabItem>
<TabItem value="2" label="Aiven CLI">

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

      Before adding ingress rules, see the examples provided in the Terraform template
      you generated and downloaded from the [Aiven Console](https://console.aiven.io/).
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

</TabItem>
</Tabs>

<RelatedPages/>

- [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
- [View the status of a custom cloud](/docs/platform/howto/byoc/view-custom-cloud-status)
- [Manage services hosted in custom clouds](/docs/platform/howto/byoc/manage-byoc-service)
