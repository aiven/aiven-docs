---
title: Set up VPC peering on Google Cloud
---

Once you've created a [VPC on the Aiven platform](manage-vpc-peering), you can set up VPC peering on Google Cloud.

## Set up a VPC peering connection {#set-up-vcp-peering}

1.  Open your Google Cloud Console.

1.  Select **VPC Networks** and find the VPC to connect to.

1.  Click the project name, and make note of the **Project ID**.

1.  Under **VPC Network**, make note of the **VPC Network Name**.

1.  In [Aiven Console](https://console.aiven.io), select **VPCs** from
    the sidebar on the **Services** page.

1.  On the **Virtual private clouds** page, select the VPC connection
    that you created.

1.  In the **VPC Peering connections** view, enter the Google Cloud project ID
    (step 3) into the **Google Cloud project ID** field and the exact Google Cloud VPC
    network name (step 4) into the **Google Cloud VPC network name** field. Next,
    select **Add peering connection**.

    This adds a new connection with the **Pending Peer** status.

    :::note
    Select the blue **Pending peer** icon, and make a note of the Aiven
    project ID and the VPC network name.
    :::

1.  In your Google Cloud Console, go to **VPC** > **VPC network peering**, and
    select **Create peering connection**.

1.  To create a peering connection:

    1.  Enter a name for the peering connection.
    1.  Under **Peered VPC network**, select **In another project**.
    1.  Enter the Aiven project ID and the VPC network name identified
        in step 7 in Aiven Console.

1. Click **Create**.

When the peering is successful, it is active in both [Aiven
Console](https://console.aiven.io) and your Google Cloud Console.

## Set up multiple VPC peering connections

To peer multiple Google Cloud VPC networks to your Aiven-managed project VPC, see
[Set up a VPC peering connection](#set-up-vcp-peering), and add desired peering
connections one by one in the [Aiven Console](https://console.aiven.io) > **Services** >
**VPCs** > **VPC Peering connections**.

For the limit on the number of the VPC peering connections allowed, see the Google Cloud
documentation.
