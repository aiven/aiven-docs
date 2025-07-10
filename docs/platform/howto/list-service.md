---
title: Service management
displayed_sidebar: platformSidebar
---

import DocCardList from '@theme/DocCardList';
import RelatedPages from "@site/src/components/RelatedPages";

## Overview

Aiven manages a number of [services](/docs/products/services). These services share
similar good practices when it comes to managing them.

Understand the fundamentals:

- [Service resources](/docs/platform/concepts/service-resources)
- [Service memory limits](/docs/platform/concepts/service-memory-limits)
- [Service backups](/docs/platform/concepts/service_backups)
- [Service maintenance](/docs/platform/concepts/maintenance-window)

Create and configure your service:

1. [Create your service](/docs/platform/howto/create_new_service).
1. [Add users](/docs/platform/howto/create_new_service_user).
1. See the docs for your [specific service](/docs/products/services).

:::note[Choosing a time series database]

Aiven offers a wide choice of open source time series databases in its
product portfolio.

-   Aiven for PostgreSQL® with the TimescaleDB extension is your best
    choice if you already use PostgreSQL, require **SQL compatibility**
    and have a limited time series use case.
-   Aiven for AlloyDB Omni is a solid option for **PostgreSQL compatibile**
    workloads with a need for columnar analytical data and seamless AI
    integration across any cloud.
-   Aiven for Clickhouse® is your best choice when you need a high-prformance
    columnar time series database for OLAP workloads or a data analytics warehouse.

See our time series on
[our website](https://aiven.io/time-series-databases/what-are-time-series-databases).

:::

<RelatedPages/>

<DocCardList />
