# Procedural documentation patterns

This document describes recurring structural patterns used in Aiven procedural documentation.

## Intro sentence

The intro sentence is the first line after frontmatter. It must:
- Be a single, complete sentence
- Be on one line (even if it exceeds line-length limits; ignore linter)
- State the goal, benefit, or context of the procedure
- Immediately orient the reader to what they'll accomplish

**Examples:**

```markdown
Learn how to manage your organizations via the Aiven Console.

To stay up to date with the latest information about services and projects, you can set service and project contacts to receive email notifications.

Get activity notifications for your DataHub service in a Slack channel, including new datasets, ownership changes, tags, and glossary updates.
```

## Prerequisites section

Prerequisites list what the reader needs before starting, not how to obtain them.

**Structure:**
- Heading: "Prerequisites"
- Bulleted list introduced with a complete sentence
- List items only (no instructions or steps)
- If setup is complex, link to a separate doc or include steps in the main procedure

**Good example:**
```markdown
## Prerequisites

- A Slack workspace where you can create and install apps
- The ID of the Slack channel to send notifications to
```

**Anti-pattern (instructions in prerequisites):**
```markdown
## Prerequisites

- Follow [this guide](link) to create a Slack app
- Create an email address for your channel
```
**Fix:** Move instructions to the main procedure or link to docs that cover setup.

## Multi-section procedures

Group related tasks under section headings with imperative verbs. Each section contains its own numbered steps.

**Pattern:**
```markdown
## Main task

Intro paragraph explaining what this section does.

## Subtask 1: Verb phrase

1. Step one
1. Step two

## Subtask 2: Verb phrase

1. Step one
1. Step two
```

**Real example:**
```markdown
## Set project contacts

1. In the project, click **Settings**.
1. On the **Notifications** tab, select the project contacts.
1. Click **Save changes**.

## Set service contacts

1. In the service, click **Service settings**.
1. In the **Service status** section, open the menu and select **Change service contacts**.
1. Select the contacts for this service.
1. Click **Save**.
```

## Tabs component (multiple interfaces)

Use Tabs when a procedure has different steps for different interfaces (Console, Terraform, CLI, API).

**Pattern:**
```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Do something

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Step one
1. Step two

</TabItem>
<TabItem value="terraform" label="Terraform">

Use [the `resource_name` resource](/link/to/terraform/docs).

</TabItem>
</Tabs>
```

## Do something else

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Step one
1. Step two

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `attribute_name` in [your `resource_name` resource](/link/to/terraform/docs).

</TabItem>
</Tabs>
```

**Key rules:**
- Use the same `groupId` for all tabbed sections on a page (e.g., all use `groupId="group1"`)
- This ensures when users switch tabs in one section, all sections switch
- Tab IDs should be semantic: `value="console"`, `value="terraform"`, `value="cli"`, `value="api"`
- Default tab is usually Console: `default`

**When NOT to use Terraform tabs:**
- Deletion/removal procedures (unless there are feature-specific warnings)
- Viewing/reading resource info (generic Terraform syntax)
- Instead, omit instructions altogether for Terraform; alternatively, if necessary, link to Terraform docs for these cases

## Sub-steps pattern

When a step contains sub-steps, format as parent step with indented numbered list.

**Pattern:**
```markdown
1. Configure the OAuth credentials:

   1. Copy the bot token from **OAuth & Permissions**.
   1. Go to **Basic Info** and copy the signing secret.
   1. Verify the channel ID (starts with `C`).

1. Next main step.
```

## Form field and config tables

For multiple key-value pairs, use a table instead of listing inline.

**Pattern:**
```markdown
| Key | Value |
|-----|-------|
| `SLACK_BOT_TOKEN` | Your Slack bot token. |
| `SLACK_SIGNING_SECRET` | Your signing secret from **Basic Info**. |

Or for form fields:

1. In the **Environment variables** section, click **Edit**.
1. On the **Variables** tab, add the following:

