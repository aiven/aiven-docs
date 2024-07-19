---
title: Create Aiven services
---

import Card from "@site/src/components/AivenCard";
import GridContainer from "@site/src/components/GridContainer";
import K8sIcon from "@site/static/images/logos/kubernetes.svg";

## Aiven Console

Use the console to create your first service.

<GridContainer columns={3}>
  <Card
      to="/docs/products/services"
      iconName="book"
      title="View all services"
      description="Choose a service to learn more about it."
  />
  <a href="/docs/platform/concepts/free-plan" target="_blank"
  style={{ textDecoration: 'none' }}>
    <Card
      iconName="book"
      title="Free plans"
      description="Get more information about the free plans Aiven offers for some services."
    />
  </a>
  <Card
    to="/docs/platform/howto/create_new_service"
    iconName="clipboardCheck"
    title="Create a service"
    description="Create your first Aiven service."
  />
  <Card
    to="/docs/platform/howto/list-service"
    iconName="book"
    title="Manage your services"
    description="Learn about backups, maintenance, service resources, and more."
  />
</GridContainer>

## Dev tools
Create a service using the CLI or API.

<GridContainer columns={3}>
     <Card
      to="/docs/tools/cli/service-cli#avn-cli-service-create"
      iconName="code"
      title="Aiven CLI"
    />
    <Card
      to="https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate"
      iconName="code"
      title="Aiven API"
    />
    <!-- Maybe we could add instructions for creating a service as a "quick start"
    in the Aiven docs? https://aiven.io/docs/tools/api -->
</GridContainer>

Start creating services and integrations using code samples for the Aiven dev tools.

<GridContainer columns={3}>
     <Card
      to="https://github.com/Aiven-Open/terraform-example-projects"
      iconName="terraform"
      title="Aiven Provider for Terraform examples"
    />
    <Card
      to="https://aiven.github.io/aiven-operator/resources/project.html"
      iconComponent={K8sIcon}
      title="Aiven Operator for Kubernetes examples"
    />
</GridContainer>

<GridContainer>
  <Card
    to="/docs/platform/get-started/get-started-security"
    title="<-- Security"
  />
  <Card
    to="/docs/get-started"
    title="End -->"
  />
</GridContainer>
