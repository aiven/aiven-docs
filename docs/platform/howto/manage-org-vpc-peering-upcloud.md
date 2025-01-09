---
title: Manage organization VPC peering with UpCloud
sidebar_label: UpCloud peering
---

import CollectDataUpcloud from "@site/static/includes/vpc/collect-data-upcloud.md";
import AcceptPeeringUpcloud from "@site/static/includes/vpc/accept-peering-upcloud.md";
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Set up a peering connection between your Aiven organization VPC and an UpCloud SDN network.

Establishing a peering connection between an Aiven VPC and an UpCloud SDN network requires
creating the peering both from the VPC in Aiven and from the SDN network in UpCloud.

## Prerequisites

- [Manage organization networking](/docs/platform/concepts/permissions#organization-permissions)
  permissions
- Two networks to be peered: an
  [organization VPC](/docs/platform/howto/manage-organization-vpc#create-an-organization-vpc)
  in Aiven and an SDN network in your UpCloud account
- Access to the [Aiven Console](https://console.aiven.io/)
- Either access to the [UpCloud Control Panel](https://hub.upcloud.com/) or the
  [UpCloud API](https://developers.upcloud.com/1.3/)

## Create a peering connection

### Collect data from UpCloud {#upcloud-uuid}

<CollectDataUpcloud/>

### Create the peering in Aiven

Create an organization VPC peering connection in the [Aiven Console](https://console.aiven.io/):

1. Log in to the [Aiven Console](https://console.aiven.io/), and click **Admin** in the
   top navigation bar.
1. Click <ConsoleLabel name="organizationvpcs"/> in the sidebar.
1. On the **Organization VPCs** page, select an organization VPC to peer.
1. On the **Organization VPC details** page, click **Add peering connection**.
1. In the **Add peering connection** window:
   1. Enter your UpCloud SDN network UUID in the **Peer network ID** field.
   1. Click **Add peering connection**.

This adds a connection in the **Pending peer** state to the VPC peering connections
list in the [Aiven Console](https://console.aiven.io/). At this point, the Aiven VPC
network UUID should be available in the **Aiven network ID** column of the VPC peering
connections table.

### Create the peering in UpCloud

<AcceptPeeringUpcloud/>
