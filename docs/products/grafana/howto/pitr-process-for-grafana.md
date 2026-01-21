---
title: Point-in-time recovery (PITR) process for Aiven for Grafana®
---

import ForkService from "@site/static/includes/fork-service-console.md";

The Point-in-Time Recovery (PITR) process allows you to restore your Grafana service using a backup from a specific point in time.
When you
initiate the restore using the PITR backup for Grafana, a new service
will be created to host the restored data. To perform PITR for Aiven for Grafana:

<ForkService/>

You are redirected to the **Overview** page of the forked
service. The service is in the **Rebuilding** status while it is
being created. Once the service is ready, the status changes to
**Running**.
