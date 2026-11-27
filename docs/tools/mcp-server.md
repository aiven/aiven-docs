---
title: Aiven MCP server
sidebar_label: Aiven MCP
description: >-
  Create and manage Aiven for PostgreSQL, Aiven for Apache Kafka,
  and other Aiven services. Work with PostgreSQL and Kafka data,
  and deploy applications to Aiven Runtime.
keywords: [MCP, Model Context Protocol, MCP server, PostgreSQL MCP server, Postgres MCP server, Kafka MCP server, OpenSearch MCP server, AI assistants, Cursor, Claude Code, Claude Desktop, VS Code, Gemini CLI, install Aiven MCP, set up Aiven MCP]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";
import {mcpUrl} from '@site/src/components/mcpAivenLiveConstants';
import MCPConfigSection from "@site/src/components/MCPConfigSection";
import CursorConfigTab from "@site/src/components/CursorConfigTab";
import McpClientTabLabel from "@site/src/components/McpClientTabLabel";
import ClaudeCodeIcon from "@site/static/images/icons/claude-code.svg";
import CursorIcon from "@site/static/images/icons/cursor.svg";
import ClaudeDesktopIcon from "@site/static/images/icons/claude-desktop.svg";
import VSCodeIcon from "@site/static/images/icons/vscode.svg";
import GeminiCliIcon from "@site/static/images/icons/gemini-cli.svg";
import OtherClientIcon from "@site/static/images/icons/mcp-client-other.svg";
import LocalInstallIcon from "@site/static/images/icons/local-install.svg";

Aiven MCP is a Model Context Protocol (MCP) server that lets AI assistants, such as Claude Code and Cursor, manage your Aiven services and data.

Use it to create and manage Aiven for PostgreSQL®, Aiven for Apache Kafka®,
and other Aiven services. You can also troubleshoot services and deploy
applications to Aiven Runtime.

