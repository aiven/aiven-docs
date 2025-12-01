---
title: Enable slow query logging
sidebar_label: Enable slow query logs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

Identify inefficient or time-consuming queries by enabling [slow query logging](https://docs.opensearch.org/latest/install-and-configure/configuring-opensearch/logs/#search-request-slow-logs) in your Aiven for OpenSearch® service.

## Prerequisites

- Aiven for OpenSearch service
- Access to manage the service configuration:
  - [Aiven Console](https://console.aiven.io/) or
  - [Aiven CLI](/docs/tools/cli) with a [personal token](/docs/platform/howto/create_authentication_token) or
  - [Aiven API](/docs/tools/api) with a [personal token](/docs/platform/howto/create_authentication_token) or
  - [Aiven Provider for Terraform](/docs/tools/terraform) or
  - [Aiven Operator for Kubernetes®](/docs/tools/kubernetes)

## Enable slow query logging

<Tabs groupId="config-methods">
<TabItem value="gui" label="Console" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/).
1.  On the **Services** page, select your Aiven for OpenSearch service.
1.  On the **Service settings** page, scroll to the **Advanced configuration**
    section and click **Configure**.
1.  In the **Advanced configuration** window:

    1.  Click **Add configuration options**. From the list, select
        `opensearch.cluster.search.request.slowlog.level`.
    1.  Set the value to one of the following: `debug`, `info`, `trace`, or `warn`.
    1.  Click **Add configuration options**. From the list, select the threshold
        corresponding to your chosen log level:

        - `opensearch.cluster.search.request.slowlog.threshold.debug`
        - `opensearch.cluster.search.request.slowlog.threshold.info`
        - `opensearch.cluster.search.request.slowlog.threshold.trace`
        - `opensearch.cluster.search.request.slowlog.threshold.warn`

    1.  Set the threshold value as a number followed by a time unit with no space,
        for example `1s` or `500ms`.

        :::note
        - Default value: `-1` (disabled)
        - Allowed units: `s` (seconds), `m` (minutes), `h` (hours), `d` (days),
          `nanos` (nanoseconds), `ms` (milliseconds), `micros` (microseconds)
        :::

    1.  Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [`avn service update`](/docs/tools/cli/service-cli#avn-cli-service-update) command
to configure slow query logging:

```bash
avn service update SERVICE_NAME \
  -c opensearch.cluster.search.request.slowlog.level=LEVEL \
  -c opensearch.cluster.search.request.slowlog.threshold.LEVEL=THRESHOLD
```

Parameters:

- `SERVICE_NAME`: Your Aiven for OpenSearch service name
- `LEVEL`: Log level (`debug`, `info`, `trace`, or `warn`)
- `THRESHOLD`: Time threshold (for example, `1s`, `500ms`, `2m`)

Example:

```bash
avn service update my-opensearch \
  -c opensearch.cluster.search.request.slowlog.level=info \
  -c opensearch.cluster.search.request.slowlog.threshold.info=1s
```

</TabItem>
<TabItem value="api" label="API">

Call the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint to configure slow query logging:

```bash
curl --request PUT \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  --header "Authorization: Bearer API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "user_config": {
      "opensearch": {
        "cluster_search_request_slowlog": {
          "level": "LEVEL",
          "threshold": {
            "LEVEL": "THRESHOLD"
          }
        }
      }
    }
  }'
```

Parameters:

- `PROJECT_NAME`: Your Aiven project name
- `SERVICE_NAME`: Your Aiven for OpenSearch service name
- `API_TOKEN`: Your [personal token](/docs/platform/howto/create_authentication_token)
- `LEVEL`: Log level (`debug`, `info`, `trace`, or `warn`)
- `THRESHOLD`: Time threshold (for example, `1s`, `500ms`, `2m`)

Example:

```bash
curl --request PUT \
  --url "https://api.aiven.io/v1/project/my-project/service/my-opensearch" \
  --header "Authorization: Bearer your-api-token" \
  --header "Content-Type: application/json" \
  --data '{
    "user_config": {
      "opensearch": {
        "cluster_search_request_slowlog": {
          "level": "info",
          "threshold": {
            "info": "1s"
          }
        }
      }
    }
  }'
```

</TabItem>
<TabItem value="tf" label="Terraform">

Add the slow query logging configuration to your `aiven_opensearch` resource:

```hcl
resource "aiven_opensearch" "example_opensearch" {
  project      = var.aiven_project_name
  cloud_name   = "google-europe-west1"
  plan         = "startup-4"
  service_name = "my-opensearch"

  opensearch_user_config {
    opensearch {
      cluster_search_request_slowlog {
        level = "info"
        threshold {
          info = "1s"
        }
      }
    }
  }
}
```

For more configuration options, see the
[`aiven_opensearch` resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/opensearch#nested-schema-for-opensearch_user_configopensearchcluster_search_request_slowlog).

</TabItem>
<TabItem value="k8s" label="Kubernetes">

Add the slow query logging configuration to your `OpenSearch` resource:

```yaml
apiVersion: aiven.io/v1alpha1
kind: OpenSearch
metadata:
  name: my-opensearch
spec:
  project: PROJECT_NAME
  cloudName: google-europe-west1
  plan: startup-4

  userConfig:
    opensearch:
      cluster_search_request_slowlog:
        level: info
        threshold:
          info: 1s
```

For more configuration options, see the
[OpenSearch resource documentation](https://aiven.github.io/aiven-operator/resources/opensearch.html#spec.userConfig.opensearch.cluster.search.request.slowlog).

</TabItem>
</Tabs>

<RelatedPages/>

- [OpenSearch slow query logging documentation](https://docs.opensearch.org/latest/install-and-configure/configuring-opensearch/logs/#search-request-slow-logs)
- [Advanced parameters for Aiven for OpenSearch](/docs/products/opensearch/reference/advanced-params)
