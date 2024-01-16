---
title: avn project
---

This article has the full list of commands for managing projects in
Aiven using `avn project`.

## Manage project details

### `avn project details`

Fetches project details.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`--project`</td>
      <td>The project to fetch details for</td>
    </tr>
  </tbody>
</table>


**Example:** Show the details of the currently selected project:

``` shell
avn project details
```

**Example:** Show the details of a project:

> avn project details \--project my-project

### `avn project switch`

Sets the default project to use when one is not specified in an `avn`
command.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`project_name`</td>
      <td>Required positional argument</td>
    </tr>
  </tbody>
</table>


**Example:** Make the project named `my-project` the default for all
commands where the `--project` parameter isn\'t supplied:

``` shell
avn project switch my-project
```

### `avn project list`

Lists all the projects that you have access to.

**Example:** List all the projects available to use with a `--project`
command switch:

``` shell
avn project list
```

### `avn project create` and `avn project update` {#avn-create-update-project}

Creates a new project with `create` or changes the settings with
`update`. An account is the same as an
[organization or organizational unit](/docs/platform/concepts/projects_accounts_access).

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`project_name` (required for `create`)</td>
      <td>Note: This is a positional argument, not a switch</td>
    </tr>
    <tr>
      <td>`--project` (required for `update`)</td>
      <td>The project to amend, use with `update` only</td>
    </tr>
    <tr>
      <td>`--name` (`update` only)</td>
      <td>Supply a new name for the project</td>
    </tr>
    <tr>
      <td>`--account-id`</td>
      <td>The organization or unit to create the project in</td>
    </tr>
    <tr>
      <td>`--billing-group-id`</td>
      <td>Billing group ID to use</td>
    </tr>
    <tr>
      <td>`--card-id`</td>
      <td>The card ID (see `avn card`)</td>
    </tr>
    <tr>
      <td>`--cloud`</td>
      <td>The cloud to use by default (see `avn cloud`)</td>
    </tr>
    <tr>
      <td>`--no-fail-if-exists`</td>
      <td>Makes the command safe to run repeatedly, it will succeed if a project of this name already exists.</td>
    </tr>
    <tr>
      <td>`--copy-from-project` (`create` only)</td>
      <td>Project name to use as a template</td>
    </tr>
    <tr>
      <td>`--country-code`</td>
      <td>[Code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) for the billing country</td>
    </tr>
    <tr>
      <td>`--billing-address`</td>
      <td>Address to bill to</td>
    </tr>
    <tr>
      <td>`--billing-extra-text`</td>
      <td>Information to include with an invoice such as a cost center number</td>
    </tr>
    <tr>
      <td>`--billing-currency`</td>
      <td>The currency to bill in. The choices are: \"AUD\" \"CAD\" \"CHF\" \"DKK\" \"EUR\" \"GBP\" \"NOK\" \"SEK\" \"USD\"</td>
    </tr>
    <tr>
      <td>`--vat-id`</td>
      <td>VAT ID for this project</td>
    </tr>
    <tr>
      <td>`--billing-email`</td>
      <td>Email for the billing contact</td>
    </tr>
    <tr>
      <td>`--tech-email`</td>
      <td>Email for the technical contact</td>
    </tr>
  </tbody>
</table>


**Example:** Create a project named `my-project`:

``` shell
avn project create my-project
```

**Example:** Create a project in an organization using `my-project` as a
template and set the email address for the technical contact:

``` shell
avn project create \
  --create-project-from my-project \
  --account-id abcdef0123456789 \
  --tech-email geek@example.com \
  my-other-project
```

**Example:** Rename a project:

``` shell
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

``` shell
avn project delete my-project
```

## Manage project certificates

CA certificates are managed at the project level.

### `avn project ca-get` {#avn_project_ca_get}

Downloads the CA certificate for this project, the certificate is saved
in the file name you supply.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`--project`</td>
      <td>The project to fetch details for</td>
    </tr>
    <tr>
      <td>`--target-filepath`</td>
      <td>File name, including path, to use</td>
    </tr>
  </tbody>
</table>


**Example:** Download the CA certificate for the current project, and
save it in a file in the current directory called `ca.pem`:

``` shell
avn project ca-get --target-filepath ca.pem
```

## Manage users and invitations

Manage user access to the project.

### `avn project invite-list`

Lists the open invitations to the project.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`--project`</td>
      <td>The project to show invitations for</td>
    </tr>
  </tbody>
</table>


**Example:** List the invitations for the current project:

``` shell
avn project invite-list
```

### `avn project user-list`

Lists the users with access to the project.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`--project`</td>
      <td>The project to show users for</td>
    </tr>
  </tbody>
</table>


**Example:** List the users with access to project `my-project`:

``` shell
avn project user-list --project my-project
```

### `avn project user-invite`

Sends an email invitation to a user to join a project.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`email` (required)</td>
      <td>Note: this is a positional argument</td>
    </tr>
    <tr>
      <td>`--project`</td>
      <td>The project to invite the user to</td>
    </tr>
    <tr>
      <td>`--role`</td>
      <td>Can be \"operator\", \"developer\" or \"admin\"</td>
    </tr>
  </tbody>
</table>


**Example:** Invite an important person to be an admin on the
currently-selected project:

``` shell
avn project user-invite --role admin boss@example.com
```

### `avn project user-remove`

Removes a user with the supplied email address from the project.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`email` (required)</td>
      <td>Note: This is a positional argument</td>
    </tr>
    <tr>
      <td>`--project`</td>
      <td>The project to remove the user from</td>
    </tr>
  </tbody>
</table>


**Example:** Remove the user with email `alice@example.com` from project
`my-project`:

``` shell
avn project user-remove --project my-project alice@example.com
```

## Request project SBOM

SBOM reports are generated per project and can be downloaded as long as
the necessary permissions are set for the project. You can get the SBOM
report download link for a project using the following command:

### `avn project generate-sbom`

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`--project`</td>
      <td>The project name</td>
    </tr>
    <tr>
      <td>`--output`</td>
      <td>Output format (CSV or SPDX)</td>
    </tr>
  </tbody>
</table>


**Example:** Get the SBOM report download link for the project
`my-project` in `csv` format:

``` 
avn project generate-sbom --project my-project --output csv
```
