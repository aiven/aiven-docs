---
title: Add Okta as an identity provider to an Aiven Runtime application
sidebar_label: Add Okta
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import IdPStep1 from "@site/static/includes/oidc-idp-apps-step1.md";
import IdPStep2 from "@site/static/includes/oidc-idp-apps-step2.md";
import GrantAccess from "@site/static/includes/idp-apps-grant-access.md";

Let users access an Aiven Runtime application through the Okta identity provider (IdP).

## Step 1: Add Okta as an identity provider to your Aiven Runtime application

<IdPStep2/>

## Step 2: Register an application in Okta

In the Okta admin console,
[create a custom app integration](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#create-a-custom-app-integration),
and add the **Redirect URI** you copied from the Aiven Console.
