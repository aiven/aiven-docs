import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="group1">
<TabItem value="gui" label="UpCloud Control Panel" default>
1. Log in to the [UpCloud Control Panel](https://hub.upcloud.com/), and go to **Network** >
   **Peering**.
1. Click **Create network peering**, and in the **Create network peering** window:
   1. Specify the peering name.
   1. Select the source peer network (your UpCloud SDN network).
   1. Provide the UUID of the target peer network (the ID of your Aiven VPC).
   1. Click **Create**.

This creates the peering connection between your Aiven VPC and your UpCloud SDN network.

</TabItem>
<TabItem value="api" label="UpCloud API">
Send a request to the
[create network peering](https://developers.upcloud.com/1.3/13-networks/#create-network-peering)
UpCloud API endpoint.

```json
POST /1.3/network-peering HTTP/1.1
{
  "network_peering": {
    "configured_status": "active",
    "name": "NAME_OF_YOUR_PEERING",
    "network": {
      "uuid": "UPCLOUD_SDN_NETWORK_UUID"
    },
    "peer_network": {
      "uuid": "AIVEN_VPC_NETWORK_UUID"
    }
  }
}
```

#### Attributes

| Attribute           | Accepted value             | Default value | Required | Description                                                                                                                                                | Example value                          |
| ------------------- | -------------------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `configured_status` | `active` or `disabled`     | `active`      | No       | Controls whether the peering is administratively up or down.                                                                                               | `active`                               |
| `name`              | String of 1-255 characters | None          | Yes      | Descriptive name for the peering                                                                                                                           | `peering upcloud->aiven`               |
| `network.uuid`      | Valid network UUID         | None          | Yes      | Sets the local network of the peering. Use the UpCloud SDN network UUID. | `03126dc1-a69f-4bc2-8b24-e31c22d64712` |
| `peer_network.uuid` | Valid network UUID         | None          | Yes      | Sets the peer network of the peering. Use the Aiven VPC network ID.     | `03585987-bf7d-4544-8e9b-5a1b4d74a333` |

#### Expected response

:::note
The sample response provided describes a peering established one way
only.
:::

If your peering API request is successful, you can expect a response
similar to the following:

```json
HTTP/1.1 201 Created
{
  "network_peering": {
    "configured_status": "active",
    "name": "NAME_OF_YOUR_PEERING",
    "network": {
      "ip_networks": {
        "ip_network": [
          {
            "address": "192.168.0.0/24",
            "family": "IPv4"
          },
          {
            "address": "fc02:c4f3::/64",
            "family": "IPv6"
          }
        ]
      },
      "uuid": "UPCLOUD_SDN_NETWORK_UUID"
    },
    "peer_network": {
      "uuid": "AIVEN_VPC_NETWORK_UUID"
    },
    "state": "pending-peer",
    "uuid": "PEERING_UUID"
  }
}
```

#### Error responses

| HTTP status   | Error code              | Description                      |
| ------------- | ----------------------- | -------------------------------- |
| 409 Conflict  | LOCAL_NETWORK_NO_ROUTER | The local network has no router. |
| 404 Not found | NETWORK_NOT_FOUND       | The local network was not found. |
| 404 Not found | PEER_NETWORK_NOT_FOUND  | The peer network was not found.  |
| 409 Conflict  | PEERING_CONFLICT        | The peering already exists.      |

</TabItem>
</Tabs>
