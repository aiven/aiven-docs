---
title: Add JumpCloud as an identity provider to an Aiven Runtime application
sidebar_label: Add JumpCloud
---

import Permissions from "@site/static/includes/oidc-idp-apps-permissions.md";
import OpenAuthentication from "@site/static/includes/oidc-idp-apps-open-app.md";
import AddAuthentication from "@site/static/includes/oidc-idp-apps-add-auth-method.md";
import SelectOidc from "@site/static/includes/oidc-idp-apps-select-oidc.md";
import EnterName from "@site/static/includes/oidc-idp-apps-name-idp.md";
import EnterCredentials from "@site/static/includes/oidc-idp-apps-enter-credentials.md";
import CopyRedirect from "@site/static/includes/oidc-idp-apps-redirect-url.md";
import SaveAuthentication from "@site/static/includes/oidc-idp-apps-add-final-step.md";

Let users access an Aiven Runtime application through the JumpCloud identity provider (IdP).

<Permissions/>

## Step 1: Add JumpCloud to a Runtime application

1. <OpenAuthentication/>
1. <AddAuthentication/>
1. <SelectOidc/>
1. <CopyRedirect/>

## Step 2: Create the OIDC application in JumpCloud

Open the JumpCloud Admin Portal in a new tab:

1. [Create and configure an OIDC connector](https://jumpcloud.com/support/sso-with-oidc).
   - In **Redirect URIs**, paste the redirect URLs from the Aiven Console.
1. In the **Configuration Settings**, add the `openid`, `profile`, and `email` scopes.
1. Copy the **Client ID** and **Client secret**.

## Step 3: Complete the setup in Aiven

Return to the Aiven Console tab:

1. <EnterName/>
1. In the **Issuer URL**, enter `https://oauth.id.jumpcloud.com/`.
1. Enter the **Client ID** and **Client Secret** you copied.
1. <SaveAuthentication/>
