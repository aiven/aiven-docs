---
title: Upgrade OpenSearch® with Aiven Provider for Terraform
sidebar_label: Upgrade OpenSearch®
---

To upgrade an existing Elasticsearch service to OpenSearch using Terraform:

-   Migrate the existing Elasticsearch resource to an OpenSearch
    resource.
-   Update the state of Terraform to be aware of and manage the resource
    as an OpenSearch service.

:::note
If you manage your infrastructure with our [Aiven Provider for Terraform](/docs/tools/terraform),
upgrade the provider to 2.4.0 or later in order to have support for OpenSearch®.
:::

1.  Change the `elasticsearch_version = 7` to `opensearch_version = 1`.
    This is the equivalent to clicking **migrate** in the
    console.

    ```hcl
    # Existing Elasticsearch Resource
    resource "aiven_elasticsearch" "es" {
      project = "project-name"
      cloud_name = "google-us-east4"
      plan = "business-4"
      service_name = "es"

      elasticsearch_user_config {
        elasticsearch_version = 7
      }
    }
    ```

    ```hcl
    # Modified Elasticsearch Resource, upgrades to OpenSearch v1
    resource "aiven_elasticsearch" "es" {
      project = "project-name"
      cloud_name = "google-us-east4"
      plan = "business-4"
      service_name = "es"

      elasticsearch_user_config {
        opensearch_version = 1
      }
    }
    ```

    Once you have updated your configuration, ensure the change
    looks correct:

    ```bash
    terraform plan
    ```

    Apply the upgrade:

    ```bash
    terraform apply
    ```

    Your service will now upgrade to OpenSearch, and if you view it in
    the web console, it will show as an OpenSearch service.

1.  After the migration, remove the Elasticsearch
    service from the Terraform state.

    ```bash
    terraform state rm 'aiven_elasticsearch.<service-name>'
    ```

1.  Update the resource configuration to be an OpenSearch resource type,
    the example shown above would then look like this:

    ```hcl
    resource "aiven_opensearch" "os" {
      project = "project-name"
      cloud_name = "google-us-east4"
      plan = "business-4"
      service_name = "es"

      opensearch_user_config {
        opensearch_version = 1
      }
    }
    ```

1.  Bring the Terraform state back in sync with your OpenSearch service
    by importing the service.

    ```bash
    terraform import 'aiven_opensearch.os' <project-name>/<service-name>
    ```

Your Elasticsearch service has been upgraded to OpenSearch with
Terraform, and the resource configuration updated to use a resource type
of OpenSearch.

If you have Elasticsearch ACLs and users,
import their OpenSearch counterparts to the Terraform state.

```bas
terraform import 'aiven_opensearch_acl_config.os-acl-config' <project-name>/<service-name>
terraform import 'aiven_opensearch_acl_rule.os-acl-rule' <project-name>/<service-name>/<username>/<index>
terraform import 'aiven_opensearch_user.os-user' <project-name>/<service-name>/<username>
```

import ElasticSearch from "@site/static/includes/trademark-elasticsearch.md"

<ElasticSearch/>
