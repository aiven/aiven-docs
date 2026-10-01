---
name: procedural-documentation
description: Write step-by-step procedural documentation following Aiven's patterns and style. Use when creating how-to guides, configuration procedures, task-based documentation, or reviewing procedural content for compliance with Aiven standards.
---

# Procedural documentation

This skill guides agents in writing clear, consistent procedural documentation that follows Aiven's patterns and style conventions. It's also used for reviewing documented procedures.

## Quick start checklist

Before writing or reviewing procedures, verify:

- [ ] **Intro sentence**: One sentence, single line, immediately after frontmatter, states goal/benefit
- [ ] **Permissions**: Most procedures require specific roles or permissions, and should include the `RequirementsPanel` (see [documenting-permissions](#related-skills) skill)
- [ ] **Prerequisites**: List requirements only (no instructions); link if setup steps needed
- [ ] **Structure**: Group related tasks in section headings using imperative verbs
- [ ] **Steps**: Numbered list (1. for all steps), imperative mood, clear action verbs
- [ ] **UI elements**: Bold the control name only (never say "button", "link", "field")
- [ ] **Optional steps**: Prefix with "Optional:"
- [ ] **Lists**: Introduce with complete sentence; refer to "the following", not "below"
- [ ] **Tabs**: Use same `groupId` across all tabbed sections; skip Terraform for deletion procedures
- [ ] **Sentences**: Keep under 25 words; no filler words ("just", "easily", "simply")
- [ ] **No step results**: Don't describe expected outcomes in step text
- [ ] **Terraform**: Include only for example usage, attributes, or getting started (not deletion)
- [ ] **Cross-references**: Link to related docs when needed

## Core rules

### Structure

**Intro sentence** (@universal @procedure)
- One sentence placed immediately after the frontmatter
- Must be on a single line (ignore linter for this sentence)
- States the goal or benefit of the procedure
- Example: "Learn how to manage your organizations via the Aiven Console."

**Prerequisites** (@procedure)
- Optional but recommended for complex procedures
- List requirements only; do not include instructions
- If setup steps are needed, include them in the main procedure or link to separate docs
- Use a bulleted list introduced with a complete sentence

**Section headings** (@procedure)
- Use imperative verbs for task-based headings
- Group related tasks together
- Examples: "Set project contacts", "Configure Slack notifications", "Delete an organization"
- For multi-system procedures with many steps (12+), use "Step 1", "Step 2" headings instead (see [patterns.md](patterns.md))

**Numbered steps** (@procedure @universal)
- Use numbered lists for all ordered procedures
- Use "1." for every step; Markdown auto-numbers
- Start with action verbs: Click, Enter, Select, Add, Open, Go to, Delete
- Use imperative mood: "Click Save", not "You should click Save"
- Avoid filler words: "just", "easily", "simply", "quickly"

### UI and Format Rules

**UI elements** (@procedure @universal)
- **Bold** the control name; never describe the type
  - ✅ Click **Save**
  - ❌ Click the **Save** button
- Never say: "button", "link", "field", "menu", "dialog", "window"
- Menu chains: `Click **Admin** > **Organization** > **Users**`
- Checkboxes: "Select **Enable backups**" or "Clear **Enable backups**"
- Toggles: "Click the **Advanced options** toggle to turn it on"
- Use ConsoleLabel component where available: `<ConsoleLabel name="userinformation"/>`
- Files: Use qualifying nouns (the `config.json` file, the `README.md` document)

**Form fields and code values** (@procedure @code)
- Format: "In the **Service name** list, select **`prod-pg`**"
- Tables for multiple key-value pairs (use pipes for config, variables, secrets)
- **Bold + code for UI values**: **`prod-pg`**

**Optional steps** (@procedure)
- Prefix with "Optional:" followed by the step
- Example: "Optional: To enable debugging, set `DEBUG=true`"

**Sub-steps** (@procedure)
- Parent step ends with colon or period
- Indent numbered sub-steps consistently
- Maintain hierarchical structure

### Lists and Cross-References

**List introductions** (@procedure @prose)
- Introduce lists with a complete sentence ending in period or colon
- Refer to lists as "the following" (not "below")
- Example: "Prerequisites include the following:" or "To set up the service, follow these steps:"

**Cross-references** (@procedure)
- Link to related procedures: "[Delete projects](/docs/platform/howto/manage-project#delete-a-project)"
- Use link text matching the target page title when possible
- Try to link text that describes the action ("You can [delete your projects](/docs/platform/howto/manage-project#delete-a-project) later")
  or concept ("You can grant [application users](/docs/platform/concepts/application-users) access..."); prefer this over "See the [application users](/docs/platform/concepts/application-users) page"
- Include anchors for direct jumps to relevant sections

**Callout notes** (@procedure)
- Use `:::note` syntax for contextual information
- Keep notes concise and relevant to the procedure
- Avoid adding too much noise by overusing notes

### Multiple interfaces

**Tabs component** (@procedure)
- Use for procedures supporting multiple methods (Console, Terraform, CLI, API)
- Tab labels should be one of the following: Console, Terraform, API, CLI, Kubernetes; do not use the full name (like Aiven Console, Aiven Terraform Provider), or abbreviations (like K8s)
- Console should be the default unless otherwise specificed by the writer
- Example: <TabItem value="console" label="Console" default>
- Always use the same tab ID (`groupId`) on a page for consistent UX across sections
- Example: `<Tabs groupId="group1">` for all tabbed sections
- **DO NOT include Terraform tabs for deletion/removal procedures** (document tool syntax, not Aiven features)
- Exception: Include Terraform tabs for deletion if there are feature-specific warnings or notes
- When deletion is tool-generic, link to Terraform/Kubernetes docs instead

## Related skills

- **[documenting-permissions](../documenting-permissions/SKILL.md)**: Use this to add a quick reference on the roles or permissions required to complete a task. Covers the `RequirementsPanel` component, which helps standardize permission documentation patterns.

## Patterns

For detailed structure patterns, recurring elements, and before/after examples, see [patterns.md](patterns.md).

## Examples

For real-world examples from Aiven docs and common mistakes to avoid, see [examples.md](examples.md).

## Terraform guidelines

When including Terraform instructions and code samples, see [terraform-guidelines.md](terraform-guidelines.md) for:
- When to include Terraform content (and when not to)
- How to use `TerraformSample` and other components
- Attribute documentation best practices
- Getting started example patterns
- Special cases and exceptions

## Style guide reference

For the authoritative style guide covering procedures and all other documentation types, see the [Aiven style guide](./.ai-agents/docs/styleguide.md).

Key procedure rules from the style guide are included in this skill. For additional context or rules outside procedures, reference the style guide directly.
