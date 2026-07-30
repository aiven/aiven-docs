# Terraform procedure documentation guidelines

When adding Terraform instructions and code samples to Aiven Docs, maintain a single source of truth by syncing example files from the Aiven Provider GitHub repository rather than duplicating code. This reduces maintenance burden and keeps examples current. The Aiven Provider for Terraform repository is a submodule of the Aiven docs repository.

## When to include Terraform instructions

### Include Terraform for:

1. **Example usage of a resource** - Use `TerraformSample` component to sync from repo; this is a full code sample users can copy and paste
2. **Guidance on which attributes to use** - Explain the attribute(s) and link to full schema
3. **Getting started examples** - Use synced example files with helper components; this lets users quickly start using a specific resource without a lot of setup

### Do not include Terraform for:

1. **Deleting/removing resources** - This is standard Terraform syntax (user removes resource block), not Aiven-specific. Link to Terraform docs instead.
2. **Viewing/reading resource information** - Similarly generic Terraform knowledge, not feature-specific.

**Rationale:** Document Aiven-specific features and configurations, not general Terraform concepts.

If you need to document a generic Terraform operation, link to Terraform docs instead.
Linking to Terraform docs for generic operations avoids maintenance burden and respects the single-source-of-truth principle.

## Using `TerraformSample` component

Resources in the Aiven Terraform Provider documentation always have an example usage that allows users to quickly copy/paste the basic configuration for a resource in the Aiven Platform.
Use the `TerraformSample` component to embed these synced example files from the Aiven Provider GitHub repository.

Always link to the resource in the Terraform Provider documentation after the resource example code.

### Setup

```markdown
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

<TerraformSample filename='resources/aiven_organizational_unit/resource.tf' />

More information on this resource and its configuration options are available in the [Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organizational_unit).
```

### File path format

- Use relative paths from the repo root: `resources/RESOURCE_NAME/resource.tf`
- Check the [Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven) for available examples

### Required documentation link

Always follow `TerraformSample` with a link to the full Terraform resource documentation:

```markdown
<TerraformSample filename='resources/aiven_project/resource.tf' />

More information on this resource and its configuration options are available in the
[Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_project).
```

This link allows users to:
- See the full schema and all configuration options
- Access Terraform-specific details and requirements
- Understand provider version compatibility

## Documenting attributes

When documenting how to configure a feature using Terraform attributes, explain which attribute(s) to use and link to the full documentation. Do not duplicate full example code.

### Single resource

For attributes used in a single, specific resource:

```markdown
To set project contacts in Terraform, use the `technical_emails` attribute in your [aiven_project resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_project).
```

### Multiple service resources

For attributes used across multiple service resources:

```markdown
To set service contacts in Terraform, use the `tech_emails` attribute in your service resource.

Details on all service resources are available in the [Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs).
```

### Attribute explanation

If the attribute name or behavior is non-obvious, provide a brief explanation:

```markdown
To configure the backup time for your PostgreSQL service, use the `backup_hour` and `backup_minute` attributes
in your `aiven_pg` resource.

See the [aiven_pg resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_pg)
for details.
```

## Getting started examples

For getting started guides and tutorials, use synced example files from the Aiven Provider repository along with helper components.
Always provide a link to the full example in the Aiven Provider repository. For example:

"The following example files are also available in the
[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/clickhouse) on GitHub."

### Example structure

Getting started examples typically include:

- `provider.tf` - Provider block with Aiven Provider installation
- `service.tf` - Service resources and related configurations
- `variables.tf` - Declared variables (always includes `token`)
- `output.tf` - Output blocks for useful values
- Optional: `service_users.tf`, `integrations.tf`, etc. for complex examples

### Components

**TerraformPrereqs** - Includes prerequisites for Terraform (installation, token setup):

```markdown
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";

<TerraformPrereqs />
```

Where there are other interfaces (Console, API, CLI, Kubernetes), use tabs for each set of prerequisites.

**TerraformApply** - Step-by-step instructions for creating execution plan and applying:

```markdown
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";

<TerraformApply />
```

**TerraformSample** - Embed code files from the example:

```markdown
<TerraformSample filename='examples/valkey/provider.tf' />
```

### Pattern

