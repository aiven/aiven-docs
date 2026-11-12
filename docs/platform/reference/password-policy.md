---
title: Password policy
---

Aiven enforces password requirements for your user account: a minimum length, no repeating characters, and no common words or personal details.
Creating a strong password makes it harder for attackers to gain unauthorized access to
your account.

Creating a strong password is a first step in securing your account. You
can add another layer of security by
[enabling two-factor authentication](/docs/platform/howto/user-2fa).

## Password requirements

Aiven enforces the following rules for password strength:

-   Minimum length is 8 characters
-   Cannot contain single repeating characters such as `aaaaaaaa`
-   Cannot contain your name or email address
-   Cannot contain common words, phrases, or strings such as password,
    security, or common names
-   Cannot contain words that are very similar to common words such as
    `password1`

These rules are also used for service integration passwords. For remote
services (for example, sending logs to an external OpenSearch® service),
these rules are not enforced, but they are recommended.

## Password tips

The following are some suggestions for creating or resetting your Aiven
password:

-   Use a password manager to create a randomly generated strong
    password
-   Use passphrases since these are harder to guess
-   Do not use the same password for multiple services
