---
title: Manage project and service notifications
---

To stay up to date with the latest information about services and projects, you can set service and project contacts to receive email notifications.
Notifications include information about plan sizes, performance, outages, and scheduled maintenance.

The contacts for a project can be set to the admin and operators of that
project (this is the default), or to specific email addresses. Project
contacts receive notifications about the project. They also receive the
notifications for all services, unless you set a separate service
contact for a service.

Service contacts by default are the project contacts. However, if you
set other email addresses as service contacts for a service, email
notifications will only be sent to those contacts for that specific
service.

## Set project contacts

1.  In the project, click **Settings**.
1.  On the **Notifications** tab, select the project contacts that you
    want to receive email notifications.
1.  Click **Save changes**.

## Set service contacts

1.  In the service, click **Service settings**.
1.  In the **Service status** section, open the menu in the top right
    and select **Change service contacts**.
1.  Select the contacts that should receive email notifications for
    this service.
1.  Click **Save**.

## Set up Slack notifications

To get notifications in Slack, you can add a Slack channel's or DM
email address to the technical contacts for an Aiven project:

1.  In Slack, [create an email address for a channel or
    DM](https://slack.com/help/articles/206819278-Send-emails-to-Slack#h_01F4WDZG8RTCTNAMR4KJ7D419V).

    :::note
    If you don't see the email integrations option, ask the owner or
    admin of the workspace or organization to [allow incoming
    emails](https://slack.com/help/articles/360053335433-Manage-incoming-emails-for-your-workspace-or-organization).
    :::

1.  In the [Aiven Console](https://console.aiven.io/), go to the project
    or service to get notifications for.

1.  Set the Slack email address as a
    [project contact](/docs/platform/howto/technical-emails#set-project-contacts) or
    [service contact](/docs/platform/howto/technical-emails#set-service-contacts).

Alternatively, you can [set up a Slackbot forwarding
address](https://slack.com/help/articles/206819278-Send-emails-to-Slack#h_01F4WE06MBF06BBHQNZ1G0H2K5)
and use to automatically forward Aiven's email notifications from
your email client.
