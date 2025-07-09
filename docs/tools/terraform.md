---
title: Aiven Provider for Terraform
---

import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Use the [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs) to provision and manage your Aiven infrastructure.

## Get started

The Aiven Platform uses
[organizations, organizational units, and projects](https://aiven.io/docs/platform/concepts/orgs-units-projects)
to organize services. This example shows you how to use the Aiven Provider for Terraform
to create an organization with two organizational units, and add projects to those units.
The following example file is also available in the
[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/clickhouse) on GitHub.

1. [Sign up for Aiven](https://console.aiven.io/signup?utm_source=github&utm_medium=organic&utm_campaign=devportal&utm_content=repo).
1. [Download and install Terraform](https://www.terraform.io/downloads).
1. [Create a token](/docs/platform/howto/create_authentication_token).
1. Create a file named `main.tf` and add the following:

    <TerraformSample filename='organization/org_units_projects.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='organization/variables.tf' />

1. Create the `terraform.tfvars` file and assign values to the variables for the
   token and the project names.

<TerraformApply />

## Next steps

- Follow an [example to set up your own organization](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/get-started)
  with a user group and permissions.
- Try one of the other [examples](https://github.com/aiven/terraform-provider-aiven/tree/main/examples)
  to learn how to create a service or integration using the Aiven Terraform Provider.
- Get details about all the available resources and data sources in the
  [Aiven Provider for Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs).
