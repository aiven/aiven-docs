---
title: Manage organization VPC peering with AWS
sidebar_label: Org VPC peering with AWS
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--
Set up or delete an organization-wide VPC in the Aiven Platform. Enable new Aiven projects in the organization VPC or migrate existing Aiven projects to the organization VPC. Access resources within the organization VPC from the public internet.
-->
## Prerequisites

- [Super admin role](/docs/platform/howto/make-super-admin) to manage organization VPCs
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

Create an organization VPC peering connection using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

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

### Accept the peering request in the AWS Console

1. Log in to the [AWS Management Console](https://console.aws.amazon.com), and go to the
   VPC service (**All services** > **Networking & Content Delivery** > **VPC**).
1. Click **Peering connections** in the sidebar.
1. Find and select the peering request from Aiven, and  click **Actions** > **Accept request**.
1. Create or update your AWS route tables to match your Aiven CIDR settings.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

</TabItem>
<TabItem value="api" label="Aiven API">

</TabItem>
</Tabs>

## Delete a peering connection
<!--
:::important

- Before deleting an organization VPC, move all services out of this VPC.
- Once an organization VPC is deleted, the cloud-provider side of the peering connections
  becomes `inactive` or `deleted`.

:::

Delete an organization VPC using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and click **Admin** in the
   top navigation bar.
1. Click <ConsoleLabel name="organizationvpcs"/> in the sidebar.
1. On the **Organization VPCs** page, find a VPC to be deleted and click
   <ConsoleLabel name="actions"/> > <ConsoleLabel name="delete"/>.
1. In the **Confirmation** window, click **Delete VPC**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run

```bash
avn organization vpc delete
  --organization-id $org_id
  --vpc-id 17528694-efb4-4f97-97e8-8bb4c7d31fee
```

</TabItem>
<TabItem value="api" label="Aiven API">

</TabItem>
</Tabs>
-->
## Related pages

- [VPCs in Aiven](/docs/platform/concepts/vpcs)
- [VPC peering in Aiven](/docs/platform/concepts/vpc-peering)
- [Manage organization VPCs](/docs/platform/howto/manage-organization-vpc)
