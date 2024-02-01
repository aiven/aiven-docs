---
title: Add Google as an identity provider
---

Use Google to give your organization users single sign-on (SSO) access
to Aiven.

## Prerequisite steps in Aiven Console

Add Google as an
[identity provider](/docs/platform/howto/saml/add-identity-providers#add-idp-aiven-console) in the Console.

## Configure SAML on Google {#configure-saml-google}

1. Log in to Google Admin console.

1. Go to Menu \> Apps \> Web and mobile apps.

1. Click Add App \> Add custom SAML app.

1. On the App Details page, enter a name for the Aiven profile.

1. Click Continue.

1. On the Google Identity Provider details page, Copy the **SSO URL**,
    **Entity ID** and the **Certificate**. These are needed later for
    the SAML configuration in Aiven Console.

1. Click Continue.

1. In the Service Provider Details window, set the following
    parameters:

    | Parameter        | Value                             |
    | ---------------- | --------------------------------- |
    | `Entity ID`      | `Metadata URL` from Aiven Console |
    | `ACS URL`        | `ACS URL` from Aiven Console      |
    | `Start URL`      | <ul><li><code>https://console.aiven.io/</code> when using the Aiven Console</li> <li><code>https://console.gcp.aiven.io/</code> when using Aiven GCP Marketplace Console</li> <li><code>https://console.aws.aiven.io/</code> when using Aiven AWS Marketplace Console</li></ul>          |
    | `Name ID format` | `EMAIL`                           |
    | `App attributes` | `email`                           |

1. Click Finish.

1. Turn on your SAML app.

## Finish the configuration in Aiven

Go back to the Aiven Console to
[configure the IdP](/docs/platform/howto/saml/add-identity-providers#configure-idp-aiven-console) and complete the setup.
