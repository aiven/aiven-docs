---
title: Enable ML Commons for Aiven for OpenSearch®
sidebar_label: Enable ML Commons
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";
import RequirementsPanel from "@site/src/components/RequirementsPanel";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Enable the ML Commons plugin for your Aiven for OpenSearch® service, configure its
cluster settings, and deploy a pretrained or externally hosted model.

<RequirementsPanel
  items={[
    {
      label: 'Access',
      values: [
        <>
          Enabled by Aiven support for your project. Request access before
          you configure ML Commons.
        </>,
      ],
    },
  ]}
/>

For background on what ML Commons supports in Aiven for OpenSearch, see
[ML Commons for Aiven for OpenSearch](/docs/products/opensearch/concepts/ml-commons).

## Request access

ML Commons cluster settings are gated by a project-level ACL.
[Contact Aiven support](https://aiven.io/support-services) to enable ML Commons for your
project.

## Configure ML Commons cluster settings

After Aiven support enables ML Commons for your project, configure the ML Commons cluster
settings as [advanced parameters](/docs/products/opensearch/reference/advanced-params) on
your Aiven for OpenSearch service.

<Tabs groupId="config-methods">
<TabItem value="gui" label="Console" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/).
1.  Click <ConsoleLabel name="Services"/>, then select your Aiven for OpenSearch service.
1.  Click <ConsoleLabel name="service settings"/>. Scroll to the
    **Advanced configuration** section and click **Configure**.
1.  Click **Add configuration options**, then select an `ml_commons_*` option from
    the list.
1.  Set the value and click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [`avn service update`](/docs/tools/cli/service-cli#avn-cli-service-update) command
to configure ML Commons settings:

```bash
avn service update SERVICE_NAME \
  -c opensearch.ml_commons_only_run_on_ml_node=true \
  -c opensearch.ml_commons_model_access_control_enabled=true
```

Replace `SERVICE_NAME` with your Aiven for OpenSearch service name.

</TabItem>
<TabItem value="api" label="API">

Call the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint to configure ML Commons settings:

```bash
curl --request PUT \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  --header "Authorization: Bearer API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "user_config": {
      "opensearch": {
        "ml_commons_only_run_on_ml_node": true,
        "ml_commons_model_access_control_enabled": true
      }
    }
  }'
```

Replace `PROJECT_NAME`, `SERVICE_NAME`, and `API_TOKEN` with your values.

</TabItem>
</Tabs>

The full list of `ml_commons_*` options, including their types and defaults, is in
[Advanced parameters for Aiven for OpenSearch](/docs/products/opensearch/reference/advanced-params).

## Run ML tasks on dedicated ML nodes

If your service uses a cluster plan with dedicated ML nodes, Aiven doesn't automatically
move ML workloads onto them. Set `ml_commons_only_run_on_ml_node` to `true` so that ML
tasks run on the dedicated `ml`-role nodes instead of on data nodes.

## Deploy a pretrained model

To deploy an OpenSearch-provided pretrained model, use the ML Commons REST API through
the standard OpenSearch API. Registering, deploying, and running predictions with a
pretrained model follows the same steps as
[registering a pretrained model](https://docs.opensearch.org/latest/ml-commons-plugin/pretrained-models/)
in OpenSearch.

## Connect to an externally hosted model

To connect to a model hosted outside your Aiven for OpenSearch service, such as a
third-party LLM API:

1.  Add the endpoint of your model provider to
    `ml_commons_trusted_connector_endpoints_regex`.
1.  Create a connector and register a remote model using the
    [OpenSearch connector blueprint](https://docs.opensearch.org/latest/ml-commons-plugin/remote-models/blueprints/)
    for your model provider.

## Restrict access to ML models and connectors

By default, all service users have the `ml_full_access` role and can register, deploy,
use, and delete any model or connector. To restrict which users can manage or use ML
models and connectors:

1.  [Enable OpenSearch Security management](/docs/products/opensearch/howto/enable-opensearch-security)
    for your service.
1.  Set `ml_commons_model_access_control_enabled`,
    `ml_commons_connector_access_control_enabled`, or both to `true`.
1.  Map the `ml_full_access` and `ml_readonly_access` roles to specific backend roles
    using OpenSearch Security.

:::note
Once `ml_commons_model_access_control_enabled` or
`ml_commons_connector_access_control_enabled` is `true`, you can't disable OpenSearch
Security management for the service. Turn off both settings first.
:::

## Restore behavior

After a service restores from a snapshot, deployed models come back in an `UNDEPLOYED`
state. Call `_deploy` for each model, or set `ml_commons_model_auto_deploy_enable` to
`true` so restored models redeploy automatically.

<RelatedPages/>

- [ML Commons for Aiven for OpenSearch](/docs/products/opensearch/concepts/ml-commons)
- [Advanced parameters for Aiven for OpenSearch](/docs/products/opensearch/reference/advanced-params)
- [Enable OpenSearch Security management](/docs/products/opensearch/howto/enable-opensearch-security)
- [OpenSearch Security for Aiven for OpenSearch](/docs/products/opensearch/concepts/os-security)
