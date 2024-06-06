---
title: Add Okta as an identity provider
keywords: [SAML, SSO]
---

Use [Okta](https://www.okta.com/) to give your organization users single sign-on (SSO) access to Aiven using SAML. Aiven also supports [user provisioning for Okta](/docs/platform/howto/okta-user-provisioning-with-scim) with SCIM.

## Supported features

* Identity provider (IdP) initiated SSO
* Service provider (SP) initiated SSO

For more information on the listed features, visit the
[Okta Glossary](https://help.okta.com/okta_help.htm?type=oie&id=ext_glossary).

## Prerequisite steps in Aiven Console

Add Okta as an
[identity provider](/docs/platform/howto/saml/add-identity-providers#add-idp-aiven-console).

## Configure SAML on Okta {#configure-saml-okta}

1.  In the [Okta administrator console](https://login.okta.com/), go to
    **Applications** > **Applications**.
1.  Click **Browse App Catalog**.
1.  Search for and open the Aiven app.
1.  Click **Add Integration** and **Done**.
1.  On the **Sign On** tab, click **Edit**.
1. In the **Advanced Sign-on Settings** set the **Metadata URL** and **ACS URL** to
   the URLs copied from Aiven.
1. Optional: In the **SAML 2.0** section, click **Attributes** and add an entry to the
   **Attribute Statements** with the following. These
    [statements](https://help.okta.com/en-us/content/topics/apps/define-attribute-statements.htm)
    are inserted into the SAML assertions shared with Aiven.

    | **Name** | **Name format** |  **Value**   |
    | -------- | --------------- | ------------ |
    | `email`  | `Unspecified`   | `user.email` |

1. Click **Save**.
1. In the **SAML 2.0** section, click **More details**.
1. Copy the **Sign on URL**, **Issuer** URL, and the **Signing Certificate**.
   You will use these to configure the IdP in Aiven.
1. Go back to the Aiven Console to
[configure the IdP](/docs/platform/howto/saml/add-identity-providers#configure-idp-aiven-console)
and complete the setup.

## Log in with Okta

To log in to the Aiven Console using Okta:

1. On the [login page](https://console.aiven.io/login),
   enter your Okta email address.
1. Click **Log in** and **Log in with Okta**.

## Troubleshooting

### Authentication failed

When launching the Aiven SAML application, you get the following error:

```text
Authentication Failed
Login failed. Please contact your account administrator for more details.
```

Ensure **IdP initiated login** is enabled.

### The Okta password does not work

Make sure to use the **Account Link URL** to add the Okta IdP to your
Aiven user account. You can view all authentication methods in
**User information** > **Authentication**.
