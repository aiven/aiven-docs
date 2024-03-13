---
title: Set authentication policies for organization users
---

The authentication policy for your organization specifies the ways that users in your organization can access the organization on the Aiven platform.

## Authentication types

### Passwords and two-factor authentication

With password authentication enabled, users log in with their email
address and password. For an added layer of security, you can enforce
two-factor authentication (2FA) for password logins for all users in
your organization.

When 2FA is required, users can't access any resources in your organization until they
set up 2FA.

:::note
Personal tokens are not affected and continue to work when you make 2FA required.
However, when users [enable 2FA](/docs/platform/howto/user-2fa) their existing tokens
might stop working.
:::

### Third-party authentication

Users can choose to log in using Google, Microsoft, or GitHub.

### SSO with an organization identity providers

Users that are part of multiple Aiven organizations can log in using single sign-on (SSO)
and access your organization’s resources with an
[identity provider](/docs/platform/howto/saml/add-identity-providers) that is configured
for any of those organizations.

You can further restrict access by requiring users to log in with one of your
organization’s identity providers. This means that they cannot log in to your organization
using another Aiven organization's identity provider.

### Personal tokens

Users can generate their own personal
[authentication tokens](docs/platform/howto/create_authentication_token).
Tokens are used to access the Aiven platform through the API, CLI, Terraform, or
other applications.

Personal tokens are generated with the authentication method that the user logged in with.
Tokens are linked to the authentication method they are created with. You can ensure that
access to your organization using tokens conforms to the authentication policy by
requiring users to be logged in with an allowed authentication method when they
use a token. If your authentication policy changes, tokens that don’t conform to the
new policy stop working.

For example, if you have an authentication policy that allows users to log in with a
password, a user can log in with their email and password, and create a personal token.
This token is tied to the password authentication method they logged in with.
If the authentication policy changes later to only allow logging on with an identity
provider, then the token generated when the user was logged in with their password will
not work. After logging in with an allowed method on the new authentication policy
the user can create a new token.

## Set an authentication policy

1.  In the organization, click **Admin**.
1.  Click **Authentication**.
1.  Configure the settings for your authentication policy.
1.  Click **Save changes**.
