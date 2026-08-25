---
title: Use cases for Aiven for OpenSearch®
sidebar_label: Use cases
---

import RelatedPages from "@site/src/components/RelatedPages";

Explore the search, agentic AI, observability, and analytics workloads you can build on Aiven for OpenSearch®, and find the plugins and documentation for each.

Aiven for OpenSearch® supports four workload types: search, agentic AI, observability, and
analytics. A single Aiven for OpenSearch service can run all four workload types at the
same time.

OpenSearch does not require a schema before you index JSON documents, but every OpenSearch
index still has a schema. Dynamic mapping creates that schema from the first document
OpenSearch receives, and every later document must fit the field types dynamic mapping
inferred. For production indices, define an explicit mapping yourself.

Mappings are workload-specific, but the OpenSearch query engine is shared across
workloads. Search, agentic AI, observability, and analytics all resolve to two
operations: relevance-ranked queries and aggregations over the same indices. One Aiven for
OpenSearch service can therefore back both an application search feature and an incident
investigation.

## Workload types at a glance

| Workload type | What you build | Core capabilities |
|---|---|---|
| Search | Product catalogs, site and documentation search, knowledge bases, RAG retrieval layers | Full-text search, vector search, semantic search, hybrid search, relevance tuning |
| Agentic AI | Domain copilots and RAG chatbots, autonomous research and deep-research agents, root-cause analysis assistants | Agentic search, tool use through MCP and skills, agent memory, agent orchestration, agent patterns from single-shot Flow to Conversational to Plan-Execute-Reflect |
| Observability | Centralized log platforms, incident investigation, distributed tracing, security monitoring | Log integration, OpenSearch Dashboards, alerting, anomaly detection, index lifecycle management |
| Analytics | Faceted counts, top-N reports, time-series breakdowns, search analytics | Metric, bucket, and pipeline aggregations, SQL queries, asynchronous search |

## Search and RAG

Search workloads return the most relevant documents for a query. Search is the original
OpenSearch workload type.

### What you can build with search

- Ecommerce product catalogs with faceted filtering
- Documentation and website search
- RAG (Retrieval Augmented Generation) systems
- Support knowledge bases
- Internal document search across PDFs, Word files, and presentations

### Retrieval methods

Aiven for OpenSearch provides four retrieval methods. All four methods run against the
same index.

| Method | What it does | Implementation |
|---|---|---|
| Full-text search | Matches keywords and ranks results by term relevance | Apache Lucene® inverted indexes with BM25 scoring, analyzers, and tokenizers |
| Vector search | Finds documents whose embeddings are closest to the query embedding | `k-NN` plugin for approximate nearest neighbor search over dense vectors |
| Semantic search | Matches meaning rather than exact wording | Neural Search plugin, which generates embeddings inside the cluster |
| Hybrid search | Combines keyword and vector relevance in one ranked result set | `k-NN` and BM25 scores combined in a single query against the same index |

### Relevance tuning

Relevance tuning replaces guesswork about field boosts with evidence from how people use
your search. Two plugins support relevance tuning on Aiven for OpenSearch.

- **Learning to Rank** (2.19.5 and later, 3.3 and later) trains a ranking model on your own
  click and engagement data, then reorders results at query time. Apply the model as a
  rescore over the top N hits from a BM25 query to keep query cost bounded. Learning to
  Rank works on top of BM25, vector, and hybrid search.
- **User Behavior Insights** (3.6 and later) records the searches users run and what they
  do next. Queries go to the `ubi_queries` index, and subsequent clicks, views, and
  purchases go to `ubi_events`, linked by `query_id`. Use that data to measure which
  results people engage with and to build the judgment lists that train Learning to Rank
  models.

### Retrieval Augmented Generation

RAG (Retrieval Augmented Generation) grounds a language model in your own data. Your
application retrieves the passages relevant to a question, passes those passages to the
model as context, and the model answers from them instead of relying only on its training
data. OpenSearch handles the retrieval half of a RAG pipeline.

Reasons to build a RAG retrieval layer on Aiven for OpenSearch:

- **Current and private data without retraining**: Update the index and the next answer
  reflects the change. There is no fine-tuning cycle.
- **Answers you can trace**: Every retrieved passage is a document with an ID, so a
  response can cite a source you can check.
- **Access control that carries into the model**: With
  [OpenSearch Security management](/docs/products/opensearch/concepts/os-security) enabled,
  document-level and field-level security restrict what a query returns. A model never
  receives passages the requesting user cannot read.
- **One store for vectors, text, and filters**: Embeddings, original text, and structured
  metadata live in the same index. A single query performs vector similarity, keyword
  matching, and filtering by tenant, language, or date.
- **A gradual path**: Start with full-text retrieval, add vector search when relevance
  requires it, then combine both with hybrid queries.

