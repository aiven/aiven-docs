---
title: Set up a project VPC peering with Google Cloud
sidebar_label: Google Cloud peering
---

import CollectDataGoogle from "@site/static/includes/vpc/collect-data-google.md";
import AcceptPeeringGoogle from "@site/static/includes/vpc/accept-peering-google.md";
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Set up a peering connection between your Aiven project VPC and a Google Cloud VPC.

## Prerequisites

- [Manage project networking](/docs/platform/concepts/permissions#project-permissions)
  permissions
- Two VPCs to be peered: a
  [project VPC](/docs/platform/howto/manage-project-vpc)
  in Aiven and a VPC in your Google Cloud account
- Access to the [Aiven Console](https://console.aiven.io/)
- Access to the [Google Cloud console](https://console.cloud.google.com/)

## Create a peering connection

### Collect data in the the Google Cloud console

<CollectDataGoogle/>

### Create a peering in Aiven

Create a project VPC peering connection in the [Aiven Console](https://console.aiven.io/):

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your project page.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, select a project VPC to peer.
1. On the **VPC details** page, go to the **VPC peering connection** field and click
   **Add peering connection**.
1. In the **Add peering connection** window:
   1. Enter the following:
      - **GCP project ID**
      - **GCP VPC network name**
   1. Click **Add peering connection**.

      This adds a connection with the **Pending peer** status in the
      [Aiven Console](https://console.aiven.io/).
1. While still on the **VPC details** page, make a note of the **ID** of your Aiven VPC.
1. Click <ConsoleLabel name="service settings"/> in the sidebar, and make a note of your
   **Project name** in the **Project settings** field.

### Accept the peering request in the Google Cloud console

<AcceptPeeringGoogle/>

## Set up multiple project VPC peerings

To peer multiple Google Cloud VPC networks to your Aiven-managed project VPC,
[add peering connections](/docs/platform/howto/vpc-peering-gcp#create-a-peering-connection)
one by one in the [Aiven Console](https://console.aiven.io).

For the limit on the number of VPC peering connections allowed to a single VPC network,
see the [Google Cloud documentation](https://cloud.google.com/vpc/docs/quota).
