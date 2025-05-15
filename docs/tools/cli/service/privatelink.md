---
title: avn service privatelink
---

Full list of commands for
`avn service privatelink`.

## Manage Aiven privatelink service for AWS and Azure

### `avn service privatelink availability` {#avn_service_privatelink_availability}

Lists PrivateLink cloud availability and prices.

| Parameter   | Information                      |
| ----------- | -------------------------------- |
| `--project` | The project to fetch details for |
| `--format`  | Format of the output string      |

**Example:** Lists PrivateLink cloud availability and prices.

```
avn service privatelink availability
```

```text
CLOUD_NAME                       PRICE_USD
===============================  =========
aws-ca-central-1                 0.0600
aws-eu-central-1                 0.0600
aws-us-east-1                    0.0600
azure-canadacentral              0.0600
azure-eastus                     0.0600
azure-france-central             0.0600
azure-germany-north              0.0600
azure-india-central              0.0600
azure-westus                     0.0600
```

### `avn service privatelink aws connection list` {#avn_service_privatelink_aws_connection_list}

Lists AWS PrivateLink connection information for a service.

| Parameter      | Information                      |
| -------------- | -------------------------------- |
| `service_name` | The name of the service          |
| `--project`    | The project to fetch details for |

**Example:** List AWS PrivateLink connection information for the
`kafka-12a3b4c5` service.

```
avn service privatelink aws connection list kafka-12a3b4c5
```

An example of output:

```json
{
  "dns_name": "vpce-0123456789abc1345-qfhrjbis.vpce-svc-0abcdef0123456789.us-east-1.vpce.amazonaws.com",
  "privatelink_connection_id": "plc39413abcdef",
  "state": "active",
  "vpc_endpoint_id": "vpce-0123456789abc1345"
}
```

### `avn service privatelink aws create` {#avn_service_privatelink_aws_create}

Creates an AWS PrivateLink for a service. To add multiple principals,
repeat `\--principal` parameter.

| Parameter      | Information                                                                           |
| -------------- | ------------------------------------------------------------------------------------- |
| `service_name` | The name of the service                                                               |
| `--project`    | The project to fetch details for                                                      |
| `--principal`  | ARN that is allowed to connect (example: `arn:aws:iam::123456789012:user/cloud_user`) |
| `--format`     | Format of the output string                                                           |

**Example:** Create an AWS PrivateLink for the `kafka-12a3b4c5` service.

```
avn service privatelink aws create --principal 'arn:aws:iam::123456789012:user/cloud_user' --principal 'arn:aws:iam::987654321098:user/cloud_user' kafka-12a3b4c5
```

An example of output:

```text
AWS_SERVICE_ID  AWS_SERVICE_NAME  PRINCIPALS                                                                            STATE
==============  ================  ====================================================================================  ========
null            null              arn:aws:iam::123456789012:user/cloud_user, arn:aws:iam::987654321098:user/cloud_user  creating
```

### `avn service privatelink aws delete` {#avn_service_privatelink_aws_delete}

Deletes an AWS PrivateLink defined for a service.

| Parameter      | Information                      |
| -------------- | -------------------------------- |
| `service_name` | The name of the service          |
| `--project`    | The project to fetch details for |
| `--format`     | Format of the output string      |

**Example:** Delete the AWS PrivateLink for the `kafka-12a3b4c5`
service.

```
avn service privatelink aws delete kafka-12a3b4c5
```

An example of output:

```text
AWS_SERVICE_ID              AWS_SERVICE_NAME                                         PRINCIPALS                                 STATE
==========================  =======================================================  =========================================  ========
vpce-svc-1234567890abc1234  com.amazonaws.vpce.us-east-1.vpce-svc-1234567890abc1234  arn:aws:iam::123456789012:user/cloud_user  deleting
```

:::tip
The deletion can take some time to complete. You can check the status by
running `avn service privatelink aws get`.
:::

### `avn service privatelink aws get` {#avn_service_privatelink_aws_get}

Lists AWS PrivateLink information for a service.

| Parameter      | Information                      |
| -------------- | -------------------------------- |
| `service_name` | The name of the service          |
| `--project`    | The project to fetch details for |
| `--format`     | Format of the output string      |

**Example:** List AWS PrivateLink information for the `kafka-12a3b4c5`
service.

```
avn service privatelink aws get kafka-12a3b4c5
```

An example of output:

