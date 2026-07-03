---
title: Power on/off and delete your Aiven for Metrics service
sidebar_label: Power on/off and delete
---

import PowerService from "@site/static/includes/power-off-services.md";
import DeleteService from "@site/static/includes/delete-services.md";
import StaticIp from "@site/static/includes/static-ip-cost-warning.md";
import RelatedPages from "@site/src/components/RelatedPages";

Power off your Aiven for Metrics service to release resources and save credits, power it
back on when you need it, or delete it permanently.

<PowerService/>

:::note
Aiven for Metrics stores historical metrics in object storage, so that data is retained
when the service is powered off and remains available after you power it back on.
:::

:::note
<StaticIp/>
:::

<DeleteService/>

<RelatedPages/>

- [Monitor storage usage](/docs/products/metrics/howto/storage-usage)
- [Aiven for Metrics](/docs/products/metrics)
