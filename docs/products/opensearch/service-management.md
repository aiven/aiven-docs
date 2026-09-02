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

## Plan-dependent capabilities

Several service management features are tied to your plan rather than a setting you
turn on and off:

- **Dedicated node roles** require a minimum OpenSearch version and are available only
  on plans built for larger clusters. Check the requirements on the linked page before
  you plan a migration to this topology.
- **Hot/warm data tiering** requires a custom plan with separate hot and warm node
  groups. [Contact Aiven](https://aiven.io/contact) to request one.
- **High availability** depends on your plan: lower-tier plans run a single node,
  while higher tiers run multi-node clusters with automatic failover.
- For multi-node services, Aiven automatically sets the replication factor so every
  index replicates to at least two nodes. Turning this off requires a project-level
  allowance from Aiven, because it increases the risk of data loss if a node fails.
- Plugin versions track the OpenSearch core version your service runs, and you can
  only use plugins from Aiven's supported list.

<RelatedPages/>

- [Fork your Aiven for OpenSearch® service](/docs/products/opensearch/howto/fork-service)
- [Dedicated node roles in Aiven for
  OpenSearch®](/docs/products/opensearch/concepts/dedicated-node-roles)
- [Hot/warm data tiering in Aiven for
  OpenSearch®](/docs/products/opensearch/concepts/hot-warm-tiering)
- [High availability in Aiven for
  OpenSearch®](/docs/products/opensearch/concepts/high-availability-for-opensearch)
