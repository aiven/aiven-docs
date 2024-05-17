---
title: Index retention patterns
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Learn to set index retention patterns and manage maximum indices in your Aiven for OpenSearch® instance.

## Set index retention patterns
To define index retention policies for your OpenSearch indices:

<Tabs groupId="retention-method">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io), select your project,
   and select your Aiven for OpenSearch service.
1. Click **Indexes** on the sidebar.
   The **Indexes** section lists the patterns that are currently in use.
1. Click **Add pattern**.
1. Enter the pattern to use and the maximum index count for the pattern.
1. Click **Create**.

</TabItem>
<TabItem value="API" label="API">

Alternatively, you can use the [API](https://api.aiven.io/doc/) with a request similar
to the following:

```bash
 curl -X PUT --data '{
  "user_config": {
    "index_patterns": [
      {"pattern": "logs*", "max_index_count": 2},
      {"pattern": "test.?", "max_index_count": 3}
    ]
  }
}' \
  --header "content-type: application/json" \
  --header "authorization: aivenv1 <YOUR TOKEN HERE>" \
  https://api.aiven.io/v1beta/project/<project>/service/<service_name>

```

Parameters:

- `<project>`: Your Aiven project name.
- `<service_name>`: Name of your Aiven for OpenSearch service.

</TabItem>
</Tabs>


## Related pages

- [Indices in Aiven for OpenSearch](/docs/products/opensearch/concepts/indices)
