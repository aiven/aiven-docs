---
title: Aiven for OpenSearch® metrics sent to Datadog
sidebar_label: Metrics in Datadog
---

import RelatedPages from "@site/src/components/RelatedPages";

Send Aiven for OpenSearch® metrics to Datadog, and choose which metric categories the integration collects.

## Prerequisites

- A running Aiven for OpenSearch® service on a paid plan. Service integrations, including
  Datadog, aren't available on
  [free tier](/docs/products/opensearch/concepts/opensearch-free-tier) services.
- A Datadog account
- A Datadog [API key](https://docs.datadoghq.com/account_management/api-app-keys/)
- A [Datadog Metrics integration](/docs/integrations/datadog/datadog-metrics) enabled for
  your service

## Metrics sent to Datadog

When you enable the Datadog Metrics integration for your Aiven for OpenSearch service,
Aiven runs Datadog's
[Elasticsearch integration](https://docs.datadoghq.com/integrations/elasticsearch/?tab=host)
check against your service. The check always collects node-level and cluster health
metrics.

Four additional metric categories are off by default. You enable each one independently
through the `opensearch` configuration on the Datadog integration.

| Category | Configuration parameter | What it collects |
| --- | --- | --- |
| Cluster monitoring | `cluster_stats_enabled` | Cluster-wide disk usage metrics |
| Index monitoring | `index_stats_enabled` | Per-index metrics, such as document counts and store size |
| Pending task monitoring | `pending_task_stats_enabled` | Metrics for tasks waiting in the cluster task queue |
| Primary shard monitoring | `pshard_stats_enabled` | Primary shard and index count metrics |

For the full list of metrics in each category, see
[Metrics](https://docs.datadoghq.com/integrations/elasticsearch/?tab=host#metrics) in the
Datadog Elasticsearch integration documentation.

## Enable a metric category

Enable metric categories through the Datadog integration for your Aiven for OpenSearch
service.

1. Find the ID of the Datadog Metrics integration for your service by running the
   [avn service integration-list](/docs/tools/cli/service/integration#avn_service_integration_list)
   command:

   ```bash
   avn service integration-list --project PROJECT_NAME SERVICE_NAME
   ```

   Use the `service_integration_id` value from the output as `INTEGRATION_ID` in the
   following commands.

1. Set the categories to collect to `true`. This example enables all four categories:

   ```bash
   avn service integration-update --project PROJECT_NAME \
      --user-config-json '{
         "opensearch": {
            "cluster_stats_enabled": true,
            "index_stats_enabled": true,
            "pending_task_stats_enabled": true,
            "pshard_stats_enabled": true
         }
      }' \
      INTEGRATION_ID
   ```

   Include only the categories to change. Setting one category doesn't affect the
   others.

1. Check that the configuration is set correctly:

   ```bash
   avn service integration-list SERVICE_NAME \
      --project PROJECT_NAME \
      --json | jq '.[] | select(.integration_type=="datadog").user_config'
   ```

   Expect output similar to the following:

   ```json
   {
     "opensearch": {
       "cluster_stats_enabled": true,
       "index_stats_enabled": true,
       "pending_task_stats_enabled": true,
       "pshard_stats_enabled": true
     }
   }
   ```

1. Find the collected metrics in the Datadog Metrics Explorer under the
   `elasticsearch.` prefix.

<RelatedPages/>

- [Datadog and Aiven](/docs/integrations/datadog)
- [Send metrics to Datadog](/docs/integrations/datadog/datadog-metrics)
- [Aiven for OpenSearch® metrics available via Prometheus](/docs/products/opensearch/howto/os-metrics)
- [Aiven for OpenSearch® free tier](/docs/products/opensearch/concepts/opensearch-free-tier)
