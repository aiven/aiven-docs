---
title: Manage Virtual Private Cloud (VPC) peering
---

import ActionsIcon from "@site/static/images/icons/more.svg";

Virtual Private Cloud (VPC) peering is a method of connecting separate
AWS, Google Cloud, or Azure private networks with each other. This makes
it possible for the virtual machines in the different private networks
to talk to each other directly without going through the public
internet.

## Configure VPC peering {#platform_howto_setup_vpc_peering}

In Aiven, VPC peering is configured as a project and region-specific
setting. This means that all services created and running use the same
VPC peering connection. If necessary, you can use different connections
for VPC peering across multiple projects.

To set up VPC peering for your Aiven project:

1.  Log in to [Aiven Console](https://console.aiven.io/), and select
    **VPCs** from the sidebar on the **Services** page.

1.  Click **Create VPC**.

    :::note
    **Admin** and **operator** user roles can create a VPC. For more
    information about Aiven project members and roles, refer to
    [Organizations, projects, and managing access permissions](/docs/platform/concepts/projects_accounts_access).
    :::

1.  In the **Create a VPC for this project** window:

    1. Select a cloud provider and region from the dropdown list.
    1. Enter the IP range that you want to use for the VPC connection.
       Use an IP range that does not overlap with any networks that you
       want to connect via VPC peering.

       For example, if your own
       networks use the range `11.1.1.0/8`, you can set
       the range for your Aiven project's VPC to
       `191.161.1.0/24`.

1.  Click **Create VPC**.

The state of the VPC is shown in the table.

## Cloud-specific VPC peering instructions

-   [Set up VPC peering on Amazon Web Services (AWS)](/docs/platform/howto/vpc-peering-aws)
-   [Set up VPC peering on Google Cloud Platform (GCP)](/docs/platform/howto/vpc-peering-gcp)
-   [Set up VNet (VPC) peering on Microsoft Azure](/docs/platform/howto/vnet-peering-azure)

:::note
Depending on the cloud provider that you selected for the VPC
connection, you also have to accept a VPC peering connection request or
set up a corresponding VPC peering connection to Aiven.
:::

## Deploy new services to a VPC

When you create a new service, your peered VPC is available as a new
geolocation on the **VPC** tab under **Select service region**. It can
take a few minutes for a newly created VPC to appear for service
deployments.

:::note
The service nodes use firewall rules to allow only connections from
private IP ranges that originate from networks on the other end of VPC
peering connections. You can only deploy services to a VPC if they
belong to the project where that specific VPC was created.
:::

## Delete an existing VPC and VPC peering

Before deleting an existing VPC from [Aiven
Console](https://console.aiven.io/), you should move out any active
services from that VPC. To delete a VPC, navigate to [Aiven
Console](https://console.aiven.io/) > **VPCs**. Find your VPC and
select **Delete** from the meatballs menu for this VPC. Once the VPC is
deleted, the cloud provider side of the peering connection will go to an
inactive or deleted state.

## Migrate a public service to a VPC

You can migrate any Aiven service to a different VPC:

1. In [Aiven Console](https://console.aiven.io/), go to your service.
1. On the **Overview** page of your service, select **Service
   settings** from the sidebar.
1. On the **Service settings** page, in the **Cloud and
   network** section, click <ActionsIcon className="icon"/> **Actions** >  **Change cloud or region**.
1. In the **Migrate service to another cloud** window > the **Region**
   section, select the **VPCs** tab, select the VPC that you want to
   use, and select **Migrate**.

## Access VPC services from the public internet

When you move your service to a VPC, access from public networks is
blocked by default. If you switch to public access, a separate endpoint
is created with a public prefix. You can enable public Internet access
for your services by following the
[Enable public access in a VPC](/docs/platform/howto/public-access-in-vpc) instructions.

IP filtering is available for a service deployed to a VPC where both public and
private access are allowed. We recommend that you use IP filtering when
your VPC service is also exposed to the public internet.

:::note
**Public IP filters** are restricted via VPC. IP filters apply to
publicly accessible endpoints only.
:::

Safelisting applies to both internal and external traffic. If you
safelist an external IP address and want to keep traffic flowing with
the internal (peered) connections, make sure that you safelist the CIDR
blocks of the peered networks as well to avoid disruptions to the
service.

To edit a service IP filtering:

1. Open the **Service settings** page.
1. Click **Cloud and network** > <ActionsIcon className="icon"/> **Actions** > **Set public IP filters**.

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

1. In [Aiven Console](https://console.aiven.io/), select **VPCs**.
1. Find the ID of the affected VPC and select it from the **Internal
   ID** column.
1. Select **Refresh VPC connections**.

The platform checks the VPC peering connection and rebuilds the peering
connection state if there are any changes detected.

For any other issues, open a support ticket from [Aiven
Console](https://console.aiven.io/) to get in touch with the support
team and/or see
[Get support in the Aiven Console](/docs/platform/howto/project-support-center).
