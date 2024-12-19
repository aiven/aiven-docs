---
title: Set up an organization VPC peering with AWS
sidebar_label: Peer org VPCs with AWS
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Set up a peering connection between your Aiven project VPC and an AWS VPC.

## Prerequisites

- [Organization admin role](/docs/platform/concepts/permissions#organization-roles-and-permissions) to manage organization VPCs
- Two VPCs to be peered: an
  [organization VPC](/docs/platform/howto/manage-organization-vpc#create-an-organization-vpc)
  in Aiven and a VPC in your AWS account
- One of the following tools for VPC peering operations:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)

## Create a peering connection

### Collect data in the AWS Console

1. Log in to the [AWS Management Console](https://console.aws.amazon.com) and go to your
   profile information.
1. Find and save your account ID.
1. Go to the VPC service: **All services** > **Networking & Content Delivery** > **VPC**
   \> **Your VPCs**.
1. Find a VPC to peer and save its ID.
1. Find and save a cloud region that the VPC is located in.

### Create a peering in Aiven

Create an organization VPC peering connection in the [Aiven Console](https://console.aiven.io/):

1. Log in to the [Aiven Console](https://console.aiven.io/), and click **Admin** in the
   top navigation bar.
1. Click <ConsoleLabel name="organizationvpcs"/> in the sidebar.
1. On the **Organization VPCs** page, select an organization VPC to peer.
1. On the **Organization VPC details** page, click **Add peering connection**.
1. In the **Add peering connection** window:
   1. Enter the following:
      - **AWS account ID**
      - **AWS VPC region**
      - **AWS VPC ID**
   1. Click **Add peering connection**.

This adds a connection pending acceptance in your AWS account.

### Accept the peering request in the AWS Console

1. Log in to the [AWS Management Console](https://console.aws.amazon.com), and go to the
   VPC service (**All services** > **Networking & Content Delivery** > **VPC**).
1. Click **Peering connections** in the sidebar.
1. Find and select the peering request from Aiven, and  click **Actions** > **Accept request**.
1. Create or update your [AWS route
    tables](https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-routing) to match
    your Aiven CIDR settings.

When you accept the request in your AWS account, the peering connection gets
activated in the [Aiven Console](https://console.aiven.io/).
