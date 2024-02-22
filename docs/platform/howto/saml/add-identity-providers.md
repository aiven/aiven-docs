---
title: Add identity providers
---

You can give your organization users access to Aiven through an identity
provider (IdP).

To set up single sign-on through an IdP for your organization:

1. Add the identity provider in the [Aiven
    Console](https://console.aiven.io/) .
1. Configure SAML on your IdP.
1. Finalize the setup in the Aiven Console using information from your
    IdP.
1. Link your users to the identity provider.

## Step 1. Add the IdP in the Aiven Console {#add-idp-aiven-console}

1. In the organization, click **Admin**.
1. Click **Identity providers**.
1. Click **Add identity provider**.
1. Select an IdP and enter a name.
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

Go back to the Aiven Console to complete setting up the IdP:

1. Enter the **IDP URL** and **Entity Id** details.

   |     Aiven     |             Auth0             |       Azure AD        | FusionAuth  |   Google    |    JumpCloud    |                  Okta                  |          OneLogin          |
   | ------------- | ----------------------------- | --------------------- | ----------- | ----------- | --------------- | -------------------------------------- | -------------------------- |
   | **IdP URL**   | `Identity Provider Login URL` | `Login URL`           | `Login URL` | `SSO URL`   | `IDP URL`       | `Identity Provider Single Sign-On URL` | `SAML 2.0 Endpoint (HTTP)` |
   | **Entity ID** | `Issuer URN`                  | `Azure AD Identifier` | `Entity ID` | `Entity ID` | `IdP Entity ID` | `Identity Provider Issuer`             | `Issuer URL`               |

1. Paste the certificate from the IdP into the **Certificate** field.
1. Optional: Paste or upload a JSON file with configuration details
   for your IdP.
1. Click **Next**.
1. Configure the security options for this IdP:
    -   Require authentication context: This lets the IdP enforce
        stricter security measures to help prevent unauthorized access,
        such as requiring multi-factor authentication.
    -   Require assertion to be signed: The IdP will check for a digital
        signature. This security measure ensures the integrity and
        authenticity of the assertions by verifying that they were
        issued by a trusted party and have not been tampered with.
    -   Sign authorization request sent to IdP: A digital signature is
        added to the request to verify its authenticity and integrity.
1. Click **Next** and complete the setup.

If you saved your IdP as a draft, you can open the settings by clicking
the name of the IdP.

:::note
If you set up a SAML authentication method before and are now switching
to a new IdP, existing users need to log in with the new account link
URL to finish the setup.
:::

## Step 4. Link your users to the identity provider

Your organization users should automatically be able to use the identity
provider to sign up and log in to Aiven. You can also handle this
manually using URLs:

1. On the **Identity providers** page, click the name of the IdP.
1. In the **Overview** section there are two URLs:
    -   **Signup URL**: Users that don't have an Aiven user account can
        use this to create a new Aiven user linked to this IdP.
    -   **User account link URL**: Users that already have an Aiven user
        account can link their existing Aiven user with this IdP.
1. Send the appropriate URL to your organization users. If you set up a
    different IdP before and are now switching to a new IdP, existing
    users need to log in with the new account link URL to finish the
    setup.

When a user clicks on the link, they will be redirected to a page to
link their Aiven user account with the IdP:

-   For existing users that are already logged into the Aiven Console
    1. Click on the **Link profile** button. You are redirected to your
        IdP's authentication page.
    1. Once logged in to the provider, you will be redirected back to
        the Aiven Console and the IdP is linked to your profile. You can
        use the IdP for all future logins.
-   For existing users that are not logged into the Aiven Console
    1. Click on the **Login**.
    1. On the login page of the Aiven Console, log in as usual. You are
        redirected to your IdP's authentication page.
    1. Once logged in to the provider, you are redirected back to the
        Aiven Console and the IdP is linked to your profile. You can use
        the IdP for all future logins.
-   For new users without an Aiven user account
    1. Click **Sign up**. You are redirected to your IdP's
        authentication page.
    1. Once logged in to the provider, you are redirected back to the
        Aiven sign up page.
    1. Complete the sign up process. The IdP is linked to your profile
        and you can use it for all future logins.

## Troubleshooting

If you have issues, you can use the [SAML Tracer browser
extension](https://addons.mozilla.org/firefox/addon/saml-tracer/) to
check the process step by step.
