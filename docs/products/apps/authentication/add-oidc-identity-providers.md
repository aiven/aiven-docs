---
title: Add OpenID Connect identity providers to an Aiven Runtime application
sidebar_label: Add OpenID Connect identity providers
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import IdPStep1 from "@site/static/includes/oidc-idp-apps-step1.md";
import IdPStep2 from "@site/static/includes/oidc-idp-apps-step2.md";
import IdPStep3 from "@site/static/includes/oidc-idp-apps-step3.md";
import GrantAccess from "@site/static/includes/idp-apps-grant-access.md";

You can give users access to an Aiven Runtime application through identity providers (IdPs) that support OpenID Connect (OIDC).


:::note
Aiven handles authentication and blocks unauthenticated traffic at the platform level.
If your backend needs to identify the logged-in user,
read the identity passed in the `X-Forwarded-User` HTTP header.
:::

## Step 1: Register an app in your identity provider

<IdPStep1/>

## Step 2: Add your identity provider to your Aiven Runtime application

<IdPStep2/>

## Step3: Add the redirect URL to your application

<IdPStep3/>

## Step 4: Grant access to users

<GrantAccess/>
