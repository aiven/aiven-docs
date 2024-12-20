---
title: Manage organization virtual private clouds (VPCs) in Aiven
sidebar_label: Manage organization VPCs
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up or delete an organization-wide VPC in the Aiven Platform. Enable new Aiven projects in the organization VPC or migrate existing Aiven projects to the organization VPC. Access resources within the organization VPC from the public internet.

## Prerequisites

- [Super admin role](/docs/platform/howto/make-super-admin) to manage organization VPCs
- One of the following tools for operating organization VPCs:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)

## Create an organization VPC

Create an organization VPC using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and click **Admin** in the
   top navigation bar.
1. Click <ConsoleLabel name="organizationvpcs"/> in the sidebar and **Create VPC** on the
   **Organization VPCs** page.
1. In the **Create VPC** window:
   1. Select a cloud provider.
   1. Select a cloud region.
   1. Specify an IP range.

      - Use an IP range that does not overlap with any networks to be connected via VPC
        peering. For example, if your own networks use the range `11.1.1.0/8`, you can set
        the range for your Aiven project's VPC to `191.161.1.0/24`.
      - Use a network prefix that is 20-24 character long.

   1. Click **Create VPC**.

Your new organization VPC is ready to use as soon as its status visible on the
**Organization VPCs** page changes to **Active**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the `avn organization vpc create` command:

```bash
avn organization vpc create         \
  --cloud CLOUD_PROVIDER_REGION     \
  --network-cidr NETWORK_CIDR       \
  --organization-id ORGANIZATION_ID
```

Replace the following:

- `CLOUD_PROVIDER_REGION` with the cloud provider and region to host the VPC, for example
  `aws-eu-west-1`
- `NETWORK_CIDR` with the CIDR block (a range of IP addresses) for the VPC, for example,
  `10.0.0.0/24`
- `ORGANIZATION_ID` with the ID of your Aiven organization where to create the VPC, for
  example, `org1a2b3c4d5e6`

</TabItem>
<TabItem value="api" label="Aiven API">

Make an API call to the `OrganizationVpcCreate` endpoint:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/organization/ORGANIZATION_ID/vpcs \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '
    {
      "cloud_name": "CLOUD_PROVIDER_REGION",
      "network_cidr": "NETWORK_CIDR"
    }
  '
```

Replace the following placeholders with meaningful data:

- `ORGANIZATION_ID`
- `BEARER_TOKEN`
- `CLOUD_PROVIDER_REGION`
- `NETWORK_CIDR`

</TabItem>
</Tabs>

## Create a service in an organization VPC

Create a service in an organization VPC using a tool of your choice:

<!--
When you create a service, your peered VPC is available as a new
geolocation on the **VPC** tab under **Select service region**. It can
take a few minutes for a newly created VPC to appear for service
deployments.

:::note
The service nodes use firewall rules to allow only connections from
private IP ranges that originate from networks on the other end of VPC
peering connections. You can only deploy services to a VPC if they
belong to the project where that specific VPC was created.
:::
-->

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/).

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run [avn service create](/docs/tools/cli/service-cli#avn-cli-service-create):

```bash
avn service create SERVICE_NAME        \
  --project PROJECT_NAME               \
  --project-vpc-id ORGANIZATION_VPC_ID \
  --type SERVICE_TYPE                  \
  --plan SERVICE_PLAN                  \
  --cloud CLOUD_PROVIDER_REGION
