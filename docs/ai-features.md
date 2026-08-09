---
title: AI tools and features on Aiven
sidebar_label: Overview
description: Find AI-powered tools and features across Aiven services, from vector search and embeddings to AI assistants and agent integrations.
---

import Card from "@site/src/components/Card";
import GridContainer from "@site/src/components/GridContainer";
import RelatedPages from "@site/src/components/RelatedPages";
import AI from "@site/static/images/logos/star-ai.svg";

Aiven builds AI capabilities directly into its managed services, from vector search to AI assistants.
It also provides tools that connect your own AI agents to your data. Use the
following sections to find the right starting point for your use case.

## Choose your path

<GridContainer columns={3}>
  <Card
    to="#connect-ai-agents-and-tools-to-aiven"
    iconComponent={AI}
    titleHighlight="#FDCD12"
    title="Connect AI agents and tools to Aiven"
    description="Give coding assistants and AI agents access to your Aiven services."
  />
  <Card
    to="#build-ai-applications-with-data"
    iconComponent={AI}
    titleHighlight="#6F64FF"
    title="Build AI applications with data"
    description="Store and query vector embeddings for search, retrieval, and RAG."
  />
  <Card
    to="#optimize-and-explain-databases-with-ai"
    iconComponent={AI}
    titleHighlight="#59D2F4"
    title="Optimize and explain databases with AI"
    description="Get AI-generated query optimizations and natural language SQL help."
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

## Build AI applications with data

Store and query vector embeddings directly in the service you already run, without
adding a separate vector database to your stack.

| Service | AI capability | Best for | Get started |
| --- | --- | --- | --- |
| Aiven for PostgreSQL® | [pgvector](/docs/products/postgresql/concepts/pgvector) extension for vector storage and similarity search | Apps that need vector search alongside relational data | [Use pgvector](/docs/products/postgresql/howto/use-pgvector) |
| Aiven for ClickHouse® | Vector similarity index for approximate nearest-neighbor search | Large-scale analytical workloads needing fast similarity search | [Tune the vector similarity index cache](/docs/products/clickhouse/howto/vector-similarity-index-cache) |
| Aiven for OpenSearch® | k-NN plugin for vector search | Search-first workloads that combine full-text and vector search | [Supported plugins](/docs/products/opensearch/reference/plugins) |
| Aiven for Valkey™ | Valkey Search module for vector, full-text, and hybrid search | In-memory workloads needing low-latency vector search | [Valkey Search](/docs/products/valkey/reference/valkey-modules#valkey-search) |

## Optimize and explain databases with AI

The AI database optimizer analyzes slow queries automatically, and PG Studio's AI
assistant turns natural language into SQL.

| Feature | What it does | Get started |
| --- | --- | --- |
| AI database optimizer for PostgreSQL | Automatically identifies slow queries and suggests optimizations | [Enable for PostgreSQL](/docs/products/postgresql/howto/ai-insights) |
| AI database optimizer for MySQL® | Automatically identifies slow queries and suggests optimizations | [Enable for MySQL](/docs/products/mysql/howto/ai-insights) |
| Standalone SQL query optimizer | Optimizes an ad-hoc query without a running service | [Use the query optimizer](/docs/tools/query-optimizer) |
| PG Studio AI assistant | Generates and explains SQL from natural language | [Use AI Assistant](/docs/products/postgresql/howto/pg-studio/use-ai-assistant) |

<RelatedPages/>

- [Get started with Aiven](/docs/get-started)
- [Aiven dev tools](/docs/tools)
