import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::important
Once you delete your VPC peering on the Aiven Platform, the cloud-provider side of the
peering connection becomes `inactive` or `deleted`, and the traffic between the disconnected
VPCs is terminated.
:::

Delete a project VPC peering using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your project page.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, select a project VPC.
1. On the **VPC details** page, go to the **VPC peering connections** section,
   find the peering to be deleted, and click <ConsoleLabel name="actions"/> >
   <ConsoleLabel name="delete"/>.
1. In the **Confirmation** window, click **Delete VPC peering**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the
[avn vpc peering-connection delete](/docs/tools/cli/vpc#avn-vpc-peering-connection-delete)
command:

```bash
avn vpc peering-connection delete         \
  --project-vpc-id PROJECT_VPC_ID         \
  --peer-cloud-account PEER_CLOUD_ACCOUNT \
  --peer-vpc PEER_VPC_ID
```

Replace the following with meaningful values:

- `PROJECT_VPC_ID`, for example `12345678-1a2b-3c4d-5f6g-1a2b3c4d5e6f`
- `PEER_CLOUD_ACCOUNT`, for example `012345678901`
- `PEER_VPC_ID`, for example `vpc-abcdef01234567890`

</TabItem>
<TabItem value="api" label="Aiven API">

Make an API call to the
[VpcPeeringConnectionDelete](https://api.aiven.io/doc/#tag/Project/operation/VpcPeeringConnectionDelete)
endpoint:

```bash
curl --request DELETE \
  --url https://api.aiven.io/v1/project/PROJECT_ID/vpcs/PROJECT_VPC_ID \
  --header 'Authorization: Bearer BEARER_TOKEN' \
```

```bash
curl --request DELETE \
  --url https://api.aiven.io/v1/project/PROJECT_ID/vpcs/PROJECT_VPC_ID/peering-connections/peer-accounts/PEER_CLOUD_ACCOUNT/peer-vpcs/PEER_VPC \
  --header 'Authorization: Bearer BEARER_TOKEN'
```

Replace the following placeholders with meaningful data:

- `PROJECT_ID`: Aiven project name
- `PROJECT_VPC_ID`: Aiven project VPC ID
- `PEER_CLOUD_ACCOUNT`: your cloud provider account ID or name
- `PEER_VPC`: your cloud provider VPC ID or name
- `BEARER_TOKEN`

</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">
To delete your Aiven project VPC peering connection resource, run `terraform destroy`.
See the
[Aiven Provider for Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
for details.
</TabItem>
</Tabs>
