---
title: Manage Karapace schema registry authorization
---

import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Karapace schema registry authorization allows you to authenticate the user, to control access to individual [Karapace schema registry REST API endpoints](https://github.com/aiven/karapace), and to filter the content the endpoints return.

:::tip
Some older Aiven for Apache Kafka® services may not have this feature
enabled by default. In this case,
[enable Karapace schema registry authorization](/docs/products/kafka/karapace/howto/enable-schema-registry-authorization).
:::

Karapace schema registry authorization is configured using
[Access Control Lists (ACLs)](/docs/products/kafka/karapace/concepts/acl-definition). You can manage the Karapace schema registry authorization
ACL entries using the
[Aiven CLI](/docs/tools/cli/service/schema-registry-acl).

Using the Aiven CLI commands, you can

-   Add ACL
-   Delete ACL
-   View ACL list

For more information on the ACL commands, the required parameters and
examples, see
[avn service schema-registry-acl](/docs/tools/cli/service/schema-registry-acl).

## Manage resources via Terraform

Additionally, the
[Aiven Terraform Provider](/docs/tools/terraform) supports managing Karapace schema registry authorization ACL
entries with the `aiven_kafka_schema_registry_acl` resource. For more
information, see the [resource
documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_schema_registry_acl).

An example of resource configuration via Terraform is as shown below:

<TerraformSample filename='resources/aiven_kafka_schema_registry_acl/resource.tf' />
