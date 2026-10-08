---
title: Add Okta as an identity provider to an Aiven Runtime application
sidebar_label: Add Okta
---

import Permissions from "@site/static/includes/oidc-idp-apps-permissions.md";
import OpenAuthentication from "@site/static/includes/oidc-idp-apps-aiven-open.md";
import AddAuthentication from "@site/static/includes/oidc-idp-apps-aiven-add.md";
import SelectOidc from "@site/static/includes/oidc-idp-apps-aiven-select.md";
import EnterName from "@site/static/includes/oidc-idp-apps-aiven-name.md";
import EnterCredentials from "@site/static/includes/oidc-idp-apps-aiven-credentials.md";
import CopyRedirect from "@site/static/includes/oidc-idp-apps-aiven-redirect.md";
import SaveAuthentication from "@site/static/includes/oidc-idp-apps-aiven-save.md";

Let users access an Aiven Runtime application through the Okta identity provider (IdP).

<Permissions/>

## Step 1: Add Okta to a Runtime application

1. <OpenAuthentication/>
1. <AddAuthentication/>
1. <SelectOidc/>
1. <CopyRedirect/>

## Step 2: Register an application in Okta

Open the Okta admin console in a new tab:

1. [Create a custom app integration](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#create-a-custom-app-integration).
   - Select **OIDC - OpenID Connect** and **Web Application**.
1. In **Sign-in redirect URIs**, paste the redirect URI from the Aiven Console.
1. Select the users or groups that can access the app and click **Save**.
1. On **General**, in the **Client Credentials**,
   copy the **Client ID** and **Client Secret**.
1. Copy your authorization server's issuer URI.

## Step 3: Complete the setup in Aiven

Return to the Aiven Console tab:

1. <EnterName/>
1. <EnterCredentials/>
1. <SaveAuthentication/>
