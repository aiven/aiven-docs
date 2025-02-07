---
title: Get started with Aiven for Valkey™
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CreateService from "@site/static/includes/create-service-console.md"
import Help from "@site/static/includes/cli-help.md"

Begin your journey with Aiven for Valkey™, the versatile in-memory data store offering high-performance capabilities for caching, message queues, and efficient data storage solutions.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- [Aiven CLI](https://github.com/aiven/aiven-client) installed

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

<CreateService serviceType="Valkey"/>

</TabItem>
<TabItem value="CLI" label="CLI">

1. Determine the service specifications, including plan, cloud provider, region,
   and project name.

1. Run the following command to create a Valkey service named `demo-valkey`:

   ```bash
    avn service create demo-valkey     \
    --service-type valkey              \
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

<Help/>

</TabItem>
</Tabs>

## Connect to Aiven for Valkey

Learn how to connect to Aiven for Valkey using different programming
languages or through `valkey-cli`:

- [valkey-cli](/docs/products/valkey/howto/connect-valkey-cli.md)
- [Go](/docs/products/valkey/howto/connect-go)
- [Node](/docs/products/valkey/howto/connect-node)
- [PHP](/docs/products/valkey/howto/connect-php)
- [Python](/docs/products/valkey/howto/connect-python)
- [Java](/docs/products/valkey/howto/connect-java)
