---
title: Manage OpenSearch® log integration
sidebar_label: Log integration
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven provides a service integration that allows you to send your logs from several services, such as Aiven for Apache Kafka®, PostgreSQL®, OpenSearch®, Caching, and Grafana®, to Aiven for OpenSearch®, allowing you to use OpenSearch to gain more insight and control over your logs.

:::tip
See this [video tutorial](https://www.youtube.com/watch?v=f4y9nPadO-M) for an end-to-end
example of how to enable your Aiven for OpenSearch® log integration.
:::

## Prerequisites

<Tabs groupId="setup">
<TabItem value="console" label="Console" default>

- User profile in the [Aiven Console](https://console.aiven.io/)
- Source service: Aiven-managed service producing logs to be sent to Aiven for OpenSearch
- Destination service: Aiven for OpenSearch service that receives the logs

</TabItem>
<TabItem value="api" label="API">

- [Personal token](/docs/platform/howto/create_authentication_token) for use with the
  Aiven API, CLI, Terraform, or other applications
- [Aiven API](/docs/tools/api)
- Source service: Aiven-managed service producing logs to be sent to Aiven for OpenSearch
- Destination service: Aiven for OpenSearch service that receives the logs

</TabItem>
<TabItem value="cli" label="CLI">

- [Personal token](/docs/platform/howto/create_authentication_token) for use with the
  Aiven API, CLI, Terraform, or other applications
- [Aiven CLI](/docs/tools/cli)
- Source service: Aiven-managed service producing logs to be sent to Aiven for OpenSearch
- Destination service: Aiven for OpenSearch service that receives the logs

</TabItem>

<TabItem value="terraform" label="Terraform">

- [Personal token](/docs/platform/howto/create_authentication_token) for use with the
  Aiven API, CLI, Terraform, or other applications
- [Aiven Provider for Terraform](/docs/tools/terraform)
- Source service: Aiven-managed service producing logs to be sent to Aiven for OpenSearch
- Destination service: Aiven for OpenSearch service that receives the logs

</TabItem>
<TabItem value="k8s" label="Kubernetes">

- [Personal token](/docs/platform/howto/create_authentication_token) for use with the
  Aiven API, CLI, Terraform, or other applications
- [Aiven Operator for Kubernetes®](/docs/tools/kubernetes)
- Source service: Aiven-managed service producing logs to be sent to Aiven for OpenSearch
- Destination service: Aiven for OpenSearch service that receives the logs

</TabItem>
</Tabs>

## Enable log integration

Enable logs integration to send logs from your service to Aiven for OpenSearch®:

<Tabs groupId="setup">
<TabItem value="console" label="Console" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/) and go to the service that
    produces the logs to be sent to Aiven for OpenSearch.
1.  Click <ConsoleLabel name="logs"/> in the sidebar.
1.  On the **Logs** page, click **Enable logs integration**.
1.  In the **Logs integration** window, select an existing Aiven for OpenSearch service
    or create one, and click **Continue**.

    :::note
    If you choose to select an existing service and you are a member of more than one
    Aiven project with *operator* or *admin* access rights, select a project before
    selecting an Aiven for OpenSearch service.
    :::

1.  In the **Configure logs integration** window, set up the `index prefix` and
    `index retention limit` parameters, and click **Enable**.

    :::note
    To effectively disable the `index retention limit`, set it to its maximum value of `10000`
    days.
    :::

</TabItem>
<TabItem value="api" label="API">

Call the
[ServiceIntegrationCreate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationCreate)
endpoint to enable log integration:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/integration \
  --header "Authorization: Bearer API_TOKEN" \
  --header "Content-Type: application/json" \
  --data-raw '{
  "integration_type": "logs",
  "source_service": "SOURCE_SERVICE_NAME",
  "dest_service": "OPENSEARCH_SERVICE_NAME",
  "user_config": {
    "elasticsearch_index_prefix": "INDEX_PREFIX",
    "elasticsearch_index_days_max": INDEX_RETENTION_DAYS
  }
}'
```

Parameters:

- `PROJECT_NAME`: Your Aiven project name
- `API_TOKEN`: Your [personal token](/docs/platform/howto/create_authentication_token)
- `SOURCE_SERVICE_NAME`: The service producing logs
- `OPENSEARCH_SERVICE_NAME`: Your Aiven for OpenSearch service name
- `INDEX_PREFIX`: Prefix for the index name
- `INDEX_RETENTION_DAYS`: Number of days to keep logs

Example:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/project/dev-sandbox/integration \
  --header "Authorization: Bearer 123abc456def789ghi" \
  --header "Content-Type: application/json" \
  --data-raw '{
  "integration_type": "logs",
  "source_service": "my-postgresql",
  "dest_service": "my-opensearch",
  "user_config": {
    "elasticsearch_index_prefix": "logs",
    "elasticsearch_index_days_max": 3
  }
}'
```

