---
title: Aiven MCP
sidebar_label: Aiven MCP
early: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {mcpUrl} from '@site/src/components/mcpAivenLiveConstants';
import MCPConfigSection from "@site/src/components/MCPConfigSection";
import CursorConfigTab from "@site/src/components/CursorConfigTab";

Create and manage Aiven services from AI assistants such as Cursor and Claude Code,
including PostgreSQL®, Apache Kafka®, plans, metrics, logs, and service configuration.
Enable read-only mode in the configuration tabs below to restrict the server to
non-destructive operations, or limit tools to specific services to keep the
assistant focused.

## Prerequisites

- An [Aiven account](https://console.aiven.io/signup)
- An MCP-compatible client, such as Cursor, Claude Code, Claude Desktop,
  VS Code, or Gemini CLI
- MCP access enabled for your organization by an admin in the Aiven Console
  under **Admin settings** > **Authentication** > **Allow MCP connection**

Authentication uses OAuth 2.0 with PKCE; your browser opens on first connect so you
can sign in and authorize MCP access.

## Install the Aiven MCP {#configure-aiven-mcp}

<Tabs>
<TabItem value="claude-code" label="Claude Code" default>

1. Open a terminal.
1. Choose your options below, then run the generated command:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="bash"
     configTemplate={(url) => `claude mcp add --transport http aiven "${url}"`}
   />

1. Run `/mcp` and authenticate in your browser when prompted.
1. Test the connection with a prompt such as `List my Aiven projects.` and
   approve the tool execution if prompted.

For more information, see the [Claude Code MCP documentation](https://code.claude.com/docs/en/mcp).

</TabItem>
<TabItem value="cursor" label="Cursor">

<CursorConfigTab baseUrl={mcpUrl} />

In Cursor Chat (**Cmd+L** / **Ctrl+L**), test the connection with a prompt such
as `List my Aiven projects.` and click **Allow** if prompted.

For more information, see the [Cursor MCP documentation](https://cursor.com/docs/mcp).

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

1. Open the Claude Desktop configuration file. If it does not exist, create it:

   - **macOS:**
     `~/Library/Application Support/Claude/claude_desktop_config.json`

   - **Windows:**
     `%APPDATA%\Claude\claude_desktop_config.json`

1. Choose your options below, then add the generated configuration to the file:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="json"
     configTemplate={(url) => ({mcpServers: {aiven: {type: "http", url}}})}
   />

1. Save the file and restart Claude Desktop.
1. In a new conversation, test the connection with a prompt such as
   `List my Aiven projects.` and click **Allow** if prompted.

For more information, see the [Claude Desktop MCP documentation](https://modelcontextprotocol.io/docs/develop/connect-local-servers).

</TabItem>
<TabItem value="vscode" label="VS Code">

:::note
Requires VS Code 1.102 or later with the GitHub Copilot extension installed
and enabled.
:::

1. Open your workspace in VS Code.
1. In the workspace root, create a `.vscode` directory.
1. In the `.vscode` directory, create or edit the `mcp.json` file.
1. Choose your options below, then add the generated configuration to the file:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="json"
     configTemplate={(url) => ({servers: {aiven: {type: "http", url}}})}
   />

1. Save the file and reload VS Code.
1. Open the Command Palette, run **MCP: List Servers**, and confirm that
   **aiven** appears.
1. In Copilot Chat, test the connection with a prompt such as
   `List my Aiven projects.` and click **Allow** if prompted.

For more information, see the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).

</TabItem>
<TabItem value="gemini-cli" label="Gemini CLI">

1. Create or edit the `~/.gemini/settings.json` file.
1. Add the following configuration:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="json"
     configTemplate={(url) => ({mcpServers: {aiven: {httpUrl: url}}})}
   />

1. Save the file and run `gemini` to start the CLI.
1. Run `/mcp auth aiven` to sign in via your browser.
1. Test the connection with a prompt such as `List my Aiven projects.` and
   approve the tool execution if prompted.

</TabItem>
<TabItem value="other" label="Other clients">

1. Open your MCP client configuration.
1. Choose your options below, then add the generated configuration to your client:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="json"
     configTemplate={(url) => ({mcpServers: {aiven: {url}}})}
   />

   Most clients use a configuration similar to the above.

1. Save the file and restart your client.
1. In your AI assistant, test the connection with a prompt such as
   `List my Aiven projects.` and approve the tool execution if prompted.

Some clients require a transport type, such as `"type": "http"`. If the configuration
fails, see your client documentation.

</TabItem>
<TabItem value="local" label="Local installation">

Run the server locally using `npx` instead of the hosted server. Requires
an [Aiven API token](/docs/platform/howto/create_authentication_token). Set
`AIVEN_READ_ONLY="true"` to enable read-only mode.

<Tabs>
<TabItem value="claude-code" label="Claude Code" default>

1. Open a terminal.
1. Run the following command, replacing `your-token-here` with your Aiven API token:

   ```bash
   claude mcp add --scope user aiven-mcp -e AIVEN_TOKEN=your-token-here -e AIVEN_READ_ONLY=false -- npx -y mcp-aiven
   ```

1. Run `/mcp` in Claude Code to verify the server is registered.

</TabItem>
<TabItem value="cursor" label="Cursor">

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
           "AIVEN_READ_ONLY": "false"
         }
       }
     }
   }
   ```

1. Save the file and restart Cursor.

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

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
           "AIVEN_READ_ONLY": "false"
         }
       }
     }
   }
   ```

1. Save the file and restart Claude Desktop.

</TabItem>
<TabItem value="vscode" label="VS Code">

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
           "AIVEN_READ_ONLY": "false"
         }
       }
     }
   }
   ```

1. Save the file and reload VS Code.

</TabItem>
<TabItem value="other" label="Other clients">

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
  and Apache Kafka®, and update service plans or configuration. To allow write
  operations, disable [read-only mode](#configure-aiven-mcp).
- **Inspect and troubleshoot services**: View service metrics, logs, and
  configuration to investigate issues.
- **Use Aiven documentation**: Ask questions and get answers based on the Aiven
  documentation.

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

Decide whether to enable MCP access in your organization after evaluating the risks.
:::

Under the [shared responsibility model](https://aiven.io/responsibility-matrix),
security and compliance for MCP usage are shared between Aiven and your organization.
Aiven secures the platform and API. You are responsible for the following:

- **Decide whether to enable MCP** in your organization and evaluate the
  associated risks.
- **Control access** by scoping API tokens to the minimum permissions needed
  (principle of least privilege) and rotating them regularly.
- **Review AI agent actions** before they run, especially for write or delete
  operations on production resources.
- **Configure MCP servers securely**, including enabling read-only mode to
  restrict the server to non-destructive operations.