```text
AWS_SERVICE_ID              AWS_SERVICE_NAME                                         PRINCIPALS                                 STATE
==========================  =======================================================  =========================================  ======
vpce-svc-1234567890abc1234  com.amazonaws.vpce.us-east-1.vpce-svc-1234567890abc1234  arn:aws:iam::123456789012:user/cloud_user  active
```

### `avn service privatelink aws update` {#avn_service_privatelink_aws_update}

Updates AWS PrivateLink principals for a service. To update multiple
principals, repeat `\--principal` parameter.

| Parameter      | Information                                                                           |
| -------------- | ------------------------------------------------------------------------------------- |
| `service_name` | The name of the service                                                               |
| `--project`    | The project to fetch details for                                                      |
| `--principal`  | ARN that is allowed to connect (example: `arn:aws:iam::123456789012:user/cloud_user`) |
| `--format`     | Format of the output string                                                           |

**Example:** Update AWS principals for the `kafka-12a3b4c5` service.

```
avn service privatelink aws update                        \
  --principal 'arn:aws:iam::123456789012:user/cloud_user' \
  kafka-12a3b4c5
```

An example of output:

```text
AWS_SERVICE_ID              AWS_SERVICE_NAME                                         PRINCIPALS                                 STATE
==========================  =======================================================  =========================================  ======
vpce-svc-1234567890abc1234  com.amazonaws.vpce.us-east-1.vpce-svc-1234567890abc1234  arn:aws:iam::123456789012:user/cloud_user  active
```

### `avn service privatelink azure connection approve` {#avn_service_privatelink_azure_connection_approve}

Approves a pending Azure Private Link connection endpoint.

| Parameter                   | Information                         |
| --------------------------- | ----------------------------------- |
| `service_name`              | The name of the service             |
| `privatelink_connection_id` | The Aiven privatelink connection ID |
| `--project`                 | The project to fetch details for    |
| `--format`                  | Format of the output string         |

**Example:** Approve the Azure Private Link `plc12345abcdef` connection
for the `kafka-12a3b4c5` service.

```
avn service privatelink azure connection approve kafka-12a3b4c5 plc12345abcdef
```

An example of output:

```text
PRIVATE_ENDPOINT_ID                                                                                                                       PRIVATELINK_CONNECTION_ID  STATE          USER_IP_ADDRESS
========================================================================================================================================  =========================  =============  ===============
/subscriptions/12345678-90ab-cdef-0987-6543210abcde/resourceGroups/group-eastus/providers/Microsoft.Network/privateEndpoints/pl-endpoint  plc12345abcdef             user-approved  null
```

### `avn service privatelink azure connection list` {#avn_service_privatelink_azure_connection_list}

Lists Azure Private Link connection information for a service.

| Parameter      | Information                      |
| -------------- | -------------------------------- |
| `service_name` | The name of the service          |
| `--project`    | The project to fetch details for |
| `--format`     | Format of the output string      |

**Example:** List Azure Private Link connection information for the
`kafka-12a3b4c5` service.

```
avn service privatelink azure connection list kafka-12a3b4c5
```

An example of output:

```text
PRIVATELINK_CONNECTION_ID  PRIVATE_ENDPOINT_ID                                                                                                                       STATE                  USER_IP_ADDRESS
=========================  ========================================================================================================================================  =====================  ===============
plc12345abcdef             /subscriptions/12345678-90ab-cdef-0987-6543210abcde/resourceGroups/group-eastus/providers/Microsoft.Network/privateEndpoints/pl-endpoint  pending-user-approval  null
```

### `avn service privatelink azure connection update` {#avn_service_privatelink_azure_connection_update}

Updates an Azure Private Link connection with the Private IP address of
the private endpoint's Network interface.

| Parameter                     Information
| ----------------------------- -------------------------------------------------------------
| `service_name`                The name of the service
| `privatelink_connection_id`   The Aiven PrivateLink connection ID
| `--endpoint-ip-address`       (Private) IP address of Azure endpoint in user subscription
| `--project`                   The project to fetch details for
| `--format`                    Format of the output string

**Example:** In the `kafka-12a3b4c5` service, update the IP of the Azure
Private Link connection `plc12345abcdef` to `10.19.1.4`.

```
avn service privatelink azure connection update   \
  --endpoint-ip-address 10.19.1.4                 \
  kafka-12a3b4c5                                  \
  plc12345abcdef
```

