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
enabled Managed Agents, see [Managed Agents](/docs/tools/agents).

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

## Set the Aiven MCP role and tools

When you enable **Aiven MCP**, Aiven creates a scoped token automatically. You
can assign an MCP role up to your own project permissions.

The following roles are available:

| Role | Access |
| --- | --- |
| **Read-only** | View services, configuration, logs, and metrics. No changes. |
| **Developer** | Manage databases, topics, connectors, and run queries. Cannot create or delete services. |
| **Operator** | Full access to all services in the project, including creating and deleting services. |

1. Select an **MCP role**.
1. Under **Available tools**, select the tool groups the agent can use.
1. Select **Save changes**.

<RelatedPages/>

- [Managed Agents](/docs/tools/agents)
- [Aiven MCP](/docs/tools/mcp-server)
- [Create an agent](/docs/tools/agents/create-agent)
- [Manage an agent](/docs/tools/agents/manage-agent)
