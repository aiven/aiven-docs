---
title: Add Okta as an identity provider
sidebar_label: Okta
keywords: [SAML, SSO]
---

Use [Okta](https://www.okta.com/) to give your organization users single sign-on (SSO) access to Aiven using SAML. Aiven also supports [user provisioning for Okta](/docs/platform/howto/okta-user-provisioning-with-scim) with SCIM.

## Supported features

* Identity provider (IdP) initiated SSO
* Service provider (SP) initiated SSO

For more information on the listed features, visit the
[Okta Glossary](https://help.okta.com/okta_help.htm?type=oie&id=ext_glossary).

## Prerequisite steps in Aiven Console

Add Okta as a SAML
[identity provider](/docs/platform/howto/saml/add-identity-providers#add-idp-aiven-console).

## Configure SAML on Okta {#configure-saml-okta}

1.  In the [Okta administrator console](https://login.okta.com/), go to
    **Applications** > **Applications**.
1.  Click **Browse App Catalog**.
1.  Search for and open the Aiven app.
1.  Click **Add Integration** and **Done**.
1.  On the **Sign On** tab, click **Edit**.
1. In the **Advanced Sign-on Settings** set the **Metadata URL** and **ACS URL** to
   the URLs copied from the Aiven Console.
1. Set the **Default Relay State** for the console you use:
   - For the Aiven Console: `https://console.aiven.io`
   - For the Aiven GCP Marketplace Console: `https://console.gcp.aiven.io/`
   - For the Aiven AWS Marketplace Console: `https://console.aws.aiven.io/`
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

### Invalid relay state

If you get the invalid relay state error, then you are attempting an
IdP-initiated auth flow. This happens, for example, when you click the
Aiven SAML app in Okta. Set the **Default Relay State** in Okta to the
Aiven console that your organization uses.

### The Okta password does not work

Make sure to use the **Account Link URL** to add the Okta IdP to your
Aiven user account. You can view all authentication methods in
**User information** > **Authentication**.
