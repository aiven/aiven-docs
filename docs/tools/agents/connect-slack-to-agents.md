---
title: Connect Slack to Managed Agents
sidebar_label: Connect Slack
description: Configure a Slack app and connect it to Managed Agents.
limited: true
keywords: [Managed Agents, Slack, MCP, integration]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Connect Slack to Managed Agents to let your agents read Slack messages, list channels, and look up users and user groups.
You can also allow agents to send messages, add reactions, join and leave channels,
mark conversations as read, and manage user groups.

Agents can access only the channels and direct messages that the Slack bot is a
member of.

To get started, create or configure a Slack app and use its bot token to connect
the integration in the Aiven Console.

## Prerequisites

- Managed Agents enabled for your project. If you have not requested access or
  enabled Managed Agents, see
  [Enable Managed Agents](/docs/tools/agents#enable-managed-agents).
- A Slack workspace where you can create an app and install it, or request
  installation approval.

## Create and configure a Slack app

1. Go to [Slack API: Your Apps](https://api.slack.com/apps) and create a Slack
   app or select an existing app.
1. Add the following **Bot Token Scopes**:

   | Scope | Purpose |
   |---|---|
   | `channels:read`, `channels:history` | List public channels and read their messages. |
   | `groups:read`, `groups:history` | List private channels and read their messages. |
   | `im:read`, `im:history` | Access direct message conversations and read their messages. |
   | `mpim:read`, `mpim:history` | Access group direct message conversations and read their messages. |
   | `search:read.public` | Search public channel content. |
   | `users:read` | Look up Slack users. |
   | `canvases:read` | Read Slack canvases. |

   For more information, see
   [Slack OAuth scopes](https://docs.slack.dev/reference/scopes/).

1. Optional: To allow your agent to send messages and add reactions, also add
   the following scopes:

   | Scope | Purpose |
   |---|---|
   | `chat:write` | Send messages. |
   | `reactions:write` | Add reactions. |

1. Install the app to your Slack workspace and authorize the requested
   permissions. If installation requires approval, request it from your Slack
   workspace administrator.

   If you change the scopes after installing the app, reinstall the app to
   authorize the updated permissions.

1. In your Slack app settings, open **OAuth & Permissions** and copy the
   **Bot User OAuth Token** (`xoxb-...`).

   :::warning
   Keep your Slack token secure. Anyone with access to the token can access
   Slack resources with the permissions you granted to the app.
   :::

   For more information, see
   [Slack tokens](https://docs.slack.dev/authentication/tokens/).

## Connect Slack to an agent

Before you start, have the bot token from your Slack app ready.

1. In the [Aiven Console](https://console.aiven.io), open your project.
1. Select <ConsoleLabel name="agents"/>, then select your agent.
1. Select <ConsoleLabel name="integrations"/> > **Manage integrations**.
1. Under **Integrations catalog**, find **Slack** and select **Connect** to open the
   **Connect Slack** dialog.
1. In the dialog:
   1. In **Integration name**, enter a name for the integration, such as
      `slack`.
   1. In **Slack Bot / User Token**, enter the bot token from your Slack app.
   1. Optional: To allow the agent to make changes in Slack, turn off
      **Read-only access**. This setting is on by default. In read-only mode,
      the agent can use only the read tools listed in
      [Available Slack tools](#available-slack-tools). The Slack app must also
      have the scopes that the write tools need.
1. Select **Connect**.
1. Close the **Manage agent integrations** dialog.
1. On the agent's **Integrations** page, enable the Slack integration and select
   the tools the agent can use. Write tools appear only when **Read-only
   access** is turned off.
1. Select **Save changes**.

The agent can now use the selected Slack tools, subject to the permissions
granted to your Slack app.

## Available Slack tools

The tools that an agent can use depend on the **Read-only access** setting and
on the type of Slack token.

### Read-only mode

When **Read-only access** is on, the agent can use the following tools:

| Tool | Purpose |
|---|---|
| Channels List | List channels. |
| Channels Me | List the channels that the Slack user or bot is a member of. |
| Conversations History | Read messages in a channel or direct message. |
| Conversations Replies | Read the replies in a message thread. |
| Users Search | Look up Slack users. |
| Usergroups List | List user groups. |
| Usergroups Me | List the user groups that the Slack user belongs to. |

### Write mode

When you turn off **Read-only access**, the agent can use the read tools and the
following write tools:

| Tool | Purpose |
|---|---|
| Conversations Add Message | Send a message to a channel or thread. |
| Reactions Add | Add a reaction to a message. |
| Reactions Remove | Remove a reaction from a message. |
| Conversations Join | Join a channel. |
| Conversations Leave | Leave a channel. |
| Conversations Mark | Mark a conversation as read. |
| Usergroups Create | Create a user group. |
| Usergroups Update | Update a user group. |
| Usergroups Users Update | Update the members of a user group. |

### Tools that require a user token

If you connect with a user token (`xoxp-...`), the agent can also use the
following tools in both modes. Bot tokens (`xoxb-...`) can't use these tools.

| Tool | Purpose |
|---|---|
| Conversations Search Messages | Search messages. |
| Conversations Unreads | List conversations with unread messages. |

## Manage the Slack integration

To view or manage your Slack integration, open the agent's **Integrations** page
and select **Manage integrations**.

If the integration shows **Reconnect required**, select **reconnect** and enter
a valid Slack token to restore access.

To change which Slack tools an agent can use, update the tool selection on the
**Integrations** page and select **Save changes**.

Slack integrations keep the tool list from when you connected them. To get the
current tools, disconnect the integration and connect it again.

<RelatedPages/>

- [Manage integrations](/docs/tools/agents/manage-integrations)
- [Agent permissions](/docs/tools/agents/permissions)
