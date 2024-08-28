---
title: Set authentication policies for organization users
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

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

[Personal tokens](/docs/platform/howto/create_authentication_token) are tokens that
users create themselves for use with the Aiven API. Personal tokens are generated with
and linked to the authentication method that the user logged in with. You can ensure
that access to your organization using tokens conforms to the authentication policy
by requiring users to be logged in with an allowed authentication method when
they use a token. If your authentication policy changes, tokens that don't conform to the
new policy stop working.

For example, if you have an authentication policy that allows users to log in with a
password, a user can log in with their email and password, and create a personal token.
This token is tied to the password authentication method they logged in with.
If the authentication policy changes later to only allow logging in with an identity
provider, then the token generated when the user was logged in with their password will
not work. After logging in with the allowed method on the new authentication policy
the user can create a token.

The authentication policy setting for personal tokens only applies to managed users.
If **Allow managed users to create personal tokens** is disabled, managed users
cannot create personal tokens. Non-managed users can still create personal tokens,
but they can't use them to access the organization's resources.

Even with this setting disabled, managed users can still create personal tokens
in any other organization they are a member of that has it enabled. They can
use the personal tokens from other organizations to access your organization's
resources. To restrict the use of personal tokens from other organizations, select
**Require users to be logged in with an allowed authentication method**.

To regularly manage your resources programmatically with the API, CLI, Terraform,
or other applications, it's best to create an
[application user](/docs/platform/howto/manage-application-users) with its own tokens.


## Set an authentication policy

1.  In the organization, click **Admin**.
1.  Click <ConsoleLabel name="authenticationpolicy"/>.
1.  Configure the settings for your authentication policy.
1.  Click **Save changes**.
