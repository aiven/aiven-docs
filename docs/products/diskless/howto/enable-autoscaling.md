---
title: Enable autoscaling for Aiven for Apache Kafka® Diskless Topics
sidebar_label: Enable autoscaling
limited: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Autoscaling automatically adjusts the service capacity for your Aiven for Apache Kafka® deployment based on CPU usage.
It helps maintain performance during traffic spikes and reduces resource use when
demand is low. Autoscaling is available only for services using Diskless Topics in
Bring Your Own Cloud (BYOC) and must be enabled when the service is created.

:::important
To use autoscaling, you must create a Diskless Topics service in BYOC with autoscaling
enabled. You cannot enable autoscaling on an existing service.
:::

:::note[Availability]
Autoscaling for Diskless Topics is in **Limited Availability (LA)**. Contact
[Aiven support team](mailto:support@aiven.io) to request access.
:::

## Why use autoscaling

- **Maintain performance**: Services scale up during sustained high CPU load.
- **Control costs**: Services scale down when demand decreases.
- **Stay flexible**: Customers set minimum and maximum plans; scaling happens within
  those limits.
- **Get notified**: You receive an email whenever a scaling event occurs.

## How autoscaling works

Autoscaling monitors CPU usage across your Kafka service and adjusts the service plan
based on predefined thresholds. It supports plan-based scaling only for services that
use Diskless Topics in BYOC.

- **Scale up**: When CPU usage stays above 85% for several minutes.
- **Scale down**: When CPU usage stays below 40% for several minutes.
- **Plan switching**: The service scales by switching to the next larger or smaller
  autoscaling plan.
- **Scaling in groups**: Nodes are added or removed in fixed groups (for example,
  three nodes at a time), not individually.
- **Cooldown period**: After each scaling action, the autoscaler waits at least 10
  minutes before evaluating again.
- **Health check**: Scaling occurs only when all brokers are healthy and in the
  **RUNNING** state.

## Key considerations and limitations

- You must enable autoscaling during service creation. You cannot enable it later.
- Autoscaling is available only for services that use Diskless Topics in BYOC.
- Manual plan changes are disabled when autoscaling is enabled.
- Billing is based on autoscaling plans (`autoscaling-*`). Each scaling event appears
  as a separate line item in your invoice.

## Prerequisites

- An Aiven for Apache Kafka® service running with **Diskless Topics (BYOC)**.
- The service must be created with autoscaling enabled.
- Autoscaling must be enabled for your project by Aiven support.
  You cannot convert an existing non-autoscaling service into autoscaling.
