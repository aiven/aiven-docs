---
title: Manage project virtual private clouds (VPCs) in Aiven
sidebar_label: Manage project VPCs
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Set up or delete a project-wide VPC in your Aiven organization. Deploy or migrate Aiven-managed services to your project VPC. Access resources within the project VPC from the public internet.

## Create a project VPC

To create a [VPC for your Aiven project](/docs/platform/concepts/vpcs#project-vpcs):

1.  Log in to [Aiven Console](https://console.aiven.io/), and click
    <ConsoleLabel name="services"/> > <ConsoleLabel name="vpcs"/>.

1.  Click **Create VPC**.
<!-- vale off -->
    :::note
    **Admin** and **operator**
    [project member roles](/docs/platform/concepts/permissions)
    can create a VPC.
    :::

1.  In the **Create a VPC for this project** window:

    1. Select a cloud provider and region.

    1. Enter the IP range.
       Use an IP range that does not overlap with any networks that you
       want to connect via VPC peering.

       For example, if your own
       networks use the range `11.1.1.0/8`, you can set
       the range for your Aiven project's VPC to
       `191.161.1.0/24`.

       :::note
       Network prefix length must be between 20 and 24 inclusive.
       :::

1.  Click **Create VPC**.

The state of the VPC is shown in the table.

## Deploy new services to a project VPC

When you create a service, your VPC is available as a new
geolocation on the **VPC** tab under **Select service region**. It can
take a few minutes for a newly created VPC to appear for service
deployments.

:::note
The service nodes use firewall rules to allow only connections from
private IP ranges that originate from networks on the other end of VPC
peering connections. You can only deploy services to a VPC if they
belong to the project where that specific VPC was created.
:::

## Delete a project VPC

Before deleting an existing VPC from [Aiven
Console](https://console.aiven.io/), you should move out any active
services from that VPC. To delete a VPC, go to [Aiven
Console](https://console.aiven.io/) > **VPCs**. Find your VPC and
select **Delete** from the meatballs menu for this VPC.

Once the VPC is deleted, the cloud provider side of the peering connection's
becomes `inactive` or `deleted`.

## Migrate a service to a project VPC

You can migrate any Aiven-managed service to a different VPC:

1. In [Aiven Console](https://console.aiven.io/), open your service and click <ConsoleLabel name="Service settings"/>.
1. In the **Cloud and
   network** section, click <ConsoleLabel name="actions"/> >  **Change cloud or region**.
1. In the **Region** section, select the **VPCs** tab, select the VPC and click **Migrate**.

## Access project VPC services from the public internet

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

## Refresh VPC connections

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
