---
title: Manage a service in a VPC
sidebar_label: Manage VPC services
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CreateService from "@site/static/includes/create-service-console.md";
import RelatedPages from "@site/src/components/RelatedPages";

Set up or delete a project-wide VPC in your Aiven organization. Deploy or migrate Aiven-managed services to your project VPC. Access resources within the project VPC from the public internet.

## Prerequisites

- [Networking permissions](/docs/platform/concepts/permissions)
- Tool for operating services and VPCs:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)

## Create a service in a VPC

Your project VPC is available as a geolocation (cloud region) for the new service.

:::note
You can create a service in a project VPC only if it is in the same project
where you are creating the service.
:::

Create a service in a project VPC using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

Set your project VPC as a cloud region for the new service:

<CreateService />

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run [avn service create](/docs/tools/cli/service-cli#avn-cli-service-create):

```bash
avn service create SERVICE_NAME        \
  --project PROJECT_NAME               \
  --project-vpc-id PROJECT_VPC_ID      \
  --service-type SERVICE_TYPE          \
  --plan SERVICE_PLAN                  \
  --cloud CLOUD_PROVIDER_REGION
```

Replace the following:

- `SERVICE_NAME` with the name of the service to be created, for example,
  `pg-vpc-test`
- `PROJECT_NAME` with the name of the project where to create the service, for example,
  `pj-test`
- `PROJECT_VPC_ID` with the ID of your project VPC, for example,
  `12345678-1a2b-3c4d-5f6g-1a2b3c4d5e6f`
- `SERVICE_TYPE` with the type of the service to be created, for example, `pg`
- `SERVICE_PLAN` with the plan of the service to be created, for example, `hobbyist`
- `CLOUD_PROVIDER_REGION` with the cloud provider and region to host the service to be
  created, for example `aws-eu-west-1`

</TabItem>
<TabItem value="api" label="Aiven API">

Make an API call to the
[ServiceCreate endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate)
endpoint:

```bash {12}
curl --request POST \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data-raw '
    {
      "service_name": "SERVICE_NAME",
      "cloud": "CLOUD_PROVIDER_REGION",
      "plan": "SERVICE_PLAN",
      "service_type": "SERVICE_TYPE",
      "disk_space_mb": DISK_SIZE,
      "project_vpc_id":"PROJECT_VPC_ID"
    }
  '
```

Replace the following placeholders with meaningful data:

- `PROJECT_NAME`, for example `org-vpc-test`
- `BEARER_TOKEN`
- `SERVICE_NAME`, for example `org-vpc-test-project`
- `CLOUD_PROVIDER_REGION`, for example `google-europe-west10`
- `SERVICE_PLAN`, for example `startup-4`
- `SERVICE_TYPE`, for example `pg`
- `DISK_SIZE` in MiB, for example `81920`
- `PROJECT_VPC_ID`

</TabItem>
</Tabs>

## Migrate a service to a VPC

Your project VPC is available as a geolocation (cloud region) for your service.

:::note
You can migrate a service to a project VPC only if the project VPC is in the
same project running your service.
:::

Migrate a service to a project VPC using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. In [Aiven Console](https://console.aiven.io/), open your service page and click
   <ConsoleLabel name="Service settings"/>.
1. In the **Cloud and network** section, click <ConsoleLabel name="actions"/> >
   **Change cloud or region**.
1. In the **Region** section, go to the **VPCs** tab, select your project VPC and
   click **Migrate**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update):

```bash
avn service update SERVICE_NAME \
  --project-vpc-id PROJECT_VPC_ID
```

Replace the following:

- `SERVICE_NAME` with the name of the service to be migrated, for example,
  `pg-test`
- `PROJECT_VPC_ID` with the ID of your project VPC where to migrate the service,
  for example, `12345678-1a2b-3c4d-5f6g-1a2b3c4d5e6f`

</TabItem>
<TabItem value="api" label="Aiven API">

Call the [ServiceUpdte endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
to set `project_vpc_id` of the service to the ID of your project VPC:

```bash {5}
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  -H 'Authorization: Bearer BEARER_TOKEN' \
  -H 'content-type: application/json' \
  --data '{"project_vpc_id": "PROJECT_VPC_ID"}'
```

Replace the following placeholders with meaningful data:

- `PROJECT_NAME`, for example `org-vpc-test`
- `SERVICE_NAME`, for example `org-vpc-service`
- `BEARER_TOKEN`
- `PROJECT_VPC_ID`

</TabItem>
</Tabs>

## Migrate a service deployed in a VPC to another cloud

Aiven doesn't natively support automatic migration of a service from a VPC in one cloud
provider to another. The migration is possible manually:

1. [Create a new service in the destination cloud/VPC](/docs/platform/howto/vpc-service-management#create-a-service-in-a-vpc).
1. Set up replication or export/import, depending on the service:
   1. Aiven for PostgreSQL®, Aiven for MySQL® or similar: Use `pg_dump`, `pg_restore`,
      logical replication, or Aiven’s replication features.
   1. Aiven for Apache Kafka®: Use
      [Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker) or
      Confluent Replicator.
1. Sync data and test the new setup.
1. Cut over traffic to the new service.
1. Decommission the old service.

:::note
Aiven support can assist you with best practices and migration guidance.
:::

## Access a service deployed in a VPC from the public internet

When you move your service to a VPC, access from public networks is
blocked by default. If you switch to public access, a separate endpoint
is created with a public prefix. You can enable public internet access
for your services by following the
[Enable public access in a VPC](/docs/platform/howto/public-access-in-vpc) instructions.

IP filtering is available for a service deployed to a VPC. It's recommended to
[use IP filtering](/docs/platform/howto/restrict-access#restrict-access) when your VPC
service is also exposed to the public internet.

:::note
If your service is within a VPC, the VPC configuration filters incoming traffic before the
IP filter is applied.
:::

Safelisting applies to both internal and external traffic. If you
safelist an external IP address and want to keep traffic flowing with
the internal (peered) connections, safelist the CIDR blocks of the peered networks as well
to avoid disruptions to the service.
