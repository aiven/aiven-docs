---
title: Add Google as an identity provider
sidebar_label: Google
---
<!-- vale off -->
import IdPStep1 from "@site/static/includes/idp-step1.md";
import IdPStep3 from "@site/static/includes/idp-step3.md"

<!-- vale on -->

Use Google to give your organization users single sign-on (SSO) access to Aiven.

<IdPStep1/>

## Step 2: Configure SAML on Google

1. Log in to Google Admin console.

1. Go to **Menu** > **Apps** > **Web and mobile apps**.

1. Click **Add App** > **Add custom SAML app**.

1. On the **App Details** page, enter a name for the Aiven profile.

1. Click **Continue**.

1. On the **Google Identity Provider** details page, copy the **SSO URL**,
    **Entity ID**, and the **Certificate**. You'll use these for
    the SAML configuration in Aiven Console.

1. Click **Continue**.

1. On the **Service Provider Details** page, set the following
    parameters:

    |   Parameter    |                                                                                                      Value                                                                                                      |
    | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Entity ID      | **Metadata URL** from Aiven Console                                                                                                                                                                             |
    | ACS URL        | **ACS URL** from Aiven Console                                                                                                                                                                                  |
    | Start URL      | <ul><li>https://console.aiven.io/ for Aiven Console</li> <li>https://console.gcp.aiven.io/ for Aiven GCP Marketplace Console</li> <li>https://console.aws.aiven.io/ for Aiven AWS Marketplace Console</li></ul> |
    | Name ID format | EMAIL                                                                                                                                                                                                           |
    | App attributes | email                                                                                                                                                                                                           |

1. Click **Finish**.

1. Turn on your SAML app.

## Step 3: Finish the configuration in Aiven

Go back to the Aiven Console to complete setting up the IdP. If you saved your IdP as a
draft, you can open the settings by clicking the name of the IdP.

1. In the **IDP URL** field, enter the **SSO URL** from Google.
1. In the **Entity ID** field, enter the **Entity ID** from Google.
<IdPStep3/>
