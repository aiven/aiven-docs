---
title: ML Commons for Aiven for OpenSearch®
sidebar_label: ML Commons
---

import RelatedPages from "@site/src/components/RelatedPages";

ML Commons brings machine learning training and inference into your Aiven for OpenSearch® service, so you can generate embeddings, rank results, and connect to language models without a separate ML platform.

The [ML Commons](https://docs.opensearch.org/latest/ml-commons-plugin/) plugin provides a
unified interface for integrating machine learning into an OpenSearch cluster. Use it to
serve predictions from pretrained models or to connect your cluster to an externally hosted
model, such as a large language model (LLM), through the native OpenSearch ML Commons REST
API.

## Capabilities

Aiven for OpenSearch supports the following ML Commons capabilities:

- **Compute**: ML tasks currently run on CPU only. GPU-backed ML nodes will be supported
  in a future release.
- **Model deployment**: Deploy OpenSearch-provided pretrained models in the cluster, or
  connect to an externally hosted model through a remote connector. Aiven for OpenSearch
  doesn't support `plugins.ml_commons.allow_registering_model_via_url` or
  `plugins.ml_commons.allow_registering_model_via_local_file`, so you can't register a
  custom ML model.
- **Interface**: The ML Commons REST API is available through the standard OpenSearch
  API. There's no dedicated Aiven Console UI for ML Commons, but the
  [ML Commons OpenSearch Dashboards plugin](https://docs.opensearch.org/latest/ml-commons-plugin/ml-dashboard/)
  is available in OpenSearch Dashboards.

## Where ML tasks run

ML Commons tasks can run on data nodes or on nodes with a dedicated `ml` role.

- On a standard service plan, ML tasks run on data nodes alongside search and indexing
  workloads.
- On an eligible custom cluster plan with dedicated node roles, ML tasks can run on nodes
  assigned the `ml` role. Isolating ML workloads on dedicated nodes keeps compute-intensive
  inference from competing with search and indexing for resources. To request a cluster
  plan with dedicated ML nodes, [contact Aiven support](https://aiven.io/support-services).

A node group with the `ml` role can't also have the `data` or `cluster_manager` role: ML
nodes are always dedicated.

By default, `ml_commons_only_run_on_ml_node` is `true`, so ML tasks only run on nodes
with the `ml` role. If your plan doesn't have dedicated ML nodes, set
`ml_commons_only_run_on_ml_node` to `false` so ML tasks can run on data nodes instead.

For general information about node roles, see
[Dedicated node roles in Aiven for OpenSearch](/docs/products/opensearch/concepts/dedicated-node-roles).

## Deployment options

Aiven for OpenSearch supports two ways to bring a model into your cluster:

- **Pretrained models**: Register and deploy a model that OpenSearch provides
  out of the box. These models run in the cluster on data nodes or dedicated ML nodes.
- **Externally hosted models**: Connect to a model hosted outside your Aiven for
  OpenSearch service, such as a third-party LLM API, using a
  [remote connector](https://docs.opensearch.org/latest/ml-commons-plugin/remote-models/index/).
  Local CPU and memory requirements are lower for this option, because inference runs on
  the external provider's infrastructure. Aiven for OpenSearch doesn't limit which
  remote model provider you connect to; any provider supported by the OpenSearch ML
  Commons connector blueprints works.

## Access control and security roles

ML Commons provides two built-in security roles:

- `ml_full_access`: Grants full access to ML features, including registering, deploying,
  and deleting models, and starting ML tasks.
- `ml_readonly_access`: Grants read-only access to ML tasks, models, and related
  statistics.

How these roles apply depends on whether
[OpenSearch Security management](/docs/products/opensearch/concepts/os-security) is
enabled for your service:

- **Security management disabled (default)**: All service users have the
  `ml_full_access` role. Any user can register, deploy, use, and delete any model.
- **Security management enabled**: Map `ml_full_access` and `ml_readonly_access` to
  specific backend roles to control which users can manage or use ML models.

To restrict which users can manage models or connectors, set
`ml_commons_model_access_control_enabled` or `ml_commons_connector_access_control_enabled`
to `true`. Both settings enforce access by backend role, which requires OpenSearch
Security management.

## Backup and restore

The system indices ML Commons uses to store models, connectors, and configuration are
included in your service's regular snapshots.

Deployed models depend on the nodes that host them. If a service loses some of its
`ml`-role nodes (or `data` nodes, on plans without dedicated ML nodes) but not all, for
example during a node replacement or plan change, affected models move to a
`PARTIALLY_DEPLOYED` state. They redeploy automatically when
`ml_commons_model_auto_redeploy_enable` is `true` (the default). If a service loses all
of those nodes at once, for example during a power cycle, models move to
`DEPLOY_FAILED` and need an explicit `_deploy` call to become available again.

`ml_commons_model_auto_deploy_enable` (`true` by default) only affects externally hosted
models that haven't been deployed yet: it deploys them automatically on their first
prediction request. Pretrained built-in models always need an explicit `_deploy` call.

## Limitations

- ML nodes run on CPU only. GPU-backed ML nodes will be supported in a future release.
- Registering or deploying custom ML models isn't supported.
- Aiven doesn't support enabling multi-tenancy for ML Commons at the moment.
- On plans without dedicated ML nodes, set `ml_commons_only_run_on_ml_node` to `false`
  yourself; Aiven doesn't do this automatically.

<RelatedPages/>

- [Enable ML Commons for Aiven for OpenSearch](/docs/products/opensearch/howto/enable-ml-commons)
- [Dedicated node roles in Aiven for OpenSearch](/docs/products/opensearch/concepts/dedicated-node-roles)
- [OpenSearch Security for Aiven for OpenSearch](/docs/products/opensearch/concepts/os-security)
- [Advanced parameters for Aiven for OpenSearch](/docs/products/opensearch/reference/advanced-params)
