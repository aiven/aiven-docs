---
title: Set up VPC peering on UpCloud
---

import UpcloudVpcPeering from "@site/static/images/content/platform/howto/upcloud-vpc-peer.png";

Network peerings enable traffic between two networks from different accounts or platforms.

A peering needs to be established from both connecting components to be activated.

## About establishing Aiven-Upcloud peering

Peering Aiven and UpCloud networks requires establishing the connection
on both ends: Aiven and UpCloud.

-   To set up a peering from Aiven to UpCloud, you can use [Aiven
    Console](https://console.aiven.io/) to create a VPC for your Aiven
    project and add a peering connection to UpCloud. For this purpose,
    identify the UpCloud SDN network UUID first.
-   To set up a peering from UpCloud to Aiven, you can use [UpCloud
    API](https://developers.upcloud.com/1.3/). Since the API takes UUIDs
    of both networks as attributes, identify the network
    UUIDs before calling the API.

## Limitations

-   Peering connections are only supported between networks of type
    `private`.
-   You cannot initiate a peering between two networks with overlapping
    CIDR ranges.
-   The networks to be peered need to be in the same cloud zone.

:::important
Make sure you only create peerings between accounts, platforms, or
networks you trust. There is no limit on what traffic can flow between
the peered components. The server firewall has no effect on `private`
type networks.
:::

## Prerequisites
<!-- vale off -->
-   You have
    [created a VPC for your Aiven project](manage-vpc-peering) in the
    [Aiven Console](https://console.aiven.io/).
-   The CIDR ranges of the networks you want to peer do not overlap.
<!-- vale on -->
## Get UpCloud SDN network UUID {#upcloud-uuid}

Before establishing a peering connection from Aiven to UpCloud, you need
to find your UpCloud SDN network UUID.

To check the UpCloud SDN network UUID, send a request to [get network
details](https://developers.upcloud.com/1.3/13-networks/#get-network-details)
UpCloud API endpoint. In the response, you'll get the network's UUID.

## Set up VPC peering from Aiven {#avn-uuid}

You can establish a peering connection from Aiven to UpCloud using
[Aiven Console](https://console.aiven.io/).

1.  Log in to [Aiven Console](https://console.aiven.io/), go to
    the organization and project of your choice.
1.  On the **Services** page, select **VPCs** from the sidebar.
1.  On the **Virtual private clouds** page, select the ID of the VPC
    connection to use for the peering.
1.  On the **VPC peering connections** page, in the **Add peering
    connection** section, populate **Peer network ID** field with your
    UpCloud SDN network UUIDs.
1.  Select **Add peering connection**. This adds a new connection to the
    VPC peering connections list.
1.  Wait until you see the `peer_pending` state in the **State** column
    of the of the VPC peering connections table. At this point, the
    Aiven VPC network UUID should be available in the **Aiven network
    ID** column of the of the VPC peering connections table.

## Set up VPC peering from UpCloud

VPC peering from UpCloud can be established using either the [UpCloud web
console](#upcloud-web-console) or the [UpCloud API](#upcloud-api).

### Use the UpCloud web console{#upcloud-web-console}

1.  Log in to the UpCloud web console.
1.  Go to **Networks** > **Peering**.
1.  Click **Create network peering**.
1.  Specify the peering name, select the source peer network, provide
    the UUID of the target peer network, and click **Create**.

    As a result, your peering is in the **Pending peer** status.

1. Create the peering from the target network to your source network.

:::important
The peering becomes active and the traffic is shared only after you create the peering
both from the source network and from the target network.
:::

<img src={UpcloudVpcPeering} className="image" alt="Create network peering"/>

### Use the UpCloud API{#upcloud-api}

To establish a VPC peering from UpCloud to Aiven, use [UpCloud
API](https://developers.upcloud.com/1.3/) to send the following request:

```bash
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

### Attributes

| Attribute           | Accepted value             | Default value | Required | Description                                                                                                                                                | Example value                          |
| ------------------- | -------------------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `configured_status` | `active` or `disabled`     | `active`      | No       | Controls whether the peering is administratively up or down.                                                                                               | `active`                               |
| `name`              | String of 1-255 characters | None          | Yes      | Descriptive name for the peering                                                                                                                           | `peering upcloud->aiven`               |
| `network.uuid`      | Valid network UUID         | None          | Yes      | Sets the local network of the peering. Use the UUID you acquired in [Get UpCloud SDN network UUID](/docs/platform/howto/vpc-peering-upcloud#upcloud-uuid). | `03126dc1-a69f-4bc2-8b24-e31c22d64712` |
| `peer_network.uuid` | Valid network UUID         | None          | Yes      | Sets the peer network of the peering. Use the UUID you acquired in [Set up VPC peering from Aiven](/docs/platform/howto/vpc-peering-upcloud#avn-uuid).     | `03585987-bf7d-4544-8e9b-5a1b4d74a333` |

### Expected response

:::note
The sample response provided describes a peering established one way
only.
:::

If your peering API request is successful, you can expect a response
similar to the following:

```bash
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

### Error responses

| HTTP status   | Error code              | Description                      |
| ------------- | ----------------------- | -------------------------------- |
| 409 Conflict  | LOCAL_NETWORK_NO_ROUTER | The local network has no router. |
| 404 Not found | NETWORK_NOT_FOUND       | The local network was not found. |
| 404 Not found | PEER_NETWORK_NOT_FOUND  | The peer network was not found.  |
| 409 Conflict  | PEERING_CONFLICT        | The peering already exists.      |

## Renew a DHCP lease

You only need to take this step if any of your VMs has been created
before setting up the network peering. In this case, refresh
the Dynamic Host Configuration Protocol (DHCP) lease for a relevant
network interface to get new routes.

:::warning
A peering connection between an Aiven VPC and VMs created before the
peering setup won't work unless you refresh the DHCP lease for a
relevant network interface.
:::

To refresh the DHCP lease for a network interface, run the following
commands:

1.  To clear the existing DHCP lease

    ```bash
    dhclient -r NETWORK_INTERFACE_NAME
    ```

1.  To request a renewal of the DHCP lease

    ```bash
    dhclient NETWORK_INTERFACE_NAME
    ```

## Related pages

-   [Manage Virtual Private Cloud (VPC) peering](/docs/platform/howto/manage-vpc-peering)
-   [Set up Virtual Private Cloud (VPC) peering on AWS](/docs/platform/howto/vpc-peering-aws)
-   [Set up Virtual Private Cloud (VPC) peering on Google Cloud Platform (GCP)](/docs/platform/howto/vpc-peering-gcp)
-   [Set up Azure virtual network peering](/docs/platform/howto/vnet-peering-azure)
