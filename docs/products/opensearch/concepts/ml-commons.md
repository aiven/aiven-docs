---
title: ML Commons for Aiven for OpenSearch®
sidebar_label: ML Commons
---

import RelatedPages from "@site/src/components/RelatedPages";

ML Commons brings machine learning training and inference into your Aiven for OpenSearch® service, so you can run predictions and connect to language models without a separate ML platform.

The [ML Commons](https://docs.opensearch.org/latest/ml-commons-plugin/) plugin provides a
unified interface for integrating machine learning into an OpenSearch cluster. Use it to
serve predictions from pretrained models or to connect your cluster to an externally hosted
model, such as a large language model (LLM), through the native OpenSearch ML Commons REST
API.

## Scope

Aiven for OpenSearch supports the following ML Commons capabilities:

- **Compute**: CPU nodes only. GPU-backed ML nodes are not supported.
- **Model deployment**: Deploy OpenSearch-provided pretrained models in the cluster, or
  connect to an externally hosted model through a remote connector. Registering custom
  or arbitrary ML models is not supported, because running an uploaded model executes
  arbitrary code on the service nodes.
- **Interface**: The ML Commons REST API is available through the standard OpenSearch
  API. There's no dedicated Aiven Console UI for ML Commons, but the
  [ML Commons OpenSearch Dashboards plugin](https://docs.opensearch.org/latest/ml-commons-plugin/ml-dashboard/)
  is available in OpenSearch Dashboards.
- **Multi-tenancy**: Not supported.

## Where ML tasks run

ML Commons tasks can run on data nodes or on nodes with a dedicated `ml` role.

- On a standard service plan, ML tasks run on data nodes alongside search and indexing
  workloads.
- On an eligible custom cluster plan with dedicated node roles, ML tasks can run on nodes
  assigned the `ml` role. Isolating ML workloads on dedicated nodes keeps compute-intensive
  inference from competing with search and indexing for resources. To request a cluster
  plan with dedicated ML nodes, [contact Aiven support](https://aiven.io/support-services).

A node group with the `ml` role can't also have the `data` or `cluster_manager` role: ML
nodes are always dedicated. Because ML inference uses native memory rather than the JVM
heap, dedicated ML nodes get a smaller heap: the lesser of 25% of the node's memory or
8 GiB, leaving the rest available for loading models.

Aiven doesn't automatically set `ml_commons_only_run_on_ml_node` to `true` based on your
service plan. If you use a plan with dedicated ML nodes and want ML tasks to run there
instead of on data nodes, set `ml_commons_only_run_on_ml_node` to `true` yourself.

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

Uploading and registering a custom ML model isn't supported. Deploying a custom model
would run arbitrary code inside the service containers, which is a security risk Aiven
doesn't offer for managed services.

## Access control and security roles

Access to the ML Commons cluster settings requires an ACL that's enabled by Aiven support
for your project. See
[Enable ML Commons for Aiven for OpenSearch](/docs/products/opensearch/howto/enable-ml-commons).

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
Security management. Because of this dependency, you can't disable OpenSearch Security
management for a service while either setting is `true`.

## Backup and restore

The system indices ML Commons uses to store models, connectors, and configuration are
included in your service's regular snapshots.

After a restore, deployed models come back in an `UNDEPLOYED` state. To make a model
available for predictions again, either call `_deploy` for that model or set
`ml_commons_model_auto_deploy_enable` to `true` so restored models redeploy automatically.

## Limitations

- ML nodes run on CPU only. GPU-backed ML nodes aren't supported.
- Registering or deploying custom ML models isn't supported.
- ML Commons doesn't support multi-tenant OpenSearch Dashboards.
- Aiven doesn't automatically set `ml_commons_only_run_on_ml_node` based on your service
  plan.

<RelatedPages/>

- [Enable ML Commons for Aiven for OpenSearch](/docs/products/opensearch/howto/enable-ml-commons)
- [Dedicated node roles in Aiven for OpenSearch](/docs/products/opensearch/concepts/dedicated-node-roles)
- [OpenSearch Security for Aiven for OpenSearch](/docs/products/opensearch/concepts/os-security)
- [Advanced parameters for Aiven for OpenSearch](/docs/products/opensearch/reference/advanced-params)
