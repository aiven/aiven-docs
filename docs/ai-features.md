---
title: AI tools on Aiven
sidebar_label: Overview
description: Connect AI coding assistants and agents to Aiven services with MCP servers and Skills, and find AI capabilities built into Aiven services.
---

import Card from "@site/src/components/Card";
import GridContainer from "@site/src/components/GridContainer";
import RelatedPages from "@site/src/components/RelatedPages";
import Link from "@docusaurus/Link";
import AI from "@site/static/images/logos/star-ai.svg";

Aiven builds AI capabilities directly into its managed services, from vector search to AI assistants.
It also provides tools that connect your own AI agents to your data. Use the
following sections to find the right starting point for your use case.

## Choose your path

<GridContainer columns={2}>
  <Card
    to="#connect-ai-agents-and-tools-to-aiven"
    iconComponent={AI}
    titleHighlight="#FDCD12"
    title="Connect AI agents and tools to Aiven"
    description="Give coding assistants and AI agents access to your Aiven services."
  />
  <Card
    to="#ai-is-built-into-these-services"
    iconComponent={AI}
    titleHighlight="#6F64FF"
    title="AI is built into these services"
    description="Find vector search, query optimization, and SQL generation built into the services you already use."
  />
</GridContainer>

## Connect AI agents and tools to Aiven

Give AI coding assistants and agents controlled access to services such as Aiven for
Apache Kafka®, instead of manual commands.

| Tool | What it exposes | Get started |
| --- | --- | --- |
| Aiven MCP server | Create and manage services, plans, metrics, logs, and configuration from Cursor, Claude Code, and other MCP clients | [Set up Aiven MCP](/docs/tools/mcp-server) |
| DataHub MCP server | Give AI agents natural language search, lineage tracking, and context-aware SQL generation over your data ecosystem | [Use the DataHub MCP server](/docs/products/datahub/datahub-mcp-server) |
| Kafka Skills | Create and configure a Kafka service, topics, ACLs, and Schema Registry from the command line | [Set up using Skills](/docs/products/kafka/howto/set-up-kafka-with-skills) |

## AI is built into these services

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
