# Procedural Documentation Examples

This document provides real-world examples from Aiven docs and before/after comparisons.

## Example 1: Simple Console Procedure

**Real example from Aiven docs: Manage organizations**

```markdown
## Delete an organization

1. Delete all [projects](/docs/platform/howto/manage-project#delete-a-project) in the organization
   and in the organizational units.
1. Delete all [billing groups](/docs/platform/howto/use-billing-groups#delete-a-billing-group)
   and [addresses](/docs/platform/howto/manage-billing-addresses#delete-an-address).
1. If you use a [marketplace subscription](/docs/platform/howto/list-marketplace-payments)
   to pay for your services, cancel the subscription in the marketplace.
1. Click **Admin**.
1. Click **Organization**.
1. Open each organizational unit by clicking its name then click **Delete** to delete it.
1. After all the organizational units have been deleted, on the **Organization** page click **Delete**.
1. To confirm, click **Delete**.

## Rename an organization

1. In the organization, click **Admin**.
1. Click **Organization**.
1. Click **Rename**.
1. Select **Rename**.
1. Enter the new name.
1. Click **Rename**.
```

**What's good here:**
- Clear imperative verbs (Click, Delete, Enter)
- Bold for UI elements only (no "button" or "link")
- Prerequisite steps linked (delete projects first)
- Simple, direct language
- Short steps (under 25 words each)

---

## Example 2: Multi-Interface Procedure with Tabs

**Real example from Aiven docs: Manage project and service notifications**

```markdown
## Set project contacts

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the project, click **Settings**.
1. On the **Notifications** tab, select the project contacts that you
   want to receive email notifications.
1. Click **Save changes**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `technical_emails` attribute in
[your `aiven_project` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/project#technical_emails-1).

</TabItem>
</Tabs>

## Set service contacts

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the service, click **Service settings**.
1. In the **Service status** section, open the menu in the top right
   and select **Change service contacts**.
1. Select the contacts that should receive email notifications for
   this service.
1. Click **Save**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `tech_emails` attribute in
[your service resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs).

</TabItem>
</Tabs>
```

**What's good here:**
- Same `groupId` used for all tabs (consistent UX)
- Console tab is default
- Terraform content is brief (explains which attribute, links to docs)
- No unnecessary duplication

---

## Example 3: Complex Procedure with Prerequisites and Sub-Steps

**Real example from Aiven docs: Configure Slack notifications for DataHub**

```markdown
Get activity notifications for your DataHub service in a Slack channel, including new datasets, ownership changes, tags, and glossary updates.

You can enable Slack notifications by configuring a Slack app and setting environment variables on the actions app.

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

   - [Slack bot token](https://api.slack.com/authentication/token-types#bot): On
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
   | `DATAHUB_ACTIONS_SLACK_SUPPRESS_SYSTEM_ACTIVITY` | Optional. To get low-level system activity notifications such as datasets being ingested, set to `false`. Defaults to `true`. |

1. Click **Save**.

After setting the variables, the actions app restarts automatically.
```

**What's good here:**
- Single-line intro sentence (states goal and benefit)
- Prerequisites listed as requirements, not instructions
- Contextual intro before sections ("you need to configure a Slack app and set environment variables")
- Multiple sections with clear imperative headings
- Sub-steps indented and numbered
- Tables for multiple configuration values
- Optional step prefix ("Optional. To get low-level...")
- Links to external docs for complex setup
- No filler words

---

## Before/After: Common Mistakes

### Mistake 1: Describing UI control types

**Before (❌ bad):**
```markdown
1. Click the **Save** button in the top right corner.
1. Select the **Enabled** checkbox.
1. Click on the **Delete** link to remove the user.
```

**After (✅ good):**
```markdown
1. Click **Save**.
1. Select **Enabled**.
1. Click **Delete** to remove the user.
```

---

### Mistake 2: Instructions in prerequisites

**Before (❌ bad):**
```markdown
## Prerequisites

- You need to create a Slack app. Follow [this guide](link).
- Get your bot token from the OAuth page by following [these steps](link).
- Contact your workspace admin if you don't have permission.
```

