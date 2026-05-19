---
title: Configure Slack notifications for DataHub activity
sidebar_label: Configure Slack notifications
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";

Get activity notifications for your DataHub service in a Slack channel, including new datasets, ownership changes, tags, and glossary updates.

You can enable Slack notifications by configuring a Slack app
and setting environment variables on the actions app.

## Prerequisites

- A Slack workspace where you can create and install apps.
- The ID of the Slack channel to send notifications to.

## Create and configure a Slack app

1. [Create a Slack app](https://docs.slack.dev/app-management/quickstart-app-settings).

1. On the **OAuth & Permissions** page, add these
   [app scopes](https://docs.slack.dev/app-management/quickstart-app-settings#scopes):

- `chat:write`: Post messages as the Slack bot
- `chat:write.public`: Post in public channels without being a member
- `channels:read`: Look up channel IDs

1. [Install the app](https://docs.slack.dev/app-management/quickstart-app-settings#installing).

1. Get the following app credentials:

   - [Slack bot token](https://api.slack.com/authentication/token-types#bot): On the
     the **OAuth & Permissions** page. Bot tokens begin with `xoxb-`.
   - [Signing secret](https://api.slack.com/authentication/verifying-requests-from-slack):
     From the **Basic Info** section.
   - The Slack channel ID: In the channel details. These IDs start with `C`.

1. For private channels:
   To allow the app to post messages,
   [add it to the channel](https://slack.com/help/articles/201398103-Add-an-app-to-a-channel).
   For public channels, the `chat:write.public` scope lets the bot post without being a member.

## Enable Slack notifications in DataHub

1. In your DataHub service, go to the **DataHub resources** section.
1. Open the Aiven App that ends in `-actions`.
1. In the **Environment variables** section, click **Edit**.
1. On the **Secrets** tab, add the following secrets:

   | Key | Value |
   |-----|-------|
   | `DATAHUB_ACTIONS_SLACK_BOT_TOKEN` | Your Slack bot token. |
   | `DATAHUB_ACTIONS_SLACK_SIGNING_SECRET` | Your signing secret. |

1. On the **Variables** tab, add the following variables:

   | Key | Value |
   |-----|-------|
   | `DATAHUB_ACTIONS_SLACK_ENABLED` | `true` |
   | `DATAHUB_ACTIONS_SLACK_CHANNEL` | Your Slack channel ID. |
   | `DATAHUB_ACTIONS_SLACK_DATAHUB_BASE_URL` | The DataHub **Application URL** from the **Connection information**. Adds links in messages. |
   | `DATAHUB_ACTIONS_SLACK_SUPPRESS_SYSTEM_ACTIVITY` | Optional. To get low level system activity notifications such as datasets being ingested, set to `false`. Defaults to `true`. |

After setting the variables, the actions app restarts automatically.

<RelatedPages/>
- [Configure Teams notifications](/docs/products/datahub/configure-teams-notifications)
