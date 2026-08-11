---
title: Power on/off and delete your Aiven for ClickHouse® service
sidebar_label: Power on/off and delete
---

import PowerService from "@site/static/includes/power-off-services.md";
import DeleteService from "@site/static/includes/delete-services.md";
import StaticIp from "@site/static/includes/static-ip-cost-warning.md";
import RelatedPages from "@site/src/components/RelatedPages";

Power off your Aiven for ClickHouse® service to release resources and save credits, power
it back on when you need it, or delete it permanently.

<PowerService/>

:::note
When you power on an Aiven for ClickHouse service, your data is restored from the latest
available backup. An automatic backup is also taken before the service is powered off.
:::

:::note
<StaticIp/>
:::

<DeleteService/>

<RelatedPages/>

- [Disaster recovery in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/disaster-recovery)
- [Fork your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/fork-service)
