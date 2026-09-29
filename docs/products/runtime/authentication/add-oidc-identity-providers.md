---
title: Add OpenID Connect identity providers to an Aiven Runtime application
sidebar_label: Add OpenID Connect identity providers
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import IdPSetup from "@site/static/includes/oidc-idp-apps-idp-instructions.md";
import AivenSetup from "@site/static/includes/oidc-idp-apps-aiven-instructions.md";
import { OidcRedirectUrlInstruction } from "@site/src/constants/oidc-redirect-url";

You can give users access to an Aiven Runtime application through identity providers (IdPs) that support OpenID Connect (OIDC).

:::note
Aiven handles authentication and blocks unauthenticated traffic at the platform level.
If your backend needs to identify the logged-in user,
read the identity passed in the `X-Forwarded-User` HTTP header.
:::

## Step 1: Register an app in your identity provider

<IdPSetup/>

## Step 2: Add your identity provider to your Aiven Runtime application

<AivenSetup/>

## Step 3: Add the redirect URL to your application

<OidcRedirectUrlInstruction idpName = "your identity provider" />
