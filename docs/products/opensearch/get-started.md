---
title: Get started with Aiven for OpenSearch®
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import CreateService from "@site/static/includes/create-service-console.md";
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Learn how to use Aiven for OpenSearch®, create a service, secure access, manage indices, and explore your data.

Aiven for OpenSearch® is a fully managed OpenSearch service designed for reliability,
scalability, and security. It includes OpenSearch Dashboards for data visualization and
supports integrations for logs and monitoring.

## Prerequisites

Ensure you have the following before getting started:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

- Access to the [Aiven Console](https://console.aiven.io)

</TabItem>
<TabItem value="api" label="API" default>

- [A personal token](https://docs.aiven.io/docs/platform/howto/create_authentication_token.html)

</TabItem>
<TabItem value="cli" label="CLI" default>

- [Aiven CLI](https://github.com/aiven/aiven-client#installation) installed
- [A personal token](https://docs.aiven.io/docs/platform/howto/create_authentication_token.html)

</TabItem>
<TabItem value="terraform" label="Terraform" default>

<TerraformPrereqs />

</TabItem>
</Tabs>

## Create an Aiven for OpenSearch® service

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

<CreateService serviceType="OpenSearch®"/>

</TabItem>
<TabItem value="api" label="API">

Create the service using the Aiven API, run:

```bash
curl -X POST https://api.aiven.io/v1/project/<project-name>/service \
     -H "Authorization: Bearer <api-token>" \
     -H "Content-Type: application/json" \
     -d '{
           "cloud": "google-europe-west1",
           "plan": "startup-4",
           "service_name": "example-opensearch",
           "service_type": "opensearch"
         }'
```

Parameters:

- `<project-name>`: Your project name.
- `<api-token>`: Your [API token](/docs/platform/howto/create_authentication_token).

</TabItem>
<TabItem value="cli" label="CLI">

Create the service using the Aiven CLI, run:

```bash
avn service create <service-name> \
  --service-type opensearch       \
  --cloud <cloud-region>          \
  --plan <service-plan>
```

Parameters:

- `<service-name>`: Name of your service (for example, `my-opensearch`).
- `<cloud-region>`: Deployment region (for example, `google-europe-west1`).
- `<service-plan>`: Subscription plan (for example, `startup-4`).

</TabItem>
<TabItem value="terraform" label="Terraform">

The following example files are also available in the
[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/opensearch) on GitHub.

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='opensearch/provider.tf' />

1. Create a file named `service.tf` and add the following:

    <TerraformSample filename='opensearch/opensearch_service.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='opensearch/variables.tf' />

1. Create the `terraform.tfvars` file and add the values for your token and project name.

<TerraformApply />

</TabItem>
</Tabs>

## Secure access with ACLs

Secure your service by using one of the following options:

- **Access control lists (ACLs)**: Manage access to indices by setting patterns
  (for example, `logs-*`) and permissions (read, write, or all) in the Aiven Console.
- **OpenSearch security**: Use OpenSearch Dashboards or APIs for fine-grained access
  control, including role-based access control (RBAC) and single sign-on (SSO).

For more information, see
[Access control in Aiven for OpenSearch®](https://aiven.io/docs/products/opensearch/concepts/access_control).

## Manage indices

Aiven for OpenSearch® lets you view and manage indices and configure index retention
patterns. For detailed steps on creating and managing indices, see
the [OpenSearch documentation](https://opensearch.org/docs/latest/opensearch/index-data/).

### View and manage indices

1. Open your service in the [Aiven Console](https://console.aiven.io/).
1. Click <ConsoleLabel name="opensearchindexes" /> to view details such as shards, replicas, size, and health.

### Configure retention patterns

1. In <ConsoleLabel name="opensearchindexes" /> page, scroll to
   **Index retention patterns**
1. Click **Add pattern** and define:
   - **Pattern**: Specify index patterns (for example, `*_logs_*`).
   - **Maximum index count**: Set the number of indices to retain.
1. Click **Create** to save.

For advanced indexing features, including custom mappings, refer to the
[OpenSearch documentation](https://opensearch.org/docs/latest/opensearch/index-data/).

## Access OpenSearch Dashboards

Use OpenSearch Dashboards to visualize and analyze your data.

1. On the <ConsoleLabel name="overview"/> page service in the [Aiven Console](https://console.aiven.io/).
1. In the **Connection information** section, click the **OpenSearch Dashboards** tab.
1. Copy or click the **Service URI** to open OpenSearch Dashboards in your browser.
1. Log in with the credentials provided in the **Connection information** section.

For more information, see
[OpenSearch Dashboards](https://opensearch.org/docs/latest/dashboards/).

## Connect to your service

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Go to the <ConsoleLabel name="overview"/>  page of your service in the [Aiven Console](https://console.aiven.io/).
1. Click **Quick connect**.
1. In the **Connect** window, select a **dashboard** or **language** to connect to your
   service.
1. Complete the actions in the window and click **Done**.

</TabItem>
<TabItem value="cURL" label="cURL">

See
[Use Aiven for OpenSearch® with cURL](https://aiven.io/docs/products/opensearch/howto/opensearch-with-curl)
for steps to connect using cURL.

</TabItem>
<TabItem value="Node.js" label="Node.js">

See
[Connect to OpenSearch® with Node.js](https://aiven.io/docs/products/opensearch/howto/connect-with-nodejs)
to connect using Node.js.

</TabItem>

<TabItem value="Python" label="Python">

See [Connect to OpenSearch® with Python](https://aiven.io/docs/products/opensearch/howto/connect-with-python) to connect using Python.

</TabItem>
</Tabs>

## Manage logs and monitor data

- **Send logs**: To send logs from Aiven services to OpenSearch, see [Enable log integration](https://aiven.io/docs/products/opensearch/howto/opensearch-log-integration).
- **Monitor data**: Set up Grafana for monitoring and alerts. See [Integrate with Grafana®](https://aiven.io/docs/products/opensearch/howto/integrate-with-grafana).


## Search and aggregations with Aiven for OpenSearch

Aiven for OpenSearch® lets you write and execute search queries, as well as aggregate
data using OpenSearch clients like Python and Node.js.

### Write search queries

- **Python**: Learn how to write and run search queries on your Aiven for OpenSearch
  service using the [Python OpenSearch client](https://github.com/opensearch-project/opensearch-py).
  For more information, see
  [Search with OpenSearch® and Python](/docs/products/opensearch/howto/opensearch-search-and-python).
- **Node.js**: Learn how to write and run search queries on your Aiven for OpenSearch
  service using the [OpenSearch JavaScript client](https://github.com/opensearch-project/opensearch-js).
  For more information, see
  [Search with OpenSearch® and Node.js](/docs/products/opensearch/howto/opensearch-and-nodejs).

### Perform aggregations

- **Metric aggregations**: Calculate metrics such as average, minimum, maximum,
  percentiles, and cardinality on your Aiven for OpenSearch
  service. or more information, see
  [Aggregations with OpenSearch® and Node.js](/docs/products/opensearch/howto/opensearch-aggregations-and-nodejs#metrics-aggregations).
- **Bucket aggregations**: Group data into buckets based on ranges, unique terms, or
  histograms. or more information, see
  [Bucket aggregations with OpenSearch®](/docs/products/opensearch/howto/opensearch-aggregations-and-nodejs#bucket-aggregations).
- **Pipeline aggregations**: Combine results from multiple aggregations, such as
  calculating moving averages, to analyze trends. Explore examples in
  [Pipeline aggregations with OpenSearch®](/docs/products/opensearch/howto/opensearch-aggregations-and-nodejs#pipeline-aggregations).
