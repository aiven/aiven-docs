---
title: Create an agent
sidebar_label: Create an agent
description: Create an agent from a template, by describing a task, or by configuring it manually.
limited: true
keywords: [Managed Agents, create agent, template, Aiven Data Agents, AI model, system instructions]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create an agent from a template, by describing a task, or by configuring the agent
manually. When you describe a task, Aiven generates a configuration that you can
review and test before you create the agent.

## Prerequisites

Managed Agents enabled for the project. If you have not requested access or
enabled Managed Agents, see
[Enable Managed Agents](/docs/tools/agents#enable-managed-agents).

## Create an agent from a template

Use **Aiven Data Agents** to start from a template for one of your Aiven services.
Templates cover common tasks, such as finding slow PostgreSQL queries or
investigating Apache Kafka® consumer lag.

To create an agent from a template:

1. In the Aiven Console, open your project.
1. Click <ConsoleLabel name="agents"/> > **Create agent**.
1. Choose **Aiven Data Agents** and click **Next**.
1. Choose a template and click **Next**.
1. Choose the service for the agent and click **Continue**. To find a service,
   use **Search services**.

   Aiven opens the agent configuration with settings based on the template.

1. Optional: Change the **AI model**, **System instructions**, **Task prompt**, or
   **MCP access**. Choose the MCP role with the fewest permissions the agent needs.
   For more information, see [Agent permissions](/docs/tools/agents/permissions).
1. Click **Run test**. The agent runs the **Task prompt** and shows its response.
   **Create agent** stays unavailable until you run a test.
1. Click **Create agent**.
1. For **Schedule**, choose **On demand**, an interval such as **Every hour** or
   **Daily**, or **Custom**. If the schedule needs more details, set **Cadence**,
   **Time**, and **Time zone**.
1. Click **Deploy**.

The agent opens on its <ConsoleLabel name="agent overview"/> page, which shows
**Agent details**, **System instructions**, and **Available tools and integrations**.

## Create an agent by describing a task

1. In the Aiven Console, open your project.
1. Click <ConsoleLabel name="agents"/> > **Create agent**.
1. Choose **Describe with AI** and click **Next**.
1. In **Agent description**, enter the task.

   For example:

   > Check the health of the PostgreSQL services in this project.
   > Summarize any issues you find and highlight anything that needs attention.

   To start from an example, click a suggestion under **Or start from a suggestion**.
   Aiven fills in the description. Some suggestions need other MCP integrations,
   such as Slack or Jira.

1. Click **Continue**. Do not close this window.

   Aiven prepares a draft. The agent isn't saved until you click
   **Create agent**. If you leave, the draft and any test runs are lost.

   Aiven analyzes the task and prepares the configuration. This can take a few
   minutes. During this process, Aiven:

   - Determines the agent's goal
   - Generates **System instructions**
   - Selects MCP tools and permissions
   - Creates the **Task prompt**

1. Optional: Change the **AI model**, **System instructions**, **Task prompt**,
   tools and integrations, or **MCP access**. Aiven selects an MCP role for the
   agent. Choose the role with the fewest permissions the agent needs. For more
   information, see [Agent permissions](/docs/tools/agents/permissions).
1. If a required integration shows **Not connected**, click **set it up now** to
   open **Manage integrations**. You can also click **+ Add other integrations**.
   If an integration has multiple instances, choose the instance the agent uses.
   For more information, see
   [Manage integrations](/docs/tools/agents/manage-integrations).
1. Click **Run test** to review the output. **Create agent** stays unavailable
   until you run a test.
1. If you change the configuration, click **Save changes and Run test**.
   **Create agent** stays unavailable until you test the changes.
1. Click **Create agent**.
1. For **Schedule**, choose **On demand**, an interval such as **Every hour** or
   **Daily**, or **Custom**. If the schedule needs more details, set **Cadence**,
   **Time**, and **Time zone**.
1. Click **Deploy**.

## Configure an agent manually

1. In the Aiven Console, open your project.
1. Click <ConsoleLabel name="agents"/> > **Create agent**.
1. Choose **Configure manually** and click **Next**.

1. On the **Agent details** step:
   - Enter a **Name**.
   - Choose the **AI model**.
   - Enter **System instructions** that describe what the agent does, how it
     responds, and anything it avoids.

   Click **Next**.
1. On the **Integrations** step, under **Built-in tools and integrations**, choose
   the tools the agent can use, such as **Web Fetch**, **Web Search**, or
   **Aiven MCP**. Connected integrations also appear in this list. To add other
   integrations, see
   [Manage integrations](/docs/tools/agents/manage-integrations). Click **Next**.
1. On the **Schedule** step, choose **On demand**, an interval such as
   **Every hour** or **Daily**, or **Custom**. If you choose **Custom**, set the
   cadence and any extra options, such as **Time** and **Time zone**.
1. For a scheduled agent, enter a **Task prompt**. Aiven sends this message to the
   agent on each scheduled run. For more information, see
   [Schedule an agent](/docs/tools/agents/schedule-agent).
1. Click **Create agent**.

The agent opens in a chat.

## Next steps

- [Chat with an agent](/docs/tools/agents/chat-with-agent)
- [Schedule an agent](/docs/tools/agents/schedule-agent)
- [Manage an agent](/docs/tools/agents/manage-agent)
- [Manage integrations](/docs/tools/agents/manage-integrations)

<RelatedPages/>

- [Managed Agents](/docs/tools/agents)
