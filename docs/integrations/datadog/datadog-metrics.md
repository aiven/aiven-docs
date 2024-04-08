---
title: Send metrics to Datadog
---

Send metrics from your Aiven service to your Datadog account.

## Prepare your Datadog account

Before you begin, ensure you know:

- The region of your Datadog account.
- Your Datadog API key. Generate an API key for your Datadog account
  in the **Organization settings**, and click **API Keys** > **New Key**. Make sure to
  copy this key.

## Configure the service integration endpoint

This section needs to be completed only once for each Datadog account
you intend to use. Afterward, multiple services can use this service
integration endpoint.

1.  Log in to the [Aiven Console](https://console.aiven.io/).
1.  In the **Services** screen, select **Integration endpoints** on the
    left sidebar.
1.  Select **Datadog** > **Add new endpoint** or **Create new**.
1.  Configure the endpoint by providing a name for this integration and
    entering the API key you copied earlier. Ensure that the correct
    region is selected.

    ![Screenshot of the Datadog configuration screen](/images/content/integrations/configure-datadog-service-integration.png)

1.  Optionally, include additional tags that will be used when sending
    metrics to Datadog. Refer to
    [Add custom tags Datadog integration](/docs/integrations/datadog/add-custom-tags-to-datadog) to learn more about adding tags to the Datadog
    integration. You can always add or edit tags later.
1.  Select **Add endpoint** to save this configuration.

## Add Datadog metrics integration to your Aiven service

To enable the Datadog metrics integration for each service that requires
metric tracking in Datadog, follow these steps:

1.  In the [Aiven Console](https://console.aiven.io/), select your
    service.
1.  From the **Overview** page of your service, scroll to **Service
    integrations** and select **Manage integrations**.
1.  In the **Integrations** screen, select **Datadog Metrics**.
1.  Select the Datadog endpoint you want to use from the drop-down list
    and select **Enable**.

    :::tip
    If you're using Aiven for Apache Kafka® you can also
    [customise the metrics sent to Datadog](/docs/products/kafka/howto/datadog-customised-metrics).
    :::

1.  Return to your Datadog dashboard and after a few minutes, you should
    see the data start to arrive from your Aiven services.

## Related pages

- Learn more about [Datadog and Aiven](/docs/integrations/datadog).
- For information on how to enable [Datadog Deep Database
  Monitoring](https://www.datadoghq.com/product/database-monitoring/) for
  specific Datadog Metrics integration, see
  [Database monitoring with Datadog](/docs/products/postgresql/howto/monitor-database-with-datadog).
