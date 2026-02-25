---
title: Set up marketplace subscriptions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create an AWS, Azure, or Google Cloud marketplace subscription to use as a payment method for Aiven services.

To set up your marketplace subscription as a payment method, first subscribe
to Aiven on the cloud provider's marketplace, then link your subscription to
your Aiven organization. If you already have Aiven services, you can also
[change the billing to a marketplace subscription](/docs/platform/howto/list-marketplace-payments).

<Tabs groupId="group1">
<TabItem value="AWS" label="AWS Marketplace" default>

1. Go to [Aiven Platform on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-fx7pxfq5uaxha).

1. Click **View purchase options**.

1. Click **Subscribe**.

  :::note
  You won't be charged. This only sets up a billing subscription between AWS and Aiven.
  You are charged after creating Aiven services.
  :::

1. Click **Set up your account**. This takes you to the Aiven Console
   to complete the process.

1. On the AWS signup page at Aiven, register or log in.

1. Choose or create an Aiven organization to link the AWS subscription to.

If you have any issues linking Aiven to your AWS subscription,
in the AWS web console find the Aiven subscription and click
**Set up your account**.

:::note
The URL to log into your AWS subscription is [https://console.aws.aiven.io](https://console.aws.aiven.io).
:::

</TabItem>
<TabItem value="Azure" label="Azure Marketplace">

1. Go to
   [Aiven Platform on the Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/aivenltd1590663507662.aiven_managed_database_services?tab=Overview).

1. Click **Get it now**.

1. Select **Recurring billing**.

1. Enter the other details to
   [complete the purchase](https://learn.microsoft.com/en-us/marketplace/purchase-software-appsource).

   :::note
   You won't be charged. This only
   sets up a billing subscription between Azure and Aiven.

   You will be charged after creating Aiven services.
   :::

1. To complete the setup in Aiven Console, click **Configure account now**.

1. On the [Azure signup page at Aiven](https://console.azure.aiven.io/login),
   log in using your Azure console email address.

If you have any issues linking Aiven to your Azure subscription,
in the Azure web console find the Aiven subscription and
click **Open SaaS Account on publisher's site** to complete the subscription process.

:::note
The URL to log into your Azure subscription is [https://console.azure.aiven.io](https://console.azure.aiven.io).
:::

</TabItem>
<TabItem value="Google" label="Google Cloud Marketplace">

1.  Go to
    [Aiven Platform on the Google Cloud Marketplace](https://console.cloud.google.com/marketplace/product/aiven-public/aiven).

1.  Click **Subscribe**.

1.  Select your billing account and click **Subscribe**.

   :::note
   You won't be charged. This only
   sets up a billing subscription between Google Cloud and Aiven.

   You will be charged after creating Aiven services.
   :::

1.  Click **Go to product page**.

1.  To complete the setup on Aiven Console, click **Manage on provider**.

1.  Log in or register for Aiven.



:::note
The URL to log into your Google Cloud subscription is
[console.gcp.aiven.io](https://console.gcp.aiven.io).
:::

Services you create through your subscription are billed per hour and
metering is sent from Aiven to Google. You can view this in the
**Billing** section in Google Cloud. The subscription is shown as **Use of Aiven**
and the following labels show your usage per service:

-   `container_name`: The name of the Aiven project
-   `resource_name`: The name of Aiven service

</TabItem>
</Tabs>
