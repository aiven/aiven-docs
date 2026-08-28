---
title: Delete an Aiven for DataHub service
sidebar_label: Delete service
limited: true
---

import DeleteService from "@site/static/includes/delete-services.md";
import RequirementsPanel from "@site/src/components/RequirementsPanel";

When you delete an Aiven for DataHub service, all service data and configuration are permanently deleted.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['Manage services', 'Operator', 'Project admin'],
    },
  ]}
/>

The underlying Aiven for Apache Kafka®, Aiven for OpenSearch®
and Aiven for PostgreSQL® services are also deleted at the same time.

To stop DataHub, you can
[power it off](/docs/products/datahub/power-off-service) instead.

<DeleteService/>
