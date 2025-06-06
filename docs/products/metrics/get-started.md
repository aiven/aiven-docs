---
title: Get started with Aiven for Metrics
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

Get started with Aiven for Metrics by creating your service using the [Aiven Console](https://console.aiven.io/) or [Aiven CLI](https://github.com/aiven/aiven-client).

:::note
Aiven for Metrics is not currently available on Azure or Google Cloud Marketplace.
:::

## Create a service

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

<CreateService serviceType="Thanos Metrics"/>

</TabItem>
<TabItem value="CLI" label="CLI">

The [Aiven CLI](https://github.com/aiven/aiven-client) provides a simple and
efficient way to create an Aiven for Metrics service. If you prefer
creating a new service from the CLI:

1. Determine the service plan, cloud provider, and region to
   use for your Aiven for Metrics service.
1. Run the following command to create an Aiven for Metrics service named
   metrics-demo:

   ```bash
   avn service create metrics-demo   \
    --service-type thanos            \
    --cloud aws-europe-west1         \
    --plan startup-4                 \
    --project PROJECT_NAME
   ```

   Where `PROJECT_NAME` is the name of your Aiven project.

<Help />

</TabItem>
<TabItem value="terraform" label="Terraform">

The following example files are also available in the
[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/thanos) on GitHub.

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='thanos/provider.tf' />

1. Create a file named `service.tf` and add the following:

    <TerraformSample filename='thanos/service.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='thanos/variables.tf' />

1. Create a file named `terraform.tfvars` and add values for your token and Aiven project.

<TerraformApply />

</TabItem>
</Tabs>

## Create service integrations
Integrate Aiven for Metrics with other Aiven services, such as OpenSearch for advanced
queries or Grafana for visualization, or connect it with another Aiven for Metrics
service for comprehensive monitoring. Set up integrations using the
[Aiven Console](/docs/platform/howto/create-service-integration),
[Aiven CLI](docs/tools/cli/service/integration.md), or
[Aiven Terraform Provider](/docs/platform/howto/create-service-integration).

The [Aiven for Metrics integration example](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/thanos_pg) in GitHub
shows you how to use the Aiven Terraform Provider to create and integrate
Thanos Metrics with PostgreSQL and Grafana.
