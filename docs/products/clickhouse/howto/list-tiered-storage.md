---
title: Tiered storage
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Tiered storage in Aiven for ClickHouse® allows you to use storage resources efficiently and can help reduce storage costs of your service.

:::important
This feature is in [limited availability](/docs/platform/concepts/beta_services).
Contact your account team to enable it for your project.
:::

## Tiered storage feature

The [tiered storage feature](/docs/products/clickhouse/concepts/clickhouse-tiered-storage)
introduces a method of organizing and storing data in two tiers for improved efficiency
and cost optimization. The data is automatically moved to an appropriate tier based on
your database's local disk usage.

## Access tiered storage details

When [enabled on your service](/docs/products/clickhouse/howto/enable-tiered-storage),
tiered storage along with its details can be accessed in the [Aiven Console](https://console.aiven.io/):

- Click **Tiered storage** in the service page or
- Click **Databases and tables** > <ConsoleLabel name="actions"/> > **View details** >
  **Storage details** in the service page.

import DocCardList from '@theme/DocCardList';

<DocCardList />
