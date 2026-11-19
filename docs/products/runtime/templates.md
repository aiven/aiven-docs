---
title: Use a template to deploy a Runtime application
sidebar_label: Use a template
---

import Card from "@site/src/components/Card";
import GridContainer from "@site/src/components/GridContainer";

Use an Aiven Runtime template to explore different use cases and get started creating your own apps.

<GridContainer>
    <Card
        to="https://github.com/Aiven-Labs/aiven-runtime-n8n"
        title="n8n"
        description="Minimal deployment of n8n and the traefik web apps on Aiven Labs."
    />
    <Card
        to="https://github.com/Aiven-Labs/aiven-runtime-litellm"
        title="LiteLLM"
        description="An AI gateway and admin UI backed by Aiven PostgreSQL and Valkey."
    />
    <Card
        to="https://github.com/Aiven-Labs/aiven-runtime-metabase"
        title="Metabase"
        description="Self-hosted Metabase with Aiven PostgreSQL for persistent application data. Explore the built-in Sample Database or connect your own data sources to build dashboards."
    />
    <Card
        to="https://github.com/Aiven-Labs/aiven-runtime-streamlit"
        title="Streamlit"
        description="A generic Streamlit app with sample charts, filters, a searchable table and CSV export. Integrate with Aiven for PostgreSQL to build with your own data."
    />
    <Card
        to="https://github.com/Aiven-Labs/aiven-runtime-langgraph"
        title="LangGraph"
        description="A Python/FastAPI app using the open-source LangGraph library, with a draft-and-review workflow, browser UI, and authenticated API. Aiven for PostgreSQL saves workflow state."
    />
    <Card
        to="https://github.com/Aiven-Labs/preparing-data-for-opensearch-and-rag"
        title="RAG and OpenSearch"
        description="A FastAPI service that chunks, embeds, and indexes uploaded text/PDF documents into Aiven for OpenSearch for RAG, with local dev support via OpenSearch and RustFS (S3-compatible storage) in docker-compose."
    />
    <Card
        to="https://github.com/Aiven-Labs/aiven-runtime-langfuse"
        title="Langfuse"
        description="LLM observability with the Langfuse web UI and worker, and Aiven for PostgreSQL, ClickHouse and Valkey services, plus an external S3-compatible bucket. A demo starter for fresh Langfuse v4 installations; tested with Cloudflare R2."
    />
    <Card
        to="https://github.com/Aiven-Labs/fastmcp-caddy-proxy"
        title="MCP and proxy"
        description="A FastMCP Implementation with a Caddy proxy in front of it."
    />
    <Card
        to="https://github.com/Aiven-Labs/aiven-runtime-temporal"
        title="Temporal"
        description="Self-hosted Temporal server, web UI, and an example worker, backed by Aiven for PostgreSQL."
    />
    <Card
        to="https://github.com/Aiven-Labs/aiven-runtime-airflow"
        title="Airflow"
        description="Run Airflow on Aiven."
    />
    <Card
        to="https://github.com/Aiven-Labs/aiven-runtime-hasura"
        title="Hasura"
        description="Hasura GraphQL Engine Community Edition v2 and its console, backed by Aiven for PostgreSQL. Expose tables through GraphQL queries, mutations, and subscriptions."
    />
    <Card
        to="https://github.com/kjaymiller/umami/tree/aiven-runtime"
        title="Umami"
        description="Umami is a privacy-first analytics platform. Traffic, campaigns, behavior, conversions, and revenue in one place — no cookies, no surveillance, self-hosted or in the cloud."
    />
    <Card
        to="https://github.com/kjaymiller/fastAPI-db-cache-template"
        title="FastAPI app with a PostgreSQL database and Valkey cache"
        description="FastAPI app with a PostgreSQL database and a Valkey cache."
    />
    <Card
        to="https://github.com/Aiven-Labs/app-multimodal-search-CLIP-PostgreSQL"
        title="Search for images using CLIP, PostgreSQL® and pgvector"
        description="Uses the OpenAI CLIP model to generate embeddings for images, and stores them in PostgreSQL with pgvector. A web app lets users search using text, and an SQL query is used to find the four images with the closest embedding to the text."
    />
    <Card
        to="https://github.com/Aiven-Labs/jaeger-aiven-apps"
        title="Jaeger all-in-one"
        description="Run Jaeger on Aiven."
    />
    <Card
        to="https://github.com/Aiven-Labs/inventory-demo-react-pg-valkey"
        title="Product inventory using React, Go, PostgreSQL, and Valkey"
        description="A product inventory demo, showcasing multiple services communicating, with a Node.js web backend, a React frontend, a PostgreSQL database, a Valkey cache, a Valkey queue, and a Go-based background job service."
    />
    <Card
        to="https://github.com/Aiven-Labs/anomaly-detection-example"
        title="Anomaly detection with Apache Kafka® Streams"
        description="checks for Apache Avro® messages containing a field outside specified minimum and maximum values, and copies them to the output topic. A program is provided to write an example data stream."
    />
    <Card
        to="https://github.com/Aiven-Labs/kafka-streams-example"
        title="Apache Kafka® Streams"
        description="Kafka Streams is the standard library to use when taking data from one Kafka topic and writing an amended version to another, in real time. This template has examples of logging, copying, and filtering Apache Avro® messages using Streams and a schema registry."
    />
    <Card
        to="https://github.com/notanotherpizza/meetup-map"
        title="Community event search"
        description="Searches and maps community events across Meetup and Luma, with filters for location, topic, and group size. Uses Aiven for PostgreSQL and Kafka services. "
    />
    <Card
        to="https://github.com/BetterDB-inc/monitor/tree/aiven-runtime"
        title="BetterDB Monitor"
        description="A monitoring and observability layer for Valkey and Redis that persists slowlogs, command patterns, client activity and anomaly signals so you can debug what happened."
    />
    <Card
        to="https://github.com/aiven-labs/runs-on-runtime"
        title="Runs on Runtime"
        description="A static site running python/nginx listing repos that run on Aiven Runtime. Live at https://templates.aiven.io."
    />
    <Card
        to="https://github.com/aiven-labs/valkey-admin-aiven-apps"
        title="Valkey Admin"
        description="Sample Dockerfile/Compose setup to deploy Valkey Admin on Aiven Runtime, pointed at an Aiven for Valkey service."
    />
    <Card
        to="https://github.com/aiven-labs/aiven-runtime-pgadmin"
        title="PostgreSQL admin dashboard"
        description="Admin dashboard for PostgreSQL instances."
    />
    <Card
        to="https://github.com/Aiven-Labs/keycloak-template-aiven-runtime"
        title="Keycloak"
        description="Ready-to-deploy Keycloak and PostgreSQL 18 template."
    />
    <Card
        to="https://github.com/pvr-aiven/aiven-kafbat-ui-runtime"
        title="Kafbat UI"
        description="Deploy Kafbat UI in front of Kafka clusters."
    />
    <Card
        to="https://github.com/Aiven-Labs/spacetimedb-aiven-runtime"
        title="SpacetimeDB"
        description="Builds your TypeScript module into a ready-to-publish game/realtime server."
    />
    <Card
        to="https://github.com/Aiven-Labs/duckdb2-runtime"
        title="DuckDB 2.0"
        description="Deploy a Quack Server for DuckDB2 on Aiven Runtime."
    />
</GridContainer>
