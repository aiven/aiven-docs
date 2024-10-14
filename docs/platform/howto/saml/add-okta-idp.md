---
title: Add Okta as an identity provider
sidebar_label: Okta
---
<!-- vale off -->
import IdPStep1 from "@site/static/includes/idp-step1.md";
import IdPStep3 from "@site/static/includes/idp-step3.md"

<!-- vale on -->

Use [Okta](https://www.okta.com/) to give your organization users single sign-on (SSO) access to Aiven using SAML. Aiven also supports [user provisioning for Okta](#step-4-optional-configure-user-provisioning) with SCIM.

## Supported features

* Identity provider (IdP) initiated SSO
* Service provider (SP) initiated SSO

For more information on the listed features, visit the
[Okta Glossary](https://help.okta.com/okta_help.htm?type=oie&id=ext_glossary).

<IdPStep1/>

## Step 2: Configure SAML on Okta

1.  In the [Okta administrator console](https://login.okta.com/), go to
    **Applications** > **Applications**.
1.  Click **Browse App Catalog**.
1.  Search for and open the Aiven app.
1.  Click **Add Integration** and **Done**.
1.  On the **Sign On** tab, click **Edit**.
1. In the **Advanced Sign-on Settings** set the **Metadata URL** and **ACS URL** to
   the URLs copied from the Aiven Console.
1. Set the **Default Relay State** for the console you use:
   - For the Aiven Console: https://console.aiven.io
   - For the Aiven GCP Marketplace Console: https://console.gcp.aiven.io/
   - For the Aiven AWS Marketplace Console: https://console.aws.aiven.io/
1. Click **Save**.
1. In the **SAML 2.0** section, click **More details**.
1. Copy the **Sign on URL**, **Issuer**, and the **Signing Certificate**.
   You'll use these to configure the IdP in Aiven.

## Step 3: Finish the configuration in Aiven

Go back to the Aiven Console to complete setting up the IdP. If you saved your IdP as a
draft, you can open the settings by clicking the name of the IdP.

1. In the **IDP URL** field, enter the **Sign on URL** from Okta.
1. In the **Entity ID** field, enter the **Issuer** from Okta.
<IdPStep3/>

## Step 4: Optional: Configure user provisioning

You can automate user provisioning with Okta through
System for Cross-domain Identity Management (SCIM). This means you can manage your users
and their profiles in one place, Okta, and push those changes to the Aiven platform.

Aiven's integration with Okta supports these features:

- **Push new users**: Users created in Okta are automatically created as managed users
  in Aiven.
- **Push profile updates**: User profile updates in Okta are pushed to Aiven. Profiles
  for these users cannot be changed in Aiven.
- **Push user deactivation**: Users that are deactivated or removed in Okta are
  deactivated in Aiven. You can manually delete users in Aiven after they are deactivated.
- **Push groups**: Groups created or updated in Okta are created and updated in Aiven.
- **Sync passwords**: Automatically synchronizes users' Aiven passwords with their
  Okta passwords.

To configure user provisioning for Okta:

1. In Okta, click **Applications** and go to the Aiven application.
1. Click **Provisioning**.
1. Click **Settings** > **Integration** > **Configure API Integration**.
1. Select **Enable API Integration**.
1. In the **API Token field**, paste the **Access token** from the Aiven Console.
1. Click **Test API Credentials** to confirm the connection is working
   and save the configuration.
   :::important
   Don't enable **Import Groups**. Aiven groups that aren't managed by SCIM cannot
   be imported to Okta.
   :::
1. Click **Sign On**.
1. In the **Credentials Details** section, for the **Application username format**
   select **Email**.
1. Click **Save**.

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
