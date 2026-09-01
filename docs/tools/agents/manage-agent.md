---
title: Manage an agent
sidebar_label: Manage an agent
description: View and update an agent's configuration, integrations, and schedules.
limited: true
keywords: [Managed Agents, manage agent, edit agent]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Update an existing agent, including its system instructions, AI model, and tools.

To send a task or question, see
[Chat with an agent](/docs/tools/agents/chat-with-agent). To run a task on a
schedule, see [Schedule an agent](/docs/tools/agents/schedule-agent).

## Prerequisites

- Access to Managed Agents for the project. If you don't have access, see
  [Managed Agents](/docs/tools/agents).
- An existing agent. To create one, see
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

<RelatedPages/>

- [Managed Agents](/docs/tools/agents)
- [Create an agent](/docs/tools/agents/create-agent)
- [Chat with an agent](/docs/tools/agents/chat-with-agent)
