---
title: Enable public access in VPCs
---

import ActionsIcon from "@site/static/images/icons/more.svg";

To enable public access for a service running within a virtual private cloud (VPC):

1. Log in to [Aiven Console](https://console.aiven.io) and select your
   service from the **Services** page.

1. On the **Overview** page of your service, select **Service
   settings** from the sidebar.

1. On the **Service settings** page, in the **Cloud and
   network** section, click <ActionsIcon className="icon"/>
   **Actions** > **More network configurations**.

1. In the **Network configuration** window, select **Add configuration
   options**. In the search field, enter `public_access`. From the
   displayed parameter names, select a parameter name for your service
   type. Select the toggle switch to enable the selected parameter.
   Select **Save configuration**.

   The **Overview** page now has an **Access Route** setting inside the
   **Connection information** section with **Public** and **Dynamic**
   options.

1. Select **Public** to see the public URL for your service.

The connection with the **Dynamic** option is not possible outside the
VPC, while the connection with the **Public** option is accessible over
the public Internet. **IP Allow-List** applies to all connection types
(Dynamic and Public, in this example).

:::note
You can change the `public_access` settings without any service
downtime.
:::
