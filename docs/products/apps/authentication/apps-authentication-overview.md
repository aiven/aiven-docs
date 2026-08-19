---
title: Authentication for Aiven Runtime applications
sidebar_label: Overview
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

When you deploy an application, it's publicly accessible, meaning anyone who knows
the application URL can access it. To restrict access,
you can add identity providers to your application and grant access
to specific users and groups.

Aiven Runtime applications support identity providers
that are OpenID Connect (OIDC) compliant:

- [Microsoft Entra ID](/docs/products/apps/authentication/oidc-ms-entra-id/)
- ...
- ...

You can add multiple identity providers to an application.
