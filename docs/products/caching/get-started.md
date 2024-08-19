---
title: Get started with Aiven for Caching
sidebar_label: Get started
keywords: [quick start]
---

import CreateService from "@site/static/includes/create-service-console.md"
import Help from "@site/static/includes/cli-help.md"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The first step in using Aiven for Caching is to create a service. You can do so either using the [Aiven Console](https://console.aiven.io/) or the [Aiven CLI](https://github.com/aiven/aiven-client).

## Create an Aiven for Caching service

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

<CreateService serviceType="Aiven for Caching"/>

</TabItem>
<TabItem value="CLI" label="CLI">

Use [Aiven CLI](/docs/tools/cli) to create your service:

1. Determine the service plan, cloud provider, and region to
   use for your Caching service.

1. Run the following command to create a Caching service named
   demo-caching:

   ```
   avn service create demo-caching       \
    --service-type redis                \
    --cloud CLOUD_AND_REGION            \
    --plan PLAN                         \
    --project PROJECT_NAME

   ```

<Help/>

</TabItem>
</Tabs>

## Connect to Aiven for Caching

Learn how to connect to Aiven for Caching using different programming
languages or through `redis-cli`:

-   [redis-cli](/docs/products/caching/howto/connect-redis-cli)
-   [Go](/docs/products/caching/howto/connect-go)
-   [Node](/docs/products/caching/howto/connect-node)
-   [PHP](/docs/products/caching/howto/connect-php)
-   [Python](/docs/products/caching/howto/connect-python)

## Explore other resources for Aiven for Caching

-   [High availability in Aiven for Caching](/docs/products/caching/concepts/high-availability-redis).

    Learn about how Aiven for Caching supports high availability.

-   [Manage SSL connectivity](/docs/products/caching/howto/manage-ssl-connectivity).

    Check how Aiven for Caching supports SSL connections and how can be
    configured.

-   [Memory usage, on-disk persistence and replication in Aiven for Caching](/docs/products/caching/concepts/memory-usage).

    See how Aiven for Caching solves the challenges related to high memory
    usage and high change rate.

-   [Estimate maximum number of connections in Aiven for Caching](/docs/products/caching/howto/estimate-max-number-of-connections).

    Learn how estimate the max number of simultaneous connections in
    Aiven for Caching service.

-   [Lua scripts with Aiven for Caching](/docs/products/caching/concepts/lua-scripts-caching).

    Learn about inbuilt support for running Lua scripts in Aiven for
    Caching service.

-   [Benchmark performance](/docs/products/caching/howto/benchmark-performance)

    Learn how to benchmark the performance of Aiven for Caching service.
