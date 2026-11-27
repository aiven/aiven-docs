---
title: Troubleshoot Aiven MCP
sidebar_label: Troubleshooting
description: >-
  Troubleshoot Aiven MCP connection and authentication issues, service plan
  lookup, missing tools, permission errors, and PostgreSQL queries.
---

To check your connection to Aiven MCP, send the following prompt to your AI assistant:

```text
List my Aiven projects.
```

A successful response confirms that your assistant can connect to Aiven MCP and access your projects. If the request fails, or your assistant cannot perform an operation, check the following issues.

## Connection or authentication fails

- For the hosted server, confirm that MCP connections are enabled for your
  organization and that you authenticated with the correct Aiven account.
  If you are not an organization admin, ask your admin to enable them.
- For a local installation, confirm that your API token is valid and has the
  permissions you need.
- Check the server URL and client configuration in
  [Set up Aiven MCP](/docs/tools/mcp-server#configure-aiven-mcp).

For more information, see [Prerequisites](/docs/tools/mcp-server#prerequisites).

Do not share your API token in a chat or support request.

## Service plan lookup fails

If your assistant cannot retrieve available service plans, verify the project,
service type, and cloud region. If `aiven_service_type_plans` does not return a
plan, ask your assistant to call it again before `aiven_service_create`.
If the issue persists, check the plans and pricing in the Aiven Console before
creating the service.

## PostgreSQL queries fail

Check the following:

- The Aiven for PostgreSQL service is running.
- The database name is correct.
- The `pg` or `all` service scope is configured.
- For write statements, read-only mode does not restrict the operation.

Review the returned error before changing permissions or network settings.

For hosted `aiven_pg_read` and `aiven_pg_write` calls, allow your client IP
address in the service IP filter.

## MCP tools are unavailable

If your AI assistant cannot find a tool, include the required service scope
in your MCP configuration. For example, PostgreSQL data tools require the
`pg` or `all` scope, and Kafka data tools require the `kafka` or `all` scope.

Other reasons a tool might not appear:

- Read-only mode excludes write tools by default.
- Aiven Context tools require access to Aiven Context.
- `aiven_docs_search` is available only on the hosted server.
- `aiven_service_connection_info` is missing. See
  [Connection credentials are unavailable](#connection-credentials-are-unavailable).

For more information, see [Limit tool access](/docs/tools/mcp-server#limit-tool-access).

## Write operations are unavailable

Confirm whether read-only mode is enabled and whether your Aiven
user has permission to perform the operation.

An organization-level read-only policy takes precedence over
client-level settings.

For more information, see [Read-only mode](/docs/tools/mcp-server#read-only-mode).

## Connection credentials are unavailable

For development services that do not contain sensitive data, enable
**Allow connection credentials** and turn off read-only mode if you need
to retrieve connection credentials through MCP. Organization-level policies
take precedence over client settings.

For more information, see
[Security and responsibility](/docs/tools/mcp-server#security-and-responsibility).
