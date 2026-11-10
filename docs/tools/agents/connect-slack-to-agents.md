---
title: Connect Slack to Managed Agents
sidebar_label: Connect Slack
description: Configure a Slack app and connect it to Managed Agents.
limited: true
keywords: [Managed Agents, Slack, MCP, integration]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Connect Slack to Managed Agents to let your agents read Slack messages, search public channels, and look up users. You can also allow agents to send messages and add reactions.

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
   1. Optional: To allow the agent to send messages and add reactions, turn off
      **Read-only access**. This setting is on by default. The Slack app must
      also have the `chat:write` and `reactions:write` scopes, respectively.
1. Select **Connect**.
1. Close the **Manage agent integrations** dialog.
1. On the agent's **Integrations** page, enable the Slack integration and select
   the tools the agent can use.
1. Select **Save changes**.

The agent can now use the selected Slack tools, subject to the permissions
granted to your Slack app.

## Manage the Slack integration

To view or manage your Slack integration, open the agent's **Integrations** page
and select **Manage integrations**.

If the integration shows **Reconnect required**, select **reconnect** and enter
a valid Slack token to restore access.

To change which Slack tools an agent can use, update the tool selection on the
**Integrations** page and select **Save changes**.

<RelatedPages/>

- [Manage integrations](/docs/tools/agents/manage-integrations)
- [Agent permissions](/docs/tools/agents/permissions)
