---
name: terraform-documentation
description: Ensure Terraform code samples and instructions in Aiven docs are consistent, accurate, and properly linked. Use when adding Terraform content to documentation, including code samples, attribute guidance, or getting started guides.
---

# Terraform documentation

This skill ensures Terraform code samples and instructions maintain consistency, accuracy, and proper sourcing standards across Aiven documentation. It provides decision trees, formatting rules, and reusable components for all types of Terraform content.

## Before you start: Check the Aiven Provider repository

The first step when planning to include Terraform content is to check whether embeddable example files already exist in the [Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven). This repository is a submodule of the Aiven docs repository at `external/terraform-provider/`.

**How to check:**
1. Look in `external/terraform-provider/resources/` for resource examples (e.g., `resources/aiven_project/resource.tf`)
2. Look in `external/terraform-provider/examples/` for getting started examples (e.g., `examples/clickhouse/clickhouse_service/provider.tf`)
3. Use `git status` or `ls` to verify files exist in the submodule

**If the file exists:** Use the `TerraformSample` component to embed it (follow the patterns below).

**If the file doesn't exist:** 
1. **Create a ticket in the DOC project** to request the example be added to the Aiven Terraform Provider repository
2. **Notify the Terraform technical writer** so they can coordinate with the Terraform team
3. Include in the ticket:
   - What feature or resource needs an example
   - Why it's important for users to have a runnable example
   - Link to the Aiven docs page where it will be used
4. **Prefer waiting for the example to be added to the Terraform repo** before documenting the feature in Aiven docs
   - Only document without a code sample if blocking documentation is critical
   - Use attribute explanation or link to Terraform docs as the fallback approach

**Why request examples in the Terraform repo (and wait for them)?** Examples added to the Terraform repository are:
- Tested as part of CI/CD to ensure they remain valid
- A single source of truth that documentation syncs from (via `TerraformSample`)
- More maintainable than duplicating code in multiple places
- Useful to Terraform users outside of Aiven docs
- Coordinated by the Terraform technical writer to ensure consistency

---

## Quick start: Decision tree

Use this decision tree to determine what Terraform content (if any) belongs in your documentation:

### Step 1: Is this Terraform-specific content?

**Is the task a core Aiven feature or configuration, not a generic Terraform operation?**

