---
title: Get started with Aiven for Valkey™
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CreateService from "@site/static/includes/create-service-console.md";
import Help from "@site/static/includes/cli-help.md";
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Begin your journey with Aiven for Valkey™, the versatile in-memory data store offering high-performance capabilities for caching, message queues, and efficient data storage solutions.

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

## Create a service

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

<CreateService serviceType="Valkey"/>

</TabItem>
<TabItem value="cli" label="CLI">

1. Determine the service specifications, including plan, cloud provider, region,
   and project name.

1. Run the following command to create a Valkey service named `demo-valkey`:

   ```bash
    avn service create demo-valkey     \
    --service-type valkey              \
    --cloud CLOUD_AND_REGION           \
    --plan PLAN                        \
    --project PROJECT_NAME
   ```

   Parameters:

    - `avn service create demo-valkey`: Command to create new Aiven service
      named `demo-valkey`.
    - `--service-type valkey`: Specifies the service type as Aiven for Valkey.
    - `--cloud CLOUD_AND_REGION`: Specifies the cloud provider and region for deployment.
    - `--plan PLAN`: Specifies the service plan or tier.
    - `--project PROJECT_NAME`: Specifies the project where the service will be created.

<Help/>

</TabItem>
<TabItem value="terraform" label="Terraform">

The following example files are also available in the
[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/valkey) on GitHub.

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='valkey/provider.tf' />

1. Create a file named `service.tf` and add the following:

    <TerraformSample filename='valkey/service.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='valkey/variables.tf' />

1. Create the `terraform.tfvars` file and add the values for your token and project name.

<TerraformApply />

</TabItem>
</Tabs>

## Connect to Aiven for Valkey

Learn how to connect to Aiven for Valkey using different programming
languages or through `valkey-cli`:

- [valkey-cli](/docs/products/valkey/howto/connect-valkey-cli.md)
- [Go](/docs/products/valkey/howto/connect-go)
- [Node](/docs/products/valkey/howto/connect-node)
- [PHP](/docs/products/valkey/howto/connect-php)
- [Python](/docs/products/valkey/howto/connect-python)
- [Java](/docs/products/valkey/howto/connect-java)
