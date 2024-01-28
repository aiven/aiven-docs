---
title: Collect audit logs in Aiven for PostgreSQL®
sidebar_label: Collect audit logs
pro: true
---

Enable and configure the [Aiven for PostgreSQL® audit logging feature](/docs/products/postgresql/concepts/pg-audit-logging) on your service. Access and visualize your logs to monitor activities on your databases.

## Prerequisites

- `[Pro Platform](/docs/platform/concepts/pro-platform)`
- PostgreSQL version 11 or higher
- `avnadmin` superuser role
- Dev tool of your choice to interact with the feature
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven API](https://api.aiven.io/doc/)
    ([Aiven API Postman collection](https://www.postman.com/aiven-apis/workspace/aiven/collection/21112408-1f6306ef-982e-49f8-bdae-4d9fdadbd6cd))
  - [Aiven CLI client](/docs/tools/cli)
  - [psql](https://www.postgresql.org/docs/current/app-psql.html) for advanced
    configuration

## Enable audit logging

Enable audit logging by setting the `pgaudit.featureEnabled` parameter to
`true` in your service's advanced configuration. Using the Aiven
[console](https://console.aiven.io/), [API](https://api.aiven.io/doc/),
[CLI](/docs/tools/cli), or [psql](https://www.postgresql.org/docs/current/app-psql.html).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="1" label="Aiven Console" groupId="group1" default>
### Enable in Aiven Console

:::important
In [Aiven Console](https://console.aiven.io/), you can enable audit logging at the service
level only. To enable it on a database or for a user, you need to use
[psql](https://www.postgresql.org/docs/current/app-psql.html).
:::

1. Log in to [Aiven Console](https://console.aiven.io/), and navigate to your organization
   \> project > Aiven for PostgreSQL service.
1. On the **Overview** page of your service, select **Service settings** from the sidebar.
1. On the **Service settings** page, navigate to the **Advanced configuration** section
   and select **Configure**.
1. In the **Advanced configuration** window, select **Add configuration options**, add
   the `pgaudit.featureEnabled` parameter, set it to `true`, and select
   **Save configuration**.
</TabItem>
<TabItem value="2" label="Aiven API">
### Enable with Aiven API

You can use the `curl` command line tool to interact with the
[Aiven API](/docs/tools/api). Call the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate) endpoint to
update your service's configuration by passing `{"pgaudit.featureEnabled": "true"}` in
the `user_config` object.

```bash
curl --request PUT                                                                      \
   --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service/YOUR_SERVICE_NAME    \
   --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                                   \
   --header 'content-type: application/json'                                            \
   --data
      '{
         "user_config": {
            "pgaudit.featureEnabled": "true"
         }
      }'
```
</TabItem>
<TabItem value="3" label="Aiven CLI">
### Enable with Aiven CLI

Use the [Aiven CLI client](/docs/tools/cli) to run the
[avn service update](/docs/tools/cli/service-cli) command. Update your service by setting
the `pgaudit.featureEnabled` parameter's value to `true`.

```bash
avn service update -c pgaudit.featureEnabled=true SERVICE_NAME
```

:::important
By default, audit logging does not emit any audit records. To trigger a logging operation
and start receiving audit records, configure audit logging parameters as detailed in
[Configure audit logging](#configure-audit-logging).
:::
</TabItem>
<TabItem value="4" label="psql">
### Enable with psql

:::note
psql allows for fine-grained enablement of audit logging: on a database, for a user (role),
or for a database-role combination.
:::

#### Enable on a database

1. [Connect to your Aiven for PostgreSQL service](/docs/products/postgresql/howto/list-code-samples).
1. Run the following query:

   ```sql
   SELECT aiven_extras.set_pgaudit_parameter('log', DATABASE_NAME, 'ddl');
   ```

#### Enable for a user

1. [Connect to your Aiven for PostgreSQL service](/docs/products/postgresql/howto/list-code-samples).
1. Run the following query:

   ```sql
   SELECT aiven_extras.set_pgaudit_role_parameter('log', ROLE_NAME, 'ddl');
   ```

#### Enable on a DB for a user

1. [Connect to your Aiven for PostgreSQL service](/docs/products/postgresql/howto/list-code-samples).
1. Run the following query:

   ```sql
   SELECT aiven_extras.set_pgaudit_parameter('log', DATABASE_NAME, ROLE_NAME, 'ddl');
   ```
</TabItem>
</Tabs>

## Configure audit logging {#configure-audit-logging}

Configure audit logging by setting
[its parameters](https://github.com/pgaudit/pgaudit/tree/6afeae52d8e4569235bf6088e983d95ec26f13b7#readme)
in the [Aiven Console](https://console.aiven.io/), programmatically with the
[Aiven API](https://api.aiven.io/doc/), with the [Aiven CLI](/docs/tools/cli), or using
[psql](https://www.postgresql.org/docs/current/app-psql.html).

:::important

- Advanced configuration of the audit logging feature requires using
  [psql](https://www.postgresql.org/docs/current/app-psql.html).
- Any configuration changes take effect only on new connections.

:::

For information on all the audit logging configuration parameters, refer to
[Settings](https://github.com/pgaudit/pgaudit/tree/6afeae52d8e4569235bf6088e983d95ec26f13b7).

<Tabs>
<TabItem value="1" label="Aiven Console" groupId="group1" default>
### Configure in Aiven Console

:::important
In the [Aiven Console](https://console.aiven.io/), you can enable audit logging on a
service only. To enable it on a database or for a user, use
[psql](https://www.postgresql.org/docs/current/app-psql.html).
:::

1. Log in to [Aiven Console](https://console.aiven.io/), and navigate to your organization
   \> project > Aiven for PostgreSQL service.
1. On the **Overview** page of your service, select **Service settings** from the sidebar.
1. On the **Service settings** page, navigate to the **Advanced configuration** section
   and select **Configure**.
1. In the **Advanced configuration** window, select **Add configuration options**, find a
   desired parameter (all prefixed with `pgaudit.log`), set its value as needed, and
   select **Save configuration**.
</TabItem>
<TabItem value="2" label="Aiven API">
### Configure with Aiven API

Use the [Aiven API](https://api.aiven.io/doc/) to configure audit logging on your
service. Call the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate) endpoint
passing desired audit logging parameters in the `user_config` object.

```bash
curl --request PUT                                                                      \
   --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service/YOUR_SERVICE_NAME    \
   --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                                   \
   --header 'content-type: application/json'                                            \
   --data
      '{
         "user_config": {
            "pgaudit": {
               "PARAMETER_NAME": "PARAMETER_VALUE"
            }
         }
         }'
```
</TabItem>
<TabItem value="3" label="Aiven CLI">
### Configure with Aiven CLI

Use the [Aiven CLI client](/docs/tools/cli) to configure audit logging on
your service by running the following command:

```bash
avn service update -c pgaudit.PARAMETER_NAME=PARAMETER_VALUE SERVICE_NAME
```
</TabItem>
<TabItem value="4" label="psql">
### Configure with psql

:::note
psql allows for fine-grained configuration of audit logging: on a database, for a user
(role), or for a database-role combination.
:::

#### Configure on a database

1. [Connect to your Aiven for PostgreSQL service](/docs/products/postgresql/howto/list-code-samples).
1. Run the following query:

   ```sql
   ALTER DATABASE DATABASE_NAME SET pgaudit.log_PARAMETER_NAME = PARAMETER_VALUE
   ```

#### Configure for a user

1. [Connect to your Aiven for PostgreSQL service](/docs/products/postgresql/howto/list-code-samples).
1. Run the following query:

   ```sql
   ALTER ROLE ROLE_NAME SET pgaudit.log_PARAMETER_NAME = PARAMETER_VALUE
   ```

#### Configure on a DB for a user

1. [Connect to your Aiven for PostgreSQL service](/docs/products/postgresql/howto/list-code-samples).
1. Run the following query:

   ```sql
   ALTER ROLE ROLE_NAME IN DATABASE DATABASE_NAME SET pgaudit.log_PARAMETER_NAME = PARAMETER_VALUE
   ```
</TabItem>
</Tabs>

## Configure session audit logging

Session audit logging allows recording detailed logs of all SQL statements and commands
executed during a database session in the system's backend.

To enable the session audit logging, run the following query:

```sql
SELECT aiven_extras.set_pgaudit_parameter('log', 'DATABASE_NAME', 'CLASSES_OF_STATEMENTS_TO_BE_LOGGED');
```

:::note[Example]

```sql
SELECT aiven_extras.set_pgaudit_parameter('log', 'defaultdb', 'read, ddl');
```

:::

:::note[See also]
For more details on how to set up, configure, and use session audit logging, check
[Session audit logging](https://github.com/pgaudit/pgaudit/tree/6afeae52d8e4569235bf6088e983d95ec26f13b7).
:::

## Access your logs

You can access your Aiven for PostgreSQL audit logs either [directly in the log output of
your service](#access-pg-log) or by
[integrating with another service that allows monitoring and analyzing logs, such as Aiven for OpenSearch®](#access-in-integration).

### Access in Aiven for PostgreSQL {#access-pg-log}

1. Log in to the [Aiven Console](https://console.aiven.io/), and navigate to your
   organization > project > Aiven for PostgreSQL service.
1. On the **Overview** page of your service, select **Logs** from the sidebar.

### Access in integrated service {#access-in-integration}

<Tabs>
<TabItem value="1" label="Aiven Console" groupId="group1" default>
#### Use Aiven Console

Access your Aiven for PostgreSQL logs by [enabling OpenSearch log integration](/docs/products/opensearch/howto/opensearch-log-integration).
</TabItem>
<TabItem value="2" label="Aiven API">
#### Use Aiven API

Call the
[ServiceIntegrationCreate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationCreate)
endpoint passing the following parameters in the request body:

- `integration_type`: `logs`
- `source_service`: the name of an Aiven for PostgreSQL
- `destination_service`: the name of an Aiven for OpenSearch service

```bash
curl --request POST \
   --url https://api.aiven.io/v1/project/{project_name}/integration \
   --header 'Authorization: Bearer REPLACE_WITH_YOUR_BEARER_TOKEN' \
   --header 'content-type: application/json' \
   --data
      '{
         "integration_type": "logs",
         "source_service": "REPLACE_WITH_POSTGRESQL_SERVICE_NAME",
         "destination_service": "REPLACE_WITH_OPENSEARCH_SERVICE_NAME",
      }'
```
</TabItem>
<TabItem value="3" label="Aiven CLI">
#### Use Aiven CLI

Use the [Aiven CLI](/docs/tools/cli) to create the service integration.

```bash
avn service integration-create --project $PG_PROJECT  \
   -t logs                                            \
   -s $PG_SERVICE_NAME                                \
   -d $OS_SERVICE_NAME
```

After the service integration is set up and propagated to the service configuration, the
logs are available in Aiven for OpenSearch. Each log record emitted by audit logging is
stored in Aiven for OpenSearch as a single message, which cannot be guaranteed for
external integrations such as [Remote Syslog](/docs/integrations/rsyslog).
</TabItem>
</Tabs>

## Visualize your logs

If your logs are available in Aiven for OpenSearch, use
[OpenSearch Dashboards](/docs/products/opensearch/dashboards/get-started) to visualize the
logs.

To preview your audit logs in OpenSearch Dashboards, use the filtering tool: select
`AIVEN_AUDIT_FROM`, set its value to `pg`, and apply the filter.

![Audit logging logs in OpenSearch Dashboards](/images/products/postgresql/pgaudit-logs-in-os-dashboards.png)

:::note
If the index pattern in OpenSearch Dashboards had been configured before you enabled the
service integration, the audit-specific AIVEN_AUDIT_FROM field is not available for
filtering. Refresh the fields list for the index in OpenSearch Dashboards under
**Stack Management** → **Index Patterns** → Your index pattern → **Refresh field list**.
:::

## Disable audit logging

Disable audit logging by setting the `pgaudit.featureEnabled` parameter to
`false` in your service's advanced configuration. Use the Aiven
[console](https://console.aiven.io/), [API](https://api.aiven.io/doc/),
[CLI](/docs/tools/cli), or [psql](https://www.postgresql.org/docs/current/app-psql.html).

:::important
Audit logging is disabled automatically if you unsubscribe from Pro Platform or Pro
Features.
:::

<Tabs>
<TabItem value="1" label="Aiven Console" groupId="group1" default>
### Disable in Aiven Console

:::important
In the [Aiven Console](https://console.aiven.io/), you can disable audit logging on a
service only. To disable it on a database or for a user, use
[psql](https://www.postgresql.org/docs/current/app-psql.html).
:::

1. Log in to [Aiven Console](https://console.aiven.io/), and navigate to your organization
   \> project > Aiven for PostgreSQL service.
1. On the **Overview** page of your service, select **Service settings** from the sidebar.
1. On the **Service settings** page, navigate to the **Advanced configuration** section
   and select **Configure**.
1. In the **Advanced configuration** window, select **Add configuration options**, add the
   `pgaudit.featureEnabled` parameter, set it to `false`, and select
   **Save configuration**.
</TabItem>
<TabItem value="2" label="Aiven API">
### Disable with Aiven API

Use the `curl` command line tool to call the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate) endpoint.
Update your service's configuration by passing `{"pgaudit.featureEnabled": "false"}` in
the `user_config` object.

```bash
curl --request PUT                                                                      \
   --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service/YOUR_SERVICE_NAME    \
   --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                                   \
   --header 'content-type: application/json'                                            \
   --data
      '{
         "user_config": {
            "pgaudit.featureEnabled": "false"
         }
      }'
```
</TabItem>
<TabItem value="3" label="Aiven CLI">
### Disable with Aiven CLI

Use the [Aiven CLI client](/docs/tools/cli) to run the
[avn service update](/docs/tools/cli/service-cli) command. Update your service by setting
the `pgaudit.featureEnabled` parameter's value to `false`.

```bash
avn service update -c pgaudit.featureEnabled=false SERVICE_NAME
```
</TabItem>
<TabItem value="4" label="psql">
### Disable with psql

:::note
psql allows you to disable audit logging on a few levels: database, user (role), or
database-role combination.
:::

#### Disable on a database

1. [Connect to your Aiven for PostgreSQL service](/docs/products/postgresql/howto/list-code-samples).
1. Run the following query:

   ```sql
   ALTER DATABASE DATABASE_NAME set pgaudit.featureEnabled = 'off'
   ```

#### Disable for a user

1. [Connect to your Aiven for PostgreSQL service](/docs/products/postgresql/howto/list-code-samples).
1. Run the following query:

   ```sql
   ALTER ROLE ROLE_NAME SET pgaudit.featureEnabled = 'off'
   ```

#### Disable on a DB for a user

1. [Connect to your Aiven for PostgreSQL service](/docs/products/postgresql/howto/list-code-samples).
1. Run the following query:

   ```sql
   ALTER ROLE ROLE_NAME IN DATABASE DATABASE_NAME SET pgaudit.featureEnabled = 'off'
   ```
</TabItem>
</Tabs>
