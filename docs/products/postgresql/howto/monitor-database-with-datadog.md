---
title: Monitor a database with Datadog
---

[Database Monitoring with Datadog](https://www.datadoghq.com/product/database-monitoring/) enables you to capture key metrics on the Datadog platform for any Aiven for PostgreSQL® service with [Datadog Metrics](/docs/integrations/datadog/datadog-metrics) integration.

Datadog Database Monitoring allows you to view query metrics and explain
plans in a single place, with the ability to drill into precise
execution details, along with query and host metrics correlation.

## Prerequisites

-   Apply any outstanding maintenance updates mentioning the Datadog
    integration.
-   Ensure the
    [Datadog Metrics integration](/docs/integrations/datadog/datadog-metrics) is enabled.
-   The
    [PostgreSQL extensions](/docs/products/postgresql/reference/list-of-extensions) - `pg_stat_statements` and `aiven_extras`, must be
    enabled by executing the following [CREATE
    EXTENSION](https://www.postgresql.org/docs/current/sql-createextension.html)
    SQL commands directly on the Aiven for PostgreSQL® database service.

```bash
CREATE EXTENSION pg_stat_statements;
CREATE EXTENSION aiven_extras;
```

## Enable monitoring

You can individually enable Datadog Database Monitoring for the specific
[Datadog Metrics](/docs/integrations/datadog/datadog-metrics) integration for Aiven for
PostgreSQL®, by configuring the
`datadog_dbm_enabled` parameter. Repeat this action for every Datadog
Metrics integration for Aiven for PostgreSQL®, which you plan to
monitor.

Using the `avn service integration-list`
[Aiven CLI command](/docs/tools/cli/service/integration#avn_service_integration_list),
you can obtain the Datadog Metric integration to
monitor and enable the Datadog Database monitoring functionality by
using the `datadog_dbm_enabled` configuration parameter. For example:

-   Find the UUID of the Datadog Metrics integration for a particular
    service:

    ```bash
    avn service integration-list --project <project name> <service name>
    ```

-   Enable the Datadog Database Monitoring for the Datadog Metrics
    integration with the following command, substituting the
    `<INTEGRATION_UUID>` with the integration UUID retrieved at the
    previous step:

    ```bash
    avn service integration-update --project <PROJECT_NAME> --user-config '{"datadog_dbm_enabled": true}' <INTEGRATION_UUID>
    ```

-   Check if user-config `datadog_dbm_enabled` set correctly:

    ```bash
    avn service integration-list <SERVICE_NAME> \
       --project <PROJECT_NAME>  \
       --json | jq '.[] | select(.integration_type=="datadog").user_config'
    ```

    `datadog_dbm_enabled` should be set to `true`:

    ```json
    {
      "datadog_dbm_enabled": true
    }
    ```

## Related pages

- Learn more about [Datadog and Aiven](/docs/integrations/datadog).
- [Monitor PgBouncer with Datadog](/docs/products/postgresql/howto/monitor-pgbouncer-with-datadog).
- Learn more about
  [Database monitoring with Datadog](https://www.datadoghq.com/product/database-monitoring/)
  from the Datadog product page.
