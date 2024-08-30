---
title: Tokens
---

There are 3 types of tokens used to access the Aiven platform: session tokens, personal tokens, and application tokens.

Session tokens are created when you log in or make an API call. These tokens are revoked
when you log out of the Aiven Console or the CLI.

You can create personal tokens to access resources instead of using your password.
Application tokens are linked to
[application users](/docs/platform/concepts/application-users). Application users and
tokens are a more secure option for non-human users like external applications. You can
create multiple personal or application tokens for different use cases or applications.


## Token limits

The maximum number of personal tokens that you can create is 10. Personal tokens are
never invalidated unless they expire or are revoked. For automatically created tokens
the limit is 1000. Aiven automatically deletes tokens when the limit is reached,
meaning an old token can stop working even if it hasn't expired or been revoked.

To avoid problems, you can configure session duration times for your tokens.
This is especially useful for automation that creates tokens.

## Token security

To keep your personal tokens secure:

- Set a session duration to limit the impact of exposure
- Refrain from letting users share tokens
- Rotation your tokens regularly
- Use application users for non-human users and follow
  [security best practices](/docs/platform/concepts/application-users) for their tokens
