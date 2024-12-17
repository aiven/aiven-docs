---
title: Set authentication policies for organization users
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

The authentication policy for your organization specifies the ways that users in your organization and their personal tokens can access the organization on the Aiven platform.

## Authentication types

When creating an authentication policy, you select the authentication methods to allow
for all users in your organization. For increased security, it's a good idea to always
[verify your organization's domains](/docs/platform/howto/manage-domains).

### Passwords and two-factor authentication

With password authentication enabled, users log in with their email
address and password. For an added layer of security, you can enforce
two-factor authentication (2FA) for password logins for all users in
your organization.

When 2FA is required, users can't access any resources in your organization until they
set up 2FA. This only applies to logins using email and password. The Aiven platform
cannot enforce 2FA for logins through third-party providers, including identity providers.

:::note
Personal tokens are not affected and continue to work when you make 2FA required.
However, when users [enable 2FA](/docs/platform/howto/user-2fa) their existing tokens
might stop working.
:::

### Third-party authentication

Users can choose to log in using Google, Microsoft, or GitHub.

### SSO with an organization identity provider

Users that are part of multiple Aiven organizations can log in using single sign-on (SSO)
and access your organization's resources with an
[identity provider](/docs/platform/howto/saml/add-identity-providers) that is configured
for any of those organizations.

You can further restrict access by requiring users to log in with one of your
organization's identity providers. This means that they cannot
log in to your organization using another Aiven organization's identity provider. It's
strongly recommended to enable this if you only have one Aiven organization.

### Personal tokens

Users can generate their own
[personal tokens](/docs/platform/howto/create_authentication_token) for use with
the Aiven API. When you turn off personal tokens, managed users can't create
personal tokens. Non-managed users can still create personal tokens, but they can't use
them to access the organization's resources.

To regularly manage your resources programmatically with the Aiven API, CLI,
Terraform Provider, or other applications, it's best to create an
[application user](/docs/platform/howto/manage-application-users) with its own tokens.

Personal tokens are generated with the authentication method that the user logged in with.
Tokens are linked to the authentication method they are created with. You can ensure that
access to your organization using tokens conforms to the authentication policy by
requiring users to be logged in with an allowed authentication method when they
use a token. If your authentication policy changes, tokens that don't conform to the
new policy stop working.

For example, if you have an authentication policy that allows users to log in with a
password, a user can log in with their email and password, and create a personal token.
This token is tied to the password authentication method they logged in with.
If the authentication policy changes later to only allow logging on with an identity
provider, then the token generated when the user was logged in with their password will
not work. After logging in with an allowed method on the new authentication policy
the user can create a token.

## Set an authentication policy

1.  In the organization, click **Admin**.
1.  Click <ConsoleLabel name="authenticationpolicy"/>.
1.  Configure the settings for your authentication policy.
1.  Click **Save changes**.
