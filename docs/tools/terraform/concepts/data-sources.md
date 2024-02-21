---
title: Data sources
---

It is common to want your Terraform configuration to refer to
information beyond the current Terraform definition, either because it
is defined in a separate Terraform project, or because the item is not
under the control of Terraform. This is supported in Terraform by a
concept called [data
sources](https://www.terraform.io/language/data-sources). Providers
offer data sources alongside their data types, and in the Aiven
Terraform provider, you will find that there are many situations where
the same item appears as both a managed resource and a read-only data
source.

A good example is the `project` resource. If you are working with
services and other resources inside a project, then you might want to
access information about it, without managing (or destroying during
testing) the project itself. Instead of using the `aiven_project`
[resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/project),
try the `aiven_project` [data
source](https://registry.terraform.io/providers/aiven/aiven/latest/docs/data-sources/project)
instead. Here's an example:

```text
data "aiven_project" "sandbox" {
    project = "my-sandbox"
}

output "project_ca" {
    value = data.aiven_project.sandbox.ca_cert
    sensitive = true
}
```

By using the data source instead of the resource Terraform won't try to
manage the project. However it has awareness of it and can return
information relating to it. In the example above the certificate is made
available as an [output
value](https://www.terraform.io/language/values/outputs) so that
Terraform can use that data perhaps as configuration for another
resource.

The data source approach is recommended for projects that will integrate
with resources that they don't manage themselves.
