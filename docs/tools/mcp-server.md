---
title: Connect to Aiven documentation using MCP
sidebar_label: MCP server
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Aiven documentation Model Context Protocol (MCP) server lets you access Aiven documentation from MCP-compatible clients.

It retrieves content from the latest published documentation and returns answers with
source references. Some clients require authentication with a Google account when you
first connect to the server.

## Before you begin

Make sure you have:

- An MCP-compatible client
- A Google account for authentication

## MCP server URL

Use the following server URL when configuring your client:

```text
https://aiven-docs.mcp.kapa.ai
```

## Configure your MCP client

<Tabs groupId="mcp-clients">
<TabItem value="cursor" label="Cursor" default>

To configure the MCP server using a configuration file:

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
1. Next to **aiven**, click **Connect**.
1. When prompted, click **Open** to launch your browser.
1. Sign in with your Google account to complete authentication.

To configure the MCP server using the Cursor UI:

1. Open **Settings** > **Tools & MCP**.
1. Click **Add Custom MCP**.
1. Enter the server URL:

   ```text
   https://aiven-docs.mcp.kapa.ai
   ```

1. Click **Connect**.
1. If prompted, sign in with your Google account to complete the authentication.

For more information, see the [Cursor MCP documentation](https://cursor.com/docs/context/mcp).

</TabItem>
<TabItem value="claude-code" label="Claude Code">

1. Open a terminal.
1. Run the following command:

   ```bash
   claude mcp add --transport http aiven-docs https://aiven-docs.mcp.kapa.ai
   ```

1. If prompted, sign in with your Google account in your browser to complete
   authentication.
1. Run `/mcp` in Claude Code to verify the server is registered.

For more information, see the [Claude Code MCP documentation](https://docs.anthropic.com/en/docs/claude-code/tutorials/set-up-mcp).

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

1. Open the Claude Desktop configuration file. If it does not exist, create it:

   - **macOS:**
     `~/Library/Application Support/Claude/claude_desktop_config.json`

   - **Windows:**
     `%APPDATA%\Claude\claude_desktop_config.json`

1. In the `mcpServers` section, add the `aiven` entry. If `mcpServers` does not exist,
   create it.

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
1. Sign in with your Google account if prompted.

For more information, see the [Claude Desktop MCP documentation](https://modelcontextprotocol.io/quickstart/user).

</TabItem>
<TabItem value="vscode" label="VS Code">

:::note
Requires Visual Studio Code 1.102 or later with the GitHub Copilot extension installed
and enabled.
:::

### Configure the MCP server

1. Open your workspace in Visual Studio Code.
1. In the workspace root, create a `.vscode` directory if it does not exist.
1. In the `.vscode` directory, create a file named `mcp.json`.
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
1. Reload Visual Studio Code.

### Verify the MCP server

1. Open the Command Palette.
1. Run **MCP: List Servers**.
1. Confirm that **aiven** appears in the list.

If **aiven** does not appear, verify that the file is located at
`WORKSPACE_ROOT/.vscode/mcp.json`, then reload Visual Studio Code.

For more information, see the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

</TabItem>
<TabItem value="chatgpt-web" label="ChatGPT (Web)">

:::note
ChatGPT UI labels and navigation may change. Refer to the
[OpenAI documentation](https://developers.openai.com/api/docs/guides/developer-mode)
if the steps do not match your interface.
:::

1. Open ChatGPT in a web browser.
1. Click **Settings**.
1. Select **Apps**.
1. Select **Advanced settings**.
1. Turn on **Developer mode**.
1. Return to **Apps** and select **Create app**.
1. Enter the following:
   - **Name:** Aiven
   - **Description (optional):** Aiven documentation MCP server
   - **MCP Server URL:** `https://aiven-docs.mcp.kapa.ai`
1. Click **Create**.
1. Sign in with your Google account if prompted.
1. Confirm that **Aiven** appears under **Settings → Apps**.

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

Refer to your client documentation for detailed configuration steps.
If prompted, sign in with your Google account to complete the authentication.

</TabItem>
</Tabs>

## Verify the connection

After connecting, ask a question such as:

- How do I create a topic in Aiven for Apache Kafka®?
- How do I migrate snapshot data to Aiven for OpenSearch?

If the response includes references to Aiven documentation, the connection is successful.
