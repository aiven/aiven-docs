---
title: Create alerts with OpenSearch® Dashboards
sidebar_label: Create alerts
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import ConsoleIcon from "@site/src/components/ConsoleIcons";

Set up alerts in OpenSearch® Dashboards to send notifications when your data meets specific conditions.

The OpenSearch alerting feature monitors data from one or more indexes and sends
notifications when conditions are met. You can use alerts to monitor HTTP status codes,
CPU load averages, or keyword counts in logs over specific intervals. Configure
notifications to be sent through email, Slack, custom webhooks, or other channels.

To configure an alert, you need the following:

-   [Notification channel](/docs/products/opensearch/dashboards/howto/opensearch-alerting-dashboard#create-a-notification-channel):
    a location for notifications to be delivered when an action is triggered

    - Available channel types are: `Amazon Chime`, `Amazon SNS`, `Slack`, `Custom webhook`,
      `Email`, or `Microsoft Teams`.
    - To use `Email`:
      - Ensure you have an SMTP server configured for a valid domain to deliver email
        notifications.
      - [Configure authentication for an email channel](/docs/products/opensearch/dashboards/howto/opensearch-alerting-dashboard#configure-authentication-for-an-email-channel)
        before configuring the email channel itself.

-   [Monitor](/docs/products/opensearch/dashboards/howto/opensearch-alerting-dashboard#create-a-monitor):
    a job that runs on a defined schedule and queries OpenSearch indexes

    Available frequency options are: `By interval`, `Daily`, `Weekly`, `Monthly`, or
    `Custom CRON expression`.

-   [Data source](/docs/products/opensearch/dashboards/howto/opensearch-alerting-dashboard#configure-a-data-source):
    OpenSearch indexes to query
-   [Query](/docs/products/opensearch/dashboards/howto/opensearch-alerting-dashboard#configure-a-query):
    the fields to query from indexes and the method for evaluating results
-   [Trigger](/docs/products/opensearch/dashboards/howto/opensearch-alerting-dashboard#create-a-trigger):
    a defined condition from the query results from the monitor. If a condition is met,
    the alert is generated.
-   [Action](/docs/products/opensearch/dashboards/howto/opensearch-alerting-dashboard#create-an-action):
    a notification configured to be sent through a specified channel when trigger
    conditions are met. You can define multiple actions.

This guide shows how to create an alert that:

- Checks `CPU load`
- Uses the `sample-host-health` index as the data source
- Uses `Slack` as the notification channel
- Triggers when the average `cpu_usage_percentage` over `3 minutes` exceeds `75%`

## Create a notification channel

Configure your selected type of the notification channel, for example,
[Slack](/docs/products/opensearch/dashboards/howto/opensearch-alerting-dashboard#configure-a-slack-channel)
or [Email](/docs/products/opensearch/dashboards/howto/opensearch-alerting-dashboard#configure-authentication-for-an-email-channel).

### Configure a Slack channel

1.  In OpenSearch Dashboards, go to **Notifications** > **Channels**.
1.  Click **Create channel**.
1.  Enter the following:

    1. **Name**: `slack-test`
    1. **Channel type**: `Slack`
    1. **Slack webhook URL**: Paste your Slack webhook URL.

1.  Click **Create**.

### Configure authentication for an email channel

To authenticate the sender account for sending email messages, add their credentials to
the OpenSearch keystore:

1. Go to the [Aiven Console](https://console.aiven.io).

   1.  On the <ConsoleLabel name="service settings"/> page of your Aiven for OpenSearch®
       service, go to **Advanced configuration**.
   1.  Click **Configure** > **Add configuration options**.
   1.  Add all three of the following configuration options and provide the
       corresponding details for each field:

       -   `email_sender_name`
       -   `email_sender_username`
       -   `email_sender_password`

       :::note
       Configure all three parameters together. You cannot set them individually or save
       the configuration with only some of them set.
       :::

   1.  Click **Save configuration**.

1. Go to OpenSearch Dashboards.

   1. Go to **Notifications** > **Channels**.
   1.  Click **Create channel**.
   1.  Enter the following:

       1. **Name**: `email-test`
       1. **Channel type**: `Email`

   1. Configure a sender:

       1. **Sender type**: Select `SMTP sender`.
       1. Select an SMTP sender. If no SMTP sender exists, create one:
          1. Enter a sender name matching the `email_sender_name` property from the
             keystore configuration.
          1. Click **Create SMTP sender**.
          1. Enter the sender details, select **Encryption method** `SSL/TLS`, and click
             **Create**.

   1. Configure default recipients:

      Select default recipients. If no default recipients exist, create a recipient group:

      1. Click **Create recipient group**.
      1. Enter the recipient group details, and click **Create**.

   1. Click **Create** to save the new channel configuration.

## Access **Alerting** in OpenSearch Dashboards

1.  Log in to the [Aiven Console](https://console.aiven.io) and go to your Aiven for
    OpenSearch service.
1.  On the service's <ConsoleLabel name="overview"/> page, in the **Connection
    information** section, go to the **OpenSearch Dashboards** tab.
1.  Open OpenSearch Dashboards by clicking **Service URI** and logging in.
1.  In OpenSearch Dashboards, go to **Alerting**.

## Create a monitor

In OpenSearch Dashboards, go to **Alerting** > **Monitors** > **Create monitor**.

### Configure monitor details

In the **Monitor details** section:

1. **Monitor name**: Enter `High CPU Monitor`.
1. **Monitor type**: Select `Per query monitor` (selected by default).
1. **Monitor defining method**: Select `Visual editor`.
1. **Frequency**: Select `By interval`.
1. **Run every**: Select `1 Minute(s)`.

### Configure a data source

In the **Select data** section, configure a data source:

1. Enter `sample-host-health` as **Indexes**.
1. Enter `timestamp` as **Time field**.

### Configure a query

In the **Query** section, configure a query:

1. Click **Add metric**.
1. **Aggregation**: Select `average()`.
1. **Field**: Select `cpu_usage_percentage`.
1. Click **Save**.
1. **Time range for the last**: Enter `3 minute(s)`.

### Create a trigger

In the **Triggers** section, create a trigger:

1. Click **Add trigger**.
1. **Trigger name**: Enter `high_cpu`.
1. **Severity level**: Select `1 (Highest)`.
1. **Trigger condition**: Select `IS ABOVE` and enter `75`.

:::note
You can see a visual graph for the trigger with the index data and the defined trigger
condition as a red line.
:::

### Create an action

In the **Triggers** section, configure **Actions** for your trigger.

- To use an existing notification channel for your action:

  1. **Action name**: Enter `slack`.
  1. Select your notification channel.
  1. **Message subject**: Enter `High CPU Test Alert`.
  1. Enter the message body.

- To use a new notification channel for your action:

  1. Click either **Manage channels** or **Create channels**, depending on whether you
     already have notification channels.
  1. [Create a channel](/docs/products/opensearch/dashboards/howto/opensearch-alerting-dashboard#configure-a-slack-channel).
  1. Return to configuring your action: Go to **Alerting** > **Monitors** >
     **Create monitor** > **Triggers** > **Actions**.
  1. **Action name**: Enter `slack`.
  1. Select your new notification channel.
  1. **Message subject**: Enter `High CPU Test Alert`.
  1. Enter the message body.

:::tip
Verify your action configuration by using **Preview message** and **Send test message**.
:::

Click **Create** to finalize your monitor setup.

<RelatedPages/>

- [Alerting monitors configuration](https://opensearch.org/docs/latest/monitoring-plugins/alerting/monitors/)
- [Notifications plugin](https://opensearch.org/docs/latest/observing-your-data/notifications/index/)
