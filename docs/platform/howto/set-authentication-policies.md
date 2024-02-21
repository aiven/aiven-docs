---
title: Set authentication policies for organization users
---

The authentication policy for your organization specifies the ways that
users can access your organization on the Aiven platform: with a
password, third-party authentication, or organization single sign-on
(SSO).

## Authentication types

### Passwords and two-factor authentication

With password authentication enabled, users log in with their email
address and password. For an added layer of security, you can enforce
two-factor authentication (2FA) for password logins for all users in
your organization.

When 2FA is required, users won't be able to
access any resources in your organization until they set up 2FA.

:::note
Authentication tokens are not affected and continue to work when you make 2FA required.
However, when users [enable 2FA](/docs/platform/howto/user-2fa) their existing authentication tokens are revoked.
:::

### Third-party authentication

Users can choose to log in using Google, Microsoft, or GitHub.

### Organization identity providers (SSO)

Organization users are restricted to logging in using SSO through an
[identity provider](/docs/platform/howto/saml/add-identity-providers).

## Set an authentication policy

To set an authentication policy for all users in an organization:

1.  In the organization, click **Admin**.
2.  Click **Authentication**.
3.  Click the toggle for each authentication method that you want to
    allow.
4.  Click **Save changes**.
