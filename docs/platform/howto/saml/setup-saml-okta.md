---
title: Set up SAML with Okta
---

This article explains how to set up SAML with
[Okta](https://www.okta.com/) for an organization in Aiven. For more
information on SAML and instructions for other identity providers, see
the
[Set up SAML authentication](/docs/platform/howto/saml/saml-authentication) article.

## Prerequisite steps in Aiven Console

1.  In the organization, click **Admin**.
2.  Select **Identity providers**.
3.  Click **Add identity provider**.
4.  Enter a name and select SAML. You can also select the groups that
    users will be added to when they sign up or log in through this
    authentication method.

You are shown two parameters needed to set up the SAML authentication in
Okta:

-   Metadata URL
-   ACS URL

## Configure SAML on Okta

This is a two step process. First, you create the SAML SP-Initiated
authentication flow and then you create a bookmark app that will
redirect to the Aiven Console\'s login page.

1.  Log in to the [Okta administrator console](https://login.okta.com/).

2.  Go to the **Applications** tab.

3.  Click **Create a new app integration**.

4.  Select **SAML 2.0** for the **Sign on method**, then click **Next**.

5.  Enter a name for the app and add a logo.

6.  Set its visibility for your Okta users and click **Next**.

7.  Set the following values in the app configuration:

    +------+---------------------------------------------------------------+
    | P    | Value                                                         |
    | aram |                                                               |
    | eter |                                                               |
    +======+===============================================================+
    | `Sin | `ACS URL`                                                     |
    | gle  |                                                               |
    | sign |                                                               |
    |  on  |                                                               |
    | URL` |                                                               |
    +------+---------------------------------------------------------------+
    | `    | `Metadata URL`                                                |
    | Audi |                                                               |
    | ence |                                                               |
    |  URI |                                                               |
    |  (SP |                                                               |
    |  Ent |                                                               |
    | ity  |                                                               |
    | ID)` |                                                               |
    +------+---------------------------------------------------------------+
    | `Def | `https://console.aiven.io/` when using the Aiven Console      |
    | ault |                                                               |
    |  Rel | `https://console.gcp.aiven.io/` when using Aiven GCP          |
    | aySt | Marketplace Console                                           |
    | ate` |                                                               |
    |      | `https://console.aws.aiven.io/` when using Aiven AWS          |
    |      | Marketplace Console                                           |
    +------+---------------------------------------------------------------+

    :::important
    The `Default RelayState` is the homepage of the Aiven Console and is
    fundamental for IdP initiated sign on to function correctly.
    :::

8.  Add an entry to **Attribute statements** with:

      ---------------------------------------------------------------------------
      Parameter   Value
      ----------- ---------------------------------------------------------------
      `name`      `email`

      `value`     `user.email`
      ---------------------------------------------------------------------------

9.  Click **Next** and then click **Finish**. You are redirected to your
    application in Okta.

10. Click the **View Setup Instructions** for the application.

11. Go to the **Sign On** tab and copy the application data to be used
    in the final configuration in Aiven:

    -   `Identity Provider Signle Sign-On URL`
    -   `Identity Provider Issuer`
    -   `X.509 Certificate`

12. Go to the **Assignments** tab.

13. Click **Assign** to assign users or groups to the Okta application.

:::note
New users need to be assigned to the Aiven application in Okta for the
login to be successful.
:::

## Finish the configuration in Aiven

Go back to the **Authentication** page in the [Aiven
Console](https://console.aiven.io/) to enable the SAML authentication
method:

1.  Select the name of the Okta method that you created.

2.  In the SAML configuration section, click **Edit**.

3.  Add the configuration settings from Okta:

      Parameter            Value
      -------------------- ----------------------------------------
      `SAML IDP Url`       `Identity Provider Single Sign-On URL`
      `SAML Entity ID`     `Identity Provider Issuer`
      `SAML Certificate`   `X.509 Certificate`

4.  Toggle on `IdP login` and `Enable authentication method`.

5.  Click `Edit Method` to save the settings.

6.  In the **Signup and link accounts URLs** section, copy the
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

### Authentication failed

When launching Aiven SAML application getting the following error:

    Authentication Failed

    Login failed.  Please contact your account administrator for more details.

Check Okta authentication in Aiven console if **IdP login** and **Enable
authentication method** are enabled.

### Invalid `RelayState`

If you get the `Invalid RelayState`, then you are attempting an
IdP-initiated auth flow, for example by clicking the Aiven SAML app from
the Okta UI. Previously, Aiven did not support IdP-initiated flows, but
now it is possible if you set the `Default RelayState` in Okta to the
corresponding console of your account as defined in the Configure SAML
on Okta section.

### The Okta password does not work

Make sure to use the **Account Link URL** to add the Okta Authentication
method to your Aiven profile.

Once linked, you should get the choice of multiple sign-in methods as
well as see the other Authentication method in **User Information** -\>
**Authentication** section on the [Aiven
Console](https://console.aiven.io/).