| Key | Value |
|-----|-------|
| `DATAHUB_ACTIONS_SLACK_ENABLED` | `true` |
| `DATAHUB_ACTIONS_SLACK_CHANNEL` | Your Slack channel ID. |
```

## Cross-references

Link to related procedures when relevant.

**Pattern:**
```markdown
You must first delete all [projects](/docs/platform/howto/manage-project#delete-a-project)
and [billing groups](/docs/platform/howto/use-billing-groups#delete-a-billing-group)
before you can delete an organization.

For more information, see [Set up SSH tunneling](/docs/platform/howto/create-ssh-tunnels).
```

**Rules:**
- Use link text that matches the target page title
- Include anchors to jump directly to relevant sections
- Don't refer to links as "below" or "above"—use "see [page title]"

## Note callouts

Use notes for contextual information that supports but doesn't interrupt the procedure.

**Pattern:**
```markdown
1. In Slack, [create an email address](https://slack.com/help/articles/206819278)
   for a channel.

   :::note
   If you don't see the email integrations option, ask the workspace admin
   to [allow incoming emails](https://slack.com/help/articles/360053335433).
   :::

1. Next step.
```

## Contextual introduction

For complex multi-part procedures, provide brief context before step groups.

**Pattern:**
```markdown
To enable Slack notifications, you need to configure a Slack app and set environment variables.

## Create and configure a Slack app

You can enable Slack notifications by configuring a Slack app...

1. Step one
1. Step two

## Enable notifications in the service

1. Step one
1. Step two
```

This context helps readers understand the overall flow before diving into specific sections.

## Multi-system procedures (numbered steps)

This advanced pattern is used for procedures that involve alternating between multiple systems/interfaces or have many steps grouped by logical phases.

**Use this pattern when:**

1. **Multi-system workflows**: Users must move back and forth between 2+ different systems or interfaces (e.g., Aiven Console ↔ external IdP like Okta, Gmail, etc.)
   - Each "Step N" section groups work in a specific system
   - Example: Step 1 (Aiven), Step 2 (Okta), Step 3 (back to Aiven)

2. **12+ steps with distinct phases**: A single procedure exceeds 12 steps and logically breaks into sequential phases
   - Numbered steps clarify which phase the user is in
   - Helps with scanability and mental checkpoints
   - Example: setup phase → configuration phase → validation phase

**Do NOT use this pattern for:**
- Single-system procedures (use verb-based headings like "Configure Slack notifications")
- Simple procedures with fewer than 12 steps that don't alternate between systems
- Cases where verb-based headings are clearer

**Structure:**

```markdown
# Title

Intro sentence explaining the procedure.

## Step 1: System or phase name

Optional paragraph explaining what happens in this step group.

1. Step one
1. Step two
1. Step three

## Step 2: Different system or next phase

Paragraph explaining the transition or what to do in this phase.

1. Step one
1. Step two

## Step 3: Back to first system or final phase

1. Step one
1. Step two
```

**Key guidelines:**

- Heading format: `## Step N: System/Interface or Phase Name`
  - Clearly identify which system or phase this section covers
  - Examples: "Step 1: Create application in Google", "Step 2: Configure SAML in Aiven"

- Optional context intro: Briefly explain what happens before the numbered steps
  - Example: "Use the metadata URL and ACS URL from the Aiven Console to configure a new application in your IdP."

- Numbered steps within each section: Use standard `1.` numbering (not hierarchical like 1.1, 1.2)
  - Steps follow normal procedural conventions
  - Use sub-steps only if needed for complex substeps

- Make transitions explicit: When moving between systems, signal the context switch
  - Example: "Go back to the Aiven Console to complete setting up the IdP."

**Real examples from Aiven docs:**

From [Add SAML identity providers](/docs/platform/howto/saml/add-identity-providers.md):
- Step 1: Start configuration in Aiven (get metadata/ACS URLs)
- Step 2: Configure SAML on your IdP (IdP-specific setup)
- Step 3: Finish configuration in Aiven (enter IdP URLs)
- Step 4: Optional: Link users to the identity provider

From [Add Okta as an identity provider](/docs/platform/howto/saml/add-okta-idp.md):
- Step 1: Start configuration in Aiven
- Step 2: Configure SAML on Okta (8+ steps within this section)
- Step 3: Finish configuration in Aiven
- Step 4: Optional: Configure user provisioning

This pattern helps readers navigate complex multi-system integrations by making the workflow structure explicit.
