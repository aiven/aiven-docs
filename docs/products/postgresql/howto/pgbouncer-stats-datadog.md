---
title: Expose PgBouncer statistics to Datadog
sidebar_label: PgBouncer stats in Datadog
---

Connect PgBouncer with Datadog to display [PgBouncer statistics](/docs/products/postgresql/howto/pgbouncer-stats) on the Datadog platform.

## Prerequisites

- Your service plan is Startup or higher.
- [Datadog metrics integration](/docs/integrations/datadog/datadog-metrics) is
  enabled on your service.
- You applied outstanding service maintenance updates affecting the Datadog metrics
  integration.

## Expose PgBouncer statistics

You can expose PgBouncer statistics for your Aiven for PostgreSQL service both if the
service already has a Datadog Metrics integration and if it doesn't.

### Expose PgBouncer stats if the integration exists

1. Obtain the SERVICE_INTEGRATION_ID of the Datadog Metrics integration for your Aiven for
   PostgreSQL service by running the
   [avn service integration-list](/docs/tools/cli/service/integration#avn_service_integration_list)
   command:

   ```bash
   avn service integration-list --project PROJECT_NAME SERVICE_NAME
   ```

1. To enable PgBouncer statistics in Datadog, set up the ``datadog_pgbouncer_enabled``
   parameter to ``true``:

   ```bash
   avn service integration-update --project PROJECT_NAME --user-config '{"datadog_pgbouncer_enabled": true}' SERVICE_INTEGRATION_ID
   ```

   Replace SERVICE_INTEGRATION_ID with the service integration identifier acquired in the
   preceding step.

### Create the integration and expose PgBouncer stats

With no Datadog Metrics integration in place,
[create the integration for your service](/docs/tools/cli/service/integration#avn_service_integration_create)
and enable PgBouncer statistics in Datadog by running:

```bash
avn service integration-create INTEGRATION_CREATE_PARAMETERS --user-config-json '{"datadog_pgbouncer_enabled": true}'
```

Replace INTEGRATION_CREATE_PARAMETERS with [the parameters required to create the Datadog Metrics integration](/docs/tools/cli/service/integration#avn_service_integration_create).

## Verify the changes

Check that the ``datadog_pgbouncer_enabled`` user-config is set correctly:

```bash
avn service integration-list SERVICE_NAME \
   --project PROJECT_NAME  \
   --json | jq '.[] | select(.integration_type=="datadog").user_config'
```

Expect the following output confirming that ``datadog_pgbouncer_enabled`` is set to
``true``:

```bash
{
  "datadog_pgbouncer_enabled": true
}
```

## Related pages

- [Database monitoring with Datadog](/docs/products/postgresql/howto/monitor-database-with-datadog)
- [Access PgBouncer statistics](/docs/products/postgresql/howto/pgbouncer-stats)
- [Datadog and Aiven](/docs/integrations/datadog)
- [Create service integrations](/docs/platform/howto/create-service-integration)
