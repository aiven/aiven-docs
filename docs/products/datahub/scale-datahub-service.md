---
title: Scale Aiven for DataHub services
sidebar_label: Scale DataHub services
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";

Scale your Aiven for DataHub service and its underlying resources to optimize costs and improve performance.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`project:services:write`', '`role:project:manager`', '`role:project:admin`'],
    },
  ]}
/>

To scale a DataHub service, you can change its service plan. You can also scale the
underlying Aiven for Apache Kafka®, Aiven for PostgreSQL®,
and Aiven for OpenSearch® services.

## Scale an Aiven for DataHub service

1. In your project, click <ConsoleLabel name="services"/>.
1. Open your DataHub service.
1. In the **Cloud and network** section,
   click <ConsoleLabel name="actions"/> > **Change cloud or deployment model**.
1. In the **Plan** section, select a new plan.
1. Optional: Select a different **Cloud** provider or region.
1. Click **Change**.

## Scale underlying resources

Beyond changing the DataHub service plan, you can also scale the underlying resources
for your DataHub service.

Aiven sends notifications when services have disk storage
or performance issues. You can also view the service plan usage and
metrics for each service on its page.

More information on scaling and optimizing the underlying services is available
on these pages:

 - PostgreSQL: [Change service plan](/docs/products/postgresql/howto/change-service-plan)
 - OpenSearch: [Change service plan](/docs/products/opensearch/howto/change-service-plan)
 - Apache Kafka®: [Scaling options](/docs/products/kafka/concepts/horizontal-vertical-scaling)
 - Apache Kafka®: [Optimize performance](/docs/products/kafka/howto/best-practices)
