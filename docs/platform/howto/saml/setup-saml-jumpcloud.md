---
title: Set up SAML with JumpCloud
---

This article explains how to set up SAML with
[JumpCloud](https://jumpcloud.com/) for an organization in Aiven. For
more information on SAML and instructions for other identity providers,
see the
[Set up SAML authentication](/docs/platform/howto/saml/saml-authentication) article.

## Prerequisite steps in Aiven Console

1.  In the organization, click **Admin**.
2.  Select **Identity providers**.
3.  Click **Add identity provider**.
4.  Enter a name and select SAML. You can also select the groups that
    users will be added to when they sign up or log in through this
    authentication method.

You are shown two parameters needed to set up the SAML authentication in
JumpCloud:

-   Metadata URL
-   ACS URL

## Configure SAML on JumpCloud

1.  In the [JumpCloud admin
    console](https://console.jumpcloud.com/login), go to **SSO**.
2.  Select **Custom SAML App**.
3.  Set the **IdP Entity ID**.
4.  Set the `Audience URI (SP Entity ID)` to the `Metadata URL` from the
    Aiven Console.
5.  Set the `ACS URL` to the one from the Aiven Console.
6.  Set the `Default RelayState` to the homepage of the Aiven Console,
    [https://console.aiven.io](https://console.aiven.io).
7.  Add an entry in **Attribute statements** with
    `Service Provider Attribute Name` of `email` and
    `JumpCloud Attribute Name` of `email`.
8.  Set the `Login URL` to the `ACS URL` from the Aiven Console.
9.  In **User Groups**, assign the application to your user groups.
10. Click **Activate**.
11. Download the certificate.

## Finish the configuration in Aiven

Go back to the **Authentication** page in [Aiven
Console](https://console.aiven.io/) to enable the SAML authentication
method:

1.  Select the name of the JumpCloud method that you created.
2.  In the SAML configuration section, click **Edit**.
3.  Toggle on **IdP login**.
4.  Add the configuration settings from JumpCloud:
    -   Set the `SAML IDP URL` to the `IDP URL` from JumpCloud.
    -   Set the `SAML Entity ID` to the `IdP Entity ID` from JumpCloud .
    -   Paste the certificate from JumpCloud into the `SAML Certificate`
        field.
5.  Click **Edit method** to save your changes.
6.  Toggle on **Enable authentication method** at the top of the page.
7.  In the **Signup and link accounts URLs** section, copy the
    appropriate link and send it to your users to switch them to the new
    IdP:
    -   **Signup URL**: For users that don\'t have an Aiven user account
        and need to create a new Aiven user linked to this IdP.
    -   **Account link URL**: For users that already have an Aiven user
        account to link their existing Aiven user with the configured
        IdP.

:::note
If you set up a SAML authentication method before and are now switching
to a new IdP, existing users need to log in with the new account link
URL to finish the setup.
:::

## Troubleshooting

If you have issues, you can use the [SAML Tracer browser
extension](https://addons.mozilla.org/firefox/addon/saml-tracer/) to
check the process step by step.
