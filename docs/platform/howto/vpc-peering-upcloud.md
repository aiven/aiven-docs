---
title: Set up a project VPC peering with UpCloud
sidebar_label: UpCloud peering
---

import RelatedPages from "@site/src/components/non-swizzled/RelatedPages"
import CollectDataUpcloud from "@site/static/includes/vpc/collect-data-upcloud.md";
import AcceptPeeringUpcloud from "@site/static/includes/vpc/accept-peering-upcloud.md";
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Set up a peering connection between your Aiven project VPC and an UpCloud SDN network to enable traffic between them.

Establishing a peering connection between an Aiven VPC and an UpCloud SDN network requires
creating the peering both from the VPC in Aiven and from the SDN network in UpCloud.

-   To set up a peering from Aiven to UpCloud, you can use [Aiven
    Console](https://console.aiven.io/) to create a VPC for your Aiven
    project and add a peering connection to UpCloud. For this purpose,
    identify the UpCloud SDN network UUID first.
-   To set up a peering from UpCloud to Aiven, you can use [UpCloud
    API](https://developers.upcloud.com/1.3/). Since the API takes UUIDs
    of both networks as attributes, identify the network
    UUIDs before calling the API.

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

<CollectDataUpcloud/>

### Create the peering in Aiven {#avn-uuid}

Create a project VPC peering connection in the [Aiven Console](https://console.aiven.io/):

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your project page.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, select a project VPC to peer.
1. On the **VPC peering connections** page:
   1. Enter your UpCloud SDN network UUID in the **Peer network ID** field.
   1. Click **Add peering connection**.

This adds a connection in the **Pending peer** state to the VPC peering connections
list in the [Aiven Console](https://console.aiven.io/). At this point, the Aiven VPC
network UUID should be available in the **Aiven network ID** column of the VPC peering
connections table.

### Create the peering in UpCloud

<AcceptPeeringUpcloud/>

## Renew a DHCP lease

You only need to take this step if any of your VMs has been created
before setting up the network peering. In this case, refresh
the Dynamic Host Configuration Protocol (DHCP) lease for a relevant
network interface to get new routes.

:::warning
A peering connection between an Aiven VPC and VMs created before the
peering setup won't work unless you refresh the DHCP lease for a
relevant network interface.
:::

To refresh the DHCP lease for a network interface, run the following
commands:

1.  To clear the existing DHCP lease

    ```bash
    dhclient -r NETWORK_INTERFACE_NAME
    ```

1.  To request a renewal of the DHCP lease

    ```bash
    dhclient NETWORK_INTERFACE_NAME
    ```

<RelatedPages/>

-   [Manage Virtual Private Cloud (VPC) peering](/docs/platform/howto/manage-project-vpc)
-   [Set up Virtual Private Cloud (VPC) peering on AWS](/docs/platform/howto/vpc-peering-aws)
-   [Set up Virtual Private Cloud (VPC) peering on Google Cloud Platform (GCP)](/docs/platform/howto/vpc-peering-gcp)
-   [Set up Azure virtual network peering](/docs/platform/howto/vnet-peering-azure)
