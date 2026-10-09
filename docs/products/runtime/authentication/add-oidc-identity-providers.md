---
title: Add OpenID Connect identity providers to an Aiven Runtime application
sidebar_label: Add OpenID Connect identity providers
---

import Permissions from "@site/static/includes/oidc-idp-apps-permissions.md";
import OpenAuthentication from "@site/static/includes/oidc-idp-apps-open-app.md";
import AddAuthentication from "@site/static/includes/oidc-idp-apps-add-auth-method.md";
import SelectOidc from "@site/static/includes/oidc-idp-apps-select-oidc.md";
import EnterName from "@site/static/includes/oidc-idp-apps-name-idp.md";
import EnterCredentials from "@site/static/includes/oidc-idp-apps-enter-credentials.md";
import CopyRedirect from "@site/static/includes/oidc-idp-apps-redirect-url.md";
import SaveAuthentication from "@site/static/includes/oidc-idp-apps-add-final-step.md";

You can give users access to an Aiven Runtime application through identity providers (IdPs) that support OpenID Connect (OIDC).

<Permissions/>

:::note[Note]
Aiven handles authentication and blocks unauthenticated traffic at the platform level.
If your backend needs to identify the logged-in user,
read the identity passed in the `X-Forwarded-User` HTTP header.
:::

The setup order depends on when your provider requires the redirect URI.
Provider-specific instructions are available for the following:

- [Okta](/docs/products/runtime/authentication/oidc-okta),
- [Google Cloud](/docs/products/runtime/authentication/oidc-google-cloud),
- [Microsoft Entra ID](/docs/products/runtime/authentication/oidc-ms-entra-id), or
- [Auth0](/docs/products/runtime/authentication/oidc-auth0).

## Step 1: Register an app in your identity provider

1. Open the console for your identity provider in another tab.
1. In your identity provider, register a new app.
1. Copy the OIDC **issuer URL**, **client ID**, and **client secret**.

## Step 2: Add your IdP to a Runtime application

In the Aiven Console:

1. <OpenAuthentication/>
1. <AddAuthentication/>
1. <SelectOidc/>
1. <EnterName/>
1. <EnterCredentials/>
1. <CopyRedirect/>
1. <SaveAuthentication/>

## Step 3: Add the redirect URL to your application

In your identity provider, add the **Redirect URL** from the Aiven Console.
