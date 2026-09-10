---
title: Power on/off a service
---

import PowerService from "@site/static/includes/power-off-services.md";
import DeleteService from "@site/static/includes/delete-services.md";
import StaticIp from "@site/static/includes/static-ip-cost-warning.md";
import RelatedPages from "@site/src/components/RelatedPages";

Power off an Aiven service to release resources and save credits, power it back on when you need it, or delete it permanently.

<PowerService/>

:::note
When you power on a service, your data is restored from the latest available backup. An
automatic backup is also taken before the service is powered off.
:::

:::note
<StaticIp/>
:::

<DeleteService/>

<RelatedPages/>

- [Fork a service](/docs/platform/concepts/service-forking)
- [Service backups](/docs/platform/concepts/service_backups)
