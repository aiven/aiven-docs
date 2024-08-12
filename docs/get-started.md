---
title: Get started with Aiven
sidebar_label: Get started
keywords: [quick start]
---

import Button from "@site/src/components/Buttons";
import {ButtonSecondary} from "@site/src/components/Buttons";
import Card from "@site/src/components/AivenCard";
import Overview from "@site/static/images/content/platform/platform-overview.webp";
import GridContainer from "@site/src/components/GridContainer";

<!-- vale off -->

Aiven provides managed open source services for streaming, storing and analyzing data on all major clouds.
All services run reliably and securely in the clouds of your choice, are observable, and can easily be integrated with each other and with external 3rd party tools.

<img src={Overview} class="centered" alt="" width="62%" />

## Discover the Aiven platform

**Try it for free.** Aiven offers [free plans](/docs/platform/concepts/free-plan) and
[30-day trials](/docs/platform/concepts/free-trial) for you to explore the platform and services.

<GridContainer columns="4">
  <Button to="https://console.aiven.io/signup">Sign up for free</Button>
  <ButtonSecondary to="https://aiven.io/changelog">See product updates</ButtonSecondary>
</GridContainer>

## First steps

1. [Sign up](https://console.aiven.io/signup).
1. [Create your first service](/docs/platform/howto/create_new_service) and select the
   plan for your use case.
1. [Create service integrations](/docs/platform/howto/create-service-integration).
1. [Manage your organization](/docs/platform/concepts/orgs-units-projects).
1. [Start using our dev tools](/docs/tools) to interact with your services.

## Learn more

<GridContainer>

  <Card iconName="aivenEnterprise"
        to="/docs/products/services"
        title="Managed services"
        description="Learn about the services managed by Aiven."
  />

  <Card iconName="dbBackup"
        to="/docs/platform/concepts/service_backups"
        title="Backups"
        description="Learn about backup schedule and retention."
  />

  <Card iconName="orgUnit"
        to="/docs/platform/concepts/orgs-units-projects"
        title="Organizations"
        description="Learn about managing your organization."
  />

  <Card iconName="terraform"
        to="/docs/tools/terraform/get-started"
        title="Terraform"
        description="Interact with your services via Terraform."
  />

</GridContainer>
