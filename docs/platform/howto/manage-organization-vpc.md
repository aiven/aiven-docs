---
title: Manage organization virtual private clouds (VPCs) in Aiven
sidebar_label: Manage organization VPCs
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up or delete an organization-wide VPC in the Aiven Platform. Enable new Aiven projects in the organization VPC or migrate existing Aiven projects to the organization VPC. Access resources within the organization VPC from the public internet.

## Prerequisites

You need the [super admin role](/docs/platform/howto/make-super-admin) to manage an
organization VPC.

## Create an organization VPC

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

</TabItem>
<TabItem value="api" label="Aiven API">

</TabItem>
</Tabs>

<!--
## Enable new projects in an organization VPC

When you create a service, your peered VPC is available as a new
geolocation on the **VPC** tab under **Select service region**. It can
take a few minutes for a newly created VPC to appear for service
deployments.

:::note
The service nodes use firewall rules to allow only connections from
private IP ranges that originate from networks on the other end of VPC
peering connections. You can only deploy services to a VPC if they
belong to the project where that specific VPC was created.
:::
-->

<!--
## Migrate existing projects to an organization VPC

You can migrate any Aiven service to a different VPC:

1. In [Aiven Console](https://console.aiven.io/), open your service and click <ConsoleLabel name="Service settings"/>.
1. In the **Cloud and
   network** section, click <ConsoleLabel name="actions"/> >  **Change cloud or region**.
1. In the **Region** section, select the **VPCs** tab, select the VPC and click **Migrate**.
-->

<!--
## Access organization VPC resources from the public internet

When you move your service to a VPC, access from public networks is
blocked by default. If you switch to public access, a separate endpoint
is created with a public prefix. You can enable public internet access
for your services by following the
[Enable public access in a VPC](/docs/platform/howto/public-access-in-vpc) instructions.

IP filtering is available for a service deployed to a VPC. It's recommended to
[use IP filtering](/docs/platform/howto/restrict-access#restrict-access) when your VPC
service is also exposed to the public internet.

:::note
If your service is within a VPC, the VPC configuration filters incoming traffic before the
IP filter is applied.
:::

Safelisting applies to both internal and external traffic. If you
safelist an external IP address and want to keep traffic flowing with
the internal (peered) connections, safelist the CIDR blocks of the peered networks as well
to avoid disruptions to the service.
-->

## Delete an organization VPC

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

</TabItem>
<TabItem value="api" label="Aiven API">

</TabItem>
</Tabs>

<!--
## Troubleshoot VPC connection issues

Any network changes to VPC peered hosts external from Aiven can cause
issues with routing to your Aiven services hosted in a VPC. In such
case, try to refresh your VPC connections.

:::note
Changes to your VPCs (such as adding a new subnet) can take up to 24
hours to take effect so wait at least 24 hours before refreshing your VPC
connections.
:::

To refresh your VCP connections:

1. In [Aiven Console](https://console.aiven.io/), select <ConsoleLabel name="vpcs"/>.
1. Find the ID of the affected VPC and select it from the **Internal
   ID** column.
1. Select **Refresh VPC connections**.

The platform checks the VPC peering connection and rebuilds the peering
connection state if there are any changes detected.
-->
