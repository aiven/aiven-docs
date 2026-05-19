---
title: Configure Teams notifications for DataHub activity
sidebar_label: Configure Teams notifications
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";

Get activity notifications for your DataHub service in a Microsoft Teams channel, including new datasets, ownership changes, tags, and glossary updates.

You can enable Teams notifications by creating a Power Automate flow in Teams
and setting environment variables on the actions app.

:::note
Teams webhook delivery is rate-limited to about one message per second.
If many changes happen at once, they queue and might arrive with a slight delay.
:::

## Prerequisites

- A Microsoft Teams team and channel where you can add workflows.
- Permission to create and manage Power Automate flows in that team.

## Create a workflow in Teams

1. In Teams, open the channel to send notifications to.

1. In the channel menu, click **Workflows** >
   **Post to a channel when a webhook request is received**.

1. Enter a name for the workflow and confirm the team and channel.

1. Open the workflow and configure it:

   - **Trigger**: When a Teams webhook request is received
   - **Action**: Post message in a chat or channel
   - **Message body expression**: `coalesce(triggerBody()?['text'], string(triggerBody()))`

1. Copy the generated webhook URL.
   :::important
   Treat the webhook URL as a secret. If the URL is exposed,
   rotate it by deleting and recreating the workflow.
   :::

1. In the Power Automate flow settings, set **Who can trigger the flow?** to **Anyone**.

## Enable Teams notifications in DataHub

1. In your DataHub service, go to the **DataHub resources** section.
1. Open the Aiven App that ends in `-actions`.
1. In the **Environment variables** section, click **Edit**.
1. On the **Secrets** tab, add the following secret:

   | Key | Value |
   |-----|-------|
   | `DATAHUB_ACTIONS_TEAMS_WEBHOOK_URL` | The generated webhook URL. |

1. On the **Variables** tab, add the following variables:

   | Key | Value |
   |-----|-------|
   | `DATAHUB_ACTIONS_TEAMS_ENABLED` | `true` |
   | `DATAHUB_ACTIONS_TEAMS_DATAHUB_BASE_URL` | The DataHub **Application URL** from the **Connection information**. Adds links in messages. Defaults to `http://localhost:9002`. |

After setting the variables, the actions app restarts automatically.

<RelatedPages/>
- [Configure Slack notifications](/docs/products/datahub/configure-slack-notifications)
