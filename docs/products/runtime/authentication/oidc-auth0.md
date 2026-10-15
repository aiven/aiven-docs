---
title: Add Auth0 as an identity provider to an Aiven Runtime application
sidebar_label: Add Auth0
---

import Permissions from "@site/static/includes/oidc-idp-apps-permissions.md";
import OpenAuthentication from "@site/static/includes/oidc-idp-apps-open-app.md";
import AddAuthentication from "@site/static/includes/oidc-idp-apps-add-auth-method.md";
import SelectOidc from "@site/static/includes/oidc-idp-apps-select-oidc.md";
import EnterName from "@site/static/includes/oidc-idp-apps-name-idp.md";
import EnterCredentials from "@site/static/includes/oidc-idp-apps-enter-credentials.md";
import CopyRedirect from "@site/static/includes/oidc-idp-apps-redirect-url.md";
import SaveAuthentication from "@site/static/includes/oidc-idp-apps-add-final-step.md";

Let users access an Aiven Runtime application through the Auth0 identity provider (IdP).

<Permissions/>

## Step 1: Create an application in Auth0

1. [Create an application](https://auth0.com/docs/get-started/auth0-overview/create-applications).
   - Select **Regular Web Applications**.
1. Go to the application **Settings**.
1. Copy the **Domain**, **Client ID**, and **Client Secret**.

## Step 2: Add Auth0 to a Runtime application

1. <OpenAuthentication/>
1. <AddAuthentication/>
1. <SelectOidc/>
1. <EnterName/>
1. In the **Issuer URL**, enter the **Domain** you copied from Auth0.
1. Enter the **Client ID** and **Client Secret** you copied.
1. <CopyRedirect/>
1. <SaveAuthentication/>

## Step 3: Add the callback URL in Auth0

1. In the Auth0 dashboard, open the application's **Settings**.
1. In **Allowed Callback URLs**, paste the redirect URI from the Aiven Console.
1. Click **Save Changes**.