A typical RAG pipeline on Aiven for OpenSearch works as follows:

1. Split source documents into passages, generate embeddings, and index each passage with
   its vector, original text, and metadata into a `k-NN` index.
1. At query time, run a vector, full-text, or hybrid query with filters applied.
1. Pass the top passages to your language model as context.
1. Return the generated answer with citations to the retrieved documents.

To let an agent plan the retrieval instead of writing the queries yourself, see the
following Agentic AI section.

## Agentic AI

Agentic workloads let a model decide what to retrieve and what to do next, rather than
running a query you wrote in advance. OpenSearch runs the agent itself: the ML Commons
plugin (`opensearch-ml`) hosts agents, tools, and memory in the cluster, exposed through a
REST API, so agent state lives next to the data the agent reasons over.

### What you can build with agents

- Natural-language search, where an agent turns a question into queries against your
  indices
- RAG chatbots that keep conversation context across turns and sessions
- Investigation and research assistants that plan multi-step work, such as root cause
  analysis over logs
- Assistants that remember user preferences and apply them to later requests
- Agent backends for external clients, including IDEs and chat interfaces

### Agentic search

Agentic search puts an agent in front of the query layer. Instead of writing query DSL,
you send a question, and the agent plans the retrieval, runs it, and returns results.
Agentic search became production-ready in OpenSearch 3.6, which added reranking of
agent-retrieved results, fallback queries when the first plan returns too little, and
access to agent memory during retrieval.

### Agent types

Choose an agent type by how much reasoning and state the task needs.

| Agent type | How it works | Use case example |
|---|---|---|
| Flow | Runs tools sequentially in the configured order. The workflow is fixed and no conversation history is kept, which makes it the fastest and most predictable option | RAG over a product catalog, where every question follows the same retrieve-then-answer path |
| Conversational | Reasons iteratively, using chain-of-thought to select the best tool from those configured, until it reaches an answer or hits the iteration limit. The workflow varies per question, and conversation history is stored | A documentation assistant that decides which index or tool to query for each question |
| Conversational v2 | Extends the conversational agent with built-in multimodal support. Accepts text, images, documents, and multi-turn message history through a standard interface with no custom connector setup, and returns token usage metrics. Requires unified registration and agent memory | A support assistant that answers questions about a screenshot the user uploaded, keeping earlier turns of the conversation in context |
| Plan-execute-reflect | Plans a multi-step workflow, executes it, and refines the plan as results arrive. Each step runs on a conversational agent that selects its own tool from the tool descriptions and context | Root cause analysis across service logs, or a multi-step research brief |
| AG-UI (Agent-User Interaction) | Follows the AG-UI protocol to connect the agent to a frontend application. Accepts context and tools from the frontend, so the agent can act on UI components and application state | An interactive dashboard where the agent drives panels and reads the current filter state |

### Agent memory

Agent memory is part of ML Commons and is available from OpenSearch 3.3. It is exposed
through a REST API, so it works with any agent framework, not only agents that run inside
OpenSearch.

Memory containers hold sessions, working memory for the current interaction, and long-term
memory extracted from it. Extraction strategies cover user preferences, semantic facts,
and summaries, and namespaces scope memory to keys such as a user ID. Embedding, indexing,
extraction, and retrieval all happen inside the cluster, so conversation state does not
need a second datastore.

### Tool use and skills

