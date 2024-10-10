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

Aiven also supports System for Cross-domain Identity Management (SCIM) for Okta to automatically
provision, update, and deactivate user identities from your IdP.
With automatic provisioning you don’t need to manually create organization users.

When adding an IdP you link it to the verified domain
and can set up SCIM at the same time.

## Limitations

You can link each verified domain to only one IdP. If you set up user provisioning with
SCIM, you should only make changes to user details in the IdP.

## Security best practices

It’s recommended to verify your domains in Aiven even if you don’t use SSO. When
configuring an IdP it's best to enable the following SAML security settings:

- **Require assertion to be signed**: Verifies assertions were issued by a trusted party
  and have not been tampered with.
- **Sign authorization request sent to IdP**: Ensures authenticity and integrity with a
  digital signature.

The [authentication policy](/docs/platform/howto/set-authentication-policies) for the
organization is also an important component in securing access through an IdP. At a
minimum, use these settings for your authentication policy:

- Don't allow password authentication
- Require log in with this organization's identity provider

To limit access further, also consider these authentication policy settings:

- **Don't allow third-party authentication**: This combined with the preceding password and
  organization identity provider settings ensures that users only log in to the Console
  with your chosen IdP.
- **Don't allow users to create personal tokens**: This prevents users from accessing
  organization resources through the API.

If you allow your users to create personal tokens, you can still make these more
secure by enabling **Require users to be logged in with an allowed
authentication method**. This means that users cannot access your organization's
resources with a token they created when logged in with another organization's
allowed authentication methods or a previously allowed method.
This setting also gives you the flexibility to change the authentication policy at any
time because tokens that are no longer compliant with the new policy cannot be used.
