---
title: AI tools on Aiven
sidebar_label: Overview
description: Connect AI coding assistants and agents to Aiven services with MCP servers and Skills, and find AI capabilities built into Aiven services.
---

import Card from "@site/src/components/Card";
import GridContainer from "@site/src/components/GridContainer";
import RelatedPages from "@site/src/components/RelatedPages";
import Link from "@docusaurus/Link";
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import AI from "@site/static/images/logos/star-ai.svg";

Aiven provides tools that connect your AI agents to Aiven services, metadata, and data.
It also builds AI capabilities directly into its managed services, from vector search to
AI assistants. Use the following sections to find the right starting point for your
use case.

## Choose your path

<GridContainer columns={2}>
  <Card
    to="/docs/tools/agents"
    iconComponent={AI}
    titleHighlight="var(--aiven-brand-teal)"
    title="Managed Agents"
    description="Create and run agents on the Aiven Platform."
  />
  <Card
    to="#connect-ai-agents-and-tools-to-aiven"
    iconComponent={AI}
    titleHighlight="var(--aiven-brand-teal)"
    title="Connect AI agents and tools to Aiven"
    description="Connect AI assistants and agents to Aiven services, metadata, and data."
  />
  <Card
    to="#ai-built-into-aiven-services"
    iconComponent={AI}
    titleHighlight="var(--aiven-brand-teal)"
    title="AI built into Aiven services"
    description="Use vector search, query optimization, and SQL generation built into supported Aiven services."
  />
</GridContainer>

## Run agents on Aiven

Create agents on the Aiven Platform, connect the tools they need, and run them on demand
or on a schedule.

| Tool | What you can do | Get started |
| --- | --- | --- |
| Managed Agents <LimitedBadge/> | Create agents, connect MCP integrations, and run agents on demand or on a schedule | [Managed Agents](/docs/tools/agents) |

## Connect AI agents and tools to Aiven

Connect AI assistants and agents to Aiven to manage services, explore metadata, and work
with data using MCP servers and Skills. For example, connect an agent to Aiven for
Apache Kafka® instead of running manual commands.

| Tool | What you can do | Get started |
| --- | --- | --- |
| Aiven MCP server | Create and manage services, plans, metrics, logs, and configuration from Cursor, Claude Code, and other MCP clients | [Set up Aiven MCP](/docs/tools/mcp-server) |
| DataHub MCP server <LimitedBadge/> | Give AI agents natural language search, lineage tracking, and context-aware SQL generation over your data ecosystem | [Use the DataHub MCP server](/docs/products/datahub/datahub-mcp-server) |
| Kafka Skills | Create and configure a Kafka service, topics, ACLs, and Schema Registry from the command line | [Set up using Skills](/docs/products/kafka/howto/set-up-kafka-with-skills) |

## AI built into Aiven services

These aren't separate products. They're capabilities built into the services you're
already using.

<div className="ai-capability-box">
  <div className="ai-capability-row">
    <span className="ai-capability-label">Vector search</span>
    <span className="ai-capability-pills">
      <Link className="ai-capability-pill" to="/docs/products/postgresql/concepts/pgvector">Postgres (pgvector)</Link>
      <Link className="ai-capability-pill" to="/docs/products/clickhouse/howto/vector-similarity-index-cache">ClickHouse</Link>
      <Link className="ai-capability-pill" to="/docs/products/opensearch/reference/plugins">OpenSearch</Link>
      <Link className="ai-capability-pill" to="/docs/products/valkey/reference/valkey-modules#valkey-search">Valkey</Link>
    </span>
  </div>
  <div className="ai-capability-row">
    <span className="ai-capability-label">Query optimization</span>
    <span className="ai-capability-pills">
      <Link className="ai-capability-pill" to="/docs/products/postgresql/howto/ai-insights">Postgres</Link>
      <Link className="ai-capability-pill" to="/docs/products/mysql/howto/ai-insights">MySQL</Link>
      <Link className="ai-capability-pill" to="/docs/tools/query-optimizer">Standalone optimizer</Link>
    </span>
  </div>
  <div className="ai-capability-row">
    <span className="ai-capability-label">SQL generation</span>
    <span className="ai-capability-pills">
      <Link className="ai-capability-pill" to="/docs/products/postgresql/howto/pg-studio/use-ai-assistant">PG Studio AI assistant</Link>
    </span>
  </div>
</div>

<RelatedPages/>

- [Get started with Aiven](/docs/get-started)
- [Aiven dev tools](/docs/tools)