```

Replace the following:

- `SERVICE_NAME` with the name of the service to be created, for example,
  `pg-vpc-test`
- `PROJECT_NAME` with the name of the project where to create the service, for example,
  `pj-test`
- `ORGANIZATION_VPC_ID` with the ID of your organization VPC, for example,
  `12345678-1a2b-3c4d-5f6g-1a2b3c4d5e6f`
- `SERVICE_TYPE` with the type of the service to be created, for example, `pg`
- `SERVICE_PLAN` with the plan of the service to be created, for example, `hobbyist`
- `CLOUD_PROVIDER_REGION` with the cloud provider and region to host the service to be
  created, for example `aws-eu-west-1`

</TabItem>
<TabItem value="api" label="Aiven API">

Call the
[ServiceCreate endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate) to
create a recovery service and enable the `disaster_recovery` service integration between
the recovery service and the primary service, for example:

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
      "project_vpc_id":"ORGANIZATION_VPC_ID"
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
- `ORGANIZATION_VPC_ID`

</TabItem>
</Tabs>

## Migrate a service to an organization VPC

<!--
You can migrate any Aiven service to a different VPC:

1. In [Aiven Console](https://console.aiven.io/), open your service and click <ConsoleLabel name="Service settings"/>.
1. In the **Cloud and
   network** section, click <ConsoleLabel name="actions"/> >  **Change cloud or region**.
1. In the **Region** section, select the **VPCs** tab, select the VPC and click **Migrate**.
-->

Migrate a service to an organization VPC using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/).

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update):

```bash
avn service update SERVICE_NAME        \
  --project-vpc-id ORGANIZATION_VPC_ID
```

Replace the following:

- `SERVICE_NAME` with the name of the service to be migrated, for example,
  `pg-test`
- `ORGANIZATION_VPC_ID` with the ID of your organization VPC where to migrate the service,
  for example, `12345678-1a2b-3c4d-5f6g-1a2b3c4d5e6f`

</TabItem>
<TabItem value="api" label="Aiven API">

Call the [ServiceUpdte endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
to set `project_vpc_id` of the service to the ID of your organization VPC:

```bash {5}
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  -H 'Authorization: Bearer BEARER_TOKEN' \
  -H 'content-type: application/json' \
  --data '{"project_vpc_id": "ORGANIZATION_VPC_ID"}'
```

Replace the following placeholders with meaningful data:

- `PROJECT_NAME`, for example `org-vpc-test`
- `SERVICE_NAME`, for example `org-vpc-service`
- `BEARER_TOKEN`
- `ORGANIZATION_VPC_ID`

</TabItem>
</Tabs>

## Delete an organization VPC

:::important

- Before deleting an organization VPC, move all services out of this VPC.
- Once an organization VPC is deleted, the cloud-provider side of the peering connections
  becomes `inactive` or `deleted`.

:::

Delete an organization VPC using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and click **Admin** in the
   top navigation bar.
1. Click <ConsoleLabel name="organizationvpcs"/> in the sidebar.
1. On the **Organization VPCs** page, find a VPC to be deleted and click
   <ConsoleLabel name="actions"/> > <ConsoleLabel name="delete"/>.
1. In the **Confirmation** window, click **Delete VPC**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the `avn organization vpc delete` command:

```bash
avn organization vpc delete                     \
  --organization-id ORGANIZATION_ID             \
  --vpc-id VPC_ID
```

Replace the following:

- `ORGANIZATION_ID` with the ID of your Aiven organization, for example, `org1a2b3c4d5e6`
- `VPC_ID` with the ID of your Aiven organization VPC, for example,
  `12345678-1a2b-3c4d-5f6g-1a2b3c4d5e6f`

</TabItem>
<TabItem value="api" label="Aiven API">

Make an API call to the `OrganizationVpcDelete` endpoint:

```bash
curl --request DELETE \
  --url https://api.aiven.io/v1/organization/ORGANIZATION_ID/vpcs/ORGANIZATION_VPC_ID \
  --header 'Authorization: Bearer BEARER_TOKEN' \
```

Replace the following placeholders with meaningful data:

- `ORGANIZATION_ID`
- `ORGANIZATION_VPC_ID`
- `BEARER_TOKEN`

</TabItem>
</Tabs>

## Related pages

- [VPC peering](/docs/platform/howto/list-vpc-peering)
- [Manage organization VPC peering connections](/docs/platform/howto/manage-org-vpc-peering-aws)
