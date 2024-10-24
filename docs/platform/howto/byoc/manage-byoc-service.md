---
title: Manage services hosted in custom clouds
sidebar_label: Manage BYOC services
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create a service in your custom cloud or migrate an existing service to your custom cloud.

## Create a service in a custom cloud

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>
To create a service in the [Aiven Console](https://console.aiven.io/) in your new
custom cloud, follow the guidelines in
[Create a service](/docs/platform/howto/create_new_service).

When creating a service in the [Aiven Console](https://console.aiven.io/), at the
**Select service region** step, select **Custom clouds** from the available regions.
</TabItem>
<TabItem value="2" label="Aiven CLI">
To create a service hosted in your new custom cloud, run
[avn service create](/docs/tools/cli/service-cli#avn-cli-service-create) passing your new
custom cloud name as an option:

    ```bash
    avn service create                    \
    --project "PROJECT_NAME"              \
    --service-type "TYPE_OF_BYOC_SERVICE" \
    --plan "PLAN_OF_BYOC_SERVICE"         \
    --cloud "CUSTOM_CLOUD_NAME"           \
    "NEW_BYOC_SERVICE_NAME"
    ```

</TabItem>
</Tabs>

## Migrate an existing service to a custom cloud

You can migrate a non-BYOC Aiven-managed service to your custom cloud. How you do that
depends on the [deployment mode](/docs/platform/concepts/byoc#byoc-architecture) of
your custom cloud: public or private.

### Migrate to public BYOC

To migrate a service to a custom cloud in the public deployment mode,
[change a cloud provider and a cloud region](/docs/platform/howto/migrate-services-cloud-region)
to point to your custom cloud.

### Migrate private BYOC

Migrating a service to a custom cloud in the private deployment mode requires network
reconfiguration. Contact your account team for further guidance.

## Related pages

-   [About bring your own cloud](/docs/platform/concepts/byoc)
-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Rename a custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
-   [Download an infrastructure template and a variables file](/docs/platform/howto/byoc/download-infrastructure-template)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
-   [Storing data in custom clouds](/docs/platform/howto/byoc/store-data)
-   [Delete a custom cloud](/docs/platform/howto/byoc/delete-custom-cloud)
