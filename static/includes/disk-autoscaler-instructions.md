import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Enable disk autoscaling

To enable disk autoscaling, create an autoscaler integration endpoint, then enable an
autoscaler integration on your service using that endpoint.

<Tabs groupId="disk-autoscaler">
<TabItem value="console" label="Console" default>

Create an autoscaler endpoint:

1. Log in to [Aiven Console](https://console.aiven.io/), and go to your organization
   and project.
1. On the left sidebar, click <ConsoleLabel name="integration endpoints"/>.
1. Click **Aiven Autoscaler** > **Add new endpoint**.
1. Set the endpoint name and the maximum total disk storage in GB, and click
   **Add endpoint**.

Enable the autoscaler on a service:

1. On the left sidebar, click <ConsoleLabel name="services"/>, and open your service.
1. On the left sidebar, click <ConsoleLabel name="integrations"/>.
1. In **Endpoint integrations**, click **Aiven Autoscaler**.
1. Click the endpoint you created, and click **Enable**.

</TabItem>
<TabItem value="api" label="API">

1. Call
   [ServiceIntegrationEndpointCreate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationEndpointCreate)
   to create an autoscaler integration endpoint on your project:

   ```bash
   curl --request POST \
     --url https://api.aiven.io/v1/project/PROJECT_NAME/integration_endpoint \
     --header "Authorization: Bearer TOKEN" \
     --header "Content-Type: application/json" \
     --data '{
       "endpoint_name": "ENDPOINT_NAME",
       "endpoint_type": "autoscaler",
       "user_config": {
         "autoscaling": [
           {
             "type": "autoscale_disk",
             "cap_gb": 300
           }
         ]
       }
     }'
   ```

1. Call
   [ServiceIntegrationCreate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationCreate)
   to enable the autoscaler integration on your service, using the endpoint ID from the
   previous response:

   ```bash
   curl --request POST \
     --url https://api.aiven.io/v1/project/PROJECT_NAME/integration \
     --header "Authorization: Bearer TOKEN" \
     --header "Content-Type: application/json" \
     --data '{
       "dest_endpoint_id": "ENDPOINT_ID",
       "integration_type": "autoscaler",
       "source_project": "PROJECT_NAME",
       "source_service": "SERVICE_NAME"
     }'
   ```

</TabItem>
<TabItem value="cli" label="CLI">

1. Create an autoscaler integration endpoint using
   [avn service integration-endpoint-create](/docs/tools/cli):

   ```bash
   avn service integration-endpoint-create \
     --project PROJECT_NAME \
     --endpoint-name ENDPOINT_NAME \
     --endpoint-type autoscaler \
     --user-config-json '{"autoscaling": [{"type": "autoscale_disk", "cap_gb": 300}]}'
   ```

1. Find the ID of the new endpoint:

   ```bash
   avn service integration-endpoint-list --project PROJECT_NAME
   ```

1. Enable the autoscaler integration on your service, using the endpoint ID from the
   previous step:

   ```bash
   avn service integration-create \
     --dest-service SERVICE_NAME \
     --integration-type autoscaler \
     --source-endpoint-id ENDPOINT_ID
   ```

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the
[`aiven_service_integration_endpoint`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration_endpoint)
and
[`aiven_service_integration`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration)
resources:

```hcl
resource "aiven_service_integration_endpoint" "autoscaler_endpoint" {
  project       = "PROJECT_NAME"
  endpoint_name = "ENDPOINT_NAME"
  endpoint_type = "autoscaler"

  autoscaler_user_config {
    autoscaling {
      type   = "autoscale_disk"
      cap_gb = 300
    }
  }
}

resource "aiven_service_integration" "autoscaler_integration" {
  project                 = "PROJECT_NAME"
  integration_type        = "autoscaler"
  source_service_name     = "SERVICE_NAME"
  destination_endpoint_id = aiven_service_integration_endpoint.autoscaler_endpoint.id
}
```

See the [disk autoscaler
guide](https://registry.terraform.io/providers/aiven/aiven/latest/docs/guides/disk-autoscaler)
for more details.

</TabItem>
</Tabs>

### Change the maximum disk space for autoscaling

After you enable disk autoscaling, you can update the maximum total disk size at any
time.

<Tabs groupId="disk-autoscaler">
<TabItem value="console" label="Console" default>

1. On the left sidebar, click <ConsoleLabel name="integration endpoints"/>.
1. Click **Aiven Autoscaler**.
1. Find your endpoint, click <ConsoleLabel name="actions"/>, and click the option to
   edit it.
1. Set a new maximum disk storage value, and save your changes.

</TabItem>
<TabItem value="api" label="API">

Call
[ServiceIntegrationEndpointUpdate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationEndpointUpdate)
with the new `cap_gb` value:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/integration_endpoint/ENDPOINT_ID \
  --header "Authorization: Bearer TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "user_config": {
      "autoscaling": [
        {
          "type": "autoscale_disk",
          "cap_gb": 500
        }
      ]
    }
  }'
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service integration-endpoint-update ENDPOINT_ID \
  --user-config-json '{"autoscaling": [{"type": "autoscale_disk", "cap_gb": 500}]}'
```

</TabItem>
<TabItem value="terraform" label="Terraform">

Update the `cap_gb` value in the `autoscaling` block of your
[`aiven_service_integration_endpoint`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration_endpoint)
resource, then apply the change.

</TabItem>
</Tabs>

### Turn off disk autoscaling

To turn off disk autoscaling, remove the autoscaler integration from your service. You
can also delete the integration endpoint if you no longer need it.

<Tabs groupId="disk-autoscaler">
<TabItem value="console" label="Console" default>

Disconnect the service from the autoscaler:

1. On the left sidebar, click <ConsoleLabel name="services"/>, and open your service.
1. On the left sidebar, click <ConsoleLabel name="integrations"/>.
1. In **Endpoint integrations**, find **Aiven Autoscaler**, click
   <ConsoleLabel name="actions"/>, and click the option to disconnect it.

Delete the autoscaler endpoint, if you no longer need it:

1. On the left sidebar, click <ConsoleLabel name="integration endpoints"/>.
1. Click **Aiven Autoscaler**.
1. Find your endpoint, and delete it.

</TabItem>
<TabItem value="api" label="API">

1. Call
   [ServiceIntegrationDelete](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationDelete)
   to remove the autoscaler integration from your service:

   ```bash
   curl --request DELETE \
     --url https://api.aiven.io/v1/project/PROJECT_NAME/integration/INTEGRATION_ID \
     --header "Authorization: Bearer TOKEN"
   ```

1. Call
   [ServiceIntegrationEndpointDelete](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationEndpointDelete)
   to delete the autoscaler integration endpoint, if you no longer need it:

   ```bash
   curl --request DELETE \
     --url https://api.aiven.io/v1/project/PROJECT_NAME/integration_endpoint/ENDPOINT_ID \
     --header "Authorization: Bearer TOKEN"
   ```

</TabItem>
<TabItem value="cli" label="CLI">

1. Find the ID of the integration to remove:

   ```bash
   avn service integration-list SERVICE_NAME
   ```

1. Remove the autoscaler integration from your service:

   ```bash
   avn service integration-delete INTEGRATION_ID
   ```

1. Find the ID of the integration endpoint to delete, if you no longer need it:

   ```bash
   avn service integration-endpoint-list --project PROJECT_NAME
   ```

1. Delete the autoscaler integration endpoint:

   ```bash
   avn service integration-endpoint-delete ENDPOINT_ID
   ```

</TabItem>
</Tabs>
