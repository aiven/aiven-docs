---
title: Connect to Aiven documentation using MCP
sidebar_label: MCP server
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Aiven documentation Model Context Protocol (MCP) server lets you access Aiven documentation from MCP-compatible clients.
The server is hosted by [Kapa](https://docs.kapa.ai/integrations/mcp/overview) and
retrieves content from the latest published documentation.

## Before you begin

You need the following:

- An MCP-compatible client
- A Google account for authentication (required by some clients)

## MCP server URL

Use the following server URL when configuring your client:

```text
https://aiven-docs.mcp.kapa.ai
```

## Configure your MCP client

<Tabs groupId="mcp-clients">
<TabItem value="cursor" label="Cursor" default>

1. In your project root, create or edit `.cursor/mcp.json`.
1. Add the following configuration:

   ```json
   {
     "mcpServers": {
       "aiven": {
         "type": "http",
         "url": "https://aiven-docs.mcp.kapa.ai"
       }
     }
   }
   ```

1. Save the file.
1. Restart Cursor.
1. Open **Settings** > **Tools & MCP**.
1. Select **aiven** and click **Connect**.
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
       "aiven": {
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
       "aiven": {
         "type": "http",
         "url": "https://aiven-docs.mcp.kapa.ai"
       }
     }
   }
   ```

1. Save the file.
1. Reload Visual Studio Code.
1. Open the Command Palette and run **MCP: List Servers**.
1. Confirm that **aiven** appears in the list.
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
1. Add the Aiven MCP server using the following URL:

   ```text
   https://aiven-docs.mcp.kapa.ai
   ```

Most clients accept a configuration similar to:

```json
{
  "mcpServers": {
    "aiven": {
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

## Verify the connection

After connecting the MCP server:

1. Open your AI client, such as Copilot Chat in Visual Studio Code or Chat in Cursor.
1. Ask a question about Aiven documentation, such as:

   - How do I create a topic in Aiven for Apache Kafka®?
   - How do I migrate snapshot data to Aiven for OpenSearch®?

1. If prompted to allow tool execution, click **Allow**.
1. Confirm that the response includes references to Aiven documentation.

If the response includes references to Aiven documentation, the MCP server is connected.
