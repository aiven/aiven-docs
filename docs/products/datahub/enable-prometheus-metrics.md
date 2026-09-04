---
title: Enable Prometheus metrics for Aiven for DataHub
sidebar_label: Enable Prometheus metrics
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";
import RelatedPages from "@site/src/components/RelatedPages";

Enable Prometheus metrics for your Aiven for DataHub service to monitor its performance and health.
The service exposes operational metrics including request rates, latencies, and resource usage.

You can enable Prometheus metrics and secure them by setting environment variables in the GMS application and

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:project:admin`', '`role:project:operator`', '`project:services:write`'],
    },
  ]}
/>

## Prerequisites

- A [DataHub personal access token (PAT)](https://docs.datahub.com/docs/authentication/personal-access-tokens)

## Enable Prometheus metrics

1. In your DataHub service, go to the **DataHub resources** section.
1. Open the Aiven App that ends in `-gms`.
1. In the **Environment variables** section, click **Edit**.
1. On the **Variables** tab, add the following variables:

   | Key | Value |
   |-----|-------|
   | `MANAGEMENT_ENDPOINT_PROMETHEUS_ENABLED` | `true` |
   | `MANAGEMENT_SERVER_PORT` | `8080` |
   | `SPRING_APPLICATION_JSON` | `{"authentication":{"excludedPaths":"/schema-registry/,/health,/health/live,/health/detailed,/config,/config/search/export,/public-iceberg/,/openapi/operations/dev/featureFlags,/openapi/operations/dev/featureFlags/*"}}` |

1. Click **Save**.

## Scrape Prometheus metrics

Use the following endpoint to scrape metrics:

```
https://GMS_URL/actuator/prometheus
```

Where `GMS_URL` is your [DataHub GMS URL](/docs/products/datahub/datahub-mcp-server.md#get-the-datahub-gms-url).

Example Prometheus configuration:

```yaml
scrape_configs:
  - job_name: datahub-gms
    metrics_path: /actuator/prometheus
    scheme: https
    authorization:
      type: Bearer
      credentials: DATAHUB_ACCESS_TOKEN
    static_configs:
      - targets:
          - GMS_URL
```

Where:
- `DATAHUB_ACCESS_TOKEN` is your DataHub personal access token.
- `GMS_URL` is your DataHub GMS URL

Requests without a valid token return an HTTP `401 Unauthorized` status code.

## Access related metrics

Related metrics in JSON format are available at the `/actuator/metrics` endpoint.

## Security

To restrict access to the metrics to authenticated users,
Do not expose port `4319` and do not include Prometheus to the excluded paths.
