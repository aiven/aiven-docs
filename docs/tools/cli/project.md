---
title: avn project
---

This article has the full list of commands for managing projects in
Aiven using `avn project`.

## Manage project details

### `avn project details`

Fetches project details.

| Parameter   | Information                      |
| ----------- | -------------------------------- |
| `--project` | The project to fetch details for |

**Example:** Show the details of the currently selected project:

```shell
avn project details
```

**Example:** Show the details of a project:

> avn project details \--project my-project

### `avn project switch`

Sets the default project to use when one is not specified in an `avn`
command.

| Parameter      | Information                  |
| -------------- | ---------------------------- |
| `project_name` | Required positional argument |

**Example:** Make the project named `my-project` the default for all
commands where the `--project` parameter isn\'t supplied:

```shell
avn project switch my-project
```

### `avn project list`

Lists all the projects that you have access to.

**Example:** List all the projects available to use with a `--project`
command switch:

```shell
avn project list
```

### `avn project create` and `avn project update` {#avn-create-update-project}

Creates a new project with `create` or changes the settings with
`update`. An account is the same as an
[organization or organizational unit](/docs/platform/concepts/projects_accounts_access).

| Parameter                              | Information                                                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `project_name` (required for `create`) | Note: This is a positional argument, not a switch.                                                                 |
| `--project` (required for `update`)    | The project to amend, use with `update` only                                                                       |
| `--name` (`update` only)               | Supply a new name for the project                                                                                  |
| `--account-id`                         | The organization or unit to create the project in                                                                  |
| `--billing-group-id`                   | Billing group ID to use                                                                                            |
| `--card-id`                            | The card ID (see `avn card`)                                                                                       |
| `--cloud`                              | The cloud to use by default (see `avn cloud`)                                                                      |
| `--no-fail-if-exists`                  | Makes the command safe to run repeatedly, it will succeed if a project of this name already exists.                |
| `--copy-from-project` (`create` only)  | Project name to use as a template                                                                                  |
| `--country-code`                       | [Code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) for the billing country |
| `--billing-address`                    | Address to bill to                                                                                                 |
| `--billing-extra-text`                 | Information to include with an invoice such as a cost center number                                                |
| `--billing-currency`                   | The currency to bill in. The choices are: \"AUD\" \"CAD\" \"CHF\" \"DKK\" \"EUR\" \"GBP\" \"NOK\" \"SEK\" \"USD\"  |
| `--vat-id`                             | VAT ID for this project                                                                                            |
| `--billing-email`                      | Email for the billing contact                                                                                      |
| `--tech-email`                         | Email for the technical contact                                                                                    |

**Example:** Create a project named `my-project`:

```shell
avn project create my-project
```

**Example:** Create a project in an organization using `my-project` as a
template and set the email address for the technical contact:

```shell
avn project create \
  --create-project-from my-project \
  --account-id abcdef0123456789 \
  --tech-email geek@example.com \
  my-other-project
```

**Example:** Rename a project:

```shell
avn project update
  --project my-project
  --name my-better-named-project
```

### `avn project delete` {#avn-delete-project}

Deletes a project. If the project isn\'t empty, it removes the services
in it first.

:::note
Aiven doesn\'t allow the deletion of non-empty projects as safeguard
against accidental code execution.
:::

**Example:** Delete `my-project`:

```shell
avn project delete my-project
```

## Manage project certificates

CA certificates are managed at the project level.

### `avn project ca-get` {#avn_project_ca_get}

Downloads the CA certificate for this project, the certificate is saved
in the file name you supply.

| Parameter           | Information                       |
| ------------------- | --------------------------------- |
| `--project`         | The project to fetch details for  |
| `--target-filepath` | File name, including path, to use |

**Example:** Download the CA certificate for the current project, and
save it in a file in the current directory called `ca.pem`:

```shell
avn project ca-get --target-filepath ca.pem
```

## Manage users and invitations

Manage user access to the project.

### `avn project invite-list`

Lists the open invitations to the project.

| Parameter   | Information                         |
| ----------- | ----------------------------------- |
| `--project` | The project to show invitations for |

**Example:** List the invitations for the current project:

```shell
avn project invite-list
```

### `avn project user-list`

Lists the users with access to the project.

| Parameter   | Information                   |
| ----------- | ----------------------------- |
| `--project` | The project to show users for |

**Example:** List the users with access to project `my-project`:

```shell
avn project user-list --project my-project
```

### `avn project user-invite`

Sends an email invitation to a user to join a project.

| Parameter          | Information                                     |
| ------------------ | ----------------------------------------------- |
| `email` (required) | Note: this is a positional argument             |
| `--project`        | The project to invite the user to               |
| `--role`           | Can be \"operator\", \"developer\" or \"admin\" |

**Example:** Invite an important person to be an admin on the
currently-selected project:

```shell
avn project user-invite --role admin boss@example.com
```

### `avn project user-remove`

Removes a user with the supplied email address from the project.

| Parameter          | Information                         |
| ------------------ | ----------------------------------- |
| `email` (required) | Note: This is a positional argument |
| `--project`        | The project to remove the user from |

**Example:** Remove the user with email `alice@example.com` from project
`my-project`:

```shell
avn project user-remove --project my-project alice@example.com
```

## Request project SBOM

SBOM reports are generated per project and can be downloaded as long as
the necessary permissions are set for the project. You can get the SBOM
report download link for a project using the following command:

### `avn project generate-sbom`

| Parameter   | Information                 |
| ----------- | --------------------------- |
| `--project` | The project name            |
| `--output`  | Output format (CSV or SPDX) |

**Example:** Get the SBOM report download link for the project
`my-project` in `csv` format:

```
avn project generate-sbom --project my-project --output csv
```