```markdown
...
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

## Prerequisites

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

...

</TabItem>
<TabItem value="terraform" label="Terraform" default>

- [Terraform installed](https://www.terraform.io/downloads)
- A [personal token](https://docs.aiven.io/docs/platform/howto/create_authentication_token.html)
- [Docker](https://docs.docker.com/desktop/) installed

</TabItem>
</Tabs>

## Create an Aiven for ClickHouse® service

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

...

</TabItem>
<TabItem value="terraform" label="Terraform">

In this example, an Aiven for ClickHouse service is used to store IoT sensor data.
You create the service, two service users, and assign each user a role:

- Give the ETL user permission to insert data.
- Give the analyst user access to view data in the measurements database.

The following example files are also available in the
[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/clickhouse) on GitHub.

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='clickhouse/clickhouse_service/provider.tf' />

1. Create a file named `service.tf` and add the following:

    <TerraformSample filename='clickhouse/clickhouse_service/service.tf' />

1. Create a file named `service_users.tf` and add the following:

    <TerraformSample filename='clickhouse/clickhouse_service/service_users.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='clickhouse/clickhouse_service/variables.tf' />

1. Create the `terraform.tfvars` file and add the values for your token and project name.

1. To output connection details, create a file named `output.tf` and add the following:

    <TerraformSample filename='clickhouse/clickhouse_service/output.tf' />

<TerraformApply />

</TabItem>
</Tabs>
```

### Optional introduction

For non-generic examples with a clear use case, add an introduction explaining the scenario:

```markdown
## Create a ClickHouse service for IoT data

In this example, an Aiven for ClickHouse service stores sensor data.
You create the service, two service users, and assign roles:

- Give the ETL user permission to insert data.
- Give the analyst user access to view data in measurements.

This example uses Terraform to automate setup.
```

**Keep it concise** - focus on what the example does, not the details of each resource. Changes to examples shouldn't require doc updates.

## Special Cases

### Complex multi-step scenarios

For scenarios that require complex configuration (e.g., permission granting with multiple resource types), link to Terraform docs with a brief explanation of key attributes rather than duplicating lengthy examples:

```markdown
To grant permissions to users and groups at both organization and project levels,
use the `aiven_organization_permission` resource with the `resource_type` attribute:

- Set `resource_type` to `organization` for organization-level permissions
- Set `resource_type` to `project` for project-level permissions

See the [aiven_organization_permission resource documentation](link) for the full schema
and examples of granting permissions to individuals and groups.
```

### Multiple similar resources

For features that apply to many services but require a different resource for each (e.g., service user creation), link to resources rather than repeating examples:

```markdown
### Create a service user

Each Aiven service has a service-specific resource for creating users.
See the Terraform documentation to find the relevant resource for your service:

- PostgreSQL: [aiven_pg_user](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_pg_user)
- MySQL: [aiven_mysql_user](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_mysql_user)
- OpenSearch: [aiven_opensearch_user](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aiven_opensearch_user)

Each resource accepts a username and password.
```

This is more maintainable than creating separate examples for each service.

## Checklist for Terraform Content

Before adding Terraform instructions to documentation, verify:

- [ ] **Is this about example usage, attributes, or getting started?**
  - Yes → Include Terraform content (see sections above)
  - No → Skip or link to Terraform docs instead

- [ ] **If using `TerraformSample` to embed example code:**
  - [ ] Check the Terraform submodule for the latest version of the example file
  - [ ] Include a link to the full Terraform resource documentation
  - [ ] Example: "See the [aiven_project documentation](link) for the full schema"

- [ ] **If documenting attributes:**
  - [ ] Explain which attribute(s) to use
  - [ ] Link to the relevant Terraform docs (specific resource or main docs page)
  - [ ] Do not duplicate full example code
  - [ ] Optional: Provide brief explanation ONLY if the attribute is non-obvious

- [ ] **If providing getting started examples:**
  - [ ] Use synced files from the Aiven Provider repo
  - [ ] Include `TerraformPrereqs` component for prerequisites
  - [ ] Include `TerraformApply` component for execution steps
  - [ ] Include link to the example folder in the GitHub repo (allow cloning)
  - [ ] Optional: Add brief intro explaining what the example does

- [ ] **Avoid documenting:**
  - [ ] Deletion or removal procedures (link to Terraform docs instead)
  - [ ] General Terraform concepts (file structure, state management, etc.)
  - [ ] Tool-specific syntax that applies to all resources generically
---

## Resources

- [Aiven Terraform Provider submodule](external/terraform-provider)
- [Terraform Registry Documentation](https://registry.terraform.io/docs/providers/aiven/latest)
