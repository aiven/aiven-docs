---
title: Create an agent
sidebar_label: Create an agent
description: Create an agent by describing a task or configuring it manually.
limited: true
keywords: [Managed Agents, create agent, AI model, system instructions]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create an agent by describing a task or by configuring the agent manually.
When you describe a task, Aiven generates a configuration that you can review and
test before you create the agent.

## Prerequisites

Managed Agents enabled for the project. If you have not requested access or
enabled Managed Agents, see [Managed Agents](/docs/tools/agents).

## Create an agent by describing a task

1. In the Aiven Console, open your project.
1. Click <ConsoleLabel name="agents"/> > **Create agent**.

### Describe the task

1. In **Describe what you want this agent to do**, enter the task.

   For example:

   > Check the health of the PostgreSQL services in this project.
   > Summarize any issues you find and highlight anything that needs attention.

   To start from a suggestion, select an option under **Or start from a suggestion**,
   such as **Slow-query digest**, **Incident RCA**, **PR reviewer**,
   **Sprint status sync**, or **Deep researcher**. Some suggestions use other
   MCP integrations, such as Slack or Jira.

1. Click **Create agent**. Do not close this window.

   Aiven prepares a draft. The agent is not saved until you click
   **Create agent** again. If you leave, the draft and any test runs are
   lost.

Aiven analyzes the task and prepares the configuration. This can take a few minutes.
During this process, Aiven:

- Determines the agent's goal
- Generates **System instructions**
- Selects MCP tools and permissions
- Creates the **Task prompt**

### Review the generated configuration

When the configuration is ready, review it before you create the agent.

You can change:

- AI model
- System instructions
- Task prompt
- Built-in tools and integrations
- MCP role and available tools

**System instructions** define how the agent behaves. The **Task prompt** defines
the task the agent performs when it runs.

If a required integration shows **Not connected**, click **set it up now**.
**Manage integrations** opens. You can also click
**+ Add other integrations**. For more information, see
[Manage integrations](/docs/tools/agents/manage-integrations).

### Test the agent

1. Optional: Click **Run test** to review the output.
1. If you change the configuration, click **Save changes and Run test**.
   **Create agent** stays unavailable until you save and run the test again.

### Create the agent

1. Click **Create agent**.
1. For **Schedule**, select **On demand** or a recurring schedule. If you select
   **Custom**, set the cadence and any extra options, such as **Time** and
   **Time zone**.
1. Click **Create**.

The agent appears on the <ConsoleLabel name="agents"/> page with the status
**Active**. The agent <ConsoleLabel name="agent overview"/> shows
**Agent details** and **System instructions**.

## Configure an agent manually

1. In the Aiven Console, open your project.
1. Click <ConsoleLabel name="agents"/> > **Create agent** > **Configure manually**.

Manual configuration has three steps: **Agent details**, **Integrations**, and
**Schedule**.

### Configure agent details

1. Enter a **Name** for the agent.
1. Select the **AI model**.
1. Enter **System instructions** that describe what the agent does, how it
   responds, and anything it avoids.
1. Click **Continue**.

### Select integrations

1. Under **Built-in tools and integrations**, select the tools the agent can use:
   - **Web Fetch**
   - **Web Search**
   - **Aiven MCP**
   Connected integrations also appear in this list.
1. Optional: Click **adding or creating MCP integrations**. For more
   information, see
   [Manage integrations](/docs/tools/agents/manage-integrations).
1. Click **Continue**.

### Configure the schedule

1. For **How often should this agent run?**, select **On demand** or a
   recurring schedule. If you select **Custom**, set the cadence and any extra
   options, such as **Time** and **Time zone**.
1. For a scheduled agent, enter a **Task prompt**. Aiven sends this message to the
   agent on each scheduled run. For more information, see
   [Schedule an agent](/docs/tools/agents/schedule-agent).
1. Click **Create agent**.

The agent appears on the <ConsoleLabel name="agents"/> page with the status
**Active**.

## Next steps

- [Chat with an agent](/docs/tools/agents/chat-with-agent)
- [Manage an agent](/docs/tools/agents/manage-agent)
- [Manage integrations](/docs/tools/agents/manage-integrations)
- [Schedule an agent](/docs/tools/agents/schedule-agent)

<RelatedPages/>

- [Managed Agents](/docs/tools/agents)
