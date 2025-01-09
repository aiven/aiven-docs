---
title: Set up an organization VPC peering with AWS
sidebar_label: AWS peering
---

import CollectDataAws from "@site/static/includes/vpc/collect-data-aws.md";
import AcceptPeeringAws from "@site/static/includes/vpc/accept-peering-aws.md";
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Set up a peering connection between your Aiven organization VPC and an AWS VPC.

## Prerequisites

- [Manage organization networking](/docs/platform/concepts/permissions#organization-permissions)
  permissions
- Two VPCs to be peered: an
  [organization VPC](/docs/platform/howto/manage-organization-vpc#create-an-organization-vpc)
  in Aiven and a VPC in your AWS account
- Access to the [Aiven Console](https://console.aiven.io/)
- Access to the [AWS Management Console](https://console.aws.amazon.com)

## Create a peering connection

### Collect data in the AWS Console

<CollectDataAws/>

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

<AcceptPeeringAws/>
