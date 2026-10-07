---
title: Authentication for Aiven Runtime applications
sidebar_label: Overview
---

When you deploy an application, it's publicly accessible, meaning anyone who knows
the application URL can access it. To restrict access,
you can add identity providers to your application and grant access
to specific users and groups.

You can use Aiven's own identity provider (IdP), Aiven Identity, or
identity providers that are OpenID Connect (OIDC) compliant.

You can add multiple identity providers to an application.

## Aiven Identity

[Aiven Identity](/docs/products/runtime/authentication/add-aiven-identity)
 is an integrated identity management system on the Aiven Platform
that controls access based on the permissions granted to users and groups
in your Aiven organization. It's a good option for granting access to your
applications with minimal setup.

## OpenID Connect (OIDC)

You can
[add any OIDC compliant IdP](/docs/products/runtime/authentication/add-oidc-identity-providers)
to your Aiven Runtime applications, including:

- [Auth0](/docs/products/runtime/authentication/oidc-auth0/)
- [Google Cloud](/docs/products/runtime/authentication/oidc-google-cloud/)
- [Microsoft Entra ID](/docs/products/runtime/authentication/oidc-ms-entra-id/)
- [Okta](/docs/products/runtime/authentication/oidc-okta/)
