---
title: Create alerts with OpenSearch® Dashboards
sidebar_label: Create alerts
---

import RelatedPages from "@site/src/components/RelatedPages";

OpenSearch® alerting feature sends notifications when data from one or more indices meets certain conditions that can be customized.

Use case examples include monitoring for HTTP status code 503, CPU load
average above a certain percentage, or watching for counts of a specific
keyword in logs for a specific interval. Notifications can be
configured to be sent via email, Slack, or custom webhooks and other
channels.

In the following example, we use Slack as the notification channel and a
`sample-host-health` index as data source to create a simple alert to
check CPU load. An action will be triggered when the average of
`cpu_usage_percentage` over `3` minutes is above `75%`.

## Create using Dashboards UI

To create an alert via OpenSearch Dashboards interface:

1.  Log in to the [Aiven Console](https://console.aiven.io) and select
    your OpenSearch service.
1.  On the service's **Overview** screen, in the **Connection
    information** section, select the **OpenSearch Dashboards** tab.
    This opens OpenSearch Dashboards.
1.  Within OpenSearch Dashboards, access the left side panel and
    select **Alerting** under the OpenSearch Plugins section.

To configure each alert, the following needs to be created. We will
walk through the configuration of each section:

-   `Notification channel`
-   `Monitor`
-   `Data source`
-   `Query`
-   `Trigger`

## Create a notification channel

A notification channel is a location for notifications to be delivered when an
action is triggered.

1.  In OpenSearch Dashboards, select **Notifications** from the left side panel.
1.  Select the **Channels** tab and click **Create channel**.
1.  Fill in the fields under **Channel details**.

    1. Fill in `slack-test` as the **Name**.
    1. Provide a description (optional).
    1. Select `Slack` under **Channel type**.

       :::note

       - Channel types can be: `Amazon Chime`, `Amazon SNS`, `Slack`, `Custom webhook`,
         `Email`, or `Microsoft Teams`.
       - To use `Email`, ensure you have an SMTP server configured for a
         valid domain to deliver email notifications.

       :::

    1. Paste your Slack webhook URL `https://your_slack_webhook_URL` under
       **Webhook URL**.

1.  Click **Create**.

## Configure authentication for email channel

This section shows how to authenticate the sender account before sending
email messages. To authenticate when sending emails, the credentials
need to be added first to the OpenSearch keystore. Perform this step
before configuring an email channel that requires authentication.

1.  In the **Overview** screen of your OpenSearch service, scroll to the
    **Advanced configuration** section.
1.  Select **Change** and **+Add configuration option**.
1.  Select the following configuration options and provide the
    corresponding details for each field:

    -   `email_sender_name`
    -   `email_sender_username`
    -   `email_sender_password`

    At the end of this step, the email account credentials will be added
    to the OpenSearch keystore.

1.  Select **Save advanced configuration**.

In OpenSearch Dashboards:

1.  Select **Notifications** from the left side panel.
1.  Select the **Channels** tab and click **Create channel**.
1.  Fill in the fields under **Channel details**.

    1. Fill in `email-test` as the **Name**.
    1. Select `Email` under **Channel type**.
    1. Under **Email settings**, click **Manage senders** if no senders exist yet, then
       select **Create sender**.
    1. Assign a name to the sender. This name should match the property
       `email_sender_name` from the keystore configuration.
    1. Fill in the information required by the form and select SSL or TLS
       in **Encryption method**.

1.  Complete the form with the recipients. You can create email groups in
    **Manage email groups** if necessary.
1.  Click **Create**.

## Create a monitor

A monitor is a job that runs on a defined schedule and queries OpenSearch
indices.

1.  Open the **Monitors** tab and click **Create monitor**.
1.  Fill in the fields under **Monitor details**:

    1. Fill in `High CPU Monitor` as the **Monitor name**.
    1. Select `Per query monitor` as the **Monitor type** (selected by default).
    1. Select `Visual editor` as the **Monitor defining method**.
    1. Under **Frequency**, select `By interval`.
    1. Under **Run every**, select `1` `Minutes`.

    :::note
    Frequency can be `By interval`, `Daily`, `Weekly`, `Monthly`, or
    `Custom CRON expression`.
    :::

1.  Fill in the fields under **Select data**. Data source is the OpenSearch indices to
    query.

    1. Fill in `sample-host-health` as the **Index**.
    1. Fill in `timestamp` as the **Time field**.

1.  Configure the **Query**. Query defines the fields to query from indices and how to
    evaluate the results.

    1. Under **Metrics**, click **Add metric**.
    1. Select `average()` under **Aggregation** and `cpu_usage_percentage` under **Field**.
    1. Click **Save**.
    1. Fill in `3` under **Time range for the last** and select `minutes`.

## Create a trigger

A trigger is a defined condition from the query results from the monitor.
If conditions are met, alerts are generated.

1.  Select **Add trigger**.

    1. Fill `high_cpu` as the **Trigger name**.
    1. Select `1 (Highest)` for **Severity level**.
    1. Under **Trigger condition**, select `IS ABOVE` from the drop-down menu and fill
       `75` into the number field.

    :::note
    You can see a visual graph below the trigger with the index data and the
    trigger condition you have defined as a red line.
    :::

1.  Fill in the fields under **Actions**. Actions define the notification channel for
    alerts when trigger conditions are met.

    1. Fill in `slack` as **Action name**.
    1. Select `slack-test` under **Notification channel**.
    1. Fill in `High CPU Test Alert` as **Message subject**.

    :::note
    Multiple actions can be defined. In this example, we define one
    action to send notifications to the channel we created earlier.
    :::

## Alert message

The **Message** can be adjusted as needed. Check **Message Preview** to see
a sample and use **Send test message** to validate notification
delivery.

Select **Create**.

<RelatedPages/>

- [Alerting monitors configuration](https://opensearch.org/docs/latest/monitoring-plugins/alerting/monitors/)
- [Notifications plugin](https://opensearch.org/docs/latest/observing-your-data/notifications/index/)
