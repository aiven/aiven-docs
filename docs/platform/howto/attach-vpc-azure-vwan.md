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

An Azure Virtual WAN hub routes traffic between every network connected to it. Attaching
the Aiven virtual network to the hub lets services in the Aiven VPC reach your spokes, and
any ExpressRoute or VPN connection that terminates on the hub.

Use a hub connection when your services need to reach more than one of your networks.
Virtual network peering is not transitive, so a peering to your hub virtual network does
not carry routes to the spokes behind it.

## How the attachment works

The Aiven VPC is a virtual network in an Azure subscription owned by Aiven, and your
Virtual WAN hub is in your own subscription and Microsoft Entra tenant. The hub
connection is a resource on your hub that points at the Aiven virtual network, so you
create it, and Aiven authorizes your hub to attach that virtual network:

1. You create the Virtual WAN, the hub, and the hub connections for your own spokes.
1. You send your hub details to Aiven and receive the resource ID of the Aiven virtual
   network, along with the authorization your hub needs to attach it.
1. You create the hub connection to the Aiven virtual network.
1. You confirm the connection and test reachability from one of your spokes.

:::important
Azure requires the hub administrator to hold the
`Microsoft.Network/virtualNetworks/peer/action` permission on the remote virtual network.
That virtual network belongs to Aiven, so Aiven grants this authorization as part of the
request. Do not expect the connection to succeed before Aiven confirms it is in place.
:::

## Prerequisites

- [Manage project networking](/docs/platform/concepts/permissions#project-permissions)
  permissions in Aiven
- An [Aiven VPC](/docs/platform/howto/manage-project-vpc) hosted in Azure, in the same
  Azure region as your Virtual WAN hub
- Permissions to create Virtual WAN resources in your Azure subscription
- Tools:
  - [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/) with the `virtual-wan`
    extension
  - [Aiven Console](https://console.aiven.io/) or [Aiven CLI](/docs/tools/cli)

:::note
Virtual WAN is not available in every Azure region on every subscription. Before you
plan the attachment, confirm that your subscription can create a Virtual WAN in the
region of your Aiven VPC, and create the hub, your spokes, and the Aiven VPC in that same
region.
:::

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
   az group create -n USER_RESOURCE_GROUP -l USER_REGION

   az network vwan create                        \
     --resource-group USER_RESOURCE_GROUP        \
     --name USER_VWAN_NAME                       \
     --location USER_REGION
   ```

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

1. Connect your own spoke virtual networks to the hub:

   ```bash
   az network vhub connection create             \
     --resource-group USER_RESOURCE_GROUP        \
     --vhub-name USER_HUB_NAME                   \
     --name USER_SPOKE_CONNECTION               \
     --remote-vnet USER_SPOKE_VNET_ID            \
     --internet-security false
   ```

1. Retrieve the hub resource ID:

   ```bash
   az network vhub show                          \
     --resource-group USER_RESOURCE_GROUP        \
     --name USER_HUB_NAME                        \
     --query id                                  \
     --output tsv
   ```

   The hub resource ID is referred to as `USER_HUB_ID`.

## Request the attachment

Send `USER_HUB_ID` and `VPC_ID` to Aiven to request the attachment.

Aiven authorizes your hub to attach the Aiven virtual network and returns the resource ID
of that virtual network, which has the following form:

```text
/subscriptions/AIVEN_SUBSCRIPTION_ID/resourceGroups/AIVEN_NETWORK_NAME/providers/Microsoft.Network/virtualNetworks/AIVEN_NETWORK_NAME
```

The Aiven virtual network resource ID is referred to as `AIVEN_VNET_ID`.

## Create the hub connection

Once Aiven confirms the authorization, create the hub connection to the Aiven virtual
network:

```bash
az network vhub connection create             \
  --resource-group USER_RESOURCE_GROUP        \
  --vhub-name USER_HUB_NAME                   \
  --name AIVEN_CONNECTION_NAME                \
  --remote-vnet AIVEN_VNET_ID                 \
  --internet-security false
```

Creating the connection takes a few minutes. It is ready when the provisioning state
reads `Succeeded`.

## Verify the attachment

1. Confirm that the connection is provisioned:

   ```bash
   az network vhub connection list               \
     --resource-group USER_RESOURCE_GROUP        \
     --vhub-name USER_HUB_NAME                   \
     --output table
   ```

   The connection to the Aiven virtual network reads `Succeeded`.

1. Confirm that the hub route table carries the Aiven VPC address space:

   ```bash
   az network vhub route-table show              \
     --resource-group USER_RESOURCE_GROUP        \
     --vhub-name USER_HUB_NAME                   \
     --name defaultRouteTable
   ```

1. From a workload in one of your spokes, confirm that the Aiven VPC address space is
   reachable over the hub, then connect to a service in the Aiven VPC.

:::important
A hub connection routes traffic, it does not open service access. To reach a service in
the Aiven VPC on its service port, add the address space of your spokes to the
[allowed IP addresses](/docs/platform/howto/list-vpc-peering) of that service. Also allow
the Aiven VPC address space in the network security groups of your spokes.
:::

## Detach the VPC

To remove the attachment, delete the hub connection to the Aiven virtual network:

```bash
az network vhub connection delete              \
  --resource-group USER_RESOURCE_GROUP         \
  --vhub-name USER_HUB_NAME                    \
  --name AIVEN_CONNECTION_NAME                 \
  --yes
```

Tell Aiven once the connection is removed, so that the authorization on the Aiven virtual
network can be revoked.

Deleting the Aiven VPC also removes the hub connection.

<RelatedPages/>

- [VPC peering in Aiven](/docs/platform/howto/list-vpc-peering)
- [Manage a project VPC peering with Microsoft Azure](/docs/platform/howto/vnet-peering-azure)
- [Attach VPCs to AWS Transit Gateway](/docs/platform/howto/attach-vpc-aws-tgw)
- [Azure Virtual WAN hub virtual network connections](https://learn.microsoft.com/en-us/azure/virtual-wan/connect-virtual-network-gateway-vwan)
