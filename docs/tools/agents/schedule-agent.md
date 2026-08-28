---
title: Schedule an agent
sidebar_label: Schedule an agent
description: Create scheduled tasks so an agent runs automatically.
limited: true
keywords: [Aiven Agents, schedule, automation, recurring tasks]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create scheduled tasks so an agent runs automatically at a specified time or interval.

Use a schedule for recurring work, such as a daily summary of service health. To
interact with an agent on demand, see
[Chat with an agent](/docs/tools/agents/chat-with-agent).

You can also set **On demand** or a schedule when you
[create an agent](/docs/tools/agents/create-agent).

## Prerequisites

- Access to Aiven Agents for the project. If you don't have access yet, see
  [Aiven Agents](/docs/tools/agents).
- An existing agent. To create one, see
  [Create an agent](/docs/tools/agents/create-agent).

## Create a schedule

1. In the Aiven Console, open your project.
1. Click <ConsoleLabel name="agents"/>.
1. Click the agent.
1. Click <ConsoleLabel name="agent schedules"/>.
1. Click **Create schedule**.
1. Enter a **Name**.
1. In **Task**, enter the work the agent performs on each run.

   For example:

   > Summarize yesterday's signups and flag anomalies.

1. Select the **Cadence**. If the cadence runs at a specific time, set **Time**
   and **Time zone**.
1. Click **Create schedule**.

The Console shows when the schedule runs. For example:
**Runs daily at 09:00 Europe/Berlin**.

**System instructions** define how the agent behaves. **Task** defines the work
this schedule performs.

## Edit a schedule

1. On <ConsoleLabel name="agent schedules"/>, find the schedule to edit.
1. Click <ConsoleLabel name="actions"/> > **Edit**.
1. Change the **Name**, **Task**, **Cadence**, **Time**, or **Time zone**.

## Enable or disable a schedule

The **Status** column shows **Enabled** or **Disabled**. A disabled schedule
does not run.

To enable a schedule:

1. On <ConsoleLabel name="agent schedules"/>, find the schedule to enable.
1. Click <ConsoleLabel name="actions"/> > **Enable**.

To disable a schedule:

1. On <ConsoleLabel name="agent schedules"/>, find the schedule to disable.
1. Click <ConsoleLabel name="actions"/> > **Disable**.

## Run a schedule now

1. On <ConsoleLabel name="agent schedules"/>, find the schedule to run.
1. Click <ConsoleLabel name="actions"/> > **Run now**.

The agent opens in a chat and runs the **Task** from the schedule. You can send
follow-up messages in the same conversation.

For more information, see
[Chat with an agent](/docs/tools/agents/chat-with-agent).

## View schedule runs

1. On <ConsoleLabel name="agent schedules"/>, find the schedule.
1. Click <ConsoleLabel name="actions"/> > **View runs**.

## Delete a schedule

1. On <ConsoleLabel name="agent schedules"/>, find the schedule to delete.
1. Click <ConsoleLabel name="actions"/> > **Delete**.

<RelatedPages/>

- [Aiven Agents](/docs/tools/agents)
- [Create an agent](/docs/tools/agents/create-agent)
- [Chat with an agent](/docs/tools/agents/chat-with-agent)
