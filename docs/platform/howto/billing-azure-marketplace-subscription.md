---
title: Set up Azure Marketplace subscriptions
---

Aiven makes its services available through the Microsoft Azure Marketplace, you can create a subscription that links the accounts.

## Azure Marketplace setup

1. Search for _Aiven Managed Database Services_ on the [Azure
   Marketplace](https://portal.azure.com/#view/Microsoft_Azure_Marketplace/MarketplaceOffersBlade/selectedMenuItemId/home).
   to list available Aiven services and see how the marketplace subscription works.

1. Click **Subscribe**.

   ![Azure Marketplace listing tile for Aiven Managed Database Services](/images/platform/howto/azure-marketplace-listing.png)

1. Select your desired Azure subscription resource group to organize
   your resources, give the subscription a name, and make sure that
   **Recurring billing** is turned on. There is only one plan available
   because the costs are managed by Aiven based on what you use
   during the month.
1. Progress to the **Review + subscribe** screen, then read and agree
   to the terms of use.
1. Click **Subscribe**.

   :::important
   You won't be charged by clicking this button. This only
   sets up a billing subscription between Azure and Aiven.

   You will be charged after deploying Aiven services.
   :::

1. A message saying _Your SaaS subscription is
   in progress_ appears. This takes a few minutes to complete.
1. When you see the message _Thank you for your order. Configure the
   SaaS service to complete the purchase_, click the **Configure
   account now** to go the Aiven website to complete the process.

## Aiven account setup

1. After you are redirected to the [Azure signup page at Aiven](https://console.azure.aiven.io/login),
   enter your Azure console email address to log in to the account.
1. After entering your email address, you will be authenticated via Azure single sign-on
   and redirected to the Aiven Console.
1. Check whether you have received an email to activate your new subscription.
   Click **Activate now** to join your Aiven account to your Azure account.

:::note
The URL to log into your Azure subscription is [https://console.azure.aiven.io](https://console.aws.aiven.io).
Do not confuse it with Aiven Console URL: [https://console.aiven.io](https://console.aiven.io).
:::

When you list the Aiven subscriptions on the Azure SaaS resource, click **Open
SaaS Account on publisher's site** to complete the subscription process if
anything goes wrong during the previous steps.