**After (✅ good):**
```markdown
## Prerequisites

- A Slack workspace where you can create and manage apps.
- Admin access to the workspace or permission from the workspace owner.

## Create and configure a Slack app

1. [Create a Slack app](link).
1. On the **OAuth & Permissions** page, get your bot token.
   (Tokens begin with `xoxb-`.)
...
```

---

### Mistake 3: Over-long sentences in steps

**Before (❌ bad):**
```markdown
1. In the project settings under the Notifications tab, select the users or groups who should receive email notifications about plan sizes, performance, outages, and scheduled maintenance.
```

**After (✅ good):**
```markdown
1. In the project, click **Settings**.
1. On the **Notifications** tab, select the recipients for email notifications.
1. Choose from users, groups, or specific email addresses.
```

---

### Mistake 4: Vague list intro

**Before (❌ bad):**
```markdown
Here are the steps below to set up a service:

- Step 1
- Step 2
```

**After (✅ good):**
```markdown
To set up a service, follow these steps:

1. Step 1
1. Step 2
```

---

### Mistake 5: Directional language

**Before (❌ bad):**
```markdown
In the dialog box that appears above, you'll see options.
At the bottom right, click the **Settings** button.
The link to documentation is below.
```

**After (✅ good):**
```markdown
In the dialog box, select your options.
Click **Settings**.
For more information, see the [documentation](link).
```

---

### Mistake 6: Step results

**Before (❌ bad):**
```markdown
1. Click **Save**.
   The dialog will close and the changes will be applied.
1. You'll see a confirmation message indicating success.
```

**After (✅ good):**
```markdown
1. Click **Save**.
```

(If users need to verify an outcome, use an exception, but keep it minimal.)

---

### Mistake 7: Filler words

**Before (❌ bad):**
```markdown
1. Simply click on the **Save** button.
1. You can easily configure settings by just entering values.
1. Quickly add users to the group.
```

**After (✅ good):**
```markdown
1. Click **Save**.
1. Configure settings by entering values.
1. Add users to the group.
```

---

### Mistake 8: Duplicate info

**Before (❌ bad):**
```markdown
## Overview
This section explains how to delete a project.

## Delete a project

1. To delete a project, click **Admin**.
   (More explanation about deletion...)
1. Click **Projects**.
1. Find the project and click **Delete**.
```

**After (✅ good):**
```markdown
## Delete a project

1. Click **Admin**.
1. Click **Projects**.
1. Find the project and click **Delete**.
1. To confirm, click **Delete**.
```

---

## Tabbed Content Anti-Patterns

### Mistake: Using same groupId inconsistently

**Before (❌ bad):**
```markdown
## First section

<Tabs groupId="section1">
  <TabItem value="console">Steps for Console</TabItem>
  <TabItem value="terraform">Steps for Terraform</TabItem>
</Tabs>

## Second section

<Tabs groupId="section2">   <!-- Different groupId! -->
  <TabItem value="console">Steps for Console</TabItem>
  <TabItem value="terraform">Steps for Terraform</TabItem>
</Tabs>
```

**After (✅ good):**
```markdown
## First section

<Tabs groupId="group1">
  <TabItem value="console">Steps for Console</TabItem>
  <TabItem value="terraform">Steps for Terraform</TabItem>
</Tabs>

## Second section

<Tabs groupId="group1">   <!-- Same groupId! -->
  <TabItem value="console">Steps for Console</TabItem>
  <TabItem value="terraform">Steps for Terraform</TabItem>
</Tabs>
```

When users switch to the Terraform tab in the first section, the second section also switches to Terraform automatically.

---

### Mistake: Terraform tabs for deletion

**Before (❌ bad):**
```markdown
## Delete a service

<Tabs groupId="group1">
  <TabItem value="console" label="Console" default>
    1. Click **Services**.
    1. Find the service and click **Delete**.
    1. Confirm deletion.
  </TabItem>
  <TabItem value="terraform" label="Terraform">
    1. Remove the resource block from your `.tf` file.
    1. Run `terraform plan` to review changes.
    1. Run `terraform apply` to delete the service.
  </TabItem>
</Tabs>
```

**After (✅ good):**
```markdown
## Delete a service

1. Click **Services**.
1. Find the service and click **Delete**.
1. Confirm deletion.

For Terraform deletion, see the [Terraform documentation](link).
```

The Terraform steps are generic tool syntax, not Aiven-specific. Skip the tab and link instead.
