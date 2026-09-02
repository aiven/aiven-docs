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
scheduled tasks to run automatically. Aiven manages the infrastructure required to
run the agent.

:::note
Managed Agents is in
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
You need access for each project. In the project, click
<ConsoleLabel name="agents"/> > **Request access**. After you have access,
click **Enable agents**. To run Managed Agents in a project VPC, click
**Enable in VPC**.
:::

## Example uses

Use agents for tasks that involve gathering information, analyzing it, and taking
actions through connected tools. Run these tasks on demand or
[on a schedule](/docs/tools/agents/schedule-agent).

For example, you can create an agent to:

- Review Aiven for PostgreSQL® logs, summarize the findings, and send an update to Slack.
- Monitor Aiven for Apache Kafka® consumer lag and create a Jira issue when the lag
  requires action.
- Investigate an incident using information from multiple systems and summarize the
  findings.
- Run recurring operational checks and report the results to your team.

What an agent can do depends on its system instructions, AI model, and available
tools and integrations.

## How Managed Agents works

You configure an agent with:

- **System instructions** that define what the agent does and how it behaves.
- **An AI model** that processes the agent's instructions and requests.
- **Tools and integrations** that give the agent access to information and external
  systems.
- **Schedules** that let the agent perform recurring tasks automatically.

You can also start a chat with an agent to give it a task or ask follow-up
questions.

## Tools and integrations

Agents can use built-in tools such as **Web Fetch** and **Web Search**.

You can also connect an agent to Aiven through
[Aiven MCP](/docs/tools/mcp-server), or add other MCP integrations such as
Slack, GitHub, and Jira. You choose which tools each agent can use.

When you connect Aiven MCP, you grant access to services in the current project
and assign an MCP role. You can grant any role up to your own. Aiven creates a
scoped token automatically.

## Run agents interactively or on a schedule

You can use an agent in two ways:

- [Chat with an agent](/docs/tools/agents/chat-with-agent) to send requests
  when needed.
- [Schedule an agent](/docs/tools/agents/schedule-agent) to run tasks
  automatically at a specified time or interval.

For example, you can use chat to investigate an incident as it happens, or create
a daily schedule that asks the agent to summarize service health.

## Next steps

- [Create an agent](/docs/tools/agents/create-agent)
- [Chat with an agent](/docs/tools/agents/chat-with-agent)
- [Schedule an agent](/docs/tools/agents/schedule-agent)
- [Manage an agent](/docs/tools/agents/manage-agent)
- [Manage integrations](/docs/tools/agents/manage-integrations)

:::caution
You are interacting with AI. Agents can make mistakes and take actions
through connected tools, including scheduled actions. Don't enter secrets or
data you aren't authorized to share. Agents are free for a limited time.
To get started, add a payment method. You aren't charged.
:::

<RelatedPages/>

- [AI tools on Aiven](/docs/ai-features)
- [Aiven MCP](/docs/tools/mcp-server)
