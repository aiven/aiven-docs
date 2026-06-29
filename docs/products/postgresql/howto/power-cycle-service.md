---
title: Power on/off and delete your Aiven for PostgreSQL® service
sidebar_label: Power on/off and delete
---

import PowerService from "@site/static/includes/power-off-services.md";
import DeleteService from "@site/static/includes/delete-services.md";
import StaticIp from "@site/static/includes/static-ip-cost-warning.md";
import RelatedPages from "@site/src/components/RelatedPages";

Power off your Aiven for PostgreSQL® service to release resources and save credits, power it back on when you need it, or delete it permanently.

<PowerService/>

:::note
When you power on an Aiven for PostgreSQL service, the latest backup is restored and
the write-ahead log (WAL) is replayed to recover the data to the latest available
point in time.
:::

:::note
<StaticIp/>
:::

<DeleteService/>

<RelatedPages/>

- [Aiven for PostgreSQL® backups](/docs/products/postgresql/concepts/pg-backups)
- [Fork Aiven for PostgreSQL®](/docs/products/postgresql/howto/fork-service)
