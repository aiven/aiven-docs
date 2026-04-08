---
title: Get started with Aiven for DataHub
sidebar_label: Get started
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Start using DataHub by creating and configuring your first service.

:::important
To avoid issues, don’t make any changes to the plans or other settings of
the DataHub resources beyond what is documented.
:::

## Create a DataHub service

1. In your project, click <ConsoleLabel name="services"/>.

1. Click **Create service**.

1. Select **DataHub**.

1. Choose a **Cloud**.

1. Choose a **Plan**.

1. In the **Service basics**, enter a name for your service.

1. Optional: Add [service tags](/docs/platform/howto/tag-resources).

1. In the **Service summary**, click **Create service**.

While the service is being created, its status is **Rebuilding**.
When the status is **Running**, you can start using the service.
This typically takes couple of minutes and can vary between cloud providers and regions.

## Log in to DataHub

1. In the **Connection information** section, copy the **Password**.
1. To open the DataHub UI, click the **Application URL**.
1. For **Username**, enter `datahub`.
1. For **Password**, paste the password you copied.
1. Click **Login**.

## Next steps

- Explore the
  [DataHub home page](https://docs.datahub.com/docs/features/feature-guides/custom-home-page)
- [Give users access](/docs/products/datahub/manage-datahub-users) to your DataHub service
- [Add connectors](/docs/products/datahub/connect-datahub-to-services) and start ingesting data
