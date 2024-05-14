---
title: Set up marketplace subscriptions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven makes its services available through the various Marketplaces and you can create a subscription that links the accounts.

## Marketplace setup

<Tabs groupId="group1">
<TabItem value="AWS" label="AWS Marketplace" default>

1. Go to [Aiven Managed Database on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-fx7pxfq5uaxha).

1. Click **View purchase options**.

1. Click **Subscribe**. You
   will NOT be charged. This only sets up a
   billing subscription between AWS and Aiven. You will only be charged
   after deploying Aiven services.

1. Click **Set up your account**. This takes you to the Aiven Console
   to complete the process.

</TabItem>
<TabItem value="Azure" label="Azure Marketplace">

1. Go to [Aiven Managed Database Services on the Azure
   Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/aivenltd1590663507662.aiven_managed_database_services?tab=Overview).

1. Click **Subscribe**.

1. Select your desired Azure subscription resource group to organize
   your resources, give the subscription a name, and make sure that
   **Recurring billing** is turned on. There is only one plan available
   because the costs are managed by Aiven based on what you use
   during the month.
1. Read and agree to the terms of use.
1. Click **Subscribe**.

   :::important
   You won't be charged. This only
   sets up a billing subscription between Azure and Aiven.

   You will be charged after deploying Aiven services.
   :::

1. A message saying _Your SaaS subscription is
   in progress_ appears. This takes a few minutes to complete.
1. When you see the message _Thank you for your order. Configure the
   SaaS service to complete the purchase_, click the **Configure
   account now** to go the Aiven website to complete the process.

</TabItem>
<TabItem value="Google" label="Google Cloud Marketplace">

1.  Go to [Aiven Managed Database and Streaming Services on the Google Cloud
    Marketplace](https://console.cloud.google.com/marketplace/product/aiven-public/aiven).
1.  Click **Subscribe**.
1.  Select your desired billing account and click **Subscribe**.

    :::important
     You won't be charged. This only
     sets up a billing subscription between GCP and Aiven.

     You will be charged after deploying Aiven services.
     :::

1.  A message saying _Your order request has been
    sent to Aiven_. Click **Go to product page**.
1.  Click **Manage on provider** to go to the Aiven console to complete the process.

</TabItem>
</Tabs>

## Aiven account setup

<Tabs groupId="group1">
<TabItem value="AWS" label="AWS Marketplace">

1. After you are redirected to the AWS signup page at Aiven, register or log in.
1. Choose or create an Aiven
   organization to use the AWS subscription for.

To move existing Aiven projects to this AWS subscription, see [Move from Aiven direct billing to AWS Marketplace](/docs/platform/howto/list-marketplace-payments).

If you have any issues linking Aiven to your AWS subscription, repeat the process
in the AWS web console by finding the Aiven subscription and clicking
**Set up your account**.

:::note
The URL to log into your AWS subscription is [https://console.aws.aiven.io](https://console.aws.aiven.io).
Do not confuse it with Aiven Console URL: [https://console.aiven.io](https://console.aiven.io).
:::

</TabItem>
<TabItem value="Azure" label="Azure Marketplace">

1. After you are redirected to the [Azure signup page at Aiven](https://console.azure.aiven.io/login),
   enter your Azure console email address to log in to the account.
1. After entering your email address, you will be authenticated via Azure single sign-on
   and redirected to the Aiven Console.
1. Check whether you have received an email to activate your new subscription.
   Click **Activate now** to join your Aiven account to your Azure account.

:::note
The URL to log into your Azure subscription is [https://console.azure.aiven.io](https://console.azure.aiven.io).
Do not confuse it with Aiven Console URL: [https://console.aiven.io](https://console.aiven.io).
:::

When you list the Aiven subscriptions on the Azure SaaS resource, click **Open
SaaS Account on publisher's site** to complete the subscription process if
anything goes wrong during the previous steps.

</TabItem>
<TabItem value="Google" label="Google Cloud Marketplace">

1.  You should now be on a signup page at Aiven, asking you for your
    email address to create an account.
1.  After entering your email address, you will be sent an email to
    confirm your registration. Click the link.
1.  You can now proceed to the [Aiven console for
    GCP](https://console.gcp.aiven.io/), where you can manage your Aiven
    services as normal.

:::note

- The URL to log into your GCP subscription is [console.gcp.aiven.io](https://console.gcp.aiven.io).
  Do not confuse it with Aiven Console URL: [console.aiven.io](https://console.aiven.io).

- If you have an existing Aiven account, create an Aiven GCP account using the
  Aiven GCP console. When coming back to Aiven in the future, use
  [https://console.gcp.aiven.io](https://console.gcp.aiven.io) to log in.

- When you view the Aiven page on GCP Marketplace,
  a new **MANAGE ON PROVIDER** is available. It takes
  you to the Aiven GCP Console at [https://console.gcp.aiven.io](https://console.gcp.aiven.io).

:::

Services you deploy through your subscription are billed per hour and
metering is sent from Aiven to Google. You can view this in the
**Billing** section in Google Cloud.

The subscription is shown as **Use of Aiven** and the following labels
show your usage per service:

-   `container_name`: The name of the Aiven project
-   `resource_name`: The name of Aiven service

</TabItem>
</Tabs>

## Related pages

- [Use marketplace subscriptions to pay for Aiven services](/docs/platform/howto/list-marketplace-payments)
