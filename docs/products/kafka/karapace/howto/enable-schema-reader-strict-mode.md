---
title: Enable shutdown of Karapace for invalid schema records
sidebar_label: Shutdown for invalid schema records
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons"

You can configure the Karapace schema registry to shut down when corrupt schema records are detected in the `_schemas` topic.

## Why enable Karapace to shutdown

By default, Karapace skips invalid schema records to prevent interruptions. To ensure
data consistency, you can enable `schema_reader_strict_mode` to shut down Karapace when
it detects faulty records. This ensures that only valid schemas are processed,
preventing data integrity issues.

## What to do if Karapace shuts down

- **Contact Aiven support**: If Karapace shuts down due to corrupt schema records,
  [create a support ticket](/docs/platform/howto/support) or email
  [Aiven support](mailto:support@aiven.io).

- **Disable strict mode**: You can also disable `schema_reader_strict_mode` to allow
  Karapace to continue running while skipping faulty records.

## Enable Karapace shutdown

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

Enable shutdown of Karapace using the [Aiven CLI](/docs/tools/cli):

```bash
aiven service update \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  --user-config schema_reader_strict_mode=true
```

Parameters:

- `PROJECT_NAME`: Name of your project in Aiven.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka® service.
- `--user-config schema_reader_strict_mode=true`: Enables the shutdown of Karapace
  when it detects corrupt schema records.

</TabItem>
<TabItem value="API" label="API">

Enable shutdown of Karapace using the [Aiven API](/docs/tools/api).

```bash
curl -X PUT \
-H "Authorization: Bearer <token>" \
-d '{"user_config": {"schema_reader_strict_mode": true}}' \
https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME
```

Parameters:

- `PROJECT_NAME`: Name of your project in Aiven.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka® service.
- `Authorization: Bearer <token>`: Your API authentication
  [token](/docs/platform/concepts/authentication-tokens).
- `"user_config": {"schema_reader_strict_mode": true}`: Enables the shutdown of
  Karapace when it detects corrupt schema records.

</TabItem>
</Tabs>
