---
title: Managed Agents
sidebar_label: Managed Agents
description: Create and run AI agents on the Aiven Platform with built-in tools and MCP integrations.
limited: true
keywords: [Managed Agents, Agents, MCP, Model Context Protocol]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Managed Agents lets you create and run AI agents on the Aiven Platform.
Agents can use connected tools to gather information, investigate issues, and perform
tasks across Aiven and other systems.

You define what an agent does, choose the AI model it uses, and give it access
to the tools it needs. You can interact with an agent in a chat or configure
scheduled tasks to run automatically.

Managed Agents is built on open-source agent technology. Aiven manages the
infrastructure required to run your agents, so you don't need to deploy or
maintain the underlying infrastructure.

:::note
Managed Agents is in
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
You need access for each project. For more information, see
[Enable Managed Agents](#enable-managed-agents).
:::

## Key concepts

Managed Agents uses the following concepts:

| Concept                | Description                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| Agent                  | An AI agent that you create and run on the Aiven Platform.                                           |
| System instructions    | Define what the agent does and how it behaves.                                                       |
| AI model               | The model that processes the agent's instructions and requests.                                      |
| Tools and integrations | Give the agent access to information and external systems.                                          |
| Task prompt            | Defines the task the agent performs when it runs. Aiven sends it to the agent on each scheduled run. |
| Schedule               | Lets the agent perform recurring tasks automatically.                                                |
| Chat                   | Lets you give the agent a task or ask follow-up questions.                                           |

## How Managed Agents works

A typical Managed Agents workflow is:

1. **Enable Managed Agents:** Request access and enable Managed Agents for your
   project. See [Enable Managed Agents](#enable-managed-agents).
1. **Create an agent:** Start from a template, describe a task, or configure the
   agent manually. See
   [Create an agent](/docs/tools/agents/create-agent).
1. **Connect tools and integrations:** Choose the built-in tools and integrations the
   agent can use. See [Manage integrations](/docs/tools/agents/manage-integrations).
1. **Chat or schedule:** Send requests in a chat, or run tasks automatically at a
   specified time or interval. See [Chat with an agent](/docs/tools/agents/chat-with-agent)
   and [Schedule an agent](/docs/tools/agents/schedule-agent).
1. **Manage the agent:** Update its system instructions, AI model, and tools. See
   [Manage an agent](/docs/tools/agents/manage-agent).

For example, you can use chat to investigate an incident as it happens, or create
a daily schedule that asks the agent to summarize service health.

### Enable Managed Agents

You need access to Managed Agents for each project.

1. In the Aiven Console, open your project.
1. Click <ConsoleLabel name="agents"/> > **Request access**.
1. After you have access, click **Enable agents**.
1. Optional: To run Managed Agents in a project VPC, click **Enable in VPC**.

## When to use Managed Agents

Use agents for tasks that involve gathering information, analyzing it, and taking
actions through connected tools. You can run these tasks on demand or
[on a schedule](/docs/tools/agents/schedule-agent).

For example, you can create an agent to:

- Review Aiven for PostgreSQL® logs, summarize the findings, and send an update to Slack.
- Check consumer lag in Aiven for Apache Kafka® and create a Jira issue when the
  lag requires action.
- Investigate an incident using information from multiple systems and summarize the
  findings.
- Run recurring operational checks and report the results to your team.

What an agent can do depends on its system instructions, AI model, and available
tools and integrations.

## Tools and integrations

You choose which tools each agent can use. Agents can use the following:

- **Built-in tools:** Web Fetch and Web Search.
- **Aiven MCP:** Access to services in your Aiven project. For more information,
  see [Aiven MCP](/docs/tools/mcp-server).
- **Other MCP integrations:** Access to external systems, such as Slack, GitHub,
  and Jira.

For more information, see [Manage integrations](/docs/tools/agents/manage-integrations).

## Permissions

When you connect Aiven MCP, you grant the agent access to services in the current
project. You assign one of the following MCP roles: **Read-only**, **Read-write**,
or **Full access**.

Aiven creates a dedicated identity and a scoped token for the agent automatically.
Your project permissions limit the MCP role you can assign. For more
information, see [Agent permissions](/docs/tools/agents/permissions).

<RelatedPages/>

- [Create an agent](/docs/tools/agents/create-agent)
- [Manage an agent](/docs/tools/agents/manage-agent)
- [Manage integrations](/docs/tools/agents/manage-integrations)
- [Agent permissions](/docs/tools/agents/permissions)
- [AI tools on Aiven](/docs/ai-features)
- [Aiven MCP](/docs/tools/mcp-server)
