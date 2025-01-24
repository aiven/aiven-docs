import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::important

- Before you delete a project VPC, move all services out of this VPC.
- Once a project VPC is deleted, the cloud-provider side of the peering connections
becomes `inactive` or `deleted`.

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
