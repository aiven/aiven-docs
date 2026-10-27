---
title: Add OneLogin as an identity provider to an Aiven Runtime application
sidebar_label: Add OneLogin
---

import Permissions from "@site/static/includes/oidc-idp-apps-permissions.md";
import OpenAuthentication from "@site/static/includes/oidc-idp-apps-open-app.md";
import AddAuthentication from "@site/static/includes/oidc-idp-apps-add-auth-method.md";
import SelectOidc from "@site/static/includes/oidc-idp-apps-select-oidc.md";
import EnterName from "@site/static/includes/oidc-idp-apps-name-idp.md";
import EnterCredentials from "@site/static/includes/oidc-idp-apps-enter-credentials.md";
import CopyRedirect from "@site/static/includes/oidc-idp-apps-redirect-url.md";
import SaveAuthentication from "@site/static/includes/oidc-idp-apps-add-final-step.md";

Let users access an Aiven Runtime application through the OneLogin identity provider (IdP).

<Permissions/>

## Step 1: Add OneLogin to a Runtime application

1. <OpenAuthentication/>
1. <AddAuthentication/>
1. <SelectOidc/>
1. <CopyRedirect/>

## Step 2: Create the OIDC custom connector in OneLogin

Open the OneLogin admin portal in a new tab:

1. [Create an OIDC custom connector](https://docs.oneidentity.com/bundle/onelogin_app-integration/page/guides/appintegrations/openid-connect-oidc-custom-connector.htm).
   - In **Redirect URIs**, paste the redirect URLs from the Aiven Console.
1. In the **General settings**, add the `openid`, `profile`, and `email` scopes.
1. Copy the **Client ID** and **Client secret**.

## Step 3: Complete the setup in Aiven

Return to the Aiven Console tab:

1. <EnterName/>
1. In the **Issuer URL**, enter `https://SUBDOMAIN.onelogin.com/oidc/2`.
   Replace `SUBDOMAIN` with your OneLogin subdomain.
1. Enter the **Client ID** and **Client Secret** you copied.
1. <SaveAuthentication/>
