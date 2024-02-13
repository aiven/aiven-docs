---
title: Set up AWS Marketplace subscriptions
---

Aiven makes its services available through the Amazon AWS Marketplace. You can create a subscription that links the accounts.

First, there are some steps that need to be completed on the AWS
Marketplace page before heading over to the Aiven Console and finishing
the process.

## AWS Marketplace setup

1. Search for _Aiven Managed Database Services_
   on the [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-vylwtm6t2c7fk)
   to list available Aiven services and see how the marketplace subscription works.

1. Click **View purchase options**.

   ![AWS Marketplace purchase options button for Aiven Managed Database Services](/images/platform/howto/aws-marketplace-listing.png)

1. Click **Subscribe**. You
   will NOT be charged by clicking this button; this only sets up a
   billing subscription between AWS and Aiven. You will only be charged
   after deploying Aiven services.

1. Click **Set up your account**. This takes you to the Aiven Console
   to complete the process.

## Aiven account setup

1. After you are redirected to the AWS signup page at Aiven, register or log in.
1. Choose or create an Aiven
   organization to use the AWS subscription for.

To move existing Aiven projects to this AWS subscription, see [Move from Aiven direct billing to AWS Marketplace](/docs/platform/howto/move-to-aws-marketplace-billing).

If you have any issues linking Aiven to your AWS subscription, repeat the process
in the AWS web console by finding the Aiven subscription and clicking
**Set up your account**.

:::note
The URL to log into your AWS subscription is [https://console.aws.aiven.io](https://console.aws.aiven.io).
Do not confuse it with Aiven Console URL: [https://console.aiven.io](https://console.aiven.io).
:::

## Related pages

- [Move from Aiven direct billing to AWS Marketplace](/docs/platform/howto/move-to-aws-marketplace-billing).
