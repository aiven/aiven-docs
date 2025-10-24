---
title: Get started with Aiven for Grafana®
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CreateServiceDBLegacy from "@site/static/includes/create-service-console-db-legacy.md";
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

To start using Aiven for Grafana®, the first step is to create a service. You can do this in the [Aiven Console](https://console.aiven.io/) or with the [Aiven CLI](https://github.com/aiven/aiven-client).

## Create an Aiven for Grafana service

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

<CreateServiceDBLegacy serviceType="Grafana®"/>

</TabItem>
<TabItem value="terraform" label="Terraform">

The following example files create a Grafana service in your Aiven project.
They are part of the Grafana example in the
[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/grafana)
on GitHub.

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='grafana/provider.tf' />

1. Create a file named `service.tf` and add the following:

    <TerraformSample filename='grafana/service.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='grafana/variables.tf' />

1. Create the `terraform.tfvars` file and add the values for your token and project name.

<TerraformApply />

</TabItem>
</Tabs>

## Log in to Grafana

After starting the Aiven for Grafana service, you can access Grafana:

1.  From the [Aiven Console](https://console.aiven.io/), access your
    Aiven for Grafana service.
2.  In the service **Overview** screen, copy or select the **Service
    URI** to launch the Grafana login page in a browser.
3.  On the login page, enter or copy and paste the **User** and
    **Password** details from the *Connection information* section, and
    select **Log in**.

You can begin visualizing your data sources using the default dashboards
or create your own.

## Grafana resources

-   [Open source Grafana page](https://grafana.com/oss/grafana/)
-   [Grafana docs](https://grafana.com/docs/)
-   [Aiven Terraform Provider - Grafana resource
    docs](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/grafana)
    and [Grafana data source
    docs](https://registry.terraform.io/providers/aiven/aiven/latest/docs/data-sources/grafana)
