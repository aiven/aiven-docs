---
title: Set up an organization VPC peering with Microsoft Azure
sidebar_label: Azure peering
---

import CollectDataAws from "@site/static/includes/vpc/collect-data-aws.md";
import AcceptPeeringAws from "@site/static/includes/vpc/accept-peering-aws.md";
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Set up a peering connection between your [Aiven organization VPC](/docs/platform/howto/manage-organization-vpc) and a [Microsoft Azure virtual network](https://learn.microsoft.com/en-us/azure/virtual-network/create-peering-different-subscriptions).

Establishing a peering connection between an Aiven organization VPC and an Azure VNet
requires creating the peering both from the VPC in Aiven and from the VNet in Azure.

To establish the peering from Aiven to Azure, the Aiven Platform's
[Active Directory application object](https://learn.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals)
needs permissions in your Azure subscription. Because the peering is between different AD
tenants (the Aiven AD tenant and your Azure AD tenant), another application object is
needed for your Azure AD tenant to create the peering from Azure to Aiven once granted
permissions to do so.

## Prerequisites

- [Manage organization networking](/docs/platform/concepts/permissions#organization-permissions)
  permissions for the Aiven Platform
- Azure account with at least the application administrator role
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/?view=azure-cli-latest) and,
  optionally, the [Microsoft Azure portal](https://portal.azure.com/#home)
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

   This creates an entity to your AD that can be used to log into multiple
   AD tenants ( `--sign-in-audience AzureADMultipleOrgs` ), but only the
   home tenant (the tenant the app was created in) has the credentials to
   authenticate the app.

   :::note
   Save the `appId` field from the output. It will be referred to as `$user_app_id`.
   :::

1. Create a service principal for your app object to the Azure subscription that the VNet
   to be peered is located in:

   ```bash
   az ad sp create --id $user_app_id
   ```

   This creates a service principal to your subscription that may be given
   permissions to peer your VNet.

   :::note
   Save the `id` field from the JSON output. It will be referred to as `$user_sp_id`.
   :::

1. Set a password for your app object:

   ```bash
   az ad app credential reset --id $user_app_id
   ```

   :::note
   Save the `password` field from the output. It will be referred to as `$user_app_secret`.
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
     `/subscriptions/$user_subscription_id/ resourceGroups/$user_resource_group/providers/Microsoft.Network/virtualNetworks/$user_vnet_name`. It will be referred to as `$user_vnet_id`.

   - Azure Subscription ID (the VNet page in the
     [Azure portal](https://portal.azure.com/#home) > **Essentials** > **Subscription ID**)
     or the part after `/subscriptions/` in the resource ID. It will be referred to as
     `$user_subscription_id`.
   - Resource group name (the VNet page in the [Azure portal](https://portal.azure.com/#home) >
     **Essentials** > **Resource group**) or the `resourceGroup` field in the output. This
     will be referred to as `$user_resource_group`.
   - VNet name (title of the VNet page), or the `name` field from
     the output. It will be referred to as `$user_vnet_name`.

   :::note
   Save all the properties for later.
   :::

1. Grant your service principal permissions to peer.

   The service principal needs to be assigned a role that has the permission for the
   `Microsoft.Network/virtualNetworks/virtualNetworkPeerings/write` action
   on the scope of your VNet. To limit the amount of permissions the application
   object and the service principal have, you can create a custom role with just
   that permission. The built-in network contributor role includes that permission.

   1. Find the id of the role with the required permission:

      ```bash
      az role definition list --name "Network Contributor"
      ```

      The `id` field from the output will be referred to as `$network_contributor_role_id`.

   1. Assign the service principal the network contributor role using
      `$network_contributor_role_id`:

      ```bash
      az role assignment create             \
        --role $network_contributor_role_id \
        --assignee-object-id $user_sp_id    \
        --scope $user_vnet_id
      ```

      This allows your application object to manage the network in the `--scope`.
      Since you control the application object, it may also be given permission for the
      scope of an entire resource group or the whole subscription to allow creating other
      peerings later without assigning the role for each VNet separately.

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
   Save the `id` field from the JSON output. It will be referred to as `$aiven_sp_id`.
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
       "AssignableScopes": ["/subscriptions/'$user_subscription_id'"]
     }'
   ```

   `AssignableScopes` includes your Azure subscription ID to restrict scopes that a role
   assignment can use.

   :::note
   Save the `id` field from the output. It will be referred to as `$aiven_role_id`.
   :::

1. Assign the custom role to the Aiven service principal.

   To give the Aiven application object's service principal permissions to peer with your
   VNet, assign the created role to the Aiven service principal with the scope of your
   VNet:

   ```bash
   az role assignment create           \
     --role $aiven_role_id             \
     --assignee-object-id $aiven_sp_id \
     --scope $user_vnet_id
   ```

1. Find your AD tenant ID:

   - In the [Azure portal](https://portal.azure.com/#home): **Settings** >
     **Directories + subscriptions** > **Directories** > **Directory ID**
   - Using the Azure CLI:

     ```bash
     az account list
     ```

   :::note
   Save the `tenantId` field from the output. It will be referred to as `$user_tenant_id`.
   :::

## Create the peering in Aiven

By creating a peering from the Aiven organization VPC to the VNet in your Azure subscription,
you also create a service principal for the application object
(`--peer-azure-app-id $user_app_id`) and grant it the permission to peer with the Aiven
organization VPC.

The Aiven application object authenticates with your Azure tenant to grant it access to
[the service principal of the Aiven application object](/docs/platform/howto/vnet-peering-azure#aiven-app-object-permissions)
(`--peer-azure-tenant-id $user_tenant_id`).

`$aiven_project_vpc_id` can be found in the [Aiven Console](https://console.aiven.io/) or
using the `avn vpc list` command.

1. Run:

   ```bash
   avn vpc peering-connection create            \
     --project-vpc-id $aiven_project_vpc_id     \
     --peer-cloud-account $user_subscription_id \
     --peer-resource-group $user_resource_group \
     --peer-vpc $user_vnet_name                 \
     --peer-azure-app-id $user_app_id           \
     --peer-azure-tenant-id $user_tenant_id
   ```

   :::note
   Use lower case for arguments starting with `$user_`.
   :::

1. Run the following command until the state changes from `APPROVED` to `PENDING_PEER`:

   ```bash
   avn vpc peering-connection get -v            \
     --project-vpc-id $aiven_project_vpc_id     \
     --peer-cloud-account $user_subscription_id \
     --peer-resource-group $user_resource_group \
     --peer-vpc $user_vnet_name
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

   - `to-tenant-id`: It will be referred to as `$aiven_tenant_id`.
   - `to-network-id`: It will be referred to as `$aiven_vnet_id`.
   :::

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
     -u $user_app_id     \
     -p $user_app_secret \
     --tenant $user_tenant_id
   ```

1. Log in the Azure application object to the Aiven AD tenant:

   ```bash
   az login              \
     --service-principal \
     -u $user_app_id     \
     -p $user_app_secret \
     --tenant $aiven_tenant_id
   ```

   At this point, your application object should have an opened session with your Azure AD
   tenant and the Aiven AD tenant.

1. Create a peering from your Azure VNet to the Aiven organization VPC:

   ```bash
   az network vnet peering create          \
     --name PEERING_NAME_OF_YOUR_CHOICE    \
     --remote-vnet $aiven_vnet_id          \
     --vnet-name $user_vnet_name           \
     --resource-group $user_resource_group \
     --subscription $user_subscription_id  \
     --allow-vnet-access
   ```

   If the peering state in the output is `connected`, the peering is created.

   :::tip
   The command might fail with the following error:

   ```txt
   The client 'RANDOM_UUID' with object id 'RANDOM_UUID' does not have authorization to
   perform action 'Microsoft.Network/virtualNetworks/virtualNetworkPeerings/write' over
   scope '$user_vnet_id'. If access was recently granted, refresh your credentials.
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
   changes from `PENDING_PEER` to `ACTIVE`, at which point Aiven services in the project
   VPC can be reached through the peering.

1. Check if the status of the peering connection is `ACTIVE`:

   ```bash
   avn vpc peering-connection get -v            \
     --project-vpc-id $aiven_project_vpc_id     \
     --peer-cloud-account $user_subscription_id \
     --peer-resource-group $user_resource_group \
     --peer-vpc $user_vnet_name
   ```

## Related pages

- [Manage organization VPCs](/docs/platform/howto/manage-organization-vpc)
- [Set up an organization VPC peering](/docs/platform/howto/list-organization-vpc-peering)
- [Manage project VPCs](/docs/platform/howto/manage-project-vpc)
