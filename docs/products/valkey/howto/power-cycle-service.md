---
title: Power on/off and delete your Aiven for Valkey™ service
sidebar_label: Power on/off and delete
---

import PowerService from "@site/static/includes/power-off-services.md";
import DeleteService from "@site/static/includes/delete-services.md";
import StaticIp from "@site/static/includes/static-ip-cost-warning.md";
import RelatedPages from "@site/src/components/RelatedPages";

Power off your Aiven for Valkey™ service to release resources and save credits, power it
back on when you need it, or delete it permanently.

<PowerService/>

:::note
Aiven for Valkey stores data in memory. When you power off the service, in-memory data is
kept only if a backup is available, and it is restored from the latest backup when you
power the service back on.
:::

:::note
<StaticIp/>
:::

<DeleteService/>

<RelatedPages/>

- [Aiven for Valkey™ service backups](/docs/products/valkey/howto/configure-backups)
- [Fork Aiven for Valkey™](/docs/products/valkey/howto/fork-service)
