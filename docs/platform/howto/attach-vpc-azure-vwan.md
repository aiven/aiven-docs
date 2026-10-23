---
title: Attach VPCs to Azure Virtual WAN
sidebar_label: Attach VPCs to Azure vWAN
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Attach an Aiven VPC to your [Azure Virtual WAN](https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about) hub so that services in the VPC reach every spoke connected to the hub.

:::important
This feature is in <LimitedBadge/>.
:::

Azure virtual network peering is not transitive: peering an Aiven VPC to your hub virtual
network does not give services in that VPC a route to the spokes behind the hub. Reaching
those spokes requires either user-defined routes on each spoke, which Aiven cannot add to
an Aiven-managed virtual network, or a hub virtual network connection on an Azure Virtual
WAN hub.

A Virtual WAN hub connection attaches the Aiven virtual network to the hub itself. The hub
routes between the Aiven virtual network, your spokes, and any ExpressRoute or VPN
connection terminated on the hub.

## How the attachment works

The Aiven VPC is a virtual network in an Azure subscription owned by Aiven, and your
Virtual WAN hub is in your own subscription and tenant. Creating a hub connection across
tenants requires both sides to act:

1. You create the Virtual WAN and the hub, and collect the hub resource ID.
1. You grant the Aiven application object the permissions needed to connect the Aiven
   virtual network to your hub.
1. Aiven creates the hub virtual network connection for the Aiven virtual network.
1. You confirm route propagation on the hub route table.

## Prerequisites

- [Manage project networking](/docs/platform/concepts/permissions#project-permissions)
  permissions in Aiven
- An [Aiven VPC](/docs/platform/howto/manage-project-vpc) hosted in Azure, in the same
  Azure region as your Virtual WAN hub
- An Azure account with at least the application administrator role in your Azure AD
  tenant
- Tools:
  - [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/)
  - [Aiven Console](https://console.aiven.io/) or [Aiven CLI](/docs/tools/cli)

## Collect the required data

1. Find your Aiven VPC ID.

   Depending on the type of your Aiven VPC, select **Project VPC** or
   **Organization VPC**:

   <Tabs groupId="group1">
   <TabItem value="pj-vpc" label="Project VPC" default>
    - In the [Aiven CLI](/docs/tools/cli), run the [avn vpc list](/docs/tools/cli/vpc)
      command.
    - In the [Aiven Console](https://console.aiven.io/):
      1. Go to your organization, and open your project's page.
      1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
      1. On the **Virtual private clouds** page, select your project VPC.
      1. On the **VPC details** page, go to the **Overview** section, and copy **ID**.
   </TabItem>
   <TabItem value="org-vpc" label="Organization VPC">
    - In the [Aiven CLI](/docs/tools/cli), run the
      [avn organization vpc list](/docs/tools/cli/vpc) command.
    - In the [Aiven Console](https://console.aiven.io/):
      1. Go to your organization, and click **Admin** in the top navigation bar.
      1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
      1. On the **Virtual private clouds** page, select your organization VPC.
      1. On the **VPC details** page, go to the **Overview** section, and copy **ID**.
   </TabItem>
   </Tabs>

   The Aiven VPC ID is referred to as `VPC_ID`.

1. Note your Azure subscription ID, resource group, Virtual WAN name, and hub name.

   These are referred to as `USER_SUBSCRIPTION_ID`, `USER_RESOURCE_GROUP`,
   `USER_VWAN_NAME`, and `USER_HUB_NAME`.

## Create the Virtual WAN hub

1. Log in with an Azure admin account:

   ```bash
   az account clear
   az login
   ```

1. Create the Virtual WAN:

   ```bash
   az network vwan create                        \
     --resource-group USER_RESOURCE_GROUP        \
     --name USER_VWAN_NAME                       \
     --location USER_REGION                      \
     --type Standard
   ```

   :::note
   A Virtual WAN of the `Standard` type is required. The `Basic` type supports only
   site-to-site VPN connections and cannot carry virtual network connections.
   :::

1. Create the hub:

   ```bash
   az network vhub create                        \
     --resource-group USER_RESOURCE_GROUP        \
     --name USER_HUB_NAME                        \
     --vwan USER_VWAN_NAME                       \
     --location USER_REGION                      \
     --address-prefix USER_HUB_CIDR
   ```

   `USER_HUB_CIDR` must not overlap with the address space of the Aiven VPC or with any
   of your spokes.

1. Retrieve the hub resource ID:

   ```bash
   az network vhub show                          \
     --resource-group USER_RESOURCE_GROUP        \
     --name USER_HUB_NAME                        \
     --query id                                  \
     --output tsv
   ```

   The hub resource ID is referred to as `USER_HUB_ID`.

## Grant permissions to Aiven

Because the Aiven virtual network and your hub are in different Azure AD tenants, the
Aiven [application object](https://learn.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals)
needs permission to create the hub connection in your subscription.

Contact Aiven to receive the Aiven application ID for your organization, then assign it
the **Network Contributor** role on the resource group that holds your hub:

```bash
az role assignment create                                      \
  --assignee AIVEN_APP_ID                                      \
  --role "Network Contributor"                                 \
  --scope /subscriptions/USER_SUBSCRIPTION_ID/resourceGroups/USER_RESOURCE_GROUP
```

## Request the attachment

Send `USER_HUB_ID` and `VPC_ID` to Aiven to request the hub connection. Aiven creates the
hub virtual network connection between the Aiven virtual network and your hub.

Creating the connection takes a few minutes. Aiven confirms when the connection reports
the `Succeeded` provisioning state.

## Verify the attachment

1. Confirm that the connection exists and is provisioned:

   ```bash
   az network vhub connection list               \
     --resource-group USER_RESOURCE_GROUP        \
     --vhub-name USER_HUB_NAME                   \
     --output table
   ```

1. Confirm that the hub route table carries the Aiven VPC address space:

   ```bash
   az network vhub route-table show              \
     --resource-group USER_RESOURCE_GROUP        \
     --vhub-name USER_HUB_NAME                   \
     --name defaultRouteTable
   ```

1. Connect to a service in the Aiven VPC from a workload in one of your spokes.

:::note
Network security groups in your spokes are not part of the attachment. Allow traffic to
the Aiven VPC address space in each spoke that needs to reach your services.
:::

## Detach the VPC

To remove the attachment, contact Aiven to delete the hub virtual network connection.
Deleting the hub or the Virtual WAN on your side stops traffic, but leaves the connection
resource in an inconsistent state.

Deleting the Aiven VPC also removes the hub connection.

<RelatedPages/>

- [VPC peering in Aiven](/docs/platform/howto/list-vpc-peering)
- [Manage a project VPC peering with Microsoft Azure](/docs/platform/howto/vnet-peering-azure)
- [Attach VPCs to AWS Transit Gateway](/docs/platform/howto/attach-vpc-aws-tgw)
- [Azure Virtual WAN hub virtual network connections](https://learn.microsoft.com/en-us/azure/virtual-wan/connect-virtual-network-gateway-vwan)
