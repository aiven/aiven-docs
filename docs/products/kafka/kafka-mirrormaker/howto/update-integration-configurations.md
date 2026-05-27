---
title: Update integration configurations for Aiven for Apache Kafka® MirrorMaker 2
sidebar_label: Update integration configurations
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

Update the producer and consumer settings on a MirrorMaker 2 service integration to control how MirrorMaker 2 communicates with the source and target Kafka clusters.

Integration configurations are set on the service integration resource. For more
information about available parameters and restart impact, see
[Configuration and tuning for Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker/concepts/configuration-layers).

:::note
Integration configurations are not available in the Aiven Console. Use the Aiven CLI,
Aiven API, or Aiven Provider for Terraform to update them.
:::

## Prerequisites

- An Aiven for Apache Kafka® MirrorMaker 2 service.
- An existing integration between the MirrorMaker 2 service and a source or target Kafka
  cluster.
- Access to one of the following:
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](https://api.aiven.io/)
  - [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)

## Update integration configurations

Producer and consumer settings are stored on each `kafka_mirrormaker` service
integration. This applies whether the integration connects MirrorMaker 2 to an
Aiven for Apache Kafka® service or to an external Kafka cluster through an
integration endpoint.

<Tabs groupId="update-method">
<TabItem value="cli" label="Aiven CLI" default>

Use [`avn service integration-update`](/docs/tools/cli/service/integration#avn_service_integration_update)
to update producer and consumer settings on a MirrorMaker 2 integration.

1. List the service integrations for the MirrorMaker 2 service:

   ```bash
   avn service integration-list MIRRORMAKER_SERVICE_NAME \
     --project PROJECT_NAME
   ```

1. Copy the service integration ID for the `kafka_mirrormaker` integration that connects
   MirrorMaker 2 to the source or target cluster you want to configure.

1. Update the integration configuration.

   To update settings, use `-c KEY=VALUE` for individual parameters or
   `--user-config-json` for a JSON payload. Pass multiple `-c` options to update
   several settings at once. Do not use `-c` and `--user-config-json` in the same
   command.

   ```bash
   avn service integration-update SERVICE_INTEGRATION_ID \
     --project PROJECT_NAME \
     -c kafka_mirrormaker.consumer_fetch_min_bytes=1024 \
     -c kafka_mirrormaker.producer_linger_ms=100
   ```

Parameters:

- `PROJECT_NAME`: Your Aiven project name
- `MIRRORMAKER_SERVICE_NAME`: Your Aiven for Apache Kafka MirrorMaker 2 service name
- `SERVICE_INTEGRATION_ID`: The `kafka_mirrormaker` service integration ID

</TabItem>
<TabItem value="terraform" label="Terraform">

1. Update the `kafka_mirrormaker_user_config` block in your
   [`aiven_service_integration`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration)
   resource:

   ```hcl
   resource "aiven_service_integration" "mirrormaker" {
     project                  = "PROJECT_NAME"
     integration_type         = "kafka_mirrormaker"
     source_service_name      = "KAFKA_SERVICE_NAME"
     destination_service_name = "MIRRORMAKER_SERVICE_NAME"

     kafka_mirrormaker_user_config {
       kafka_mirrormaker {
         consumer_fetch_min_bytes = 1024
         producer_linger_ms       = 100
       }
     }
   }
   ```

   Parameters:

   - `PROJECT_NAME`: Your Aiven project name
   - `KAFKA_SERVICE_NAME`: The Aiven for Apache Kafka® service connected to MirrorMaker 2.
     For an external Kafka cluster, use `source_endpoint_id` instead of `source_service_name`.
   - `MIRRORMAKER_SERVICE_NAME`: Your Aiven for Apache Kafka MirrorMaker 2 service name

1. Run `terraform plan` and `terraform apply` to apply the changes.

</TabItem>
<TabItem value="api" label="Aiven API">

1. List the service integrations for the MirrorMaker 2 service using the
   [ServiceIntegrationList](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationList)
   endpoint and copy the `service_integration_id` for the `kafka_mirrormaker`
   integration.

1. Call the
   [ServiceIntegrationUpdate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationUpdate)
   endpoint to update the integration configuration:

   ```bash
   curl --request PUT \
     --url https://api.aiven.io/v1/project/PROJECT_NAME/integration/INTEGRATION_ID \
     --header "Authorization: Bearer API_TOKEN" \
     --header "Content-Type: application/json" \
     --data-raw '{
     "user_config": {
       "kafka_mirrormaker": {
         "consumer_fetch_min_bytes": 1024,
         "producer_linger_ms": 100
       }
     }
   }'
   ```

   Parameters:

   - `PROJECT_NAME`: Your Aiven project name
   - `INTEGRATION_ID`: The service integration ID
   - `API_TOKEN`: Your [personal token](/docs/platform/howto/create_authentication_token)

   For the full request schema and supported parameters, see the
   [Aiven API reference](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationUpdate)
   and the
   [`kafka_mirrormaker_user_config` Terraform schema](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration#nested-schema-for-kafka_mirrormaker_user_configkafka_mirrormaker).

</TabItem>
</Tabs>

## Verify the configuration

Check that the updated values are applied.

<Tabs groupId="update-method">
<TabItem value="cli" label="Aiven CLI" default>

1. List each `kafka_mirrormaker` integration and its `user_config`:

   ```bash
   avn service get MIRRORMAKER_SERVICE_NAME \
     --project PROJECT_NAME --json | \
     jq '[.service_integrations[] | select(.integration_type == "kafka_mirrormaker") | {service_integration_id, user_config}]'
   ```

   Example output:

   ```json
   [
     {
       "service_integration_id": "1c2c30f8-413b-4c7c-b393-97165d875952",
       "user_config": {
         "cluster_alias": "my-kafka-endpoint-sasl"
       }
     },
     {
       "service_integration_id": "57042a2e-aae3-4be3-bcfc-e2c1294b1af3",
       "user_config": {
         "cluster_alias": "my-kafka"
       }
     },
     {
       "service_integration_id": "a89ca005-e9f1-46a9-9ffb-9f85c517323a",
       "user_config": {
         "cluster_alias": "my-kafka-endpoint-ssl",
         "kafka_mirrormaker": {
           "consumer_fetch_min_bytes": 1024,
           "producer_linger_ms": 100
         }
       }
     }
   ]
   ```

1. Find the `service_integration_id` you updated and confirm that the
   `kafka_mirrormaker` block under `user_config` contains your updated values.

</TabItem>
<TabItem value="terraform" label="Terraform">

Run `terraform plan` and confirm that Terraform reports no changes:

```bash
terraform plan
```

</TabItem>
<TabItem value="api" label="Aiven API">

Use the
[ServiceIntegrationGet](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationGet)
endpoint to retrieve the service integration and confirm that the updated values are
applied.

</TabItem>
</Tabs>

<RelatedPages/>

- [Configuration and tuning for Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker/concepts/configuration-layers)
- [Producer and consumer settings](/docs/products/kafka/kafka-mirrormaker/concepts/configuration-layers#producer-and-consumer-settings)
- [Aiven CLI service integration commands](/docs/tools/cli/service/integration)
- [`aiven_service_integration` Terraform resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration)
