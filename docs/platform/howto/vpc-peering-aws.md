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

### Collect data from AWS

<CollectDataAws/>

### Create a peering in Aiven

Create a project VPC peering connection in the [Aiven Console](https://console.aiven.io/):

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your project page.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, select a project VPC to peer.
1. On the **VPC details** page, go to the **VPC peering connection** field and click
   **Add peering connection**.
1. In the **Add peering connection** window:
   1. Enter the following:
      - **AWS account ID**
      - **AWS VPC region**
      - **AWS VPC ID**
   1. Click **Add peering connection**.

This adds a connection with the **Pending peer** status in the
[Aiven Console](https://console.aiven.io/) and a connection pending acceptance in
the [AWS Management Console](https://console.aws.amazon.com).

### Accept the peering request in AWS

<AcceptPeeringAws/>
