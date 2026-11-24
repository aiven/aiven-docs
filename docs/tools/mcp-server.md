---
title: Aiven MCP server
sidebar_label: Aiven MCP
description: >-
  Create and manage Aiven for PostgreSQL, Aiven for Apache Kafka,
  and other Aiven services. Work with PostgreSQL and Kafka data,
  and deploy applications to Aiven Runtime.
keywords: [MCP, Model Context Protocol, MCP server, PostgreSQL MCP server, Postgres MCP server, Kafka MCP server, OpenSearch MCP server, AI assistants, Cursor, Claude Code, Claude Desktop, VS Code, Gemini CLI]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";
import {mcpUrl} from '@site/src/components/mcpAivenLiveConstants';
import MCPConfigSection from "@site/src/components/MCPConfigSection";
import CursorConfigTab from "@site/src/components/CursorConfigTab";
import McpClientTabLabel from "@site/src/components/McpClientTabLabel";
import ClaudeCodeIcon from "@site/static/images/icons/claude-code.svg";
import CursorIcon from "@site/static/images/icons/cursor.svg";
import ClaudeDesktopIcon from "@site/static/images/icons/claude-desktop.svg";
import VSCodeIcon from "@site/static/images/icons/vscode.svg";
import GeminiCliIcon from "@site/static/images/icons/gemini-cli.svg";
import OtherClientIcon from "@site/static/images/icons/mcp-client-other.svg";
import LocalInstallIcon from "@site/static/images/icons/local-install.svg";

Aiven MCP is a Model Context Protocol (MCP) server.

It connects AI assistants to the Aiven Platform.
Use it to create and manage Aiven for PostgreSQL®, Aiven for Apache Kafka®,
and other Aiven services.
Work with your data, troubleshoot services, and deploy applications to
Aiven Runtime.

