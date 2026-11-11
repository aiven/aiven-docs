---
title: Aiven MCP server for managed services
sidebar_label: Aiven MCP
description: Connect AI assistants such as Claude Code, Cursor, VS Code or Gemini CLI to Aiven for PostgreSQL, Apache Kafka, OpenSearch and more with the hosted Aiven MCP server.
keywords: [MCP, Model Context Protocol, MCP server, PostgreSQL MCP server, Postgres MCP server, Kafka MCP server, OpenSearch MCP server, AI assistants, Cursor, Claude Code, Claude Desktop, VS Code, Gemini CLI]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
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

Aiven MCP is a Model Context Protocol (MCP) server that lets AI assistants such
as Cursor and Claude Code create and manage Aiven services, including
PostgreSQL®, Apache Kafka®, and OpenSearch®. For PostgreSQL and Kafka, you can
also work with the data in your services. You can view service status, metrics,
logs, and configuration, and manage services and plans.

To start, see [Install Aiven MCP](#configure-aiven-mcp). To control which
operations your assistant can perform, use [read-only mode](#read-only-mode) and
[service scopes](#limit-tool-access).

## What Aiven MCP can do

After you connect an AI assistant to Aiven MCP, you can use natural language
to work with your Aiven resources.

- **View resources**: List projects, services, and integrations, and check the
  status, plan, and cloud region of a service.
- **Manage services**: Create, update, and delete services such as
  [Aiven for PostgreSQL®](/docs/products/postgresql),
  [Aiven for Apache Kafka®](/docs/products/kafka), and
  [Aiven for OpenSearch®](/docs/products/opensearch). Change service plans and
  compare plans and pricing.
- **Troubleshoot services**: Review service metrics, logs, and configuration.
- **Work with PostgreSQL**: Run read-only SQL queries, find slow queries and missing
  indexes, and manage extensions such as
  [pgvector](/docs/products/postgresql/concepts/pgvector).
- **Work with Apache Kafka**: List topics and consumer groups, inspect consumer
  lag, produce and read messages, inspect schemas, and manage Kafka Connect
  connectors.
- **Deploy applications**: Deploy applications to [Aiven Runtime](/docs/products/runtime).
- **Search the Aiven documentation**: Ask questions about Aiven and get answers
  from the documentation.

## Prerequisites

- An [Aiven account](https://console.aiven.io/signup?campaign=mcp). Aiven MCP is
  included with your account at no extra cost.
- An MCP-compatible client, such as Cursor, Claude Code, Claude Desktop,
  VS Code, or Gemini CLI.
- MCP connections enabled for your organization. If you created your Aiven
  account, you're the organization admin and can enable them in the Aiven
  Console: click **Admin** > <ConsoleLabel name="authenticationpolicy"/> >
  **Allow MCP connections**. Otherwise, ask your organization admin to enable
  them.

Authentication uses OAuth 2.0 with PKCE. When you authenticate a client for the
first time, your browser opens so you can sign in and authorize MCP access. This
is usually a one-time setup step per client.

:::note Note
Aiven owns the `aiven.live` domain and operates the hosted MCP server at
`mcp.aiven.live`. The server uses the Aiven API at `api.aiven.io` for
authorization.
:::

## Install Aiven MCP {#configure-aiven-mcp}

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

Run the Aiven MCP server locally with `npx` instead of using the hosted server.
You need an [Aiven API token](/docs/platform/howto/create_authentication_token)
to authenticate requests to Aiven. Set `AIVEN_READ_ONLY="true"` to enable
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
1. Run `/mcp` to verify that the server is registered.

</TabItem>
<TabItem value="cursor" label={<McpClientTabLabel icon={CursorIcon} label="Cursor" />}>

1. In your project root, create or edit the `.cursor/mcp.json` file.
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
           "AIVEN_TOKEN": "API_TOKEN"
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

## Example prompts

After you connect your AI assistant to Aiven MCP, try these prompts to explore,
manage, and troubleshoot your Aiven resources. Some prompts require specific
service scopes or write access.

### Explore your Aiven resources

#### List your projects

```text
List my Aiven projects.
```

Lists the projects you can access and verifies that the MCP connection works.

#### Inspect a service

```text
Show me the status and configuration of my Aiven service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the name of an existing service.

#### Read Kafka messages

```text
Show me the latest available messages from the TOPIC_NAME topic
in my Aiven for Apache Kafka service SERVICE_NAME.
```

Replace `SERVICE_NAME` with your Kafka service name and `TOPIC_NAME` with an
existing topic name. Requires the `kafka` or `all` scope.

### Manage Aiven services

#### Create a PostgreSQL service

```text
Create a PostgreSQL service in REGION.
```

Replace `REGION` with your preferred cloud region. Requires write access. If
[read-only mode](#read-only-mode) is enabled, the assistant cannot create
services unless the operation is explicitly allowed.

### Monitor and troubleshoot services

#### Find slow PostgreSQL queries

```text
Inspect my Aiven for PostgreSQL service for the slowest queries using
pg_stat_statements. Show total time, calls, and mean time, and suggest
indexes or rewrites for the worst offenders.
```

Retrieves query statistics and suggests optimizations. Requires the `pg` or
`all` scope.

#### Investigate Kafka consumer lag

```text
Check my Aiven for Apache Kafka services for consumer groups with high lag.
For each affected topic, report the group, partition, and current lag, and
suggest likely causes.
```

Reports consumer groups with high lag and suggests causes. Requires the `kafka`
or `all` scope.

#### Check service health

```text
Give me a health summary of every service in my Aiven project: state, plan,
maintenance updates pending, and any nodes that are not running.
```

Summarizes the state of each service and highlights issues. Requires the `core`
scope, which is always included.

## Read-only mode

Read-only mode restricts MCP tools to viewing services and other resources. You
cannot create, modify, or delete resources. Read-only mode applies at the
organization level and the client level.

PostgreSQL read queries still work in read-only mode. To allow selected write
operations at the client level, see
[Allow specific write operations](#restrict-write-operations).

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

In [Install Aiven MCP](#configure-aiven-mcp), use the **Access** options to
configure your client:

- **Full access**: Makes write tools available, subject to your Aiven user
  permissions.
- **Read-only**: Excludes tools that modify resources or data.
- **Read-only, plus specific writes**: Excludes write tools except those you
  select.

These settings apply only to your client and cannot override an organization-level
restriction.

To configure read-only mode manually, add `read_only=true` to the hosted server
URL or set `AIVEN_READ_ONLY=true` for a local installation. You can combine
read-only mode with service scopes:

```text
https://mcp.aiven.live/mcp?services_scope=pg&read_only=true
```

## Limit tool access

Use service scopes to control which tools are available to your AI assistant.
Each tool performs a specific action, such as listing services or creating a
Kafka topic.

Service scopes don't change your Aiven user permissions. The MCP server can
perform only the actions that your authenticated user is authorized to perform.

### Available service scopes

Use the **Services** options in [Install Aiven MCP](#configure-aiven-mcp) to
select which groups of tools are available to your AI assistant.

| Scope          | Selector option  | Description                                                                                                        |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| `core`         | Always included  | Tools for managing Aiven projects, services, plans, metrics, and logs                                              |
| `pg`           | PostgreSQL       | Tools for querying PostgreSQL databases, analyzing query performance, and managing extensions and connection pools |
| `kafka`        | Kafka            | Tools for managing Apache Kafka topics, messages, connectors, and schemas                                          |
| `application`  | Applications     | Tools for deploying and redeploying applications and managing version control integrations                         |
| `integrations` | Integrations     | Tools for managing service integrations and listing available integration and endpoint types                       |
| `opensearch`   | OpenSearch       | Includes only the `core` tools; no OpenSearch-specific tools are currently available                               |
| `all`          | All              | All available tools (default)                                                                                      |

When configuring service scopes:

- The `core` scope is always included, even if you don't specify it.
- You can combine scopes. For example, `pg,kafka` loads the `core`, PostgreSQL,
  and Kafka tools.
- You can't combine `all` with other scopes. Doing so returns an error.
- If you don't specify a scope, Aiven MCP loads all available tools.

For the full list of available tools and their descriptions, see
[Available MCP tools](https://github.com/aiven-open/mcp-aiven#tools).

### Configure service scopes

When you select service scopes in [Install Aiven MCP](#configure-aiven-mcp), the
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

### Allow specific write operations {#restrict-write-operations}

To allow selected write operations while your client is in read-only mode,
choose **Read-only, plus specific writes** under **Access** in
[Install Aiven MCP](#configure-aiven-mcp).

To allow specific write operations on the hosted server, enable
[read-only mode](#read-only-mode) and add the permitted tool names to the
`write_allowlist` URL parameter, separated by commas. For example, to allow
Kafka topic creation:

```text
https://mcp.aiven.live/mcp?services_scope=kafka&read_only=true&write_allowlist=aiven_kafka_topic_create
```

For a local installation, set the `AIVEN_WRITE_ALLOWLIST` environment variable.
The write allowlist applies only when read-only mode is enabled. For supported
tool names, see
[Available MCP tools](https://github.com/aiven-open/mcp-aiven#tools).

The write allowlist doesn't grant additional Aiven permissions. Your user must
still have permission to perform each allowed operation. An
[organization-level read-only policy](#organization-level) takes precedence
over the write allowlist.

## Security and responsibility

:::important Important
MCP tools can perform destructive operations on your Aiven services, including
creating, modifying, and deleting services, databases, topics, and data.

AI agents run operations from natural language prompts, which can be
misinterpreted. Using the Aiven MCP server can result in damage to or loss of data.

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
- **Limit write access.** Use [read-only mode](#read-only-mode) at the
  organization level for all users, or at the client level for an individual
  client.
- **Keep credentials off in production.** The
  **Allow connection credentials** option (`allow_secrets=true`) returns
  PostgreSQL and Kafka connection credentials, including URIs, passwords, and
  certificates, to the AI agent. Use it only for development with
  non-production services that do not hold sensitive data.

The Aiven MCP server can also connect directly to PostgreSQL services running
in a private VPC.

<RelatedPages/>

- [Aiven MCP use cases](https://aiven.io/mcp): Examples of what you can do with
  Aiven MCP
- [Aiven MCP announcement](https://aiven.io/blog/aiven-mcp): Overview of what
  Aiven MCP can do
- [PostgreSQL MCP server blog post](https://aiven.io/blog/postgresql-mcp):
  Use Aiven MCP with PostgreSQL
- [Kafka MCP blog post](https://aiven.io/blog/kafka-mcp):
  Use Aiven MCP with Apache Kafka
