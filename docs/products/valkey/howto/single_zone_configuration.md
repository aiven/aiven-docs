---
title: Set up single-zone configuration for Aiven for Valkey™
sidebar_label: Set up single zone
---

import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Deploy single-node Aiven for Valkey™ services within a specific availability zone (AZ) of your chosen cloud provider.

The single-zone configuration feature provides location hints for resource allocation,
which can be beneficial for specific use cases such as reducing latency to applications in
the same AZ or managing costs.

## Use cases

- **Latency optimization**: Deploy your service in the same availability zone as your
  application to minimize network latency.
- **Cost management**: Reduce cross-AZ data transfer costs by keeping your service and
  application in the same zone.
- **Regulatory requirements**: Meet data locality requirements that specify particular
  availability zones.

## Important considerations

- **Best-effort allocation**: The single-zone configuration is a best-effort feature.
  While Aiven attempts to honor your zone preference, the service may be temporarily
  allocated to a different AZ in cases of capacity limitations or infrastructure
  constraints.
- **Single-node plans only**: This feature is available exclusively for single-node plans.
  By choosing a single-node plan, you accept that high availability is not part of the
  service offering.
- **No high availability**: Single-node services do not provide automatic failover or
  redundancy. For production workloads requiring high availability, use multi-node plans
  with automatic zone spreading.
- **Configuration at service creation**: The single-zone setting can only be configured
  when creating a new service. Updating this configuration for existing services is not
  supported.

## Prerequisites

Access to one of the following tools:

- [Aiven Console](https://console.aiven.io/)
- [Aiven CLI](/docs/tools/cli)
- [Aiven API](/docs/tools/api)
- [Aiven Provider for Terraform](/docs/tools/terraform)
- [Aiven Operator for Kubernetes®](/docs/tools/kubernetes)

## Enable single-zone configuration

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

Use the Aiven Console:

1. Navigate to **Services** in your Aiven project
1. Click **Create service**
1. Select **Valkey** as the service type
1. Choose a **single-node plan** from the available options
1. In the **Advanced Configuration** section, locate **Single-zone configuration**
1. Toggle **Enabled** to `true`
1. (Optional) Specify an **Availability zone** from your cloud provider's available zones
   - If not specified, a random AZ will be selected
1. Complete the service creation process

</TabItem>
<TabItem value="api" label="API">

Using the Aiven API, make a POST request to create a service:

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/service \
  -H "Authorization: Bearer BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "service_name": "my-valkey-service",
    "service_type": "valkey",
    "plan": "startup-4",
    "cloud": "aws-eu-central-1",
    "user_config": {
      "single_zone": {
        "enabled": true,
        "availability_zone": "euc1-az1"
      }
    }
  }'
```

</TabItem>
<TabItem value="cli" label="CLI">

Using the Aiven CLI:

- Create a service with the single-zone configuration enabled:

  ```bash
  avn service create my-valkey-service \
    --service-type valkey \
    --plan startup-4 \
    --cloud aws-eu-central-1 \
    -c single_zone.enabled=true \
    -c single_zone.availability_zone=euc1-az1
  ```

- Or enable single-zone without specifying a particular AZ (random selection):

  ```bash
  avn service create my-valkey-service \
    --service-type valkey \
    --plan startup-4 \
    --cloud aws-eu-central-1 \
    -c single_zone.enabled=true
  ```

</TabItem>
<TabItem value="tf" label="Terraform">

Using Terraform:

- Add the following configuration to your Terraform file:

  ```hcl
  resource "aiven_valkey" "my_valkey" {
    project                 = var.project_name
    cloud_name              = "aws-eu-central-1"
    plan                    = "startup-4"
    service_name            = "my-valkey-service"

    valkey_user_config {
      single_zone {
        enabled           = true
        availability_zone = "euc1-az1"
      }
    }
  }
  ```

- Or omit the `availability_zone` parameter for random AZ selection:

  ```hcl
  resource "aiven_valkey" "my_valkey" {
    project                 = var.project_name
    cloud_name              = "aws-eu-central-1"
    plan                    = "startup-4"
    service_name            = "my-valkey-service"

    valkey_user_config {
      single_zone {
        enabled = true
      }
    }
  }
  ```

</TabItem>
<TabItem value="k8s" label="Kubernetes">

Using Kubernetes Operator, create a Kubernetes manifest for your service:

```yaml
apiVersion: aiven.io/v1alpha1
kind: Valkey
metadata:
  name: my-valkey-service
