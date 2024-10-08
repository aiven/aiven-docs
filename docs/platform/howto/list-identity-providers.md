---
title: Identity providers and SAML authentication
sidebar_label: Identity providers
---

Set up single sign-on (SSO) access to Aiven through a Security Assertion Markup Language (SAML) compliant identity provider (IdP). This lets you centrally manage your users in your IdP while giving them a seamless login experience.

Every IdP must be linked to a domain in Aiven. After you
[verify that you own a domain](/docs/platform/howto/manage-domains), the users in your
organization become managed users, which provides a higher level of security for your
organization by controlling things like
[how these users log in](/docs/platform/howto/set-authentication-policies).

With a verified domain you can add an IdP. All users with an email address from
the verified domain are automatically authenticated with the linked IdP. With
IdP-initiated SSO enabled, users can log in to Aiven directly from the IdP.
As a security best practice, it’s recommended to verify your domains in Aiven
even if you don’t use SSO.

Aiven also supports System for Cross-domain Identity Management (SCIM) for Okta to automatically
provision, update, and deactivate user identities from your IdP.
With automatic provisioning you don’t need to manually create organization users.

When adding an IdP you link it to the verified domain
and can set up SCIM at the same time.

## Limitations

- You can link each verified domain to only one IdP.
- You should only make changes to user details in the IdP.

## Security best practices
