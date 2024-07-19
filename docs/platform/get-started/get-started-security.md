---
title: Secure your organization
---

import Card from "@site/src/components/AivenCard";
import GridContainer from "@site/src/components/GridContainer"

<GridContainer columns={3}>
     <Card
      to="/docs/platform/howto/set-authentication-policies"
      iconName="clipboardCheck"
      title="Configure an authentication policy"
      description="Determine how your organization users log in and use tokens."
    />
    <Card
      to="/docs/platform/concepts/orgs-units-projects#users-and-roles"
      iconName="book"
      title="Users and roles"
      description="Learn how access is controlled at the organization, project, and
      service level."
    />
    <Card
      to="/docs/platform/howto/make-super-admin"
      iconName="clipboard"
      title="Make users super admin"
      description="Give users access to manage the organization, its billing, and all
      projects by making them super admin."
    />
    <Card
      to="/docs/platform/concepts/application-users"
      iconName="book"
      title="Application users"
      description="Get details on how you applications users provide more secure
      programmatic access to the Aiven platform."
    />
    <Card
      to="/docs/platform/howto/manage-application-users"
      iconName="clipboard"
      title="(Optional) Create application users"
      description="Create application users and tokens for use with the API,
      Terraform Provider, CLI, and Aiven Operator."
    />
    <Card
      to="/docs/platform/howto/manage-vpc-peering"
      iconName="clipboard"
      title="(Optional) Create a virtual private cloud"
      description="Connect private networks with each other without going
      through the public internet."
    />
</GridContainer>

<GridContainer>
  <Card
    to="/docs/platform/get-started/get-started-users"
    title="<-- Manage users"
  />
  <Card
    to="/docs/platform/get-started/get-started-services"
    title="Create a service -->"
  />
</GridContainer>