- **Yes** → Continue to Step 2
- **No** (deletion, state management, general syntax, etc.) → Link to [Terraform docs](https://www.terraform.io/docs) instead; skip Terraform tabs

### Step 2: What type of Terraform content is needed?

| Content Type | Guidance | Go to |
|---|---|---|
| **Full code sample** (users can copy/paste as a starting point) | Include with `TerraformSample` component | [Getting started examples](#getting-started-examples) |
| **Specific attribute to set** (users know the resource but need to know *which* attribute) | Explain attribute + link to Terraform docs | [Documenting attributes](#documenting-attributes) |
| **Multiple similar resources** (each service has its own resource) | Link to resources; don't repeat examples | [Multiple service resources](#multiple-service-resources) |
| **Complex multi-step configuration** | Link to Terraform docs with brief explanation | [Complex scenarios](#complex-multi-step-scenarios) |

---

## Core principles

### Single source of truth

**Sync examples from the Aiven Provider repository, not custom code**

- The [Aiven Terraform Provider](https://github.com/aiven/terraform-provider-aiven) is the authoritative source for examples
- The Aiven Provider repository is available as a submodule at `external/terraform-provider/` in the Aiven docs repository
- Use the `TerraformSample` component to embed synced files from the submodule
- Never duplicate code from examples; always use the component
- This reduces maintenance burden and keeps examples current

**What to do if an example doesn't exist:**
1. Create a ticket in the DOC project requesting the example be added to the Aiven Terraform Provider
2. Notify the Terraform technical writer to coordinate with the Terraform team
3. **Prefer waiting for the example to be added** before documenting the feature
4. Only document without a code sample if blocking documentation is critical (use attribute explanation or link to Terraform docs as fallback)

**Rationale:** When code changes, we maintain it in one place. The documentation component always pulls the latest version. Examples added to the Terraform repository are tested in CI/CD and become a single source of truth for all users. This prevents drift between documentation and actual code, and ensures consistency for all Terraform users.

### Aiven-specific features only

**Document Aiven platform features and configurations, not Terraform mechanics**

- Include Terraform for: resource examples, feature-specific attributes, getting started guides
- Link to Terraform docs for: deletion syntax, state management, file structure, provider installation basics
- **Why?** Terraform has authoritative documentation. We document Aiven-specific knowledge.

### Accuracy and verification

**Never guess about Terraform configurations, attributes, or URLs**

- Verify all examples exist in the [Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven)
- Verify attribute names and behavior against the actual resource schema
- **Verify all Terraform registry URLs before publishing:**
  - Use `https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/RESOURCE_NAME`
  - Replace `RESOURCE_NAME` with the actual resource (e.g., `aiven_project`)
  - Click the link to verify it resolves and shows the correct resource
  - There is no reason to generate an incorrect URL; always test before committing
- When unsure, link to the Terraform documentation instead of providing custom code
- Flag uncertain content rather than publishing guesses

---

## Documentation patterns by content type

### Full code samples (Getting started examples)

**When to use:** Tutorials, feature overviews, or multi-step configuration guides where users need several resources to get started.

**What to include:**
- `provider.tf` - Provider block with Aiven Provider installation
- `service.tf` or similar - Service resources and related configurations
- `variables.tf` - Declared variables (always includes `api_token`)
- `output.tf` - Output blocks for useful values
- Optional: `service_users.tf`, `integrations.tf`, etc. for complex examples

**Components to use:**

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';
```

**Pattern with explanation:**

```markdown
## Create a [Service/Resource] with [Use Case]

[1-2 sentence intro explaining the scenario and what the example does]

You [create/configure]:
- [Resource 1 description]
- [Resource 2 description]

The following example files are also available in the
[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/SERVICE_NAME) on GitHub.

### Prerequisites

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

[Console prerequisites]

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformPrereqs />

</TabItem>
</Tabs>

### Configuration

1. Create a file named `provider.tf` and add the following:

   <TerraformSample filename='examples/SERVICE_NAME/provider.tf' />

1. Create a file named `service.tf` and add the following:

   <TerraformSample filename='examples/SERVICE_NAME/service.tf' />

1. [Additional steps for other files]

1. Create the `terraform.tfvars` file and add the values for your token and project name.

1. Optional: To output connection details, create a file named `output.tf` and add the following:

   <TerraformSample filename='examples/SERVICE_NAME/output.tf' />

<TerraformApply />
```

**Key points:**
- Keep the intro scenario-focused, not mechanics-focused
- Do NOT include `terraform plan` and `terraform apply` output in the documentation
- Use `TerraformPrereqs` and `TerraformApply` components for standard prerequisites and execution steps
- Always provide a link to the example folder in the GitHub repository so users can clone it

**Example:** [Create organizations and organizational units](https://aiven.io/docs/tools/aiven-console/howto/create-orgs-and-units#create-an-organizational-unit) ✅

---

### Documenting attributes

**When to use:** When explaining which Terraform attribute(s) to use to configure a feature, but the user is already familiar with the resource.

**Do NOT include:** Full code samples, examples of `terraform plan/apply`, or file structure instructions.

**Pattern: Single resource**

When an attribute applies to a specific resource:

```markdown
To [configure feature], use the `attribute_name` attribute in your
[`aiven_resource_name` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_resource_name).
```

**Example:** [Set project contacts - Terraform section](https://aiven.io/docs/platform/howto/technical-emails#set-project-contacts) ✅

```markdown
Use the `technical_emails` attribute in
[your `aiven_project` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/project#technical_emails-1).
```

**Pattern: Multiple service resources**

When an attribute applies to many similar resources (e.g., service users):

```markdown
Each Aiven service has a service-specific resource for [task].
See the Terraform documentation to find the relevant resource for your service:

- PostgreSQL: [aiven_pg_user](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_pg_user)
- MySQL: [aiven_mysql_user](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_mysql_user)
- OpenSearch: [aiven_opensearch_user](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_opensearch_user)

Each resource accepts [brief description of key attributes].
```

**Key points:**
- One line or a short paragraph, never a code block
- Always link to the Terraform documentation
- Brief explanation only if the attribute name is non-obvious

---

### Multiple service resources

**When to use:** When documenting something that applies to many services but requires a different resource for each (e.g., creating service users, backup configuration).

**Pattern:**

```markdown
Each Aiven service has a service-specific resource for [task].
See the Terraform documentation for the available resources:

- [PostgreSQL users](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_pg_user)
- [MySQL users](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_mysql_user)
- [OpenSearch users](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_opensearch_user)

[Brief explanation of what each resource does or which attributes to use, if non-obvious]
```

**Key points:**
- Link to the main Terraform docs listing all service resources
- Or link to specific resources if the documentation has them all indexed
- Avoid repeating the same example for each service; it's maintenance burden

**Rationale:** Different services don't benefit from copy/paste examples—each has its own schema. Users are better served by the Terraform documentation they can search.

---

### Complex multi-step scenarios

**When to use:** Permission granting, multi-resource orchestration, or other complex configurations requiring many resource types.

**Pattern:**

```markdown
To [accomplish task with multiple resource types], use:

- [`resource_type_a`](link) with the `attribute_x` attribute for [purpose]
- [`resource_type_b`](link) with the `attribute_y` attribute for [purpose]

[Brief explanation of the overall flow or key decisions]

See the [Terraform documentation](link) for the full schema and examples.
```

**Key points:**
- Link to Terraform docs rather than duplicating lengthy examples
- Explain the overall pattern briefly
- Let users refer to the authoritative Terraform docs for details

---

## Component reference

### `TerraformSample`

Embeds code files synced from the Aiven Provider repository.

**Usage:**
```markdown
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

<TerraformSample filename='resources/aiven_project/resource.tf' />
```

**File path format:**
- For resources: `resources/RESOURCE_NAME/resource.tf`
- For examples: `examples/SERVICE_NAME/provider.tf`, `examples/SERVICE_NAME/service.tf`, etc.
- Always use relative paths from the repo root
- Verify files exist in the [Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven)

**Always follow with a documentation link:**
```markdown
<TerraformSample filename='resources/aiven_project/resource.tf' />

More information on this resource and its configuration options are available in the
[Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_project).
```

### `TerraformPrereqs`

Includes standard prerequisites for Terraform (installation, token setup).

**Usage:**
```markdown
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";

<TerraformPrereqs />
```

**When to use:** In getting started guides with tabs showing Console, Terraform, CLI, etc. Prerequisites. Use within a `<TabItem value="terraform">` block.

### `TerraformApply`

Step-by-step instructions for creating and applying a Terraform execution plan.

**Usage:**
```markdown
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";

<TerraformApply />
```

**When to use:** At the end of a getting started guide after all configuration files are created. Users need to actually apply the configuration to create resources. This component explains the standard `terraform plan` and `terraform apply` steps.

---

## Common mistakes to avoid

| Mistake | Why it's a problem | Fix |
|---------|---|---|
| **Duplicating examples instead of syncing** | Examples drift from source; outdated code | Always use `TerraformSample` component with files from the Aiven Provider repo |
| **Including code samples for attributes** | Clutters docs; users need a one-liner, not a full example | Explain attribute + link to docs |
| **Terraform code for non-Aiven features** (deletion, state management) | Duplicates Terraform's own docs; maintenance burden | Link to Terraform docs instead |
| **Missing documentation links** | Users can't find the full resource schema or see all options | Always link to registry.terraform.io after every code sample |
| **Incorrect Terraform registry URLs** | Broken or wrong links; users can't find resource documentation | Test every URL before committing: `https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/RESOURCE_NAME` |
| **No link to example folder** | Users can't clone the full example from GitHub | Always include: "The following example files are also available in the [Aiven Terraform Provider repository](link) on GitHub" |
| **Including plan/apply output** | Adds noise; exact output changes with each Terraform release | Use `TerraformApply` component; don't duplicate output |
| **Inconsistent attribute explanations** | Readers see different patterns on different pages | Use the patterns from [Documenting attributes](#documenting-attributes) |

---

## Checklist before adding Terraform content

Before documenting a feature with Terraform, verify:

### Repository check (do first!)
- [ ] **Checked for existing examples?** Looked in `external/terraform-provider/resources/` and `external/terraform-provider/examples/`?
- [ ] **File exists?** Found the file you need to embed?
  - [ ] Yes → Continue to code samples checklist below
  - [ ] No → Follow the workflow below:
    - [ ] Created a ticket in the DOC project requesting the example be added to the Terraform Provider repo?
    - [ ] Notified the Terraform technical writer?
    - [ ] Waiting for the example to be added, or is blocking documentation critical?
    - [ ] Only proceed without a code sample if blocking (use attribute explanation or link to docs as fallback)

### Content decision
- [ ] **Is this Aiven-specific?** Not generic Terraform? → Yes: continue. No: Link to Terraform docs instead.
- [ ] **What type is it?** Identified one of: getting started, attribute doc, multiple resources, complex scenario? → Choose the pattern above

### Code samples (if using `TerraformSample`)
- [ ] **File exists?** Verified in [Aiven Terraform Provider repo](https://github.com/aiven/terraform-provider-aiven)?
- [ ] **Using component?** Syncing via `TerraformSample`, not duplicating code?
- [ ] **Link included?** Followed code with link to full Terraform resource documentation?
- [ ] **Path format correct?** Using relative path from repo root (e.g., `resources/RESOURCE_NAME/resource.tf`)?
- [ ] **URL verified?** Tested every Terraform registry link before committing?
  - [ ] Format: `https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/RESOURCE_NAME`
  - [ ] Clicked the link to verify it resolves to the correct resource page

### Attribute documentation (if explaining attributes)
- [ ] **Which resource?** Identified which resource(s) the attribute applies to?
- [ ] **Brief only?** Explanation is a sentence or two, not a full example?
- [ ] **Link provided?** Linked to relevant Terraform resource documentation?
- [ ] **URL verified?** Tested the link to ensure it resolves to the correct resource and shows the attribute?
- [ ] **Non-obvious only?** Explanation only if attribute name doesn't clearly indicate its purpose?

### Getting started guides
- [ ] **Multiple resources?** Does the example require 3+ files or resources to be useful?
- [ ] **Components used?** Included `TerraformPrereqs`, `TerraformApply`, `TerraformSample` as needed?
- [ ] **Prerequisites tab?** For multi-interface docs, included Terraform in prerequisites tabs?
- [ ] **Intro scenario?** One-sentence intro explaining what the example does and why?
- [ ] **GitHub link?** Included link to example folder in Aiven Provider repo?
- [ ] **No plan/apply output?** Examples don't duplicate `terraform plan` or `terraform apply` output?

### Cross-interface documentation
- [ ] **Tab consistency?** Same `groupId` on all tabbed sections on the page?
- [ ] **Tab labels?** Using standard labels: Console, Terraform, API, CLI, Kubernetes?
- [ ] **Terraform for deletion?** NOT included Terraform tab for deletion procedures (unless feature-specific notes required)?

---

## Related skills and guidance

- **[Procedural documentation](../procedural-documentation/SKILL.md)**: Use for general how-to structure, permissions requirements, UI documentation. Procedural documentation references this skill for Terraform-specific decisions.
- **[Aiven style guide](../../docs/styleguide.md)**: Authoritative reference for all writing standards, including procedures.
- **[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven)**: Source of truth for example files and resource schemas.

---

## Summary

**Principle:** Maintain a single source of truth by syncing examples from the Aiven Provider repository rather than duplicating code. Document Aiven-specific features; link to Terraform docs for generic operations.

**Key patterns:**
1. **Getting started?** Use `TerraformSample` component + `TerraformPrereqs` + `TerraformApply` + link to example folder
2. **Attribute explanation?** One sentence + link to Terraform docs, no code samples
3. **Multiple similar resources?** Link to resources, don't repeat examples
4. **Complex scenario?** Link to Terraform docs with brief explanation
5. **Generic operation?** Link to Terraform docs, don't add Terraform tab

**Always:**
- Use `TerraformSample` for code (never duplicate)
- Link to Terraform documentation after every code sample
- Verify examples exist in the Aiven Provider repository
- Use tabs consistently with `groupId`
- Keep attribute explanations to one sentence unless non-obvious
