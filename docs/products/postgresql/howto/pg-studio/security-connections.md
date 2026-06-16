---
title: Security and connections in PG Studio
sidebar_label: Security and connections
description: Understand how PG Studio connects and protects your data.
---

Learn how PG Studio connects to your database and ensures safe, controlled access.

## Database connection details

PG Studio connects to your PostgreSQL service using:

- **Database user:** The `avnadmin` user account, which has full read and write access to
  your databases. You can run SQL statements through PG Studio.
- **Access scope:** Full database access with the same privileges as the `avnadmin` user.
  This is not limited to read-only access.

## Security safeguards

PG Studio ensures safe, controlled access:

For AI query generation scope, see [How AI assistance works](/docs/products/postgresql/howto/pg-studio/use-ai-assistant#how-ai-assistance-works).

- **Single-statement validation:** PG Studio allows only one SQL statement per execution.
- **Automatic safety checks:** PG Studio validates all generated SQL for safety before
  execution.
- **Restricted unsafe requests:** Requests for privilege escalation or malicious SQL are
  blocked.
- **Timeouts and limits:**
  - Statement timeout: 30 seconds
  - Lock timeout: 10 seconds
  - Connection timeout: 10 seconds
  - Maximum result size: 5,000 rows
- **Encrypted connections:** All database connections use SSL/TLS encryption.
- **Rate limiting:** Two query executions every two seconds per user per service; one
  AI request every two seconds per user per service.
- **Write query safeguards:** When you run a write query, PG Studio prompts you to confirm
  before executing.
- **Fork testing option:** You can test write queries on a database fork instead of modifying
  live data directly.

## Network access requirements

Your IP address must be in the service's IP allowlist. PG Studio validates your browser's
IP address, which must be allowed in the
[service's IP filter configuration](/docs/platform/howto/restrict-access).

If you get the `Access is not allowed from the IP address` error, add your IP address to
the allowlist.

## Required permissions

To use PG Studio, you need the `service:data:write` permission at the organization, unit,
or project level. This permission is included in the **Admin**, **Developer**, and
**Operator** roles.

## Manage PG Studio and AI features

PG Studio and its AI features are on by default for all organizations and apply to all
projects in your organization. Aiven manages these controls, so you cannot change them
yourself. The two controls are independent, so you can turn either one off or on without
affecting the other. To change either setting, contact the
[Aiven support team](mailto:support@aiven.io).

## Related pages

- [Get started with PG Studio](/docs/products/postgresql/howto/pg-studio/get-started)
- [Restrict access to services](/docs/platform/howto/restrict-access)
- [PG Studio overview](/docs/products/postgresql/howto/pg-studio/)
