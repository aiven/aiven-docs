---
title: Aiven MCP
sidebar_label: Aiven MCP
description: Create and manage Aiven services from AI assistants.
keywords: [MCP, Model Context Protocol, AI assistants, Cursor, Claude Code]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
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

Create and manage Aiven services from AI assistants such as Cursor and Claude Code, including PostgreSQL®, Apache Kafka®, plans, metrics, logs, and service configuration.
Use [read-only mode](#read-only-mode) to limit MCP tools to viewing services
and other resources. You can enable it in your client or as an organization
policy.
You can also limit tools to specific services to keep the assistant focused.

## Prerequisites

- An [Aiven account](https://console.aiven.io/signup?campaign=mcp)
- An MCP-compatible client, such as Cursor, Claude Code, Claude Desktop,
  VS Code, or Gemini CLI
- MCP access enabled for your organization by an organization admin. In the
  Aiven Console, click **Admin** >
  <ConsoleLabel name="authenticationpolicy"/> > **Allow MCP connections**.

Authentication uses OAuth 2.0 with PKCE. When you authenticate a client for the
first time, your browser opens so you can sign in and authorize MCP access. This
is usually a one-time setup step per client.

:::note
Aiven owns the `aiven.live` domain and operates the hosted MCP server at
`mcp.aiven.live`. The server uses the Aiven API at `api.aiven.io` for
authorization.
:::

## Install the Aiven MCP {#configure-aiven-mcp}

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
1. Run the following command, replacing `your-token-here` with your Aiven API token:

   ```bash
   claude mcp add --scope user aiven-mcp -e AIVEN_TOKEN=your-token-here -e AIVEN_READ_ONLY=false -e AIVEN_ALLOW_SECRETS=false -- npx -y mcp-aiven
   ```

1. Run `claude` to start Claude Code.
1. Run `/mcp` to verify that the server is registered.

</TabItem>
<TabItem value="cursor" label={<McpClientTabLabel icon={CursorIcon} label="Cursor" />}>

1. In your project root, create or edit the `.cursor/mcp.json` file.
1. Add the following configuration, replacing `your-token-here` with your Aiven API token:

   ```json
   {
     "mcpServers": {
       "aiven-mcp": {
         "command": "npx",
         "args": ["-y", "mcp-aiven"],
         "env": {
           "AIVEN_TOKEN": "your-token-here",
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
1. Add the following configuration, replacing `your-token-here` with your Aiven API token:

   ```json
   {
     "mcpServers": {
       "aiven-mcp": {
         "command": "npx",
         "args": ["-y", "mcp-aiven"],
         "env": {
           "AIVEN_TOKEN": "your-token-here",
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
1. Add the following configuration, replacing `your-token-here` with your Aiven API token:

   ```json
   {
     "servers": {
       "aiven-mcp": {
         "command": "npx",
         "args": ["-y", "mcp-aiven"],
         "env": {
           "AIVEN_TOKEN": "your-token-here",
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
1. Add the following configuration, replacing `your-token-here` with your Aiven API token:

   ```json
   {
     "mcpServers": {
       "aiven-mcp": {
         "command": "npx",
         "args": ["-y", "mcp-aiven"],
         "env": {
           "AIVEN_TOKEN": "your-token-here"
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

## What Aiven MCP can do

After you connect to Aiven MCP, you can work with Aiven resources in natural
language. For example, you can do the following:

- **View resources**: List projects, services, and integrations, or check the
  status, plan, and cloud region of a service.
- **Manage services**: Create, update, and delete services such as PostgreSQL®
  and Apache Kafka®. You can also change service plans and configuration.
  [Read-only mode](#read-only-mode) restricts MCP tools to read-only operations,
  such as viewing services and other resources.
- **Inspect and troubleshoot services**: View service metrics, logs, and
  configuration to investigate issues.
- **Use Aiven documentation**: Ask questions and get answers based on the Aiven
  documentation.

## Read-only mode

Read-only mode restricts MCP tools to viewing services and other resources. You
cannot create, modify, or delete resources. Read-only mode applies at the
organization level and the client level.

### Organization level

Organization admins can restrict MCP connections to read-only operations for
all users in the organization.

1. In the organization, click **Admin** >
   <ConsoleLabel name="authenticationpolicy"/>.
1. Select **Restrict MCP connections to read-only operations**.

Users cannot override this setting in their client configuration. Write
operations fail even if a user configures their client without read-only mode.

For more information, see
[Set authentication policies for organization users](/docs/platform/howto/set-authentication-policies).

### Client level

You can enable read-only mode for your client in the
[installation configuration](#configure-aiven-mcp). The setting applies only
to that client and does not change the organization policy. It cannot
override an organization-level restriction.

## Security and responsibility

:::important
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
