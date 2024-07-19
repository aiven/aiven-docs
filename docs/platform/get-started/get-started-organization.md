---
title: Set up your organization
---

import Card from "@site/src/components/AivenCard";
import GridContainer from "@site/src/components/GridContainer"

An organization is automatically created for you when you sign up.

<GridContainer columns={3}>
     <Card
      to="/docs/platform/concepts/orgs-units-projects"
      iconName="book"
      title="Organizations overview"
      description="Learn about organizing your resources with organizations, units,
      and projects."
    />
    <Card
      to="/docs/tools/aiven-console/howto/create-orgs-and-units"
      iconName="clipboard"
      title="(Optional) Create organizational units"
      description="Use units to group your Aiven projects."
    />
    <Card
      to="/docs/platform/howto/manage-project"
      iconName="clipboardCheck"
      title="Create your first project"
      description="Create a project to hold your Aiven services."
    />
</GridContainer>

If you prefer to use Terraform, follow an example to set up your units and projects
within your organization using the Aiven Provider for Terraform.
<GridContainer>
  <Card
    to="https://github.com/aiven/terraform-provider-aiven/blob/main/examples/organization/README.md"
    iconName="terraform"
    title="Organization setup with Terraform"
  />
</GridContainer>

<GridContainer>
  <Card
    to="/docs/platform/get-started/get-started-billing"
    title="<-- Billing"
  />
  <Card
    to="/docs/platform/get-started/get-started-users"
    title="Manage users -->"
  />
</GridContainer>
