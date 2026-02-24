---
title: Track your carbon footprint
---

The carbon footprint page shows estimates of the greenhouse gas emissions associated with service usage in your organization to help you  monitor and reduce your emissions.

The estimates are powered by [OxygenIT](https://www.oxygenit.io),
a European climate-tech company that measures and optimizes IT and cloud emissions.
OxygenIT works with hyperscalers, cloud providers, and enterprises to
improve transparency and efficiency.

Emissions are measured in metric tons of carbon dioxide-equivalent,
which includes multiple greenhouse gasses. OxygenIT uses region-specific electricity data
from each data center's energy mix and hardware efficiency metrics.
The estimates follow recognized methodologies from frameworks like
the Cloud Carbon Footprint and the Green Software Foundation.

The estimates are not direct measurements of actual emissions. Use these estimates
for internal monitoring to track trends and identify optimization opportunities,
not for external assurance or regulatory reporting.

## Data privacy

All computations are done within Aiven’s environment using anonymized usage data such
as CPU, storage, network, and memory for each of your active services.

No data is transferred to OxygenIT. Aiven processes all data in compliance with GDPR and
contractual data protection terms between Aiven and OxygenIT.

## View carbon emissions data

You must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to access this feature.

1. In your organization, click **Admin**.
1. Click **Carbon footprint**.

In the **Carbon emissions explorer**, you can filter the data by:

- **Time range**: View emissions for a predefined range or choose a custom date range.
- **Billing groups**: View emissions for all services in the projects assigned to a
  specific billing group.
- **Projects**: View emissions for all services in a specific project.

## Reduce your carbon footprint

Emissions estimates are based on the actual use of your Aiven services and
the energy mix in each cloud region. Compute time, storage, network traffic,
and data center efficiency affect energy consumption.

Changes in workloads or cloud regions impact your footprint.
Electricity from high-emission sources like coal and
extended service use increase your carbon footprint.

To reduce your carbon footprint, you can:

- Optimize resource usage by scaling down unused services.
- Choose greener regions powered by renewable energy.
- Use tiered storage and more aggressive caching.
- Use [disk autoscaler](/docs/platform/howto/disk-autoscaler#why-use-disk-autoscaling)
  to increase storage only when needed.
