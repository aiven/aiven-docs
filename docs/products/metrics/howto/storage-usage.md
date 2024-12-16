---
title: Manage storage
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Get a comprehensive view of your storage usage with Aiven for Metrics. The Storage page in the [Aiven console](https://console.aiven.io/) provides valuable data to help you effectively manage and understand your object storage consumption and associated costs.

Key metrics provided on the Storage page include:

- **Current billing expenses**: Shows the current cost incurred for the storage used.
- **Forecasted monthly cost**: Provides an estimate of the expected cost for the
  upcoming month based on usage.
- **Object storage used**: Indicates the amount of storage currently in use.
- **Retention rule**: Displays the current data retention setting, which by default is
  set to **Keep data forever**.

## Access the Storage page

1. Log into the [Aiven console](https://console.aiven.io/), select your project, and
   select your Aiven for Metrics service.
1. Click **Storage** in the sidebar.

## Manage storage settings

Adjust your data retention settings and set up alerts to keep your storage in check.

### Edit retention rules

1. In **Storage** page, click <ConsoleLabel name="actions"/> > Edit retention rule.
1. Select **Keep data forever** or **Keep data for (days)** and enter the number of days.
1. Click **Save**.

### Set or edit storage alert threshold

1. In **Storage** page, click <ConsoleLabel name="actions"/> > **Set storage alert threshold** or **Edit storage alert threshold**.
1. To set a new threshold, click **Set storage alert threshold**. To change an existing
   one, click **Edit storage alert threshold**.
1. Set your threshold in GiB.
1. Click **Save**.
