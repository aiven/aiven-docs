---
title: Add identity providers
keywords: [SAML, SSO]
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";

You can give your organization users access to Aiven through an identity
provider (IdP).

To set up single sign-on through an IdP for your organization:

## Step 1. Add the IdP in the Aiven Console {#add-idp-aiven-console}

1. In the organization, click **Admin**.
1. Click **Identity providers**.
1. Click **Add identity provider**.
1. Select an identity provider and enter a name.
1. Select a [verified domain](/docs/platform/howto/manage-domains) to link
   this IdP to. Users see linked IdPs on the login page.

On the **Configuration** step are two parameters that you use to set up the SAML
authentication in your IdP:

   -   Metadata URL
   -   ACS URL

## Step 2. Configure SAML on your IdP

Use the metadata URL and ACS URL from the Aiven Console to configure a
new application in your IdP. Setup instructions are available for these
specific providers:

-   [Auth0](/docs/platform/howto/saml/add-auth0-idp#configure-saml-auth0)
-   [FusionAuth](/docs/platform/howto/saml/add-fusionauth-idp#configure-saml-fusionauth)
-   [Microsoft Azure Active Directory](/docs/platform/howto/saml/add-azure-idp#configure-saml-azure)
-   [Okta](/docs/platform/howto/saml/add-okta-idp#configure-saml-okta)
-   [OneLogin](/docs/platform/howto/saml/add-onelogin-idp#configure-saml-onelogin)
-   [Google](/docs/platform/howto/saml/add-google-idp#configure-saml-google)

If your provider isn't listed, contact the support team at
[support@aiven.io](mailto:support@aiven.io) for help with the configuration.

## Step 3. Finish the configuration in Aiven {#configure-idp-aiven-console}

Go back to the Aiven Console to complete setting up the IdP. If you saved your IdP as a
draft, you can open the settings by clicking the name of the IdP.

1. Enter the **IDP URL** and **Entity Id** details.

   |     Aiven     |             Auth0             |       Azure AD        | FusionAuth  |   Google    |    JumpCloud    |     Okta      |          OneLogin          |
   | ------------- | ----------------------------- | --------------------- | ----------- | ----------- | --------------- | ------------- | -------------------------- |
   | **IdP URL**   | `Identity Provider Login URL` | `Login URL`           | `Login URL` | `SSO URL`   | `IDP URL`       | `Sign on URL` | `SAML 2.0 Endpoint (HTTP)` |
   | **Entity ID** | `Issuer URN`                  | `Azure AD Identifier` | `Entity ID` | `Entity ID` | `IdP Entity ID` | `Issuer`      | `Issuer URL`               |

1. Paste the certificate from the IdP into the **Certificate** field.
1. Optional: Paste or upload a JSON file with configuration details
   for your IdP.
1. Click **Next**.
1. Configure the security options for this IdP and click **Next**.
    -   **Require authentication context**: This lets the IdP enforce
        stricter security measures to help prevent unauthorized access,
        such as requiring multi-factor authentication.
    -   **Require assertion to be signed**: The IdP checks for a digital
        signature. This security measure ensures the integrity and
        authenticity of the assertions by verifying that they were
        issued by a trusted party and have not been tampered with.
    -   **Sign authorization request sent to IdP**: A digital signature is
        added to the request to verify its authenticity and integrity.
    -   **Extend active sessions**: This resets the session duration every time the token
        is used.
1. Optional: Select a user group to add all users who sign up with this IdP to.
1. Optional: <LimitedBadge/> Enable user provisioning with Okta:

   1. Copy the **Base URL** and **Access token**.
   1. Use the URL and token to configure
      [user provisioning for Okta](/docs/platform/howto/okta-user-provisioning-with-scim)
      with SCIM.

1. Click **Finish** to complete the setup.

:::note
If you set up a SAML authentication method before and are now switching
to a new IdP, existing users need to log in with the new account link
URL to finish the setup.
:::

## Step 4. Optional: Link your users to the identity provider

Your organization users should automatically be able to use the identity
provider to sign up and log in to Aiven. You can also handle this
manually using URLs:

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
