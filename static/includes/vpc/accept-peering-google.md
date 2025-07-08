import ConsoleLabel from "@site/src/components/ConsoleIcons";

1. Log in to the [Google Cloud console](https://console.cloud.google.com/), open the
   navigation menu, and click **VIEW ALL PRODUCTS** > **Networking** > **VPC Network** >
   **VPC network peering** > **CREATE PEERING CONNECTION** > **CONTINUE**.
1. Enter a name for the peering connection.
1. Select your Google Cloud VPC network.
1. In the **Peered VPC network** field, select **In another project**.
1. In the **Project ID** field, enter the Aiven project ID collected in the the
   [Aiven Console](https://console.aiven.io), on the **VPC details** page, in the **VPC
   peering connections** section, from **Status details** of the new connection.
1. In the **VPC network name** field, enter the name of your Aiven VPC collected in the the
   [Aiven Console](https://console.aiven.io), on the **VPC details** page, in the **VPC
   peering connections** section, from **Status details** of the new connection.
1. Click **Create**.

As soon as the peering is created, the connection status changes to **Active** both
in the [Aiven Console](https://console.aiven.io) and in the
[Google Cloud console](https://console.cloud.google.com/).
