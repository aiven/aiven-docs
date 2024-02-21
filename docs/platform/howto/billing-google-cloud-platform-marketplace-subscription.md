---
title: Set up Google Cloud Marketplace subscriptions
---

Aiven makes its services available through the Google Cloud Marketplace on Google Cloud Platform (GCP). you can create a subscription that links the accounts.

## Google Cloud Marketplace setup

1.  Go to [Aiven Managed Database Services on the Google Cloud
    Marketplace](https://console.cloud.google.com/marketplace/product/aiven-public/aiven).
    to list available Aiven services and see how the marketplace subscription works.
1.  Click **Subscribe**.
1.  Select your desired billing account, then read and agree to the
    terms and conditions.
1.  Click **Subscribe**.

    :::important
     You won't be charged by clicking this button. This only
     sets up a billing subscription between GCP and Aiven.

     You will be charged after deploying Aiven services.
     :::

1.  A message saying _Your order request has been
    sent to Aiven_. Click **Go to product page**.
1.  Click **Manage on provider** to go to the Aiven console to complete the process.

    ![Google Cloud Marketplace page after subscribing, showing the **Manage on provider** button](/images/platform/howto/gcp-manage-on-provider.png)

## Aiven account setup

1.  You should now be on a signup page at Aiven, asking you for your
    email address to create a new account.
1.  After entering your email address, you will be sent an email to
    confirm your registration. Click on the link.
1.  You can now proceed to the [Aiven console for
    GCP](https://console.gcp.aiven.io/), where you can manage your Aiven
    services as normal.

![The GCP version of the Aiven web console](/images/platform/howto/gcp-console.png)

:::note

- The URL to log into your AWS subscription is [console.gcp.aiven.io](https://console.gcp.aiven.io).
  Do not confuse it with Aiven Console URL: [console.aiven.io](https://console.aiven.io).

- If you have an existing Aiven account, create a new Aiven GCP account using the
  Aiven GCP console. When coming back to Aiven in the future, use
  [https://console.gcp.aiven.io](https://console.gcp.aiven.io) to log in.

- When you view the Aiven page on GCP Marketplace,
  a new **MANAGE ON PROVIDER** is available. It takes
  you to the Aiven GCP Console at [https://console.gcp.aiven.io](https://console.gcp.aiven.io).

:::

## Billing

Services you deploy through your subscription are billed per hour and
metering is sent from Aiven to Google. You can view this in the
**Billing** section in Google Cloud.

The subscription is shown as **Use of Aiven** and the following labels
show your usage per service:

-   `container_name`: The name of the Aiven project
-   `resource_name`: The name of Aiven service

![Sample view of Google cloud billing page](/images/platform/howto/gcp-billing.png)
