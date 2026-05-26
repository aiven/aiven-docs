---
title: OpenSearch® Dashboards incompatible version issues
sidebar_label: Incompatible versions
---

OpenSearch® Dashboards version must match your OpenSearch cluster version.

If OpenSearch Dashboards is unavailable, you see the following error message in the
OpenSearch Dashboards logs:

```none
This version of OpenSearch Dashboards (v1.3.2) is incompatible with the following OpenSearch nodes
in your cluster: v1.2.4 @ opensearch-searchdex-1.aiven.local/[${ipaddress}]:9200 (${ip_address})
```

This situation typically occurs when a new version of OpenSearch is
released.

When a new version of OpenSearch is available, any newly created nodes
for the service will automatically use the latest version. The Aiven
platform will identify any variance in versions among the service nodes
and initiate the process of upgrading outdated ones to the new version.
Following the successful completion of this upgrade, OpenSearch
Dashboards will be accessible.
