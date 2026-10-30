---
title: Manage an agent
sidebar_label: Manage an agent
description: View, update, and delete an agent, or remove Managed Agents from a project.
limited: true
keywords: [Managed Agents, manage agent, edit agent, delete agent, remove Managed Agents]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Update an existing agent, including its system instructions, AI model, and tools.
You can also delete an agent or remove Managed Agents from a project.

To send a task or question, see
[Chat with an agent](/docs/tools/agents/chat-with-agent). To run a task on a
schedule, see [Schedule an agent](/docs/tools/agents/schedule-agent).

## Prerequisites

An existing agent. To create one, see
[Create an agent](/docs/tools/agents/create-agent).

## Open an agent

1. In the Aiven Console, open your project.
1. Click <ConsoleLabel name="agents"/>.
1. Click the agent.

The agent opens in a new chat. To chat or open a previous conversation, see
[Chat with an agent](/docs/tools/agents/chat-with-agent).

## View agent details

Click <ConsoleLabel name="agent overview"/>.

<ConsoleLabel name="agent overview"/> shows **Agent details** and
**System instructions**. **Agent details** includes the agent name and AI
model.

### Edit the agent name or model

1. In **Agent details**, click <ConsoleLabel name="edit"/>.
1. Change the agent name or the **AI model**.
1. Click **Save**.

### Edit system instructions

1. In **System instructions**, click <ConsoleLabel name="edit"/>.
1. Update the instructions.
1. Click **Save**.

## Change tools and integrations

Click <ConsoleLabel name="integrations"/> to change the tools the agent can
use, including built-in tools and Aiven MCP.

For more information, see
[Manage integrations](/docs/tools/agents/manage-integrations).

## Manage schedules

Click <ConsoleLabel name="agent schedules"/> to view or create scheduled
tasks for the agent.

For more information, see
[Schedule an agent](/docs/tools/agents/schedule-agent).

## Delete an agent

Deleting an agent permanently removes the agent and its chat sessions. You can't undo
this action. Aiven also revokes the agent's Aiven MCP token and removes its
[Aiven identity](/docs/tools/agents/permissions#how-agents-access-aiven-services).

Other agents in the project aren't affected.

1. In the Aiven Console, open your project.
1. Click <ConsoleLabel name="agents"/>.
1. Find the agent and click <ConsoleLabel name="actions"/> > **Delete agent**.

   You can also open the agent and click **Delete agent** in the page header menu.

1. In the **Delete agent?** dialog, click **Delete**.

## Remove Managed Agents

Removing Managed Agents deletes all agents in the project and the infrastructure
that runs them. Use this to stop using Managed Agents in a project.

:::warning
This action is permanent. The following are deleted:

- All agents and their chat history
- Agent schedules
- Connected integrations
- The infrastructure required to run your agents

To use agents in the project again, enable Managed Agents and create the agents
again.
:::

You need the Operator or Administrator project role. For more information, see
[Agent permissions](/docs/tools/agents/permissions).

1. In the Aiven Console, open your project.
1. Click <ConsoleLabel name="agents"/>.
1. In the page header, open the context menu and click **Remove Managed Agents**.
1. In the **Remove Managed Agents** dialog, enter the project name to confirm.
1. Click **Remove Managed Agents**.

A **Managed Agents removed** message appears when removal is complete. If removal
fails, click **Try again**. If the error mentions termination protection, turn off
termination protection for the service it names and try again. If the problem
continues, contact support.

<RelatedPages/>

- [Managed Agents](/docs/tools/agents)
- [Create an agent](/docs/tools/agents/create-agent)
- [Chat with an agent](/docs/tools/agents/chat-with-agent)
- [Agent permissions](/docs/tools/agents/permissions)
