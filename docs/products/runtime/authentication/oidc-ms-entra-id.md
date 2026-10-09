---
title: Add Microsoft Entra ID as an identity provider to an Aiven Runtime application
sidebar_label: Add Microsoft Entra ID
---

import Permissions from "@site/static/includes/oidc-idp-apps-permissions.md";
import OpenAuthentication from "@site/static/includes/oidc-idp-apps-open-app.md";
import AddAuthentication from "@site/static/includes/oidc-idp-apps-add-auth-method.md";
import SelectOidc from "@site/static/includes/oidc-idp-apps-select-oidc.md";
import EnterName from "@site/static/includes/oidc-idp-apps-name-idp.md";
import EnterCredentials from "@site/static/includes/oidc-idp-apps-enter-credentials.md";
import CopyRedirect from "@site/static/includes/oidc-idp-apps-redirect-url.md";
import SaveAuthentication from "@site/static/includes/oidc-idp-apps-add-final-step.md";

Let users access an Aiven Runtime application through the Microsoft Entra ID identity provider (IdP).

<Permissions/>

## Step 1: Register an application in Microsoft Entra ID

In the Microsoft Entra admin center:

1. [Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).
1. In the **Overview**, copy the **Application (client) ID**.
1. [Get your app's configuration document URI](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols-oidc).
1. [Create a client secret](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials#add-a-client-secret).
1. Copy the secret's **Value**.

## Step 2: Add Entra ID to a Runtime application

Open the Aiven Console in a new tab:

1. <OpenAuthentication/>
1. <AddAuthentication/>
1. <SelectOidc/>
1. <EnterName/>
1. In the **Issuer URL**, enter the configuration document URI.
1. In the **Client ID**, enter the **Application (client) ID** you copied,
1. In the **Client Secret**, enter the secret **Value** you copied.
1. <CopyRedirect/>
1. <SaveAuthentication/>

## Step 3: Add the redirect URL to your application

In the Microsoft Entra admin center,
[add a redirect URI](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-redirect-uri)
and paste the **Redirect URL** from the Aiven Console.
