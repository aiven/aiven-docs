---
title: Manage organization VPC peering in Aiven
sidebar_label: Manage organization VPC peering
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--
Set up or delete an organization-wide VPC in the Aiven Platform. Enable new Aiven projects in the organization VPC or migrate existing Aiven projects to the organization VPC. Access resources within the organization VPC from the public internet.
-->
## Prerequisites
<!--
You need the [super admin role](/docs/platform/howto/make-super-admin) to manage an
organization VPC.
-->
## Create a peering connection
<!--
Create an organization VPC using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and click **Admin** in the
   top navigation bar.
1. Click <ConsoleLabel name="organizationvpcs"/> in the sidebar and **Create VPC** on the
   **Organization VPCs** page.
1. In the **Create VPC** window:
   1. Select a cloud provider.
   1. Select a cloud region.
   1. Specify an IP range.

      - Use an IP range that does not overlap with any networks to be connected via VPC
        peering. For example, if your own networks use the range `11.1.1.0/8`, you can set
        the range for your Aiven project's VPC to `191.161.1.0/24`.
      - Use a network prefix that is 20-24 character long.

   1. Click **Create VPC**.

Your new organization VPC is ready to use as soon as its status visible on the
**Organization VPCs** page changes to **Active**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run

```bash
avn organization vpc create
  --cloud aws-eu-west-1
  --network-cidr 10.0.0.0/24
  --organization-id "$org_id"
```

Check if the VPC has been created:

```bash
avn organization vpc list
  --organization-id "$org_id"
```

</TabItem>
<TabItem value="api" label="Aiven API">

</TabItem>
</Tabs>
-->
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
