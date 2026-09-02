---
title: Service management for Aiven for OpenSearch®
sidebar_label: Service management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage the lifecycle of your Aiven for OpenSearch® service, including power state,
naming, tags, forks, cloud region, node roles, plugins, and advanced parameters.

## Forking is the mechanism behind several operations

Renaming a service, restoring a backup, and creating a test copy all rely on the same
underlying action: forking a service from its latest backup into an independent copy.
Before you rename or restore a service, keep the following in mind:

- You can fork only a service that has at least one backup.
- Forking doesn't copy service integrations. Recreate them on the new service.
- Single sign-on (SSO) methods, such as SAML, aren't copied either, because they're
  tied to URLs and endpoints that change during forking. Reconfigure SSO on the new
  service before you switch your clients over.
- Cross-project forking works only within the same organization.

## Plan and version requirements

Several service management features depend on your plan or OpenSearch version rather
than a setting you turn on and off:

- **Dedicated node roles** are generally available for OpenSearch 2.19 and later, and
  only on 9-node and 15-node plans.
- **Hot/warm data tiering** requires a custom plan with separate hot and warm node
  groups, and OpenSearch 2.19 or later. [Contact Aiven](https://aiven.io/contact) to
  request one.
- **High availability** depends on your plan: Free and Startup plans run a single
  node, while Business and Premium plans run multi-node clusters with automatic
  failover.
- For multi-node services, Aiven automatically sets the replication factor so every
  index replicates to at least two nodes. Turning this off requires a project-level
  allowance from Aiven, because it increases the risk of data loss if a node fails.
- Plugin versions track the OpenSearch core version your service runs. For example,
  OpenSearch 2.19 uses plugin version 2.19, and you can only use plugins from Aiven's
  supported list.

<RelatedPages/>

- [Power on/off and delete your Aiven for OpenSearch®
  service](/docs/products/opensearch/howto/power-cycle-service)
- [Rename your Aiven for OpenSearch®
  service](/docs/products/opensearch/howto/rename-service)
- [Tag your Aiven for OpenSearch® service](/docs/products/opensearch/howto/tag-service)
- [Fork your Aiven for OpenSearch® service](/docs/products/opensearch/howto/fork-service)
- [Change the cloud or region for your Aiven for OpenSearch®
  service](/docs/products/opensearch/howto/change-cloud-region)
- [Advanced parameters for Aiven for
  OpenSearch®](/docs/products/opensearch/reference/advanced-params)
- [Dedicated node roles in Aiven for
  OpenSearch®](/docs/products/opensearch/concepts/dedicated-node-roles)
- [Hot/warm data tiering in Aiven for
  OpenSearch®](/docs/products/opensearch/concepts/hot-warm-tiering)
- [Manage hot/warm data tiering in Aiven for
  OpenSearch®](/docs/products/opensearch/howto/hot-warm-tiering)
- [High availability in Aiven for
  OpenSearch®](/docs/products/opensearch/concepts/high-availability-for-opensearch)
- [Plugins available with Aiven for
  OpenSearch®](/docs/products/opensearch/reference/plugins)
- [Plugin versions per OpenSearch
  release](/docs/products/opensearch/reference/list-of-plugins-for-each-version)
- [Aiven for OpenSearch® limits and
  limitations](/docs/products/opensearch/reference/opensearch-limitations)
