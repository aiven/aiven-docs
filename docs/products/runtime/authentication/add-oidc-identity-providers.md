---
title: Add OpenID Connect identity providers to an Aiven Runtime application
sidebar_label: Add OpenID Connect identity providers
---

import Permissions from "@site/static/includes/oidc-idp-apps-permissions.md";
import IdPSetup from "@site/static/includes/oidc-idp-apps-idp-instructions.md";
import OpenAuthentication from "@site/static/includes/oidc-idp-apps-aiven-open.md";
import AddAuthentication from "@site/static/includes/oidc-idp-apps-aiven-add.md";
import SelectOidc from "@site/static/includes/oidc-idp-apps-aiven-select.md";
import EnterName from "@site/static/includes/oidc-idp-apps-aiven-name.md";
import EnterCredentials from "@site/static/includes/oidc-idp-apps-aiven-credentials.md";
import CopyRedirect from "@site/static/includes/oidc-idp-apps-aiven-redirect.md";
import SaveAuthentication from "@site/static/includes/oidc-idp-apps-aiven-save.md";

You can give users access to an Aiven Runtime application through identity providers (IdPs) that support OpenID Connect (OIDC).

<Permissions/>

:::note[Note]
Aiven handles authentication and blocks unauthenticated traffic at the platform level.
If your backend needs to identify the logged-in user,
read the identity passed in the `X-Forwarded-User` HTTP header.
:::

Your identity provider must support the `openid`, `profile`, and `email` scopes.
The setup order depends on when your provider requires the redirect URI.
For provider-specific instructions, see
[Okta](/docs/products/runtime/authentication/oidc-okta),
[Google Cloud](/docs/products/runtime/authentication/oidc-google-cloud),
[Microsoft Entra ID](/docs/products/runtime/authentication/oidc-ms-entra-id), or
[Auth0](/docs/products/runtime/authentication/oidc-auth0).

## Step 1: Register an app in your identity provider

Use this procedure if your provider allows registration without a redirect URI.
If registration requires a redirect URI, follow the provider-specific instructions instead.

<IdPSetup/>

## Step 2: Add your IdP to a Runtime application

Add the identity provider in the Aiven Console:

1. <OpenAuthentication/>
1. <AddAuthentication/>
1. <SelectOidc/>
1. <EnterName/>
1. <EnterCredentials/>
1. <CopyRedirect/>
1. <SaveAuthentication/>

## Step 3: Add the redirect URL to your application

In your identity provider, add the redirect URI to the app's allowed redirect or
callback URLs and save the settings.
If you added the URI during registration, skip this step.
