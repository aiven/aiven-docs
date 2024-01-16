---
title: Rename a service
---

Currently Aiven **does not support renaming** existing service. The
service name can only be set when creating the service and can\'t be
updated.

If you need to have your service running under a different name, the
best option is to
[create a service fork](/docs/platform/howto/console-fork-service) and to point clients to the new service.

:::warning
After creating a fork, writes to the original service are not synced.
Therefore, to provide a consistency between the original service and the
fork, service writes should be stopped before forking.
:::

:::note See also
Learn more
[about service forking](/docs/platform/concepts/service-forking).
:::
