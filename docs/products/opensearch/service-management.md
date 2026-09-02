---
title: Service management for Aiven for OpenSearch®
sidebar_label: Service management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage the lifecycle of your Aiven for OpenSearch® service, including power state,
naming, tags, forks, cloud region, node roles, plugins, and advanced parameters.

## Forking is the mechanism behind several operations

[Renaming](/docs/products/opensearch/howto/rename-service) a service,
[restoring a backup](/docs/products/opensearch/howto/restore_opensearch_backup), and
creating a test copy all rely on the same underlying action:
[forking](/docs/products/opensearch/howto/fork-service) a service from its latest
backup into an independent copy. Because rename and restore both go through this fork
step, their constraints carry over even though those procedures don't call them out
on their own. You can't rename or restore a service that has no existing backup.
Neither operation copies over service integrations, and neither reconfigures single
sign-on methods, such as
[SAML](/docs/products/opensearch/howto/saml-sso-authentication), on the new service.

## Plan-dependent capabilities

Several service management features, including
[dedicated node roles](/docs/products/opensearch/concepts/dedicated-node-roles),
[hot/warm data tiering](/docs/products/opensearch/concepts/hot-warm-tiering), and
[high availability](/docs/products/opensearch/concepts/high-availability-for-opensearch),
depend on your service plan or cluster topology rather than a setting you turn on and
off. Moving into or out of one of these configurations generally means changing
plans, not adjusting your current one.

- For multi-node services, Aiven automatically sets the replication factor so every
  index replicates to at least two nodes. Turning this off requires a project-level
  allowance from Aiven, because it increases the risk of data loss if a node fails.
- [Plugin versions](/docs/products/opensearch/reference/list-of-plugins-for-each-version)
  track the OpenSearch core version your service runs, and you can only use plugins
  from [Aiven's supported list](/docs/products/opensearch/reference/plugins).

<RelatedPages/>

- [Fork your Aiven for OpenSearch® service](/docs/products/opensearch/howto/fork-service)
- [Dedicated node roles in Aiven for
  OpenSearch®](/docs/products/opensearch/concepts/dedicated-node-roles)
- [Hot/warm data tiering in Aiven for
  OpenSearch®](/docs/products/opensearch/concepts/hot-warm-tiering)
- [High availability in Aiven for
  OpenSearch®](/docs/products/opensearch/concepts/high-availability-for-opensearch)
