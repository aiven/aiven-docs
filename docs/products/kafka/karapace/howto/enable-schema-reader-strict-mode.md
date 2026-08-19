---
title: Shut down Karapace on invalid schema records
sidebar_label: Shut down on invalid records
description: Configure Karapace Schema Registry to shut down when it detects invalid records in the _schemas topic.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

By default, Karapace Schema Registry skips invalid records in the `_schemas` topic
and continues running.
Enable strict mode to shut down Karapace when it detects invalid schema records.

## Why enable strict mode

Skipping invalid records can hide problems and leave the registry inconsistent.
Enable strict mode when data consistency is more important than keeping Schema Registry
available after it encounters invalid records.

## Enable strict mode

<Tabs groupId="enable-shutdown">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), select your project, and
   choose your **Aiven for Apache Kafka®** service.
1. On the <ConsoleLabel name="overview"/> page, click
   <ConsoleLabel name="service settings"/> from the sidebar.
1. Scroll to **Advanced configuration** and click **Configure**.
1. Click <ConsoleIcon name="Add config options"/>.
1. Find `schema_registry_config.schema_reader_strict_mode` and set it to **Enabled**.
1. Click **Save configuration**.

</TabItem>
<TabItem value="CLI" label="CLI">

Enable strict mode with the [Aiven CLI](/docs/tools/cli):

```bash
avn service update SERVICE_NAME \
  -c schema_registry_config.schema_reader_strict_mode=true
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka® service.
- `schema_registry_config.schema_reader_strict_mode=true`: Shuts down Karapace when
  invalid schema records are detected.

</TabItem>
<TabItem value="API" label="API">

Enable strict mode with the [Aiven API](/docs/tools/api):

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "schema_registry_config": {
        "schema_reader_strict_mode": true
      }
    }
  }'
```

Parameters:

- `PROJECT_NAME`: Name of your project in Aiven.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka® service.
- `TOKEN`: Your API authentication
  [token](/docs/platform/concepts/authentication-tokens).
- `schema_reader_strict_mode`: When `true`, Karapace shuts down if it detects invalid
  schema records.

</TabItem>
</Tabs>

## What to do if Karapace shuts down

If strict mode stops Karapace because of invalid records in `_schemas`:

1. Disable strict mode so Schema Registry can start again and skip invalid records.
   Use the same Console, CLI, or API steps as in [Enable strict mode](#enable-strict-mode),
   and set the option to **Disabled** or `false`.
1. [Create a support ticket](/docs/platform/howto/support) or email
   [Aiven support](mailto:support@aiven.io) so the invalid records can be investigated
   and fixed.

<RelatedPages/>

- [Enable schema registry and REST proxy](/docs/products/kafka/karapace/howto/enable-karapace)
- [Karapace](/docs/products/kafka/karapace)
