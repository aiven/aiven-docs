---
title: Set up SAML authentication
---

Security Assertion Markup Language (SAML) is a standard for exchanging
authentication and authorization data between an identity provider (IdP)
and a service provider. You can set up SAML authentication in Aiven with
your company\'s preferred IdP.

To set up a SAML authentication method for your organization in Aiven,
there are three steps:

1.  Configure the SAML authentication method in the Aiven Console
2.  Configure SAML on your IdP
3.  Enable the SAML authentication method in the Aiven Console
4.  Log in with the SAML authentication method

Setup instructions for specific providers are available on the following
pages:

-   [Set up SAML with Auth0](/docs/platform/howto/saml/setup-saml-auth0)
-   [Set up SAML with FusionAuth](/docs/platform/howto/saml/setup-saml-fusionauth)
-   [Set up SAML with Microsoft Azure Active Directory](/docs/platform/howto/saml/setup-saml-azure)
-   [Set up SAML with Okta](/docs/platform/howto/saml/setup-saml-okta)
-   [Set up SAML with OneLogin](/docs/platform/howto/saml/setup-saml-onelogin)
-   [Set up SAML with Google](/docs/platform/howto/saml/setup-saml-google)

If your provider isn\'t listed, contact us at [support@aiven.io](mailto:support@aiven.io) so we
can assist you with the configuration.

## Step 1. Set up the SAML authentication method in Aiven Console

SAML Authentication methods are configured at the organization level:

1.  In the organization, click **Admin**.
2.  Select **Identity providers**.
3.  Click **Add identity provider**.
4.  Enter a name and select SAML. You can also select the groups that
    users will be added to when they sign up or log in through this
    authentication method.

You are shown the two parameters needed for the SAML authentication
setup in your Identity Provider:

-   Metadata URL
-   ACS URL

## Step 2. Configure SAML on your Identity Provider

In your IdP, use the metadata URL and ACS URL to configure a new
application. The following table shows how the configuration information
provided by Aiven is referred to in some of the more popular IdPs.

+----------+----------+----------+----------+----------+----------+
| Aiven    | Auth0    | Okta     | OneLogin | Azure    | Centrify |
|          |          |          |          | Active   |          |
|          |          |          |          | D        |          |
|          |          |          |          | irectory |          |
+==========+==========+==========+==========+==========+==========+
| ACS URL  | App      | SSO URL  | R        | Reply    | -        |
|          | lication |          | ecipient |          |          |
|          | Callback |          |          |          |          |
|          | URL      |          |          |          |          |
+----------+----------+----------+----------+----------+----------+
| Metadata | -        | Audience | Audience | Id       | SP       |
|          |          |          | URI      | entifier | Entity   |
+----------+----------+----------+----------+----------+----------+
| Email    | `email`  | `use     | `Email`  | `us      | `        |
| Mapping  |          | r.email` |          | er.mail` | LoginUse |
|          |          |          |          |          | r.email` |
+----------+----------+----------+----------+----------+----------+

## Step 3. Finish the configuration in Aiven

Go back to the **Authentication** page in the [Aiven
Console](https://console.aiven.io/) to enable the SAML authentication
method:

1.  Select the name of the authentication method that you created.
2.  Toggle on **Enable Authentication method**. To let users initiate a
    login directly from your IdP, toggle on **IdP login**.
3.  In the **SAML configuration** section, click **Edit**.
4.  Enter the **IDP URL**, **Entity Id**, and **SAML Certificate**
    details.
5.  Click **Edit method**.

## Step 4. Log in with the SAML authentication method

After the authentication method is enabled, there are two URLs in the
**Signup and link accounts URLs** section:

-   **Signup URL**: For users that don\'t have an Aiven user account to
    create a new Aiven user linked to the configured IdP.
-   **Account link URL**: For users that already have an Aiven user
    account to link their existing Aiven user with the configured IdP.

Send the appropriate URL to link the authentication method to a new or
existing Aiven user. If you set up a SAML authentication method before
and are now switching to a new IdP, existing users need to log in with
the new account link URL to finish the setup.

When a user clicks on the link, they will be redirected to a page to
link their Aiven user account with the SAML account:

-   For existing users that are already logged into the Aiven Console
    1.  Click on the **Link profile** button. You are redirected to your
        SAML provider\'s authentication page.
    2.  Once logged in to the provider, you will be redirected back to
        the Aiven Console. The authentication method is linked to your
        profile.
-   For existing users that are not logged into the Aiven Console
    1.  Click on the **Login** button.
    2.  On the login page of the Aiven Console, log in as usual. You are
        redirected to your SAML provider\'s authentication page.
    3.  Once logged in to the provider, you are redirected back to the
        Aiven Console. The authentication method is linked to your
        profile.
-   For new users without an Aiven user account
    1.  Click **Sign up**. You are redirected to your SAML provider\'s
        authentication page.
    2.  Once logged in to the provider, you are redirected back to the
        Aiven sign up page.
    3.  Complete the sign up process. Your Aiven profile is linked with
        your SAML authentication method.
