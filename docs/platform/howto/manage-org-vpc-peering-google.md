---
title: Manage organization VPC peering with Google Cloud
sidebar_label: Google Cloud peering
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import CollectDataGoogle from "@site/static/includes/vpc/collect-data-google.md"
import AcceptPeeringGoogle from "@site/static/includes/vpc/accept-peering-google.md"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up a peering connection between your Aiven project VPC and a Google Cloud VPC.

## Prerequisites

- [Manage organization networking](/docs/platform/concepts/permissions#organization-permissions)
  permissions
- Two VPCs to be peered: an
  [organization VPC](/docs/platform/howto/manage-organization-vpc#create-an-organization-vpc)
  in Aiven and a VPC in your Google Cloud account
- Access to the [Aiven Console](https://console.aiven.io/)
- Access to the [Google Cloud console](https://console.cloud.google.com/)

## Create a peering connection

### Collect data in the Google Cloud console

<CollectDataGoogle/>

### Create a peering in Aiven

Create an organization VPC peering connection in the [Aiven Console](https://console.aiven.io/):

1. Log in to the [Aiven Console](https://console.aiven.io/), and click **Admin** in the
   top navigation bar.
1. Click <ConsoleLabel name="organizationvpcs"/> in the sidebar.
1. On the **Organization VPCs** page, select an organization VPC to peer.
1. On the **Organization VPC details** page, click **Add peering connection**.
1. In the **Add peering connection** window:
   1. Enter the following:
      - **GCP project ID**
      - **GCP VPC network name**
   1. Click **Add peering connection**.

      This adds a connection in the **Pending peer** state to the VPC peering connections
      list in the [Aiven Console](https://console.aiven.io/).
1. Make a note of the **Aiven project ID** and the Aiven **VPC network name**.

### Accept the peering request in the Google Cloud console

<AcceptPeeringGoogle/>

## Set up multiple organization VPC peerings

To peer multiple Google Cloud VPC networks to your Aiven-managed organization VPC,
[add peering connections](/docs/platform/howto/manage-org-vpc-peering-google#create-a-peering-connection)
one by one in the [Aiven Console](https://console.aiven.io).

For the limit on the number of VPC peering connections allowed to a single VPC network,
see the [Google Cloud documentation](https://cloud.google.com/vpc/docs/quota).
