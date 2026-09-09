---
title: Scale disk storage for your Aiven for ClickHouse® service
sidebar_label: Scale disk storage
---

import DiskConcepts from "@site/static/includes/scale-disk-storage-concepts.md";
import DiskLimitations from "@site/static/includes/scale-disk-storage-limitations.md";
import DiskInstructions from "@site/static/includes/scale-disk-storage-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Scale the disk storage of your Aiven for ClickHouse® service up or down without disrupting the running service.

:::note
Dynamic disk sizing (DDS) adds network-attached block storage. To move data to
object storage instead, see
[Tiered storage in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/clickhouse-tiered-storage).
:::

<DiskConcepts/>

<DiskLimitations/>

## Add or remove storage

<DiskInstructions/>

<RelatedPages/>

- [Change the service plan](/docs/products/clickhouse/howto/change-service-plan)
- [Tiered storage in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
- [Fork your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/fork-service)
- [Get started with Aiven for ClickHouse®](/docs/products/clickhouse/get-started)
