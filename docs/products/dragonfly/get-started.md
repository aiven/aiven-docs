---
title: Get started with Aiven for Dragonfly®
sidebar_label: Get started
keywords: [quick start]
---

import CreateService from "@site/static/includes/create-service-console.md"
import DragonflyLimitations from '@site/static/includes/dragonfly-limitations.md';
import Note from "@site/static/includes/dragonflysla-note.md"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Help from "@site/static/includes/cli-help.md";
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Get started with Aiven for Dragonfly by creating your service, integrating it with other services, and connecting to it with your preferred programming language.

<Note/>

## Prerequisites

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

- Access to the [Aiven Console](https://console.aiven.io)

</TabItem>
<TabItem value="cli" label="CLI" default>

- [Aiven CLI](https://github.com/aiven/aiven-client#installation) installed
- [A personal token](https://docs.aiven.io/docs/platform/howto/create_authentication_token.html)

</TabItem>
<TabItem value="terraform" label="Terraform" default>

<TerraformPrereqs />

</TabItem>
</Tabs>

## Create an Aiven for Dragonfly® service

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

<CreateService serviceType="Dragonfly"/>

</TabItem>
<TabItem value="cli" label="CLI">

Use [Aiven CLI](/docs/tools/cli) to create your service:

1. Determine the service plan, cloud provider, and region to
   use for your Aiven for Dragonfly service.

1. Run the following command to create Aiven for Dragonfly service named
   dragonfly-demo:

   ```bash
   avn service create dragonfly-demo   \
    --service-type dragonfly           \
    --cloud google-europe-north1       \
    --plan startup-4                   \
    --project dev-sandbox
   ```

<Help/>

</TabItem>
<TabItem value="terraform" label="Terraform">

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='dragonfly/provider.tf' />

1. Create a file named `service.tf` and add the following:

    <TerraformSample filename='dragonfly/service.tf' />

    Where `PROJECT_NAME` is the name of one of your Aiven projects.

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='dragonfly/variables.tf' />

1. Create the `terraform.tfvars` file and add your token.

<TerraformApply />

</TabItem>
</Tabs>

## Create service integrations

Integrate Aiven for Dragonfly® with other Aiven services or third-party tools using the
integration wizard available on the [Aiven Console](https://console.aiven.io/),
[Aiven CLI](https://github.com/aiven/aiven-client), or
[Aiven Terraform Provider](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration).
Learn how to [create service integrations](/docs/platform/howto/create-service-integration).

## Connect to Aiven for Dragonfly

Learn how to connect to Aiven for Dragonfly using different programming
languages:

- [redis-cli](/docs/products/dragonfly/howto/connect-redis-cli)
- [Go](/docs/products/dragonfly/howto/connect-go)
- [Node](/docs/products/dragonfly/howto/connect-node)
- [Python](/docs/products/dragonfly/howto/connect-python)

<DragonflyLimitations />

## Explore other resources

- Learn about how Aiven for Dragonfly supports
  [high availability](/docs/products/dragonfly/concepts/ha-dragonfly).
- Migrate data from
  [Aiven for Caching to Aiven for Dragonfly](/docs/products/dragonfly/howto/migrate-aiven-caching-df-console).
- Migrate data from
  [external Dragonfly to Aiven for Dragonfly](/docs/products/dragonfly/howto/migrate-ext-redis-df-console).
