---
title: Create a service
---

import Services from "@site/static/images/icons/cog.svg";
import ActionsIcon from "@site/static/images/icons/more.svg";

Create the service of your choice at any point.

1. Log in to [Aiven Console](https://console.aiven.io/) and open your project.

1. From your project, on the left-side menu, click <Services className="icon"/>
   **Services** > **Create service**.

1. From the **Select service** page, click a service type.

1. Select the cloud provider and region to host your service on.

   :::note
   The pricing for the same service can vary between different
   providers and regions. The service summary shows you the pricing
   for your selected options.
   :::

1. Select a service plan.

   :::note
   This determines the number of servers and the memory,
   CPU, and disk resources allocated to your service. See
   [Plans & Pricing](https://aiven.io/pricing).
   :::

1. (Optional) Add [disk storage](/docs/platform/concepts/dynamic-disk-sizing).

1. Enter a name for your service.

   :::important
   You cannot change the name after you create the service. You can
   [fork the service][fork] with a new name instead.
   :::

1. (Optional) Add [tags](/docs/platform/howto/tag-resources).

1. Click **Create service**.

The new service opens on the **Overview** page, which shows
the connection parameters for your service, its current status, and the
configuration options.

The status of the service is **Rebuilding** during its creation.
When the status becomes **Running**, you can start using it.

:::note
Services typically start up in a couple of minutes. It can vary between
cloud providers and regions.
:::

## Related pages

- [Create a service using the Aiven CLI](/docs/tools/cli/service-cli#avn-cli-service-create)
- [Rename a service via a fork][fork]

[fork]: /docs/platform/concepts/service-forking