- Access to one of the following:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven API](https://api.aiven.io/doc/)
  - [Aiven CLI client](/docs/tools/cli)
  - [Aiven Terraform Provider](https://registry.terraform.io/providers/aiven/aiven/latest)

## Enable autoscaling

To enable autoscaling for Kafka with Diskless Topics in BYOC, create an
autoscaler integration endpoint and link it to your service.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Log in to [Aiven Console](https://console.aiven.io/) and go to your project.
1. In the left sidebar, click <ConsoleLabel name="integration endpoints"/>.
1. Click **Aiven Service Autoscaler** > **Add new endpoint**.
1. Enter an endpoint name, for example `kafka-autoscaler`, and click **Add endpoint**.

Integrate the autoscaler with a Kafka service:

1. In the sidebar, click <ConsoleLabel name="services"/> and open your Kafka
   service.
1. Click <ConsoleLabel name="integrations"/>.
1. Under **Endpoint integrations**, click **Aiven Service Autoscaler**.
1. Select the autoscaler endpoint you created.
1. Set the scaling limits:
   - **Minimum plan:** The lowest plan your service is allowed to scale down to.
   - **Maximum plan:** The highest plan your service is allowed to scale up to.
1. Click **Enable**.

</TabItem>
<TabItem value="api" label="API">

Enable autoscaling with the [Aiven API](https://api.aiven.io/doc/):

1. Create an autoscaler integration endpoint with `endpoint_type` set to `autoscaler_service`:

   ```bash
   curl --request POST \
     --url https://api.aiven.io/v1/project/{project_name}/integration_endpoint \
     --header 'Authorization: Bearer REPLACE_WITH_TOKEN' \
     --header 'content-type: application/json' \
     --data '{
       "endpoint_name": "kafka-autoscaler",
       "endpoint_type": "autoscaler_service"
     }'
     ```

1. Link your Kafka service to the new endpoint by calling `ServiceIntegrationCreate`:

   ```bash
   curl --request POST \
     --url https://api.aiven.io/v1/project/{project_name}/integration \
     --header 'Authorization: Bearer REPLACE_WITH_TOKEN' \
     --header 'content-type: application/json' \
     --data '{
       "source_service": "SERVICE_NAME",
       "integration_type": "autoscaler_service",
       "dest_endpoint_id": "NEW_AUTOSCALER_ENDPOINT_ID",
       "user_config": {
         "autoscaling": {
           "min_plan": "autoscaling-smallvm-3x",
           "max_plan": "autoscaling-smallvm-6x"
         }
       }
     }'
   ```

   Parameters:

   - `source_service`: The Kafka service to autoscale.
   - `dest_endpoint_id`: The ID of the autoscaler endpoint you created.
   - `user_config.autoscaling.min_plan`: The smallest plan the service can scale down to.
   - `user_config.autoscaling.max_plan`: The largest plan the service can scale up to.


</TabItem>
<TabItem value="cli" label="CLI">

Enable autoscaling with the [Aiven CLI](/docs/tools/cli):

1. Create an autoscaler integration endpoint:

   ```bash
   avn service integration-endpoint-create \
     --project YOUR_PROJECT_NAME \
     --endpoint-name kafka-autoscaler \
     --endpoint-type autoscaler_service
   ```

1. Get the endpoint ID:

   ```bash
   avn service integration-endpoint-list --project YOUR_PROJECT_NAME
   ```

1. Link your Kafka service to the autoscaler endpoint:

   ```bash
   avn service integration-create \
     --project YOUR_PROJECT_NAME \
     --integration-type autoscaler_service \
     --dest-endpoint-id ENDPOINT_ID \
     --source-service YOUR_SERVICE_NAME \
     --user-config-json '{"autoscaling":{"min_plan":"autoscaling-smallvm-3x","max_plan":"autoscaling-smallvm-6x"}}'
   ```

   Parameters:

   - `autoscaling.min_plan`: The smallest plan the service can scale down to.
   - `autoscaling.max_plan`: The largest plan the service can scale up to.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the
[`aiven_service_integration_endpoint`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration_endpoint)
and
[`aiven_service_integration`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration)
resources to enable autoscaling.

```hcl
resource "aiven_service_integration_endpoint" "autoscaler" {
  project       = var.project_name
  endpoint_name = "kafka-autoscaler"
  endpoint_type = "autoscaler_service"
}

resource "aiven_service_integration" "autoscaling" {
  project              = var.project_name
  integration_type     = "autoscaler_service"
  source_service_name  = aiven_kafka.kafka.service_name
  dest_endpoint_id     = aiven_service_integration_endpoint.autoscaler.id

  user_config = {
    autoscaling = {
      min_plan = "autoscaling-smallvm-3x"
      max_plan = "autoscaling-smallvm-6x"
    }
  }
}
```

Parameters:

- `min_plan`: The smallest plan the service can scale down to.
- `max_plan`: The largest plan the service can scale up to.

:::note[Terraform limitation]
With the current Terraform design, you must first create your Kafka service with a plan.
After the service exists, create the autoscaler endpoint and integration in a
separate `terraform apply` step.

Defining the autoscaler directly in the `aiven_kafka` resource is under discussion and
may be supported in future versions of the Terraform provider.
:::

</TabItem>
</Tabs>
