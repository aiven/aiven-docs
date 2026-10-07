---
title: Authentication for Aiven Runtime applications
sidebar_label: Overview
---

When you deploy an application, it's publicly accessible, meaning anyone who knows
the application URL can access it. To restrict access,
you can add identity providers to your application and grant access
to specific users and groups.

Aiven Runtime applications support identity providers
that are
[OpenID Connect (OIDC) compliant](/docs/products/runtime/authentication/add-oidc-identity-providers),
such as:

- [Auth0](/docs/products/runtime/authentication/oidc-auth0/)
- [Microsoft Entra ID](/docs/products/runtime/authentication/oidc-ms-entra-id/)
- [Okta](/docs/products/runtime/authentication/oidc-okta/)

You can add multiple identity providers to an application.
