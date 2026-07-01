---
title: Fork your Aiven for Grafana® service
sidebar_label: Fork a service
---

import ForkConcepts from "@site/static/includes/fork-service-concepts.md";
import ForkInstructions from "@site/static/includes/fork-service-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Fork your Aiven for Grafana® service to create an independent copy for testing,
debugging, or development without affecting the original service. Forking from a backup
also lets you restore your Grafana data to a new service.

<ForkConcepts/>

When you fork a service, its configuration, dashboards, and data sources are copied to
the new service.

## Limitations

- You can only fork services that have at least one backup.
- Service integrations are not copied to the fork.
- Cross-project forking is supported only within the same organization.

<ForkInstructions/>

You are redirected to the **Overview** page of the forked service. The service shows the
**Rebuilding** status while it is being created. When the service is ready, the status
changes to **Running**.

<RelatedPages/>

- [Rename your Aiven for Grafana® service](/docs/products/grafana/howto/rename-service)
- [Power on/off and delete your Aiven for Grafana® service](/docs/products/grafana/howto/power-cycle-service)
