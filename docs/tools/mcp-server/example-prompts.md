---
title: Example prompts for Aiven MCP
sidebar_label: Example prompts
description: >-
  Use Aiven MCP to create and manage PostgreSQL and Apache Kafka services,
  work with data, deploy applications, manage integrations, and troubleshoot services.
---

Use these prompts with your AI assistant to provision and manage Aiven services, work with PostgreSQL and Apache Kafka data, deploy applications, and troubleshoot services.

Before you begin, [connect to Aiven MCP](/docs/tools/mcp-server#configure-aiven-mcp).
Some tasks require specific service scopes or write access.
For more information, see [Limit tool access](/docs/tools/mcp-server#limit-tool-access)
and [Read-only mode](/docs/tools/mcp-server#read-only-mode).

If your assistant cannot identify a service, specify the project name.
Use non-sensitive test data for examples that return database rows or Kafka messages.

## Create and manage services

### List your projects

```text
List my Aiven projects.
```

This lists the projects you can access and checks that the connection works.

### Inspect a service

```text
Show me the status and configuration of my Aiven service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the name of an existing service.

### Compare plans and pricing

```text
Compare the available Aiven for PostgreSQL plans in REGION.
Show the resources and pricing for each plan.
```

Replace `REGION` with the cloud region.

The assistant uses `aiven_service_type_plans` and `aiven_service_plan_pricing`.

### Create a PostgreSQL service

```text
Create an Aiven for PostgreSQL service on the Free plan.
If the Free plan is unavailable, show the available plans and pricing.
Ask for confirmation before creating the service.
```

The assistant uses `aiven_service_create`.
This task requires write access. In read-only mode,
[allow the `aiven_service_create` tool](/docs/tools/mcp-server#restrict-write-operations).

### Create a Kafka service

```text
Show the available Aiven for Apache Kafka plans and pricing in REGION.
Recommend a plan for a development workload.
Ask for confirmation, then create the service with the selected plan.
```

Replace `REGION` with the cloud region.

The assistant uses `aiven_service_create`.
This task requires write access. In read-only mode,
[allow the `aiven_service_create` tool](/docs/tools/mcp-server#restrict-write-operations).

### Show connection settings

```text
Show the connection settings for my Aiven for PostgreSQL
or Aiven for Apache Kafka service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the name of a running service.
Use a development service that does not contain sensitive data.

The assistant uses `aiven_service_connection_info`. This tool requires
**Allow connection credentials** and does not run in read-only mode.
For more information, see
[Security and responsibility](/docs/tools/mcp-server#security-and-responsibility).

## Work with PostgreSQL

PostgreSQL queries use the `defaultdb` database unless you specify another database.

### List tables

```text
List the tables in the public schema of my Aiven for PostgreSQL
service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the PostgreSQL service name.

The assistant uses `aiven_pg_read`.
This task requires the `pg` or `all` scope.

### Query data

```text
Show up to 10 rows from TABLE_NAME in my Aiven for PostgreSQL
service SERVICE_NAME. Use a read-only SQL query.
```

Replace the following:

- `SERVICE_NAME`: the PostgreSQL service name
- `TABLE_NAME`: an existing table name

The assistant uses `aiven_pg_read`.
This task requires the `pg` or `all` scope.

### Create a table

```text
Create a table named orders with an ID, customer name, order date,
and total amount in my Aiven for PostgreSQL service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the PostgreSQL service name.

The assistant uses `aiven_pg_write`.
Use a development database. This task requires the `pg` or `all` scope
and write access.

### Find slow queries

```text
Inspect query statistics for my Aiven for PostgreSQL service SERVICE_NAME.
Identify queries with the highest total execution time and mean execution time.
Suggest query or index changes without applying them.
```

Replace `SERVICE_NAME` with the PostgreSQL service name.

The assistant uses `aiven_pg_service_query_statistics`.
This task requires the `pg` or `all` scope.

## Work with Apache Kafka

### List topics

```text
List the topics in my Aiven for Apache Kafka service SERVICE_NAME.
Show the partition count and retention for each topic.
```

Replace `SERVICE_NAME` with the Kafka service name.

The assistant uses `aiven_kafka_topic_list`.
This task requires the `kafka` or `all` scope.

### Create a topic

```text
Create a topic named TOPIC_NAME with 3 partitions and 7 days
retention in my Aiven for Apache Kafka service SERVICE_NAME.
```

Replace the following:

- `SERVICE_NAME`: the Kafka service name
- `TOPIC_NAME`: the topic name

The assistant uses `aiven_kafka_topic_create`.
This task requires the `kafka` or `all` scope and write access.

### Inspect a topic

```text
Show the configuration and partition offsets of the TOPIC_NAME topic
in my Aiven for Apache Kafka service SERVICE_NAME.
```

Replace the following:

- `SERVICE_NAME`: the Kafka service name
- `TOPIC_NAME`: an existing topic name

The assistant uses `aiven_kafka_topic_get`.
This task requires the `kafka` or `all` scope.

### Read messages

```text
Show me up to 10 of the latest available messages from the TOPIC_NAME topic
in my Aiven for Apache Kafka service SERVICE_NAME.
```

Replace the following:

- `SERVICE_NAME`: the Kafka service name
- `TOPIC_NAME`: an existing topic name

The assistant uses `aiven_kafka_topic_message_list`.
This task requires the `kafka` or `all` scope.

### Inspect schemas

```text
List the Schema Registry subjects in my Aiven for Apache Kafka
service SERVICE_NAME and show the latest schema version for each subject.
```

Replace `SERVICE_NAME` with the Kafka service name.

The assistant uses `aiven_kafka_schema_registry_subjects` and
`aiven_kafka_schema_registry_subject_version_get`.
This task requires the `kafka` or `all` scope.

### Check connector status

```text
List the Kafka Connect connectors in my Aiven for Apache Kafka
service SERVICE_NAME and show the status of each connector.
```

Replace `SERVICE_NAME` with the Kafka service name.

The assistant uses `aiven_kafka_connect_list` and
`aiven_kafka_connect_get_connector_status`.
This task requires the `kafka` or `all` scope.

## Deploy applications

### Deploy an application with a PostgreSQL database

```text
Deploy the application from the GitHub repository REPOSITORY_URL to Aiven Runtime
and connect it to a new Aiven for PostgreSQL service.
Show the available plans and pricing in REGION.
Ask for confirmation before creating anything.
```

Replace the following:

- `REPOSITORY_URL`: the GitHub repository URL
- `REGION`: the cloud region

The assistant uses `aiven_service_create` to create the PostgreSQL service,
then `aiven_application_create` to deploy the application.
The assistant chooses the environment variable name, such as `DATABASE_URL`,
based on your application code. Aiven passes the database connection details
to the application through that variable, so you don't need to enter them.

This task requires write access and the `application` or `all` scope.

Before you begin, [connect your GitHub account](/docs/products/runtime/connect-github-account).
Connecting is recommended for every repository and required for private
repositories. The repository needs a Compose file, Containerfile, or Dockerfile.

For more information, see
[Deploy an application](/docs/products/runtime/deploy-apps),
[Manifest files for Aiven Runtime](/docs/products/runtime/manifest-files/manifests),
[Connect services to Aiven Runtime](/docs/products/runtime/connect-services-to-apps),
and [Applications tools](/docs/tools/mcp-server/available-tools#applications).

## Manage service integrations

### List integrations

```text
List the integrations for my service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the service name.

The assistant uses `aiven_service_integration_list`.
This task requires the `integrations` or `all` scope.

## Discover data assets and lineage

### Search assets and trace lineage

```text
Search for data assets related to orders in my Aiven organization
and show their lineage.
```

This task requires the `context` or `all` scope and access to Aiven Context.

## Monitor and troubleshoot services

### Review service logs

```text
Show recent log entries for my service SERVICE_NAME
and summarize any errors.
```

Replace `SERVICE_NAME` with the service name.

The assistant uses `aiven_project_get_service_logs`.

### Check service health

```text
Give me a health summary of every service in my Aiven project: state, plan,
maintenance updates pending, and any nodes that are not running.
```
