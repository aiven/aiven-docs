---
title: Set up a project VPC peering with UpCloud
sidebar_label: UpCloud peering
---

import RelatedPages from "@site/src/components/non-swizzled/RelatedPages"
import CollectDataUpcloud from "@site/static/includes/vpc/collect-data-upcloud.md";
import AcceptPeeringUpcloud from "@site/static/includes/vpc/accept-peering-upcloud.md";
import RenewLeaseUpcloud from "@site/static/includes/vpc/renew-lease-upcloud.md";
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Set up a peering connection between your Aiven project VPC and an UpCloud SDN network.

Establishing a peering connection between an Aiven VPC and an UpCloud SDN network requires
creating the peering both from the VPC in Aiven and from the SDN network in UpCloud.

- Setting up the peering from Aiven to UpCloud in the
  [Aiven Console](https://console.aiven.io/) requires the UpCloud SDN network UUID.
  To find it, you can use either the [UpCloud Control Panel](https://hub.upcloud.com/)
  or the [UpCloud API](https://developers.upcloud.com/1.3/).
- Setting up the peering from UpCloud to Aiven is possible either in the
  [UpCloud Control Panel](https://hub.upcloud.com/) or through the
  [UpCloud API](https://developers.upcloud.com/1.3/).

## Limitations

-   Peering connections are only supported between networks of type
    `private`.
-   You cannot initiate a peering between two networks with overlapping
    CIDR ranges.
-   The networks to be peered need to be in the same cloud zone.

:::important
Make sure you only create peerings between accounts, platforms, or
networks you trust. There is no limit on what traffic can flow between
the peered components. The server firewall has no effect on `private`
type networks.
:::

## Prerequisites

- [Manage project networking](/docs/platform/concepts/permissions#project-permissions)
  permissions
- Two networks to be peered: a
  [project VPC](/docs/platform/howto/manage-project-vpc)
  in Aiven and an SDN network in your UpCloud account
- Access to the [Aiven Console](https://console.aiven.io/)
- Either access to the [UpCloud Control Panel](https://hub.upcloud.com/) or the
  [UpCloud API](https://developers.upcloud.com/1.3/)

## Create a peering connection

### Collect data from UpCloud

To [create a peering in Aiven](/docs/platform/howto/vpc-peering-upcloud#create-a-peering-in-aiven),
first collect required data from UpCloud using either the
[UpCloud Control Panel](https://hub.upcloud.com/) or the
[UpCloud API](https://developers.upcloud.com/1.3/):

<CollectDataUpcloud/>

### Create the peering in Aiven

Create a project VPC peering connection in the [Aiven Console](https://console.aiven.io/)
using the [data collected from UpCloud](/docs/platform/howto/vpc-peering-upcloud#collect-data-from-upcloud):

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your project page.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, select a project VPC to peer.
1. On the **VPC details** page, go to the **VPC peering connection** field and click
   **Add peering connection**.
1. In the **Add peering connection** window:
   1. Enter your UpCloud SDN network UUID in the **UpCloud Network UUID** field.
   1. Click **Add peering connection**.

      This adds a connection with the **Pending peer** status in the
      [Aiven Console](https://console.aiven.io/).

1. While still on the **VPC details** page, make a note of the ID of your Aiven VPC
   available in the **Aiven network ID** column of the VPC peering connections table.

### Create the peering in UpCloud

Use the Aiven VPC network ID
[collected in the Aiven Console](/docs/platform/howto/vpc-peering-upcloud#create-the-peering-in-aiven)
to create the VPC peering connection in UpCloud either in the
[UpCloud Control Panel](https://hub.upcloud.com/) or through the
[UpCloud API](https://developers.upcloud.com/1.3/):

<AcceptPeeringUpcloud/>

## Renew a DHCP lease

<RenewLeaseUpcloud/>

<RelatedPages/>

-   [Manage Virtual Private Cloud (VPC) peering](/docs/platform/howto/manage-project-vpc)
-   [Set up Virtual Private Cloud (VPC) peering on AWS](/docs/platform/howto/vpc-peering-aws)
-   [Set up Virtual Private Cloud (VPC) peering on Google Cloud Platform (GCP)](/docs/platform/howto/vpc-peering-gcp)
-   [Set up Azure virtual network peering](/docs/platform/howto/vnet-peering-azure)