To start, create an [Aiven account](https://console.aiven.io/signup?campaign=mcp),
then see [Install Aiven MCP](#configure-aiven-mcp). To control which
operations your assistant can perform, use [read-only mode](#read-only-mode) and
[service scopes](#limit-tool-access).

## What Aiven MCP can do

After you connect an AI assistant to Aiven MCP, you can perform the following
tasks.

- **Create and manage services**: Create and configure
  [Aiven for PostgreSQL](/docs/products/postgresql),
  [Aiven for Apache Kafka](/docs/products/kafka),
  [Aiven for OpenSearch®](/docs/products/opensearch), and other Aiven services.
  Compare plans and pricing. Aiven MCP does not provide
  OpenSearch-specific query tools.
- **View resources**: List projects, services, and integrations, and check the
  status, plan, and cloud region of a service.
- **Work with PostgreSQL**: Run read-only SQL queries and supported write
  operations, analyze query performance, manage connection pools, and list
  available extensions, such as
  [pgvector](/docs/products/postgresql/concepts/pgvector).
- **Work with Apache Kafka**: Create and manage topics, produce and read
  messages, inspect schemas, and manage Kafka Connect connectors.
- **Deploy applications**: Deploy and redeploy applications to
  [Aiven Runtime](/docs/products/runtime).
- **Manage service integrations**: Create, update, and delete integrations
  between services.
- **Monitor and troubleshoot services**: Review metrics, logs, query activity,
  and configuration.
- **Discover data assets and lineage**: Search tables, topics, and schemas,
  and explore lineage with Aiven Context. Updating descriptions and tags
  requires write access.
- **Search the Aiven documentation**: Ask a question about Aiven products
  and features. The hosted MCP server provides this tool.

### PostgreSQL data access

Aiven MCP provides the following tools for running SQL statements
on Aiven for PostgreSQL databases:

- `aiven_pg_read`: Runs read-only statements, such as `SELECT`
  and `EXPLAIN`.
- `aiven_pg_write`: Runs one supported write statement at a time,
  such as `INSERT` or `CREATE TABLE`. It rejects `DROP`, `TRUNCATE`,
  `GRANT`, and `REVOKE`.

These tools work with Aiven for PostgreSQL databases only.

The available operations depend on your permissions,
[read-only mode](#read-only-mode), and
[service scopes](#limit-tool-access).

## Prerequisites

- An [Aiven account](https://console.aiven.io/signup?campaign=mcp). Aiven MCP is
  included with your account at no extra cost.
- An MCP-compatible client, such as Cursor, Claude Code, Claude Desktop,
  VS Code, or Gemini CLI.
- MCP connections enabled for your organization. If you created your Aiven
  account, you're the organization admin and can enable them in the Aiven
  Console: click **Admin** > <ConsoleLabel name="authenticationpolicy"/> >
  **Allow MCP connections**. Otherwise, ask your organization admin to enable
  them.

Hosted MCP connections use OAuth 2.0 with PKCE. When you authenticate a client for the
first time, your browser opens so you can sign in and authorize MCP access. This
is usually a one-time setup step per client.

:::note Note
Aiven owns the `aiven.live` domain and operates the hosted MCP server at
`mcp.aiven.live`. The server uses the Aiven API at `api.aiven.io` for
authorization.
:::

:::important Important
MCP tools can create, modify, and delete resources and data.
Review each action before it runs.

For production services, use [read-only mode](#read-only-mode).
For more information, see
[Security and responsibility](#security-and-responsibility).
:::

## Install Aiven MCP {#configure-aiven-mcp}

<Tabs>
<TabItem value="claude-code" label={<McpClientTabLabel icon={ClaudeCodeIcon} label="Claude Code" />} default>

1. Open a terminal.
1. Choose your options, then run the generated command:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="bash"
     configTemplate={(url) => `claude mcp add --transport http aiven "${url}"`}
   />

1. Run `claude` to start Claude Code.
1. Run `/mcp`, select **aiven**, and authenticate in your browser when prompted.
1. Test the connection with a prompt such as `List my Aiven projects.` and
   approve the tool execution if prompted.

For more information, see the [Claude Code MCP documentation](https://code.claude.com/docs/en/mcp).

</TabItem>
<TabItem value="cursor" label={<McpClientTabLabel icon={CursorIcon} label="Cursor" />}>

<CursorConfigTab baseUrl={mcpUrl} />

In Cursor Chat (**Cmd+L** / **Ctrl+L**), test the connection with a prompt such
as `List my Aiven projects.` and click **Allow** if prompted.

For more information, see the [Cursor MCP documentation](https://cursor.com/docs/mcp).

</TabItem>
<TabItem value="claude-desktop" label={<McpClientTabLabel icon={ClaudeDesktopIcon} label="Claude Desktop" />}>

1. Open the Claude Desktop configuration file. If it does not exist, create it:

   - **macOS:**
     `~/Library/Application Support/Claude/claude_desktop_config.json`

   - **Windows:**
     `%APPDATA%\Claude\claude_desktop_config.json`

1. Choose your options, then add the generated configuration to the file:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="json"
     configTemplate={(url) => ({mcpServers: {aiven: {command: "npx", args: ["-y", "mcp-remote", url]}}})}
   />

1. Save the file.
1. Restart Claude Desktop.
1. In a new conversation, test the connection with a prompt such as
   `List my Aiven projects.` and click **Allow** if prompted.

For more information, see the [Claude Desktop MCP documentation](https://modelcontextprotocol.io/docs/develop/connect-local-servers).

</TabItem>
<TabItem value="vscode" label={<McpClientTabLabel icon={VSCodeIcon} label="VS Code" />}>

:::note
Requires VS Code 1.102 or later with the GitHub Copilot extension installed
and enabled.
:::

1. Open your workspace in VS Code.
1. In the workspace root, create a `.vscode` directory.
1. In the `.vscode` directory, create or edit the `mcp.json` file.
1. Choose your options, then add the generated configuration to the file:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="json"
     configTemplate={(url) => ({servers: {aiven: {type: "http", url}}})}
   />

1. Save the file.
1. Reload VS Code.
1. Open the Command Palette, run **MCP: List Servers**, and confirm that
   **aiven** appears.
1. In Copilot Chat, test the connection with a prompt such as
   `List my Aiven projects.` and click **Allow** if prompted.

For more information, see the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).

</TabItem>
<TabItem value="gemini-cli" label={<McpClientTabLabel icon={GeminiCliIcon} label="Gemini CLI" />}>

1. Create or edit the `~/.gemini/settings.json` file.
1. Choose your options, then add the generated configuration to the file:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="json"
     configTemplate={(url) => ({mcpServers: {aiven: {httpUrl: url}}})}
   />

1. Save the file.
1. Run `gemini` to start the CLI.
1. Run `/mcp auth aiven` to sign in through your browser.
1. Test the connection with a prompt such as `List my Aiven projects.` and
   approve the tool execution if prompted.

</TabItem>
<TabItem value="other" label={<McpClientTabLabel icon={OtherClientIcon} label="Other clients" />}>

1. Open your MCP client configuration.
1. Choose your options, then add the generated configuration to your client:

   <MCPConfigSection
     baseUrl={mcpUrl}
     format="json"
     configTemplate={(url) => ({mcpServers: {aiven: {url, oauth: {oauthScopes: ["projects", "services", "accounts:read"]}}}})}
   />

   Most clients use a configuration similar to the preceding example.

1. Save the file and restart your client.
1. In your AI assistant, test the connection with a prompt such as
   `List my Aiven projects.` and approve the tool execution if prompted.

Some clients require a transport type, such as `"type": "http"`. If the configuration
fails, see your client documentation.

</TabItem>
<TabItem value="local" label={<McpClientTabLabel icon={LocalInstallIcon} label="Local installation" />}>

Use a local installation if you cannot use OAuth, for example in headless
environments. The permissions of your API token apply.

Run the Aiven MCP server locally with `npx` instead of using the hosted server.
You need an [Aiven API token](/docs/platform/howto/create_authentication_token)
to authenticate requests to Aiven. Set `AIVEN_READ_ONLY="true"` to enable
read-only mode.

Set `AIVEN_ALLOW_SECRETS="true"` to let the AI agent access PostgreSQL and Kafka
connection credentials. Use this option only in development environments for
non-production services. For more information, see
[Security and responsibility](#security-and-responsibility).

<Tabs>
<TabItem value="claude-code" label={<McpClientTabLabel icon={ClaudeCodeIcon} label="Claude Code" />} default>

1. Open a terminal.
1. Run the following command, replacing `API_TOKEN` with your Aiven API token:

   ```bash
   claude mcp add --scope user aiven-mcp -e AIVEN_TOKEN=API_TOKEN -e AIVEN_READ_ONLY=false -e AIVEN_ALLOW_SECRETS=false -- npx -y mcp-aiven
   ```

1. Run `claude` to start Claude Code.
1. Run `/mcp` to verify that the server is registered.

</TabItem>
<TabItem value="cursor" label={<McpClientTabLabel icon={CursorIcon} label="Cursor" />}>

1. Create or edit the `.cursor/mcp.json` file in your project root.
1. Add the following configuration, replacing `API_TOKEN` with your Aiven API token:

   ```json
   {
     "mcpServers": {
       "aiven-mcp": {
         "command": "npx",
         "args": ["-y", "mcp-aiven"],
         "env": {
           "AIVEN_TOKEN": "API_TOKEN",
           "AIVEN_READ_ONLY": "false",
           "AIVEN_ALLOW_SECRETS": "false"
         }
       }
     }
   }
   ```

1. Save the file and restart Cursor.

</TabItem>
<TabItem value="claude-desktop" label={<McpClientTabLabel icon={ClaudeDesktopIcon} label="Claude Desktop" />}>

1. Open the Claude Desktop configuration file.
1. Add the following configuration, replacing `API_TOKEN` with your Aiven API token:

   ```json
   {
     "mcpServers": {
       "aiven-mcp": {
         "command": "npx",
         "args": ["-y", "mcp-aiven"],
         "env": {
           "AIVEN_TOKEN": "API_TOKEN",
           "AIVEN_READ_ONLY": "false",
           "AIVEN_ALLOW_SECRETS": "false"
         }
       }
     }
   }
   ```

1. Save the file and restart Claude Desktop.

</TabItem>
<TabItem value="vscode" label={<McpClientTabLabel icon={VSCodeIcon} label="VS Code" />}>

1. In the `.vscode` directory, create or edit the `mcp.json` file.
1. Add the following configuration, replacing `API_TOKEN` with your Aiven API token:

   ```json
   {
     "servers": {
       "aiven-mcp": {
         "command": "npx",
         "args": ["-y", "mcp-aiven"],
         "env": {
           "AIVEN_TOKEN": "API_TOKEN",
           "AIVEN_READ_ONLY": "false",
           "AIVEN_ALLOW_SECRETS": "false"
         }
       }
     }
   }
   ```

1. Save the file and reload VS Code.

</TabItem>
<TabItem value="other" label={<McpClientTabLabel icon={OtherClientIcon} label="Other clients" />}>

1. Open your MCP client configuration.
1. Add the following configuration, replacing `API_TOKEN` with your Aiven API token:

   ```json
   {
     "mcpServers": {
       "aiven-mcp": {
         "command": "npx",
         "args": ["-y", "mcp-aiven"],
         "env": {
           "AIVEN_TOKEN": "API_TOKEN",
           "AIVEN_READ_ONLY": "false",
           "AIVEN_ALLOW_SECRETS": "false"
         }
       }
     }
   }
   ```

1. Save the file and restart your client.

</TabItem>
</Tabs>

</TabItem>
</Tabs>

After you verify the connection, try
[creating a PostgreSQL service](#create-a-postgresql-service) or
[creating a Kafka service](#create-a-kafka-service).
For other tasks, see [Example prompts](#example-prompts).

## Example prompts

After you connect your AI assistant to Aiven MCP, try the following prompts.
Some prompts require specific service scopes or write access.
If your assistant cannot identify a service, specify its project name.

PostgreSQL queries use the `defaultdb` database unless you specify
another database.

### Create and manage services

#### List your projects

```text
List my Aiven projects.
```

This lists the projects you can access and checks that the connection works.

#### Inspect a service

```text
Show me the status and configuration of my Aiven service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the name of an existing service.

#### Compare plans and pricing

```text
Compare the available Aiven for PostgreSQL plans in REGION.
Show the resources and pricing for each plan.
```

Replace `REGION` with the cloud region.

The assistant uses `aiven_service_type_plans` and `aiven_service_plan_pricing`.

#### Create a PostgreSQL service

```text
Create an Aiven for PostgreSQL service on the Free plan.
If the Free plan is unavailable, show the available plans
and pricing, and ask for confirmation before creating a service.
```

The assistant creates the service with `aiven_service_create`.
This task requires write access. In read-only mode, allow
`aiven_service_create` before the assistant can create the service.

#### Create a Kafka service

```text
Show the available Aiven for Apache Kafka plans and pricing in REGION.
Recommend a plan for a development workload and ask for confirmation
before creating the service.
```

Replace `REGION` with the cloud region.

The assistant creates the service with `aiven_service_create`.
This task requires write access.

#### Show connection settings

```text
Show the connection settings for my Aiven for PostgreSQL
or Aiven for Apache Kafka service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the name of a running service.

`aiven_service_connection_info` returns `service_uri` and `ca_cert`.
For Kafka, it also returns user credentials.
Enable **Allow connection credentials** (`allow_secrets=true`) and turn off
[read-only mode](#read-only-mode) before you call it.
Use this option only for a non-production service that does not hold
sensitive data.

### Work with PostgreSQL

#### List tables

```text
List the tables in the public schema of my Aiven for PostgreSQL
service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the PostgreSQL service name.

The assistant runs this with `aiven_pg_read`.
This task requires the `pg` or `all` scope.

#### Query data

```text
Show the first 10 rows from TABLE_NAME in my Aiven for PostgreSQL
service SERVICE_NAME. Use a read-only SQL query.
```

Replace `SERVICE_NAME` with the PostgreSQL service name.
Replace `TABLE_NAME` with an existing table name.

The assistant runs this with `aiven_pg_read`.
This task requires the `pg` or `all` scope.

#### Create a table

```text
Create a table named orders with an ID, customer name, order date,
and total amount in my Aiven for PostgreSQL service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the PostgreSQL service name.

The assistant runs this with `aiven_pg_write`.
Use a development database. This task requires the `pg` or `all` scope
and write access.

#### Find slow queries

```text
Inspect my Aiven for PostgreSQL service for the slowest queries using
pg_stat_statements. Show total time, calls, and mean time, and suggest
indexes or rewrites for the worst offenders.
```

This retrieves query statistics and suggests optimizations.
This task requires the `pg` or `all` scope.

### Work with Apache Kafka

Topic, message, schema, and connector tools act on Aiven for Apache Kafka
services.

#### Create a topic

```text
Create a topic named TOPIC_NAME in my Aiven for Apache Kafka
service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the Kafka service name.
Replace `TOPIC_NAME` with the topic name.

The assistant creates the topic with `aiven_kafka_topic_create`.
This task requires the `kafka` or `all` scope and write access.

#### Read messages

```text
Show me the latest available messages from the TOPIC_NAME topic
in my Aiven for Apache Kafka service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the Kafka service name.
Replace `TOPIC_NAME` with an existing topic name.

The assistant reads messages with `aiven_kafka_topic_message_list`.
This task requires the `kafka` or `all` scope.

#### Produce messages

```text
Produce a message to the TOPIC_NAME topic in my Aiven for Apache Kafka
service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the Kafka service name and
`TOPIC_NAME` with an existing topic name.

The assistant produces messages with `aiven_kafka_topic_message_produce`.
Use a development topic. This task requires the `kafka` or `all` scope
and write access.

#### Inspect schemas

```text
List the Schema Registry subjects in my Aiven for Apache Kafka
service SERVICE_NAME and show the latest schema version for each subject.
```

Replace `SERVICE_NAME` with the Kafka service name.

The assistant uses `aiven_kafka_schema_registry_subjects` and
`aiven_kafka_schema_registry_subject_version_get`.
This task requires the `kafka` or `all` scope.

#### Check connector status

```text
List the Kafka Connect connectors in my Aiven for Apache Kafka
service SERVICE_NAME and show the status of each connector.
```

Replace `SERVICE_NAME` with the Kafka service name.

The assistant uses `aiven_kafka_connect_list` and
`aiven_kafka_connect_get_connector_status`.
This task requires the `kafka` or `all` scope.

### Manage service integrations

#### List integrations

```text
List the integrations for my service SERVICE_NAME.
```

Replace `SERVICE_NAME` with the service name.

The assistant uses `aiven_service_integration_list`.
This task requires the `integrations` or `all` scope.

### Discover data assets and lineage

#### Find data assets and lineage

```text
Search for data assets related to orders in my Aiven organization
and show their lineage.
```

This task requires the `context` or `all` scope and access to Aiven Context.

### Monitor and troubleshoot services

#### Review service logs

```text
Show recent log entries for my service SERVICE_NAME
and summarize any errors.
```

Replace `SERVICE_NAME` with the service name.

The assistant uses `aiven_project_get_service_logs`.
This task requires the `core` scope.

#### Check service health

```text
Give me a health summary of every service in my Aiven project: state, plan,
maintenance updates pending, and any nodes that are not running.
```

This summarizes the state of each service and highlights issues.
This task requires the `core` scope, which is always included.

## Read-only mode

Read-only mode limits the tools that can change resources or data.
It applies at the organization level and the client level.

In read-only mode, read tools such as `aiven_pg_read` and
`aiven_kafka_topic_message_list` remain available. Write tools,
such as `aiven_pg_write` and `aiven_kafka_topic_create`,
are excluded by default.

At the client level, you can
[allow specific write operations](#restrict-write-operations).
An [organization-level read-only policy](#organization-level)
overrides those client settings.

`aiven_service_connection_info` does not run in read-only mode.
Aiven Context search and lineage tools still run.

### Organization level

Organization admins can restrict MCP connections to read-only operations for
all users in the organization.

1. In the organization, click **Admin** >
   <ConsoleLabel name="authenticationpolicy"/>.
1. Select **Restrict MCP connections to read-only operations**.

This policy overrides client-level settings, including any write allowlist.
Users cannot enable write operations when the organization policy requires
read-only access.

For more information, see
[Set authentication policies for organization users](/docs/platform/howto/set-authentication-policies).

### Client level

In [Install Aiven MCP](#configure-aiven-mcp), use the **Access** options to
configure your client:

- **Full access**: Makes write tools available, subject to your Aiven user
  permissions.
- **Read-only**: Excludes tools that modify resources or data.
- **Read-only, plus specific writes**: Excludes write tools except those you
  select.

These settings apply only to your client and cannot override an organization-level
restriction.

To configure read-only mode manually, add `read_only=true` to the hosted server
URL or set `AIVEN_READ_ONLY=true` for a local installation. You can combine
read-only mode with service scopes:

```text
https://mcp.aiven.live/mcp?services_scope=pg&read_only=true
```

## Limit tool access

Use service scopes to control which tools are available to your AI assistant.
Each tool performs a specific action, such as listing services or creating a
Kafka topic.

Service scopes don't change your Aiven user permissions. The MCP server can
perform only the actions that your authenticated user is authorized to perform.

### Available service scopes

Use the **Services** options in [Install Aiven MCP](#configure-aiven-mcp) to
select which groups of tools are available to your AI assistant.

| Scope          | Selector option       | Description                                                                                                        |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `core`         | Always included       | Tools for managing Aiven projects, services, plans, metrics, and logs                                              |
| `pg`           | PostgreSQL            | Tools for querying PostgreSQL, analyzing query performance, listing extensions, and managing connection pools |
| `kafka`        | Kafka                 | Tools for managing Apache Kafka topics, messages, connectors, and schemas                                          |
| `application`  | Applications          | Tools for deploying and redeploying applications and managing version control integrations                         |
| `integrations` | Integrations          | Tools for managing service integrations and listing available integration and endpoint types                       |
| `opensearch`   | OpenSearch            | Includes only the `core` tools; no OpenSearch-specific tools are currently available                               |
| `context`      | Context <EarlyBadge/> | Tools for searching data assets, viewing lineage, and updating asset descriptions and tags                         |
| `all`          | All                   | All available tools (default)                                                                                      |

:::note[Note]
Aiven Context is in
[early availability](/docs/platform/concepts/service-and-feature-releases#early-availability-).
To use the `context` scope, your organization must have Aiven Context enabled.
Contact your Aiven account team to request access.
:::

When configuring service scopes:

- The `core` scope is always included, even if you don't specify it.
- You can combine scopes. For example, `pg,kafka` loads the `core`, PostgreSQL,
  and Kafka tools.
- You can't combine `all` with other scopes. Doing so returns an error.
- If you don't specify a scope, Aiven MCP loads all available tools.

For the full list of tools, see [Available tools](#available-tools).

### Configure service scopes

When you select service scopes in [Install Aiven MCP](#configure-aiven-mcp), the
generated configuration includes the corresponding settings. Selecting **All**
doesn't add a `services_scope` parameter.

To configure service scopes manually on the hosted server, add the
`services_scope` parameter to the server URL. Separate multiple scopes with
commas.

For example, to load Kafka tools:

```text
https://mcp.aiven.live/mcp?services_scope=kafka
```

To load both PostgreSQL and Kafka tools:

```text
https://mcp.aiven.live/mcp?services_scope=pg,kafka
```

For a local installation, set the `AIVEN_SERVICES_SCOPE` environment variable in
the `env` section of your MCP client configuration:

```json
{
  "mcpServers": {
    "aiven-mcp": {
      "command": "npx",
      "args": ["-y", "mcp-aiven"],
      "env": {
        "AIVEN_TOKEN": "API_TOKEN",
        "AIVEN_SERVICES_SCOPE": "pg,kafka"
      }
    }
  }
}
```

Replace `API_TOKEN` with your Aiven API token. This example uses the
`mcpServers` format. For VS Code, use `servers` instead.

To verify which tools are available, open your MCP client's tool list.

### Allow specific write operations {#restrict-write-operations}

To allow selected write operations while your client is in read-only mode,
choose **Read-only, plus specific writes** under **Access** in
[Install Aiven MCP](#configure-aiven-mcp).

To allow specific write operations on the hosted server, enable
[read-only mode](#read-only-mode) and add the permitted tool names to the
`write_allowlist` URL parameter, separated by commas. For example, to allow
Kafka topic creation:

```text
https://mcp.aiven.live/mcp?services_scope=kafka&read_only=true&write_allowlist=aiven_kafka_topic_create
```

For a local installation, set the `AIVEN_WRITE_ALLOWLIST` environment variable.
The write allowlist applies only when you enable read-only mode. For supported
tool names, see [Available tools](#available-tools).

The write allowlist doesn't grant additional Aiven permissions. Your user must
still have permission to perform each allowed operation. An
[organization-level read-only policy](#organization-level) takes precedence
over the write allowlist.

## Available tools

Aiven MCP adds `aiven_service_connection_info` when you enable
**Allow connection credentials** (`allow_secrets=true`). It returns `service_uri`
and `ca_cert` for PostgreSQL and Kafka. It does not run in read-only mode.

`aiven_docs_search` searches the Aiven documentation.
It is available on the hosted server only.

The following tables list the tools in each group.

### Core

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

### PostgreSQL

| Tool | Description |
| --- | --- |
| `aiven_pg_service_available_extensions` | List available extensions |
| `aiven_pg_service_query_statistics` | Fetch query statistics |
| `aiven_pg_bouncer_create` | Create a PgBouncer connection pool |
| `aiven_pg_bouncer_update` | Update a PgBouncer connection pool |
| `aiven_pg_bouncer_delete` | Delete a PgBouncer connection pool |
| `aiven_pg_read` | Run a read-only SQL query |
| `aiven_pg_write` | Run one write SQL statement |
| `aiven_pg_optimize_query` | Suggest query and index changes |

### Kafka

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
| `aiven_kafka_connect_list` | List running connectors |
| `aiven_kafka_connect_create_connector` | Create a connector |
| `aiven_kafka_connect_edit_connector` | Edit a connector |
| `aiven_kafka_connect_get_connector_status` | Get connector status |
| `aiven_kafka_connect_pause_connector` | Pause a connector |
| `aiven_kafka_connect_resume_connector` | Resume a connector |
| `aiven_kafka_connect_restart_connector` | Restart a connector |
| `aiven_kafka_connect_delete_connector` | Delete a connector |
| `aiven_kafka_schema_registry_subjects` | List Schema Registry subjects |
| `aiven_kafka_schema_registry_subject_version_get` | Get a Schema Registry subject version |

### Applications

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

### Integrations

| Tool | Description |
| --- | --- |
| `aiven_service_integration_list` | List integrations for a service |
| `aiven_service_integration_create` | Create a service integration |
| `aiven_service_integration_get` | Get a service integration |
| `aiven_service_integration_update` | Update a service integration |
| `aiven_service_integration_delete` | Delete a service integration |
| `aiven_integration_types_list` | List integration types for a project |
| `aiven_integration_endpoint_types_list` | List external integration endpoint types |

### Context

| Tool | Description |
| --- | --- |
| `aiven_context_search_assets` | Search assets in the Aiven Context catalog |
| `aiven_context_get_lineage` | Trace upstream and downstream relationships |
| `aiven_context_update_tags` | Add or remove tags on an asset |
| `aiven_context_update_description` | Set or clear an asset description |

### Documentation

| Tool | Description |
| --- | --- |
| `aiven_docs_search` | Search the Aiven documentation |

## Security and responsibility

:::important Important
MCP tools can create, modify, and delete resources and data.
Some operations, such as deleting Kafka topics, connectors, or
service integrations, can result in data loss or service disruption.

AI agents run operations from natural language prompts, which can be
misinterpreted. Using the Aiven MCP server can result in damage to or loss of data.

Aiven secures the MCP server and data in transit. Your selected AI agent
provider determines how the agent uses your data, including whether it uses
that data for training. Review the provider's terms before you enable the
integration.
:::

Under the [shared responsibility model](https://aiven.io/responsibility-matrix),
security and compliance for MCP usage are shared between Aiven and your
organization. Aiven secures the platform and API. You are responsible for the
following:

- **Decide on MCP access.** Evaluate whether to enable MCP in your organization
  and the associated risks.
- **Control access.** Scope API tokens to the minimum permissions needed and
  rotate them regularly.
- **Review AI agent actions.** Review actions before they run, especially write
  or delete operations on production resources.
- **Limit write access.** Use [read-only mode](#read-only-mode) at the
  organization level for all users, or at the client level for an individual
  client.
- **Restrict access to connection credentials.** The
  **Allow connection credentials** option (`allow_secrets=true`) returns
  PostgreSQL and Kafka connection credentials, including URIs, passwords, and
  certificates, to the AI agent. Use it only for development with
  non-production services that do not hold sensitive data.

The Aiven MCP server can also connect directly to PostgreSQL services running
in a private VPC.

## Troubleshoot Aiven MCP

### Cannot connect to Aiven MCP

Confirm that MCP connections are enabled for your organization.
If you are not an organization admin, ask your admin to enable them.

For more information, see [Prerequisites](#prerequisites).

### Service plan lookup fails

If `aiven_service_type_plans` does not return a plan, call it again before
`aiven_service_create`.

### PostgreSQL queries fail

For hosted `aiven_pg_read` and `aiven_pg_write` calls, allow your client IP
address in the service IP filter.

### MCP tools are unavailable

If your AI assistant cannot find a tool, ensure that your MCP
configuration includes the required service scope. For example,
PostgreSQL data tools require the `pg` or `all` scope, and Kafka
data tools require the `kafka` or `all` scope.

The `aiven_service_connection_info` tool is available only when you enable
**Allow connection credentials**.

For more information, see [Limit tool access](#limit-tool-access).

### Write operations are unavailable

Confirm whether read-only mode is enabled and whether your Aiven
user has permission to perform the operation.

An organization-level read-only policy takes precedence over
client-level settings.

For more information, see [Read-only mode](#read-only-mode).

<RelatedPages/>

- [Aiven MCP use cases](https://aiven.io/mcp): Examples of what you can do with
  Aiven MCP
- [Aiven MCP announcement](https://aiven.io/blog/aiven-mcp): Overview of what
  Aiven MCP can do
- [PostgreSQL MCP server blog post](https://aiven.io/blog/postgresql-mcp):
  Use Aiven MCP with PostgreSQL
- [Kafka MCP blog post](https://aiven.io/blog/kafka-mcp):
  Use Aiven MCP with Apache Kafka
