---
title: Manage integrations
sidebar_label: Manage integrations
description: Configure the tools and integrations an agent can use, including access to Aiven resources.
limited: true
keywords: [Managed Agents, MCP, integrations, permissions]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Choose which tools an agent can use, including built-in tools and [Aiven MCP](/docs/tools/mcp-server).

You can also add other Model Context Protocol (MCP) integrations.

## Prerequisites

- Access to Managed Agents for the project. If you don't have access, see
  [Managed Agents](/docs/tools/agents).
- An existing agent. To create one, see
  [Create an agent](/docs/tools/agents/create-agent).

## Change the tools for an agent

1. In the Aiven Console, open your project.
1. Click <ConsoleLabel name="agents"/>, then click the agent.
1. Click <ConsoleLabel name="integrations"/>.
1. Click the tools the agent can use:
   - **Web Fetch:** Retrieves content from web pages.
   - **Web Search:** Searches the web for information.
   - **Aiven MCP:** Grants the agent access to services in the current project.
1. Click **Save changes**.

## Set the Aiven MCP role and tools

When you turn on **Aiven MCP**, Aiven creates a scoped token automatically. You
can grant any role up to your own.

The following roles are available:

| Role | Access |
| --- | --- |
| **Read-only** | View services, configuration, logs, and metrics. No changes. |
| **Developer** | Manage databases, topics, connectors, and run queries. Cannot create or delete services. |
| **Operator** | Full access to all services in the project, including creating and deleting services. |

1. Select an **MCP role**.
1. Under **Available tools**, select the tool groups the agent can use:
   **Services**, **Kafka**, **PostgreSQL**, **Integrations**,
   **Applications**, and **Other**.
1. Click **Save changes**.

<RelatedPages/>

- [Managed Agents](/docs/tools/agents)
- [Aiven MCP](/docs/tools/mcp-server)
- [Create an agent](/docs/tools/agents/create-agent)
- [Manage an agent](/docs/tools/agents/manage-agent)
