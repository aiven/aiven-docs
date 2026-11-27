---
title: Aiven MCP tools
sidebar_label: Available tools
description: >-
  Reference for the tools available in Aiven MCP, organized by service scope.
---

The tools available to your AI assistant depend on your [service scopes](/docs/tools/mcp-server#limit-tool-access), [read-only mode](/docs/tools/mcp-server#read-only-mode), and server configuration.
Your Aiven user permissions determine which operations you can perform.

## Core

The `core` scope is always included. It provides tools for managing Aiven
projects, services, plans, metrics, and logs.
For more information, see
[Limit tool access](/docs/tools/mcp-server#limit-tool-access).

| Tool | Description |
| --- | --- |
| `aiven_project_list` | List projects |
| `aiven_project_get` | Get project details |
| `aiven_list_project_clouds` | List cloud platforms for a project |
| `aiven_project_vpc_list` | List VPCs for a project |
| `aiven_service_list` | List or search services |
| `aiven_service_type_plans` | List plans and cloud availability |
| `aiven_service_type_get` | Get engine versions for a service type |
| `aiven_service_plan_pricing` | Get pricing for a plan in a cloud |
| `aiven_service_create` | Create a service |
| `aiven_service_get` | Get service information |
| `aiven_service_update` | Update a service plan, configuration, or power state |
| `aiven_service_metrics_fetch` | Fetch metrics for a managed data service |
| `aiven_service_application_metrics_get` | Fetch metrics for an application service |
| `aiven_project_get_service_logs` | Get service log entries |
| `aiven_service_query_activity` | Fetch current queries for a service |
| `aiven_project_get_event_logs` | Get project event log entries |

## PostgreSQL

These tools are available with the `pg` or `all` scope.

| Tool | Description |
| --- | --- |
| `aiven_pg_service_available_extensions` | List available extensions |
| `aiven_pg_service_query_statistics` | Fetch query statistics |
| `aiven_pg_bouncer_create` | Create a PgBouncer connection pool |
| `aiven_pg_bouncer_update` | Update a PgBouncer connection pool |
| `aiven_pg_bouncer_delete` | Delete a PgBouncer connection pool |
| `aiven_pg_read` | Run a read-only SQL query |
| `aiven_pg_write` | Run one supported SQL write statement |
| `aiven_pg_optimize_query` | Suggest query and index changes |

## Kafka

These tools are available with the `kafka` or `all` scope.

| Tool | Description |
| --- | --- |
| `aiven_kafka_topic_list` | List Kafka topics |
| `aiven_kafka_topic_create` | Create a Kafka topic |
| `aiven_kafka_topic_get` | Get Kafka topic information |
| `aiven_kafka_topic_update` | Update a Kafka topic |
| `aiven_kafka_topic_delete` | Delete a Kafka topic |
| `aiven_kafka_topic_message_list` | Read messages from a Kafka topic |
| `aiven_kafka_topic_message_produce` | Produce messages to a Kafka topic |
| `aiven_kafka_connect_available_connectors` | List available connector types |
| `aiven_kafka_connect_list` | List configured connectors |
| `aiven_kafka_connect_create_connector` | Create a connector |
| `aiven_kafka_connect_edit_connector` | Edit a connector |
| `aiven_kafka_connect_get_connector_status` | Get connector status |
| `aiven_kafka_connect_pause_connector` | Pause a connector |
| `aiven_kafka_connect_resume_connector` | Resume a connector |
| `aiven_kafka_connect_restart_connector` | Restart a connector |
| `aiven_kafka_connect_delete_connector` | Delete a connector |
| `aiven_kafka_schema_registry_subjects` | List Schema Registry subjects |
| `aiven_kafka_schema_registry_subject_version_get` | Get a Schema Registry subject version |

## Applications

These tools are available with the `application` or `all` scope.

| Tool | Description |
| --- | --- |
| `aiven_application_create` | Create and deploy an application |
| `aiven_application_redeploy` | Rebuild an application from its repository |
| `aiven_application_custom_domain_verify` | Check the CNAME record of a custom domain |
| `aiven_vcs_integration_initialize` | Start connecting a GitHub account |
| `aiven_vcs_integration_list` | List connected GitHub accounts |
| `aiven_vcs_integration_repository_list` | List repositories for a GitHub account |
| `aiven_vcs_integration_repository_branch_list` | List repository branches |
| `aiven_vcs_integration_repository_container_manifest_files_list` | Find Containerfile, Dockerfile, and Compose files |
| `aiven_vcs_integration_repository_scan_container_manifest` | Derive service settings from a container manifest |

## Integrations

These tools are available with the `integrations` or `all` scope.

| Tool | Description |
| --- | --- |
| `aiven_service_integration_list` | List integrations for a service |
| `aiven_service_integration_create` | Create a service integration |
| `aiven_service_integration_get` | Get a service integration |
| `aiven_service_integration_update` | Update a service integration |
| `aiven_service_integration_delete` | Delete a service integration |
| `aiven_integration_types_list` | List integration types for a project |
| `aiven_integration_endpoint_types_list` | List external integration endpoint types |

## OpenSearch

The `opensearch` scope includes only the `core` tools. Aiven MCP does not
provide OpenSearch-specific data tools.

## Context

These tools are available with the `context` or `all` scope. Aiven Context is
in early availability, and your organization must have it enabled.
For more information, see
[Limit tool access](/docs/tools/mcp-server#limit-tool-access).

| Tool | Description |
| --- | --- |
| `aiven_context_search_assets` | Search assets in the Aiven Context catalog |
| `aiven_context_get_lineage` | Trace upstream and downstream relationships |
| `aiven_context_update_tags` | Add or remove tags on an asset |
| `aiven_context_update_description` | Set or clear an asset description |

## Documentation

This tool is available only on the hosted server.

| Tool | Description |
| --- | --- |
| `aiven_docs_search` | Search the Aiven documentation |

## Connection credentials

This tool is available when you enable **Allow connection credentials**.
Set `allow_secrets=true` for the hosted server or `AIVEN_ALLOW_SECRETS=true`
for a local installation.
It does not run in read-only mode.

| Tool | Description |
| --- | --- |
| `aiven_service_connection_info` | Get connection details for a PostgreSQL or Kafka service |

The tool returns `service_uri` and `ca_cert`. For PostgreSQL, it also returns
`service_uri_params`, which contains the host, port, user, password, and
database name. For Kafka, it also returns `users`, which contains SASL
passwords or mTLS certificates and keys.

For more information, see
[Security and responsibility](/docs/tools/mcp-server#security-and-responsibility).

