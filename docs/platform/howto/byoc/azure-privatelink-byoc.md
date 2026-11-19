---
title: Use Azure Private Link with BYOC services
sidebar_label: Use Azure Private Link
---

import RelatedPages from "@site/src/components/RelatedPages";

Connect to your Aiven services deployed in your Azure subscription using [bring your own cloud (BYOC)](/docs/platform/concepts/byoc) over Azure Private Link, from other Azure virtual networks (VNets) and subscriptions.

Azure Private Link for BYOC services uses
[static IP addresses](/docs/platform/concepts/static-ips): Azure load balancers send
health probes to the service nodes from a public IP address, so the service nodes need
standard SKU IP addresses.

## Limitations

- Azure Private Link is available in Azure custom clouds that use the **Standard**
  (`standard`)
  [deployment model](/docs/platform/howto/byoc/create-cloud/create-azure-custom-cloud).
- If your Azure custom cloud was created before static IP addresses became available for
  BYOC, [create a support ticket](/docs/platform/howto/support#create-a-support-ticket)
  to enable static IP addresses in it.

## Prerequisites

- An [Azure custom cloud](/docs/platform/howto/byoc/create-cloud/create-azure-custom-cloud)
  in the **Standard** deployment model
- An Aiven service running in the custom cloud
- [Aiven CLI](/docs/tools/cli)
- Access to the [Azure portal](https://portal.azure.com/) or the
  [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

## Assign static IP addresses to the service

1. [Calculate the number of static IP addresses](/docs/platform/concepts/static-ips#platform_howto_setup_static_ip)
   your service needs.

1. Create the static IP addresses in your custom cloud. Run the following command once
   for each address:

   ```bash
   avn static-ip create --project PROJECT_NAME --cloud CUSTOM_CLOUD_NAME
   ```

   Aiven creates the addresses in your Azure subscription. Wait until each address is in
   the `created` state. To view the state, run:

   ```bash
   avn static-ip list --project PROJECT_NAME
   ```

1. Associate each static IP address with your service:

   ```bash
   avn static-ip associate --project PROJECT_NAME --service SERVICE_NAME STATIC_IP_ADDRESS_ID
   ```

1. Enable static IP addresses on the service:

   ```bash
   avn service update --project PROJECT_NAME -c static_ips=true SERVICE_NAME
   ```

   The service nodes are replaced with new nodes that use the static IP addresses.

For more details on static IP address states and management, see
[Static IP addresses](/docs/platform/concepts/static-ips).

## Set up Azure Private Link

After the service uses static IP addresses, create the Private Link service, connect a
private endpoint from your VNet, and enable Private Link access for the service
components. See
[Set up a Private Link connection](/docs/platform/howto/use-azure-privatelink#set-up-a-private-link-connection).

To get the connection information for the Private Link access route, see
[Acquire connection information](/docs/platform/howto/use-azure-privatelink#acquire-connection-information).

<RelatedPages/>

- [Use Azure Private Link with Aiven services](/docs/platform/howto/use-azure-privatelink)
- [Static IP addresses](/docs/platform/concepts/static-ips)
- [Create a Microsoft Azure-integrated custom cloud](/docs/platform/howto/byoc/create-cloud/create-azure-custom-cloud)
- [Use AWS PrivateLink with BYOC services](/docs/platform/howto/byoc/aws-privatelink-byoc)
