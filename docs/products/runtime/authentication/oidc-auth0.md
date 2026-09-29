---
title: Add Auth0 as an identity provider to an Aiven Runtime application
sidebar_label: Add Auth0
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import AivenSetup from "@site/static/includes/oidc-idp-apps-aiven-instructions.md";
import { OidcRedirectUrlInstruction } from "@site/src/constants/oidc-redirect-url";

Let users access an Aiven Runtime application through the Auth0 identity provider (IdP).

## Step 1: Add Auth0 as an identity provider to your Aiven Runtime application

<AivenSetup/>

## Step 2: Register an application in Auth0

In Auth0,
[create an application](https://auth0.com/docs/get-started/auth0-overview/create-applications).

## Step 3: Add the redirect URL to your application

<OidcRedirectUrlInstruction idpName="Auth0" />
