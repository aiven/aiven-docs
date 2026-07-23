---
title: View data lineage in DataHub
sidebar_label: View data lineage
limited: true
---

Data lineage is a map of how each of your data assets moves across your systems. Lineage can help you:

- Understand your data flows at a glance, even in complex architectures.
- See which downstream systems would be affected before you change a dataset.
- Trace data-quality problems or failures back to their source.
- Build trust by showing stakeholders and auditors where data came from.

When you
[connect Aiven services to your Aiven for DataHub service](/docs/products/datahub/connect-datahub-to-services),
DataHub automatically builds this map of your data assets.
In DataHub, data assets are called datasets.

:::note
External services that you connect to DataHub are not shown in the
data lineage.
:::

## View lineage for a dataset

1. In the Aiven Console, go to your DataHub service.
1. [Log in to DataHub](/docs/products/datahub/get-started#log-in-to-datahub).
1. Search for and open a dataset.
1. Click **Lineage**.
