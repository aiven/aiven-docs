---
title: Aiven CLI
---

The Aiven command line interface (CLI) lets you use the Aiven platform and services in a scriptable way through the API.

It's available [on GitHub](https://github.com/aiven/aiven-client). Check out
[this blog](https://aiven.io/blog/aiven-cmdline) to learn how to use the Aiven CLI
for common tasks. If you prefer video, watch the short
[how to get started tutorial](https://www.youtube.com/watch?v=nf3PPn5w6K8).

## Get started

### Install

The `avn` utility is a Python package that you can install using `pip`:

```
pip install aiven-client
```

You can also use [Homebrew](https://formulae.brew.sh/formula/aiven-client) to install it:

```
brew install aiven-client
```

To check your installation run `avn --version`.

### Authenticate

There are two options for authenticating. The first is to use your
email and password:

1. To log in with your email, run:
   ```
   avn user login EMAIL_ADDRESS
   ```

1. When prompted, enter your password.

For increased security, you can use an
[authentication token](/docs/platform/howto/create_authentication_token) by running
this command:

```
avn user login EMAIL_ADDRESS --token
```

## Commands

Top-level commands for the Aiven CLI.

### `account`

Handle the accounts you have access to, and also configure the teams for
the accounts.

Find more info on the help article about
[Accounts, Teams, Members and Roles](/docs/platform/concepts/projects_accounts_access)

[View detailed command information](cli/account).

### `billing-group`

A set of administrative commands to set up billing groups and manage
which projects should be linked to which billing group. Find more
information in the [User Guide for Billing
Groups](https://help.aiven.io/en/articles/4720981-using-billing-groups-via-cli).

The billing group command also enables access to the credit code
features, and detailed invoice line data.

### `cloud`

Use `avn cloud list` to get a list of all available clouds on Aiven.
This is useful for looking up the cloud name to use with `service`
commands.

[View detailed command information](cli/cloud).

### `credits`

Claim or view the history of credit codes.

[View detailed command information](cli/credits).

### `events`

Inspect the events on your account such as the services created/deleted,
and which users triggered each event.

[View detailed command information](cli/events).

### `help`

Detailed help on using the CLI.

### `mirrormaker`

Manage the replication flows for Apache Kafka® MirrorMaker 2.

[View detailed command information](cli/mirrormaker).

### `project`

Manage all the projects on your Aiven account, and switch which one is
the default option for `avn` commands. Manage project invitations for
all users.

Download the CA cert for this project (CA certs are common for all
services in a project).

[View detailed command information](cli/project).

### `service`

[View detailed command information](cli/service-cli).

### `ticket`

Create or list tickets. An alternative support ticket interface to
either email or the chat widget found on our web console.

[View detailed command information](cli/ticket).

### `user`

Log in, log out, and manage your user tokens. You can also create other
users.

[View detailed command information](cli/user)

### `vpc`

Manage your VPC configuration including user/peer networks.

[View detailed command information](cli/vpc)

## General usage

Try the `--json` switch to any command to get more information, in a
JSON format.
