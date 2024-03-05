---
title: Aiven CLI
---

The Aiven command line interface (CLI) lets you use the Aiven platform and services in a scriptable way through the API.

## Get started

### Install

1. The `avn` utility is a Python package that you can install using `pip`:

   ```bash
   pip install aiven-client
   ```

   You can also use [Homebrew](https://formulae.brew.sh/formula/aiven-client) to install it:

   ```bash
   brew install aiven-client
   ```

1. To check your installation, run:

   ```bash
   avn --version
   ```

## Authenticate

You can authenticate using your password or an
[authentication token](/docs/platform/concepts/authentication-tokens).

### Password authentication

1. To log in with your email, run:

   ```bash
   avn user login EMAIL_ADDRESS
   ```

1. When prompted, enter your password.

### Token authentication

1. Create an
[authentication token](/docs/platform/howto/create_authentication_token).

1. To authenticate with a token, run:

   ```bash
   avn user login EMAIL_ADDRESS --token
   ```

## Format output

To get information in JSON format, use the `--json` switch with any command.

## Related pages

- [Learn how to use the Aiven CLI](https://aiven.io/blog/aiven-cmdline) for common tasks.
- Watch the [how to get started tutorial](https://www.youtube.com/watch?v=nf3PPn5w6K8).
- Go to the [aiven-client repository on GitHub](https://github.com/aiven/aiven-client).
