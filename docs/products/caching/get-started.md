---
title: Get started with Aiven for Caching
---

The first step in using Aiven for Caching is to create a service. You can do so either using the [Aiven Web Console](https://console.aiven.io/) or the [Aiven CLI](https://github.com/aiven/aiven-client).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Create a Caching Service

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/).
1.  [Create a Caching service](/docs/platform/howto/create_new_service)

Once the service is ready, the status changes to *Running*. Depending on
your selected cloud provider and region, this generally takes a couple
of minutes.

</TabItem>
<TabItem value="CLI" label="CLI">

[Aiven CLI](https://github.com/aiven/aiven-client) provides a simple and
efficient way to create an Aiven for Caching service. If you prefer
launching a new service from the CLI, follow these steps:

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

:::note
There are additional options available to you, which you can view by
running the following commands:

-   For a full list of default flags: `avn service create -h`
-   For type-specific options: `avn service types -v`
:::

</TabItem>
</Tabs>

## Connect to Aiven for Caching

Learn how to connect to Aiven for Caching using different programming
languages or through `redis-cli`:

-   [redis-cli](howto/connect-redis-cli)
-   [Go](howto/connect-go)
-   [Node](howto/connect-node)
-   [PHP](howto/connect-php)
-   [Python](howto/connect-python)

## Explore other resources for Aiven for Caching

-   [High availability in Aiven for Caching](concepts/high-availability-redis).

    Learn about how Aiven for Caching supports high availability.

-   [Manage SSL connectivity](howto/manage-ssl-connectivity).

    Check how Aiven for Caching supports SSL connections and how can be
    configured.

-   [Memory usage, on-disk persistence and replication in Aiven for Caching](concepts/memory-usage).

    See how Aiven for Caching solves the challenges related to high memory
    usage and high change rate.

-   [Estimate maximum number of connections in Aiven for Caching](howto/estimate-max-number-of-connections).

    Learn how estimate the max number of simultaneous connections in
    Aiven for Caching service.

-   [Lua scripts with Aiven for Caching](concepts/lua-scripts-redis).

    Learn about inbuilt support for running Lua scripts in Aiven for
    Caching service.

-   [Benchmark performance](howto/benchmark-performance)

    Learn how to benchmark the performance of Aiven for Caching service.
