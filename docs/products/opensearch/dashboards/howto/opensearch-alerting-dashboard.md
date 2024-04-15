---
title: Create alerts with OpenSearch® Dashboards
---

OpenSearch® alerting feature sends notifications when data from one or
more indices meets certain conditions that can be customized. Use case
examples are such as monitoring for HTTP status code 503, CPU load
average above certain percentage or watch for counts of a specific
keyword in logs for a specific amount of interval, notification to be
configured to be sent via email, slack or custom webhooks and other
destination.

In the following example we are using Slack as the destination and a
`sample-host-health` index as datasource to create a simple alert to
check cpu load. An action will be triggered when average of
`cpu_usage_percentage` over `3` minutes is above `75%`.

## Create using Dashboards UI

In order to create an alert via OpenSearch Dashboards interface, follow
these steps:

1.  Log in to the [Aiven Console](https://console.aiven.io) and select
    your OpenSearch service.

2.  On the service's **Overview** screen, in the **Connection
    information** section and select the **OpenSearch Dashboards** tab.

    This opens the OpenSearch Dashboard

3.  Within the OpenSearch Dashboard, access the left side panel and
    select **Alerting** under the OpenSearch Plugins section.

To configure each alert the following needs to be created, we will
walk-through configuration of each section.

-   `Destination`
-   `Monitor`
-   `Data source`
-   `Query`
-   `Trigger`

## Create a destination

Destination is a location for notifications to be delivered when an
action is triggered.

1.  Open the **Destination** tab and click **Add destination**

2.  Fill in the fields under **Destination**

    Fill `slack-test` as the **Name**

    Select `Slack` under **Type**

    Paste your slack webhook here `https://your_slack_webhook_URL` under
    **Webhook URL**

:::note
Destination Type can be: `Amazon Chime`, `Slack`, `Custom webhook` or
`Email`
:::

:::important
\- When using email you need to have a SMTP server configured for a
valid domain to deliver email notifications
:::

## Configure authentication for email destination

This section shows how to authenticate the sender account before sending
email messages. To authenticate when sending emails, the credentials
need to be added first to the OpenSearch keystore. Perform this step
before configuring an email destination that requires authentication.

1.  In **Overview** screen of your OpenSearch service, scroll to the
    **Advanced configuration** section.

2.  Select **Change** and **+Add configuration option**.

3.  Select the following configuration options and provide the
    corresponding details for each field:

    -   `email_sender_name`
    -   `email_sender_username`
    -   `email_sender_password`

    At the end of this step the email account credentials will be added
    to the OpenSearch keystore. That is, the steps-by-step procedure
    that follows need to be completed in OpenSearch Dashboards.

4.  Select **Save advanced configuration**.

5.  Open the **Destination** tab in the OpenSearch Dashboard and select
    **Add destination**.

6.  Fill in the fields under **Destination**

    Fill `email-test` as the **Name**

    Select `Email` under **Type**

    In this step we assume that no senders exist yet. So, click first on
    **Manage Senders**, then click **New sender** link.

    Assign a name to the sender. Please note that this name should match
    the property `email_sender_name` from step 1.

    Fill in the information required by the form and select SSL or TLS
    in **Encryption method**.

7.  Lastly you need to complete the form with the recipients, by
    creating email groups in **Manage email groups** if necessary.

## Create a monitor

Monitor is a job that runs on a defined schedule and queries OpenSearch
indices.

1.  Open the **Monitors** tab and click **Create monitor**

2.  Fill in the fields under **Monitor details**

    Fill `High CPU Monitor` into **Monitor name**

    Select `Per query monitor` as the **Monitor type**

    Select `Visual editor` as the **Monitor defining method**

    Select `By interval` under **Schedule** **Frequency**

    Under **Run every** select `1` `Minutes`

:::note
Schedule Frequency can be `By internal`, `Daily` `Weekly` `Monthly`,
`Custom CRON expression`.
:::

1.  Fill in the fields under **Data source**

    Data source is the OpenSearch indices to query.

    Fill `sample-host-health` into **index**

    Fill `timestamp` into **Time field**

2.  **Query**

    Query defines the fields to query from indices and how to evaluate
    the results.

    Under **Metrics** click **Add metric**

    Select `average()` under **Aggregation** and `cpu_usage_percentage`
    under **Field**, click **Save**

    Fill `3` under **Time range for the last** and select `minutes`

## Create a trigger

Triggers is a defined conditions from the queries results from monitor.
If conditions are met, alerts are generated.

1.  Select **Add trigger**

    Fill `high_cpu` as the **Trigger name**

    Select `1 (Highest)` for **Severity level**

    Under **Trigger condition** select `IS ABOVE` from the drop-down
    menu and fill `75` into the number field

:::note
You can see a visual graph below trigger with the index data and the
trigger condition you have defined as a red line
:::

2.  Fill in the fields under **Actions**

    Actions defines the destination for notification alerts when trigger
    conditions are met.

    Fill in `slack` as **Action name**

    Select `slack-test` under **Destination**

    Fill in `High CPU Test Alert` as **Message subject**

:::note
Multiple Actions can be defined, in this example we will define one
action to send notification to destination we have defined in step 4
:::

## Alert message

**Message** can be adjusted as needed, check **Message Preview** to see
the sample and use **Send test message** to validate notification
delivery

Select **Create** and your monitor is ready!

-   For further details on [alerting monitors
    configuration](https://opensearch.org/docs/latest/monitoring-plugins/alerting/monitors/)
