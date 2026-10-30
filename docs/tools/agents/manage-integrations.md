---
title: Manage integrations
sidebar_label: Manage integrations
description: Configure the tools and integrations an agent can use, including access to Aiven resources.
limited: true
keywords: [Managed Agents, MCP, integrations, permissions]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Choose which tools and integrations an agent can use, including built-in tools
and [Aiven MCP](/docs/tools/mcp-server).

You can also connect other Model Context Protocol (MCP) integrations.

## Prerequisites

Managed Agents enabled for the project. If you have not requested access or
enabled Managed Agents, see
[Enable Managed Agents](/docs/tools/agents#enable-managed-agents).

## Configure tools and integrations

1. In the Aiven Console, open your project.
1. Select <ConsoleLabel name="agents"/>, then select the agent.
1. Select <ConsoleLabel name="integrations"/>.
1. Select the tools and integrations the agent can use.
1. Select **Save changes**.

Built-in tools include:

- **Web Fetch**
- **Web Search**
- **Aiven MCP**

To add or manage integrations, select **Advanced integration settings**.

## Connect an integration

In **Advanced integration settings**, connected integrations appear at the top
of the page. The **Integrations catalog** lists other integrations you can
connect.

To connect an integration:

1. Find the integration in the **Integrations catalog**.
1. Select **Connect**.
1. Enter the required details and credentials.
1. Select **Connect**.

To connect an integration that is not available in the catalog, select
**Add custom integration**.

### Credentials for other MCP integrations

Other MCP integrations, such as Slack, GitHub, and Jira, use the credentials you
enter when you connect them, not Aiven permissions. For more information, see
[Permissions for other MCP integrations](/docs/tools/agents/permissions#permissions-for-other-mcp-integrations).

## Set the Aiven MCP role and tools

When you enable **Aiven MCP**, Aiven creates a scoped token automatically. You
can assign an MCP role up to your own project permissions. The available roles are
**Read-only**, **Read-write**, and **Full access**. For descriptions of each role,
see [MCP roles](/docs/tools/agents/permissions#mcp-roles).

1. Select an **MCP role**.
1. Under **Available tools**, select the tool groups the agent can use.
1. Select **Save changes**.

## Remove Aiven MCP from an agent

To remove an agent's access to Aiven without deleting the agent:

1. In the Aiven Console, open your project.
1. Click <ConsoleLabel name="agents"/>.
1. Click the agent.
1. Click <ConsoleLabel name="integrations"/>.
1. Clear **Aiven MCP**.
1. Click **Save changes**.

<RelatedPages/>

- [Agent permissions](/docs/tools/agents/permissions)
- [Managed Agents](/docs/tools/agents)
- [Aiven MCP](/docs/tools/mcp-server)
- [Create an agent](/docs/tools/agents/create-agent)
- [Manage an agent](/docs/tools/agents/manage-agent)
