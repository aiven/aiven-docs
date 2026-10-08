---
title: Track usage and spend
early: true
---

import RequirementsPanel from "@site/src/components/RequirementsPanel";

Track usage and costs for AI gateway broken down by model and access key.
You can view the total number of requests, estimated costs for each model used,
and total spent.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`project:ai_gateway_keys:write`','`project:ai_gateway_keys:read`'],
    },
  ]}
/>

## View total requests and spend

Aggregated metrics are available for all usage on the AI gateway overview page:

1. In your project click **AI Gateway**.
1. Click **Overview**.
1. Optional: Choose a time range for the metrics.

## View metrics for keys

1. In your project click **AI Gateway**.
1. Click **API keys**.
1. To view metrics for a key, click the name of the key.
1. Optional: Choose a time range for the metrics.
