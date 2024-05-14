---
title: Adjust disk storage automatically
limited: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"

Service disk autoscaler allows you to scale your services by increasing disk storage capacity automatically when the disk is running out of space.

:::note[Pricing]
The disk autoscaler base pricing depends on your service type and plan.

You're only charged for additional storage space actually provisioned
for your service, just like the [dynamic disk sizing (DDS)](/docs/platform/howto/add-storage-space) feature
listed on [Aiven Plans and Pricing](https://aiven.io/pricing?product=kafka).
:::

## Why use disk autoscaling

-   Disk autoscaling allows you to improve the cost-efficiency of
    operating your Aiven services: You can start with a regular-sized
    disk and only have it scaled up when needed with no risk of running
    out of disk space at any point.
-   Disk autoscaling helps improve service resiliency eliminating the
    risk of a service becoming non-functional as a consequence of
    running out of disk space. Use disk autoscaling to make sure your
    service remains operational in case of unexpected high demand for
    disk space.

:::note
Service disk autoscaler doesn't support scaling down.
:::

## How it works

1.  You create a disk autoscaler integration endpoint in your Aiven
    project setting the maximum additional storage at the same time.
1.  You enable a disk autoscaler integration for your service using the
    new disk autoscaler integration endpoint.
1.  From that point onward, the evaluation of disk space availability
    for your service is done every 30 seconds.
1.  When disk storage consumption reaches the threshold for a specific
    service, disk autoscaler increases available storage space by 10%
    every time taking the used disk space as a baseline.

:::note[Autoscale thresholds per service type]
The threshold at which disk autoscaling is triggered is a percentage of
the available disk storage capacity and depends on a service type:

-   Aiven for Apache Cassandra®: 35% of the available disk storage
    capacity
-   Aiven for OpenSearch®: 75% of the available disk storage capacity
-   All the other Aiven service types: 85% of the available disk storage
    capacity
:::

## Prerequisites

-   This is a
    [limited availability feature](/docs/platform/concepts/beta_services). To try it out,
    contact the sales team at [sales@aiven.io](mailto:sales@aiven.io).
-   Aiven organization, project, and service up and running.
-   [Dynamic disk sizing (DDS)](/docs/platform/howto/add-storage-space) supported for
    the service plan and the cloud hosting the service.
-   Role of the operator for your Aiven organization, project, and
    service.
-   Depending on what interface you'd like to use for interacting with
    disk autoscaler:
    -   Access to [Aiven Console](https://console.aiven.io/)
    -   [Aiven API](https://api.aiven.io/doc/)
    -   [Aiven CLI client](/docs/tools/cli)

## Enable disk autoscaling

To enable disk autoscaling on your Aiven service, create an
autoscaler integration endpoint and enable autoscaler integration with
your service using the new endpoint.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

Create an autoscaler endpoint:

1.  Log in to [Aiven Console](https://console.aiven.io/) and go to
    a desired organization and project.
1.  On the left sidebar, click <ConsoleLabel name="integration endpoints"/>.
1.  Click **Aiven Autoscaler** > **Add new endpoint**.
1.  Set the details of the endpoint and click **Add endpoint**.

Enable on a service:

1.  On the left sidebar, click <ConsoleLabel name="services"/>and open your service.
1.  On the left sidebar, click <ConsoleLabel name="integrations"/> and in **Endpoint integrations**,
    click **Aiven autoscaler**.
1.  Select the appropriate endpoint name and click **Enable**.

</TabItem>
<TabItem value="api" label="API">

To enable disk autoscaler on your service via [Aiven
API](https://api.aiven.io/doc/), call the
[ServiceIntegrationEndpointCreate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationEndpointCreate)
endpoint on your project and, next, the
[ServiceIntegrationCreate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationCreate)
endpoint to create an autoscaler integration on your service.

1.  Call the
    [ServiceIntegrationEndpointCreate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationEndpointCreate)
    endpoint on your project passing the following in the request body:

    -   Endpoint name (path and request body parameters)
    -   `endpoint_type` (request body): `disk_storage`
    -   `max_additional_storage` (request body > `user_config` object)

    ```bash
    curl --request POST \
      --url https://api.aiven.io/v1/project/{project_name}/integration_endpoint \
      --header 'Authorization: Bearer REPLACE_WITH_YOUR_BEARER_TOKEN' \
      --header 'content-type: application/json' \
      --data
         '{
            "endpoint_name": "REPLACE_WITH_ENDPOINT_NAME",
            "endpoint_type": "disk_storage",
            "user_config": {
              "autoscaler": {
                "max_additional_storage": "REPLACE_WITH_DESIRED_VALUE_IN_GB"
              }
            }
          }'
    ```

1.  Call the
    [ServiceIntegrationCreate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationCreate)
    endpoint on your service passing the following in the request body:

    -   `dest_endpoint_id`: ID of your new autoscaler integration
        endpoint
    -   `integration_type`: `autoscaler`
    -   `source_project`: the name of a project your autoscaler endpoint
        is created for.
    -   `source_service`: the name of a service to enable autoscaler for.

    ```bash
    curl --request POST \
      --url https://api.aiven.io/v1/project/{project_name}/integration \
      --header 'Authorization: Bearer REPLACE_WITH_YOUR_BEARER_TOKEN' \
      --header 'content-type: application/json' \
      --data
         '{
            "dest_endpoint_id": "REPLACE_WITH_YOUR_NEW_AUTOSCALER_ENDPOINT_ID",
            "integration_type": "autoscaler",
            "source_project": "REPLACE_WITH_PROJECT_NAME",
            "source_service": "REPLACE_WITH_SERVICE_NAME"
         }'
    ```

</TabItem>
<TabItem value="cli" label="CLI">

You can enable disk autoscaler for your service with the
[Aiven CLI client](/docs/tools/cli) by
run the commands to create the following:

- Autoscaler integration endpoint on your project: [avn service integration-endpoint-create](/docs/tools/cli/service/integration#avn_service_integration_endpoint_create)
- Autoscaler integration on your service using the new autoscaler integration endpoint: [avn service integration-create](/docs/tools/cli/service/integration#avn_service_integration_create)

1.  Run the following command to create an autoscaler integration
    endpoint on your project:

    ```bash
    avn service integration-endpoint-create                                                   \
       --project YOUR_PROJECT_NAME                                                            \
       --endpoint-name DESIRED_ENDPOINT_NAME                                                  \
       --endpoint-type disk_storage                                                           \
       --user-config-json '{"max_additional_storage":"REPLACE_WITH_DESIRED_VALUE_IN_GB"}'
    ```

1.  Run
    [avn service integration-endpoint-list](/docs/tools/cli/service/integration#avn_service_integration_endpoint_list) to retrieve the identifier of the new endpoint:

    ```shell
    avn service integration-endpoint-list --project YOUR_PROJECT_NAME
    ```

1.  To create an autoscaler integration on
    your service using the new autoscaler integration endpoint, run:

    ```bash
    avn service integration-create
       --dest-service YOUR_SERVICE_NAME                             \
       --integration-type autoscaler                                \
       --source-endpoint-id ID_OF_AUTOSCALER_INTEGRATION_ENDPOINT
    ```

</TabItem>
</Tabs>

## Configure disk autoscaler

After enabling disk autoscaler, you can always update the
maximum additional disk storage allowed for autoscaling purposes. You
can use [Aiven Console](https://console.aiven.io/), Aiven API, or Aiven
CLI to do that.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1.  Log in to [Aiven Console](https://console.aiven.io/) and go to
    a desired organization and project.
1.  On the left sidebar, click <ConsoleLabel name="integration endpoints"/>.
1.  Click **Aiven Autoscaler**.
1.  Find your endpoint on the list, and click <ConsoleIcon name="edit"/>.
1.  Specify a new value for the maximum additional disk storage to be allowed for
    autoscaling, and click **Update**.

</TabItem>
<TabItem value="api" label="API">

You can use [Aiven API](https://api.aiven.io/doc/) to configure the
maximum additional disk storage allowed for autoscaling purposes on your
service.

Call the
[ServiceIntegrationEndpointUpdate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationEndpointUpdate)
endpoint passing the following parameters in your request:

-   `project_name` (path parameter)
-   `integration_endpoint_id` (path parameter)
-   `max_additional_storage` (request body > `user_config` object)

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/{project_name}/integration_endpoint/{integration_endpoint_id} \
  --header 'Authorization: Bearer REPLACE_WITH_YOUR_BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data
     '{
        "user_config": {
          "autoscaler": {
            "max_additional_storage": "REPLACE_WITH_DESIRED_VALUE_IN_GB"
          }
        }
      }'
```

</TabItem>
<TabItem value="cli" label="CLI">

You can use the [Aiven CLI client](/docs/tools/cli) to configure the maximum
additional disk storage allowed for autoscaling purposes on your service.

Run [avn service
integration-endpoint-update](/docs/tools/cli/service/integration#avn-service-integration-endpoint-update)
passing a desired maximum additional disk storage as
`PARAMETER_VALUE_IN_GB`:

```bash
avn service integration-endpoint-update AUTOSCALER_ENDPOINT_ID
   --user-config-json '{"max_additional_storage":"PARAMETER_VALUE_IN_GB"}'
```

</TabItem>
</Tabs>

## Disable disk autoscaler

To disable disk autoscaling on your Aiven service,
disconnect the service from the autoscaler integration endpoint. You can
also delete the integration endpoint itself if you don't need it for
future purposes.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

Update the service:

1.  Log in to [Aiven Console](https://console.aiven.io/) and go to
    a desired organization, project.
1.  On the left sidebar, click <ConsoleLabel name="services"/> and open your service.
1.  On the left sidebar, click <ConsoleLabel name="integrations"/> and in **Endpoint integrations**,
    find your autoscaler service and click <ConsoleLabel name="actions"/> > **Disconnect**.

Delete the autoscaler endpoint:

1.  Open your project.
1.  On the left sidebar, click <ConsoleLabel name="integration endpoints"/>.
1.  On the **Integration endpoints** page, click **Disk autoscaler**.
1.  Find your endpoint on the list and click <ConsoleIcon name="trash"/>.

</TabItem>
<TabItem value="api" label="API">

To disable disk autoscaler on your service via [Aiven
API](https://api.aiven.io/doc/), call the
[ServiceIntegrationDelete](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationDelete)
endpoint to delete an autoscaler integration on your service and, next,
the
[ServiceIntegrationEndpointDelete](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationEndpointDelete)
endpoint on your project to delete the autoscaler integration endpoint
if you don't need it for any future purposes.

[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint passing `{"service disk autoscaler": {"enabled": true}}` in the
`user_config` object.

1.  Call the
    [ServiceIntegrationDelete](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationDelete)
    endpoint on your service passing the following in the request body:

    -   `project_name` (path parameter): the name of a project in which
        your autoscaler service integration is enabled
    -   `integration_id` (path parameter): ID of an autoscaler service
        integration to disable

    ```bash
    curl --request DELETE \
      --url https://api.aiven.io/v1/project/{project_name}/integration/{integration_id} \
      --header 'Authorization: Bearer REPLACE_WITH_YOUR_BEARER_TOKEN'
    ```

1.  Call the
    [ServiceIntegrationEndpointDelete](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationEndpointDelete)
    endpoint on your project passing the following in the request body:

    -   `project_name` (path parameter): the name of a project in which
        your autoscaler integration endpoint is created
    -   `integration_endpoint_id` (path parameter): ID of an autoscaler
        integration endpoint to delete

    ```bash
    curl --request DELETE \
      --url https://api.aiven.io/v1/project/{project_name}/integration_endpoint/{integration_endpoint_id} \
      --header 'Authorization: Bearer REPLACE_WITH_YOUR_BEARER_TOKEN'
    ```

</TabItem>
<TabItem value="cli" label="CLI">

You can disable disk autoscaler on your service with the
[Aiven CLI client](/docs/tools/cli) by
running the commands to delete the following:

-   Autoscaler integration on your service
-   Autoscaler integration endpoint on your project (if you don't need
    the autoscaler integration endpoint on your project for any future
    purposes).

1.  Retrieve the ID of an integration to disable:

    ```bash
    avn service integration-list SERVICE_NAME
    ```

1.  Delete an autoscaler integration on your service:

    ```bash
    avn service integration-delete INTEGRATION_ID
    ```

1.  Retrieve the ID of an autoscaler integration endpoint to
    delete:

    ```bash
    avn service integration-endpoint-list PROJECT_NAME
    ```

1.  Delete an autoscaler integration endpoint on your project:

    ```bash
    avn service integration-endpoint-delete ENDPOINT_ID
    ```

</TabItem>
</Tabs>

## Related pages

[Dynamic disk sizing (DDS)](/docs/platform/howto/add-storage-space)
