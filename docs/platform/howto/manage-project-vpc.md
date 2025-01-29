---
title: Manage project virtual private clouds (VPCs) in Aiven
sidebar_label: Manage project VPCs
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import CreateService from "@site/static/includes/create-service-console.md";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up or delete a project-wide VPC in your Aiven organization. Deploy or migrate Aiven-managed services to your project VPC. Access resources within the project VPC from the public internet.

## Prerequisites

- [Manage project networking](/docs/platform/concepts/permissions#project-permissions)
  permissions
- One of the following tools for operating project VPCs:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)

## Create a project VPC

Create a project VPC using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>
1.  Log in to [Aiven Console](https://console.aiven.io/), go to your project page, and
    click <ConsoleLabel name="vpcs"/> in the sidebar.

1.  On the **Virtual private clouds** page, click **Create VPC**.

1.  In the **Create VPC** window:

    1. Select a cloud provider and region.

    1. Enter the IP range.
       Use an IP range that does not overlap with any networks that you
       want to connect via VPC peering.

       For example, if your own
       networks use the range `11.1.1.0/8`, you can set
       the range for your Aiven project's VPC to
       `191.161.1.0/24`.

       :::note
       Network prefix length must be between 20 and 24 inclusive.
       :::

1.  Click **Create VPC**.

The state of the VPC is shown in the table.

</TabItem>
<TabItem value="cli" label="Aiven CLI">
Run the
[avn vpc create](/docs/tools/cli/vpc#avn-vpc-create)
command:

```bash
avn vpc create                  \
  --cloud CLOUD_PROVIDER_REGION \
  --network-cidr NETWORK_CIDR   \
  --project PROJECT_NAME
```

Replace the following:

- `CLOUD_PROVIDER_REGION` with the cloud provider and region to host the VPC, for example
  `aws-eu-west-1`
- `NETWORK_CIDR` with the CIDR block (a range of IP addresses) for the VPC, for example,
  `10.0.0.0/24`
- `PROJECT_NAME` with the name of your Aiven project where to create the VPC

</TabItem>
<TabItem value="api" label="Aiven API">

Make an API call to the
[VpcCreate](https://api.aiven.io/doc/#tag/Project/operation/VpcCreate) endpoint:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/project/PROJECT_ID/vpcs \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '
    {
      "cloud_name": "CLOUD_PROVIDER_REGION",
      "network_cidr": "NETWORK_CIDR"
    }
  '
```

Replace `PROJECT_ID`, `BEARER_TOKEN`, `CLOUD_PROVIDER_REGION`, and `NETWORK_CIDR` with
meaningful data.

</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">
Use the
[aiven_project_vpc](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/project_vpc)
resource.
</TabItem>
</Tabs>

## Create a service in a project VPC

Your project VPC is available as a geolocation (cloud region) for the new service.

:::note
You can only create a service in a project VPC if the project VPC is located in
the project where to create the service.
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
  --type SERVICE_TYPE                  \
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

## Migrate a service to a project VPC

Your project VPC is available as a geolocation (cloud region) for your service.

:::note
You can only migrate a service to a project VPC if the project VPC is located in
the project where your service runs.
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

## Delete a project VPC

:::important
Remove all services from your VCP before you delete it. To remove the services from the VCP,
either migrate them out of the VCP or delete them. Deleting the VPC terminates its peering
connections, if any.
:::

Delete a project VPC using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. Log in to [Aiven Console](https://console.aiven.io/), and go to your project.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, find a VPC to be deleted and click
   <ConsoleLabel name="actions"/> > <ConsoleLabel name="delete"/>.
1. In the **Confirmation** window, click **Delete VPC**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the [avn vpc delete](/docs/tools/cli/vpc#avn-vpc-delete) command:

```bash
avn vpc delete                    \
  --project-vpc-id PROJECT_VPC_ID
```

Replace `PROJECT_VPC_ID` with the ID of your Aiven project VPC, for example,
`12345678-1a2b-3c4d-5f6g-1a2b3c4d5e6f`.

</TabItem>
<TabItem value="api" label="Aiven API">

Make an API call to the
[VpcDelete](https://api.aiven.io/doc/#tag/Project/operation/VpcDelete) endpoint:

```bash
curl --request DELETE \
  --url https://api.aiven.io/v1/project/PROJECT_ID/vpcs/PROJECT_VPC_ID \
  --header 'Authorization: Bearer BEARER_TOKEN' \
```

Replace the following placeholders with meaningful data:

- `PROJECT_ID` (Aiven project name)
- `PROJECT_VPC_ID` (Aiven project VPC ID)
- `BEARER_TOKEN`

</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">
To delete your
[aiven_project_vpc](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/project_vpc)
resource, run `terraform destroy`.
</TabItem>
</Tabs>

## Access project VPC services from the public internet

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
