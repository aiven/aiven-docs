---
title: Power on/off and delete your Aiven for Apache Kafka® service
sidebar_label: Power on/off and delete
---

import PowerService from "@site/static/includes/power-off-services.md";
import DeleteService from "@site/static/includes/delete-services.md";
import StaticIp from "@site/static/includes/static-ip-cost-warning.md";
import RelatedPages from "@site/src/components/RelatedPages";

Power off your Aiven for Apache Kafka® service to release resources and save credits, power it back on when you need it, or delete it permanently.

<PowerService/>

:::note
When you power on an Aiven for Apache Kafka service, Aiven restores
[configuration backups](/docs/products/kafka/concepts/configuration-backup)
from the most recent backup.
Aiven does not restore classic topic data, consumer groups, or offsets.
[Diskless topic](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
data remains in object storage and is available after you power the service on.
:::

:::important
If the service uses [tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage),
powering off the service permanently deletes all remote data.
:::

:::note
<StaticIp/>
:::

<DeleteService/>

<RelatedPages/>

- [Configuration backups for Aiven for Apache Kafka®](/docs/products/kafka/concepts/configuration-backup)
- [Trade-offs and limitations](/docs/products/kafka/concepts/tiered-storage-limitations)
