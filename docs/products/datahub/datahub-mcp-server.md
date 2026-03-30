---
title: Use the DataHub MCP server
limited: true
---

Use the DataHub MCP server to empower AI agents with deep visibility into your data ecosystem, enabling natural language search, end-to-end lineage tracking, and context-aware SQL generation.

## Prerequisites

- The [uv Python package and project manager installed](https://docs.astral.sh/uv/)
- A [DataHub personal access tokens (PAT)](https://docs.datahub.com/docs/authentication/personal-access-tokens)
- The [DataHub GMS URL](#get-the-datahub-gms-url)

## Get the DataHub GMS URL

1. In the Aiven Console, go to your DataHub service.
1. In the **Connection information** section, copy the **Application URL**.
1. Add `/api/gms` to the end of the copied URL.

## Configure the MCP server

To run the [open-source MCP server](https://github.com/acryldata/mcp-server-datahub)
locally, configure your AI assistant:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="group1">
<TabItem value="claude" label="Claude Desktop" default>

1. To find the full path to the `uvx` command, run:

    ```bash
    which uvx
    ```

1. Add the following content to your `claude_desktop_config.json` file:

    ```json
    {
     "mcpServers": {
       "datahub": {
         "command": "FULL-PATH-TO-UVX",  // For example: /Users/hsheth/.local/bin/uvx
         "args": ["mcp-server-datahub@latest"],
         "env": {
           "DATAHUB_GMS_URL": "DATAHUB_APPLICATION_URL",
           "DATAHUB_GMS_TOKEN": "DATAHUB_PAT"
          }
        }
      }
    }
    ```

    Where:
    - `FULL-PATH-TO-UVX` is the full path to the `uvx` command you found.
    - `DATAHUB_APPLICATION_URL` is the [DataHub GMS URL](#get-the-datahub-gms-url).
    - `DATAHUB_PAT` is the personal access token you created in the DataHub UI.

</TabItem>
<TabItem value="cursor" label="Cursor">

1. Add the following content to your `.cursor/mcp.json` file:

    ```json
      {
        "mcpServers": {
          "datahub": {
            "command": "uvx",
            "args": ["mcp-server-datahub@latest"],
            "env": {
              "DATAHUB_GMS_URL": "DATAHUB_APPLICATION_URL",
              "DATAHUB_GMS_TOKEN": "DATAHUB_PAT"
            }
          }
        }
      }
    ```
    Where:
    - `DATAHUB_APPLICATION_URL` is the [DataHub GMS URL](#get-the-datahub-gms-url).
    - `DATAHUB_PAT` is the personal access token you created in the DataHub UI.

</TabItem>
<TabItem value="other" label="Other AI tools">

The model context protocol (MCP) is an open standard supported by many clients.
The most common configurations require:


- The [DataHub GMS URL](#get-the-datahub-gms-url)
- Your DataHub [personal access token](https://docs.datahub.com/docs/authentication/personal-access-tokens)
- Command: `uvx`
- Args: `mcp-server-datahub@latest`

The following standard MCP JSON configuration format works with most clients:

```json

"datahub": {
      "command": "/Users/USER_NAME/.local/bin/uvx",
      "args": [
        "mcp-server-datahub@latest"
      ],
      "env": {
        "DATAHUB_GMS_URL": "DATAHUB_APPLICATION_URL",
        "DATAHUB_GMS_TOKEN": "DATAHUB_PAT"
}
```

Where:
- `DATAHUB_APPLICATION_URL` is the [DataHub GMS URL](#get-the-datahub-gms-url).
- `DATAHUB_PAT` is the personal access token you created in the DataHub UI.

</TabItem>
</Tabs>