Agents act by calling tools: running a search, querying an index, or calling an external
API. The Skills plugin (`opensearch-skills`) ships tools for working with OpenSearch
itself, and ML Commons registers the tools an agent is allowed to use. You can install the
`aiven-setup` skill to
[streamline your OpenSearch development workflow](https://www.skills.sh/opensearch-project/opensearch-agent-skills/opensearch-skills).

OpenSearch Agent Skills, introduced in 3.6, extend this to external clients over MCP, so
an agent running in an IDE such as Claude Code, Codex, or Cursor can build search
applications and investigate logs against your cluster.

### Orchestration

The Flow Framework plugin (`opensearch-flow-framework`) provisions ML workflows from
templates, so connector, model, agent, and pipeline setup is configuration rather than a
sequence of API calls. OpenSearch 3.6 adds a unified registration API that collapses
connector, model, and agent setup into a single call.

## Observability

Observability workloads bring logs, traces, and metrics into one place so you can search
them, correlate them, and alert on them. Observability is the most common OpenSearch
workload type, because log data arrives in high volume, carries little fixed structure,
and is only useful if it stays queryable on demand. Centralizing observability data gives
you one place to detect a problem, identify the change that caused it, and confirm the
fix.

### What you can build with observability

- **Log monitoring and analytics**: Centralize application, platform, and audit logs from
  every source, then search all of them from one query bar instead of connecting to
  hosts individually.
- **Incident investigation**: Correlate a spike in application errors with a deployment
  event and an infrastructure change on one timeline, to find the root cause rather than
  the symptom.
- **Application and infrastructure monitoring**: Track error rates, latency, and resource
  use over time, and build dashboards for the services you own.
- **Security monitoring and threat detection**: Run detection rules against security log
  sources with the Security Analytics plugin, and alert on matches in real time.
- **Audit and compliance retention**: Keep audit logs searchable for a defined period,
  with retention enforced per index pattern.

### Collecting logs

Enable the [log integration](/docs/products/opensearch/howto/opensearch-log-integration)
to send service logs from Aiven services to daily indices on your Aiven for OpenSearch
service. Supported sources include Aiven for Apache Kafka®, Aiven for PostgreSQL®, and
Aiven for Grafana®. Configure the integration in the
[Aiven Console](https://console.aiven.io/), or with the Aiven API, CLI, Terraform
provider, or Operator for Kubernetes.

To collect logs from outside the Aiven platform, use one of the following methods:

- **Write to the service directly**: Send documents to your service endpoint over HTTPS as
  a service user, using a collector that writes to the OpenSearch bulk API, such as Fluent
  Bit, Fluentd, Logstash, or Vector.
- **Sink an Apache Kafka topic**: Use the OpenSearch sink connector, which requires Apache
  Kafka Connect enabled on an Aiven for Apache Kafka service, or a dedicated Aiven for
  Apache Kafka Connect service.

### Querying and visualizing logs

OpenSearch Dashboards supports query DSL and SQL. Plugins relevant to observability,
subject to version availability, include the following:

- **Trace Analytics** and **Observability** for logs and distributed traces.
- **Notebooks** combines queries, visualizations, and notes in one document, which is
  useful for recording an investigation.
- **Dashboards Reports** and **Scheduler for Dashboards Reports** deliver scheduled
  reports.

### Alerting and detection

Three plugins detect conditions in your data and notify you.

- The **Alerting** plugin triggers on query conditions and sends notifications to
  destinations such as Slack, PagerDuty, email, or a webhook. Configure the Alerting
  plugin with the OpenSearch API.
- The **Anomaly Detection** plugin models normal behavior for a metric and flags
  deviations. Anomaly detection covers conditions for which no static threshold is
  defined.
- The **Security Analytics** plugin provides detection rules for common security log
  sources.

### Managing log retention and cost

Log volume drives storage cost. Three mechanisms control how long indices live.

| Mechanism | Use it for |
|---|---|
| [Index retention patterns](/docs/products/opensearch/howto/set_index_retention_patterns) | Deleting old indices by glob pattern and `max_index_count` |
| Index Management (ISM) plugin | Automating rollover and index lifecycle transitions |
| [Hot/warm data tiering](/docs/products/opensearch/concepts/hot-warm-tiering) | Moving aging indices to warm nodes while keeping them queryable |

Index retention patterns and the log integration retention setting both apply, and the
smaller value takes effect. Use one method per index to avoid unexpected deletions.
[Hot/warm data tiering](/docs/products/opensearch/concepts/hot-warm-tiering) is available
on custom plans.

## Analytics

Analytics workloads summarize indexed data instead of retrieving individual documents.
Because aggregations run over the same indices that serve search, you can summarize data
within seconds of indexing it, without exporting it to a separate analytics system, and
visualize the results in OpenSearch Dashboards.

### What you can build with analytics

- Faceted search counts and filter sidebars
- Top-N reports over any indexed field
- Time-series breakdowns of user behavior
- Search analytics over your own query logs

[Aggregations](/docs/products/opensearch/concepts/aggregations) fall into three groups:

- **Metric aggregations** perform calculations over field values, such as minimum,
  maximum, average, and statistics.
- **Bucket aggregations** group documents into buckets by criteria. Bucket aggregations
  are how histograms and facets are built.
- **Pipeline aggregations** feed the result of one aggregation into another, for moving
  averages and cumulative sums.

Two plugins support analytical use:

- **OpenSearch SQL** accepts SQL in place of query DSL, which lets analysts and existing
  SQL-based tooling query your indices directly.
- **Asynchronous Search** runs long-running queries in the background and returns partial
  results as they become available. A heavy query therefore does not hold a connection
  open.

<RelatedPages/>

- [Get started with Aiven for OpenSearch®](/docs/products/opensearch/get-started)
- [Aggregations overview](/docs/products/opensearch/concepts/aggregations)
- [Plugins available with Aiven for OpenSearch®](/docs/products/opensearch/reference/plugins)
- [Enable the OpenSearch log integration](/docs/products/opensearch/howto/opensearch-log-integration)

<div class="trademark">

Apache Lucene is a registered trademark or trademark of the Apache
Software Foundation in the United States and/or other countries.

</div>