spec:
  project: my-aiven-project
  cloudName: aws-eu-central-1
  plan: startup-4

  userConfig:
    single_zone:
      enabled: true
      availability_zone: euc1-az1
```

Apply the manifest:

```bash
kubectl apply -f valkey-service.yaml
```

</TabItem>
</Tabs>

## Configuration parameters

### `single_zone.enabled`

- **Type**: Boolean
- **Required**: Yes (to enable the feature)
- **Description**: Determines whether to allocate service nodes in the same availability
  zone. When `false` or not set, service nodes are spread across different AZs (default
  behavior for multi-node plans).
- **Example**: `true`

### `single_zone.availability_zone`

- **Type**: String
- **Required**: No
- **Max Length**: 40 characters
- **Description**: The preferred availability zone for the service. Only used when
  `enabled` is set to `true`. If not specified, a random AZ is selected.
- **Validation**: Zones are not validated. Invalid zones are ignored, and the system falls
  back to random AZ selection.
- **Examples**:
  - **AWS**: `euc1-az1`, `euc1-az2`, `euc1-az3`, `use1-az1`, `use1-az2`
  - **GCP**: `europe-west1-a`, `europe-west1-b`, `europe-west1-c`, `us-central1-a`
  - **Azure**: `germanywestcentral/1`, `germanywestcentral/2`, `germanywestcentral/3`,
    `eastus/1`

## Limitations and restrictions

- **Single-node plans only**: The feature is exclusively available for single-node service
  plans.
- **Creation time only**: The configuration can only be set during service creation.
  Existing services cannot be updated to enable or modify single-zone settings.
- **No guarantees**: The specified availability zone is treated as a preference, not a
  guarantee. The service may be placed in a different zone due to:
  - Capacity constraints in the requested zone
  - Infrastructure maintenance or issues
  - Cloud provider limitations
- **Zone validation**: Invalid or unavailable zone identifiers are silently ignored,
  falling back to random zone selection.
- **No high availability**: Single-node services do not provide automatic failover. For
  production workloads, consider multi-node plans.

## Migration and updates

- **Existing services**: Services created before this feature was introduced cannot be
  updated to use single-zone configuration
- **Plan changes**: Upgrading from a single-node to a multi-node plan will disable
  single-zone configuration, and nodes will be spread across availability zones
- **Service updates**: Other service configuration changes (such as maintenance windows,
  IP filters, or Valkey settings) can be updated normally without affecting the
  single-zone setting

## Best practices

- **Use for development and testing**: Single-node configurations are ideal for
  development, testing, and non-critical workloads.
- **Multi-zone for production**: For production workloads requiring high availability,
  use multi-node plans that spread nodes across availability zones.
- **Co-locate with applications**: When using single-zone configuration, deploy your
  applications in the same availability zone to maximize latency benefits.
- **Monitor service health**: Implement appropriate monitoring and alerting for
  single-node services, as they lack automatic failover capabilities.
- **Plan for zone selection**: Research your cloud provider's availability zones in
  advance to choose the most appropriate zone for your use case.

## Troubleshooting

### Service is not in the specified availability zone

**Cause**: The specified zone may be at capacity, unavailable, or the zone identifier may
be invalid.

**Resolution**: The service will operate normally in an alternative zone. If zone
placement is critical, contact Aiven support to discuss availability in your preferred
zone.

### Cannot update single-zone configuration on existing service

**Cause**: Single-zone configuration is immutable after service creation.

**Resolution**: To change the configuration, create a new service with the desired
settings and migrate your data.

### Feature not available for my plan

**Cause**: Single-zone configuration is only available for single-node plans.

**Resolution**: Select a single-node plan (such as `startup-4` or `business-4`) when
creating your service.

<RelatedPages/>

- [Aiven for Valkey™ overview](https://aiven.io/docs/products/valkey)
- [Aiven for Valkey™ service plans](https://aiven.io/docs/products/valkey/concepts/service-plans)
- [High availability in Aiven](https://aiven.io/docs/platform/concepts/high-availability)
- [Cloud provider regions](https://aiven.io/docs/platform/reference/list-of-clouds)
