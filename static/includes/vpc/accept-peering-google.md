import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

1. Log in to the [Google Cloud console](https://console.cloud.google.com/), open the
   navigation menu, and click **VIEW ALL PRODUCTS** > **Networking** > **VPC Network** >
   **VPC network peering** > **CREATE PEERING CONNECTION** > **CONTINUE**.
1. Enter a name for the peering connection.
1. Select your VPC network.
1. In the **Peered VPC network** field, select **In another project**.
1. Enter the Aiven **Project ID** and the Aiven **VPC network name**.
1. Click **Create**.

When the peering is successful, it is active both
in the [Aiven Console](https://console.aiven.io) and in the
[Google Cloud console](https://console.cloud.google.com/).
