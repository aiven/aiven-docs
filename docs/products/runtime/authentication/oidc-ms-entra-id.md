---
title: Add Microsoft Entra ID as an identity provider to an Aiven Runtime application
sidebar_label: Add Microsoft Entra ID
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import AivenSetup from "@site/static/includes/oidc-idp-apps-aiven-instructions.md";
import { OidcRedirectUrlInstruction } from "@site/src/constants/oidc-redirect-url";

Let users access an Aiven Runtime application through the Microsoft Entra ID identity provider (IdP).

## Step 1: Register an application in Microsoft Entra ID

In the Microsoft Entra admin center,
[register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).

## Step 2: Add Entra ID as an identity provider to your Aiven Runtime application

<AivenSetup/>

## Step 3: Add the redirect URL to your application

<OidcRedirectUrlInstruction idpName="Microsoft Entra ID" />
