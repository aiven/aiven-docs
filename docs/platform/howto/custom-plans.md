---
title: Request service custom plans
---

Aiven stock plans are designed to cover most common use cases. The plans are tested and configurations optimized to work well across the different clouds.

Sometimes, for special use cases like very high throughput clusters, the
stock plans might not be an optimal fit. In such cases we can create
custom plans where the default service configurations are modified to fit your needs.

:::note
Custom plans can be made available for all the Aiven services types (as
example Aiven for Apache Kafka® or Aiven for PostgreSQL®).

The custom plan starting price is 5000 USD/month.
:::

## Custom plan variables

The following are the variables which may be adjusted in custom plans:

- Amount of storage
- Amount and frequency of backups
- Amount of nodes
- CPU/RAM configuration per node

The possible configurations depend on several factors, such as the
selected cloud provider, the region, the available instance types and
the service type in question.

For example, available memory and CPU configurations may depend on
restrictions imposed by the cloud provider and the instance types
available in the region.

Contact the [sales team](mailto:sales@aiven.io) for a quote and the
availability of a custom plan.

## Custom plan request

For the custom plan request, provide:

- The **region** and **cloud** you would like the custom plan in (for example,
  Google cloud, `us-east1`)
- The **service type** (for example, _Kafka_ or _PostgreSQL_)
- The name of the **Aiven project** you would like the custom plan
  available for
- The custom attributes changed vs a stock plan (for example, _a PostgreSQL
  `business-4` but with 900 GB of storage_)