An example of output:

```text
PRIVATE_ENDPOINT_ID                                                                                                                       PRIVATELINK_CONNECTION_ID  STATE   USER_IP_ADDRESS
========================================================================================================================================  =========================  ======  ===============
/subscriptions/12345678-90ab-cdef-0987-6543210abcde/resourceGroups/group-eastus/providers/Microsoft.Network/privateEndpoints/pl-endpoint  plc12345abcdef             active  10.19.1.4
```

### `avn service privatelink azure create` {#avn_service_privatelink_azure_create}

Creates an Azure Private Link for a service.

| Parameter                | Information                                                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `service_name`           | The name of the service                                                                                                 |
| `--project`              | The project to fetch details for                                                                                        |
| `--user-subscription-id` | Azure subscription IDs allowed to connect to the Private Link service (example: `12345678-90ab-cdef-0987-6543210abcde`) |
| `--format`               | Format of the output string                                                                                             |

**Example:** Create an Azure Private Link for the `kafka-12a3b4c5`
service.

```
avn service privatelink azure create    \
  --user-subscription-id                \
  12345678-90ab-cdef-0987-6543210abcde  \
  kafka-12a3b4c5
```

An example of output:

```text
AZURE_SERVICE_ALIAS  AZURE_SERVICE_ID  STATE     USER_SUBSCRIPTION_IDS
===================  ================  ========  ====================================
null                 null              creating  12345678-90ab-cdef-0987-6543210abcde
```

### `avn service privatelink azure delete` {#avn_service_privatelink_azure_delete}

Deletes an Azure Private Link defined for a service.

| Parameter      | Information                      |
| -------------- | -------------------------------- |
| `service_name` | The name of the service          |
| `--project`    | The project to fetch details for |
| `--format`     | Format of the output string      |

**Example:** Delete Azure Private Link for the `kafka-12a3b4c5` service.

```
avn service privatelink azure delete kafka-12a3b4c5
```

An example of output:

```text
AZURE_SERVICE_ALIAS                                                                           AZURE_SERVICE_ID                                                                                                                                                                           STATE     USER_SUBSCRIPTION_IDS
============================================================================================  =========================================================================================================================================================================================  ========  ====================================
aivenprod-ss123456789ab.12345678-90ab-cdef-9876-543210abcdef.eastus.azure.privatelinkservice  /subscriptions/12345678-90ab-cdef-1234-567890abcdef/resourceGroups/aivenprod-12345678-90ab-cdef-1234-567890abcdef/providers/Microsoft.Network/privateLinkServices/aivenprod-ss123456789ab  deleting  12345678-90ab-cdef-0987-6543210abcde
```

### `avn service privatelink azure get` {#avn_service_privatelink_azure_get}

Lists Azure Private Link information for a service.

| Parameter      | Information                      |
| -------------- | -------------------------------- |
| `service_name` | The name of the service          |
| `--project`    | The project to fetch details for |
| `--format`     | Format of the output string      |

**Example:** List Azure Private Link information for the
`kafka-12a3b4c5` service.

```
avn service privatelink azure get kafka-12a3b4c5
```

An example of output:

```text
AZURE_SERVICE_ALIAS                                                                           AZURE_SERVICE_ID                                                                                                                                                                           STATE   USER_SUBSCRIPTION_IDS
============================================================================================  =========================================================================================================================================================================================  ======  ====================================
aivenprod-ss123456789ab.12345678-90ab-cdef-9876-543210abcdef.eastus.azure.privatelinkservice  /subscriptions/12345678-90ab-cdef-1234-567890abcdef/resourceGroups/aivenprod-12345678-90ab-cdef-1234-567890abcdef/providers/Microsoft.Network/privateLinkServices/aivenprod-ss123456789ab  active  12345678-90ab-cdef-0987-6543210abcde
```

### `avn service privatelink azure refresh` {#avn_service_privatelink_azure_refresh}

Refreshes incoming Azure Private Link endpoint connections.

| Parameter      | Information                      |
| -------------- | -------------------------------- |
| `service_name` | The name of the service          |
| `--project`    | The project to fetch details for |
| `--format`     | Format of the output string      |

**Example:** Refresh incoming Azure Private Link endpoint connections
for the `kafka-12a3b4c5` service.

```
avn service privatelink azure refresh kafka-12a3b4c5
```
