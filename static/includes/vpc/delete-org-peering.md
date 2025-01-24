import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::important

- Before deleting an organization VPC, move all services out of this VPC.
- Once an organization VPC is deleted, the cloud-provider side of the peering connections
  becomes `inactive` or `deleted`.

:::

Delete an organization VPC peering using a tool of your choice:

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
  --project-vpc-id ORGANIZATION_VPC_ID
```

Replace the following:

- `ORGANIZATION_ID` with the ID of your Aiven organization, for example, `org1a2b3c4d5e6`
- `ORGANIZATION_VPC_ID` with the ID of your Aiven organization VPC, for example,
  `12345678-1a2b-3c4d-5f6g-1a2b3c4d5e6f`

</TabItem>
<TabItem value="api" label="Aiven API">

Make an API call to the `OrganizationVpcDelete` endpoint:

```bash
curl --request DELETE \
  --url https://api.aiven.io/v1/organization/ORGANIZATION_ID/vpcs/VPC_ID \
  --header 'Authorization: Bearer BEARER_TOKEN' \
```

Replace the following placeholders with meaningful data:

- `ORGANIZATION_ID`
- `VPC_ID`
- `BEARER_TOKEN`

</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">
To delete your
[aiven_organization_vpc](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/project_vpc)
resource, run `terraform destroy`.
</TabItem>
</Tabs>
