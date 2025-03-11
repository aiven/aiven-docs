---
title: Manage an organization VPC peering with Microsoft Azure
sidebar_label: Azure peering
---

import DeleteOrgPeering from "@site/static/includes/vpc/delete-org-peering.md";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up a peering connection between your [Aiven organization VPC](/docs/platform/howto/manage-organization-vpc) and a [Microsoft Azure virtual network](https://learn.microsoft.com/en-us/azure/virtual-network/create-peering-different-subscriptions).

Establishing a peering connection between an Aiven organization VPC and an Azure VNet
requires creating the peering both from the VPC in Aiven and from the VNet in Azure.

To establish the peering from Aiven to Azure, the Aiven Platform's
[Active Directory application object](https://learn.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals)
needs permissions in your Azure subscription. Because the peering is between different AD
tenants (the Aiven AD tenant and your Azure AD tenant), your Azure AD tenant needs another
application object. Once granted permissions, this object allows peering
from Azure to Aiven.

## Prerequisites

- [Manage organization networking](/docs/platform/concepts/permissions#organization-permissions)
  permissions for the Aiven Platform
- Azure account with at least the application administrator role
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/?view=azure-cli-latest) and,
  optionally, the [Microsoft Azure portal](https://portal.azure.com/#home)
- Access to the [Aiven Console](https://console.aiven.io/)
- [Aiven CLI](/docs/tools/cli) installed
- Two VPCs to be peered: an
  [organization VPC](/docs/platform/howto/manage-organization-vpc#create-an-organization-vpc)
  in Aiven and a VNet in your Azure account

## Set up permissions in Azure

### Azure app object permissions

1. Log in with an Azure admin account using the Azure CLI:

   ```bash
   az account clear
   az login
   ```

   This should open a window in your browser prompting to choose an Azure
   account to log in with.

   :::tip
   If you manage multiple Azure subscriptions, also configure the Azure CLI
   to default to the correct subscription for the subsequent commands. This
   is not needed if there's only one subscription:

   ```bash
   az account set --subscription SUBSCRIPTION_NAME_OR_ID
   ```

   :::

1. Create an application object in your AD tenant using the Azure CLI:

   ```bash
   az ad app create                         \
     --display-name "NAME_OF_YOUR_CHOICE"   \
     --sign-in-audience AzureADMultipleOrgs \
     --key-type Password
   ```

   This creates an application object in Azure AD that can be used to log into multiple
   AD tenants ( `--sign-in-audience AzureADMultipleOrgs` ), but only the
   home tenant (the tenant the app was created in) has the credentials to
   authenticate the app.

   :::note
   Save the `appId` field from the output. It will be referred to as `USER_APP_ID`.
   :::

1. Create a service principal for your app object in the Azure subscription where the VNet
   to be peered is located in:

   ```bash
   az ad sp create --id USER_APP_ID
   ```

   This creates a service principal in your subscription, which can be assigned
   permissions to peer your VNet.

   :::note
   Save the `id` field from the JSON output. It will be referred to as `USER_SP_ID`.
   :::

1. Set a password for your app object:

   ```bash
   az ad app credential reset --id USER_APP_ID
   ```

   :::note
   Save the `password` field from the output. It will be referred to as `USER_APP_SECRET`.
   :::

1. Find properties of your virtual network:

   - Resource ID
     - In the [Azure portal](https://portal.azure.com/#home): **Virtual networks** >
       name of your network > **JSON View** > **id**
     - Using the Azure CLI:

       ```bash
       az network vnet list
       ```

     :::tip
     The `id` field should have format
     `/subscriptions/USER_SUBSCRIPTION_ID/ resourceGroups/USER_RESOURCE_GROUP/providers/Microsoft.Network/virtualNetworks/USER_VNET_NAME`. It will be referred to as `USER_VNET_ID`.

   - Azure Subscription ID (the VNet page in the
     [Azure portal](https://portal.azure.com/#home) > **Essentials** > **Subscription ID**)
     or the part after `/subscriptions/` in the resource ID. It will be referred to as
     `USER_SUBSCRIPTION_ID`.
   - Resource group name (the VNet page in the [Azure portal](https://portal.azure.com/#home) >
     **Essentials** > **Resource group**) or the `resourceGroup` field in the output. This
     will be referred to as `USER_RESOURCE_GROUP`.
   - VNet name (title of the VNet page), or the `name` field from
     the output. It will be referred to as `USER_VNET_NAME`.

   :::note
   Save all the properties for later.
   :::

1. Grant your service principal permissions to peer.

   The service principal needs to be assigned a role that includes the
   `Microsoft.Network/virtualNetworks/virtualNetworkPeerings/write` permission at the
   scope of your VNet. To limit the permissions granted to the application object and the
   service principal, you can create a custom role with only this permission. The built-in
   Network Contributor role also includes this permission.

   1. Find the id of the role with the required permission:

      ```bash
      az role definition list --name "Network Contributor"
      ```

      The `id` field in the output is referred to as `NETWORK_CONTRIBUTOR_ROLE_ID`.

   1. Assign the service principal the network contributor role using
      `NETWORK_CONTRIBUTOR_ROLE_ID`:

      ```bash
      az role assignment create            \
        --role NETWORK_CONTRIBUTOR_ROLE_ID \
        --assignee-object-id USER_SP_ID    \
        --scope USER_VNET_ID
      ```

      This allows your application object to manage the network within the specified
      `--scope`. Since you control the application object, you can also grant it
      permissions at the scope of an entire resource group or the whole subscription. This
      enables creating other peerings later without assigning the role to each VNet
      separately.

### Aiven app object permissions

1. Create a service principal for the Aiven application object.

   The Aiven AD tenant contains an application object that the Aiven Platform uses to
   create a peering from the Aiven organization VPC to the Azure VNet. For this, the Aiven
   application object needs a service principal in your Azure subscription. To create it,
   run:

   ```bash
   az ad sp create --id 55f300d4-fc50-4c5e-9222-e90a6e2187fb
   ```

   The argument to `--id` field is a fixed value that represents the ID of the Aiven
   application object.

   :::note
   Save the `id` field from the JSON output. It will be referred to as `AIVEN_SP_ID`.
   :::

   :::important
   The command might fail for the following reasons:
   - `When using this permission, the backing application of the service principal being
     created must in the local tenant`, which means your account doesn't have the required
     permissions. See [Prerequisites](/docs/platform/howto/vnet-peering-azure#prerequisites).
   - `The service principal cannot be created, updated, or restored because the service
     principal name 55f300d4-fc50-4c5e-9222-e90a6e2187fb is already in use`, in which case
     run `az ad sp show --id 55f300d4-fc50-4c5e-9222-e90a6e2187fb` and find `id` in the
     output.
   :::

1. Create a custom role for the Aiven application object.

   The Aiven application has a service principal that can be granted permissions. To
   restrict the service principal's permissions to peering, create a custom role with
   the peering action only allowed:

   ```bash
   az role definition create --role-definition '
     {
       "Name": "NAME_OF_YOUR_CHOICE",
       "Description": "Allows creating a peering to vnets in scope (but not from)",
       "Actions": ["Microsoft.Network/virtualNetworks/peer/action"],
       "AssignableScopes": ["/subscriptions/'USER_SUBSCRIPTION_ID'"]
     }'
   ```

   `AssignableScopes` includes your Azure subscription ID to restrict scopes that a role
   assignment can use.

   :::note
   Save the `id` field from the output. It will be referred to as `AIVEN_ROLE_ID`.
   :::

1. Assign the custom role to the Aiven service principal.

   To give the Aiven application object's service principal permissions to peer with your
   VNet, assign the created role to the Aiven service principal with the scope of your
   VNet:

   ```bash
   az role assignment create          \
     --role AIVEN_ROLE_ID             \
     --assignee-object-id AIVEN_SP_ID \
     --scope USER_VNET_ID
   ```

1. Find your AD tenant ID:

   - In the [Azure portal](https://portal.azure.com/#home): **Settings** >
     **Directories + subscriptions** > **Directories** > **Directory ID**
   - Using the Azure CLI:

     ```bash
     az account list
     ```

   :::note
   Save the `tenantId` field from the output. It will be referred to as `USER_TENANT_ID`.
   :::

## Create the peering in Aiven

<Tabs groupId="group1">
<TabItem value="cli" label="Aiven CLI" default>
By creating a peering from the Aiven organization VPC to the VNet in your Azure subscription,
you also create a service principal for the application object
(`--peer-azure-app-id USER_APP_ID`) and grant it the permission to peer with the Aiven
organization VPC.

The Aiven application object authenticates with your Azure tenant to grant it access to
[the service principal of the Aiven application object](/docs/platform/howto/vnet-peering-azure#aiven-app-object-permissions)
(`--peer-azure-tenant-id USER_TENANT_ID`).

1. [Find your organization ID in the Aiven Console](/docs/platform/reference/get-resource-IDs#get-an-organization-id)
   or retrieve your organization ID from the output of the `avn organization list` command.

   The organization ID will be referred to as `AIVEN_ORG_ID`.

1. Find your Aiven organization VPC ID using either the
   [Aiven Console](https://console.aiven.io/) or the [Aiven CLI](/docs/tools/cli).

   <Tabs groupId="group1">
   <TabItem value="gui" label="Aiven Console" default>
   1. Log in to the [Aiven Console](https://console.aiven.io/).
   1. Go to your organization, and click **Admin** in the top navigation bar.
   1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
   1. On the **Virtual private clouds** page, select your organization VPC.
   1. On the **VPC details** page, go to the **Overview** section, and copy **ID**.
   </TabItem>
   <TabItem value="cli" label="Aiven CLI">
   In the [Aiven CLI](/docs/tools/cli), run the
   [avn organization vpc list](/docs/tools/cli/vpc) command.
   </TabItem>
   </Tabs>

   The Aiven organization VPC ID will be referred to as `AIVEN_ORGANIZATION_VPC_ID`.

1. Run:

   ```bash
   avn organization vpc peering-connection create     \
     --organization-id AIVEN_ORG_ID                   \
     --organization-vpc-id AIVEN_ORGANIZATION_VPC_ID  \
     --peer-cloud-account USER_SUBSCRIPTION_ID        \
     --peer-resource-group USER_RESOURCE_GROUP        \
     --peer-vpc USER_VNET_NAME                        \
     --peer-azure-app-id USER_APP_ID                  \
     --peer-azure-tenant-id USER_TENANT_ID
   ```

   :::note
   Use lower case for arguments starting with `USER_`.
   :::

1. Run the following command until the state changes from `APPROVED` to `PENDING_PEER`:

   ```bash
   avn organization vpc peering-connection get -v     \
     --organization-id AIVEN_ORG_ID                   \
     --organization-vpc-id AIVEN_ORGANIZATION_VPC_ID  \
     --peer-cloud-account USER_SUBSCRIPTION_ID        \
     --peer-resource-group USER_RESOURCE_GROUP        \
     --peer-vpc USER_VNET_NAME
   ```

   :::tip
   If the state is `INVALID_SPECIFICATION` or `REJECTED_BY_PEER`, check if the Azure
   VNet exists and if the Aiven application object has the permission to be peered with.
   Revise your configuration and recreate the peering connection.
   :::

   Establishing the connection from Aiven to Azure can take a while. When completed,
   the state changes to `PENDING_PEER` and the output shows details for establishing
   the peering from your Azure VNet to the Aiven organization VPC.

   :::note
   Save the following from the output:

   - `to-tenant-id`: It will be referred to as `AIVEN_TENANT_ID`.
   - `to-network-id`: It will be referred to as `AIVEN_VNET_ID`.
   :::

</TabItem>
<TabItem value="gui" label="Aiven Console">

1. Log in to the [Aiven Console](https://console.aiven.io/), and click **Admin** in the
   top navigation bar.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, select an organization VPC to peer.
1. On the **VPC details** page, go to the **VPC peering connections** section and
   click **Create peering request**.
1. In the **Create peering request** window:
   1. Enter the following:
      - **Azure subscription ID**
      - **Resource group**
      - **Network name**
      - **Active Directory tenant ID**
      - **Application object ID**
   1. Click **Create**.

      This adds a connection with the **Pending peer** status in the
      [Aiven Console](https://console.aiven.io/).
1. While still on the **VPC details** page, make a note of the **ID** of your Aiven VPC.

</TabItem>
<TabItem value="api" label="Aiven API">

Make an API call to the
[OrganizationVpcPeeringConnectionCreate](https://api.aiven.io/doc/#tag/Organization_Vpc/operation/OrganizationVpcPeeringConnectionCreate)
endpoint:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/organization/ORGANIZATION_ID/vpcs/ORGANIZATION_VPC_ID/peering-connections \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '
    {
      "peer_azure_app_id":"USER_APP_ID",
      "peer_azure_tenant_id":"USER_TENANT_ID",
      "peer_cloud_account":"USER_SUBSCRIPTION_ID",
      "peer_resource_group":"USER_RESOURCE_GROUP",
      "peer_vpc":"USER_VNET_NAME"
    }
  '
```

Replace the following placeholders with meaningful data:

- `ORGANIZATION_ID`
- `ORGANIZATION_VPC_ID`
- `BEARER_TOKEN`
- `USER_SUBSCRIPTION_ID`
- `USER_RESOURCE_GROUP`
- `USER_VNET_NAME`
- `USER_APP_ID`
- `USER_TENANT_ID`

</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">
Use the
[aiven_azure_org_vpc_peering_connection](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/azure_org_vpc_peering_connection)
resource.
</TabItem>
</Tabs>

## Create the peering in Azure

[Establish the peering connection](https://learn.microsoft.com/en-us/azure/virtual-network/create-peering-different-subscriptions)
from your Azure VNet to the Aiven organization VPC:

1. Log out the Azure user
   [you logged in with](/docs/platform/howto/vnet-peering-azure#azure-app-object-permissions):

   ```bash
   az account clear
   ```

1. Log in the Azure application object to your AD tenant using the
   [password](/docs/platform/howto/vnet-peering-azure#azure-app-object-permissions):

   ```bash
   az login              \
     --service-principal \
     -u USER_APP_ID      \
     -p USER_APP_SECRET  \
     --tenant USER_TENANT_ID
   ```

1. Log in the Azure application object to the Aiven AD tenant:

   ```bash
   az login              \
     --service-principal \
     -u USER_APP_ID      \
     -p USER_APP_SECRET  \
     --tenant AIVEN_TENANT_ID
   ```

   At this point, your application object should have an open session with your Azure AD
   tenant and the Aiven AD tenant.

1. Create a peering from your Azure VNet to the Aiven organization VPC:

   ```bash
   az network vnet peering create         \
     --name PEERING_NAME_OF_YOUR_CHOICE   \
     --remote-vnet AIVEN_VNET_ID          \
     --vnet-name USER_VNET_NAME           \
     --resource-group USER_RESOURCE_GROUP \
     --subscription USER_SUBSCRIPTION_ID  \
     --allow-vnet-access
   ```

   If the peering state in the output is `connected`, the peering is created.

   :::tip
   The command might fail with the following error:

   ```txt
   The client 'RANDOM_UUID' with object id 'RANDOM_UUID' does not have authorization to
   perform action 'Microsoft.Network/virtualNetworks/virtualNetworkPeerings/write' over
   scope 'USER_VNET_ID'. If access was recently granted, refresh your credentials.
   ```

   for two reasons related to the
   [role assignment](/docs/platform/howto/vnet-peering-azure#azure-app-object-permissions):

   - Role assignment hasn't taken effect yet, in which case try logging in again and
     recreating the peering.
   - Role assignment is incorrect, in which case try recreating the role assignment.
   :::

   Wait until the Aiven peering connection is active. The Aiven Platform polls peering
   connections in state `PENDING_PEER` regularly to see if the peer (your Azure VNet) has
   created a peering connection to the Aiven organization VPC. Once this is detected, the state
   changes from `PENDING_PEER` to `ACTIVE`, at which point Aiven services in the
   organization VPC can be reached through the peering.

1. Check if the status of the peering connection is `ACTIVE`:

   ```bash
   avn organization vpc get -v                       \
     --organization-id AIVEN_ORG_ID                  \
     --organization-vpc-id AIVEN_ORGANIZATION_VPC_ID \
     --peer-cloud-account USER_SUBSCRIPTION_ID       \
     --peer-resource-group USER_RESOURCE_GROUP       \
     --peer-vpc USER_VNET_NAME
   ```

## Delete the peering

<DeleteOrgPeering/>

## Related pages

- [Manage organization VPCs](/docs/platform/howto/manage-organization-vpc)
- [Set up an organization VPC peering](/docs/platform/howto/list-organization-vpc-peering)
- [Manage project VPCs](/docs/platform/howto/manage-project-vpc)
