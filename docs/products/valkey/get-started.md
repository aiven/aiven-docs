---
title: Get started with Aiven for Valkey
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Begin your journey with Aiven for Valkey, the versatile in-memory data store offering high-performance capabilities for caching, message queues, and efficient data storage solutions.

## Prerequisites

- Access to the [Aiven Web Console](https://console.aiven.io/)
- [Aiven CLI](https://github.com/aiven/aiven-client) installed

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. [Create Aiven for Valkey service](/docs/platform/howto/create_new_service).

</TabItem>
<TabItem value="CLI" label="CLI">

1. Determine the service specifications, including plan, cloud provider, region,
   and project name.

1. Run the following command to create a Valkey service named `demo-valkey`:

   ```bash
    avn service create demo-valkey       \
    --service-type valkey               \
    --cloud CLOUD_AND_REGION           \
    --plan PLAN                        \
    --project PROJECT_NAME
   ```

  Parameters:

   - `avn service create demo-valkey`: Command to create new Aiven service
     named `demo-valkey`.
   - `--service-type valkey`: Specifies the service type as Aiven for Valkey.
   - `--cloud CLOUD_AND_REGION`: Specifies the cloud provider and region for deployment.
   - `--plan PLAN`: Specifies the service plan or tier.
   - `--project PROJECT_NAME`: Specifies the project where the service will be created.

Explore additional options by running:

- `avn service create -h` for a full list of default flags.
- `avn service types -v` for type-specific options.

</TabItem>
</Tabs>

## Connect to Aiven for Valkey

Learn how to connect to Aiven for Caching using different programming
languages:

- [Go](/docs/products/caching/howto/connect-go)
- [Node](/docs/products/caching/howto/connect-node)
- [PHP](/docs/products/caching/howto/connect-php)
- [Python](/docs/products/caching/howto/connect-python)
