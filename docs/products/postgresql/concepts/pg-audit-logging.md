---
title: Aiven for PostgreSQL® audit logging
sidebar_label: Audit logging
enterprise: true
---

A path to optimal data security, compliance, incident management, and system performance starts with [collecting robust audit logs](/docs/products/postgresql/howto/use-pg-audit-logging).

## About audit logging

The audit logging feature allows you to monitor and track activities within relational
database systems, such as Aiven for PostgreSQL®. Check multiple applications of this
feature in [Why use the audit logging](#why-use-pgaudit).

## Why use audit logging {#why-use-pgaudit}

Data Security

- Monitor user activities to identify unusual or suspicious behavior
- Detect unauthorized access attempts to critical data or systems
- Identify intrusion attempts or unauthorized activities within the organization's IT
  environment

Compliance

- Use audit logs as a regulatory compliance evidence to demonstrate that the organization
  meets industry or state regulations during audits
- Track access to sensitive data to comply with data privacy regulations

Accountability

- Have specific actions attributed to individual users to hold them accountable for their
  activities within the system
- Track changes to databases and systems to hold users accountable for alterations or
  configurations

Operational security

- Monitor and analyze audit logs to proactively identify and resolve security incidents
- Analyze audit logs to detect and respond to potential security threats

Incident management and root cause analysis

- Investigate an incident with audit logs as a detailed trail of events leading up to the
  incidents
- Analyze the root cause of an incident with audit logs providing data on actions and
  events that may have led to the incident

System performance optimization

- Monitor and analyze system performance to identify bottlenecks.
- Analyzing audit logs to assess resource utilization patterns and optimize the system
  configuration

Data recovery and disaster planning

- Use audit logs for data restoration in case of data loss or system failure
- Analyze audit logs to improve system resilience and disaster planning strategies by
  identify potential points of failure

Change management and version control

- Use audit logs to keep a record of changes made to databases, software, and
  configurations, ensuring a proper version control

## Use cases

The audit logging feature has application in the following industries:

- Finance and banking

  Ensuring compliance with regulatory requirements, tracking financial transactions, and
  detecting fraudulent activities

- Healthcare

  Maintaining the confidentiality and integrity of patient records as well as complying
  with privacy regulations

- Government and public sector

  Tracking changes in critical systems, secure sensitive data, and meet legal and
  regulatory requirements

- Information technology (IT) and software companies

  Monitoring access to the systems, tracking software changes, and identifying potential
  security breaches

- Retail and e-commerce

  Tracking customer data, transactions, and inventory management to ensure data integrity
  and prevent unauthorized access

- Manufacturing

  Tracking changes to production processes, monitoring equipment performance, and
  maintaining data integrity for quality control

- Education

  Protecting sensitive student data, tracking changes to academic records, and monitoring
  system access for security purposes

## Limitations

Aiven for PostgreSQL® audit logging requires the following:

- `[Aiven Enterprise](/docs/platform/howto/aiven-enterprise)`
- Aiven for PostgreSQL version 11 or later
- `avnadmin` superuser role
- [psql](https://www.postgresql.org/docs/current/app-psql.html) for advanced configuration

## How it works

### Activation with predefined settings

To use the audit logging on your service (database) for collecting logs in Aiven for
PostgreSQL, you need to
[enable and configure this feature](/docs/products/postgresql/howto/use-pg-audit-logging)
using the [Aiven Console](https://console.aiven.io), the [Aiven CLI](/docs/tools/cli), or
[psql](https://www.postgresql.org/docs/current/app-psql.html).

### Configuration options

When enabled on your service, the audit logging can be
[configured](/docs/products/postgresql/howto/use-pg-audit-logging) to match your use case.
[Audit logging parameters](https://github.com/pgaudit/pgaudit/tree/6afeae52d8e4569235bf6088e983d95ec26f13b7#readme)
for fine-tuning the feature are the following:

- `pgaudit.log` (default: none)
  Classes of statements to be logged by the session audit logging

- `pgaudit.log_catalog` (default: on)
  Whether the session audit logging should be enabled for a statement with all relations
  in `pg_catalog`

- `pgaudit.log_client`
  Whether log messages should be visible to a client process, such as `psql`

- `pgaudit.log_level`
  Log level that should be used for log entries

- `pgaudit.log_parameter` (default: off)
  Whether audit logs should include the parameters passed with the statement

- `pgaudit.log_parameter_max_size`
  Maximum size (in bytes) of a parameter's value that can be logged

- `pgaudit.log_relation` (default: off)
  Whether a separate log entry for each relation (for example, TABLE or VIEW) referenced
  in a SELECT or DML statement should be created

- `pgaudit.log_rows`
  Whether the audit logging should include the rows retrieved or affected by a statement
  (with the rows field located after the parameter field)

- `pgaudit.log_statement` (default: on)
  Whether the audit logging should include the statement text and parameters

- `pgaudit.log_statement_once` (default: off)
  Whether the audit logging should include the statement text and parameters in the first
  log entry for a statement/ sub-statement combination (as opposed to including them in
  all the entries)

- `pgaudit.role`
  Master role to use for an object audit logging

:::note[Full list of audit logging parameters]
For information on all the configuration parameters, preview
[Settings](https://github.com/pgaudit/pgaudit/tree/6afeae52d8e4569235bf6088e983d95ec26f13b7#readme).
:::

### Collecting and visualizing logs

You can
[access your collected audit logs](/docs/products/postgresql/howto/use-pg-audit-logging)
either directly in the log output of your Aiven for PostgreSQL service or by integrating
with another service that allows monitoring and analyzing logs, such as Aiven for
OpenSearch®. To
[visualize your audit logs](/docs/products/postgresql/howto/use-pg-audit-logging), you can
use [OpenSearch Dashboards](/docs/products/opensearch/dashboards).

### Disabling audit logging

To
[disable the audit logging on your service (database)](/docs/products/postgresql/howto/use-pg-audit-logging),
you need to modify your service's advanced configuration with the
[Aiven Console](https://console.aiven.io), the [Aiven CLI](/docs/tools/cli), or
[psql](https://www.postgresql.org/docs/current/app-psql.html).

## What's next

[Set up the audit logging on your Aiven for PostgreSQL service and start collecting audit logs](/docs/products/postgresql/howto/use-pg-audit-logging).
