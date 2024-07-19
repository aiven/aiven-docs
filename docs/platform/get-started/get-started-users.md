---
title: Manage users in your organization
---

import Card from "@site/src/components/AivenCard";
import GridContainer from "@site/src/components/GridContainer"

Start collaborating by adding users to your organization by inviting them manually or by setting up and identity provider (IdP) for your organization. Add users to groups to streamline access management to your Aiven projects and services.

<GridContainer>
    <Card
      to="/docs/platform/howto/list-user"
      iconName="book"
      title="Users and groups"
      description="Learn about the different types of users and how user groups work."
    />
    <!-- This landing page for users and groups will have a proper introduction soon -->
      <Card
      to="/docs/platform/concepts/managed-users"
      iconName="book"
      title="Managed users"
      description="Understand the benefits of managed users for medium and
      large organizations."
    />
</GridContainer>

## Add users to your organization

You can add users manually to your organization or provide access through an IdP.

<GridContainer columns={3}>
    <Card
      to="/docs/platform/get-started/get-started-invite-users"
      iconName="clipboard"
      title="Invite users"
      description="Manually add users to your organization by sending them an invite."
    />
    <Card
      to="/docs/platform/get-started/get-started-managed-users"
      iconName="clipboard"
      title="Centrally manage users with an IdP"
      description="Configure your domain and identity provider to give your
      organization's users access to the Aiven platform."
    />
</GridContainer>

## Manage groups with Terraform
You can  create groups using Terraform after you add users to the organization
using the Aiven Console or an identity provider.

<GridContainer>
  <Card
    to="https://github.com/aiven/terraform-provider-aiven/tree/main/examples/get-started"
    iconName="terraform"
    title="Create and assign groups with Terraform"
    description="Follow an example to create a project and user group in your
    organization, and give the user group access to the project."
  />
</GridContainer>

<GridContainer>
  <Card
    to="/docs/platform/get-started/get-started-organization"
    title="<-- Organization setup"
  />
  <Card
    to="/docs/platform/get-started/get-started-security"
    title="Secure your organization -->"
  />
</GridContainer>
