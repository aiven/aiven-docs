---
title: Add SAML identity providers
sidebar_label: Add identity providers
keywords: [SAML, SSO]
---
<!-- vale off -->
import LimitedBadge from "@site/src/components/non-swizzled/Badges/LimitedBadge";
import IdPStep1 from "@site/static/includes/idp-step1.md";
import IdPStep3 from "@site/static/includes/idp-step3.md"

<!-- vale on -->

You can give your organization users access to Aiven through identity providers (IdPs) that support SAML.

The following are general steps for setting up single sign-on with an IdP. Setup
instructions are also available for these specific providers:

-   [Auth0](/docs/platform/howto/saml/add-auth0-idp)
-   [FusionAuth](/docs/platform/howto/saml/add-fusionauth-idp)
-   [Google](/docs/platform/howto/saml/add-google-idp)
-   [JumpCloud](/docs/platform/howto/saml/add-jumpcloud-idp)
-   [Microsoft Azure Active Directory](/docs/platform/howto/saml/add-azure-idp)
-   [Okta](/docs/platform/howto/saml/add-okta-idp)
-   [OneLogin](/docs/platform/howto/saml/add-onelogin-idp)

For all IdPs, Aiven recommends following [security best practices](/docs/platform/howto/list-identity-providers).

<IdPStep1/>

## Step 2: Configure SAML on your IdP

Use the metadata URL and ACS URL from the Aiven Console to configure a
new application in your IdP.

## Step 3: Finish the configuration in Aiven

Go back to the Aiven Console to complete setting up the IdP. If you saved your IdP as a
draft, you can open the settings by clicking the name of the IdP.

1. Enter the **IDP URL** from your identity provider.

1. Enter the **Entity ID** from your identity provider.

<IdPStep3/>

## Step 4: Optional: Link your users to the identity provider

You can manually link Aiven organization user accounts using the following URLs.

:::note
You don't need to manually link organization users who have an email address that matches
a verified domain linked to one of your identity providers.
:::

1. On the **Identity providers** page, click the name of the IdP.

1. In the **Overview** section there are two URLs:
    -   **Signup URL**: Users that don't have an Aiven user account can
        use this to create an Aiven user linked to this IdP.
    -   **User account link URL**: Users that already have an Aiven user
        account can link their existing Aiven user with this IdP.

1. Send the appropriate URL to your organization users. If you set up a
    different IdP before and are now switching to a new IdP, existing
    users need to log in with the new account link URL to finish the
    setup.

1. The process for users to link their Aiven user account with the IdP varies for new and
   existing users.

   -   For existing users that are already logged in to the Aiven Console:
       1. Click the account link URL.
       1. Click **Link profile** to go to your IdP's authentication page.
       1. Log in to the IdP to link the accounts. You can use the IdP
          for all future logins.

   -   For existing users that are not logged into the Aiven Console:
       1. Click the account link URL.
       1. Click **Login**.
       1. Log in to the Aiven Console. You are redirected to your IdP's authentication page.
       1. Log in to the IdP to link the accounts. You can use the IdP for all future logins.

   -   For new users without an Aiven user account:
       1. Click the signup URL.
       1. Select the identity provider on the signup page. You are redirected to your
          IdP's authentication page.
       1. Log in to the IdP.
       1. Complete the sign up process in the Aiven Console. The IdP is automatically linked
          to your Aiven user account and you can use it for all future logins.

## Troubleshooting

If you have issues, you can use the [SAML Tracer browser
extension](https://addons.mozilla.org/firefox/addon/saml-tracer/) to
check the process step by step.
