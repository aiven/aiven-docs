import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::important
Once you delete your VPC peering on the Aiven Platform, the cloud-provider side of the
peering connection becomes `inactive` or `deleted`, and the traffic between the disconnected
VPCs is terminated.
:::

Delete an organization VPC peering using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and click **Admin** in the
   top navigation bar.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, select an organization VPC.
1. On the **VPC details** page, go to the **VPC peering connections** section,
   find the peering to be deleted, and click <ConsoleLabel name="actions"/> >
   <ConsoleLabel name="delete"/>.
1. In the **Confirmation** window, click **Delete VPC peering**.

</TabItem>
<!--
<TabItem value="cli" label="Aiven CLI">

Run the `avn organization vpc peering-connection delete` command:

```bash
avn organization vpc peering-connection delete \
  --organization-id ORGANIZATION_ID            \
  --project-vpc-id ORGANIZATION_VPC_ID                 \
  --peering-connection-id ORGANIZATION_VPC_PEERING_ID
```

Replace the following:

- `ORGANIZATION_ID` with the ID of your Aiven organization, for example, `org1a2b3c4d5e6`
- `ORGANIZATION_VPC_ID` with the ID of your Aiven organization VPC, for example,
  `12345678-1a2b-3c4d-5f6g-1a2b3c4d5e6f`
- `ORGANIZATION_VPC_PEERING_ID` with the ID of your peering connection, for example
  `1a2b3c4d-1234-a1b2-c3d4-1a2b3c4d5e6f`

</TabItem>
-->
<TabItem value="api" label="Aiven API">

Make an API call to the
[OrganizationVpcPeeringConnectionDelete](https://api.aiven.io/doc/#tag/Organization_Vpc/operation/OrganizationVpcPeeringConnectionDeleteById)
endpoint:

```bash
curl --request DELETE \
  --url https://api.aiven.io/v1/organization/ORGANIZATION_ID/vpcs/ORGANIZATION_VPC_ID/peering-connections/PEERING_CONNECTION_ID \
  --header 'Authorization: Bearer BEARER_TOKEN'
```

Replace the following placeholders with meaningful data:

- `ORGANIZATION_ID`: Aiven organization ID
- `ORGANIZATION_VPC_ID`: Aiven organization VPC ID
- `PEERING_CONNECTION_ID`: ID or name of your cloud provider VPC
- `BEARER_TOKEN`

</TabItem>
</Tabs>