</TabItem>
<TabItem value="cli" label="CLI">

Use the [avn service integration-create](/docs/tools/cli/service/integration#avn_service_integration_create)
command to enable log integration:

```bash
avn service integration-create \
  --project PROJECT_NAME \
  --source-service SOURCE_SERVICE_NAME \
  --dest-service OPENSEARCH_SERVICE_NAME \
  --integration-type logs \
  -c elasticsearch_index_prefix=INDEX_PREFIX \
  -c elasticsearch_index_days_max=INDEX_RETENTION_DAYS
```

Parameters:

- `PROJECT_NAME`: Your Aiven project name
- `SOURCE_SERVICE_NAME`: The service producing logs
- `OPENSEARCH_SERVICE_NAME`: Your Aiven for OpenSearch service name
- `INDEX_PREFIX`: Prefix for the index name
- `INDEX_RETENTION_DAYS`: Number of days to keep logs

Example:

```bash
avn service integration-create \
  --project my-project \
  --source-service my-kafka-service \
  --dest-service my-opensearch \
  --integration-type logs \
  -c elasticsearch_index_prefix=logs \
  -c elasticsearch_index_days_max=7
```

</TabItem>
<TabItem value="terraform" label="Terraform">

Add a `aiven_service_integration` resource to enable log integration:

```hcl
resource "aiven_service_integration" "logs_integration" {
  project                  = "PROJECT_NAME"
  integration_type         = "logs"
  source_service_name      = "SOURCE_SERVICE_NAME"
  destination_service_name = "OPENSEARCH_SERVICE_NAME"

  logs_user_config {
    elasticsearch_index_prefix   = "INDEX_PREFIX"
    elasticsearch_index_days_max = INDEX_RETENTION_DAYS
  }
}
```

Parameters:

- `PROJECT_NAME`: Your Aiven project name
- `SOURCE_SERVICE_NAME`: The service producing logs
- `OPENSEARCH_SERVICE_NAME`: Your Aiven for OpenSearch service name
- `INDEX_PREFIX`: Prefix for the index name, for example, `logs`
- `INDEX_RETENTION_DAYS`: Number of days to keep logs, for example, `3`

Run `terraform init`, `terraform plan`, and `terraform apply`.

For more information, see the
[aiven-service-integration resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration).

</TabItem>
<TabItem value="k8s" label="Kubernetes">

Add a `ServiceIntegration` resource to enable log integration:

```yaml
apiVersion: aiven.io/v1alpha1
kind: ServiceIntegration
metadata:
  name: INTEGRATION_RESOURCE_NAME
spec:
  authSecretRef:
    name: aiven-token
    key: TOKEN_NAME
  project: PROJECT_NAME
  integrationType: logs
  sourceServiceName: SOURCE_SERVICE_NAME
  destinationServiceName: OPENSEARCH_SERVICE_NAME
  logs:
    elasticsearch_index_prefix: INDEX_PREFIX
    elasticsearch_index_days_max: INDEX_RETENTION_DAYS
```

Apply the resource with `kubectl apply -f FILE_NAME.yaml`.

For more information, see the
[ServiceIntegration resource documentation](https://aiven.github.io/aiven-operator/resources/serviceintegration.html#spec.logs).

</TabItem>
</Tabs>

## Configure log integration

There are two parameters that you can adjust when integrating logs to
your OpenSearch service:

-   `index prefix`, specifies the prefix part of the index name
-   `index retention limit`, number of days to preserve the daily
    indexes

:::warning
The service's logs are sent from the selected service to your
OpenSearch cluster. When the `index retention limit` is reached, those
indexes are deleted from the OpenSearch cluster.
:::

You can change the configuration of the `index prefix` and
`index retention limit` after the integration is enabled.

<Tabs groupId="setup">
<TabItem value="console" label="Console" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your Aiven for
    OpenSearch service.
1.  Click <ConsoleLabel name="integrations"/> in the sidebar.
1.  On the **Integrations** page, find the integrated service to configure.
1.  Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="edit"/>.
1.  After updating `index prefix` or `index retention limit`, click **Edit**.

</TabItem>
<TabItem value="api" label="API">

1. Get `INTEGRATION_ID` by calling the
   [ServiceGet](https://api.aiven.io/doc/#tag/Service/operation/ServiceGet) endpoint:

   ```bash
   curl --request GET \
     --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
     --header "Authorization: Bearer API_TOKEN"
   ```

   In the output, under `service_integrations`, find your integration and its
   `service_integration_id`.

1. Call the
   [ServiceIntegrationUpdate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationUpdate)
   endpoint to update the log integration configuration:

   ```bash {7-8}
   curl --request PUT \
     --url https://api.aiven.io/v1/project/PROJECT_NAME/integration/INTEGRATION_ID \
     --header "Authorization: Bearer API_TOKEN" \
     --header "Content-Type: application/json" \
     --data-raw '{
     "user_config": {
       "elasticsearch_index_prefix": "UPDATED_INDEX_PREFIX",
       "elasticsearch_index_days_max": UPDATED_INDEX_RETENTION_DAYS
     }
   }'
   ```

   Parameters:

   - `PROJECT_NAME`: Your Aiven project name
   - `INTEGRATION_ID`: The integration ID
   - `API_TOKEN`: Your [personal token](/docs/platform/howto/create_authentication_token)
   - `UPDATED_INDEX_PREFIX`: Updated prefix for the index name
   - `UPDATED_INDEX_RETENTION_DAYS`: Updated number of days to keep logs

   Example:

   ```bash {7-8}
   curl --request PUT \
     --url https://api.aiven.io/v1/project/my-project/integration/123abc456def789ghi-123abc456def789ghi \
     --header "Authorization: Bearer 123abc456def789ghi" \
     --header "Content-Type: application/json" \
     --data-raw '{
     "user_config": {
       "elasticsearch_index_prefix": "new",
       "elasticsearch_index_days_max": 100
     }
   }'
   ```

</TabItem>
<TabItem value="cli" label="CLI">

1. Get `INTEGRATION_ID` by running the
   [`avn service integration-list`](/docs/tools/cli/service/integration#avn_service_integration_list)
   command:

   ```bash
   avn service integration-list SOURCE_SERVICE_NAME --project PROJECT_NAME
   ```

   Parameters:

   - `PROJECT_NAME`: Your Aiven project name
   - `SOURCE_SERVICE_NAME`: The service producing logs

   In the output table, find `SERVICE_INTEGRATION_ID` for the integrated services listed
   in columns `SOURCE` and `DEST`.

1. Use the
   [avn service integration-update](/docs/tools/cli/service/integration#avn%20service%20integration-update)
   command to update the log integration configuration:

   ```bash {3-4}
   avn service integration-update INTEGRATION_ID \
     --project PROJECT_NAME \
     -c elasticsearch_index_prefix=UPDATED_INDEX_PREFIX \
     -c elasticsearch_index_days_max=UPDATED_INDEX_RETENTION_DAYS
   ```

   Parameters:

   - `INTEGRATION_ID`: The integration ID
   - `PROJECT_NAME`: Your Aiven project name
   - `UPDATED_INDEX_PREFIX`: Updated prefix for the index name
   - `UPDATED_INDEX_RETENTION_DAYS`: Updated number of days to keep logs

   Example:

   ```bash {3-4}
   avn service integration-update 123abc456def789ghi-123abc456def789ghi \
     --project my-project \
     -c elasticsearch_index_prefix=new \
     -c elasticsearch_index_days_max=100
   ```

</TabItem>
<TabItem value="terraform" label="Terraform">

Update the `logs_user_config` block in your `aiven_service_integration` resource:

```hcl {8-9}
resource "aiven_service_integration" "logs_integration" {
  project                  = "PROJECT_NAME"
  integration_type         = "logs"
  source_service_name      = "SOURCE_SERVICE_NAME"
  destination_service_name = "OPENSEARCH_SERVICE_NAME"

  logs_user_config {
    elasticsearch_index_prefix   = "UPDATED_INDEX_PREFIX"
    elasticsearch_index_days_max = UPDATED_INDEX_RETENTION_DAYS
  }
}
```

Parameters:

- `PROJECT_NAME`: Your Aiven project name
- `SOURCE_SERVICE_NAME`: The service producing logs
- `OPENSEARCH_SERVICE_NAME`: Your Aiven for OpenSearch service name
- `UPDATED_INDEX_PREFIX`: Prefix for the index name, for example, `logs`
- `UPDATED_INDEX_RETENTION_DAYS`: Number of days to keep logs, for example, `3`

Run `terraform apply` to apply the changes.

</TabItem>
<TabItem value="k8s" label="Kubernetes">

Update the `logs` section in your
[`ServiceIntegration` resource](https://aiven.github.io/aiven-operator/resources/serviceintegration.html#spec.logs):

```yaml {14-15}
apiVersion: aiven.io/v1alpha1
kind: ServiceIntegration
metadata:
  name: INTEGRATION_RESOURCE_NAME
spec:
  authSecretRef:
    name: aiven-token
    key: TOKEN_NAME
  project: PROJECT_NAME
  integrationType: logs
  sourceServiceName: SOURCE_SERVICE_NAME
  destinationServiceName: OPENSEARCH_SERVICE_NAME
  logs:
    elasticsearch_index_prefix: UPDATED_INDEX_PREFIX
    elasticsearch_index_days_max: UPDATED_INDEX_RETENTION_DAYS
```

Apply the resource with `kubectl apply -f FILE_NAME.yaml`.

</TabItem>
</Tabs>

## Disable logs integration

To stop sending logs from your service to Aiven for OpenSearch, disable the integration:

<Tabs groupId="setup">
<TabItem value="console" label="Console" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your integrated
    Aiven for OpenSearch service.
1.  Click <ConsoleLabel name="integrations"/> in the sidebar.
1.  On the **Integrations** page, find the service sending its logs to your Aiven for
    OpenSearch service.
1.  Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="disconnect"/>.

</TabItem>
<TabItem value="api" label="API">

1. Get `INTEGRATION_ID` by calling the
   [ServiceGet](https://api.aiven.io/doc/#tag/Service/operation/ServiceGet) endpoint:

   ```bash
   curl --request GET \
     --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
     --header "Authorization: Bearer API_TOKEN"
   ```

   In the output, under `service_integrations`, find your integration and its
   `service_integration_id`.

1. Call the
   [ServiceIntegrationDelete](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationDelete)
   endpoint to delete the log integration:

   ```bash
   curl --request DELETE \
     --url https://api.aiven.io/v1/project/PROJECT_NAME/integration/INTEGRATION_ID \
     --header "Authorization: Bearer API_TOKEN"
   ```

   Parameters:

   - `PROJECT_NAME`: Your Aiven project name
   - `INTEGRATION_ID`: The integration ID
   - `API_TOKEN`: Your [personal token](/docs/platform/howto/create_authentication_token)

   Example:

   ```bash
   curl --request DELETE \
     --url https://api.aiven.io/v1/project/dev-sandbox/integration/123abc456def789ghi-123abc456def789ghi \
     --header "Authorization: Bearer 123abc456def789ghi"
   ```

</TabItem>
<TabItem value="cli" label="CLI">

1. Get `INTEGRATION_ID` by running the
   [`avn service integration-list`](/docs/tools/cli/service/integration#avn_service_integration_list)
   command:

   ```bash
   avn service integration-list SOURCE_SERVICE_NAME --project PROJECT_NAME
   ```

   Parameters:

   - `PROJECT_NAME`: Your Aiven project name
   - `SOURCE_SERVICE_NAME`: The service producing logs

   In the output table, find `SERVICE_INTEGRATION_ID` for the integrated services listed
   in columns `SOURCE` and `DEST`.

1. Use the
   [avn service integration-delete](/docs/tools/cli/service/integration#avn-service-integration-delete)
   command to delete the log integration:

   ```bash
   avn service integration-delete INTEGRATION_ID \
     --project PROJECT_NAME
   ```

   Parameters:

   - `INTEGRATION_ID`: The integration ID
   - `PROJECT_NAME`: Your Aiven project name

   Example:

   ```bash
   avn service integration-delete 123abc456def789ghi-123abc456def789ghi \
     --project my-project
   ```

</TabItem>
<TabItem value="terraform" label="Terraform">

Remove the `aiven_service_integration` resource from your Terraform configuration:

```hcl
# Remove or comment out this resource
# resource "aiven_service_integration" "logs_integration" {
#   project                  = "PROJECT_NAME"
#   integration_type         = "logs"
#   source_service_name      = "SOURCE_SERVICE_NAME"
#   destination_service_name = "OPENSEARCH_SERVICE_NAME"
#
#   logs_user_config {
#     elasticsearch_index_prefix   = "INDEX_PREFIX"
#     elasticsearch_index_days_max = INDEX_RETENTION_DAYS
#   }
# }
```

Run `terraform apply` to delete the integration.

</TabItem>
<TabItem value="k8s" label="Kubernetes">

Delete the
[`ServiceIntegration` resource](https://aiven.github.io/aiven-operator/resources/serviceintegration.html#spec.logs):

```bash
kubectl delete serviceintegration INTEGRATION_RESOURCE_NAME
```

or

```bash
kubectl delete -f FILE_NAME.yaml
```

</TabItem>
</Tabs>
