---
title: Send metrics to Datadog
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Send metrics from your Aiven service to your external Datadog account.

## Prerequisites

- A Datadog account
- A Datadog [API key](https://docs.datadoghq.com/account_management/api-app-keys/)
- A running Aiven service

## Add a Datadog integration endpoint

You can use the Datadog integration endpoint for multiple services.

1.  In the project, click <ConsoleLabel name="integration endpoints"/>.
1.  Select **Datadog** > **Create new** or **Add new endpoint**.
1.  Enter a name for the endpoint and your Datadog **API key**.
1.  Select the Datadog **Site** that you use. The site is shown in your
    [Datadog website URL](https://docs.datadoghq.com/getting_started/site/).
1.  Optional: Add [custom tags](/docs/integrations/datadog/add-custom-tags-to-datadog)
    to send with the metrics to Datadog.
1.  Click **Add endpoint**.

## Add a Datadog metrics integration to an Aiven service

1.  In the service, click **Integrations**.
1.  In the **Endpoint integrations** select **Datadog Metrics**.
1.  Select your Datadog integration endpoint and click **Enable**.

:::tip
For Aiven for Apache Kafka® services you can also
[customize the metrics sent to Datadog](/docs/products/kafka/howto/datadog-customised-metrics).
:::

You can see the metrics data on your Datadog dashboard.

## Related pages

- Learn more about [Datadog and Aiven](/docs/integrations/datadog).
- [Monitor PgBouncer with Datadog](/docs/products/postgresql/howto/monitor-pgbouncer-with-datadog).
- Enable
  [database monitoring with Datadog](/docs/products/postgresql/howto/monitor-database-with-datadog).
