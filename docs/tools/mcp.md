---
title: Manage Aiven services using MCP
sidebar_label: Aiven MCP server
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

{/* Update mcpUrl to change the MCP server URL across all code samples on this page. */}
export const mcpUrl = "https://mcp.aiven.live/mcp";
export const cursorDeepLink = `cursor://anysphere.cursor-deeplink/mcp/install?name=aiven-mcp&config=${typeof btoa !== "undefined" ? btoa(JSON.stringify({url: mcpUrl})) : ""}`;

The Aiven MCP server lets you create and manage services directly from AI assistants such as Cursor and Claude Code.

## Prerequisites

- An [Aiven account](https://console.aiven.io/signup)
- An organization with MCP access enabled
- An MCP-compatible client such as Cursor, Claude Code, Claude Desktop, or VS Code

## MCP server URL

Use the following server URL when configuring your client:

<CodeBlock language="text">{mcpUrl}</CodeBlock>

## Configure your MCP client

<Tabs groupId="mcp-clients">
<TabItem value="cursor" label="Cursor" default>

<a
  href={cursorDeepLink}
  style={{display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', backgroundColor: '#2d2d2d', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', fontWeight: 500, border: 'none', lineHeight: '20px'}}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{display: 'block', flex: 'none'}}>
    <path d="M21 7.5L12 2L3 7.5M21 7.5L12 13M21 7.5V16.5L12 22M3 7.5L12 13M3 7.5V16.5L12 22M12 13V22" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>
  <span>Add to Cursor</span>
</a>

<br /><br />

Alternatively, add it manually:

1. In your project root, create or edit `.cursor/mcp.json`.
1. Add the following configuration:

   <CodeBlock language="json">{JSON.stringify({mcpServers: {aiven: {type: "http", url: mcpUrl}}}, null, 2)}</CodeBlock>

1. Save the file.
1. Restart Cursor.
1. Open **Settings** > **Tools & MCP**.
1. Select **aiven** and click **Connect**.

</TabItem>
<TabItem value="claude-code" label="Claude Code">

1. Open a terminal.
1. Run the following command:

   <CodeBlock language="bash">{`claude mcp add --transport http aiven ${mcpUrl}`}</CodeBlock>

1. Run `/mcp` in Claude Code to verify the server is registered.
1. On first use, a browser window opens where you sign in to Aiven and select your organization.

For more information, see the [Claude Code MCP documentation](https://docs.anthropic.com/en/docs/claude-code/tutorials/set-up-mcp).

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

1. Open the Claude Desktop configuration file. If it does not exist, create it:

   - **macOS:**
     `~/Library/Application Support/Claude/claude_desktop_config.json`

   - **Windows:**
     `%APPDATA%\Claude\claude_desktop_config.json`

1. Add the following to the configuration file:

   <CodeBlock language="json">{JSON.stringify({mcpServers: {aiven: {type: "http", url: mcpUrl}}}, null, 2)}</CodeBlock>

1. Save the file and restart Claude Desktop.

For more information, see the [Claude Desktop MCP documentation](https://modelcontextprotocol.io/quickstart/user).

</TabItem>
<TabItem value="vscode" label="VS Code">

:::note
Requires Visual Studio Code 1.102 or later with the GitHub Copilot extension installed
and enabled.
:::

1. Open your workspace in Visual Studio Code.
1. In the workspace root, create a `.vscode` directory if it does not exist.
1. In the `.vscode` directory, create or edit `mcp.json`.
1. Add the following configuration:

   <CodeBlock language="json">{JSON.stringify({servers: {aiven: {type: "http", url: mcpUrl}}}, null, 2)}</CodeBlock>

1. Save the file.
1. Reload Visual Studio Code.
1. Open the Command Palette and run **MCP: List Servers**.
1. Confirm that **aiven** appears in the list.

For more information, see the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).

</TabItem>
<TabItem value="other" label="Other clients">

1. Open your MCP client configuration.
1. Add the Aiven MCP server using the following URL:

   <CodeBlock language="text">{mcpUrl}</CodeBlock>

Most clients accept a configuration similar to:

<CodeBlock language="json">{JSON.stringify({mcpServers: {aiven: {url: mcpUrl}}}, null, 2)}</CodeBlock>

1. Save the file and restart your client.

Some clients require specifying the transport type, for example `"type": "http"`. Refer
to your client documentation if the configuration fails.

</TabItem>
</Tabs>

## Verify the connection

<Tabs groupId="mcp-clients">
<TabItem value="cursor" label="Cursor" default>

1. Open Cursor Chat with **Cmd+L** on macOS or **Ctrl+L** on Windows/Linux.
1. Try a prompt such as:

   > List my Aiven projects.

1. If prompted to allow tool execution, click **Allow**.
1. To confirm the server is registered, go to **Settings** > **Tools & MCP** and
   check that **aiven** appears with a connected status.

</TabItem>
<TabItem value="claude-code" label="Claude Code">

1. Run `/mcp` in Claude Code to verify the server is registered.
1. Try a prompt such as:

   > List my Aiven projects.

1. If prompted to allow tool execution, confirm.

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

1. Open a new conversation.
1. Verify that the MCP tools icon appears in the input area.
1. Try a prompt such as:

   > List my Aiven projects.

1. If prompted to allow tool execution, click **Allow**.

</TabItem>
<TabItem value="vscode" label="VS Code">

1. Open Copilot Chat in Visual Studio Code.
1. Open the Command Palette and run **MCP: List Servers**.
1. Confirm that **aiven** appears in the list.
1. Try a prompt such as:

   > List my Aiven projects.

1. If prompted to allow tool execution, click **Allow**.

</TabItem>
<TabItem value="other" label="Other clients">

1. Open your AI assistant.
1. Try a prompt such as:

   > List my Aiven projects.

1. If prompted to allow tool execution, confirm.
1. Verify that the response includes information about your Aiven projects.

</TabItem>
</Tabs>

## Authentication

The Aiven MCP server uses OAuth 2.0 with PKCE for authentication. When you
first use the server, it opens a browser window where you sign in to Aiven and
select your organization. The server manages token refresh automatically.

## Security and responsibility

:::warning
MCP tools can perform destructive operations on your Aiven services, including
creating, modifying, and deleting services, databases, topics, and data. AI
agents may execute these operations based on natural language prompts, which
can be misinterpreted. **Use of the Aiven MCP server may result in damage to or
loss of data.** Enabling MCP access is your organization's decision. Evaluate
the risks before granting AI agents access to your resources.
:::

Under the [shared responsibility model](https://aiven.io/responsibility-matrix),
security and compliance of MCP usage is a shared responsibility between Aiven and
the customer. While Aiven secures the platform and API, you are responsible for:

- **Deciding whether to enable MCP** in your organization and evaluating the
  associated risks.
- **Controlling access** by scoping API tokens to the minimum permissions needed
  (principle of least privilege) and rotating them regularly.
- **Reviewing AI agent actions** before they are executed, especially for
  write or delete operations on production resources.
- **Configuring MCP servers securely**, including choosing
  [read-only mode](/docs/tools/mcp#read-only-mode) where appropriate to
  restrict the server to non-destructive operations.

## Supported tools

### Service management

Create, update, and delete Aiven services across all supported service types.
Browse available plans and pricing, view service metrics and logs, and manage
service configurations and cloud regions.

### PostgreSQL®

Create and manage PostgreSQL databases, execute read and write SQL queries,
and manage PgBouncer connection pools. Get AI-powered query optimization
recommendations, view query performance statistics, and list available extensions.

### Apache Kafka®

Create and manage Kafka topics, produce and consume messages, and configure
Kafka Connect connectors. Browse Schema Registry subjects and manage
connector lifecycle operations including pause, resume, and restart.

## Read-only mode

To restrict the server to read-only operations, set the `AIVEN_READ_ONLY`
environment variable to `true` in your MCP client configuration:

<CodeBlock language="json">{JSON.stringify({mcpServers: {aiven: {type: "http", url: mcpUrl, env: {AIVEN_READ_ONLY: "true"}}}}, null, 2)}</CodeBlock>

In read-only mode, the server only allows operations that read data, such as
listing services, viewing metrics, and running SELECT queries. Write
operations like creating services or modifying data are blocked.
