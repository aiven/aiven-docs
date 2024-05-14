---
title: Add Okta as an identity provider
---

Use [Okta](https://www.okta.com/) to give your organization users single sign-on (SSO) access to Aiven.
Aiven also supports
[user provisioning for Okta](/docs/platform/howto/okta-user-provisioning-with-scim)
with SCIM.

## Prerequisite steps in Aiven Console

Add Okta as an
[identity provider](/docs/platform/howto/saml/add-identity-providers#add-idp-aiven-console) in the Console.

## Configure SAML on Okta {#configure-saml-okta}

Create the SAML SP-Initiated authentication flow and create a bookmark app that will
redirect to the Aiven Console's login page:

1.  Log in to the [Okta administrator console](https://login.okta.com/).
1.  Go to the **Applications** tab.
1.  Click **Create an app integration**.
1.  Select **SAML 1.0** for the **Sign on method** and click **Next**.
1.  Enter a name for the app and add a logo.
1.  Set its visibility for your Okta users and click **Next**.
1.  Set the following values in the app configuration:

    | Parameter                  | Value                                                                                                                                                                                                                                                                           |
    | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `Single sign on URL`       | ACS URL                                                                                                                                                                                                                                                                         |
    | `AudienceURI (SPEntityId)` | Metadata URL                                                                                                                                                                                                                                                                    |
    | `Default RelayState`       | <ul><li><code>https://console.aiven.io/</code> when using the Aiven Console</li> <li><code>https://console.gcp.aiven.io/</code> when using Aiven GCP Marketplace Console</li> <li><code>https://console.aws.aiven.io/</code> when using Aiven AWS Marketplace Console</li></ul> |

    :::important
    The `Default RelayState` is the homepage of the Aiven Console and is
    fundamental for IdP initiated sign on to function correctly.
    :::

1.  Add an entry to **Attribute statements** with:

    | Parameter | Value        |
    | --------- | ------------ |
    | `name`    | `email`      |
    | `value`   | `user.email` |

1.  Click **Next** and click **Finish**. You are redirected to your
    application in Okta.

1. Click the **View Setup Instructions** for the application.

1. Go to the **Sign On** tab and copy the application data to be used
    in the final configuration in Aiven:

    -   `Identity Provider Signle Sign-On URL`
    -   `Identity Provider Issuer`
    -   `X.509 Certificate`

1. Go to the **Assignments** tab.

1. Click **Assign** to assign users or groups to the Okta application.

:::note
New users need to be assigned to the Aiven application in Okta for the
login to be successful.
:::

## Finish the configuration in Aiven

Go back to the Aiven Console to
[configure the IdP](/docs/platform/howto/saml/add-identity-providers#configure-idp-aiven-console) and complete the setup.

## Troubleshooting

### Authentication failed

When launching the Aiven SAML application, you get the following error:

```text
Authentication Failed
Login failed. Please contact your account administrator for more details.
```

Ensure **IdP initiated login** is enabled.

### Invalid `RelayState`

The `Invalid RelayState` error means you are attempting an
IdP-initiated auth flow. This happens, for example, when you click the
Aiven SAML app in Okta.

Set the `Default RelayState` in Okta to the
corresponding console of your account as defined in the **Configure SAML
on Okta** section.

### The Okta password does not work

Make sure to use the **Account Link URL** to add the Okta IdP to your
Aiven user account. You can list the authentication methods in
**User information** > **Authentication**.
