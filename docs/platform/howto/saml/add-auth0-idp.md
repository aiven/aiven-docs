---
title: Add Auth0 as an identity provider
sidebar_label: Auth0
---
<!-- vale off -->
import IdPStep1 from "@site/static/includes/idp-step1.md";
import IdPStep3 from "@site/static/includes/idp-step3.md"

<!-- vale on -->

Use [Auth0](https://auth0.com/) to give your organization users single sign-on (SSO) access to Aiven.

<IdPStep1/>

## Step 2: Configure SAML on Auth0

1.  Log in to [your Auth0 account](https://manage.auth0.com).
2.  Select **Applications**.
3.  Click **Create Application**.
4.  Enter an application name.
5.  Choose **Regular Web Applications** and click **Create**.
6.  After your application is created, go to the **Addons** tab.
7.  Enable the **SAML 2 WEB APP** option.
8.  Click the **SAML 2 WEB APP** option. The **Settings** tab opens.
9.  Set the **Application Callback URL** to the **ACS URL** from the Aiven
    Console.
10. In the **Settings** section for the Application Callback URL, remove
    the existing configuration and add the following field mapping
    configuration:

    ```json
    {
      "email": "email",
      "first_name": "first_name",
      "identity": "email",
      "last_name": "last_name",
      "mapUnknownClaimsAsIs": true
    }
    ```

11. Click **Enable** and **Save**.
12. On the **Usage** tab, make a note of the
    **Identity Provider Login URL**, **Issuer URN**, and
    **Identity Provider Certificate**. These are needed for the SAML
    configuration in Aiven Console.

## Step 3: Finish the configuration in Aiven

Go back to the Aiven Console to complete setting up the IdP. If you saved your IdP as a
draft, you can open the settings by clicking the name of the IdP.

1. In the **IDP URL** field, enter the Auth0 **Identity Provider Login URL**.
1. In the **Entity ID** field, enter the Auth0 **Issuer URN**.
<IdPStep3/>
