---
title: Migrate service to another cloud or region
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

When migrating a service, the migration happens in the background and
does not affect your service until the service has been rebuilt at the
new region. The migration includes the DNS update for the named service
to point to the new region. Most of the services have usually no service
interruption expected. However, for services like PostgreSQL®, MySQL®,
and Caching, it may cause a short interruption (5 to 10 seconds) in
service while the DNS changes are propagated.

The short interruption does not include potential
delays caused by client side library implementation.

When spinning a new Aiven service, you are not tied to a cloud provider
or region. Your services can be migrated to better match your needs.
Services can be moved to another cloud provider, or another region
within the same provider, or both.

1.  Log into the [Aiven Console](https://console.aiven.io/), select your
    project and select the service you want migrate to another
    cloud or region.
1.  On the service page, click **Service settings** from the sidebar.
1.  In the **Cloud and network** section, click
    <ConsoleLabel name="actions"/> > **Change cloud or region**.
1.  In the **Migrate service to another cloud** window, select new cloud
    provider and region and click **Migrate**.

Your service is in the **Rebuilding** state. Once the rebuilding is over,
your new cloud provider and region will be in use.

:::important
The service's URI remains the same after the migration.
:::

:::note
You can also use the
[dedicated service update function](/docs/tools/cli/service-cli#avn-cli-service-update) to migrate a service via the
[Aiven CLI](/docs/tools/cli).
:::
