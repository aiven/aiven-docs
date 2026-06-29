---
title: Fork your Aiven for OpenSearch® service
sidebar_label: Fork a service
---

import ForkConcepts from "@site/static/includes/fork-service-concepts.md";
import ForkInstructions from "@site/static/includes/fork-service-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Fork your Aiven for OpenSearch® service to create an independent copy for testing,
debugging, or development without affecting the original service.

<ForkConcepts/>

When you fork a service, its configuration, indices, and service users are copied to the
new service.

## Limitations

- You can only fork services that have at least one
  [backup](/docs/products/opensearch/howto/restore_opensearch_backup).
- Service integrations are not copied to the fork.
- Cross-project forking is supported only within the same organization.
- Single sign-on (SSO) methods are not copied to forked services because they are linked
  to specific URLs and endpoints that change during forking. If you don't reconfigure the
  SSO methods for the forked service, user access can be disrupted.

<ForkInstructions/>

<RelatedPages/>

- [Restore an Aiven for OpenSearch® backup](/docs/products/opensearch/howto/restore_opensearch_backup)
- [Rename your Aiven for OpenSearch® service](/docs/products/opensearch/howto/rename-service)
