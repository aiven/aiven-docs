---
title: Tiered storage
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Tiered storage in Aiven for ClickHouse® allows you to use storage resources efficiently and can help reduce storage costs of your service.

## Tiered storage feature

The [tiered storage feature](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
introduces a method of organizing and storing data in two tiers for improved efficiency
and cost optimization. The data is automatically moved to an appropriate tier based on
your database's local disk usage.

## Access tiered storage details

When you [enable](/docs/products/clickhouse/howto/enable-tiered-storage) tiered storage,
you can preview its details in the [Aiven Console](https://console.aiven.io/) in the service
<ConsoleLabel name="overview"/>:

- Click <ConsoleLabel name="tieredstorage"/> or
- Click <ConsoleLabel name="databasesandtables"/> > <ConsoleLabel name="actions"/> >
  <ConsoleLabel name="viewdetails"/> > **Storage details**.

import DocCardList from '@theme/DocCardList';

<DocCardList />
