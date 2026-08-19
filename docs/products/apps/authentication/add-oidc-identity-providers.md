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

<IdPStep1/>

## Step 2: Register an application in Microsoft Entra ID

1. In the Microsoft Entra admin center,
   [register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).
1. [Add the redirect URI](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-redirect-uri)
    you copied from the Aiven Console to the application.

<IdPStep3/>
<GrantAccess/>
