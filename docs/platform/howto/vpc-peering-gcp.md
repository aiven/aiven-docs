---
title: Set up a project VPC peering with Google Cloud
sidebar_label: Google Cloud peering
---

Set up a peering connection between your Aiven project VPC and a Google Cloud VPC.

## Prerequisites

- [Manage project networking](/docs/platform/concepts/permissions#project-permissions)
  permissions
- Two VPCs to be peered: a
  [project VPC](/docs/platform/howto/manage-project-vpc)
  in Aiven and a VPC in your Google Cloud account
- Access to the [Aiven Console](https://console.aiven.io/)
- Access to the [Google Cloud console](https://console.cloud.google.com/)

## Set up a VPC peering connection {#set-up-vcp-peering}

1.  Open your the [Google Cloud console](https://console.cloud.google.com/).

1.  Select **VPC Networks** and find the VPC to connect to.

1.  Click the project name, and make note of the **Project ID**.

1.  Under **VPC Network**, make note of the **VPC Network Name**.

1.  In [Aiven Console](https://console.aiven.io), select **VPCs** from
    the sidebar on the **Services** page.

1.  On the **Virtual private clouds** page, select the VPC connection
    that you created.

1.  In the **VPC Peering connections** view, enter the Google Cloud project ID
    (step 3) into the **GCP project ID** field and the exact Google Cloud VPC
    network name (step 4) into the **GCP VPC network name** field. Next,
    select **Add peering connection**.

    This adds a new connection with the **Pending Peer** status.

    :::note
    Select the blue **Pending peer** icon, and make a note of the Aiven
    project ID and the VPC network name.
    :::

1.  In your [Google Cloud console](https://console.cloud.google.com/), go to **VPC** >
    **VPC network peering**, and select **Create peering connection**.

1.  To create a peering connection:

    1.  Enter a name for the peering connection.
    1.  Under **Peered VPC network**, select **In another project**.
    1.  Enter the Aiven project ID and the VPC network name identified
        in step 7 in Aiven Console.

1. Click **Create**.

When the peering is successful, it is active in both
[Aiven Console](https://console.aiven.io) and your
[Google Cloud console](https://console.cloud.google.com/).

## Set up multiple VPC peering connections

To peer multiple Google Cloud VPC networks to your Aiven-managed project VPC, see
[Set up a VPC peering connection](#set-up-vcp-peering), and add desired peering
connections one by one in the [Aiven Console](https://console.aiven.io) > **Services** >
**VPCs** > **VPC Peering connections**.

For the limit on the number of the VPC peering connections allowed, see
the [Google Cloud documentation](https://cloud.google.com/vpc/docs/vpc-peering).
