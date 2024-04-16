---
title: Monitor PgBouncer with Datadog
sidebar_label: Monitor PgBouncer in Datadog
---

Integrate PgBouncer with Datadog to track connection pool metrics and monitor application traffic on the Datadog platform.

## Prerequisites

- Your service plan is Startup or higher.
- You applied outstanding service maintenance updates affecting the Datadog Metrics
  integration.

## Enable monitoring

You can enable monitoring PgBouncer metrics for your Aiven for PostgreSQL service both
[if the service already has a Datadog Metrics integration](#enable-monitoring-if-the-integration-exists)
and [if it doesn't](#create-the-integration-and-enable-monitoring).

### Enable monitoring for an integrated service{#enable-monitoring-if-the-integration-exists}

Enable monitoring PgBouncer metrics for an Aiven for PostgreSQL service that already
has a Datadog Metrics integration:

1. Obtain the `SERVICE_INTEGRATION_ID` of the Datadog Metrics integration for your Aiven for
   PostgreSQL service by running the
   [avn service integration-list](/docs/tools/cli/service/integration#avn_service_integration_list)
   command:

   ```bash
   avn service integration-list SERVICE_NAME \
      --project PROJECT_NAME
   ```

1. To enable PgBouncer monitoring in Datadog, set up the `datadog_pgbouncer_enabled`
   parameter to `true`:

   ```bash
   avn service integration-update SERVICE_INTEGRATION_ID \
      --project PROJECT_NAME \
      --user-config '{"datadog_pgbouncer_enabled": true}'
   ```

   Replace SERVICE_INTEGRATION_ID with the service integration identifier acquired in the
   preceding step.

### Enable monitoring for a non-integrated service{#create-the-integration-and-enable-monitoring}

To enable monitoring PgBouncer metrics for an Aiven for PostgreSQL service that doesn't have
a Datadog Metrics integration,
[create the integration](/docs/tools/cli/service/integration#avn_service_integration_create)
and enable monitoring by running:

```bash
avn service integration-create INTEGRATION_CREATE_PARAMETERS \
   --user-config-json '{"datadog_pgbouncer_enabled": true}'
```

Replace INTEGRATION_CREATE_PARAMETERS with [the parameters required to create the Datadog Metrics integration](/docs/tools/cli/service/integration#avn_service_integration_create).

## Verify the changes

Check that the `datadog_pgbouncer_enabled` user-config is set correctly:

```bash
avn service integration-list SERVICE_NAME \
   --project PROJECT_NAME \
   --json | jq '.[] | select(.integration_type=="datadog").user_config'
```

Expect the following output confirming that `datadog_pgbouncer_enabled` is set to
`true`:

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