To start, create an [Aiven account](https://console.aiven.io/signup?campaign=mcp),
then see [Set up Aiven MCP](#configure-aiven-mcp). To control which
operations your assistant can perform, use [read-only mode](#read-only-mode) and
[service scopes](#limit-tool-access).

## What Aiven MCP can do

- **Create and manage services**: Create and configure
  [Aiven for PostgreSQL](/docs/products/postgresql),
  [Aiven for Apache Kafka](/docs/products/kafka),
  [Aiven for OpenSearch®](/docs/products/opensearch), and other Aiven services.
  Compare plans and pricing.
- **View resources**: List projects, services, and integrations, and check the
  status, plan, and cloud region of a service.
- **Work with PostgreSQL**: Run read-only SQL queries and supported write
  operations, analyze query performance, manage connection pools, and list
  available extensions, such as
  [pgvector](/docs/products/postgresql/concepts/pgvector).
- **Work with Apache Kafka**: Create and manage topics, produce and read
  messages, inspect schemas, and manage Kafka Connect connectors.
- **Deploy applications**: Deploy and redeploy applications to
  [Aiven Runtime](/docs/products/runtime).
- **Manage service integrations**: Create, update, and delete integrations
  between services.
- **Monitor and troubleshoot services**: Review metrics, logs, query activity,
  and configuration.
- **Discover data assets and lineage**: Search tables, topics, and schemas,
  and explore lineage with Aiven Context (early availability). Updating descriptions and tags
  requires write access.
- **Search the Aiven documentation**: Ask a question about Aiven products
  and features. The hosted server provides this tool.

### Supported data operations

Aiven MCP can read and change data in Aiven for PostgreSQL and
Aiven for Apache Kafka services. It does not support data operations on
services hosted outside Aiven.

- **PostgreSQL**: `aiven_pg_read` runs read-only SQL statements, such as
  `SELECT` and `EXPLAIN`. `aiven_pg_write` runs one supported write statement
  at a time, such as `INSERT` or `CREATE TABLE`. It blocks certain SQL
  statements, including `DROP`, `TRUNCATE`, `GRANT`, and `REVOKE`.
- **Apache Kafka**: Read and produce topic messages, and inspect Schema
  Registry subjects.
- **OpenSearch**: Aiven MCP does not provide OpenSearch-specific data tools.

For more information, see
[Aiven MCP tools](/docs/tools/mcp-server/available-tools).

## Prerequisites

- An [Aiven account](https://console.aiven.io/signup?campaign=mcp). Aiven MCP is
  included with your account at no extra cost. Resources you create through
  Aiven MCP may incur charges based on their plans and usage.
- An MCP-compatible client, such as Cursor, Claude Code, Claude Desktop,
  VS Code, or Gemini CLI.
- MCP connections enabled for your organization. If you created your Aiven
  account, you're the organization admin and can enable them in the Aiven
  Console: click **Admin** > <ConsoleLabel name="authenticationpolicy"/> >
  **Allow MCP connections**. Otherwise, ask your organization admin to enable
  them.

Hosted MCP connections use OAuth 2.0 with PKCE. When you authenticate a client for the
first time, your browser opens so you can sign in and authorize MCP access. This
is usually a one-time setup step per client.

:::note Note
Aiven owns the `aiven.live` domain and operates the hosted MCP server at
`mcp.aiven.live`. The server uses the Aiven API at `api.aiven.io` for
authorization.
:::

:::important Important
MCP tools can create, modify, and delete resources and data.
Review each action before it runs.

For production services, use [read-only mode](#read-only-mode).
For more information, see
[Security and responsibility](#security-and-responsibility).
:::

## Set up Aiven MCP {#configure-aiven-mcp}

Connect Aiven MCP to Claude Code, Cursor, Claude Desktop, VS Code, Gemini CLI,
or other MCP clients. You can also install it locally with `npx`.

<Tabs>
<TabItem value="claude-code" label={<McpClientTabLabel icon={ClaudeCodeIcon} label="Claude Code" />} default>

1. Open a terminal.
1. Choose your options, then run the generated command:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="bash"
     configTemplate={(url) => `claude mcp add --transport http aiven "${url}"`}
   />

1. Run `claude` to start Claude Code.
1. Run `/mcp`, select **aiven**, and authenticate in your browser when prompted.
1. Test the connection with a prompt such as `List my Aiven projects.` and
   approve the tool execution if prompted.

For more information, see the [Claude Code MCP documentation](https://code.claude.com/docs/en/mcp).

</TabItem>
<TabItem value="cursor" label={<McpClientTabLabel icon={CursorIcon} label="Cursor" />}>

<CursorConfigTab baseUrl={mcpUrl} />

In Cursor Chat (**Cmd+L** / **Ctrl+L**), test the connection with a prompt such
as `List my Aiven projects.` and click **Allow** if prompted.

For more information, see the [Cursor MCP documentation](https://cursor.com/docs/mcp).

</TabItem>
<TabItem value="claude-desktop" label={<McpClientTabLabel icon={ClaudeDesktopIcon} label="Claude Desktop" />}>

1. Open the Claude Desktop configuration file. If it does not exist, create it:

   - **macOS:**
     `~/Library/Application Support/Claude/claude_desktop_config.json`

   - **Windows:**
     `%APPDATA%\Claude\claude_desktop_config.json`

1. Choose your options, then add the generated configuration to the file:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="json"
     configTemplate={(url) => ({mcpServers: {aiven: {command: "npx", args: ["-y", "mcp-remote", url]}}})}
   />

1. Save the file.
1. Restart Claude Desktop.
1. In a new conversation, test the connection with a prompt such as
   `List my Aiven projects.` and click **Allow** if prompted.

For more information, see the [Claude Desktop MCP documentation](https://modelcontextprotocol.io/docs/develop/connect-local-servers).

</TabItem>
<TabItem value="vscode" label={<McpClientTabLabel icon={VSCodeIcon} label="VS Code" />}>

:::note
Requires VS Code 1.102 or later with the GitHub Copilot extension installed
and enabled.
:::

1. Open your workspace in VS Code.
1. In the workspace root, create a `.vscode` directory.
1. In the `.vscode` directory, create or edit the `mcp.json` file.
1. Choose your options, then add the generated configuration to the file:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="json"
     configTemplate={(url) => ({servers: {aiven: {type: "http", url}}})}
   />

1. Save the file.
1. Reload VS Code.
1. Open the Command Palette, run **MCP: List Servers**, and confirm that
   **aiven** appears.
1. In Copilot Chat, test the connection with a prompt such as
   `List my Aiven projects.` and click **Allow** if prompted.

For more information, see the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).

</TabItem>
<TabItem value="gemini-cli" label={<McpClientTabLabel icon={GeminiCliIcon} label="Gemini CLI" />}>

1. Create or edit the `~/.gemini/settings.json` file.
1. Choose your options, then add the generated configuration to the file:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="json"
     configTemplate={(url) => ({mcpServers: {aiven: {httpUrl: url}}})}
   />

1. Save the file.
1. Run `gemini` to start the CLI.
1. Run `/mcp auth aiven` to sign in through your browser.
1. Test the connection with a prompt such as `List my Aiven projects.` and
   approve the tool execution if prompted.

</TabItem>
<TabItem value="other" label={<McpClientTabLabel icon={OtherClientIcon} label="Other clients" />}>

1. Open your MCP client configuration.
1. Choose your options, then add the generated configuration to your client:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="json"
     configTemplate={(url) => ({mcpServers: {aiven: {url, oauth: {oauthScopes: ["projects", "services", "accounts:read"]}}}})}
   />

   Most clients use a configuration similar to the preceding example.

1. Save the file and restart your client.
1. In your AI assistant, test the connection with a prompt such as
   `List my Aiven projects.` and approve the tool execution if prompted.

Some clients require a transport type, such as `"type": "http"`. If the configuration
fails, see your client documentation.

</TabItem>
<TabItem value="local" label={<McpClientTabLabel icon={LocalInstallIcon} label="Local installation" />}>

Use a local installation if you cannot use OAuth, for example in headless
environments. The permissions of your API token apply.

Run Aiven MCP locally with `npx` instead of using the hosted server.
To authenticate requests to Aiven, use an
[Aiven API token](/docs/platform/howto/create_authentication_token).
Do not commit configuration files containing API tokens to version control.
Set `AIVEN_READ_ONLY="true"` to enable
read-only mode.

Set `AIVEN_ALLOW_SECRETS="true"` to let the AI agent access PostgreSQL and Kafka
connection credentials. Use this option only in development environments for
non-production services. For more information, see
[Security and responsibility](#security-and-responsibility).

<Tabs>
<TabItem value="claude-code" label={<McpClientTabLabel icon={ClaudeCodeIcon} label="Claude Code" />} default>

1. Open a terminal.
1. Run the following command, replacing `API_TOKEN` with your Aiven API token:

   ```bash
   claude mcp add --scope user aiven-mcp -e AIVEN_TOKEN=API_TOKEN -e AIVEN_READ_ONLY=false -e AIVEN_ALLOW_SECRETS=false -- npx -y mcp-aiven
   ```

1. Run `claude` to start Claude Code.
1. Run `/mcp` to verify that Claude Code lists the server.

</TabItem>
<TabItem value="cursor" label={<McpClientTabLabel icon={CursorIcon} label="Cursor" />}>

1. Create or edit the `.cursor/mcp.json` file in your project root.
1. Add the following configuration, replacing `API_TOKEN` with your Aiven API token:

   ```json
   {
     "mcpServers": {
       "aiven-mcp": {
         "command": "npx",
         "args": ["-y", "mcp-aiven"],
         "env": {
           "AIVEN_TOKEN": "API_TOKEN",
           "AIVEN_READ_ONLY": "false",
           "AIVEN_ALLOW_SECRETS": "false"
         }
       }
     }
   }
   ```

1. Save the file and restart Cursor.

</TabItem>
<TabItem value="claude-desktop" label={<McpClientTabLabel icon={ClaudeDesktopIcon} label="Claude Desktop" />}>

1. Open the Claude Desktop configuration file.
1. Add the following configuration, replacing `API_TOKEN` with your Aiven API token:

   ```json
   {
     "mcpServers": {
       "aiven-mcp": {
         "command": "npx",
         "args": ["-y", "mcp-aiven"],
         "env": {
           "AIVEN_TOKEN": "API_TOKEN",
           "AIVEN_READ_ONLY": "false",
           "AIVEN_ALLOW_SECRETS": "false"
         }
       }
     }
   }
   ```

1. Save the file and restart Claude Desktop.

</TabItem>
<TabItem value="vscode" label={<McpClientTabLabel icon={VSCodeIcon} label="VS Code" />}>

1. In the `.vscode` directory, create or edit the `mcp.json` file.
1. Add the following configuration, replacing `API_TOKEN` with your Aiven API token:

   ```json
   {
     "servers": {
       "aiven-mcp": {
         "command": "npx",
         "args": ["-y", "mcp-aiven"],
         "env": {
           "AIVEN_TOKEN": "API_TOKEN",
           "AIVEN_READ_ONLY": "false",
           "AIVEN_ALLOW_SECRETS": "false"
         }
       }
     }
   }
   ```

1. Save the file and reload VS Code.

</TabItem>
<TabItem value="other" label={<McpClientTabLabel icon={OtherClientIcon} label="Other clients" />}>

1. Open your MCP client configuration.
1. Add the following configuration, replacing `API_TOKEN` with your Aiven API token:

   ```json
   {
     "mcpServers": {
       "aiven-mcp": {
         "command": "npx",
         "args": ["-y", "mcp-aiven"],
         "env": {
           "AIVEN_TOKEN": "API_TOKEN",
           "AIVEN_READ_ONLY": "false",
           "AIVEN_ALLOW_SECRETS": "false"
         }
       }
     }
   }
   ```

1. Save the file and restart your client.

</TabItem>
</Tabs>

</TabItem>
</Tabs>

After you restart your client, test the connection with the following prompt:

```text
List my Aiven projects.
```

After you verify the connection, try
[creating a PostgreSQL service](/docs/tools/mcp-server/example-prompts#create-a-postgresql-service)
or [creating a Kafka service](/docs/tools/mcp-server/example-prompts#create-a-kafka-service).

## Example prompts {#example-prompts}

Use example prompts to create services, query PostgreSQL data, manage Kafka
topics and messages, and troubleshoot services. Prompts list the required
service scope and write access where they apply.

For more information, see
[Example prompts for Aiven MCP](/docs/tools/mcp-server/example-prompts).

## Read-only mode

Read-only mode limits the tools that can change resources or data.
It applies at the organization level and the client level.

In read-only mode, read tools such as `aiven_pg_read` and
`aiven_kafka_topic_message_list` remain available. Aiven MCP excludes write
tools, such as `aiven_pg_write` and `aiven_kafka_topic_create`, by default.

At the client level, you can
[allow specific write operations](#restrict-write-operations).
An [organization-level read-only policy](#organization-level)
overrides those client settings.

`aiven_service_connection_info` does not run in read-only mode.
Aiven Context search and lineage tools still run.

### Organization level

Organization admins can restrict MCP connections to read-only operations for
all users in the organization.

1. In the organization, click **Admin** >
   <ConsoleLabel name="authenticationpolicy"/>.
1. Select **Restrict MCP connections to read-only operations**.

This policy overrides client-level settings, including any write allowlist.
Users cannot enable write operations when the organization policy requires
read-only access.

For more information, see
[Set authentication policies for organization users](/docs/platform/howto/set-authentication-policies).

### Client level

In [Set up Aiven MCP](#configure-aiven-mcp), use the **Access** options to
configure your client:

- **Full access**: Makes write tools available, subject to your Aiven user
  permissions.
- **Read-only**: Excludes tools that modify resources or data.
- **Read-only, plus specific writes**: Excludes write tools except those you
  select.

To configure read-only mode manually, add `read_only=true` to the hosted server
URL or set `AIVEN_READ_ONLY=true` for a local installation. You can combine
read-only mode with service scopes:

```text
https://mcp.aiven.live/mcp?services_scope=pg&read_only=true
```

### Allow specific write operations {#restrict-write-operations}

To allow selected write operations while your client is in read-only mode,
choose **Read-only, plus specific writes** under **Access** in
[Set up Aiven MCP](#configure-aiven-mcp).

For the hosted server, set `read_only=true` and add the permitted tool names
to the `write_allowlist` URL parameter, separated by commas. For example, to
allow Kafka topic creation:

```text
https://mcp.aiven.live/mcp?services_scope=kafka&read_only=true&write_allowlist=aiven_kafka_topic_create
```

For a local installation, set the `AIVEN_WRITE_ALLOWLIST` environment variable.
The write allowlist applies only when you enable read-only mode. For supported
tool names, see [Aiven MCP tools](/docs/tools/mcp-server/available-tools).

The write allowlist doesn't grant additional Aiven permissions. Your user
still needs permission to perform each allowed operation. An
[organization-level read-only policy](#organization-level) takes precedence
over the write allowlist.

## Limit tool access

Use service scopes to control which tools are available to your AI assistant.

Service scopes don't change your Aiven user permissions. The MCP server can
perform only the actions that your authenticated user has permission to perform.

### Available service scopes

Use the **Services** options in [Set up Aiven MCP](#configure-aiven-mcp) to
select which groups of tools are available to your AI assistant.

| Scope          | Selector option       | Description                                                                                                        |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `core`         | Always included       | Tools for managing Aiven projects, services, plans, metrics, and logs                                              |
| `pg`           | PostgreSQL            | Tools for querying PostgreSQL, analyzing query performance, listing extensions, and managing connection pools |
| `kafka`        | Kafka                 | Tools for managing Apache Kafka topics, messages, connectors, and schemas                                          |
| `application`  | Applications          | Tools for deploying and redeploying applications and managing version control integrations                         |
| `integrations` | Integrations          | Tools for managing service integrations and listing available integration and endpoint types                       |
| `opensearch`   | OpenSearch            | Includes only the `core` tools                                                                                     |
| `context`      | Context <EarlyBadge/> | Tools for searching data assets, viewing lineage, and updating asset descriptions and tags                         |
| `all`          | All                   | All available tools (default)                                                                                      |

:::note[Note]
Aiven Context is in
[early availability](/docs/platform/concepts/service-and-feature-releases#early-availability-).
To use the `context` scope, your organization must have Aiven Context enabled.
Contact your Aiven account team to request access.
:::

When configuring service scopes:

- The `core` scope is always included, even if you don't specify it.
- You can combine scopes. For example, `pg,kafka` loads the `core`, PostgreSQL,
  and Kafka tools.
- You can't combine `all` with other scopes. Doing so returns an error.
- If you don't specify a scope, Aiven MCP loads all available tools.

For more information about the tools in each scope, see
[Aiven MCP tools](/docs/tools/mcp-server/available-tools).

### Configure service scopes

When you select service scopes in [Set up Aiven MCP](#configure-aiven-mcp), the
generated configuration includes the corresponding settings. Selecting **All**
doesn't add a `services_scope` parameter.

To configure service scopes manually on the hosted server, add the
`services_scope` parameter to the server URL. Separate multiple scopes with
commas.

For example, to load Kafka tools:

```text
https://mcp.aiven.live/mcp?services_scope=kafka
```

To load both PostgreSQL and Kafka tools:

```text
https://mcp.aiven.live/mcp?services_scope=pg,kafka
```

For a local installation, set the `AIVEN_SERVICES_SCOPE` environment variable in
the `env` section of your MCP client configuration:

```json
{
  "mcpServers": {
    "aiven-mcp": {
      "command": "npx",
      "args": ["-y", "mcp-aiven"],
      "env": {
        "AIVEN_TOKEN": "API_TOKEN",
        "AIVEN_SERVICES_SCOPE": "pg,kafka"
      }
    }
  }
}
```

Replace `API_TOKEN` with your Aiven API token. This example uses the
`mcpServers` format. For VS Code, use `servers` instead.

To verify which tools are available, open your MCP client's tool list.

## Available tools {#available-tools}

Aiven MCP tools are grouped by service scope. The tools available to your AI
assistant depend on your service scopes and read-only mode. Your Aiven user
permissions determine which operations you can perform.

For more information, see
[Aiven MCP tools](/docs/tools/mcp-server/available-tools).

## Security and responsibility

:::important Important
MCP tools can create, modify, and delete resources and data.
AI agents can misinterpret natural language prompts. Operations such as
deleting Kafka topics, connectors, or service integrations can result in
data loss or service disruption.

Aiven secures the MCP server and data in transit. Your selected AI agent
provider determines how the agent uses your data, including whether it uses
that data for training. Review the provider's terms before you enable the
integration.
:::

Under the [shared responsibility model](https://aiven.io/responsibility-matrix),
security and compliance for MCP usage are shared between Aiven and your
organization. Aiven secures the platform and API. You are responsible for the
following:

- **Decide on MCP access.** Evaluate whether to enable MCP in your organization
  and the associated risks.
- **Control access.** Scope API tokens to the minimum permissions needed and
  rotate them regularly.
- **Review AI agent actions.** Review actions before they run, especially write
  or delete operations on production resources.
- **Limit write access.** Use [read-only mode](#read-only-mode).
- **Restrict access to connection credentials.** The
  **Allow connection credentials** option (`allow_secrets=true`) returns
  PostgreSQL and Kafka connection credentials, including URIs, passwords, and
  certificates, to the AI agent. Use it only for development with
  non-production services that do not hold sensitive data.

Read-only mode does not prevent your AI assistant from accessing or returning
sensitive data through permitted read operations.

The Aiven MCP server can also connect directly to PostgreSQL services running
in a private VPC.

## Troubleshoot Aiven MCP {#troubleshoot-aiven-mcp}

Common problems include connection failures, missing tools, failed PostgreSQL
queries, and write operations that do not run. For more information, see
[Troubleshoot Aiven MCP](/docs/tools/mcp-server/troubleshooting).

<RelatedPages/>

- [Aiven MCP use cases](https://aiven.io/mcp): Examples of what you can do with
  Aiven MCP
- [Aiven MCP announcement](https://aiven.io/blog/aiven-mcp): Overview of what
  Aiven MCP can do
- [PostgreSQL MCP server blog post](https://aiven.io/blog/postgresql-mcp):
  Use Aiven MCP with PostgreSQL
- [Kafka MCP blog post](https://aiven.io/blog/kafka-mcp):
  Use Aiven MCP with Apache Kafka
