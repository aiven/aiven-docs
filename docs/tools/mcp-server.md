---
title: Aiven MCP
sidebar_label: Aiven MCP
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {cursorDeepLink, mcpUrl} from '@site/src/components/mcpAivenLiveConstants';

Aiven offers two MCP servers for use with AI assistants:

- **[Aiven MCP server](#aiven-mcp-server)**: Create and manage Aiven services directly from AI assistants
  such as Cursor and Claude Code.
- **[Documentation MCP server](#documentation-mcp-server)**: Access Aiven documentation from MCP-compatible clients.

## Aiven MCP server

Use the Aiven Model Context Protocol (MCP) server to create and manage Aiven services from
AI assistants, such as Cursor and Claude Code.

### Prerequisites

- An [Aiven account](https://console.aiven.io/signup)
- An organization with MCP access enabled
- An MCP-compatible client, such as Cursor, Claude Code, Claude Desktop, or
  Visual Studio Code

### MCP server URL

Use the following server URL when configuring your client:

<CodeBlock language="text">{mcpUrl}</CodeBlock>

### Configure your MCP client {#configure-aiven-mcp}

<Tabs groupId="aiven-mcp-clients">
<TabItem value="cursor" label="Cursor" default>

<!-- vale off -->
<a
  href={cursorDeepLink}
  style={{display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', backgroundColor: '#2d2d2d', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', fontWeight: 500, border: 'none', lineHeight: '20px'}}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    style={{display: 'block', flex: 'none'}}
  >
    <path d="M21 7.5L12 2L3 7.5M21 7.5L12 13M21 7.5V16.5L12 22M3 7.5L12 13M3 7.5V16.5L12 22M12 13V22" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>
  <span>Add to Cursor</span>
</a>
<!-- vale on -->

<br /><br />

To add the server manually:

1. In your project root, create or edit `.cursor/mcp.json`.
1. Add the following configuration:

   <!-- vale off -->
   <CodeBlock language="json">{JSON.stringify({mcpServers: {aiven: {type: "http", url: mcpUrl}}}, null, 2)}</CodeBlock>
   <!-- vale on -->

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
1. The first time you use the server, your browser opens.
1. Sign in to Aiven and select your organization.

For more information, see the [Claude Code MCP documentation](https://docs.anthropic.com/en/docs/claude-code/tutorials/set-up-mcp).

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

1. Open the Claude Desktop configuration file. If it does not exist, create it:

   - **macOS:**
     `~/Library/Application Support/Claude/claude_desktop_config.json`

   - **Windows:**
     `%APPDATA%\Claude\claude_desktop_config.json`

1. Add the following configuration to the file:

   <!-- vale off -->
   <CodeBlock language="json">{JSON.stringify({mcpServers: {aiven: {type: "http", url: mcpUrl}}}, null, 2)}</CodeBlock>
   <!-- vale on -->

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

   <!-- vale off -->
   <CodeBlock language="json">{JSON.stringify({servers: {aiven: {type: "http", url: mcpUrl}}}, null, 2)}</CodeBlock>
   <!-- vale on -->

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

Most clients use a configuration similar to:

<!-- vale off -->
<CodeBlock language="json">{JSON.stringify({mcpServers: {aiven: {url: mcpUrl}}}, null, 2)}</CodeBlock>
<!-- vale on -->

1. Save the file and restart your client.

Some clients require a transport type, such as `"type": "http"`. If the configuration
fails, see your client documentation.

</TabItem>
</Tabs>

### Verify the connection {#verify-aiven-mcp}

<Tabs groupId="aiven-mcp-clients">
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

1. If your client prompts you to allow tool execution, approve the request.

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

1. If your client prompts you to allow tool execution, approve the request.
1. Verify that the response includes information about your Aiven projects.

</TabItem>
</Tabs>

### Authentication

The Aiven MCP server uses OAuth 2.0 with Proof Key for Code Exchange (PKCE) for
authentication. The first time you use the server, your browser opens so you can sign in
to Aiven and select your organization. The server refreshes tokens automatically.

### Security and responsibility

:::note
MCP tools can perform destructive operations on your Aiven services, including
creating, modifying, and deleting services, databases, topics, and data. AI agents can
run operations from natural language prompts that are easy to misinterpret. Using the
Aiven MCP server can result in damage to or loss of data. Whether to enable MCP access
is your organization's decision. Evaluate the risks before you grant AI agents access
to your resources.
:::

Under the [shared responsibility model](https://aiven.io/responsibility-matrix),
security and compliance for MCP usage are shared between Aiven and your organization.
Aiven secures the platform and API. You are responsible for the following:

- **Deciding whether to enable MCP** in your organization and evaluating the
  associated risks.
- **Controlling access** by scoping API tokens to the minimum permissions needed
  (principle of least privilege) and rotating them regularly.
- **Reviewing AI agent actions** before they run, especially for write or delete
  operations on production resources.
- **Configuring MCP servers securely**, including choosing
  [read-only mode](/docs/tools/mcp-server#read-only-mode) where appropriate to
  restrict the server to non-destructive operations.

### Supported tools

#### Service management

Create, update, and delete Aiven services across all supported service types.
Browse available plans and pricing, view service metrics and logs, and manage
service configurations and cloud regions.

#### PostgreSQL®

Create and manage PostgreSQL databases, execute read and write SQL queries,
and manage PgBouncer connection pools. Get AI-powered query optimization
recommendations, view query performance statistics, and list available extensions.

#### Apache Kafka®

Create and manage Kafka topics, produce and consume messages, and configure
Kafka Connect connectors. Browse Schema Registry subjects and manage
connector lifecycle operations including pause, resume, and restart.

### Read-only mode

To restrict the server to read-only operations, set the `AIVEN_READ_ONLY`
environment variable to `true` in your MCP client configuration:

<!-- vale off -->
<CodeBlock language="json">{JSON.stringify({mcpServers: {aiven: {type: "http", url: mcpUrl, env: {AIVEN_READ_ONLY: "true"}}}}, null, 2)}</CodeBlock>
<!-- vale on -->

In read-only mode, the server only allows operations that read data, such as
listing services, viewing metrics, and running SELECT queries. The server blocks
write operations, such as creating services or modifying data.

## Documentation MCP server

The Aiven documentation MCP server lets you access Aiven documentation from MCP-compatible
clients. The server is hosted by [Kapa](https://docs.kapa.ai/integrations/mcp/overview)
and retrieves content from the latest published documentation.

### Prerequisites {#docs-prerequisites}

- An MCP-compatible client
- A Google account for authentication (required by some clients)

### MCP server URL {#docs-server-url}

Use the following server URL when configuring your client:

```text
https://aiven-docs.mcp.kapa.ai
```

### Configure your MCP client {#configure-docs-mcp}

<Tabs groupId="docs-mcp-clients">
<TabItem value="cursor" label="Cursor" default>

1. In your project root, create or edit `.cursor/mcp.json`.
1. Add the following configuration:

   ```json
   {
     "mcpServers": {
       "aiven-docs": {
         "type": "http",
         "url": "https://aiven-docs.mcp.kapa.ai"
       }
     }
   }
   ```

1. Save the file.
1. Restart Cursor.
1. Open **Settings** > **Tools & MCP**.
1. Select **aiven-docs** and click **Connect**.
1. Sign in with your Google account when prompted.

For more information, see the [Cursor MCP documentation](https://cursor.com/docs/context/mcp).

</TabItem>
<TabItem value="claude-code" label="Claude Code">

1. Open a terminal.
1. Run the following command:

   ```bash
   claude mcp add --transport http aiven-docs https://aiven-docs.mcp.kapa.ai
   ```

1. Sign in with your Google account when prompted.
1. Run `/mcp` in Claude Code to verify the server is registered.

For more information, see the [Claude Code MCP documentation](https://docs.anthropic.com/en/docs/claude-code/tutorials/set-up-mcp).

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

1. Open the Claude Desktop configuration file. If it does not exist, create it:

   - **macOS:**
     `~/Library/Application Support/Claude/claude_desktop_config.json`

   - **Windows:**
     `%APPDATA%\Claude\claude_desktop_config.json`

1. Add the following to the configuration file:

   ```json
   {
     "mcpServers": {
       "aiven-docs": {
         "type": "http",
         "url": "https://aiven-docs.mcp.kapa.ai"
       }
     }
   }
   ```

1. Save the file.
1. Restart Claude Desktop.
1. Sign in with your Google account when prompted.

For more information, see the [Claude Desktop MCP documentation](https://modelcontextprotocol.io/quickstart/user).

</TabItem>
<TabItem value="vscode" label="VS Code">

:::note
Requires Visual Studio Code 1.102 or later with the GitHub Copilot extension installed
and enabled.
:::

1. Open your workspace in Visual Studio Code.
1. In the workspace root, create a `.vscode` directory if it does not exist.
1. In the `.vscode` directory, create a file named `mcp.json`.
1. Add the following configuration:

   ```json
   {
     "servers": {
       "aiven-docs": {
         "type": "http",
         "url": "https://aiven-docs.mcp.kapa.ai"
       }
     }
   }
   ```

1. Save the file.
1. Reload Visual Studio Code.
1. Open the Command Palette and run **MCP: List Servers**.
1. Confirm that **aiven-docs** appears in the list.
1. Sign in with your Google account when prompted.

For more information, see the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).

</TabItem>
<TabItem value="chatgpt-web" label="ChatGPT (Web)">

:::note
ChatGPT UI labels and navigation may change. Refer to the
[OpenAI documentation](https://developers.openai.com/api/docs/guides/developer-mode)
if the steps do not match your interface.
:::

1. Open ChatGPT in a web browser.
1. Click **Settings**.
1. Select **Apps**, then select **Advanced settings**.
1. Click the **Developer mode** toggle.
1. Select **Apps** > **Create app**.
1. Enter the following:
   - **Name:** Aiven
   - **Description (optional):** Aiven documentation MCP server
   - **MCP Server URL:** `https://aiven-docs.mcp.kapa.ai`
1. Click **Create**.
1. Sign in with your Google account when prompted.
1. Confirm that **Aiven** appears under **Settings** > **Apps**.

For more information, see the [OpenAI Developer mode documentation](https://developers.openai.com/api/docs/guides/developer-mode).

</TabItem>
<TabItem value="other" label="Other clients">

1. Open your MCP client configuration.
1. Add the Aiven documentation MCP server using the following URL:

   ```text
   https://aiven-docs.mcp.kapa.ai
   ```

Most clients accept a configuration similar to:

```json
{
  "mcpServers": {
    "aiven-docs": {
      "url": "https://aiven-docs.mcp.kapa.ai"
    }
  }
}
```

1. Save the file and restart your client.
1. Sign in with your Google account when prompted.

Some clients require specifying the transport type, for example `"type": "http"`. Refer
to your client documentation if the configuration fails.

</TabItem>
</Tabs>

### Verify the connection {#verify-docs-mcp}

After connecting the MCP server:

1. Open your AI client, such as Copilot Chat in Visual Studio Code or Chat in Cursor.
1. Ask a question about Aiven documentation, such as:

   - How do I create a topic in Aiven for Apache Kafka®?
   - How do I migrate snapshot data to Aiven for OpenSearch®?

1. If prompted to allow tool execution, click **Allow**.
1. Confirm that the response includes references to Aiven documentation.

If the response includes references to Aiven documentation, the MCP server is connected.
