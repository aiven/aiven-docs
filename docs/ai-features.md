---
title: AI on Aiven
sidebar_label: Overview
description: Find AI-powered tools and features across Aiven services, from vector search and embeddings to AI assistants and agent integrations.
---

import Card from "@site/src/components/Card";
import GridContainer from "@site/src/components/GridContainer";
import RelatedPages from "@site/src/components/RelatedPages";
import AI from "@site/static/images/logos/star-ai.svg";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";

Aiven builds AI capabilities directly into its managed services, from vector search in
your database to AI assistants and tools that connect your own AI agents to your data.
Use the sections below to find the right starting point for your use case.

## Choose your path

<GridContainer columns={3}>
  <Card
    to="#build-ai-applications-with-your-data"
    iconComponent={AI}
    titleHighlight="#6F64FF"
    title="Build AI applications with your data"
    description="Store and query vector embeddings for search, retrieval, and RAG."
  />
  <Card
    to="#let-ai-optimize-and-explain-your-databases"
    iconComponent={AI}
    titleHighlight="#59D2F4"
    title="Let AI optimize and explain your databases"
    description="Get AI-generated query optimizations and natural language SQL help."
  />
  <Card
    to="#connect-your-ai-agents-and-tools-to-aiven"
    iconComponent={AI}
    titleHighlight="#FDCD12"
    title="Connect your AI agents and tools to Aiven"
    description="Give coding assistants and AI agents access to your Aiven services."
  />
</GridContainer>

## Build AI applications with your data

Store and query vector embeddings directly in the service you already run, without
adding a separate vector database to your stack.

| Service | AI capability | Best for | Get started |
| --- | --- | --- | --- |
| Aiven for PostgreSQL® | [pgvector](/docs/products/postgresql/concepts/pgvector) extension for vector storage and similarity search | Apps that need vector search alongside relational data | [Use pgvector](/docs/products/postgresql/howto/use-pgvector) |
| Aiven for ClickHouse® | Vector similarity index for approximate nearest-neighbor search | Large-scale analytical workloads needing fast similarity search | [Tune the vector similarity index cache](/docs/products/clickhouse/howto/vector-similarity-index-cache) |
| Aiven for OpenSearch® | k-NN plugin for vector search | Search-first workloads that combine full-text and vector search | [Supported plugins](/docs/products/opensearch/reference/plugins) |
| Aiven for Valkey™ | Valkey Search module for vector, full-text, and hybrid search | In-memory workloads needing low-latency vector search | [Valkey Search](/docs/products/valkey/reference/valkey-modules#valkey-search) |

## Let AI optimize and explain your databases

The AI database optimizer analyzes slow queries automatically, and PG Studio's AI
assistant turns natural language into SQL.

| Feature | What it does | Availability | Get started |
| --- | --- | --- | --- |
| AI database optimizer for PostgreSQL | Automatically identifies slow queries and suggests optimizations | GA | [Enable for PostgreSQL](/docs/products/postgresql/howto/ai-insights) |
| AI database optimizer for MySQL | Automatically identifies slow queries and suggests optimizations | GA | [Enable for MySQL](/docs/products/mysql/howto/ai-insights) |
| Standalone SQL query optimizer | Optimizes an ad-hoc query without a running service | <EarlyBadge/> | [Use the query optimizer](/docs/tools/query-optimizer) |
| PG Studio AI assistant | Generates and explains SQL from natural language | <EarlyBadge/> | [Use AI Assistant](/docs/products/postgresql/howto/pg-studio/use-ai-assistant) |

## Connect your AI agents and tools to Aiven

Give AI coding assistants and agents direct, controlled access to your Aiven services,
instead of copying commands between tools by hand.

| Tool | What it exposes | Availability | Get started |
| --- | --- | --- | --- |
| Aiven MCP server | Create and manage services, plans, metrics, logs, and configuration from Cursor, Claude Code, and other MCP clients | GA | [Set up Aiven MCP](/docs/tools/mcp-server) |
| Kafka setup with Skills | Create and configure a Kafka service, topics, ACLs, and Schema Registry from the command line | GA on Developer and Professional tiers | [Set up using Skills](/docs/products/kafka/howto/set-up-kafka-with-skills) |
| DataHub MCP server | Give AI agents natural language search, lineage tracking, and context-aware SQL generation over your data ecosystem | <LimitedBadge/> | [Use the DataHub MCP server](/docs/products/datahub/datahub-mcp-server) |

<RelatedPages/>

- [Get started with Aiven](/docs/get-started)
- [Aiven dev tools](/docs/tools)
- [Aiven for PostgreSQL®](/docs/products/postgresql)
- [Aiven for MySQL®](/docs/products/mysql)
