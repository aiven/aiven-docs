---
title: avn vpc
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The list of commands for project VPCs (`avn vpc`) and organization VPCs (`avn organization vpc`)

## Manage VPCs

### Create VPCs

<Tabs groupId="group1">
<TabItem value="pj" label="Project VPC" default>

#### Command: `avn vpc create`

| Parameter        | Information                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--project`      | The project to fetch details for                                                                                                                      |
| `--cloud`        | The cloud to use by default. To review the list of available cloud regions, see the [`avn cloud list` command](/docs/tools/cli/cloud#avn-cloud-list). |
| `--network-cidr` | The network range in the Aiven project VPC in CIDR format (a.b.c.d/e) (required)                                                                      |

**Example:** Create a VPC in `aws-us-west-1` cloud region with
network range `10.1.2.0/24`

```bash
avn vpc create              \
  --cloud aws-us-west-1     \
  --network-cidr 10.1.2.0/24
```

The command output is:

```text
PROJECT_VPC_ID                        STATE     CLOUD_NAME     NETWORK_CIDR
====================================  ========  =============  ============
1548c3f6-6240-45ab-892f-2dfacc62ed0d  APPROVED  aws-us-west-1  10.1.2.0/24
```

</TabItem>
<TabItem value="org" label="Organization VPC">

#### Command: `avn organization vpc create`

| Parameter        | Information                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--organization-id`      | The organization to fetch details for                                                                                                                      |
| `--cloud`        | The cloud to use by default. To review the list of available cloud regions, see the [`avn cloud list` command](/docs/tools/cli/cloud#avn-cloud-list). |
| `--network-cidr` | The network range in the Aiven organization VPC in CIDR format (a.b.c.d/e) (required)                                                                      |

**Example:** Create a VPC in `aws-us-west-1` cloud region with
network range `10.1.2.0/24`

```bash
avn organization vpc create \
  --cloud aws-us-west-1     \
  --network-cidr 10.1.2.0/24
```

The command output is:

```text
ORGANIZATION_VPC_ID                   STATE     CLOUD_NAME     NETWORK_CIDR
====================================  ========  =============  ============
1548c3f6-6240-45ab-892f-2dfacc62ed0d  APPROVED  aws-us-west-1  10.1.2.0/24
```

</TabItem>
</Tabs>

### Get VPCs

#### Command: `avn organization vpc get`

| Parameter               | Information                                            |
| ----------------------- | ------------------------------------------------------ |
| `--organization-id`     | ID of the organization where the organization VPC runs |
| `--organization-vpc-id` | ID of the organization VPC to be detailed              |

**Example:** Retrieve information about the organization VPC with ID
`abcd1234-abcd-1234-abcd-abcd1234` in organization `org123abc`:

```bash
avn organization vpc get                                 \
  --organization-id org123abc                            \
  --organization-vpc-id abcd1234-abcd-1234-abcd-abcd1234
```

The command output is similar to:

```text
CLOUDS                                                     CREATE_TIME           ORGANIZATION_ID  ORGANIZATION_VPC_ID                   PEERING_CONNECTIONS
========================================================== ====================  ===============  ====================================  ============================================================================
{"cloud_name": "acb-123", "network_cidr": "NNN.NN.N.N/NN"} YYYY-MM-DDTHH:MM:SSZ  org123abc        abcd1234-abcd-1234-abcd-abcd1234abcd  {... , "peering_connection_id": "1a2b3c4d-4321-dcba-4321-123abc456def", ...}
```

### Delete VPCs

<Tabs groupId="group1">
<TabItem value="pj" label="Project VPC" default>

#### Command: `avn vpc delete`

| Parameter          | Information                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| `--project`        | The project to use when a project isn't specified for an `avn` command           |
| `--project-vpc-id` | The project VPC ID. To get the list of VPC IDs execute `avn vpc list` (required) |

**Example:** Delete the VPC with id
`1548c3f6-6240-45ab-892f-2dfacc62ed0d`.

```bash
avn vpc delete \
--project-vpc-id 1548c3f6-6240-45ab-892f-2dfacc62ed0d
```

The command output is:

```text
PROJECT_VPC_ID                        STATE     CLOUD_NAME     NETWORK_CIDR
====================================  ========  =============  ============
1548c3f6-6240-45ab-892f-2dfacc62ed0d  DELETING  aws-us-west-1  10.1.2.0/24
```

</TabItem>
<TabItem value="org" label="Organization VPC">

#### Command: `avn organization vpc delete`

| Parameter          | Information                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| `--organization-id`        | The organization to use when an organization isn't specified for an `avn` command           |
| `--organization-vpc-id` | The organization VPC ID. To get the list of VPC IDs execute `avn vpc list` (required) |

**Example:** Delete the VPC with id
`1548c3f6-6240-45ab-892f-2dfacc62ed0d`.

```bash
avn organization vpc delete \
--organization-vpc-id 1548c3f6-6240-45ab-892f-2dfacc62ed0d
```

The command output is:

```text
ORGANIZATION_VPC_ID                   STATE     CLOUD_NAME     NETWORK_CIDR
====================================  ========  =============  ============
1548c3f6-6240-45ab-892f-2dfacc62ed0d  DELETING  aws-us-west-1  10.1.2.0/24
```

</TabItem>
</Tabs>

### List VPCs

<Tabs groupId="group1">
<TabItem value="pj" label="Project VPC" default>

#### Command: `avn vpc list`

| Parameter   | Information                                                            |
| ----------- | ---------------------------------------------------------------------- |
| `--project` | The project to use when a project isn't specified for an `avn` command |
| `--json`    | Retrieve the output in JSON format                                     |
| `--verbose` | Retrieve the verbose output                                            |

**Example:** List all project's VPC.

```bash
avn vpc list
```

The command output is:

```text
PROJECT_VPC_ID                        CLOUD_NAME          NETWORK_CIDR   STATE
====================================  ==================  =============  ======
b132dfbf-b035-4cf5-8b15-b7cd6a68aqqd  aws-us-east-1       10.2.1.0/24    ACTIVE
c36a0a6a-6cfb-4718-93ce-ec043ae94qq5  aws-us-west-2       10.13.4.0/24   ACTIVE
d7a984bf-6ebf-4503-bbbd-e7950c49bqqb  azure-eastus        10.213.2.0/24  ACTIVE
f99601f3-4b00-44d6-b4d9-6f16e9f55qq8  google-us-central1  10.1.13.0/24   ACTIVE
8af49368-3125-48a8-b94e-3d1a3d601qqf  google-us-east1     10.50.8.0/24   ACTIVE
6ba650ce-cc08-4e0a-a386-5a354c327qq6  google-us-east4     10.1.17.0/24   ACTIVE
c4bc3a59-87da-4dce-9243-c197edb43qq2  google-us-west3     10.1.13.0/24   ACTIVE
```

</TabItem>
<TabItem value="org" label="Organization VPC">

#### Command: `avn organization vpc list`

| Parameter   | Information                                                            |
| ----------- | ---------------------------------------------------------------------- |
| `--organization-id` | The organization to use when an organization isn't specified for an `avn` command |
| `--json`    | Retrieve the output in JSON format                                     |
| `--verbose` | Retrieve the verbose output                                            |

**Example:** List all organization VPC.

```bash
avn organization vpc list
```

The command output is:

```text
ORGANIZATION_VPC_ID                   CLOUD_NAME          NETWORK_CIDR   STATE
====================================  ==================  =============  ======
b132dfbf-b035-4cf5-8b15-b7cd6a68aqqd  aws-us-east-1       10.2.1.0/24    ACTIVE
c36a0a6a-6cfb-4718-93ce-ec043ae94qq5  aws-us-west-2       10.13.4.0/24   ACTIVE
d7a984bf-6ebf-4503-bbbd-e7950c49bqqb  azure-eastus        10.213.2.0/24  ACTIVE
f99601f3-4b00-44d6-b4d9-6f16e9f55qq8  google-us-central1  10.1.13.0/24   ACTIVE
8af49368-3125-48a8-b94e-3d1a3d601qqf  google-us-east1     10.50.8.0/24   ACTIVE
6ba650ce-cc08-4e0a-a386-5a354c327qq6  google-us-east4     10.1.17.0/24   ACTIVE
c4bc3a59-87da-4dce-9243-c197edb43qq2  google-us-west3     10.1.13.0/24   ACTIVE
```

</TabItem>
</Tabs>

## Manage VPC peering connections

Manage VPC peering connections to AWS, GCP, or Azure.

### Create peering connections

<Tabs groupId="group1">
<TabItem value="pj" label="Project VPC" default>

#### Command: `avn vpc peering-connection create`

| Parameter                  | Information                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------- |
| `--project`                | The project to use when a project isn't specified for an `avn` command                |
| `--project-vpc-id`         | Aiven project VPC ID. To get the list of VPC IDs execute `avn vpc list` (required)    |
| `--peer-cloud-account`     | AWS account ID, Google project ID, or Azure subscription ID (required)                |
| `--peer-vpc`               | AWS VPC ID, Google VPC network name, or Azure VNet name (required)                    |
| `--peer-region`            | AWS region of peer VPC, if different than the region defined in the Aiven project VPC |
| `--peer-resource-group`    | Azure resource group name (required for Azure)                                        |
| `--peer-azure-app-id`      | Azure app object ID (required for Azure)                                              |
| `--peer-azure-tenant-id`   | Azure AD tenant ID (required for Azure)                                               |
| `--user-peer-network-cidr` | User-defined peer network IP range for routing/firewall                               |

**Example:** Create a peering connection for AWS.

```bash
avn vpc peering-connection create \
  --project-vpc-id b032dfbf-b035-4cf5-8b15-b7cd6a68aqqd \
  --peer-cloud-account 012345678901 \
  --peer-vpc vpc-abcdef01234567890
```

The command output is:

```text
CREATE_TIME           PEER_AZURE_APP_ID  PEER_AZURE_TENANT_ID  PEER_CLOUD_ACCOUNT  PEER_RESOURCE_GROUP  PEER_VPC               STATE     STATE_INFO  UPDATE_TIME           USER_PEER_NETWORK_CIDRS  VPC_PEERING_CONNECTION_TYPE
====================  =================  ====================  ==================  ===================  =====================  ========  ==========  ====================  =======================  ===========================
2022-06-15T14:50:54Z  null               null                  012345678901        null                 vpc-abcdef01234567890  APPROVED  null        2022-06-15T14:50:54Z
```

</TabItem>
<TabItem value="org" label="Organization VPC">

#### Command: `avn organization vpc peering-connection create`

| Parameter                  | Information                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------- |
| `--organization-id`        | The organization to use when an organization isn't specified for an `avn` command                |
| `--organization-vpc-id`    | Aiven organization VPC ID. To get the list of VPC IDs execute `avn vpc list` (required)    |
| `--peer-cloud-account`     | AWS account ID, Google project ID, or Azure subscription ID (required)                |
| `--peer-vpc`               | AWS VPC ID, Google VPC network name, or Azure VNet name (required)                    |
| `--peer-region`            | AWS region of peer VPC, if different than the region defined in the Aiven organization VPC |
| `--peer-resource-group`    | Azure resource group name (required for Azure)                                        |
| `--peer-azure-app-id`      | Azure app object ID (required for Azure)                                              |
| `--peer-azure-tenant-id`   | Azure AD tenant ID (required for Azure)                                               |
| `--user-peer-network-cidr` | User-defined peer network IP range for routing/firewall                               |

**Example:** Create a peering connection for AWS.

```bash
avn organization vpc peering-connection create               \
  --organization-vpc-id b032dfbf-b035-4cf5-8b15-b7cd6a68aqqd \
  --peer-cloud-account 012345678901 \
  --peer-vpc vpc-abcdef01234567890
```

The command output is:

```text
CREATE_TIME           PEER_AZURE_APP_ID  PEER_AZURE_TENANT_ID  PEER_CLOUD_ACCOUNT  PEER_RESOURCE_GROUP  PEER_VPC               STATE     STATE_INFO  UPDATE_TIME           USER_PEER_NETWORK_CIDRS  VPC_PEERING_CONNECTION_TYPE
====================  =================  ====================  ==================  ===================  =====================  ========  ==========  ====================  =======================  ===========================
2022-06-15T14:50:54Z  null               null                  012345678901        null                 vpc-abcdef01234567890  APPROVED  null        2022-06-15T14:50:54Z
```

</TabItem>
</Tabs>

### Delete peering connections

<Tabs groupId="group1">
<TabItem value="pj" label="Project VPC" default>

#### Command: `avn vpc peering-connection delete`

| Parameter               | Information                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `--project`             | The project to use when a project isn't specified for an `avn` command                |
| `--project-vpc-id`      | Aiven project VPC ID. To get the list of VPC IDs execute `avn vpc list` (required)    |
| `--peer-cloud-account`  | AWS account ID, Google project ID, or Azure subscription ID (required)                |
| `--peer-vpc`            | AWS VPC ID, Google VPC network name, or Azure VNet name (required)                    |
| `--peer-region`         | AWS region of peer VPC, if different than the region defined in the Aiven project VPC |
| `--peer-resource-group` | Azure resource group name (required for Azure)                                        |

**Example:** Delete the VPC peering connection between the
`b032dfbf-b035-4cf5-8b15-b7cd6a68aqqd` Aiven VPC and the
`vpc-abcdef01234567890` AWS VPC.

```bash
avn vpc peering-connection delete \
  --project-vpc-id b032dfbf-b035-4cf5-8b15-b7cd6a68aqqd \
  --peer-cloud-account 012345678901 \
  --peer-vpc vpc-abcdef01234567890
```

The command output is:

```text
CREATE_TIME           PEER_AZURE_APP_ID  PEER_AZURE_TENANT_ID  PEER_CLOUD_ACCOUNT  PEER_REGION  PEER_RESOURCE_GROUP  PEER_VPC               STATE     STATE_INFO  UPDATE_TIME           USER_PEER_NETWORK_CIDRS  VPC_PEERING_CONNECTION_TYPE
====================  =================  ====================  ==================  ===========  ===================  =====================  ========  ==========  ====================  =======================  ===========================
2022-06-15T14:50:54Z  null               null                  012345678901        us-east-1    null                 vpc-abcdef01234567890  DELETING  null        2022-06-15T15:02:12Z
```

</TabItem>
<TabItem value="org" label="Organization VPC">

#### Command: `avn organization vpc peering-connection delete`

| Parameter               | Information                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `--organization`        | The organization to use when an organization isn't specified for an `avn` command                |
| `--organization-vpc-id` | Aiven organization VPC ID. To get the list of VPC IDs execute `avn vpc list` (required)    |
| `--peer-cloud-account`  | AWS account ID, Google project ID, or Azure subscription ID (required)                |
| `--peer-vpc`            | AWS VPC ID, Google VPC network name, or Azure VNet name (required)                    |
| `--peer-region`         | AWS region of peer VPC, if different than the region defined in the Aiven organization VPC |
| `--peer-resource-group` | Azure resource group name (required for Azure)                                        |

**Example:** Delete the VPC peering connection between the
`b032dfbf-b035-4cf5-8b15-b7cd6a68aqqd` Aiven VPC and the
`vpc-abcdef01234567890` AWS VPC.

```bash
avn organization vpc peering-connection delete               \
  --organization-vpc-id b032dfbf-b035-4cf5-8b15-b7cd6a68aqqd \
  --peer-cloud-account 012345678901 \
  --peer-vpc vpc-abcdef01234567890
```

The command output is:

```text
CREATE_TIME           PEER_AZURE_APP_ID  PEER_AZURE_TENANT_ID  PEER_CLOUD_ACCOUNT  PEER_REGION  PEER_RESOURCE_GROUP  PEER_VPC               STATE     STATE_INFO  UPDATE_TIME           USER_PEER_NETWORK_CIDRS  VPC_PEERING_CONNECTION_TYPE
====================  =================  ====================  ==================  ===========  ===================  =====================  ========  ==========  ====================  =======================  ===========================
2022-06-15T14:50:54Z  null               null                  012345678901        us-east-1    null                 vpc-abcdef01234567890  DELETING  null        2022-06-15T15:02:12Z
```

</TabItem>
</Tabs>

### Get peering connections

<Tabs groupId="group1">
<TabItem value="pj" label="Project VPC" default>

#### Command: `avn vpc peering-connection get`

| Parameter              | Information                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `--project`            | The project to use when a project isn't specified for an `avn` command             |
| `--project-vpc-id`     | Aiven project VPC ID. To get the list of VPC IDs execute `avn vpc list` (required) |
| `--peer-cloud-account` | AWS account ID, Google project ID, or Azure subscription ID (required)             |
| `--peer-vpc`           | AWS VPC ID, Google VPC network name, or Azure VNet name (required)                 |
| `--json`               | Retrieve the output in JSON format                                                 |
| `--verbose`            | Retrieve the verbose output                                                        |

**Example:** Fetch VPC peering connection details.

```bash
avn vpc peering-connection get \
  --project-vpc-id b032dfbf-b035-4cf5-8b15-b7cd6a68aabd \
  --peer-cloud-account 012345678901 \
  --peer-vpc vpc-abcdef01234567890
```

The command output is:

```text
State: ACTIVE
Message: Peering connection active

AWS_VPC_PEERING_CONNECTION_ID  TYPE
=============================  =================================
pcx-abcdef01234567890          aws-vpc-peering-connection-active
```

</TabItem>
<TabItem value="org" label="Organization VPC">

#### Command: `avn organization vpc peering-connection get`

| Parameter              | Information                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `--organization`       | The organization to use when an organization isn't specified for an `avn` command             |
| `--organization-vpc-id`| Aiven organization VPC ID. To get the list of VPC IDs execute `avn vpc list` (required) |
| `--peer-cloud-account` | AWS account ID, Google project ID, or Azure subscription ID (required)             |
| `--peer-vpc`           | AWS VPC ID, Google VPC network name, or Azure VNet name (required)                 |
| `--json`               | Retrieve the output in JSON format                                                 |
| `--verbose`            | Retrieve the verbose output                                                        |

**Example:** Fetch VPC peering connection details.

```bash
avn organization vpc peering-connection get                  \
  --organization-vpc-id b032dfbf-b035-4cf5-8b15-b7cd6a68aabd \
  --peer-cloud-account 012345678901                          \
  --peer-vpc vpc-abcdef01234567890
```

The command output is:

```text
State: ACTIVE
Message: Peering connection active

AWS_VPC_PEERING_CONNECTION_ID  TYPE
=============================  =================================
pcx-abcdef01234567890          aws-vpc-peering-connection-active
```

</TabItem>
</Tabs>

### List peering connections

<Tabs groupId="group1">
<TabItem value="pj" label="Project VPC" default>

#### Command: `avn vpc peering-connection list`

| Parameter          | Information                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| `--project`        | The project to use when a project isn't specified for an `avn` command             |
| `--project-vpc-id` | Aiven project VPC ID. To get the list of VPC IDs execute `avn vpc list` (required) |

**Example:** List VPC peering connections for the VPC with id
`b032dfbf-b035-4cf5-8b15-b7cd6a68aabd`.

```bash
avn vpc peering-connection list --project-vpc-id b032dfbf-b035-4cf5-8b15-b7cd6a68aabd
```

The command output is:

```text
PEER_CLOUD_ACCOUNT  PEER_RESOURCE_GROUP  PEER_VPC               PEER_REGION  STATE
==================  ===================  =====================  ===========  ======
012345678901        null                 vpc-abcdef01234567890  us-east-1    ACTIVE
```

</TabItem>
<TabItem value="org" label="Organization VPC">

#### Command: `avn organization vpc peering-connection list`

| Parameter          | Information                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| `--organization`        | The organization to use when an organization isn't specified for an `avn` command             |
| `--organization-vpc-id` | Aiven organization VPC ID. To get the list of VPC IDs execute `avn vpc list` (required) |

**Example:** List VPC peering connections for the VPC with id
`b032dfbf-b035-4cf5-8b15-b7cd6a68aabd`.

```bash
avn organization vpc peering-connection list --organization-vpc-id b032dfbf-b035-4cf5-8b15-b7cd6a68aabd
```

The command output is:

```text
PEER_CLOUD_ACCOUNT  PEER_RESOURCE_GROUP  PEER_VPC               PEER_REGION  STATE
==================  ===================  =====================  ===========  ======
012345678901        null                 vpc-abcdef01234567890  us-east-1    ACTIVE
```

</TabItem>
</Tabs>
