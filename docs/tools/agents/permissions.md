---
title: Agent permissions
sidebar_label: Agent permissions
description: Understand who can manage agents and control what agents can access in your Aiven project through Aiven MCP.
limited: true
keywords: [Managed Agents, MCP, permissions, MCP roles, roles, tokens]
---

import RelatedPages from "@site/src/components/RelatedPages";

Managed Agents uses two sets of permissions:

- **Your permissions** control what you can do with agents.
- **The agent's permissions** control what an agent can do in your Aiven project
  through [Aiven MCP](/docs/tools/mcp-server).

## Who can manage agents

Your [project role](/docs/platform/concepts/permissions#project-roles-and-permissions)
determines what you can do with agents.

| Task                                                                                                                                               | Required project role     |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| View, create, edit, and delete agents                                                                                                              | Read-only or higher       |
| [Enable](/docs/tools/agents#enable-managed-agents) or [remove](/docs/tools/agents/manage-agent#remove-managed-agents) Managed Agents              | Operator or Administrator |

These rules stop anyone from using agents to gain more access than they have:

- **You can't grant more access than you have.** You can assign an
  [MCP role](#mcp-roles) only up to your own project permissions.
- **You can see and edit only agents within your access.** If an agent has more
  access than you do, it doesn't appear in your list of agents.

## How agents access Aiven services

When you connect an agent to Aiven MCP, the agent gets its own Aiven identity. The
agent uses this identity, not yours, and can access only the project it belongs to.

Aiven creates and manages the agent's access token. You never see or copy it. The
token expires after 90 days. To renew it, reconnect Aiven MCP for the agent.

## MCP roles and tool groups

An MCP role and tool groups control what an agent can do through Aiven MCP.

### MCP roles

When you connect Aiven MCP to an agent, you choose an MCP role. MCP roles are
separate from project roles.

The following MCP roles are available:

| Role            | Access                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Read-only**   | View services, configuration, logs, and metrics. No changes.                                                                     |
| **Read-write**  | Everything in **Read-only**, plus manage databases, topics, and connectors, and run queries. Can't create or delete services.    |
| **Full access** | Everything in **Read-write**, plus create and delete services and change service configuration.                                  |

Choose the role with the fewest permissions that the agent needs for its task. For
example, an agent that only reports on Aiven for Apache Kafka® consumer lag needs
**Read-only**.

Agents act on the content they read, such as Slack messages or web pages. This
content can lead an agent to take unintended actions. A restrictive MCP role and
narrow tool groups limit the impact.

### Tool groups

Tool groups limit which areas of Aiven the agent can use, such as Kafka,
PostgreSQL, services, integrations, and applications.

The MCP role and tool groups work together. For example, with the PostgreSQL tool
group and the **Read-only** role, the agent can use only the read-only
PostgreSQL tools.

## Permissions for other MCP integrations

Other MCP integrations, such as Slack, GitHub, and Jira, don't use Aiven permissions.
The agent uses the credentials you provide when you connect the integration, so it can
do anything those credentials allow.

To reduce risk, follow these practices:

- Prefer a service account token where the integration supports one. A personal
  token belongs to one person and stops working when that person leaves the
  organization.
- Grant only the permissions the agent needs, such as read-only access to specific
  channels or repositories.
- Rotate tokens in the external system. Aiven doesn't rotate them for you.
- Don't put passwords, tokens, or other secrets in agent instructions. Add
  credentials only when you connect an integration.

## Troubleshooting

### You can't see an agent that a colleague created

The agent has more access than your project role allows. Ask a user with equal or
higher permissions to manage it or to lower its MCP role.

### An MCP role is unavailable

Your project role doesn't include every permission that role needs. Ask a project
Administrator to change your project role or to set the MCP role for you.

### An agent stopped accessing Aiven services

If the agent's token expired, reconnect Aiven MCP for the agent to renew it.

### An external integration stopped working

The token you provided for the integration might have expired, or someone might
have revoked it. Create a token in the external system and update it in the
agent's integration settings.

<RelatedPages/>

- [Managed Agents](/docs/tools/agents)
- [Set the Aiven MCP role and tools](/docs/tools/agents/manage-integrations#set-the-aiven-mcp-role-and-tools)
- [Remove Aiven MCP from an agent](/docs/tools/agents/manage-integrations#remove-aiven-mcp-from-an-agent)
- [Aiven MCP](/docs/tools/mcp-server)
- [Roles and permissions](/docs/platform/concepts/permissions)
