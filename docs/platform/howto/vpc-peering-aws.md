---
title: Set up a project VPC peering with AWS
sidebar_label: AWS peering
---

import CollectDataAws from "@site/static/includes/vpc/collect-data-aws.md"
import AcceptPeeringAws from "@site/static/includes/vpc/accept-peering-aws.md"
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Set up a peering connection between your Aiven project VPC and an AWS VPC.

## Prerequisites

- [Manage project networking](/docs/platform/concepts/permissions#project-permissions)
  permissions
- Two VPCs to be peered: a
  [project VPC](/docs/platform/howto/manage-project-vpc)
  in Aiven and a VPC in your AWS account
- Access to the [Aiven Console](https://console.aiven.io/)
- Access to the [AWS Management Console](https://console.aws.amazon.com)

## Create a peering connection

### Collect data in the AWS Console

<CollectDataAws/>

### Create a peering in Aiven

Create a project VPC peering connection in the [Aiven Console](https://console.aiven.io/):

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your project page.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, select a project VPC to peer.
1. On the **VPC peering connections** page:
   1. Enter the following:
      - **AWS account ID**
      - **AWS VPC region**
      - **AWS VPC ID**
   1. Click **Add peering connection**.

This adds a connection pending acceptance in your AWS account.

### Accept the peering request in the AWS Console

<AcceptPeeringAws/>
